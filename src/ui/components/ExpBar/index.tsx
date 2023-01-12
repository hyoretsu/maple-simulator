import { useMemo } from 'react';

import Input from '@components/custom/Input';

import { useCharInfo, useExp, useFuncs } from '@context/char';
import { useFetch } from '@hooks/index';
import api from '@services/api';
import { range } from '@utils';

import { ExpBarDiv, Experience, ProgressBar, Marker, ExpText } from './styles';

const ExpBar: React.FC = () => {
    const { level } = useCharInfo();
    const exp = useExp();
    const { updateInfo } = useFuncs();

    const { data } = useFetch('/exp', api);
    const expList = useMemo<number[]>(() => {
        if (!data) return [];

        return data.map(entry => entry.exp);
    }, [data]);

    const percentage = ((exp / expList[level - 1]) * 100).toFixed(2);

    return (
        <ExpBarDiv>
            <span>EXP</span>
            <Experience>
                <ProgressBar progress={percentage} />
                {range(1, 10).map(number => (
                    <Marker key={number} style={{ left: `${number * 10}%` }} />
                ))}
                <ExpText>
                    <Input
                        value={exp}
                        max={expList[level - 1]}
                        onChange={e => updateInfo('exp', e.target.value)}
                        style={{ width: `${String(exp).length + 1}ch` }}
                    />
                    <span>[{percentage}%]</span>
                </ExpText>
            </Experience>
        </ExpBarDiv>
    );
};

export default ExpBar;
