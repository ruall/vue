let foo;
({foo}={foo:'a'});
console.log(foo);
console.log('-------------------');

const [a,b,c,d] = '1234';
console.log(a);
console.log(b);
console.log(c);
console.log(d);
console.log('--------------------');

//对象扩展运算符
function col(...ev){
    console.log(ev[0]);
    console.log(ev[1]);
    console.log(ev[2]);
    console.log(ev[3]);
}
col(1,2,3);
console.log('--------------------');

let arr1 = ['1','2','3'];
// let arr2 = arr1; 1
let arr2 = [...arr1];
console.log(arr2);
arr2.push('4');
console.log(arr1);//1.[1,2,3,4] 2.[1,2,3]
console.log(arr2);
console.log('--------------------');


//rest 运算符
function boo(first,...ev){
    console.log(ev.length);
    for (let val in ev){
        console.log(val);
    }
}
boo(0,1,2,3,4,5);
console.log('------------------');

//字符串模版
let lin = 'ling';
let [lin1,lin2] = [1,2];
let str = `我是${lin}啊啊<b>啊啊</b>啊啊${lin1+lin2}`;
let str1 = '暗淡觉得年轻大脑看大家l难道就看看啊记得拿见到你安静安徽ling';
document.write(str);
console.log(str1.includes(lin)); //查找str1中是否含有lin =>true
console.log(str1.startsWith(lin)); // 查找str1开头是否含有lin =>false
console.log(str1.endsWith(lin)); // 查找str1结尾是否含有lin =>true
let lin3 = '慌/';
document.write(lin3.repeat(2));//将lin3复制2次



console.log('---------------');
//Number.isFinite()判断是否为数字
let num =11/4;
console.log(Number.isFinite(num)); // true
console.log(Number.isFinite('aasd')); // false
console.log(Number.isFinite(NaN));  // false
console.log(Number.isFinite(undefined)); // false
console.log(Number.isFinite(123)); // true

//Number.isNaN判断是否为NaN
console.log(Number.isNaN(NaN)); // true

//Number.isInteger判断是否为整数
console.log(Number.isInteger(123)); // true

//Number.parseInt 转为整型   Number.parseFloat 转为浮点型
let num2=123.4;
console.log(Number.parseInt(num2)); // 123
console.log(Number.parseFloat(num2)); //123.4

console.log(Number.MAX_SAFE_INTEGER); // 最大安全整数
console.log(Number.MIN_SAFE_INTEGER); // 最小安全整数

// Number.isSafeInteger 判断是否为安全整数，返回true/false



console.log('------------------');
//ES6数组   json 数组

let json = {
    '0':'a',
    '1':'ab',
    '2':'abc',
    length:3
};
let arr = Array.from(json);
console.log(arr);
let arr3 = Array.of(1,2,3,4);
console.log(arr3);
let stt = '[1,2,3,4]';
stt = eval(stt);
console.log(stt);


//find()实例 查找数组中符合条件的元素
let arr4=[1,2,3,4,5,6,7];
console.log(arr4.find(function(value,index,arr){
    return value>6;//查找数组中大于6的数组元素
}));


//fill() 替换数组中的元素内容
let arr5 = ['萨达很简单','12剋按到家','ID你集散地'];
arr5.fill('11111',1,2);
console.log(arr5);


//for of 循环数组
console.log('--------------');
let arr6 = ['1a蛇年大吉难道就看','暗淡就打开呢1加拿大卡','澳代的2胆囊结石'];
for(let [index,val] of arr6.entries()){
    console.log(index+':'+val);
}

//entries() 实现数组不规则循环
let arr7 = ['a11192ji1n','1231213asdas','1jeidanskdam'];
let list = arr7.entries();
console.log(list.next().value);
console.log('----------------');
console.log(list.next().value);
console.log('~~~~~~~~~~~~~~~~');
console.log(list.next().value);
console.log('****************');


console.log('~~~~~~~~~~~~~~~~~');
//箭头函数
'use strict' //使用严谨模式
function add(a,b=1) {//给b添加默认值
    if(a === 0){
        throw new Error('a is Error');//手动设置抛出异常
    }
    return a+b;
}
console.log(add(1));
console.log(add.length);//获取必须传递参数的个数