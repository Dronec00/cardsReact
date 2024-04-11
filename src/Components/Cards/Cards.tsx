import { useEffect, memo } from 'react';
import { useLogic } from '../useLogic';
import Card from '../Card/Card';
import './cards.scss';

interface Card {
    id: number,
    minus: boolean,
    plus: boolean,
    win: boolean
}

const Cards = () => {
    const { cardsItems, generate, cardsWins, lifeMinus, lifePlus, lifeCount } = useLogic();

    useEffect(()=>{
        generate(null);
    },[]);
    return <>
        <p>Жизни: {lifeCount}</p>
        <div className= "cards">
                {cardsItems.map((card) => <Card key={card.id}
                                                {...card}
                                                generate = {generate}
                                                cardsWins = {cardsWins}
                                                lifeMinus = {lifeMinus}
                                                lifePlus = {lifePlus}
                                                lifeCount = {lifeCount}
                /> )}
        </div>
    </>
        ;
};

export default memo(Cards);