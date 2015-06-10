(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _srcEntity = require('./src/entity');

var _srcEntity2 = _interopRequireDefault(_srcEntity);

var foo = new _srcEntity2['default']();
var bar = new _srcEntity2['default']();
var baz = new _srcEntity2['default']();
bar.addChild(baz);
foo.addChild(bar);

foo.set('x', 8);
bar.set('y', 16);
foo.update();

console.log(foo);

},{"./src/entity":2}],2:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var uid = 0;

var Entity = (function () {
    function Entity() {
        _classCallCheck(this, Entity);

        this._x = 0;
        this._y = 0;
        this._width = 32;
        this._height = 32;
        this._dirty = false;
        this._dirtyMembers = {};
        this._uid = uid++;
        this._children = [];
    }

    _createClass(Entity, [{
        key: 'set',
        value: function set(name, value) {
            this._dirty = true;

            this._dirtyMembers['_' + name] = value;
        }
    }, {
        key: 'get',
        value: function get(name) {
            return this['_' + name];
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
        key: 'update',
        value: function update() {
            if (this._dirty) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = this._children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var item = _step2.value;

                        item.updateFromParent(this._dirtyMembers);
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

                this._dirty = false;
            }

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this._children[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var item = _step3.value;

                    item.update();
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
        key: 'updateFromParent',
        value: function updateFromParent(dirtyMembers) {
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

                    item.updateFromParent(dirtyMembers);
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
    }]);

    return Entity;
})();

module.exports = Entity;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMva2Ntcy9TaXRlcy9jcC9uZXd0aGluZy9tYWluLmpzIiwiL1VzZXJzL2tjbXMvU2l0ZXMvY3AvbmV3dGhpbmcvc3JjL2VudGl0eS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7Ozt5QkFFTSxjQUFjOzs7O0FBRWpDLElBQUksR0FBRyxHQUFHLDRCQUFZLENBQUM7QUFDdkIsSUFBSSxHQUFHLEdBQUcsNEJBQVksQ0FBQztBQUN2QixJQUFJLEdBQUcsR0FBRyw0QkFBWSxDQUFDO0FBQ3ZCLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDbEIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFbEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDaEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDakIsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDOztBQUViLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7OztBQ2RqQixZQUFZLENBQUM7Ozs7OztBQUViLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQzs7SUFFTixNQUFNO0FBQ0csYUFEVCxNQUFNLEdBQ007OEJBRFosTUFBTTs7QUFFSixZQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztBQUNaLFlBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ1osWUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDakIsWUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7QUFDbEIsWUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFDcEIsWUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUM7QUFD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Ozs7OztTQUNKOzs7V0FoRkMsTUFBTTs7O0FBbUZaLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEVudGl0eSBmcm9tICcuL3NyYy9lbnRpdHknO1xuXG5sZXQgZm9vID0gbmV3IEVudGl0eSgpO1xubGV0IGJhciA9IG5ldyBFbnRpdHkoKTtcbmxldCBiYXogPSBuZXcgRW50aXR5KCk7XG5iYXIuYWRkQ2hpbGQoYmF6KTtcbmZvby5hZGRDaGlsZChiYXIpO1xuXG5mb28uc2V0KCd4JywgOCk7XG5iYXIuc2V0KCd5JywgMTYpO1xuZm9vLnVwZGF0ZSgpO1xuXG5jb25zb2xlLmxvZyhmb28pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5sZXQgdWlkID0gMDtcblxuY2xhc3MgRW50aXR5IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5feCA9IDA7XG4gICAgICAgIHRoaXMuX3kgPSAwO1xuICAgICAgICB0aGlzLl93aWR0aCA9IDMyO1xuICAgICAgICB0aGlzLl9oZWlnaHQgPSAzMjtcbiAgICAgICAgdGhpcy5fZGlydHkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZGlydHlNZW1iZXJzID0ge307XG4gICAgICAgIHRoaXMuX3VpZCA9IHVpZCsrO1xuICAgICAgICB0aGlzLl9jaGlsZHJlbiA9IFtdO1xuICAgIH1cblxuICAgIHNldChuYW1lLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLl9kaXJ0eSA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5fZGlydHlNZW1iZXJzWydfJyArIG5hbWVdID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0KG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbJ18nICsgbmFtZV07XG4gICAgfVxuXG4gICAgZ2V0Q2hpbGQoY2hpbGQpIHtcbiAgICAgICAgZm9yKGxldCBpdGVtIG9mIHRoaXMuX2NoaWxkcmVuKSB7XG4gICAgICAgICAgICBpZiAoaXRlbS5nZXQoJ3VpZCcpID09PSBjaGlsZC5nZXQoJ3VpZCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRDaGlsZEluZGV4KGNoaWxkKSB7XG4gICAgICAgIHRoaXMuX2NoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24oaXRlbSwgaW5kZXgpIHtcbiAgICAgICAgICAgIGlmIChpdGVtLmdldCgndWlkJykgPT09IGNoaWxkLmdldCgndWlkJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFkZENoaWxkKGNoaWxkKSB7XG4gICAgICAgIHRoaXMuX2NoaWxkcmVuLnB1c2goY2hpbGQpO1xuICAgIH1cblxuICAgIHJlbW92ZUNoaWxkKGNoaWxkKSB7XG4gICAgICAgIHRoaXMuX2NoaWxkcmVuLnNwbGljZSh0aGlzLmdldENoaWxkSW5kZXgoY2hpbGQpLCAxKTtcbiAgICB9XG5cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLl9kaXJ0eSkge1xuICAgICAgICAgICAgZm9yKGxldCBpdGVtIG9mIHRoaXMuX2NoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgaXRlbS51cGRhdGVGcm9tUGFyZW50KHRoaXMuX2RpcnR5TWVtYmVycyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvcihsZXQga2V5IGluIHRoaXMuX2RpcnR5TWVtYmVycykge1xuICAgICAgICAgICAgICAgIGxldCB2YWwgPSB0aGlzLl9kaXJ0eU1lbWJlcnNba2V5XTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0gdmFsO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RpcnR5TWVtYmVyc1trZXldID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fZGlydHkgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcihsZXQgaXRlbSBvZiB0aGlzLl9jaGlsZHJlbikge1xuICAgICAgICAgICAgaXRlbS51cGRhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUZyb21QYXJlbnQoZGlydHlNZW1iZXJzKSB7XG4gICAgICAgIGZvcihsZXQga2V5IGluIGRpcnR5TWVtYmVycykge1xuICAgICAgICAgICAgbGV0IHZhbCA9IGRpcnR5TWVtYmVyc1trZXldO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gdmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yKGxldCBpdGVtIG9mIHRoaXMuX2NoaWxkcmVuKSB7XG4gICAgICAgICAgICBpdGVtLnVwZGF0ZUZyb21QYXJlbnQoZGlydHlNZW1iZXJzKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFbnRpdHk7XG4iXX0=
