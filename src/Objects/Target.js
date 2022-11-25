class Target {
    constructor (element) {
        this.element = element
        this.name = element.id

        // Storing the position of the object. This needs to know what coordinates we
        // are moving from. There might be a better solution to this.
        this.positionX = this.element.offsetLeft
        this.positionY = this.element.offsetTop

        this.gameViewWidth = this.element.parentElement.offsetWidth
        this.gameViewHeight = this.element.parentElement.offsetHeight
    }

    dragTo = (x, y) => {
        // Simple logic - the furthest position of the top left point is always width
        // of the parent minus width of the element. If either parent of element change the
        // size then the logic working accordingly.
        const maxX = this.gameViewWidth - this.element.offsetWidth
        const maxY = this.gameViewHeight - this.element.offsetHeight

        // New position equal to the original position of the object plus the amount of the
        // distance of the cursor from its own original position.
        const poisitionX = this.positionX + x
        const poisitionY = this.positionY + y

        // Super duper cool ternary way of finding edges of the viewport
        this.element.style.left = poisitionX < 0 ? '0px'
            : poisitionX > maxX ? maxX + 'px'
                : poisitionX + 'px'

        this.element.style.top = poisitionY < 0 ? '0px'
            : poisitionY > maxY ? maxY + 'px'
                : poisitionY + 'px'

        // We want this object to be on top of other objects when clicking on it
        if (this.element.style.zIndex !== 1000) this.element.style.zIndex = 1000
    }

    updateState() {
        // In case viewport has changed the size
        const tooWide = this.element.offsetLeft + this.element.offsetWidth > this.gameViewWidth
        const tooTall = this.element.offsetTop + this.element.offsetHeight > this.gameViewHeight
        if (tooWide) this.element.style.left = this.gameViewWidth - this.element.offsetWidth + 'px'
        if (tooTall) this.element.style.top = this.gameViewHeight - this.element.offsetHeight + 'px'

        this.positionX = this.element.offsetLeft
        this.positionY = this.element.offsetTop

        this.gameViewWidth = this.element.parentElement.offsetWidth
        this.gameViewHeight = this.element.parentElement.offsetHeight
    }
}