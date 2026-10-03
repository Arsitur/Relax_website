import { lockScroll, unlockScroll, starsAnim } from "./utils.js";

// Search placeholder

const search = document.querySelector('.filter-section>.content>.search>input')
const searchPlaceholder = document.querySelector('.filter-section>.content>.search>.placeholder>span')

search.addEventListener('focus', () =>
{
    searchPlaceholder.style.opacity = '0'
})
search.addEventListener('blur', (e) =>
{
    if (e.target.value == '')
    {
        searchPlaceholder.style.opacity = '1'
    }

})

// Categories

const categoriesPopup = document.querySelector(".filter-section>.content>.categories>.popup");
const categoriesBttn = document.querySelector(".filter-section>.content>.categories")

document.addEventListener('click', (event) =>
{
    if (!categoriesPopup.contains(event.target))
    {
        categoriesPopup.classList.remove('show');
    }
});

categoriesBttn.addEventListener('click', (e) =>
{
    e.stopPropagation();
    categoriesPopup.classList.toggle('show')
})



// Prevent clicks within the categoriesPopup from closing it
categoriesPopup.addEventListener('click', (event) =>
{
    event.stopPropagation();
});

// Menu 

const menuButton = document.querySelector("#menu-bttn");
const menuExitButton = document.querySelector(".exit-menu-side");
const menuOverlay = document.querySelector("#menu-overlay");
const menuSide = document.querySelector('.menu-side');

menuButton.addEventListener('click', () =>
{
    openMenu()
})

menuOverlay.addEventListener('click', () =>
{
    closeMenu()
})
menuExitButton.addEventListener('click', closeMenu)

function openMenu()
{
    menuOverlay.classList.add('show');
    menuSide.classList.add('show');
    lockScroll();
}

function closeMenu()
{
    menuOverlay.classList.remove('show');
    menuSide.classList.remove('show');
    unlockScroll();
}

// Item Popup
const reviewSide = document.querySelector('.reviews-side')
const reviewSideBack = document.querySelector(".item-popup>.reviews-side>.content>.header>.first>.back")
const reviewSideBttn = document.querySelector('.item-popup>.text>.reviews>.num')
const reviewWordsSpan = document.querySelector('.item-popup>.reviews-side>.content>.create-review>.textarea>.max>span')


reviewSideBttn.addEventListener('click', () =>
{
    reviewSide.classList.add('show');
})

reviewSideBack.addEventListener('click', () =>
{
    reviewSide.classList.remove('show');
    reviewWordsSpan.innerText = "0";

    createReviewBttn.classList.remove('active')
    reviewsDiv.classList.add('active');
    createReviewDiv.classList.remove('active');
    xSVG.classList.remove('active')
})

// Custom Mouse

const popupImageDiv = document.querySelector('.item-popup>.image');
const customMouse = document.querySelector('.item-popup>.image>.mouse');

let isMouseMoving = false;

popupImageDiv.addEventListener('mousemove', (e) =>
{
    if (!isMouseMoving)
    {
        isMouseMoving = true;
        requestAnimationFrame(() =>
        {
            const containerRect = popupImageDiv.getBoundingClientRect();
            const followerSize = 48;
            const x = e.clientX - containerRect.left - followerSize / 2;
            const y = e.clientY - containerRect.top - followerSize / 2;

            const maxX = containerRect.width - followerSize;
            const maxY = containerRect.height - followerSize;

            const clampedX = Math.min(Math.max(x, 0), maxX);
            const clampedY = Math.min(Math.max(y, 0), maxY);

            customMouse.style.left = clampedX + 'px';
            customMouse.style.top = clampedY + 'px';

            isMouseMoving = false;
        });
    }
});

const zoomImage = document.querySelector('.item-popup>.image>img')

popupImageDiv.addEventListener('mousedown', (e) =>
{
    const boundingBox = popupImageDiv.getBoundingClientRect();
    const clickX = e.clientX - boundingBox.left;
    const clickY = e.clientY - boundingBox.top;

    const zoomOriginX = (clickX / boundingBox.width) * 100 + '%';
    const zoomOriginY = (clickY / boundingBox.height) * 100 + '%';

    zoomImage.style.transformOrigin = `${zoomOriginX} ${zoomOriginY}`;
    zoomImage.classList.add('zoom');
});

window.addEventListener('mouseup', (e) =>
{
    zoomImage.classList.remove('zoom');
});

// Create Review



// Admin popup

// More filter

const moreFilter = document.querySelector(".more-filter")
const exitMoreFilter = document.querySelector(".more-filter>.content>.exit");
const moreFilterButton = document.querySelector('.filter-section>.content>.more');

moreFilterButton.addEventListener('click', () =>
{
    moreFilter.classList.add('show');
})

exitMoreFilter.addEventListener('click', () =>
{
    moreFilter.classList.remove('show');
})