/**
 * Refer to hexo-generator-searchdb
 * https://github.com/next-theme/hexo-generator-searchdb/blob/main/dist/search.js
 * Modified by hexo-theme-butterfly
 */

class LocalSearch {
  constructor ({
    path = '',
    version = 'unversioned',
    unescape = false,
    top_n_per_article = 1
  }) {
    this.path = path
    this.unescape = unescape
    this.top_n_per_article = top_n_per_article
    this.isFetched = false
    this.datas = null
    this.fetchPromise = null
    this.cacheKey = `butterfly:local-search:${this.path}:${version}`
  }

  escapeHTML (value) {
    return String(value).replace(/[&<>"']/g, char => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[char])
  }

  getIndexByWord (words, text, caseSensitive = false) {
    const index = []
    const included = new Set()

    if (!caseSensitive) {
      text = text.toLowerCase()
    }
    words.forEach(word => {
      if (this.unescape) {
        const div = document.createElement('div')
        div.innerText = word
        word = div.innerHTML
      }
      const wordLen = word.length
      if (wordLen === 0) return
      let startPosition = 0
      let position = -1
      if (!caseSensitive) {
        word = word.toLowerCase()
      }
      while ((position = text.indexOf(word, startPosition)) > -1) {
        index.push({ position, word })
        included.add(word)
        startPosition = position + wordLen
      }
    })
    // Sort index by position of keyword
    index.sort((left, right) => {
      if (left.position !== right.position) {
        return left.position - right.position
      }
      return right.word.length - left.word.length
    })
    return [index, included]
  }

  // Merge hits into slices
  mergeIntoSlice (start, end, index) {
    let item = index[0]
    let { position, word } = item
    const hits = []
    const count = new Set()
    while (position + word.length <= end && index.length !== 0) {
      count.add(word)
      hits.push({
        position,
        length: word.length
      })
      const wordEnd = position + word.length

      // Move to next position of hit
      index.shift()
      while (index.length !== 0) {
        item = index[0]
        position = item.position
        word = item.word
        if (wordEnd > position) {
          index.shift()
        } else {
          break
        }
      }
    }
    return {
      hits,
      start,
      end,
      count: count.size
    }
  }

  // Highlight title and content
  highlightKeyword (val, slice) {
    let result = ''
    let index = slice.start
    for (const { position, length } of slice.hits) {
      result += this.escapeHTML(val.substring(index, position))
      index = position + length
      result += `<mark class="search-keyword">${this.escapeHTML(val.substr(position, length))}</mark>`
    }
    result += this.escapeHTML(val.substring(index, slice.end))
    return result
  }

  getResultItems (keywords) {
    const resultItems = []
    this.datas.forEach(({ title, content, summary, tags, url }) => {
      const tagsText = tags.map(tag => `#${tag}`).join(' ')

      // The number of different keywords included in the article.
      const [indexOfTitle, keysOfTitle] = this.getIndexByWord(keywords, title)
      const [indexOfTags, keysOfTags] = this.getIndexByWord(keywords, tagsText)
      const [indexOfSummary, keysOfSummary] = this.getIndexByWord(keywords, summary)
      const [indexOfContent, keysOfContent] = this.getIndexByWord(keywords, content)
      const includedCount = new Set([
        ...keysOfTitle,
        ...keysOfTags,
        ...keysOfSummary,
        ...keysOfContent
      ]).size

      // Show search results
      const hitCount = indexOfTitle.length + indexOfTags.length + indexOfSummary.length + indexOfContent.length
      if (hitCount === 0) return

      const slicesOfTitle = []
      if (indexOfTitle.length !== 0) {
        slicesOfTitle.push(this.mergeIntoSlice(0, title.length, indexOfTitle))
      }

      const slicesOfTags = []
      if (indexOfTags.length !== 0) {
        slicesOfTags.push(this.mergeIntoSlice(0, tagsText.length, indexOfTags))
      }

      let excerptSlices = []
      const collectExcerptSlices = (source, text, indexes) => {
        while (indexes.length !== 0) {
          const { position } = indexes[0]
          const start = Math.max(0, position - 20)
          const end = Math.min(text.length, position + 100)
          excerptSlices.push({
            source,
            text,
            ...this.mergeIntoSlice(start, end, indexes)
          })
        }
      }

      collectExcerptSlices('summary', summary, indexOfSummary)
      collectExcerptSlices('content', content, indexOfContent)

      // Prefer excerpts that cover more distinct keywords and hits.
      excerptSlices.sort((left, right) => {
        if (left.count !== right.count) {
          return right.count - left.count
        } else if (left.hits.length !== right.hits.length) {
          return right.hits.length - left.hits.length
        } else if (left.source !== right.source) {
          return left.source === 'summary' ? -1 : 1
        }
        return left.start - right.start
      })

      // Select top N excerpts per article.
      const upperBound = parseInt(this.top_n_per_article, 10)
      if (upperBound >= 0) {
        excerptSlices = excerptSlices.slice(0, upperBound)
      }

      const resultUrl = new URL(url, location.origin)
      resultUrl.searchParams.set('highlight', keywords.join(' '))
      const safeUrl = this.escapeHTML(resultUrl.href)
      const titleMarkup = slicesOfTitle.length !== 0
        ? this.highlightKeyword(title, slicesOfTitle[0])
        : this.escapeHTML(title)

      let resultItem = `<div class="local-search-hit-item"><a href="${safeUrl}"><span class="search-result-title">${titleMarkup}</span>`

      if (slicesOfTags.length !== 0) {
        resultItem += `<p class="search-result">${this.highlightKeyword(tagsText, slicesOfTags[0])}</p>`
      }

      excerptSlices.forEach(slice => {
        const prefix = slice.start > 0 ? '...' : ''
        const suffix = slice.end < slice.text.length ? '...' : ''
        resultItem += `<p class="search-result">${prefix}${this.highlightKeyword(slice.text, slice)}${suffix}</p>`
      })

      resultItem += '</a></div>'
      resultItems.push({
        item: resultItem,
        id: resultItems.length,
        hitCount,
        includedCount
      })
    })
    return resultItems
  }

  normalizeData (data) {
    if (!Array.isArray(data)) throw new TypeError('The local search index must be an array')

    return data.map(item => {
      let url = ''
      try {
        const candidate = new URL(String(item.url || '').trim(), location.origin)
        if (['http:', 'https:'].includes(candidate.protocol) && candidate.origin === location.origin) {
          url = candidate.href
        }
      } catch (error) {
        // Invalid or unsafe URLs are omitted from the search index.
      }

      return {
        title: String(item.title || '').trim(),
        url,
        tags: (Array.isArray(item.tags) ? item.tags : []).map(tag => String(tag).trim()).filter(Boolean),
        summary: String(item.summary || '').trim(),
        content: String(item.content || '').trim()
      }
    }).filter(item => item.title && item.url)
  }

  readCache () {
    try {
      const cached = sessionStorage.getItem(this.cacheKey)
      return cached ? this.normalizeData(JSON.parse(cached)) : null
    } catch (error) {
      this.clearCache()
      return null
    }
  }

  writeCache () {
    try {
      sessionStorage.setItem(this.cacheKey, JSON.stringify(this.datas))
    } catch (error) {
      // Search remains available when storage is disabled or full.
    }
  }

  clearCache () {
    try {
      sessionStorage.removeItem(this.cacheKey)
    } catch (error) {
      // Ignore browsers that block session storage.
    }
  }

  fetchData ({ force = false } = {}) {
    if (this.isFetched && !force) return Promise.resolve(this.datas)
    if (this.fetchPromise && !force) return this.fetchPromise

    if (!force) {
      const cached = this.readCache()
      if (cached) {
        this.datas = cached
        this.isFetched = true
        return Promise.resolve(cached)
      }
    } else {
      this.isFetched = false
      this.datas = null
      this.clearCache()
    }

    this.fetchPromise = fetch(this.path, {
      headers: { Accept: 'application/json' }
    })
      .then(response => {
        if (!response.ok) throw new Error(`Search index request failed with status ${response.status}`)
        return response.json()
      })
      .then(data => {
        this.datas = this.normalizeData(data)
        this.isFetched = true
        this.writeCache()
        return this.datas
      })
      .finally(() => {
        this.fetchPromise = null
      })

    return this.fetchPromise
  }

  // Highlight by wrapping node in mark elements with the given class name
  highlightText (node, slice, className) {
    const val = node.nodeValue
    let index = slice.start
    const children = []
    for (const { position, length } of slice.hits) {
      const text = document.createTextNode(val.substring(index, position))
      index = position + length
      const mark = document.createElement('mark')
      mark.className = className
      mark.appendChild(document.createTextNode(val.substr(position, length)))
      children.push(text, mark)
    }
    node.nodeValue = val.substring(index, slice.end)
    children.forEach(element => {
      node.parentNode.insertBefore(element, node)
    })
  }

  // Highlight the search words provided in the url in the text
  highlightSearchWords (body) {
    const params = new URL(location.href).searchParams.get('highlight')
    const keywords = params ? params.split(' ') : []
    if (!keywords.length || !body) return
    const walk = document.createTreeWalker(body, NodeFilter.SHOW_TEXT, null)
    const allNodes = []
    while (walk.nextNode()) {
      if (!walk.currentNode.parentNode.matches('button, select, textarea, .mermaid')) allNodes.push(walk.currentNode)
    }
    allNodes.forEach(node => {
      const [indexOfNode] = this.getIndexByWord(keywords, node.nodeValue)
      if (!indexOfNode.length) return
      const slice = this.mergeIntoSlice(0, node.nodeValue.length, indexOfNode)
      this.highlightText(node, slice, 'search-keyword')
    })
  }
}

window.addEventListener('load', () => {
  const { path, version, top_n_per_article, unescape, languages } = GLOBAL_CONFIG.localSearch
  const localSearch = new LocalSearch({
    path,
    version,
    top_n_per_article,
    unescape
  })

  const input = document.querySelector('#local-search-input input')
  const statsItem = document.getElementById('local-search-stats-wrap')
  const resultsContainer = document.getElementById('local-search-results')
  const $loadingStatus = document.getElementById('loading-status')
  const $loadingDatabase = document.getElementById('loading-database')
  const $loadingIcon = $loadingDatabase.querySelector('i')
  const $loadingMessage = $loadingDatabase.querySelector('.loading-database-message')
  const $retryButton = document.getElementById('local-search-retry')
  const $searchWrap = document.querySelector('#local-search .search-wrap')
  const $searchMask = document.getElementById('search-mask')
  const $searchDialog = document.querySelector('#local-search .search-dialog')

  const setDataState = state => {
    const isReady = state === 'ready'
    const isError = state === 'error'
    $loadingDatabase.style.display = isReady ? 'none' : 'block'
    $searchWrap.style.display = isReady ? 'block' : 'none'
    $loadingIcon.hidden = isError
    if ($retryButton) $retryButton.hidden = !isError
    if ($loadingMessage) {
      $loadingMessage.textContent = isError ? languages.load_error : languages.load_data
    }
  }

  const inputEventFunction = () => {
    if (!localSearch.isFetched) return

    const searchText = input.value.trim().toLowerCase()
    if (searchText !== '') $loadingStatus.innerHTML = '<i class="fas fa-spinner fa-pulse"></i>'
    const keywords = searchText.split(/[-\s]+/)
    let resultItems = []

    if (searchText.length > 0) {
      resultItems = localSearch.getResultItems(keywords)
    }

    if (keywords.length === 1 && keywords[0] === '') {
      resultsContainer.textContent = ''
      statsItem.textContent = ''
    } else if (resultItems.length === 0) {
      resultsContainer.textContent = ''
      const statsDiv = document.createElement('div')
      statsDiv.className = 'search-result-stats'
      statsDiv.textContent = languages.hits_empty.replace(/\$\{query}/, searchText)
      statsItem.replaceChildren(statsDiv)
    } else {
      resultItems.sort((left, right) => {
        if (left.includedCount !== right.includedCount) {
          return right.includedCount - left.includedCount
        } else if (left.hitCount !== right.hitCount) {
          return right.hitCount - left.hitCount
        }
        return right.id - left.id
      })

      const statsDiv = document.createElement('div')
      statsDiv.className = 'search-result-stats'
      statsDiv.textContent = languages.hits_stats.replace(/\$\{hits}/, resultItems.length)
      resultsContainer.innerHTML = `<div class="search-result-list">${resultItems.map(result => result.item).join('')}</div>`
      statsItem.replaceChildren(document.createElement('hr'), statsDiv)
      window.pjax && window.pjax.refresh(resultsContainer)
    }

    $loadingStatus.textContent = ''
  }

  const loadSearchData = ({ force = false } = {}) => {
    setDataState('loading')
    return localSearch.fetchData({ force })
      .then(() => {
        setDataState('ready')
        if (input.value.trim()) inputEventFunction()
      })
      .catch(error => {
        console.error('[LocalSearch] Failed to load the search index.', error)
        setDataState('error')
      })
  }

  let isInputBound = false

  // Fix the full-height dialog in mobile Safari.
  const fixSafariHeight = () => {
    if (window.innerWidth < 768) {
      $searchDialog.style.setProperty('--search-height', window.innerHeight + 'px')
    }
  }

  const handleEscape = event => {
    if (event.code === 'Escape') closeSearch()
  }

  const openSearch = () => {
    const bodyStyle = document.body.style
    bodyStyle.width = '100%'
    bodyStyle.overflow = 'hidden'
    btf.animateIn($searchMask, 'to_show 0.5s')
    btf.animateIn($searchDialog, 'titleScale 0.5s')
    setTimeout(() => { input.focus() }, 300)

    if (!isInputBound) {
      input.addEventListener('input', inputEventFunction)
      isInputBound = true
    }
    if (!localSearch.isFetched && !localSearch.fetchPromise) loadSearchData()

    document.addEventListener('keydown', handleEscape)
    fixSafariHeight()
    window.addEventListener('resize', fixSafariHeight)
  }

  function closeSearch () {
    const bodyStyle = document.body.style
    bodyStyle.width = ''
    bodyStyle.overflow = ''
    btf.animateOut($searchDialog, 'search_close .5s')
    btf.animateOut($searchMask, 'to_hide 0.5s')
    document.removeEventListener('keydown', handleEscape)
    window.removeEventListener('resize', fixSafariHeight)
  }

  const searchClickFn = () => {
    const $searchButton = document.querySelector('#search-button > .search')
    if ($searchButton) btf.addEventListenerPjax($searchButton, 'click', openSearch)
  }

  document.querySelector('#local-search .search-close-button').addEventListener('click', closeSearch)
  $searchMask.addEventListener('click', closeSearch)
  if ($retryButton) $retryButton.addEventListener('click', () => loadSearchData({ force: true }))

  if (GLOBAL_CONFIG.localSearch.preload) loadSearchData()
  localSearch.highlightSearchWords(document.getElementById('article-container'))
  searchClickFn()

  window.addEventListener('pjax:complete', () => {
    !btf.isHidden($searchMask) && closeSearch()
    localSearch.highlightSearchWords(document.getElementById('article-container'))
    searchClickFn()
  })
})
