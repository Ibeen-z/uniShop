<template>
	<view class="cart-container"  v-if="cart.length !== 0">
		<my-adress></my-adress>
		<view class="cart-title">
			<uni-icons type="shop" size="18"></uni-icons>
			<text class="cart-title-text">购物车</text>
		</view>
		
		<!-- 商品列表区域 -->
		<uni-swipe-action>
			<block v-for="(goods, i) in cart" :key="i">
				<uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(goods)">
					<my-goods :goods="goods" :show-radio="true"  :show-num="true" @num-change="numberChangeHandler" @radio-change="radioChangeHandler"></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
		
		
		<!-- 结算区域 -->
		<my-settle> </my-settle>
	</view>
	
	
	<!-- 空白购物车区域 -->
	  <view class="empty-cart" v-else>
	    <image src="/static/cart_none.png" class="empty-img"></image>
	    <text class="tip-text">空空如也~</text>
	  </view>
</template>

<script>
	import badgeMix from "@/mixins/tabbar-badge.js"
	import { mapState, mapMutations } from 'vuex'
	
	export default {
		computed:{
			...mapState('m_cart',['cart'])
		},
		mixins:[badgeMix],
		
		data() {
			return {
				options: [{
				      text: '删除', // 显示的文本内容
				      style: {
				        backgroundColor: '#C00000' // 按钮的背景颜色
				      }
				    }]
			}
		},
		methods:{
			...mapMutations('m_cart',['updataGoodsState','updataGoodsCount','removeGoodsById']),
			radioChangeHandler(e){
				this.updataGoodsState(e)
			},
			numberChangeHandler(e){
				this.updataGoodsCount(e)
			},
			swipeActionClickHandler(goods) {
			  this.removeGoodsById(goods.goods_id)
			}
		}
	}
</script>

<style lang="scss">
	.cart-container{ 
		padding-bottom: 50px;
		.cart-title{
			height: 40px;
			display: flex;
			align-items: center;
			font-size: 14px;
			padding-left: 5px;
			border-bottom: 1px solid #efefef;
			
			.cart-title-text{
				margin-left: 10px;
			}
		}
}
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;

  .empty-img {
    width: 90px;
    height: 90px;
  }

  .tip-text {
    font-size: 22px;
    color: gray;
    margin-top: 15px;
	margin-left: 20px;
	text-align: center;
  }
}
</style>
