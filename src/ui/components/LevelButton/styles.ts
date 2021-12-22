import styled from 'styled-components';

export const Button = styled.button`
 padding: 5px;
 background: linear-gradient(#ff0, #ce771e 90%);
 border-radius: 2px;
 width: 11px;
 height: 10px;

 &:not(:disabled) {
  &:before {
   content: '';
   border: 1px solid #ce771e;
   border-radius: 2px;
   position: absolute;
   top: 0;
   left: 0;
   width: 82%;
   height: 80%;
  }
 }

 svg {
  color: #fff;
  width: 7px;
  position: absolute;
  right: 17%;
  bottom: 20%;
 }

 &:active {
  background: linear-gradient(#ce771e, #ff0 90%);
 }

 &:disabled {
  color: #ddd;
  background: linear-gradient(#d0d0d0, #969696);
 }
`;
