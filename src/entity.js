'use strict';

let uid = 0;

class Entity {
    constructor() {
        this._x = 0;
        this._y = 0;
        this._width = 0;
        this._height = 0;
        this._srcX = 0;
        this._srcY = 0;
        this._srcWidth = 0;
        this._srcHeight = 0;
        this._scaleX = 1;
        this._scaleY = 1;
        this._rotation = 0;
        this._offsetX = 0;
        this._offsetY = 0;

        this._opacity = 1;
        this._composite = 'source-over';

        this._dirty = false;
        this._dirtyMembers = {};

        this._uid = uid++;
        this._children = [];
    }

    set(keyOrObj, value) {
        if (typeof keyOrObj === 'object' && keyOrObj !== null) {
            for(let key in keyOrObj) {
                this._dirtyMembers['_' + key] = keyOrObj[key];
            }

            this._dirty = true;
        } else if (typeof keyOrObj === 'string') {
            this._dirtyMembers['_' + keyOrObj] = value;

            this._dirty = true;
        }
    }

    get(key) {
        return this['_' + key];
    }

    getChild(child) {
        for(let item of this._children) {
            if (item.get('uid') === child.get('uid')) {
                return item;
            }
        }
    }

    getChildIndex(child) {
        this._children.forEach(function(item, index) {
            if (item.get('uid') === child.get('uid')) {
                return index;
            }
        });
    }

    addChild(child) {
        this._children.push(child);
    }

    removeChild(child) {
        this._children.splice(this.getChildIndex(child), 1);
    }

    _update(context) {
        if (this._dirty) {
            for(let item of this._children) {
                item._updateFromParent(this._dirtyMembers);
            }

            for(let key in this._dirtyMembers) {
                let val = this._dirtyMembers[key];
                if (typeof val !== 'undefined') {
                    this[key] = val;

                    this._dirtyMembers[key] = undefined;
                }
            }

            this._render(context);

            this._dirty = false;
        }

        for(let item of this._children) {
            item._update();
        }
    }

    _updateFromParent(dirtyMembers) {
        for(let key in dirtyMembers) {
            let val = dirtyMembers[key];
            if (typeof val !== 'undefined') {
                this[key] = val;
            }
        }

        for(let item of this._children) {
            item._updateFromParent(dirtyMembers);
        }
    }

    _render(context) {
        context.save();
        context.translate(Math.floor(this._x), Math.floor(this._y));

        if (this._rotation !== 0) {
            context.translate(this._offsetX, this._offsetY);
            context.rotate((Math.PI / 180) * this._rotation);
            context.translate(-this._offsetX, -this._offsetY);
        }

        if (this._scaleX !== 1 || this._scaleY !== 1) {
            context.translate(this._offsetX, this._offsetY);
            context.scale(this._scaleX, this._scaleY);
            context.translate(-this._offsetX, -this._offsetY);
        }

        context.globalAlpha = this._opacity;
        context.globalCompositeOperation = this._composite;

        this._renderType(context);

        context.restore();
    }
}

module.exports = Entity;
