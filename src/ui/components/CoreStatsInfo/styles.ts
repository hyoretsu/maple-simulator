import styled from 'styled-components';

interface StatBarProps {
 stat: string;
}

export const CharInfo = styled.div`
 display: grid;
 grid-template-rows: 1fr 2fr;
 background-color: #444;
 margin-bottom: 0.5vh;
 border-radius: 4px;
 width: 158px;
 height: 52px;
`;

export const LevelName = styled.div`
 display: grid;
 align-items: center;
 grid-template-columns: 2fr 3fr;

 div {
  display: flex;
  margin: 0 19% 0 27%;

  span {
   color: #d7b424;
   font-size: 0.7em;
   text-shadow: 0 0 4px #000;

   &:not(:first-of-type) {
    margin-left: auto;
   }
  }
 }

 > span {
  color: #fff;
  margin-left: 5%;
  font-size: 0.6em;
 }
`;

export const CoreStatsDiv = styled.div`
 display: grid;
 grid-template-rows: 1fr 1fr;
 background: linear-gradient(#fff, #cdcdcd 60%);
 border-radius: 4px;
 margin: 0 1%;

 > div {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 9fr 0.3fr;

  > span {
   color: #838383;
   font-size: 0.5em;
   font-weight: 700;
   margin: auto 13%;
   text-transform: uppercase;
  }
 }
`;

export const StatBar = styled.div<StatBarProps>`
 display: flex;
 background: ${({ stat }) => {
  const prefix = 'linear-gradient(90deg,';
  const suffix = '90%)';

  switch (stat.toLowerCase()) {
   case 'hp':
    return `${prefix} #f32c64, #f64c79 ${suffix}`;
   case 'mp':
    return `${prefix} #11b2dd, #6de5fe ${suffix}`;
   default:
    return '';
  }
 }};
 border-radius: 4px;
 height: 74%;

 span {
  color: #fff;
  font-size: 0.6em;
  margin: auto;
 }
`;
