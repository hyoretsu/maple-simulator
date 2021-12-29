import { useExp } from '@hooks/char';
import range from '@utils/range';

import { ExpBarDiv, Experience, ProgressBar, Marker } from './styles';

const ExpBar: React.FC = () => {
 const exp = useExp();
 const percentage = ((exp / 15) * 100).toFixed(2);

 return (
  <ExpBarDiv>
   <span>EXP</span>
   <Experience>
    <ProgressBar progress={percentage} />
    {range(1, 9).map(number => (
     <Marker key={number} style={{ left: `${number * 10}%` }} />
    ))}
    <span>
     {exp} [{percentage}%]
    </span>
   </Experience>
  </ExpBarDiv>
 );
};

export default ExpBar;
