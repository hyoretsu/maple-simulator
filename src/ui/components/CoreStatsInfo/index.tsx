import { CharInfo, LevelName, CoreStatsDiv, StatBar } from './styles';

interface CoreStatsInfoProps {
 name: string;
 level: number;
 stats: Array<{
  stat: string;
  value: number;
 }>;
}

const CoreStatsInfo: React.FC<CoreStatsInfoProps> = ({ name, level, stats }) => {
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
