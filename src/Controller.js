import Target from './Objects/Target.js'
import './View.js'
import { devTool } from './View.js'

const d = document
const w = window
const body = d.querySelector('body')

// Lets declare all of the draggable objects in the game.
// In the proper envirement we would not have this declaration, and instead push
// new game objects straight up to the game view, or to other proper container.
let draggables = [
    d.querySelector('#objectA'),
    d.querySelector('#objectB')
]

// --------------------------------------     STATE VARIABLES      -------------------------------------
let selectedTarget = null
let draggedFromX = 0
let draggedFromY = 0

// ----------------------------------------     INITIATION      ----------------------------------------
const gameObjects = draggables.map(object => new Target(object))


// ----------------------------------------     MOUSE MOVE      ----------------------------------------
body.addEventListener('mousemove', (event) => {
    // Cursor position
    const cursorX = event.clientX - draggedFromX
    const cursorY = event.clientY - draggedFromY

    if (selectedTarget) selectedTarget.dragTo(cursorX, cursorY)

    // Developer Console
    devTool.cursorPosition(cursorX, cursorY)
})


// ----------------------------------------     MOUSE DOWN      ----------------------------------------
body.addEventListener('mousedown', (event) => {
    // State management
    draggedFromX = event.clientX
    draggedFromY = event.clientY
    // 
    selectedTarget = gameObjects.find(target => target.name === event.target.id)

    // Developer Console
    devTool.cursorState('Pressed')
    if (selectedTarget) devTool.targetName(selectedTarget.name)
})


// -----------------------------------------     MOUSE UP      -----------------------------------------
body.addEventListener('mouseup', (event) => {
    // State management
    if (selectedTarget) selectedTarget.updateState()

    selectedTarget = null
    draggedFromX = 0
    draggedFromY = 0

    // Developer Console
    devTool.cursorState('Idle')
    devTool.targetName('Empty')
})


// ----------------------------------------     MOUSE LEAVE      ---------------------------------------
body.addEventListener('mouseleave', (event) => {

    // Developer Console
    devTool.cursorState('Away')
})


// --------------------------------------     VIEWPORT RESIZE      -------------------------------------
w.addEventListener('resize', (event) => {
    gameObjects.forEach(object => object.updateState())
})
