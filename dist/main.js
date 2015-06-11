(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _srcRectangle = require('./src/rectangle');

var _srcRectangle2 = _interopRequireDefault(_srcRectangle);

var rect1ChildB = new _srcRectangle2['default']();
var rect1ChildA = new _srcRectangle2['default']();
var rect1 = new _srcRectangle2['default']();
var rect2ChildB = new _srcRectangle2['default']();
var rect2ChildA = new _srcRectangle2['default']();
var rect2 = new _srcRectangle2['default']();
var rect3ChildB = new _srcRectangle2['default']();
var rect3ChildA = new _srcRectangle2['default']();
var rect3 = new _srcRectangle2['default']();

var canDimensions = {
    w: 1024,
    h: 768
};

var can = document.querySelector('canvas');
var ctx = can.getContext('2d');
var n = 0;

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

        this._uid = uid++;
        this._children = [];
    }

    _createClass(Entity, [{
        key: 'set',
        value: function set(keyOrObj, value) {
            if (typeof keyOrObj === 'object' && keyOrObj !== null) {
                for (var key in keyOrObj) {
                    this['_' + key] = keyOrObj[key];
                }

                this._dirty = true;
            } else if (typeof keyOrObj === 'string' && typeof value !== 'undefined') {
                this['_' + keyOrObj] = value;

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
        key: 'render',
        value: function render(context) {
            if (!this._dirty) {
                return;
            }

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

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this._children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var child = _step2.value;

                    child._dirty = true;
                    child.render(context);
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

            context.restore();

            this._dirty = false;
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva2Ntcy9TaXRlcy9jcC9wZXJlbm5pYWwvbWFpbi5qcyIsIi9Vc2Vycy9rY21zL1NpdGVzL2NwL3BlcmVubmlhbC9zcmMvZW50aXR5LmpzIiwiL1VzZXJzL2tjbXMvU2l0ZXMvY3AvcGVyZW5uaWFsL3NyYy9yZWN0YW5nbGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7Ozs7NEJBRVMsaUJBQWlCOzs7O0FBRXZDLElBQUksV0FBVyxHQUFHLCtCQUFlLENBQUM7QUFDbEMsSUFBSSxXQUFXLEdBQUcsK0JBQWUsQ0FBQztBQUNsQyxJQUFJLEtBQUssR0FBRywrQkFBZSxDQUFDO0FBQzVCLElBQUksV0FBVyxHQUFHLCtCQUFlLENBQUM7QUFDbEMsSUFBSSxXQUFXLEdBQUcsK0JBQWUsQ0FBQztBQUNsQyxJQUFJLEtBQUssR0FBRywrQkFBZSxDQUFDO0FBQzVCLElBQUksV0FBVyxHQUFHLCtCQUFlLENBQUM7QUFDbEMsSUFBSSxXQUFXLEdBQUcsK0JBQWUsQ0FBQztBQUNsQyxJQUFJLEtBQUssR0FBRywrQkFBZSxDQUFDOztBQUU1QixJQUFJLGFBQWEsR0FBRztBQUNoQixLQUFDLEVBQUUsSUFBSTtBQUNQLEtBQUMsRUFBRSxHQUFHO0NBQ1QsQ0FBQzs7QUFFRixJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzNDLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUVWLEdBQUcsQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQztBQUM1QixHQUFHLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUM7O0FBRTdCLFdBQVcsQ0FB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QztBQUNyQixZQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztBQUN2QixZQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztLQUN6Qjs7Y0FQQyxTQUFTOztpQkFBVCxTQUFTOztlQVNBLHFCQUFDLE9BQU8sRUFBRTtBQUNqQixtQkFBTyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ2YsbUJBQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQzs7QUFFdEMsZ0JBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtBQUNqQix1QkFBTyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO0FBQ3BDLHVCQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDckQ7O0FBRUQsZ0JBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtBQUNuQix1QkFBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO0FBQ3hDLHVCQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDdkQ7O0FBRUQsbUJBQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNyQjs7O1dBeEJDLFNBQVM7OztBQTJCZixNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBSZWN0YW5nbGUgZnJvbSAnLi9zcmMvcmVjdGFuZ2xlJztcblxubGV0IHJlY3QxQ2hpbGRCID0gbmV3IFJlY3RhbmdsZSgpO1xubGV0IHJlY3QxQ2hpbGRBID0gbmV3IFJlY3RhbmdsZSgpO1xubGV0IHJlY3QxID0gbmV3IFJlY3RhbmdsZSgpO1xubGV0IHJlY3QyQ2hpbGRCID0gbmV3IFJlY3RhbmdsZSgpO1xubGV0IHJlY3QyQ2hpbGRBID0gbmV3IFJlY3RhbmdsZSgpO1xubGV0IHJlY3QyID0gbmV3IFJlY3RhbmdsZSgpO1xubGV0IHJlY3QzQ2hpbGRCID0gbmV3IFJlY3RhbmdsZSgpO1xubGV0IHJlY3QzQ2hpbGRBID0gbmV3IFJlY3RhbmdsZSgpO1xubGV0IHJlY3QzID0gbmV3IFJlY3RhbmdsZSgpO1xuXG5sZXQgY2FuRGltZW5zaW9ucyA9IHtcbiAgICB3OiAxMDI0LFxuICAgIGg6IDc2OFxufTtcblxubGV0IGNhbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2NhbnZhcycpO1xubGV0IGN0eCA9IGNhbi5nZXRDb250ZXh0KCcyZCcpO1xubGV0IG4gPSAwO1xuXG5jYW4ud2lkdGggPSBjYW5EaW1lbnNpb25zLnc7XG5jYW4uaGVpZ2h0ID0gY2FuRGltZW5zaW9ucy5oO1xuXG5yZWN0MUNoaWxkQi5zZXQoe1xuICAgICd4JzogMTYsXG4gICAgJ3knOiAxNixcbiAgICAnd2lkdGgnOiA4LFxuICAgICdoZWlnaHQnOiA4LFxuICAgICdmaWxsU3R5bGUnOiAnIzBjYydcbn0pO1xucmVjdDFDaGlsZEEuc2V0KHtcbiAgICAneCc6IDMyLFxuICAgICd5JzogMzIsXG4gICAgJ3dpZHRoJzogMTYsXG4gICAgJ2hlaWdodCc6IDE2LFxuICAgICdmaWxsU3R5bGUnOiAnI2MwMCdcbn0pO1xucmVjdDEuc2V0KHtcbiAgICAneCc6IDMyLFxuICAgICd5JzogMzIsXG4gICAgJ3dpZHRoJzogMzIsXG4gICAgJ2hlaWdodCc6IDMyLFxuICAgICdvZmZzZXRYJzogMTYsXG4gICAgJ29mZnNldFknOiAxNixcbiAgICAnZmlsbFN0eWxlJzogJyNjY2MnXG59KTtcblxucmVjdDJDaGlsZEIuc2V0KHtcbiAgICAneCc6IDE2LFxuICAgICd5JzogMTYsXG4gICAgJ3dpZHRoJzogOCxcbiAgICAnaGVpZ2h0JzogOCxcbiAgICAnZmlsbFN0eWxlJzogJyNjY2MnXG59KTtcbnJlY3QyQ2hpbGRBLnNldCh7XG4gICAgJ3gnOiAzMixcbiAgICAneSc6IDMyLFxuICAgICd3aWR0aCc6IDE2LFxuICAgICdoZWlnaHQnOiAxNixcbiAgICAnZmlsbFN0eWxlJzogJyMwY2MnXG59KTtcbnJlY3QyLnNldCh7XG4gICAgJ3gnOiAzMixcbiAgICAneSc6IDMyLFxuICAgICd3aWR0aCc6IDMyLFxuICAgICdoZWlnaHQnOiAzMixcbiAgICAnb2Zmc2V0WCc6IDE2LFxuICAgICdvZmZzZXRZJzogMTYsXG4gICAgJ2ZpbGxTdHlsZSc6ICcjYzAwJ1xufSk7XG5cbnJlY3QzQ2hpbGRCLnNldCh7XG4gICAgJ3gnOiAxNixcbiAgICAneSc6IDE2LFxuICAgICd3aWR0aCc6IDgsXG4gICAgJ2hlaWdodCc6IDgsXG4gICAgJ2ZpbGxTdHlsZSc6ICcjYzAwJ1xufSk7XG5yZWN0M0NoaWxkQS5zZXQoe1xuICAgICd4JzogMzIsXG4gICAgJ3knOiAzMixcbiAgICAnd2lkdGgnOiAxNixcbiAgICAnaGVpZ2h0JzogMTYsXG4gICAgJ2ZpbGxTdHlsZSc6ICcjY2NjJ1xufSk7XG5yZWN0My5zZXQoe1xuICAgICd4JzogMzIsXG4gICAgJ3knOiA5NixcbiAgICAnd2lkdGgnOiAzMixcbiAgICAnaGVpZ2h0JzogMzIsXG4gICAgJ29mZnNldFgnOiAxNixcbiAgICAnb2Zmc2V0WSc6IDE2LFxuICAgICdmaWxsU3R5bGUnOiAnIzBjYydcbn0pO1xuXG5yZWN0MUNoaWxkQS5hZGRDaGlsZChyZWN0MUNoaWxkQik7XG5yZWN0MS5hZGRDaGlsZChyZWN0MUNoaWxkQSk7XG5cbnJlY3QyQ2hpbGRBLmFkZENoaWxkKHJlY3QyQ2hpbGRCKTtcbnJlY3QyLmFkZENoaWxkKHJlY3QyQ2hpbGRBKTtcblxucmVjdDNDaGlsZEEuYWRkQ2hpbGQocmVjdDNDaGlsZEIpO1xucmVjdDMuYWRkQ2hpbGQocmVjdDNDaGlsZEEpO1xuXG5mdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW5EaW1lbnNpb25zLncsIGNhbkRpbWVuc2lvbnMuaCk7XG5cbiAgICBuICs9IDI7XG5cbiAgICByZWN0MS5zZXQoe1xuICAgICAgICAncm90YXRpb24nOiBuXG4gICAgfSk7XG4gICAgcmVjdDIuc2V0KHtcbiAgICAgICAgJ3gnOiBuXG4gICAgfSk7XG4gICAgcmVjdDMuc2V0KHtcbiAgICAgICAgJ3NjYWxlWCc6IDEgKyBuIC8gNjRcbiAgICB9KTtcblxuICAgIHJlY3QxLnJlbmRlcihjdHgpO1xuICAgIHJlY3QyLnJlbmRlcihjdHgpO1xuICAgIHJlY3QzLnJlbmRlcihjdHgpO1xuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHVwZGF0ZSk7XG59XG5cbnVwZGF0ZSgpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5sZXQgdWlkID0gMDtcblxuY2xhc3MgRW50aXR5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5feCA9IDA7XG4gICAgICAgIHRoaXMuX3kgPSAwO1xuICAgICAgICB0aGlzLl93aWR0aCA9IDA7XG4gICAgICAgIHRoaXMuX2hlaWdodCA9IDA7XG4gICAgICAgIHRoaXMuX3NyY1ggPSAwO1xuICAgICAgICB0aGlzLl9zcmNZID0gMDtcbiAgICAgICAgdGhpcy5fc3JjV2lkdGggPSAwO1xuICAgICAgICB0aGlzLl9zcmNIZWlnaHQgPSAwO1xuICAgICAgICB0aGlzLl9zY2FsZVggPSAxO1xuICAgICAgICB0aGlzLl9zY2FsZVkgPSAxO1xuICAgICAgICB0aGlzLl9yb3RhdGlvbiA9IDA7XG4gICAgICAgIHRoaXMuX29mZnNldFggPSAwO1xuICAgICAgICB0aGlzLl9vZmZzZXRZID0gMDtcblxuICAgICAgICB0aGlzLl9vcGFjaXR5ID0gMTtcbiAgICAgICAgdGhpcy5fY29tcG9zaXRlID0gJ3NvdXJjZS1vdmVyJztcblxuICAgICAgICB0aGlzLl9kaXJ0eSA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuX3VpZCA9IHVpZCsrO1xuICAgICAgICB0aGlzLl9jaGlsZHJlbiA9IFtdO1xuICAgIH1cblxuICAgIHNldChrZXlPck9iaiwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBrZXlPck9iaiA9PT0gJ29iamVjdCcgJiYga2V5T3JPYmogIT09IG51bGwpIHtcbiAgICAgICAgICAgIGZvcihsZXQga2V5IGluIGtleU9yT2JqKSB7XG4gICAgICAgICAgICAgICAgdGhpc1snXycgKyBrZXldID0ga2V5T3JPYmpba2V5XTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fZGlydHkgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBrZXlPck9iaiA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhpc1snXycgKyBrZXlPck9ial0gPSB2YWx1ZTtcblxuICAgICAgICAgICAgdGhpcy5fZGlydHkgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0KGtleSkge1xuICAgICAgICByZXR1cm4gdGhpc1snXycgKyBrZXldO1xuICAgIH1cblxuICAgIGdldENoaWxkKGNoaWxkKSB7XG4gICAgICAgIGZvcihsZXQgaXRlbSBvZiB0aGlzLl9jaGlsZHJlbikge1xuICAgICAgICAgICAgaWYgKGl0ZW0uZ2V0KCd1aWQnKSA9PT0gY2hpbGQuZ2V0KCd1aWQnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Q2hpbGRJbmRleChjaGlsZCkge1xuICAgICAgICB0aGlzLl9jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgICAgICBpZiAoaXRlbS5nZXQoJ3VpZCcpID09PSBjaGlsZC5nZXQoJ3VpZCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGRDaGlsZChjaGlsZCkge1xuICAgICAgICB0aGlzLl9jaGlsZHJlbi5wdXNoKGNoaWxkKTtcbiAgICB9XG5cbiAgICByZW1vdmVDaGlsZChjaGlsZCkge1xuICAgICAgICB0aGlzLl9jaGlsZHJlbi5zcGxpY2UodGhpcy5nZXRDaGlsZEluZGV4KGNoaWxkKSwgMSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKGNvbnRleHQpIHtcbiAgICAgICAgaWYgKCEgdGhpcy5fZGlydHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQuc2F2ZSgpO1xuICAgICAgICBjb250ZXh0LnRyYW5zbGF0ZShNYXRoLmZsb29yKHRoaXMuX3gpLCBNYXRoLmZsb29yKHRoaXMuX3kpKTtcblxuICAgICAgICBpZiAodGhpcy5fcm90YXRpb24gIT09IDApIHtcbiAgICAgICAgICAgIGNvbnRleHQudHJhbnNsYXRlKHRoaXMuX29mZnNldFgsIHRoaXMuX29mZnNldFkpO1xuICAgICAgICAgICAgY29udGV4dC5yb3RhdGUoKE1hdGguUEkgLyAxODApICogdGhpcy5fcm90YXRpb24pO1xuICAgICAgICAgICAgY29udGV4dC50cmFuc2xhdGUoLXRoaXMuX29mZnNldFgsIC10aGlzLl9vZmZzZXRZKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9zY2FsZVggIT09IDEgfHwgdGhpcy5fc2NhbGVZICE9PSAxKSB7XG4gICAgICAgICAgICBjb250ZXh0LnRyYW5zbGF0ZSh0aGlzLl9vZmZzZXRYLCB0aGlzLl9vZmZzZXRZKTtcbiAgICAgICAgICAgIGNvbnRleHQuc2NhbGUodGhpcy5fc2NhbGVYLCB0aGlzLl9zY2FsZVkpO1xuICAgICAgICAgICAgY29udGV4dC50cmFuc2xhdGUoLXRoaXMuX29mZnNldFgsIC10aGlzLl9vZmZzZXRZKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQuZ2xvYmFsQWxwaGEgPSB0aGlzLl9vcGFjaXR5O1xuICAgICAgICBjb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IHRoaXMuX2NvbXBvc2l0ZTtcblxuICAgICAgICB0aGlzLl9yZW5kZXJUeXBlKGNvbnRleHQpO1xuXG4gICAgICAgIGZvcihsZXQgY2hpbGQgb2YgdGhpcy5fY2hpbGRyZW4pIHtcbiAgICAgICAgICAgIGNoaWxkLl9kaXJ0eSA9IHRydWU7XG4gICAgICAgICAgICBjaGlsZC5yZW5kZXIoY29udGV4dCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0LnJlc3RvcmUoKTtcblxuICAgICAgICB0aGlzLl9kaXJ0eSA9IGZhbHNlO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFbnRpdHk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBFbnRpdHkgZnJvbSAnLi9lbnRpdHknO1xuXG5jbGFzcyBSZWN0YW5nbGUgZXh0ZW5kcyBFbnRpdHkge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX2ZpbGxTdHlsZSA9ICcnO1xuICAgICAgICB0aGlzLl9zdHJva2VTdHlsZSA9ICcnO1xuICAgICAgICB0aGlzLl9zdHJva2VXaWR0aCA9IDE7XG4gICAgfVxuXG4gICAgX3JlbmRlclR5cGUoY29udGV4dCkge1xuICAgICAgICBjb250ZXh0LnNhdmUoKTtcbiAgICAgICAgY29udGV4dC5saW5lV2lkdGggPSB0aGlzLl9zdHJva2VXaWR0aDtcblxuICAgICAgICBpZiAodGhpcy5fZmlsbFN0eWxlKSB7XG4gICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuX2ZpbGxTdHlsZTtcbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgdGhpcy5fd2lkdGgsIHRoaXMuX2hlaWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fc3Ryb2tlU3R5bGUpIHtcbiAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlU3R5bGUgPSB0aGlzLl9zdHJva2VTdHlsZTtcbiAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlUmVjdCgwLCAwLCB0aGlzLl93aWR0aCwgdGhpcy5faGVpZ2h0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQucmVzdG9yZSgpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZWN0YW5nbGU7XG4iXX0=
