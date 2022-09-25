import Input from '@components/custom/Input';

import { useCharInfo, useExp, useFuncs } from '@context/char';
import { range } from '@utils';

import data from '@public/data.json';

import { ExpBarDiv, Experience, ProgressBar, Marker, ExpText } from './styles';

const ExpBar: React.FC = () => {
    const { level } = useCharInfo();
    const exp = useExp();
    const { updateInfo } = useFuncs();
    const percentage = ((exp / data.exp[level - 1]) * 100).toFixed(2);

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
                        max={data.exp[level - 1]}
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
