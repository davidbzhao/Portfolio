const sections = document.getElementById("content-sections");

function getCurrentPosition() {
    const currentY = sections.scrollTop;
    const contentSections = document.querySelectorAll(".content-section");
    const contentSectionHeight = contentSections[0].offsetHeight;
    const sectionIndex = Math.floor(currentY / contentSectionHeight);
    const top = sectionIndex * contentSectionHeight;
    const bottom = top + contentSectionHeight;
    const percent = (currentY - top) / (bottom - top);
    return [sectionIndex, percent];
}

function getSectionColorGrids() {
    const defaultGrid = `[
        [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
        [[0, 0, 25], [255, 255, 255], [0, 0, 25]],
        [[0, 0, 50], [0, 0, 50], [0, 0, 50]]
    ]`;
    const contentSections = document.querySelectorAll(".content-section");
    const grids = Array.from(contentSections).map((s) =>
        JSON.parse(s.dataset.gridIcon ?? defaultGrid)
    );
    return grids;
}

function interpolateColorGrid(colorGrid1, colorGrid2, percent) {
    const newGrid = [];
    for (let r = 0; r < 3; r++) {
        const newRow = [];
        for (let c = 0; c < 3; c++) {
            const [r1, g1, b1] = colorGrid1[r][c];
            const [r2, g2, b2] = colorGrid2[r][c];
            const r3 = Math.floor(r1 * (1 - percent) + r2 * percent);
            const g3 = Math.floor(g1 * (1 - percent) + g2 * percent);
            const b3 = Math.floor(b1 * (1 - percent) + b2 * percent);
            newRow.push([r3, g3, b3]);
        }
        newGrid.push(newRow);
    }
    return newGrid;
}

function applyColorGrid(colorGrid) {
    const gridIcon = document.getElementById("grid-icon");
    const gridIconSvg = gridIcon.children[0];
    const rects = gridIconSvg.children;
    Array.from(rects).forEach((rect, i) => {
        const [r, c] = [Math.floor(i / 3), i % 3];
        rect.style.fill = tupleToRGB(colorGrid[r][c]);
    });
}

function tupleToRGB(threeTuple) {
    return `rgb(${threeTuple.join(", ")})`;
}

function handleScroll() {
    const [sectionIndex, percent] = getCurrentPosition();

    const grids = getSectionColorGrids();
    const prevGrid = grids[sectionIndex];
    const nextGrid = grids[sectionIndex + 1] || grids[sectionIndex];
    const interpolatedGrid = interpolateColorGrid(prevGrid, nextGrid, percent);
    applyColorGrid(interpolatedGrid);
}

sections.onscroll = handleScroll;
handleScroll();

/**
 * Sets the age in the HTML element with ID 'age' and 'age-plus-one'.
 */
function setAge() {
    // Get age assuming August 1, 1999 birthday.
    const approxBirthDate = new Date(1999, 7, 1);
    const today = new Date();
    let age = today.getFullYear() - approxBirthDate.getFullYear();
    const monthDiff = today.getMonth() - approxBirthDate.getMonth();
    if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < approxBirthDate.getDate())
    ) {
        age--;
    }
    document.getElementById("age").innerText = age;
    document.getElementById("age-plus-one").innerText = age + 1;
}

setAge();

/**
 * When you hover over the doggos image, add random bark sounds to the screen.
 */
const doggosImage = document.getElementById("doggos");
const barkTexts = ["bark", "bork", "woof", "ruff", "arf", "yip", "voff", "guk"];
doggosImage.addEventListener("mouseenter", () => {
    const interval = setInterval(() => {
        const bark = document.createElement("span");
        bark.className = "bark";
        // Randomize the bark sound
        const barkSound = barkTexts[Math.floor(Math.random() * barkTexts.length)];
        bark.innerText = `${barkSound} ${barkSound}`;
        // Randomize the position
        bark.style.left = `${Math.random() * 80 + 10}%`;
        bark.style.top = `${Math.random() * 80 + 10}%`;
        // Randomize the rotation, between -20 and 20 degrees
        bark.style.transform = `rotate(${Math.random() * 40 - 20}deg)`;

        // Start visible then fade out
        bark.classList.add("visible");
        document.body.appendChild(bark);
        setTimeout(() => bark.classList.add("hidden"), 500);
        setTimeout(() => bark.remove(), 2000);
    }, 700);

    doggosImage.addEventListener(
        "mouseleave",
        () => {
            clearInterval(interval);
        },
        { once: true }
    );
});
