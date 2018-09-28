<template>
  <div class="pos">
    <el-row>
      <el-col :span="7" class="pos-order" id="order-list">
        <el-tabs type="border-card" v-model="activeName">
          <el-tab-pane label="点餐" name="first">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column align="center" prop="goodsName" label="商品名称" width="120"></el-table-column>
              <el-table-column align="center" prop="count" label="数量" width="60"></el-table-column>
              <el-table-column align="center" prop="price" label="金额"></el-table-column>
              <el-table-column align="center" fixed="right" label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="small">删除</el-button>
                  <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="totleDiv">
              数量：<b>{{totalCount}}</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金额：<b>{{totalMoney}}</b>元
            </div>
            <el-row class="order-btn">
              <el-button type="success" size="small">结账</el-button>
              <el-button type="warning" size="small">挂单</el-button>
              <el-button type="danger" size="small">删除</el-button>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="挂单" name="second">挂单</el-tab-pane>
          <el-tab-pane label="外卖" name="third">外卖</el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="17">
        <div class="often-goods">
          <div class="title">常用商品</div>
          <div class="often-goods-list">
            <ul>
              <li v-for="goods in oftenGoods" :id="goods.goodsId" @click="addOrderList(goods)">
                <span>{{goods.goodsName}}</span>
                <span class="o-price">¥{{goods.price}}元</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="goods-type">
          <el-tabs type="border-card">
            <el-tab-pane label="汉堡">
              <ul class='cookList'>
                <li v-for="item in type0Goods" :id="item.goodsId" @click="addOrderList(item)">
                  <span class="foodImg"><img :src="item.goodsImg" width="100%"></span>
                  <span class="foodName">{{item.goodsName}}</span>
                  <span class="foodPrice">￥{{item.price}}元</span>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="小食">
              <ul class='cookList'>
                <li v-for="item in type1Goods" :id="item.goodsId" @click="addOrderList(item)">
                  <span class="foodImg"><img :src="item.goodsImg" width="100%"></span>
                  <span class="foodName">{{item.goodsName}}</span>
                  <span class="foodPrice">￥{{item.price}}元</span>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="饮料">
              <ul class='cookList'>
                <li v-for="item in type2Goods" :id="item.goodsId" @click="addOrderList(item)">
                  <span class="foodImg"><img :src="item.goodsImg" width="100%"></span>
                  <span class="foodName">{{item.goodsName}}</span>
                  <span class="foodPrice">￥{{item.price}}元</span>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="套餐">
              <ul class='cookList'>
                <li v-for="item in type3Goods" :id="item.goodsId" @click="addOrderList(item)">
                  <span class="foodImg"><img :src="item.goodsImg" width="100%"></span>
                  <span class="foodName">{{item.goodsName}}</span>
                  <span class="foodPrice">￥{{item.price}}元</span>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import axios from 'axios';
  export default {
    name: "pos",
    data(){
      return{
        activeName: 'first',
        totalCount:0,
        totalMoney:0,
        tableData: [],
        oftenGoods:[],
        type0Goods:[],
        type1Goods:[],
        type2Goods:[],
        type3Goods:[],
      }
    },
    created(){
      axios.get('https://www.easy-mock.com/mock/5b8b30dbf032f03c5e71de7f/kuaican/oftenGoods')
        .then(response=>{
          console.log(response);
          this.oftenGoods = response.data;
        })
        .catch(error=>{
          console.log(error);
          alert('网络错误');
        });
      axios.get('https://www.easy-mock.com/mock/5b8b30dbf032f03c5e71de7f/kuaican/typeGoods')
        .then(response=>{
          console.log(response);
          this.type0Goods=response.data[0];
          this.type1Goods=response.data[1];
          this.type2Goods=response.data[2];
          this.type3Goods=response.data[3];
        })
        .catch(error=>{
          console.log(error);
          alert('网络错误');
        })
    },
    mounted(){
      let posHeight = document.body.clientHeight;
      document.getElementById('order-list').style.height = posHeight + 'px';
    },
    methods:{
      addOrderList(goods){
        this.totalCount=0;
        this.totalMoney=0;
        let isHave = false;
        for (let i =0;i<this.tableData.length;i++){
          if(this.tableData[i].goodsId === goods.goodsId){
            isHave = true;
          }
        }
        if(isHave){
          let arr = this.tableData.filter(o =>o.goodsId === goods.goodsId);
          arr[0].count++;
        }else{
          let newGoods={goodsId:goods.goodsId,goodsName:goods.goodsName,price:goods.price,count:1};
          this.tableData.push(newGoods);
        }
        this.tableData.forEach((element) => {
          this.totalCount+=element.count;
          this.totalMoney=this.totalMoney+(element.price*element.count);
        });
      }

  }
  }
</script>


<style scoped>
  .pos-order{
    background-color: #f9fafc;
    border-right: 1px solid #c0ccda;
  }
  .order-btn{
    padding: 10px 0;
  }
  .title{
    height: 20px;
    font-size: 13px;
    border-bottom: 1px solid #d3dce6;
    background-color: #f9fafc;
    padding: 10px;
    text-align: left;
  }
  .often-goods-list ul li{
    list-style: none;
    float: left;
    border: 1px solid #e5e9f2;
    padding: 10px;
    margin: 10px;
    background-color: #fff;
    font-size: 12px;
    border-radius: 5px;
    cursor: pointer;
  }
  .o-price{
    color: #58b7ff;
    padding-left: 5px;
  }
  .goods-type{
    clear: both;
  }
  .cookList li{
    list-style: none;
    width:23%;
    border:1px solid #E5E9F2;
    height: auto;
    overflow: hidden;
    background-color:#fff;
    padding: 2px;
    margin: 10px;
    float:left;
    border-radius: 5px;
    cursor: pointer;
  }
  .cookList li span{
    display: block;
    float:left;
  }
  .foodImg{
    width: 40%;
  }
  .foodImg img{
    vertical-align: middle;
  }
  .foodName{
    font-size: 13px;
    padding-left: 10px;
  }
  .foodPrice{
    font-size: 12px;
    padding-left: 10px;
    padding-top:10px;
    color: #58b7ff;
  }
  .totleDiv{
    background-color: #fff;
    padding: 10px;
    font-size: 12px;
    border-bottom: 1px solid #ebeef5;
    border-left: 1px solid #ebeef5;
    border-right: 1px solid #ebeef5;
  }
  .totleDiv b{
    font-weight: normal;
    font-size: 16px;
    color: red;
    padding: 0 5px;
  }
</style>
