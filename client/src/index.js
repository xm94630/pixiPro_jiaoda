import PIXI from 'PIXI';
import _ from 'lodash';

function component() {
  let element = document.createElement('div');
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  return element;
}
  
console.log(PIXI);
alert(123456)
document.body.appendChild(component());

