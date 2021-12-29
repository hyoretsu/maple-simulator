import { NextSeo } from 'next-seo';

import CoreStatsInfo from '@components/CoreStatsInfo';
import ExpBar from '@components/ExpBar';
import LevelButton from '@components/LevelButton';

import { useCharInfo, useCoreStats, useStats } from '@hooks/char';

import Arrow from '@assets/Arrow.svg';
import CloseButton from '@assets/CloseButton.svg';

import { Frame, Background, Info, AbilityPoint, Tabs, SubTab, BottomBar } from '@styles/stats';

const description =
 'Stats are the build of a character. There are four base stats in the game: Strength (STR), Dexterity (DEX), Intelligence (INT), and Luck (LUK).';
const title = 'Character Stats';

const Stats: React.FC = () => {
 const { name, job, guild, fame } = useCharInfo();
 const { hp, mp } = useCoreStats();
 const { ap, str, dex, int, luk } = useStats();

 return (
  <>
   <NextSeo description={description} openGraph={{ description, title }} title={title} />
   <Frame>
    <span>Character Stats</span>
    <CloseButton />
    <Background>
     <div>
      <Info>
       <span>Name</span>
       <span>{name}</span>
      </Info>
      <Info>
       <span>Job</span>
       <span>{job}</span>
      </Info>
      <Info>
       <span>Guild</span>
       <span>{guild || '-'}</span>
      </Info>
      <Info>
       <span>Fame</span>
       <span>{fame}</span>
      </Info>
      <Info isBig>
       <span>Damage</span>
       <div>
        <span>2</span>
        <span>~ 10</span>
       </div>
      </Info>
      <Info stat>
       <span>HP</span>
       <span>
        {hp} / {hp}
       </span>
       <LevelButton disabled={!ap} />
      </Info>
      <Info stat>
       <span>MP</span>
       <span>
        {mp} / {mp}
       </span>
       <LevelButton disabled={!ap} />
      </Info>
     </div>
     <AbilityPoint>
      <div>
       <span>Ability Point</span>
       <span>{ap}</span>
      </div>
      <button type="button" disabled={!ap}>
       Auto-assign
      </button>
     </AbilityPoint>
     <div>
      <Info stat>
       <span>STR</span>
       <span>{str}</span>
       <LevelButton disabled={!ap} />
      </Info>
      <Info stat>
       <span>DEX</span>
       <span>{dex}</span>
       <LevelButton disabled={!ap} />
      </Info>
      <Info stat>
       <span>INT</span>
       <span>{int}</span>
       <LevelButton disabled={!ap} />
      </Info>
      <Info stat>
       <span>LUK</span>
       <span>{luk}</span>
       <LevelButton disabled={!ap} />
      </Info>
     </div>
     <Tabs>
      <SubTab isOpen={false}>
       <Arrow />
       <span>HYPER STAT</span>
      </SubTab>
      <SubTab isOpen={false}>
       <span>DETAIL</span>
       <Arrow />
      </SubTab>
     </Tabs>
    </Background>
   </Frame>
   <BottomBar>
    <CoreStatsInfo />
    <ExpBar />
   </BottomBar>
  </>
 );
};

export default Stats;
