'use strict';

let uid = 0;

class Entity {
    constructor() {
        this._x = 0;
        this._y = 0;
        this._width = 32;
        this._height = 32;
        this._dirty = false;
        this._dirtyMembers = {};
        this._uid = uid++;
        this._children = [];
    }

    set(name, value) {
        this._dirty = true;

        this._dirtyMembers['_' + name] = value;
    }

    get(name) {
        return this['_' + name];
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

    update() {
        if (this._dirty) {
            for(let item of this._children) {
                item.updateFromParent(this._dirtyMembers);
            }

            for(let key in this._dirtyMembers) {
                let val = this._dirtyMembers[key];
                if (typeof val !== 'undefined') {
                    this[key] = val;

                    this._dirtyMembers[key] = undefined;
                }
            }

            this._dirty = false;
        }

        for(let item of this._children) {
            item.update();
        }
    }

    updateFromParent(dirtyMembers) {
        for(let key in dirtyMembers) {
            let val = dirtyMembers[key];
            if (typeof val !== 'undefined') {
                this[key] = val;
            }
        }

        for(let item of this._children) {
            item.updateFromParent(dirtyMembers);
        }
    }
}

module.exports = Entity;
