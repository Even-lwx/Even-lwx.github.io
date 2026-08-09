/**
 * Defer article media with native browser features and avoid eager video loads.
 */

'use strict'

const optimizeImages = html => html.replace(/<img\b([^>]*)>/gi, (tag, attributes) => {
  const normalized = attributes.replace(/\s+\/\s+(?=(?:loading|decoding)\s*=)/gi, ' ')
  const selfClosing = /\s*\/\s*$/.test(normalized)
  let next = normalized.replace(/\s*\/\s*$/, '')
  if (!/\bloading\s*=/i.test(next)) next += ' loading="lazy"'
  if (!/\bdecoding\s*=/i.test(next)) next += ' decoding="async"'
  return `<img${next}${selfClosing ? ' /' : ''}>`
})

const optimizeVideos = html => html.replace(/<video\b([^>]*)>/gi, (tag, attributes) => {
  let next = attributes.replace(/\sautoplay(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?/gi, '')
  next = next.replace(/\spreload\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
  if (!/\bcontrols\b/i.test(next)) next += ' controls'
  next += ' preload="none"'
  return `<video${next}>`
})

const normalizeCachedImageAttributes = html => html.replace(
  /(<img\b[^>]*?)\s+\/\s+(?=(?:loading|decoding)\s*=)([^>]*>)/gi,
  '$1 $2'
)

hexo.extend.filter.register('after_post_render', data => {
  data.content = optimizeVideos(optimizeImages(data.content))
  return data
})

hexo.extend.filter.register('after_render:html', normalizeCachedImageAttributes)
