import React, {useState} from 'react';

interface cards {
    id: number,
    minus: boolean,
    plus: boolean,
    win: boolean
}

export const useLogic = () => {
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
    ]
    const [cardsItems, setCardsItems] = useState(initState)
    return {
        cardsItems
    }
}