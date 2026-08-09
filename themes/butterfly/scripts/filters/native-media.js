/**
 * Defer article media with native browser features and avoid layout shifts.
 */

'use strict'

const fs = require('fs')
const path = require('path')
const { parseDocument } = require('htmlparser2')
const { render } = require('dom-serializer')

const dimensionCache = new Map()
const sourceRoot = path.resolve(hexo.source_dir)

const escapeAttribute = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
})[character])

const findAttributeName = (node, name) => {
  const attributes = node.attribs || {}
  return Object.keys(attributes).find(key => key.toLowerCase() === name.toLowerCase()) || null
}

const getAttribute = (node, name) => {
  const attributeName = findAttributeName(node, name)
  return attributeName === null ? null : node.attribs[attributeName]
}

const setAttribute = (node, name, value) => {
  const attributeName = findAttributeName(node, name) || name
  node.attribs = node.attribs || {}
  node.attribs[attributeName] = escapeAttribute(value)
}

const walkElements = (node, visitor) => {
  if (!node || !node.children) return
  node.children.forEach(child => {
    if (child.type === 'tag' || child.type === 'script' || child.type === 'style') visitor(child)
    walkElements(child, visitor)
  })
}

const isCodeElement = node => {
  let current = node.parent
  while (current) {
    if (['code', 'pre', 'script', 'style', 'textarea'].includes(current.name)) return true
    current = current.parent
  }
  return false
}

const parseHtml = html => parseDocument(String(html || ''), {
  decodeEntities: false
})

const serializeHtml = document => render(document, {
  decodeEntities: false,
  selfClosingTags: false
})

const readUInt24LE = (buffer, offset) => (
  buffer[offset] | (buffer[offset + 1] << 8) | (buffer[offset + 2] << 16)
)

const readPngDimensions = buffer => {
  if (buffer.length < 24 || buffer.toString('ascii', 1, 4) !== 'PNG') return null
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20)
  }
}

const readGifDimensions = buffer => {
  if (buffer.length < 10 || !/^GIF8[79]a$/.test(buffer.toString('ascii', 0, 6))) return null
  return {
    width: buffer.readUInt16LE(6),
    height: buffer.readUInt16LE(8)
  }
}

const readJpegDimensions = buffer => {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) return null
  const startOfFrameMarkers = new Set([
    0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7,
    0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf
  ])
  let offset = 2

  while (offset + 8 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1
      continue
    }
    while (buffer[offset] === 0xff) offset += 1
    const marker = buffer[offset]
    offset += 1
    if (marker === 0xd8 || marker === 0x01) continue
    if (marker === 0xd9 || marker === 0xda || offset + 2 > buffer.length) break
    const segmentLength = buffer.readUInt16BE(offset)
    if (segmentLength < 2 || offset + segmentLength > buffer.length) break
    if (startOfFrameMarkers.has(marker) && segmentLength >= 7) {
      return {
        width: buffer.readUInt16BE(offset + 5),
        height: buffer.readUInt16BE(offset + 3)
      }
    }
    offset += segmentLength
  }
  return null
}

const readWebpDimensions = buffer => {
  if (
    buffer.length < 30 ||
    buffer.toString('ascii', 0, 4) !== 'RIFF' ||
    buffer.toString('ascii', 8, 12) !== 'WEBP'
  ) return null

  let offset = 12
  while (offset + 8 <= buffer.length) {
    const type = buffer.toString('ascii', offset, offset + 4)
    const chunkSize = buffer.readUInt32LE(offset + 4)
    const payload = offset + 8
    if (payload + chunkSize > buffer.length) return null

    if (type === 'VP8X' && chunkSize >= 10) {
      return {
        width: readUInt24LE(buffer, payload + 4) + 1,
        height: readUInt24LE(buffer, payload + 7) + 1
      }
    }
    if (
      type === 'VP8 ' &&
      chunkSize >= 10 &&
      buffer[payload + 3] === 0x9d &&
      buffer[payload + 4] === 0x01 &&
      buffer[payload + 5] === 0x2a
    ) {
      return {
        width: buffer.readUInt16LE(payload + 6) & 0x3fff,
        height: buffer.readUInt16LE(payload + 8) & 0x3fff
      }
    }
    if (type === 'VP8L' && chunkSize >= 5 && buffer[payload] === 0x2f) {
      const bits = buffer.readUInt32LE(payload + 1)
      return {
        width: (bits & 0x3fff) + 1,
        height: ((bits >>> 14) & 0x3fff) + 1
      }
    }
    offset = payload + chunkSize + (chunkSize % 2)
  }
  return null
}

const readImageDimensions = filePath => {
  if (dimensionCache.has(filePath)) return dimensionCache.get(filePath)
  let dimensions = null
  try {
    const buffer = fs.readFileSync(filePath)
    dimensions = readPngDimensions(buffer) ||
      readGifDimensions(buffer) ||
      readJpegDimensions(buffer) ||
      readWebpDimensions(buffer)
  } catch (error) {
    hexo.log.debug(`Unable to inspect image dimensions for ${filePath}: ${error.message}`)
  }
  dimensionCache.set(filePath, dimensions)
  return dimensions
}

const resolveLocalImage = src => {
  if (!src || !src.startsWith('/') || src.startsWith('//')) return null
  let pathname
  try {
    pathname = decodeURIComponent(src.split(/[?#]/, 1)[0])
  } catch (error) {
    return null
  }
  const filePath = path.resolve(sourceRoot, `.${pathname}`)
  if (filePath !== sourceRoot && !filePath.startsWith(`${sourceRoot}${path.sep}`)) return null
  return filePath
}

const optimizeImage = (node, data, imageIndex) => {
  if (getAttribute(node, 'loading') === null) setAttribute(node, 'loading', 'lazy')
  if (getAttribute(node, 'decoding') === null) setAttribute(node, 'decoding', 'async')

  const alt = getAttribute(node, 'alt')
  if (alt === null || !alt.trim()) {
    const title = String(data.title || data.slug || '文章').replace(/<[^>]*>/g, '').trim()
    setAttribute(node, 'alt', `${title} - 插图 ${imageIndex}`)
  }

  const filePath = resolveLocalImage(getAttribute(node, 'src'))
  const dimensions = filePath ? readImageDimensions(filePath) : null
  if (!dimensions) return
  if (getAttribute(node, 'width') === null) setAttribute(node, 'width', dimensions.width)
  if (getAttribute(node, 'height') === null) setAttribute(node, 'height', dimensions.height)
}

const optimizeVideo = node => {
  const attributes = node.attribs || {}
  delete attributes.autoplay
  delete attributes.preload
  if (getAttribute(node, 'controls') === null) setAttribute(node, 'controls', '')
  setAttribute(node, 'preload', 'none')

  const posterPath = resolveLocalImage(getAttribute(node, 'poster'))
  const dimensions = posterPath ? readImageDimensions(posterPath) : null
  if (!dimensions) return
  if (getAttribute(node, 'width') === null) setAttribute(node, 'width', dimensions.width)
  if (getAttribute(node, 'height') === null) setAttribute(node, 'height', dimensions.height)
}

const optimizeMedia = (html, data) => {
  const document = parseHtml(html)
  let imageIndex = 0

  walkElements(document, node => {
    if (isCodeElement(node)) return
    if (node.name === 'img') {
      imageIndex += 1
      optimizeImage(node, data, imageIndex)
    } else if (node.name === 'video') {
      optimizeVideo(node)
    }
  })

  return serializeHtml(document)
}

hexo.extend.filter.register('after_post_render', data => {
  data.content = optimizeMedia(data.content, data)
  return data
})
