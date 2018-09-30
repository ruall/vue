'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var foo = void 0;
var _foo = { foo: 'a' };
foo = _foo.foo;

console.log(foo);
console.log('-------------------');

var _ = '1234',
    _ref = _slicedToArray(_, 4),
    a = _ref[0],
    b = _ref[1],
    c = _ref[2],
    d = _ref[3];

console.log(a);
console.log(b);
console.log(c);
console.log(d);
console.log('--------------------');

//对象扩展运算符
function col() {
    console.log(arguments.length <= 0 ? undefined : arguments[0]);
    console.log(arguments.length <= 1 ? undefined : arguments[1]);
    console.log(arguments.length <= 2 ? undefined : arguments[2]);
    console.log(arguments.length <= 3 ? undefined : arguments[3]);
}
col(1, 2, 3);
console.log('--------------------');

var arr1 = ['1', '2', '3'];
// let arr2 = arr1; 1
var arr2 = [].concat(arr1);
console.log(arr2);
arr2.push('4');
console.log(arr1); //1.[1,2,3,4] 2.[1,2,3]
console.log(arr2);
console.log('--------------------');

//rest 运算符
function boo(first) {
    for (var _len = arguments.length, ev = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        ev[_key - 1] = arguments[_key];
    }

    console.log(ev.length);
    for (var val in ev) {
        console.log(val);
    }
}
boo(0, 1, 2, 3, 4, 5);

console.log('------------------');

//字符串模版
var lin = 'ling';
var lin1 = 1,
    lin2 = 2;

var str = '\u6211\u662F' + lin + '\u554A\u554A<b>\u554A\u554A</b>\u554A\u554A' + (lin1 + lin2);
var str1 = '暗淡觉得年轻大脑看大家l难道就看看啊记得拿见到你安静安徽';
document.write(str);
console.log(str1.includes(lin));
