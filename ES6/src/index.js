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
document.write(lin3.repeat(2));



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