const NAME_HEIGHT_VH = 100;
const STICKY_TOP_VH = 40;
const EVENT_MARGIN_BOTTOM_VH = 50;
const HEIGHT_CHANGE_THRESHOLD = 100;

let prevInnerHeight = window.innerHeight;
let vh = prevInnerHeight * 0.01;

const updatePrefix = () => {
    const prefix = document.getElementsByClassName('prefix')[0];
    const prefixText = prefix.getElementsByTagName('h1')[0];

    prefixText.style.top = `${STICKY_TOP_VH * vh}px`;
}

const updateNameCard = () => {
    const nameCard = document.getElementById('name');
    nameCard.style.height = `${NAME_HEIGHT_VH * vh}px`;
    
    const nameText = nameCard.getElementsByTagName('h1')[0];
    nameText.style.top = `${STICKY_TOP_VH * vh}px`;
}

const updateEventCards = () => {
    const eventDivs = document.getElementsByClassName('event');
    Array.from(eventDivs).map(el => {
        el.style.marginBottom = `${EVENT_MARGIN_BOTTOM_VH * vh}px`;
    });
}

const updateContactCard = () => {
    const contactCard = document.getElementById('contact');
    const newMarginBottom = window.innerHeight - window.innerHeight * 0.01 * 40 - contactCard.offsetHeight;
    contactCard.style.marginBottom = `${newMarginBottom}px`;
}

const updateElements = () => {
    updateNameCard();
    updateEventCards();
    updatePrefix();
    updateContactCard();
}

window.addEventListener('resize', () => {
    if (Math.abs(window.innerHeight - prevInnerHeight) > HEIGHT_CHANGE_THRESHOLD) {
        prevInnerHeight = window.innerHeight;
        vh = prevInnerHeight * 0.01;
        updateElements();
    }
});

// Fonts affect size of elements, so we have to wait for them to load first
document.fonts.ready.then(updateElements);