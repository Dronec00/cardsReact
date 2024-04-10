import {useState} from 'react';
import {useLogic} from '../useLogic';

interface CardProps {
    minus: boolean,
    plus: boolean,
    win: boolean
}

const Card: React.FC<CardProps> = ({ plus, minus, win }) => {
    const [classNames, setClassNames] = useState<string>('cards__item');
    const {generate} = useLogic()
    const HandleClick = () => {
        if(plus) {
            setClassNames('cards__item cards__item_plus')
        };
        if(minus) {
            setClassNames('cards__item cards__item_minus' )
        };
        if(win) {
            setClassNames('cards__item cards__item_win')
        };
        setTimeout(()=>{
            setClassNames('cards__item');
            generate(null); // не работает почему-то
        }, 500);

    };
    return <button className={classNames} onClick={HandleClick} ></button>
}

export default Card