import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';

import Arrow from '@assets/Arrow.svg';
import CloseButton from '@assets/CloseButton.svg';
import LevelButton from '@assets/LevelButton.svg';

import { Frame, Background, Info, AbilityPoint, Tabs, SubTab } from '@styles/stats';

const description =
 'Stats are the build of a character. There are four base stats in the game: Strength (STR), Dexterity (DEX), Intelligence (INT), and Luck (LUK).';
const title = 'Character Stats';

interface CharInfo {
 name: string;
 job: string;
 guild: string;
 fame: number;
 stats: {
  hp: number;
  mp: number;
  ap: number;
  str: number;
  dex: number;
  int: number;
  luk: number;
 };
}

const Stats: React.FC = () => {
 const [name, setName] = useState('Default');
 const [job, setJob] = useState('Beginner');
 const [guild, setGuild] = useState('');
 const [fame, setFame] = useState(0);
 const [hp, setHp] = useState(50);
 const [mp, setMp] = useState(5);
 const [ap, setAp] = useState(0);
 const [str, setStr] = useState(4);
 const [dex, setDex] = useState(4);
 const [int, setInt] = useState(4);
 const [luk, setLuk] = useState(4);

 useEffect(() => {
  const storedInfo = localStorage.getItem('@MapleSimulator:char_info');
  if (storedInfo === null) {
   localStorage.setItem(
    '@MapleSimulator:char_info',
    JSON.stringify({ name, job, guild, fame, stats: { hp, mp, ap, str, dex, int, luk } }),
   );

   return;
  }

  const charInfo: CharInfo = JSON.parse(storedInfo);
  setName(charInfo.name);
  setJob(charInfo.job);
  setGuild(charInfo.guild);
  setFame(charInfo.fame);
  setHp(charInfo.stats.hp);
  setMp(charInfo.stats.mp);
  setAp(charInfo.stats.ap);
  setStr(charInfo.stats.str);
  setDex(charInfo.stats.dex);
  setInt(charInfo.stats.int);
  setLuk(charInfo.stats.luk);
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);

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
       <LevelButton />
      </Info>
      <Info stat>
       <span>MP</span>
       <span>
        {mp} / {mp}
       </span>
       <LevelButton />
      </Info>
     </div>
     <AbilityPoint>
      <div>
       <span>Ability Point</span>
       <span>{ap}</span>
      </div>
      <button type="button">Auto-assign</button>
     </AbilityPoint>
     <div>
      <Info stat>
       <span>STR</span>
       <span>{str}</span>
       <LevelButton />
      </Info>
      <Info stat>
       <span>DEX</span>
       <span>{dex}</span>
       <LevelButton />
      </Info>
      <Info stat>
       <span>INT</span>
       <span>{int}</span>
       <LevelButton />
      </Info>
      <Info stat>
       <span>LUK</span>
       <span>{luk}</span>
       <LevelButton />
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
  </>
 );
};

export default Stats;
