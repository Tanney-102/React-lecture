import React, { useEffect, useContext, memo } from 'react';
import { TableContext, INCREMENT_TIMER } from './MineSearch';

const Timer = ({ timer }) => {
    const { halted, dispatch } = useContext(TableContext);

    useEffect(() => {
        if(halted) return;
        const timer = setInterval(() => {
            dispatch({ type: INCREMENT_TIMER });
        }, 1000);

        return () => {
            clearInterval(timer);
        }
    }, [halted]);

    return (
        <div>Time: {timer}</div>
    );
}

export default memo(Timer);