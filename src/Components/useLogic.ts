import React, {useState} from 'react';

interface cards {
    id: number,
    minus: boolean,
    plus: boolean,
    win: boolean,
};

interface LogicTypes {
    cardsItems: cards[],
    generate: (id: number | null) => void,
    check: (id: number) => void
};

export const useLogic = (): LogicTypes => {
    const initState: cards[] = [
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
    const [cardsWins, setCardsWins] = useState<number[]>([])
    const [win, setWin] = useState<number>(2); // количество карт, которые надо угадать
    const [plus, setPlus] = useState<number>(2); // количество карт, которые добавляют жизнь
    const [minus, setMinus] = useState<number>(5); // количество карт, которое отнимает жизнь
    const [minusArray, setMinusArray] = useState<number[]>([]);
    const [plusArray, setPlusArray] = useState<number[]>([]);
    const [winArray, setWinArray] = useState<number[]>([]);

    // функция обновления поля
    const generate = (id: number | null) => {
        let indexCards = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        let minusArray: number[] = [];
        let plusArray: number[] = [];
        let winArray: number[] = [];

        function removeRandomNumber(array: number[]) {
            const randomIndex = Math.floor(Math.random() * array.length);
            const selectedNumber = array[randomIndex];
            array.splice(randomIndex, 1);
            return selectedNumber;
        };

        for (let i = 0; i < minus; i++) {
            let randomNumber = removeRandomNumber(indexCards);
            minusArray.push(randomNumber);
        };

        for (let i = 0; i < plus; i++) {
            let randomNumber = removeRandomNumber(indexCards);
            plusArray.push(randomNumber);
        };

        winArray = indexCards;

        const newCards = cardsItems.map((item)=>{
            if (minusArray.includes(item.id)) {return {...item, minus: true}}
            if (plusArray.includes(item.id)) {return {...item, plus: true}}
            if (winArray.includes(item.id)) {return {...item, win: true}}
            else {return  item};
        });

        setCardsItems(newCards)
        console.log('sdsd')
    };

    const check = (id: number) => {
        if (minusArray.includes(id)) {return `minus`};
        if (plusArray.includes(id)) {return `plus`};
        if (winArray.includes(id)) {return `win`}
    }

    return {
        cardsItems,
        generate,
        check
    }
}