"use strict";

const NAME_HEIGHT_VH = 100;
const STICKY_TOP_VH = 30;
const EVENT_MARGIN_BOTTOM_VH = 50;
const HEIGHT_CHANGE_THRESHOLD = 200;
const ATTRACT_SCROLL_DEBOUNCE_TIME = 100;
const ATTRACT_SCROLL_THRESHOLD = 125;

let prevInnerHeight = window.innerHeight;
let vh = prevInnerHeight * 0.01;

const updatePrefix = () => {
    const prefix = document.getElementById('prefix');
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
    const newMarginBottom = window.innerHeight - vh * STICKY_TOP_VH - contactCard.offsetHeight;
    contactCard.style.marginBottom = `${newMarginBottom}px`;
}

const createScrollBar = () => {
    const scrollBar = document.getElementById('scroll-bar');
    const sections = document.querySelectorAll('#content > div');
    for (let cnt = 0; cnt < sections.length; cnt++) {
        let div = document.createElement("div");
        div.innerText = "—";
        div.dataset.id = cnt;
        scrollBar.appendChild(div);
    }
}

// source: https://gist.github.com/engelen/fbce4476c9e68c52ff7e5c2da5c24a28#gistcomment-2915039
const argmin = array => {
    return [].map.call(array, (x, i) => [x, i]).reduce((r, a) => (a[0] < r[0] ? a : r))[1];
}

const updateScrollBar = () => {
    const scrollPosition = window.pageYOffset;
    const titles = document.querySelectorAll('#content > div h1');
    const scrollOffset = STICKY_TOP_VH * vh;
    const scrollDiffs = Array.from(titles).map(s => {
        return Math.abs((s.offsetTop - scrollOffset) - scrollPosition)
    });
    const closestSection = argmin(scrollDiffs);
    
    const scrollBarDivs = document.querySelectorAll('#scroll-bar > div');
    for (let cnt = 0; cnt < scrollBarDivs.length; cnt++) {
        scrollBarDivs[cnt].classList.remove("current-section");
        if (cnt == closestSection)
            scrollBarDivs[cnt].classList.add("current-section");
    }
}
createScrollBar();

window.addEventListener('resize', () => {
    if (Math.abs(window.innerHeight - prevInnerHeight) > HEIGHT_CHANGE_THRESHOLD) {
        prevInnerHeight = window.innerHeight;
        vh = prevInnerHeight * 0.01;
        updateNameCard();
        updateEventCards();
        updatePrefix();
    }
    updateContactCard();
    updateScrollBar();
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
    updateScrollBar();

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
    socialIndex = (socialIndex + 1) % socialList.length;
    social.innerText = socialList[socialIndex];
}
updateSocial();
setInterval(updateSocial, 1500);