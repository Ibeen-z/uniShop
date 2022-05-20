<template>
	<view>
		<view class="goods-item">
			<view class="goods-item-left">
				<radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="radioChangeHandler"></radio>
				<image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
			</view>
			<view class="goods-item-right">
				<view class="goods-name">
					{{goods.goods_name}}
				</view>
				<view class="goods-info-box">
					<view class="goods-price">
						￥{{goods.goods_price | tofixed}}
					</view>
					<uni-number-box :min="1" :value="goods.goods_count" @change="numChangeHandler" v-if="showNum"></uni-number-box>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			goods:{
			type:Object,
			default:{}
		},
		 showRadio: {
		      type: Boolean,
		      // 如果外界没有指定 show-radio 属性的值，则默认不展示 radio 组件
		      default: false,
		    },
			// 是否展示价格右侧的 NumberBox 组件
		showNum: {
		  type: Boolean,
		  default: false,
		},
		},
		name:"my-goods",
		data() {
			return {
				defaultPic:'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		filters:{
			tofixed(num){
				return Number(num).toFixed(2)
			}
		},
		methods:{
			radioChangeHandler(){
				this.$emit('radio-change',{
				  // 商品的 Id
				  goods_id: this.goods.goods_id,
				  // 商品最新的勾选状态
				  goods_state: !this.goods.goods_state
				})
			},
			// NumberBox 组件的 change 事件处理函数
			  numChangeHandler(val) {
			    // 通过 this.$emit() 触发外界通过 @ 绑定的 num-change 事件
			    this.$emit('num-change', {
			      // 商品的 Id
			      goods_id: this.goods.goods_id,
			      // 商品的最新数量
			      goods_count: +val
			    })
			  }
		}
	}
</script>

<style lang="scss">
.goods-item{
	// 让 goods-item 项占满整个屏幕的宽度
	width: 750rpx;
	  // 设置盒模型为 border-box
	box-sizing: border-box;
	display: flex;
	border: #EEEEEE solid 1px;
	.goods-item-left{
		display: flex;
		justify-content: space-between;
		align-items: center;
		.goods-pic{
			width: 100px;
			height: 100px;
			display: block;
		}
	}
	.goods-item-right{
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex: 1;
		.goods-name{
			font-size: 13px;
		}
		.goods-info-box{
			display: flex;
			align-items: center;
			justify-content: space-between;
			.goods-price{
				color: #c00000;
			}
		}
	}
}
</style>
