var nickNameList = [
    {
        "name": "333",
        "selected": false,
        "id": "333"
    },
    {
        "name": "222",
        "selected": false,
        "id": "222"
    },
    {
        "name": "1111",
        "selected": false,
        "id": "1111"
    }
];
var arrList = ['111', '222', '333'];

// var arry= [{a:11,b:22,c:33,d:44},{a:11,b:0,c:0,d:44},{a:11,b:22,c:99,d:99}];

var arry2=[];

arrList.map(((item, index)=> {
    arry2.push(Object.assign({},{name:item,selected:false,id:item}))
}))

console.log(arry2)

var arrList1 = arrList.concat(nickNameList);

var arrNew = new Set(arrList1);

arrNew = Array.from(arrNew);