/***** State (Data) *****/

let userName = null

        
/***** Rendering *****/

const root = document.querySelector("#root")

// Colors
const RED = "#ef6461"
const GREEN = "#79b473"

// Icons
const QUESTION = "question"
const HAND = "hand"

// Render when the page first loads in
renderApp() 

// Top-level rendering function
function renderApp() {
    // Empty out the root
    while(root.hasChildNodes()) {
        root.removeChild(root.firstChild)
    }
    // Render based on if there's a user name
    if(userName) {
        root.appendChild(renderYesName())
    } else {
        root.appendChild(renderNoName())
    }
}

// Render if there is a user name
function renderYesName() {
    const div = document.createElement("div")
    div.className = "w-50"
    div.innerHTML = `
        <div class="text-center">
            ${renderIcon(HAND, GREEN, "animate animate-wave fs-15rem")}
        </div>
        ${renderBigMessage(`Hey ${userName}!<br/>Great to see you!`)}
        <div class="d-flex gap-3 justify-content-center fs-2rem">
            <button class="btn btn-outline-light btn-lg">Profile</button>
            <button class="btn btn-outline-light btn-lg">Messages</button>
            <button class="btn btn-outline-light btn-lg">Tasks</button>
        </div>
    `
    return div
}

// Render if there isn't a user name
function renderNoName() {
    const div = document.createElement("div")
    div.className = "w-50"
    div.innerHTML = `
        <div class="text-center">
            ${renderIcon(QUESTION, RED, "animate animate-pulse fs-15rem")}
        </div>
        ${renderBigMessage(`
            Never seen you before!<br />
            What's your name?
        `)}
        <form id="name-form">
            <input id="name-input" type="text" class="form-control form-control-lg fs-2rem" autofocus />
        </form>
    `
    // Look within the div to find the input and the form
    const input = div.querySelector("#name-input")
    const form = div.querySelector("#name-form")

    // Hook up event listener when form is submitted (with an enter in the textbox)
    const saveName = (event) => {
        event.preventDefault() // prevent page refresh
        // Change the state and then rerender based on the updated state
        userName = input.value
        renderApp()
    }
    form.addEventListener("submit", saveName)

    return div
}

// Render an h1 with very large text
function renderBigMessage(message) {
    return `
        <h1 class="display-1 mb-5 mt-4 text-center fs-4rem">
            ${message}
        </h1>
    `
}

// Render a Font Awesome icon with a color, and optionally any needed styling
function renderIcon(type, color = "black", className = "") {
    if(type === QUESTION) {
        return `
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512" fill="${color}" class="${className}">
                <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path d="M80 160c0-35.3 28.7-64 64-64h32c35.3 0 64 28.7 64 64v3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74V320c0 17.7 14.3 32 32 32s32-14.3 32-32v-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7V160c0-70.7-57.3-128-128-128H144C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"/>
            </svg>
        `
    } else if(type === HAND) {
        return `
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" fill="${color}" class="${className}">
                <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                <path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V240c0 8.8-7.2 16-16 16s-16-7.2-16-16V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V336c0 1.5 0 3.1 .1 4.6L67.6 283c-16-15.2-41.3-14.6-56.6 1.4s-14.6 41.3 1.4 56.6L124.8 448c43.1 41.1 100.4 64 160 64H304c97.2 0 176-78.8 176-176V128c0-17.7-14.3-32-32-32s-32 14.3-32 32V240c0 8.8-7.2 16-16 16s-16-7.2-16-16V64c0-17.7-14.3-32-32-32s-32 14.3-32 32V240c0 8.8-7.2 16-16 16s-16-7.2-16-16V32z"/>
            </svg>
        `
    } else {
        return ""
    }
}