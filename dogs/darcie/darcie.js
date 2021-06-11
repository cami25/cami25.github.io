/*const cards = document.querySelectorAll('.memory-card');

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
*/


// js #2
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
