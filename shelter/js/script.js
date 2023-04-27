import pets from "./pets.js";

const arrElem = document.querySelectorAll('.card-item');
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.nav-list');
const headerLogo = document.querySelector('.header-logo');
const containerMobileBackground = document.querySelector('.container');
const body = document.querySelector('body');
const menuItem = document.querySelectorAll('.nav-item');


/* При нажатии вне границ меню, на затемненную область, или на кнопку с иконкой бургер меню, 
меню должно заехать обратно. Должна присутствовать анимация заезда (slide-out). */


//================ for adaptive menu

hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('hamburger_active');
    menu.classList.toggle('nav-list-active');
    headerLogo.classList.toggle('header-logo-active');
    containerMobileBackground.classList.toggle('container-mobile-background');
    body.classList.toggle('modal-open');
});

menuItem.forEach((item) => {
    item.addEventListener('click', function () {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('nav-list-active');
        headerLogo.classList.toggle('header-logo-active');
        containerMobileBackground.classList.toggle('container-mobile-background');
        body.classList.toggle('modal-open');
    });
});


//================== for adaptive item-card => change button
arrElem.forEach((elem) => {
    elem.addEventListener('mouseover', function () {
        let button = this.querySelector('button');
        button.classList.add('btn-active');
    });

    elem.addEventListener("mouseout", function () {
        let button = this.querySelector('button');
        button.classList.remove('btn-active');
    })
});

// carousel=========================================

// начальная загрузка карусели 
var cardContainer = document.querySelector('.card-container');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

function showCard(cardNumber) {

    cardContainer.innerHTML = '';
    pets.forEach((elem, index) => {
        if (index >= cardNumber) return;
        cardContainer.innerHTML += `
        <div class="card-item" id="${elem.id}">
        <img src="${elem.img}">
        <p class="pets-name">${elem.name}</p>
        <button class="btn btn-white m-auto mb-30">Learn more</button>
        </div>
        `
    });
}


if (cardContainer.classList.contains('slider-track')) {
    showCard(3);

    btnPrev.addEventListener('click', function () {
        createNewCards(3);
    });

    btnNext.addEventListener('click', function () {
        createNewCards(3);
    });

    window.addEventListener("resize", function () {
        const widthBody = document.body.clientWidth;
        if (widthBody >= 1200) {
            showCard(3);
            btnPrev.addEventListener('click', function () {
                createNewCards(3);
            });
            btnNext.addEventListener('click', function () {
                createNewCards(3);
            });
        } else if (widthBody >= 768) {
            showCard(2);
            btnPrev.addEventListener('click', function () {
                createNewCards(2);
            });
            btnNext.addEventListener('click', function () {
                createNewCards(2);
            });

        } else {
            showCard(1);
            btnPrev.addEventListener('click', function () {
                createNewCards(1);
            });
            btnNext.addEventListener('click', function () {
                createNewCards(1);
            });

        }
    }, false);

    const currentItems = document.querySelectorAll('.slider-track div.card-item');

    let numsOfCurrentItems = []
    currentItems.forEach(elem => numsOfCurrentItems.push(Number(elem.id)));

    function createNewCards(numberCards) {
        let newItems = [];
        let num = null;

        while (newItems.length < numberCards) {
            num = getRndInteger(7);
            if (!numsOfCurrentItems.includes(num) && !newItems.includes(num)) {
                newItems.push(num);
            }
        }

        cardContainer.innerHTML = '';

        newItems.forEach(num => {
            pets.forEach(pets => {
                if (pets.id === num) {
                    //newItemsCards.push(pets);
                    cardContainer.innerHTML += `
                <div class="card-item" id="${pets.id}">
                <img src="${pets.img}">
                <p class="pets-name">${pets.name}</p>
                <button class="btn btn-white m-auto mb-30">Learn more</button>
                </div>
                `
                }
            });
        });

        function getRndInteger(max) {
            return Math.floor(Math.random() * (max - 0 + 1)) + 0;
        }
    }

}

//==================== Popup =======================

cardContainer.addEventListener('click', (event) => {
    const currentCardId = event.target.closest('.card-item').id;
    const popupConatiner = document.querySelector('.popup-container');

    pets.forEach(petsCard => {
        if (petsCard.id === Number(currentCardId)) {
            popupConatiner.innerHTML = '';
            popupConatiner.innerHTML = `
        <div class="popup-card " id=${petsCard.id}>
        <img src=${petsCard.img} class="popup-card-img">
        <div class="popup-content">
            <div class="popup-header">${petsCard.name}</div>
            <div class="popup-subheader">${petsCard.type} - ${petsCard.breed}</div>
            <div class="popup-text">${petsCard.description}</div>
            <ul class="pupup-list-description">
                <li class="popup-description-text"><b>Age:</b> ${petsCard.age}</li>
                <li class="popup-description-text"><b>Inoculations:</b>${petsCard.inoculations}</li>
                <li class="popup-description-text"><b>Diseases:</b>${petsCard.diseases}</li>
                <li class="popup-description-text"><b>Parasites:</b>${petsCard.parasites}</li>
            </ul>
        </div>
    </div>
    <button class="btn-popup"><img src="../../assets/icons/x.png" alt="button"></button>
        `
        }
        popupConatiner.classList.add('popup-open');
        body.classList.add('modal-open');
    });

    const buttonPopup = document.querySelector('.btn-popup');

    buttonPopup.addEventListener('click', function () {
        popupConatiner.classList.remove('popup-open');
        body.classList.remove('modal-open');
    });


});



/* if (window.innerWidth >= 1280) { 
    document.querySelector(".btn-popup").style.marginTop = ((window.innerHeight - 500)/2 - 52) + "px";
    document.querySelector(".btn-popup").style.marginLeft = ((window.innerWidth - 900)/2 + 890) + "px";
} */

/* //Refresh page 
window.addEventListener('resize', function(event){
    window.location.reload();
}); */

