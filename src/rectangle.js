'use strict';

import Entity from './entity';

class Rectangle extends Entity {
    constructor() {
        super();

        this._fillStyle = '';
        this._strokeStyle = '';
        this._strokeWidth = 1;
    }

    _renderType(context) {
        context.save();
        context.lineWidth = this._strokeWidth;

        if (this._fillStyle) {
            context.fillStyle = this._fillStyle;
            context.fillRect(0, 0, this._width, this._height);
        }

        if (this._strokeStyle) {
            context.strokeStyle = this._strokeStyle;
            context.strokeRect(0, 0, this._width, this._height);
        }

        context.restore();
    }
}

module.exports = Rectangle;
