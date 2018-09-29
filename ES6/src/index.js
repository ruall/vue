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