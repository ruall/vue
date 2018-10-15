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

let add1 = (a,b=1) =>{
    console.log('dajkd');
    return a+b;
};
console.log(add1(1));



//对象函数解构json
let json1 = {
    a:1,
    b:2
};
function  fun({a,b='ad'}) {
    console.log(a,b);
}
fun(json1);

//数组解构 array
console.log('数组解构 array：');
let arr_1 = ['那绝对','撒的','阿丹','阿鸡年大吉','阿斯顿教案'];
function  fun3(a,b,c,d) {
    console.log(a,b,c,d)
}
fun3(...arr_1);


//in的用法
let obj_1 = {
    a:'三大',
    b:'圣诞节到哪c',
    c:'大大'
};
console.log('c' in obj_1);//判断obj_1中是否含有c
let arr_3 = ['阿就是你',,,];
console.log(1 in arr_3);//判断数组里面非空


//数组遍历 forEach
let arr_4 = ['打算今年的','群撒的','那绝对那句'];
arr_4.forEach((val,index)=>{console.log(val,index)});

//数组遍历 filter
arr_4.filter(x => console.log(x));
//数组遍历 some
arr_4.some(y => console.log(y));

//数组替换
console.log(arr_4.map(z=>'web'));

//数组转字符串
console.log(arr_4.toString());
//数组转字符串以后用自定义字符分割
console.log(arr_4.join('--'));

//对象赋值
let name = '大鸡年大吉';
let age = '12';
// let obj = {name:name,age:age};
let obj = {name,age};//简写
console.log(obj);

//key 值的构建
let key = 'age';
let obj_2 = {
    [key]:'web'
};
console.log(obj_2);

//自定义对象方法
let obj_3 = {
    add:function (a,b) {
        return a+b;
    }
};
console.log(obj_3.add(1,2));


//对象方法is()判断
let obj_a1 = {name:'啊啊的那句'};
let obj_a2 = {name:'啊啊的那句'};
console.log(obj_a1.name === obj_a2.name); // true
console.log(Object.is(obj_a1.name,obj_a2.name));

// === 同值相等  is严格相等
console.log(-0 === +0); //true
console.log(NaN === NaN); //false
console.log(Object.is(+0,-0));//true
console.log(Object.is(NaN,NaN));//true


//assign对象合并
let obj_a3 = {a:'大妈看到'};
let obj_a4 = {b:'思念的教案的'};
let obj_a5 = {c:'到底马克'};
let obj_a6 = Object.assign(obj_a3,obj_a4,obj_a5);
console.log(obj_a6);



//Symbol 数据类型
let t1 = new String; //字符串类型
let t2 = new Number; //数字类型
let t3 = new Boolean; //布尔类型
let t4 = new Array; //数组类型
let t5 = new Object; //对象类型
let t6 = Symbol(); //Symbol类型
console.log(typeof(t6));
let ty = Symbol('三等奖啊');
console.log(ty); // Symbol 类型输出
console.log(ty.toString()); // 字符串类型输出


let k1 = '安迪';
let obj_7 = {
    [k1]:'什么扩大'
};
console.log(obj_7);

let obj_8 = {name:'是那就等你',skill:'按时到家'};
let Sage = Symbol();
obj_8[Sage] = 12;//声明对象里面的age属性，循环输出会隐藏age
for (let per in obj_8){
    console.log(obj_8[per]); // 是那就等你  按时到家
}
console.log(obj_8[Sage]); // 18



//Set数据解构
let setArr = new Set(['萨顿就','阿斯顿你家啊','三段多久']);
console.log(setArr); //{"萨顿就", "阿斯顿你家啊", "三段多久"}
setArr.add('阿的江你家啊');//添加新数据
setArr.delete('萨顿就');//删除数据
setArr.clear();//清空数据
console.log(setArr.has('萨顿就'));//判断数据中是否包含 返回true/false
//循环输出setArr的值
let setArr_1 = new Set(['三大','啥的','大家的那句']);
for (let item of setArr_1){
    console.log(item);
}
console.log('///////////////////////////');
setArr_1.forEach((value)=>console.log(value));
console.log('```````````````');
console.log(setArr_1.size);



//WeakSet 数据结构
let weakSet = new WeakSet();
let obj_9 = {
    name:'三等奖',
    age:'12'
};
weakSet.add(obj_9);
console.log(weakSet);


//map 数据解构
let json_1 = {
    name:'没撒开',
    age:'12'
};
console.log(json_1.name); // 没撒开
let map = new Map();
map.set('安迪',json_1);
map.set(json_1,'安迪');
console.log(map);
// map 的增删查
map.get('安迪');//获取key为安迪的value值
map.delete('安迪');//删除key为安迪的值
map.clear();//清空map,删除所有值
map.size;//map 的长度
map.has('安迪');//查找map中key为安迪的值是否存在，返回true/false



//promise
let state = 1;
function step1(resolve,reject) {
    console.log('步骤1开始执行');
    if(state === 1){
        resolve('步骤1完成执行')
    }else{
        reject('步骤1错误');
    }
}
function step2(resolve,reject) {
    console.log('步骤2开始执行');
    if(state === 1){
        resolve('步骤2完成执行')
    }else{
        reject('步骤2错误');
    }
}
function step3(resolve,reject) {
    console.log('步骤3开始执行');
    if(state === 1){
        resolve('步骤3完成执行')
    }else{
        reject('步骤3错误');
    }
}
new Promise(step1).then(function(val){
    console.log(val);
    return new Promise(step2);
}).then(function(val){
    console.log(val);
    return new Promise(step3);
}).then(function(val){
    console.log(val);
});


//class
class Coder{
    name(val){
        console.log(val);
        return val;
    }
    skill(val){
        console.log(this.name('ling')+':'+'Skill'+val);
    }
    constructor(a,b){
        this.a = a;
        this.b= b;
    }
    add(){
        return this.a+this.b;
    }
}
let p = new Coder(1,2);
console.log(p.add());
// p.skill('web');

class htmler extends Coder{

}
let p2 = new htmler;
p2.name("大家");