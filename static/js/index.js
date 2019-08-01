"use strict";

const NAME_HEIGHT_VH = 100;
const STICKY_TOP_VH = 40;
const EVENT_MARGIN_BOTTOM_VH = 50;
const HEIGHT_CHANGE_THRESHOLD = 200;

const ATTRACT_SCROLL_DEBOUNCE_TIME = 100;
const ATTRACT_SCROLL_THRESHOLD = 125;

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
    const newMarginBottom = window.innerHeight - vh * 40 - contactCard.offsetHeight;
    contactCard.style.marginBottom = `${newMarginBottom}px`;
}

window.addEventListener('resize', () => {
    if (Math.abs(window.innerHeight - prevInnerHeight) > HEIGHT_CHANGE_THRESHOLD) {
        prevInnerHeight = window.innerHeight;
        vh = prevInnerHeight * 0.01;
        updateNameCard();
        updateEventCards();
        updatePrefix();
    }
    updateContactCard();
});


// Fonts affect size of elements, so we have to wait for them to load first
document.fonts.ready.then(() => {
    updateNameCard();
    updateEventCards();
    updatePrefix();
    updateContactCard();
});


let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    console.log('Timeout is unset')
    const scrollOffset = STICKY_TOP_VH * vh;
    const scrollPosition = window.pageYOffset;
    let titlePosition = 0;
    const titles = document.getElementsByClassName('title');
    for (let cnt = 0; cnt < titles.length; cnt++) {
        titlePosition = titles[cnt].offsetTop - scrollOffset;
        if (Math.abs(titlePosition - scrollPosition) < ATTRACT_SCROLL_THRESHOLD) {
            console.log(titlePosition);
            scrollTimeout = setTimeout(() => {
                window.scrollTo({
                    top: titlePosition,
                    behavior: 'smooth'
                });
            }, ATTRACT_SCROLL_DEBOUNCE_TIME);
            console.log('Timeout is set')
            break;
        }
    }
});

const social = document.getElementById('social');
let socialIndex = 0;
let socialList = ["github", "linkedin", "quora", "facebook", "twitter", "steam"]
const updateSocial = () => {
    socialIndex += 1;
    socialIndex = (socialIndex + 1) % socialList.length;
    social.innerText = socialList[socialIndex];
}
updateSocial();
setInterval(updateSocial, 1500);