'use strict';

import Rectangle from './src/rectangle';

let rect = new Rectangle();
rect.set({
    'x': 32,
    'y': 32,
    'width': 32,
    'height': 32,
    'offsetX': 16,
    'offsetY': 16,
    'fillStyle': '#ccc'
});

let canDimensions = 256;
let can = document.querySelector('canvas');
let ctx = can.getContext('2d');
let rotation = 0;

can.width = canDimensions;
can.height = canDimensions;

function update() {
    ctx.clearRect(0, 0, canDimensions, canDimensions);

    rotation += 4;
    rect.set('rotation', rotation);
    rect._update(ctx);

    requestAnimationFrame(update);
}

update();
