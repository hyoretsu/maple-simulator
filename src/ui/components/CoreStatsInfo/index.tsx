import { useCharInfo, useCoreStats } from '@hooks/char';

import { CharInfo, LevelName, CoreStatsDiv, StatBar } from './styles';

const CoreStatsInfo: React.FC = () => {
 const { name, level } = useCharInfo();
 const { hp, mp } = useCoreStats();
 const stats = [
  { stat: 'HP', value: hp },
  { stat: 'MP', value: mp },
 ];

 return (
  <CharInfo>
   <LevelName>
    <div>
     <span>Lv.</span>
     <span>{level}</span>
    </div>
    <span>{name}</span>
   </LevelName>
   <CoreStatsDiv>
    {stats.map(({ stat, value }) => (
     <div key={stat}>
      <span>{stat}</span>
      <StatBar stat={stat}>
       <span>
        {value}/{value}
       </span>
      </StatBar>
     </div>
    ))}
   </CoreStatsDiv>
  </CharInfo>
 );
};

export default CoreStatsInfo;
