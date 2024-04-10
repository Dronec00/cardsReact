import React, {useEffect, useState} from 'react';
import {useLogic} from '../useLogic';
import Card from '../Card/Card';
import './cards.css';

interface Card {
    id: number,
    minus: boolean,
    plus: boolean,
    win: boolean
}

const Cards: React.FC = () => {
    const { cardsItems, generate, check } = useLogic();
    useEffect(()=>{
        generate(null)
    },[]);
    return (
        <div className='cards'>
            {cardsItems.map((card: Card) => {
                return (
                    <Card key={card.id} {...card} />
                    );
            })}
        </div>
    );
};

export default Cards;