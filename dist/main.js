(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _srcRectangle = require('./src/rectangle');

var _srcRectangle2 = _interopRequireDefault(_srcRectangle);

var rect = new _srcRectangle2['default']();
rect.set({
    'x': 32,
    'y': 32,
    'width': 32,
    'height': 32,
    'offsetX': 16,
    'offsetY': 16,
    'fillStyle': '#ccc'
});

var canDimensions = 256;
var can = document.querySelector('canvas');
var ctx = can.getContext('2d');
var rotation = 0;

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

},{"./src/rectangle":3}],2:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var uid = 0;

var Entity = (function () {
    function Entity() {
        _classCallCheck(this, Entity);

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

    _createClass(Entity, [{
        key: 'set',
        value: function set(keyOrObj, value) {
            if (typeof keyOrObj === 'object' && keyOrObj !== null) {
                for (var key in keyOrObj) {
                    this._dirtyMembers['_' + key] = keyOrObj[key];
                }

                this._dirty = true;
            } else if (typeof keyOrObj === 'string') {
                this._dirtyMembers['_' + keyOrObj] = value;

                this._dirty = true;
            }
        }
    }, {
        key: 'get',
        value: function get(key) {
            return this['_' + key];
        }
    }, {
        key: 'getChild',
        value: function getChild(child) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this._children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    if (item.get('uid') === child.get('uid')) {
                        return item;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: 'getChildIndex',
        value: function getChildIndex(child) {
            this._children.forEach(function (item, index) {
                if (item.get('uid') === child.get('uid')) {
                    return index;
                }
            });
        }
    }, {
        key: 'addChild',
        value: function addChild(child) {
            this._children.push(child);
        }
    }, {
        key: 'removeChild',
        value: function removeChild(child) {
            this._children.splice(this.getChildIndex(child), 1);
        }
    }, {
        key: '_update',
        value: function _update(context) {
            if (this._dirty) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = this._children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var item = _step2.value;

                        item._updateFromParent(this._dirtyMembers);
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                            _iterator2['return']();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                for (var key in this._dirtyMembers) {
                    var val = this._dirtyMembers[key];
                    if (typeof val !== 'undefined') {
                        this[key] = val;

                        this._dirtyMembers[key] = undefined;
                    }
                }

                this._render(context);

                this._dirty = false;
            }

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this._children[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var item = _step3.value;

                    item._update();
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3['return']) {
                        _iterator3['return']();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }
    }, {
        key: '_updateFromParent',
        value: function _updateFromParent(dirtyMembers) {
            for (var key in dirtyMembers) {
                var val = dirtyMembers[key];
                if (typeof val !== 'undefined') {
                    this[key] = val;
                }
            }

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this._children[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var item = _step4.value;

                    item._updateFromParent(dirtyMembers);
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4['return']) {
                        _iterator4['return']();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }
        }
    }, {
        key: '_render',
        value: function _render(context) {
            context.save();
            context.translate(Math.floor(this._x), Math.floor(this._y));

            if (this._rotation !== 0) {
                context.translate(this._offsetX, this._offsetY);
                context.rotate(Math.PI / 180 * this._rotation);
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
    }]);

    return Entity;
})();

module.exports = Entity;

},{}],3:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _entity = require('./entity');

var _entity2 = _interopRequireDefault(_entity);

var Rectangle = (function (_Entity) {
    function Rectangle() {
        _classCallCheck(this, Rectangle);

        _get(Object.getPrototypeOf(Rectangle.prototype), 'constructor', this).call(this);

        this._fillStyle = '';
        this._strokeStyle = '';
        this._strokeWidth = 1;
    }

    _inherits(Rectangle, _Entity);

    _createClass(Rectangle, [{
        key: '_renderType',
        value: function _renderType(context) {
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
    }]);

    return Rectangle;
})(_entity2['default']);

module.exports = Rectangle;

},{"./entity":2}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva2Ntcy9TaXRlcy9jcC9wZXJlbm5pYWwvbWFpbi5qcyIsIi9Vc2Vycy9rY21zL1NpdGVzL2NwL3BlcmVubmlhbC9zcmMvZW50aXR5LmpzIiwiL1VzZXJzL2tjbXMvU2l0ZXMvY3AvcGVyZW5uaWFsL3NyYy9yZWN0YW5nbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7Ozs7NEJBRVMsaUJBQWlCOzs7O0FBRXZDLElBQUksSUFBSSxHQUFHLCtCQUFlLENBQUM7QUFDM0IsSUFBSSxDQUFDLEdBQUcsQ0FBQztBQUNMLE9BQUcsRUFBRSxFQUFFO0FBQ1AsT0FBRyxFQUFFLEVBQUU7QUFDUCxXQUFPLEVBQUUsRUFBRTtBQUNYLFlBQVEsRUFBRSxFQUFFO0FBQ1osYUFBUyxFQUFFLEVBQUU7QUFDYixhQUFTLEVBQUUsRUFBRTtBQUNiLGVBQVcsRUFBRSxNQUFNO0NBQ3RCLENBQUMsQ0FBQzs7QUFFSCxJQUFJLGFBQWEsR0FBRyxHQUFHLENBQUM7QUFDeEIsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMzQyxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQy9CLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQzs7QUFFakIsR0FBRyxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUM7QUFDMUIsR0FBRyxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUM7O0FBRTNCLFNBQVMsTUFBTSxHQUFHO0FBQ2QsT0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLGFBQWEsRUFBRSxhQUFhLENBQUMsQ0FBQzs7QUFFbEQsWUFBUSxJQUFJLENBQUMsQ0FBQztBQUNkLFFBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxF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QyxZQUFZLEVBQUU7QUFDbkIsdUJBQU8sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztBQUN4Qyx1QkFBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3ZEOztBQUVELG1CQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDckI7OztXQXhCQyxTQUFTOzs7QUEyQmYsTUFBTSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgUmVjdGFuZ2xlIGZyb20gJy4vc3JjL3JlY3RhbmdsZSc7XG5cbmxldCByZWN0ID0gbmV3IFJlY3RhbmdsZSgpO1xucmVjdC5zZXQoe1xuICAgICd4JzogMzIsXG4gICAgJ3knOiAzMixcbiAgICAnd2lkdGgnOiAzMixcbiAgICAnaGVpZ2h0JzogMzIsXG4gICAgJ29mZnNldFgnOiAxNixcbiAgICAnb2Zmc2V0WSc6IDE2LFxuICAgICdmaWxsU3R5bGUnOiAnI2NjYydcbn0pO1xuXG5sZXQgY2FuRGltZW5zaW9ucyA9IDI1NjtcbmxldCBjYW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdjYW52YXMnKTtcbmxldCBjdHggPSBjYW4uZ2V0Q29udGV4dCgnMmQnKTtcbmxldCByb3RhdGlvbiA9IDA7XG5cbmNhbi53aWR0aCA9IGNhbkRpbWVuc2lvbnM7XG5jYW4uaGVpZ2h0ID0gY2FuRGltZW5zaW9ucztcblxuZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FuRGltZW5zaW9ucywgY2FuRGltZW5zaW9ucyk7XG5cbiAgICByb3RhdGlvbiArPSA0O1xuICAgIHJlY3Quc2V0KCdyb3RhdGlvbicsIHJvdGF0aW9uKTtcbiAgICByZWN0Ll91cGRhdGUoY3R4KTtcblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh1cGRhdGUpO1xufVxuXG51cGRhdGUoKTtcbiIsIid1c2Ugc3RyaWN0JztcblxubGV0IHVpZCA9IDA7XG5cbmNsYXNzIEVudGl0eSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX3ggPSAwO1xuICAgICAgICB0aGlzLl95ID0gMDtcbiAgICAgICAgdGhpcy5fd2lkdGggPSAwO1xuICAgICAgICB0aGlzLl9oZWlnaHQgPSAwO1xuICAgICAgICB0aGlzLl9zcmNYID0gMDtcbiAgICAgICAgdGhpcy5fc3JjWSA9IDA7XG4gICAgICAgIHRoaXMuX3NyY1dpZHRoID0gMDtcbiAgICAgICAgdGhpcy5fc3JjSGVpZ2h0ID0gMDtcbiAgICAgICAgdGhpcy5fc2NhbGVYID0gMTtcbiAgICAgICAgdGhpcy5fc2NhbGVZID0gMTtcbiAgICAgICAgdGhpcy5fcm90YXRpb24gPSAwO1xuICAgICAgICB0aGlzLl9vZmZzZXRYID0gMDtcbiAgICAgICAgdGhpcy5fb2Zmc2V0WSA9IDA7XG5cbiAgICAgICAgdGhpcy5fb3BhY2l0eSA9IDE7XG4gICAgICAgIHRoaXMuX2NvbXBvc2l0ZSA9ICdzb3VyY2Utb3Zlcic7XG5cbiAgICAgICAgdGhpcy5fZGlydHkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZGlydHlNZW1iZXJzID0ge307XG5cbiAgICAgICAgdGhpcy5fdWlkID0gdWlkKys7XG4gICAgICAgIHRoaXMuX2NoaWxkcmVuID0gW107XG4gICAgfVxuXG4gICAgc2V0KGtleU9yT2JqLCB2YWx1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIGtleU9yT2JqID09PSAnb2JqZWN0JyAmJiBrZXlPck9iaiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgZm9yKGxldCBrZXkgaW4ga2V5T3JPYmopIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9kaXJ0eU1lbWJlcnNbJ18nICsga2V5XSA9IGtleU9yT2JqW2tleV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2RpcnR5ID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2Yga2V5T3JPYmogPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLl9kaXJ0eU1lbWJlcnNbJ18nICsga2V5T3JPYmpdID0gdmFsdWU7XG5cbiAgICAgICAgICAgIHRoaXMuX2RpcnR5ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldChrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbJ18nICsga2V5XTtcbiAgICB9XG5cbiAgICBnZXRDaGlsZChjaGlsZCkge1xuICAgICAgICBmb3IobGV0IGl0ZW0gb2YgdGhpcy5fY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGlmIChpdGVtLmdldCgndWlkJykgPT09IGNoaWxkLmdldCgndWlkJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldENoaWxkSW5kZXgoY2hpbGQpIHtcbiAgICAgICAgdGhpcy5fY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbihpdGVtLCBpbmRleCkge1xuICAgICAgICAgICAgaWYgKGl0ZW0uZ2V0KCd1aWQnKSA9PT0gY2hpbGQuZ2V0KCd1aWQnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWRkQ2hpbGQoY2hpbGQpIHtcbiAgICAgICAgdGhpcy5fY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gICAgfVxuXG4gICAgcmVtb3ZlQ2hpbGQoY2hpbGQpIHtcbiAgICAgICAgdGhpcy5fY2hpbGRyZW4uc3BsaWNlKHRoaXMuZ2V0Q2hpbGRJbmRleChjaGlsZCksIDEpO1xuICAgIH1cblxuICAgIF91cGRhdGUoY29udGV4dCkge1xuICAgICAgICBpZiAodGhpcy5fZGlydHkpIHtcbiAgICAgICAgICAgIGZvcihsZXQgaXRlbSBvZiB0aGlzLl9jaGlsZHJlbikge1xuICAgICAgICAgICAgICAgIGl0ZW0uX3VwZGF0ZUZyb21QYXJlbnQodGhpcy5fZGlydHlNZW1iZXJzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yKGxldCBrZXkgaW4gdGhpcy5fZGlydHlNZW1iZXJzKSB7XG4gICAgICAgICAgICAgICAgbGV0IHZhbCA9IHRoaXMuX2RpcnR5TWVtYmVyc1trZXldO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdmFsICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSB2YWw7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGlydHlNZW1iZXJzW2tleV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXIoY29udGV4dCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2RpcnR5ID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IobGV0IGl0ZW0gb2YgdGhpcy5fY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGl0ZW0uX3VwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3VwZGF0ZUZyb21QYXJlbnQoZGlydHlNZW1iZXJzKSB7XG4gICAgICAgIGZvcihsZXQga2V5IGluIGRpcnR5TWVtYmVycykge1xuICAgICAgICAgICAgbGV0IHZhbCA9IGRpcnR5TWVtYmVyc1trZXldO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yKGxldCBpdGVtIG9mIHRoaXMuX2NoaWxkcmVuKSB7XG4gICAgICAgICAgICBpdGVtLl91cGRhdGVGcm9tUGFyZW50KGRpcnR5TWVtYmVycyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfcmVuZGVyKGNvbnRleHQpIHtcbiAgICAgICAgY29udGV4dC5zYXZlKCk7XG4gICAgICAgIGNvbnRleHQudHJhbnNsYXRlKE1hdGguZmxvb3IodGhpcy5feCksIE1hdGguZmxvb3IodGhpcy5feSkpO1xuXG4gICAgICAgIGlmICh0aGlzLl9yb3RhdGlvbiAhPT0gMCkge1xuICAgICAgICAgICAgY29udGV4dC50cmFuc2xhdGUodGhpcy5fb2Zmc2V0WCwgdGhpcy5fb2Zmc2V0WSk7XG4gICAgICAgICAgICBjb250ZXh0LnJvdGF0ZSgoTWF0aC5QSSAvIDE4MCkgKiB0aGlzLl9yb3RhdGlvbik7XG4gICAgICAgICAgICBjb250ZXh0LnRyYW5zbGF0ZSgtdGhpcy5fb2Zmc2V0WCwgLXRoaXMuX29mZnNldFkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX3NjYWxlWCAhPT0gMSB8fCB0aGlzLl9zY2FsZVkgIT09IDEpIHtcbiAgICAgICAgICAgIGNvbnRleHQudHJhbnNsYXRlKHRoaXMuX29mZnNldFgsIHRoaXMuX29mZnNldFkpO1xuICAgICAgICAgICAgY29udGV4dC5zY2FsZSh0aGlzLl9zY2FsZVgsIHRoaXMuX3NjYWxlWSk7XG4gICAgICAgICAgICBjb250ZXh0LnRyYW5zbGF0ZSgtdGhpcy5fb2Zmc2V0WCwgLXRoaXMuX29mZnNldFkpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5nbG9iYWxBbHBoYSA9IHRoaXMuX29wYWNpdHk7XG4gICAgICAgIGNvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gdGhpcy5fY29tcG9zaXRlO1xuXG4gICAgICAgIHRoaXMuX3JlbmRlclR5cGUoY29udGV4dCk7XG5cbiAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEVudGl0eTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEVudGl0eSBmcm9tICcuL2VudGl0eSc7XG5cbmNsYXNzIFJlY3RhbmdsZSBleHRlbmRzIEVudGl0eSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5fZmlsbFN0eWxlID0gJyc7XG4gICAgICAgIHRoaXMuX3N0cm9rZVN0eWxlID0gJyc7XG4gICAgICAgIHRoaXMuX3N0cm9rZVdpZHRoID0gMTtcbiAgICB9XG5cbiAgICBfcmVuZGVyVHlwZShjb250ZXh0KSB7XG4gICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgICAgICBjb250ZXh0LmxpbmVXaWR0aCA9IHRoaXMuX3N0cm9rZVdpZHRoO1xuXG4gICAgICAgIGlmICh0aGlzLl9maWxsU3R5bGUpIHtcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5fZmlsbFN0eWxlO1xuICAgICAgICAgICAgY29udGV4dC5maWxsUmVjdCgwLCAwLCB0aGlzLl93aWR0aCwgdGhpcy5faGVpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9zdHJva2VTdHlsZSkge1xuICAgICAgICAgICAgY29udGV4dC5zdHJva2VTdHlsZSA9IHRoaXMuX3N0cm9rZVN0eWxlO1xuICAgICAgICAgICAgY29udGV4dC5zdHJva2VSZWN0KDAsIDAsIHRoaXMuX3dpZHRoLCB0aGlzLl9oZWlnaHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5yZXN0b3JlKCk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlY3RhbmdsZTtcbiJdfQ==
