document.addEventListener('DOMContentLoaded', () => {

    //card options
    const cardArray = [
        {
            name: 'smGame1',
            img: 'images/smGame1.png'
        },
        {
            name: 'smGame1',
            img: 'images/smGame1.png'
        },
        {
            name: 'smGame2',
            img: 'images/smGame2.png'
        },
        {
            name: 'smGame2',
            img: 'images/smGame2.png'
        },
        {
            name: 'smGame3',
            img: 'images/smGame3.png'
        },
        {
            name: 'smGame3',
            img: 'images/smGame3.png'
        },
        {
            name: 'smGame4',
            img: 'images/smGame4.png'
        },
        {
            name: 'smGame4',
            img: 'images/smGame4.png'
        },
        {
            name: 'smGame5',
            img: 'images/smGame5.png'
        },
        {
            name: 'smGame5',
            img: 'images/smGame5.png'
        },
        {
            name: 'smGame6',
            img: 'images/smGame6.png'
        },
        {
            name: 'smGame6',
            img: 'images/smGame6.png'
        }
    ]

    cardArray.sort(() => 0.5 - Math.random())

    const grid = document.querySelector('.grid')
    const resultDisplay = document.querySelector('#result')
    var cardsChosen = []
    var cardsChosenId = []
    var cardsWon = []


    //create board
    function createBoard() {
        for (let i = 0; i < cardArray.length; i++) {
            var card = document.createElement('img')
            card.setAttribute('src', 'images/smGameBlank.png')
            card.setAttribute('data-id', i)
            card.addEventListener('click', flipcard)
            grid.appendChild(card)
        }
    }

    // check for matches
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
            cards[optionOneId].setAttribute('src', 'images/smGameBlank.png')
            cards[optionTwoId].setAttribute('src', 'images/smGameBlank.png')
            alert('Um, nope')
        }
        cardsChosen = []
        cardsChosenId = []
        resultDisplay.textContent = cardsWon.length
        if (cardsWon.length === cardArray.length / 2) {
            resultDisplay.textContent = 'Woohoo! All matches have been found!'
        }
    }

    // flip card
    function flipCard() {
        var cardId = this.getAttribute('data-id')
        cardsChosen.push(cardArray[cardId].name)
        cardsChosenId.push(cardId)
        this.setAttribute('src', cardArray[cardId].img)
        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500)
        }
    }
    createBoard()

})