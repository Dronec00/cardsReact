import { useEffect, memo } from 'react';
import { Logic } from '../Logic';
import Card from '../Card/Card';
import './cards.scss';

const Cards = () => {
    const { cardsItems, updateCardOutcomes, cardsWins, lifeMinus, lifePlus, lifeCount, isGameOver } = Logic();
    console.log(cardsWins);
    const isWin = cardsWins.length === 3;
    const isLose = lifeCount === 0;
    const endGame = isWin || isLose;

    console.log(isWin)
    useEffect(()=>{
        updateCardOutcomes(null);
    },[endGame]); // генерируем значения карточек при монтировании Cards и когда заканчиваем игру каким-то образом

    useEffect(()=>{
        isGameOver();
    },[cardsItems]); // вызываем проверку, закончена ли игра после каждого клика

    return <>
        <p>Жизни: {lifeCount}</p>
        <div className= "cards">
            {endGame
                ?
                cardsItems.map((card) => <button key={card.id} className="cards__item"></button> )
                :
                cardsItems.map((card) => <Card key={card.id} {...card} updateCardOutcomes = {updateCardOutcomes} cardsWins = {cardsWins} lifeMinus = {lifeMinus} lifePlus = {lifePlus} lifeCount = {lifeCount} />)
            }
        </div>
    </>
        ;
};

export default memo(Cards);