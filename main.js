'use strict';

import Entity from './src/entity';

let foo = new Entity();
let bar = new Entity();
let baz = new Entity();
bar.addChild(baz);
foo.addChild(bar);

foo.set('x', 8);
bar.set('y', 16);
foo.update();

console.log(foo);
