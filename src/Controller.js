import './View.js'
import { devTool } from './View.js'

const d = document
const w = window

// Lets declare all of the draggable objects in the game.
// In the proper envirement we would not have this declaration, and instead push
// new game objects straight up to the game view, or to other proper container.
let draggables = [d.querySelector('#objectA'), d.querySelector('#objectB')]

// Constants
const gameView = d.querySelector('#game-view')

// State variables
let gameViewWidth = gameView.offsetWidth
let gameViewHeight = gameView.offsetHeight

// Initiation of the application
draggables.forEach((object) => {
  // Object properties
  const objectWidth = object.offsetWidth
  const objectHeight = object.offsetHeight
  // Simple logic - the furthest position of the top left point is always width
  // of the parent minus width of the element. If either parent of element
  // change the size then the logic working accordingly.
  const maxX = gameViewWidth - objectWidth
  const maxY = gameViewHeight - objectHeight

  // The idea is to snap shot the position of cursor and object and then change
  // the location of the object appropreately depending on the change in the
  // cursor position.
  // We also want to do it with multiple event listeners
  object.addEventListener('mousedown', (event) => {
    // Dev tools stuff
    devTool.targetName(event.target.id)
    devTool.cursorState('Mouse Hold')

    // Initial cursor and game object position snapshots, from here on we use
    // this as a reference of how much the new position is different.
    const cursorOriginalX = event.clientX
    const cursorOriginalY = event.clientY
    const objectOriginalX = event.target.offsetLeft
    const objectOriginalY = event.target.offsetTop

    const dragTo = (event) => {
      // Lets find out the difference of how much cursor has moved and add it
      // to the original object position, so we have a new position of the
      // object.
      const cursorNewX = event.clientX - cursorOriginalX
      const cursorNewY = event.clientY - cursorOriginalY
      const dragToX = objectOriginalX + cursorNewX
      const dragToY = objectOriginalY + cursorNewY

      // Super duper cool ternary way of finding edges of the viewport and not
      // letting the objet to go pass it.
      object.style.left =
        dragToX < 0 ? '0px' : dragToX > maxX ? maxX + 'px' : dragToX + 'px'

      object.style.top =
        dragToY < 0 ? '0px' : dragToY > maxY ? maxY + 'px' : dragToY + 'px'

      devTool.cursorPosition(cursorNewX, cursorNewY)
    }
    // Adding and removing functionality of the object to the document
    // depending on the mouse click and release
    d.addEventListener('mousemove', dragTo)
    d.addEventListener('mouseup', () => {
      // Dev tools stuff
      devTool.reset()
      d.removeEventListener('mousemove', dragTo)
    })
  })

  // Updating the position of the game object according to the window resizing
  w.addEventListener('resize', () => {
    // Updating the state
    gameViewWidth = gameView.offsetWidth
    gameViewHeight = gameView.offsetHeight
    // Returning booleans for the conditionals below
    const tooWide = object.offsetLeft + object.offsetWidth > gameViewWidth
    const tooTall = object.offsetTop + object.offsetHeight > gameViewHeight
    // Changing the position if needed
    if (tooWide) object.style.left = gameViewWidth - objectWidth + 'px'
    if (tooTall) object.style.top = gameViewHeight - objectHeight + 'px'
  })
})

// Dev tools stuff
d.addEventListener('mousemove', (event) =>
  devTool.cursorPosition(event.clientX, event.clientY)
)
