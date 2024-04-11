import { useState } from 'react';

interface cards {
    id: number,
    minus: boolean,
    plus: boolean,
    win: boolean,
};

interface ITypes {
    cardsItems: cards[],
    cardsWins: number[],
    generate: (id: number | null) => void,
    lifePlus: () => void,
    lifeMinus: () => void,
    lifeCount: number
};

export const useLogic = (): ITypes => {
    const initState: cards[] =  [
        {id: 0, minus: false, plus: false, win: false},
        {id: 1, minus: false, plus: false, win: false},
        {id: 2, minus: false, plus: false, win: false},
        {id: 3, minus: false, plus: false, win: false},
        {id: 4, minus: false, plus: false, win: false},
        {id: 5, minus: false, plus: false, win: false},
        {id: 6, minus: false, plus: false, win: false},
        {id: 7, minus: false, plus: false, win: false},
        {id: 8, minus: false, plus: false, win: false},
    ];

    const [cardsItems, setCardsItems] = useState(initState);
    const [cardsWins, setCardsWins] = useState<number[]>([]); // уже выигранные карты
    const COUNT_CARDS_WIN: number = 3; // количество карт, которые надо угадать
    const COUNT_CARDS_PLUS: number = 4; // количество карт, которые добавляют жизнь
    const COUNT_CARDS_MINUS: number = 2; // количество карт, которое отнимает жизнь
    const [lifeCount, setLifeCount] = useState<number>(3);

    const lifePlus = () => {
        setLifeCount(prev => prev + 1);
    };
    const lifeMinus = () => {
        setLifeCount(prev => prev - 1);
        if(lifeCount === 1){
            alert("Lose");
            gameOver();
        };
    };

    const gameOver = () => {
        setCardsItems(initState);
        setCardsWins([]);
        setLifeCount(3);
        console.log()
    };
        // функция обновления поля
    const generate = (id: number | null) => {
        let indexCards: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        let minusArray: number[] = [];
        let plusArray: number[] = [];
        let winArray: number[] = [];
        let winCounter = COUNT_CARDS_WIN;
        let currentCardsWins = [...cardsWins];

        if(id !== null){
            currentCardsWins.push(id);
            setCardsWins(currentCardsWins);
        } // условие обработки угаданной карты

        currentCardsWins.forEach(item => indexCards.splice(item, 1)); // вырезаем угаданные карты

        function removeRandomNumber(array: number[]) {
            const randomIndex = Math.floor(Math.random() * array.length);
            const selectedNumber = array[randomIndex];
            array.splice(randomIndex, 1);
            return selectedNumber;
        };

        for (let i = 0; i < COUNT_CARDS_MINUS; i++) {
            let randomNumber = removeRandomNumber(indexCards);
            minusArray.push(randomNumber);
        };

        for (let i = 0; i < COUNT_CARDS_PLUS; i++) {
            let randomNumber = removeRandomNumber(indexCards);
            plusArray.push(randomNumber);
        };

        winArray = indexCards;

        const newCards = cardsItems.map((item)=>{
            if (minusArray.includes(item.id)) return {...item, minus: true, plus: false, win: false}
            if (plusArray.includes(item.id)) return {...item, plus: true, minus: false, win: false}
            if (winArray.includes(item.id)) return {...item, win: true, minus: false, plus: false}
            else {return  item};
        });

        setCardsItems(newCards);
        if(lifeCount === 0) {
            alert("Lose");
            gameOver();
        } else if (currentCardsWins.length === COUNT_CARDS_WIN) {
            alert("Win");
            gameOver();
        };
    };

    return {
        cardsItems,
        generate,
        cardsWins,
        lifePlus,
        lifeMinus,
        lifeCount
    }
}