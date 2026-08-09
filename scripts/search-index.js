'use strict'

const { decodeHTML } = require('entities')
const { stripHTML } = require('hexo-util')

const CONTENT_LIMIT = 600
const SUMMARY_LIMIT = 180

hexo.extend.filter.register('before_generate', function () {
  this.config.search = this.config.search || {}
  this.config.search.build_id = Date.now().toString(36)
})

const normalizeWhitespace = value => value
  .replace(/\u00a0/g, ' ')
  .replace(/[\u200B-\u200D\uFEFF]/g, '')
  .replace(/\s+/g, ' ')
  .trim()

const truncate = (value, limit) => Array.from(value).slice(0, limit).join('')

const isPublicPost = post => {
  return post &&
    post.title &&
    post.published !== false &&
    post.draft !== true &&
    post.indexing !== false &&
    post.search !== false &&
    post.private !== true &&
    post.visibility !== 'private' &&
    !post.password
}

hexo.extend.generator.register('compact-search-index', function (locals) {
  const cleanText = value => normalizeWhitespace(decodeHTML(stripHTML(String(value || ''))))
  const posts = []

  locals.posts.sort('-date').forEach(post => {
    if (!isPublicPost(post)) return

    const content = truncate(cleanText(post.content || post._content), CONTENT_LIMIT)
    const description = cleanText(post.description || post.excerpt)
    const summary = truncate(description || content, SUMMARY_LIMIT)
    const tags = []

    if (post.tags) {
      post.tags.forEach(tag => {
        const name = cleanText(tag.name)
        if (name) tags.push(name)
      })
    }

    posts.push({
      title: cleanText(post.title),
      url: `${this.config.root}${post.path}`.replace(/\/{2,}/g, '/'),
      tags,
      summary,
      content
    })
  })

  return {
    path: 'search.json',
    data: JSON.stringify(posts)
  }
})
