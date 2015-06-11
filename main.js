'use strict';

import Rectangle from './src/rectangle';

let rect1ChildB = new Rectangle();
let rect1ChildA = new Rectangle();
let rect1 = new Rectangle();
let rect2ChildB = new Rectangle();
let rect2ChildA = new Rectangle();
let rect2 = new Rectangle();
let rect3ChildB = new Rectangle();
let rect3ChildA = new Rectangle();
let rect3 = new Rectangle();

let canDimensions = {
    w: 1024,
    h: 768
};

let can = document.querySelector('canvas');
let ctx = can.getContext('2d');
let n = 0;

can.width = canDimensions.w;
can.height = canDimensions.h;

rect1ChildB.set({
    'x': 16,
    'y': 16,
    'width': 8,
    'height': 8,
    'fillStyle': '#0cc'
});
rect1ChildA.set({
    'x': 32,
    'y': 32,
    'width': 16,
    'height': 16,
    'fillStyle': '#c00'
});
rect1.set({
    'x': 32,
    'y': 32,
    'width': 32,
    'height': 32,
    'offsetX': 16,
    'offsetY': 16,
    'fillStyle': '#ccc'
});

rect2ChildB.set({
    'x': 16,
    'y': 16,
    'width': 8,
    'height': 8,
    'fillStyle': '#ccc'
});
rect2ChildA.set({
    'x': 32,
    'y': 32,
    'width': 16,
    'height': 16,
    'fillStyle': '#0cc'
});
rect2.set({
    'x': 32,
    'y': 32,
    'width': 32,
    'height': 32,
    'offsetX': 16,
    'offsetY': 16,
    'fillStyle': '#c00'
});

rect3ChildB.set({
    'x': 16,
    'y': 16,
    'width': 8,
    'height': 8,
    'fillStyle': '#c00'
});
rect3ChildA.set({
    'x': 32,
    'y': 32,
    'width': 16,
    'height': 16,
    'fillStyle': '#ccc'
});
rect3.set({
    'x': 32,
    'y': 96,
    'width': 32,
    'height': 32,
    'offsetX': 16,
    'offsetY': 16,
    'fillStyle': '#0cc'
});

rect1ChildA.addChild(rect1ChildB);
rect1.addChild(rect1ChildA);

rect2ChildA.addChild(rect2ChildB);
rect2.addChild(rect2ChildA);

rect3ChildA.addChild(rect3ChildB);
rect3.addChild(rect3ChildA);

function update() {
    ctx.clearRect(0, 0, canDimensions.w, canDimensions.h);

    n += 2;

    rect1.set({
        'rotation': n
    });
    rect2.set({
        'x': n
    });
    rect3.set({
        'scaleX': 1 + n / 64
    });

    rect1.render(ctx);
    rect2.render(ctx);
    rect3.render(ctx);

    requestAnimationFrame(update);
}

update();
