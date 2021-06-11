// js countdown clock
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const graduation = document.querySelector(".graduation");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

let futureDate = new Date(2021, 5, 13, 1, 0, 0);

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

// number 0-11
let month = futureDate.getMonth();
month = months[month];
const date = futureDate.getDate();

// number 0-6
const weekday = weekdays[futureDate.getDay()];

graduation.textContent = `festivities start ${weekday}, ${month} ${date}, ${year} at ${hours}:${minutes}0pm`;

// future time in ms
const futureTime = futureDate.getTime();

function getRemainingTime() {
    const today = new Date().getTime();
    const t = futureTime - today;

    // 1s = 1000ms
    // 1m = 60s
    // 1hr = 60min
    // 1d = 24hr

    // values in ms
    const oneDay = 24*60*60*1000;
    const oneHour = 60*60*1000;
    const oneMinute = 60*1000;

    // calculate all values
    let days = t / oneDay;
    days = Math.floor(days);
    let hours = Math.floor((t % oneDay) / oneHour);
    let minutes = Math.floor((t % oneHour) / oneMinute);
    let seconds = Math.floor((t % oneMinute) / 1000);

    // set values array;
    const values = [days,hours,minutes,seconds];

    function format(item) {
        if(item < 10) {
            return item = `0${item}`
        }
        return item
    }

    items.forEach(function(item, index) {
        item.innerHTML = format(values[index]);
    });
    if(t < 0) {
        clearInterval(countdown);
        deadline.innerHTML = `<h4 class = "expired">Sorry, you've missed graduation</h4>`;
    }
}

// countdown
let countdown = setInterval(getRemainingTime, 1000);

getRemainingTime();
// end js countdown clock


// js failed memory game attempt #1
const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if (lockBoard) {
        return;
    }
    if (this === firstCard) {
        return;
    }

    this.classList.add('flip');
    
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    hasFlippedCard =  lockBoard = false;
    firstCard = secondCard = null
  }

(function shuffle() {
    cards.forEach(card => {
        const randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
// end game #1


// js failed memory game attempt #2
document.addEventListener('DOMContentLoaded', () => {

    // card options
    const cardArray = [
        {
            name: 'game1',
            img: 'images/smGame1.png'
        },
        {
            name: 'game1',
            img: 'images/smGame1.png'
        },
        {
            name: 'game2',
            img: 'images/smGame2.png'
        },
        {
            name: 'game2',
            img: 'images/smGame2.png'
        },
        {
            name: 'game3',
            img: 'images/smGame3.png'
        }, 
        {
            name: 'game3',
            img: 'images/smGame3.png'
        },
        {
            name: 'game4',
            img: 'images/smGame4.png'
        },
        {
            name: 'game4',
            img: 'images/smGame4.png'
        },
        {
            name: 'game5',
            img: 'images/smGame5.png'
        },
        {
            name: 'game5',
            img: 'images/smGame5.png'
        },
        {
            name: 'game6',
            img: 'images/smGame6.png'
        },
        {
            name: 'game6',
            img: 'images/smGame6.png'
        }
    ]
    
    cardArray.sort(() => 0.5 - Math.random())


    const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector('#result')
    var cardsChosen = []
    var cardsChosenId = []
    var cardsWon = []


    //create the board
    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            var card = document.createElement('img')
            card.setAttribute('src', 'images/smGameBack.png')
            card.setAttribute('data-id', i)
            card.addEventListener('click', flipCard)
            grid.appendChild(card)
        }
    }
    
    //check for matches
    function checkForMatch() {
        var cards = document.querySelectorAll('img')
        const optionOneId = cardsChosenId[0]
        const optionTwoId = cardsChosenId[1]
        if (cardsChosen[0] === cardsChosen[1]) {
            alert('Success!')
            cards[optionOneId].setAttribute('src', 'images/smGameWhite.png')
            cards[optionTwoId].setAttribute('src', 'images/smGameWhite.png')
            cardsWon.push(cardsChosen)
        } else {
            cards[optionOneId].setAttribute('src', 'images/smGameBack.png')
            cards[optionTwoId].setAttribute('src', 'images/smGameBack.png')
            alert('Oops')
        }
        cardsChosen = []
        cardsChosenId = []
        resultDisplay.textContent = cardsWon.length
        if (cardsWon.length === cardArray.length/2) {
            resultDisplay.textContent = 'Woohoo! You are a matching whiz!'
        }
    }

    //flip cards
    function flipCard() {
        var cardId = this.getAttribute('data-id')
        cardsChosen.push(cardArray[cardId].name)
        cardsChosenId.push(cardId)
        this.setAttribute('src', cardArray[cardId].img)
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 800)
        }
    }
    createBoard()
})

// end game #2