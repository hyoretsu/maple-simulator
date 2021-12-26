import styled from 'styled-components';

interface InfoProps {
 isBig?: boolean;
 stat?: boolean;
}

interface SubTabProps {
 isOpen?: boolean;
}

export const Frame = styled.div`
 background: #444;
 display: flex;
 flex-direction: column;
 align-items: center;
 border: 1px solid #c8c8c8;
 border-radius: 10px;
 width: 212px;
 height: 320px;
 position: relative;

 > span {
  color: #d7b424;
  margin: 2%;
  font-size: 0.6em;
  text-shadow: 0 0 4px #000;
  text-transform: uppercase;
 }

 > svg {
  color: #fff;
  filter: drop-shadow(0 1px 2px #000);
  position: absolute;
  right: 4%;
  top: 2%;
  width: 4%;

  &:hover:not(:active) {
   filter: drop-shadow(0 0 2px #d2d4b8);
  }

  &:active {
   color: #b9b9b9;
  }
 }
`;

export const Background = styled.div`
 background-color: #fff;
 border-radius: 5px;
 width: 95%;
 height: 92%;
 display: grid;
 grid-template-rows: 6fr 2fr 3fr 1fr;

 > div:first-of-type,
 section + div {
  display: grid;
  margin: 1% 0;
 }

 > div:first-of-type {
  grid-template-rows: repeat(4, 1fr) 2fr 1fr 1fr;
 }

 section + div {
  grid-template-rows: repeat(4, 1fr);
 }
`;

export const Info = styled.div<InfoProps>`
 display: flex;
 ${({ stat }) => stat && 'position: relative;'}
 width: 97%;
 ${({ isBig }) => !isBig && 'height: 90%;'}
 margin: auto;

 > span:first-of-type {
  background: linear-gradient(#d7fc00, #88bf00);
  border: 1px solid #89ab43;
  border-right-width: 2px;
  border-radius: 4px 0 0 4px;
  text-shadow: 0 0 4px #000;
  width: 31%;
  padding: ${({ isBig }) => (isBig ? '5%' : '0.8%')} 0 0 2%;
  text-transform: uppercase;
  font-size: 0.6em;
  color: #fff;
 }

 > span:not(:first-of-type),
 > div {
  font-size: 0.7em;
  border: 2px solid #a8a8a8;
  border-radius: 0 4px 4px 0;
  border-left: none;
  flex: 1;
  padding-left: 2%;
 }

 > div {
  padding: 0;

  span {
   display: block;
  }

  span:first-of-type {
   padding-left: 15%;
  }

  span:not(:first-of-type) {
   padding-left: 18%;
   border-top: 2px dotted;
  }
 }

 button {
  position: absolute;
  right: 2%;
  bottom: 19%;
 }
`;

export const AbilityPoint = styled.section`
 display: flex;
 justify-content: space-between;
 background: linear-gradient(#b8e1ff, #309ddd 50%);
 border: solid #a8a8a8;
 border-width: 2px 0;

 * {
  text-transform: uppercase;
 }

 div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 0.65em;
  margin-left: 6%;

  span:first-of-type {
   text-shadow: 0 0 4px #000;
   color: #fff;
  }

  span + span {
   background-color: #fff;
   padding: 1% 3% 0 22%;
   margin-top: 6%;
   align-self: flex-end;
  }
 }

 @keyframes button_idle {
  to {
   box-shadow: inset 0 0 8px 6px #e8eeca;
  }
 }

 button {
  margin: 3% 4%;
  padding: 3% 4%;
  background: linear-gradient(#d7fc00, #88bf00);
  border-radius: 4px;
  font-size: 0.55em;
  color: #e8e8e8;
  position: relative;
  font-stretch: condensed;
  text-shadow: 0 0 4px #000;

  &:not(:disabled) {
   &:before {
    content: '';
    border: 1px solid #89ab43;
    border-radius: 4px;
    position: absolute;
    top: 0;
    left: 0;
    width: 97%;
    height: 94%;
   }
  }

  &:not(:hover, :disabled) {
   animation: button_idle 0.7s infinite;
  }

  &:active {
   background: linear-gradient(#88bf00, #d7fc00);
   animation: none;
  }

  &:disabled {
   background: linear-gradient(#ededed, #9d9d9d);
  }
 }
`;

export const Tabs = styled.div`
 display: flex;
 justify-content: space-between;
 border-top: 2px solid #a8a8a8;
`;

export const SubTab = styled.button<SubTabProps>`
 display: flex;
 background: linear-gradient(#d7fc00, #88bf00);
 position: relative;
 border: 1px solid #89ab43;
 border-radius: 4px;
 margin: auto 2%;
 padding: 1% 0;
 width: 34%;
 color: #fff;

 span {
  font-size: 0.55em;
  text-shadow: 0 0 4px #000;
  margin: 0 auto;
 }

 > svg {
  height: 30%;
  position: absolute;
  top: 35%;
 }

 &:first-of-type > svg {
  transform: rotate(${({ isOpen }) => (isOpen ? 90 : -90)}deg);
  left: 2%;
 }

 &:not(:first-of-type) > svg {
  transform: rotate(${({ isOpen }) => (isOpen ? -90 : 90)}deg);
  right: 2%;
 }

 &:active {
  background: linear-gradient(#88bf00, #d7fc00);
 }
`;

export const BottomBar = styled.footer`
 display: flex;
 flex-direction: column;
 align-items: center;
 position: absolute;
 bottom: 0;
 width: 100%;
`;
