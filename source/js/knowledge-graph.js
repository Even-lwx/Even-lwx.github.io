(function () {
  'use strict'

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value))
  const palette = ['#3b82f6', '#14b8a6', '#f59e0b', '#f43f5e', '#8b5cf6', '#22c55e']

  const colorIndex = name => {
    let hash = 0
    for (let index = 0; index < name.length; index += 1) {
      hash = ((hash << 5) - hash + name.charCodeAt(index)) | 0
    }
    return Math.abs(hash) % palette.length
  }

  const initKnowledgeGraph = () => {
    const root = document.querySelector('[data-knowledge-graph]')
    const dataElement = document.getElementById('knowledge-graph-data')
    if (!root || !dataElement || root.dataset.graphReady === 'true') return

    const canvas = root.querySelector('.knowledge-graph__canvas')
    const tooltip = root.querySelector('.knowledge-graph__tooltip')
    const searchForm = root.querySelector('.knowledge-graph__search')
    const searchInput = root.querySelector('[data-graph-search]')
    const searchClear = root.querySelector('[data-graph-search-clear]')
    const searchStatus = root.querySelector('[data-graph-search-status]')
    const detail = root.querySelector('[data-graph-detail]')
    const detailTitle = root.querySelector('[data-graph-detail-title]')
    const detailCount = root.querySelector('[data-graph-detail-count]')
    const detailRelations = root.querySelector('[data-graph-detail-relations]')
    const detailRelated = root.querySelector('[data-graph-detail-related]')
    const detailLink = root.querySelector('[data-graph-detail-link]')
    const detailClose = root.querySelector('[data-graph-detail-close]')
    const motionButton = root.querySelector('[data-graph-action="motion"]')
    const motionIcon = root.querySelector('[data-graph-motion-icon]')
    const context = canvas && canvas.getContext('2d')
    if (!canvas || !tooltip || !searchForm || !searchInput || !detail || !context) return

    let graph
    try {
      graph = JSON.parse(dataElement.textContent)
    } catch (error) {
      root.classList.add('knowledge-graph--error')
      return
    }

    if (!Array.isArray(graph.nodes) || graph.nodes.length === 0) return

    root.dataset.graphReady = 'true'

    const nodeById = new Map()
    const neighbours = new Map()
    const relations = new Map()
    const nodes = graph.nodes.map((node, index) => {
      const graphNode = {
        ...node,
        index,
        color: palette[colorIndex(node.name)],
        radius: clamp(8 + Math.sqrt(Math.max(1, node.count)) * 2.8, 10, 21),
        phase: index * 1.73,
        x: 0,
        y: 0,
        screenX: 0,
        screenY: 0
      }
      nodeById.set(graphNode.id, graphNode)
      neighbours.set(graphNode.id, new Set())
      relations.set(graphNode.id, [])
      return graphNode
    })

    const links = (graph.links || []).map(link => ({
      ...link,
      sourceNode: nodeById.get(link.source),
      targetNode: nodeById.get(link.target)
    })).filter(link => link.sourceNode && link.targetNode)

    links.forEach(link => {
      neighbours.get(link.source).add(link.target)
      neighbours.get(link.target).add(link.source)
      relations.get(link.source).push({ node: link.targetNode, weight: link.weight })
      relations.get(link.target).push({ node: link.sourceNode, weight: link.weight })
    })

    relations.forEach(items => {
      items.sort((first, second) => second.weight - first.weight || first.node.name.localeCompare(second.node.name))
    })

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const state = {
      width: 0,
      height: 0,
      scale: 1,
      offsetX: 0,
      offsetY: 0,
      hoveredNode: null,
      focusedNode: null,
      selectedNode: null,
      draggedNode: null,
      searchQuery: '',
      searchMatches: new Set(),
      motionPaused: reducedMotion,
      pointer: null,
      visible: true,
      pageVisible: !document.hidden,
      frameId: 0,
      lastTime: 0
    }

    const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark'

    const worldToScreen = node => ({
      x: (node.x - state.width / 2) * state.scale + state.width / 2 + state.offsetX,
      y: (node.y - state.height / 2) * state.scale + state.height / 2 + state.offsetY
    })

    const screenToWorld = point => ({
      x: (point.x - state.width / 2 - state.offsetX) / state.scale + state.width / 2,
      y: (point.y - state.height / 2 - state.offsetY) / state.scale + state.height / 2
    })

    const layoutNodes = () => {
      const centerX = state.width / 2
      const searchInset = state.width < 520 ? 64 : 0
      const centerY = searchInset + (state.height - searchInset) / 2
      const outerRadiusX = Math.max(90, state.width * 0.4)
      const outerRadiusY = Math.max(120, (state.height - searchInset) * 0.4)
      const innerRadiusX = outerRadiusX * 0.5
      const innerRadiusY = outerRadiusY * 0.5
      const innerCount = Math.min(9, Math.max(5, Math.round(nodes.length * 0.3)))
      const goldenAngle = Math.PI * (3 - Math.sqrt(5))

      nodes.forEach((node, index) => {
        if (index === 0) {
          node.x = centerX
          node.y = centerY
          return
        }

        const innerRing = index <= innerCount
        const ringIndex = innerRing ? index - 1 : index - innerCount - 1
        const ringLength = innerRing ? innerCount : Math.max(1, nodes.length - innerCount - 1)
        const radiusScale = innerRing
          ? 0.88 + (ringIndex % 2) * 0.08
          : 0.84 + (ringIndex % 3) * 0.055
        const radiusX = (innerRing ? innerRadiusX : outerRadiusX) * radiusScale
        const radiusY = (innerRing ? innerRadiusY : outerRadiusY) * radiusScale
        const angle = ringIndex * goldenAngle + (innerRing ? -Math.PI / 2 : Math.PI / 8)
        const horizontalStretch = state.width > 680 ? 1.1 : 0.95

        node.x = centerX + Math.cos(angle) * radiusX * horizontalStretch
        node.y = centerY + Math.sin(angle) * radiusY
      })
    }

    const resetView = () => {
      state.scale = 1
      state.offsetX = 0
      state.offsetY = 0
      layoutNodes()
      requestDraw()
    }

    const resize = () => {
      const bounds = root.getBoundingClientRect()
      const nextWidth = Math.max(280, Math.round(bounds.width))
      const nextHeight = Math.max(360, Math.round(bounds.height))
      const sizeChanged = nextWidth !== state.width || nextHeight !== state.height
      if (!sizeChanged) return

      state.width = nextWidth
      state.height = nextHeight
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(nextWidth * pixelRatio)
      canvas.height = Math.round(nextHeight * pixelRatio)
      canvas.style.width = `${nextWidth}px`
      canvas.style.height = `${nextHeight}px`
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
      resetView()
    }

    const drawGrid = dark => {
      context.save()
      context.fillStyle = dark ? 'rgba(148, 163, 184, 0.13)' : 'rgba(100, 116, 139, 0.14)'
      const gap = state.width < 600 ? 34 : 42
      for (let x = gap / 2; x < state.width; x += gap) {
        for (let y = gap / 2; y < state.height; y += gap) {
          context.fillRect(x, y, 1, 1)
        }
      }
      context.restore()
    }

    const draw = time => {
      state.lastTime = time || state.lastTime
      const dark = isDark()
      const activeNode = state.draggedNode || state.hoveredNode || state.focusedNode || state.selectedNode
      const activeNeighbours = activeNode ? neighbours.get(activeNode.id) : null
      const motion = reducedMotion || state.motionPaused || state.draggedNode ? 0 : 1
      const searching = state.searchQuery.length > 0

      context.clearRect(0, 0, state.width, state.height)
      drawGrid(dark)

      nodes.forEach(node => {
        const point = worldToScreen(node)
        const driftX = Math.cos(state.lastTime * 0.00034 + node.phase) * 1.8 * motion
        const driftY = Math.sin(state.lastTime * 0.00028 + node.phase) * 1.6 * motion
        node.screenX = point.x + driftX
        node.screenY = point.y + driftY
      })

      context.save()
      context.lineCap = 'round'
      links.forEach((link, linkIndex) => {
        const connected = !activeNode || link.source === activeNode.id || link.target === activeNode.id
        const sourceMatches = !searching || state.searchMatches.has(link.source)
        const targetMatches = !searching || state.searchMatches.has(link.target)
        const alpha = searching && !sourceMatches && !targetMatches
          ? 0.035
          : activeNode ? (connected ? 0.72 : 0.07) : 0.22
        context.beginPath()
        context.moveTo(link.sourceNode.screenX, link.sourceNode.screenY)
        context.lineTo(link.targetNode.screenX, link.targetNode.screenY)
        context.strokeStyle = dark
          ? `rgba(148, 163, 184, ${alpha})`
          : `rgba(71, 85, 105, ${alpha})`
        context.lineWidth = connected ? clamp(link.weight * 0.75, 1, 3) : 1
        context.stroke()

        if (activeNode && connected && motion) {
          const progress = (state.lastTime * 0.00022 + linkIndex * 0.19) % 1
          const particleX = link.sourceNode.screenX + (link.targetNode.screenX - link.sourceNode.screenX) * progress
          const particleY = link.sourceNode.screenY + (link.targetNode.screenY - link.sourceNode.screenY) * progress
          context.beginPath()
          context.arc(particleX, particleY, 2.2, 0, Math.PI * 2)
          context.fillStyle = activeNode.color
          context.fill()
        }
      })
      context.restore()

      nodes.forEach(node => {
        const selected = activeNode && node.id === activeNode.id
        const related = activeNeighbours && activeNeighbours.has(node.id)
        const searchMatch = !searching || state.searchMatches.has(node.id)
        const muted = !searchMatch || (activeNode && !selected && !related)
        const radius = clamp(node.radius * state.scale, 7, 25)

        context.save()
        context.globalAlpha = muted ? 0.22 : 1
        context.beginPath()
        context.arc(node.screenX, node.screenY, radius + (selected ? 5 : 0), 0, Math.PI * 2)
        context.fillStyle = selected
          ? (dark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(15, 23, 42, 0.08)')
          : (dark ? 'rgba(15, 23, 42, 0.72)' : 'rgba(255, 255, 255, 0.9)')
        context.fill()

        context.beginPath()
        context.arc(node.screenX, node.screenY, radius, 0, Math.PI * 2)
        context.fillStyle = node.color
        context.fill()
        context.lineWidth = selected ? 3 : 1.5
        context.strokeStyle = dark ? 'rgba(255, 255, 255, 0.72)' : 'rgba(255, 255, 255, 0.95)'
        context.stroke()

        if (searching && searchMatch && !selected) {
          context.beginPath()
          context.arc(node.screenX, node.screenY, radius + 5, 0, Math.PI * 2)
          context.lineWidth = 2
          context.strokeStyle = dark ? '#f8fafc' : '#0f172a'
          context.stroke()
        }

        context.restore()
      })

      const labelLimit = state.width < 520 ? 7 : (state.width < 760 ? 12 : nodes.length)
      const labelBoxes = []
      const labelNodes = nodes
        .filter(node => node === activeNode ||
          (activeNeighbours && activeNeighbours.has(node.id)) ||
          (searching && state.searchMatches.has(node.id)) ||
          node.index < labelLimit)
        .sort((first, second) => {
          if (first === activeNode) return -1
          if (second === activeNode) return 1
          const firstRelated = activeNeighbours && activeNeighbours.has(first.id) ? 1 : 0
          const secondRelated = activeNeighbours && activeNeighbours.has(second.id) ? 1 : 0
          return secondRelated - firstRelated || first.index - second.index
        })

      labelNodes.forEach(node => {
        const selected = node === activeNode
        const searchMatch = !searching || state.searchMatches.has(node.id)
        const muted = !searchMatch || (activeNode && !selected && !(activeNeighbours && activeNeighbours.has(node.id)))
        const radius = clamp(node.radius * state.scale, 7, 25)
        const maxLength = state.width < 520 ? 7 : 12
        const label = node.name.length > maxLength ? `${node.name.slice(0, maxLength)}…` : node.name
        const fontSize = state.width < 520 ? 11 : 12

        context.save()
        context.font = `${selected ? 600 : 500} ${fontSize}px system-ui, sans-serif`
        const labelWidth = Math.ceil(context.measureText(label).width)
        const labelHeight = fontSize + 3
        const gap = 7
        const candidates = [
          { x: node.screenX - labelWidth / 2, y: node.screenY + radius + gap },
          { x: node.screenX - labelWidth / 2, y: node.screenY - radius - labelHeight - gap },
          { x: node.screenX + radius + gap, y: node.screenY - labelHeight / 2 },
          { x: node.screenX - radius - labelWidth - gap, y: node.screenY - labelHeight / 2 }
        ]

        const isFree = box => {
          const inBounds = box.x >= 5 && box.y >= 5 && box.x + labelWidth <= state.width - 5 && box.y + labelHeight <= state.height - 5
          if (!inBounds) return false

          const overlapsLabel = labelBoxes.some(existing => !(
            box.x + labelWidth + 4 < existing.x ||
            box.x > existing.x + existing.width + 4 ||
            box.y + labelHeight + 3 < existing.y ||
            box.y > existing.y + existing.height + 3
          ))
          if (overlapsLabel) return false

          return !nodes.some(other => {
            if (other === node) return false
            const nearestX = clamp(other.screenX, box.x, box.x + labelWidth)
            const nearestY = clamp(other.screenY, box.y, box.y + labelHeight)
            const otherRadius = clamp(other.radius * state.scale, 7, 25) + 3
            return Math.hypot(other.screenX - nearestX, other.screenY - nearestY) < otherRadius
          })
        }

        let box = candidates.find(isFree)
        if (!box && selected) {
          box = {
            x: clamp(candidates[0].x, 5, state.width - labelWidth - 5),
            y: clamp(candidates[0].y, 5, state.height - labelHeight - 5)
          }
        }

        if (box) {
          labelBoxes.push({ ...box, width: labelWidth, height: labelHeight })
          context.globalAlpha = muted ? 0.22 : 1
          context.textAlign = 'left'
          context.textBaseline = 'top'
          context.fillStyle = dark ? '#e2e8f0' : '#334155'
          context.fillText(label, box.x, box.y)
        }
        context.restore()
      })
    }

    function requestDraw () {
      if (state.frameId) return
      state.frameId = window.requestAnimationFrame(frameLoop)
    }

    function frameLoop (time) {
      state.frameId = 0
      draw(time)
      if (!reducedMotion && !state.motionPaused && state.visible && state.pageVisible && root.isConnected) {
        state.frameId = window.requestAnimationFrame(frameLoop)
      }
    }

    const pointerPosition = event => {
      const bounds = canvas.getBoundingClientRect()
      return { x: event.clientX - bounds.left, y: event.clientY - bounds.top }
    }

    const hitTest = point => {
      for (let index = nodes.length - 1; index >= 0; index -= 1) {
        const node = nodes[index]
        const radius = clamp(node.radius * state.scale, 7, 25) + 8
        if (Math.hypot(point.x - node.screenX, point.y - node.screenY) <= radius) return node
      }
      return null
    }

    const centerOnNode = node => {
      state.scale = Math.max(1.08, state.scale)
      state.offsetX = -(node.x - state.width / 2) * state.scale
      state.offsetY = -(node.y - state.height / 2) * state.scale
    }

    const updateDetail = node => {
      if (!node) {
        detail.hidden = true
        root.classList.remove('knowledge-graph--selected')
        return
      }

      const relatedItems = relations.get(node.id) || []
      detailTitle.textContent = node.name
      detailCount.textContent = node.count
      detailRelations.textContent = relatedItems.length
      detailLink.href = node.url
      detailRelated.replaceChildren()

      relatedItems.slice(0, 4).forEach(item => {
        const button = document.createElement('button')
        const name = document.createElement('span')
        const weight = document.createElement('b')
        button.type = 'button'
        button.dataset.graphRelatedNode = item.node.id
        button.title = `探索 ${item.node.name}`
        name.textContent = item.node.name
        weight.textContent = item.weight
        button.append(name, weight)
        detailRelated.append(button)
      })

      detail.hidden = false
      root.classList.add('knowledge-graph--selected')
    }

    const selectNode = (node, center = false) => {
      if (state.searchQuery && !state.searchMatches.has(node.id)) clearSearch()
      state.selectedNode = node
      state.focusedNode = null
      if (center) centerOnNode(node)
      updateDetail(node)
      requestDraw()
    }

    const clearSelection = () => {
      state.selectedNode = null
      updateDetail(null)
      requestDraw()
    }

    const updateSearch = () => {
      const query = searchInput.value.trim().toLocaleLowerCase()
      const matches = query
        ? nodes.filter(node => node.name.toLocaleLowerCase().includes(query))
        : []

      state.searchQuery = query
      state.searchMatches = new Set(matches.map(node => node.id))
      searchClear.hidden = query.length === 0
      searchStatus.hidden = query.length === 0
      searchStatus.textContent = query ? `${matches.length} 个结果` : ''
      root.classList.toggle('knowledge-graph--searching', query.length > 0)
      root.classList.toggle('knowledge-graph--no-results', query.length > 0 && matches.length === 0)
      requestDraw()
      return matches
    }

    const clearSearch = () => {
      searchInput.value = ''
      updateSearch()
    }

    const updateMotionControl = () => {
      if (!motionButton || !motionIcon) return
      const paused = state.motionPaused
      motionButton.setAttribute('aria-pressed', String(paused))
      motionButton.setAttribute('aria-label', paused ? '继续图谱动态' : '暂停图谱动态')
      motionButton.title = paused ? '继续动态' : '暂停动态'
      motionIcon.classList.toggle('fa-pause', !paused)
      motionIcon.classList.toggle('fa-play', paused)
      motionButton.classList.toggle('is-active', paused)
    }

    const showTooltip = (node, point) => {
      if (!node) {
        tooltip.hidden = true
        return
      }
      tooltip.textContent = `${node.name} · ${node.count} 篇文章 · ${neighbours.get(node.id).size} 个关联`
      tooltip.hidden = false
      const x = clamp(point.x + 16, 10, state.width - tooltip.offsetWidth - 10)
      const y = clamp(point.y + 16, 10, state.height - tooltip.offsetHeight - 10)
      tooltip.style.transform = `translate(${x}px, ${y}px)`
    }

    const setHoveredNode = (node, point) => {
      if (state.hoveredNode === node && node) {
        showTooltip(node, point)
        return
      }
      state.hoveredNode = node
      canvas.style.cursor = node ? 'pointer' : 'grab'
      showTooltip(node, point)
      requestDraw()
    }

    canvas.addEventListener('pointerdown', event => {
      const point = pointerPosition(event)
      const node = hitTest(point)
      state.pointer = {
        startX: point.x,
        startY: point.y,
        previousX: point.x,
        previousY: point.y,
        moved: false,
        node
      }
      state.draggedNode = node
      canvas.setPointerCapture(event.pointerId)
      canvas.style.cursor = node ? 'grabbing' : 'move'
      requestDraw()
    })

    canvas.addEventListener('pointermove', event => {
      const point = pointerPosition(event)
      if (!state.pointer) {
        setHoveredNode(hitTest(point), point)
        return
      }

      const deltaX = point.x - state.pointer.previousX
      const deltaY = point.y - state.pointer.previousY
      const distance = Math.hypot(point.x - state.pointer.startX, point.y - state.pointer.startY)
      state.pointer.moved = state.pointer.moved || distance > 4

      if (state.draggedNode) {
        const world = screenToWorld(point)
        state.draggedNode.x = world.x
        state.draggedNode.y = world.y
      } else {
        state.offsetX += deltaX
        state.offsetY += deltaY
      }

      state.pointer.previousX = point.x
      state.pointer.previousY = point.y
      showTooltip(state.draggedNode, point)
      requestDraw()
    })

    const finishPointer = event => {
      if (!state.pointer) return
      const point = pointerPosition(event)
      const clickedNode = state.pointer.node && !state.pointer.moved && hitTest(point) === state.pointer.node
      const target = state.pointer.node
      const moved = state.pointer.moved
      state.pointer = null
      state.draggedNode = null
      setHoveredNode(hitTest(point), point)
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId)
      if (clickedNode) selectNode(target)
      else if (!moved) clearSelection()
    }

    canvas.addEventListener('pointerup', finishPointer)
    canvas.addEventListener('pointercancel', event => {
      state.pointer = null
      state.draggedNode = null
      if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId)
      requestDraw()
    })
    canvas.addEventListener('pointerleave', () => {
      if (!state.pointer) setHoveredNode(null, { x: 0, y: 0 })
    })

    canvas.addEventListener('dblclick', event => {
      const node = hitTest(pointerPosition(event))
      if (node) window.location.href = node.url
    })

    const setScale = (nextScale, origin) => {
      const before = screenToWorld(origin)
      state.scale = clamp(nextScale, 0.65, 1.9)
      state.offsetX = origin.x - state.width / 2 - (before.x - state.width / 2) * state.scale
      state.offsetY = origin.y - state.height / 2 - (before.y - state.height / 2) * state.scale
      requestDraw()
    }

    canvas.addEventListener('wheel', event => {
      event.preventDefault()
      const point = pointerPosition(event)
      const factor = event.deltaY > 0 ? 0.9 : 1.1
      setScale(state.scale * factor, point)
    }, { passive: false })

    canvas.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Enter', 'Escape'].includes(event.key)) return
      event.preventDefault()

      if (event.key === 'Escape') {
        state.focusedNode = null
        tooltip.hidden = true
        clearSelection()
        clearSearch()
        resetView()
        return
      }

      if (event.key === 'Enter' && state.focusedNode) {
        selectNode(state.focusedNode, true)
        return
      }

      const currentIndex = state.focusedNode ? nodes.indexOf(state.focusedNode) : -1
      const direction = event.key === 'ArrowLeft' ? -1 : 1
      const nextIndex = (currentIndex + direction + nodes.length) % nodes.length
      state.focusedNode = nodes[nextIndex]
      showTooltip(state.focusedNode, {
        x: state.focusedNode.screenX,
        y: state.focusedNode.screenY
      })
      requestDraw()
    })

    searchForm.addEventListener('submit', event => {
      event.preventDefault()
      const matches = updateSearch()
      if (matches[0]) selectNode(matches[0], true)
    })

    searchInput.addEventListener('input', updateSearch)
    searchInput.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        event.preventDefault()
        const matches = updateSearch()
        if (matches[0]) selectNode(matches[0], true)
      }
      if (event.key === 'Escape') {
        event.preventDefault()
        clearSearch()
        searchInput.blur()
      }
    })
    searchClear.addEventListener('click', () => {
      clearSearch()
      searchInput.focus()
    })

    detailClose.addEventListener('click', clearSelection)
    detailRelated.addEventListener('click', event => {
      const button = event.target.closest('[data-graph-related-node]')
      if (!button) return
      const node = nodeById.get(button.dataset.graphRelatedNode)
      if (node) selectNode(node, true)
    })

    root.querySelector('.knowledge-graph__controls').addEventListener('click', event => {
      const button = event.target.closest('[data-graph-action]')
      if (!button) return
      const action = button.dataset.graphAction
      const center = { x: state.width / 2, y: state.height / 2 }
      if (action === 'random') {
        const candidates = nodes.filter(node => node !== state.selectedNode)
        const node = candidates[Math.floor(Math.random() * candidates.length)] || nodes[0]
        selectNode(node, true)
      }
      if (action === 'motion') {
        state.motionPaused = !state.motionPaused
        updateMotionControl()
        requestDraw()
      }
      if (action === 'zoom-in') setScale(state.scale * 1.15, center)
      if (action === 'zoom-out') setScale(state.scale * 0.85, center)
      if (action === 'reset') {
        clearSelection()
        clearSearch()
        resetView()
      }
    })

    root.querySelectorAll('[data-graph-node]').forEach(link => {
      link.addEventListener('focus', () => {
        state.focusedNode = nodeById.get(link.dataset.graphNode) || null
        if (state.focusedNode) {
          showTooltip(state.focusedNode, {
            x: state.focusedNode.screenX,
            y: state.focusedNode.screenY
          })
        }
        requestDraw()
      })
      link.addEventListener('blur', () => {
        state.focusedNode = null
        tooltip.hidden = true
        requestDraw()
      })
    })

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(root)

    if ('IntersectionObserver' in window) {
      const intersectionObserver = new IntersectionObserver(entries => {
        state.visible = entries[0].isIntersecting
        if (state.visible) requestDraw()
      }, { rootMargin: '120px' })
      intersectionObserver.observe(root)
    }

    document.addEventListener('visibilitychange', () => {
      state.pageVisible = !document.hidden
      if (state.pageVisible) requestDraw()
    })

    const themeObserver = new MutationObserver(requestDraw)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })

    updateMotionControl()
    resize()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initKnowledgeGraph, { once: true })
  } else {
    initKnowledgeGraph()
  }

  document.addEventListener('pjax:complete', initKnowledgeGraph)
})()
