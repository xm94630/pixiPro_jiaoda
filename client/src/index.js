import './game.css';
import './game2.sass';


import PIXI from 'PIXI';
import _ from 'lodash';

function component() {
  let element = document.createElement('div');
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  return element;
}
  


console.log(PIXI);

document.body.appendChild(component());

function xxx(fun){fun()}
xxx((a)=>{return '222'})

