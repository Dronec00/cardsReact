import React from 'react';
import {useLogic} from './useLogic';

interface Card {
    id: number,
    minus: boolean,
    plus: boolean,
    win: boolean
}

const Cards: React.FC = () => {
    const { cardsItems } = useLogic();
    return (
        <div>
            {cardsItems.map((card: Card) => {
                return <button key={card.id}>

                </button>
            })}
        </div>
    );
};

export default Cards;