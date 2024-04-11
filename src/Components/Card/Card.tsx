import { useState, memo } from 'react';

interface IProps {
    id: number,
    lifeCount: number,
    minus: boolean,
    plus: boolean,
    win: boolean,
    generate: (id: number | null) => void,
    lifeMinus: () => void,
    lifePlus: () => void,
    cardsWins: number[]
};

const Card = ({id, plus, minus, win, generate, cardsWins, lifeMinus, lifePlus}: IProps) => {
    const [classNames, setClassNames] = useState<string>("cards__item");

    const handleClick = () => {
        switch (true) {
            case plus:
                setClassNames("cards__item cards__item_plus");
                lifePlus();
                generate(null);
                break;
            case minus:
                setClassNames("cards__item cards__item_minus");
                lifeMinus();
                generate(null);
                break;
            case (win && !cardsWins.includes(id)):
                setClassNames("cards__item cards__item_win");
                generate(id);
                break;
        };
        setTimeout(() => {
            if (!win)
                setClassNames("cards__item");
        }, 500);
    };
    return <button className={classNames} onClick={handleClick} ></button>
};

export default memo(Card);