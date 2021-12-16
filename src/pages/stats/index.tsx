import { NextSeo } from 'next-seo';

import Arrow from '@assets/Arrow.svg';
import CloseButton from '@assets/CloseButton.svg';
import LevelButton from '@assets/LevelButton.svg';

import { Frame, Background, Info, AbilityPoint, Tabs, SubTab } from '@styles/stats';

const description =
 'Stats are the build of a character. There are four base stats in the game: Strength (STR), Dexterity (DEX), Intelligence (INT), and Luck (LUK).';
const title = 'Character Stats';

const Stats: React.FC = () => {
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
       <span>Eolund</span>
      </Info>
      <Info>
       <span>Job</span>
       <span>Fighter</span>
      </Info>
      <Info>
       <span>Guild</span>
       <span>-</span>
      </Info>
      <Info>
       <span>Fame</span>
       <span>0</span>
      </Info>
      <Info isBig>
       <span>Damage</span>
       <div>
        <span>363</span>
        <span>~ 726</span>
       </div>
      </Info>
      <Info stat>
       <span>HP</span>
       <span>3751 / 3751</span>
       <LevelButton />
      </Info>
      <Info stat>
       <span>MP</span>
       <span>257 / 257</span>
       <LevelButton />
      </Info>
     </div>
     <AbilityPoint>
      <div>
       <span>Ability Point</span>
       <span>0</span>
      </div>
      <button type="button">Auto-assign</button>
     </AbilityPoint>
     <div>
      <Info stat>
       <span>STR</span>
       <span>214 (178+36)</span>
       <LevelButton />
      </Info>
      <Info stat>
       <span>DEX</span>
       <span>34 (4+30)</span>
       <LevelButton />
      </Info>
      <Info stat>
       <span>INT</span>
       <span>4</span>
       <LevelButton />
      </Info>
      <Info stat>
       <span>LUK</span>
       <span>3 (4-1)</span>
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
