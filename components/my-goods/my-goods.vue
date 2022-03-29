<template>
	<view>
		<view class="goods-item">
			<view class="goods-item-left">
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
		}
	}
</script>

<style lang="scss">
.goods-item{
	display: flex;
	border: #EEEEEE solid 1px;
	.goods-item-left{
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
		.goods-name{
			font-size: 13px;
		}
		.goods-info-box{
			.goods-price{
				color: #c00000;
			}
		}
	}
}
</style>
