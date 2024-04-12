import { useState } from 'react';

export interface cards {
    id: number,
    minus: boolean,
    plus: boolean,
    win: boolean,
};

interface LogicTypes {
    lifeCount: number,
    cardsItems: cards[],
    cardsWins: number[],

    updateCardOutcomes: (id: number | null) => void,
    lifePlus: () => void,
    lifeMinus: () => void,
    isGameOver: () => void,
};

const initStateCards: cards[] =  [
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

const COUNT_CARDS_WIN: number = 3; // количество карт, которые надо угадать
const COUNT_CARDS_PLUS: number = 2; // количество карт, которые добавляют жизнь
const COUNT_CARDS_MINUS: number = 4; // количество карт, которое отнимает жизнь

export const Logic = (): LogicTypes => {
    const [cardsItems, setCardsItems] = useState<cards[]>(initStateCards);
    const [cardsWins, setCardsWins] = useState<number[]>([]); // уже выигранные карты
    const [lifeCount, setLifeCount] = useState<number>(3);

    const lifePlus = () => {
        setLifeCount(prev => prev + 1);
    };
    const lifeMinus = () => {
        setLifeCount(prev => prev - 1);
    };

    const gameOver = () => {
        setCardsItems(initStateCards);
        setCardsWins([]);
        setLifeCount(3);
    };

    const isGameOver = () => {
        if(lifeCount === 0) {
            alert("Lose");
            gameOver();
        } else if (cardsWins.length === COUNT_CARDS_WIN) {
            alert("Win");
            gameOver();
        };
    };

    // функция обновления значений карт
    const updateCardOutcomes = (winId: number | null) => {
        let indexCards: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        let minusArray: number[] = [];
        let plusArray: number[] = [];
        let winArray: number[] = [];
        let currentCardsWins = [...cardsWins];

        // условие обработки угаданной карты
        if(winId !== null){
            currentCardsWins.push(winId);
            setCardsWins(currentCardsWins);
        }

        currentCardsWins.forEach(item => indexCards.splice(item, 1)); // вырезаем угаданные карты

        //генерация карт
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

        //обновления значений для массива объектов карт
        const newCards = cardsItems.map((item)=>{
            if (minusArray.includes(item.id)) return {...item, minus: true, plus: false, win: false}
            if (plusArray.includes(item.id)) return {...item, plus: true, minus: false, win: false}
            if (winArray.includes(item.id)) return {...item, win: true, minus: false, plus: false}
            return item;
        });

        setCardsItems(newCards);
    };

    return {
        cardsItems,
        updateCardOutcomes,
        cardsWins,
        lifePlus,
        lifeMinus,
        lifeCount,
        isGameOver
    }
}