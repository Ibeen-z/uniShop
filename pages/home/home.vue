<template>
	<view>
		<view class="search-box">
			<my-serch @click="gotoSearch"></my-serch>
		</view>
		<!-- 轮播图 -->
	
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
				<swiper-item v-for="(item,i) in swiperList" :key = "i">
					<navigator class="swiper-item" :url="'/subpkg/good_detail/good_detail?goods_id=' + item.goods_id">
						<image :src="item.image_src"></image>
					</navigator>
				</swiper-item>
			</swiper>
		
		
		<!-- 分类导航 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item,i) in navList" :key="i" @click="navClickHandler(item)">
				<image :src="item.image_src" class="nav-img">
					
				</image>
			</view>
		</view>
		
		<!-- 楼层 -->
		<view class="floor-list">
			<!-- 标题 -->
			<view class="floor-item" v-for="(item,i) in floorList" :key="i">
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<view class="floor-img-box">
					<!-- 左侧大盒子 -->
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image class="left-img-ietm" :src="item.product_list[0].image_src" mode="widthFix" :style="{width: item.product_list[0].image_width+'rpx'}"></image>
					</navigator>
					<!-- 右侧小盒子 -->
					<view class="right-img-box">
						<navigator class="right-img-ietm" v-for="(item2,index2) in item.product_list" :key="index2" :url="item2.url">
							<image :src="item2.image_src"  mode="widthFix" :style="{width:item2.image_width + 'rpx'}" v-if="index2 !== 0"></image>
						</navigator>
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import badgeMix from "@/mixins/tabbar-badge.js"
	export default {
		mixins:[badgeMix],
		data() {
			return {
				swiperList:[],
				navList:[],
				floorList:[]
			};
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()
		},
		methods:{
			async getSwiperList (){
				const {data:res} =await uni.$http.get('/api/public/v1/home/swiperdata')
				if(res.meta.status !== 200){
					return uni.$showMsg()
				}
				
				this.swiperList = res.message
			},
			async getNavList(){
				const {data:res} = await uni.$http.get('/api/public/v1/home/catitems')
				if(res.meta.status !== 200){
					return uni.$showMsg()
				}
				this.navList = res.message
			},
			navClickHandler(item){
				if(item.name === "分类"){
					uni.switchTab({
						url:'/pages/cate/cate'
					})
				}
			},
			async getFloorList(){
				const {data:res} = await uni.$http.get('/api/public/v1/home/floordata')
				if(res.meta.status !== 200){
					return uni.$showMsg()
				}
				
				res.message.forEach(floor =>{
					floor.product_list.forEach(prod =>{
						prod.url = '/subpkg/goods_list/goods_list?'+ prod.navigator_url.split(' ')
					})
				})
				this.floorList = res.message
			},
			gotoSearch(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
			
		}
	} 
</script>

<style lang="scss">
swiper{
	height: 330rpx;
	.swiper-item,
	image{
		width: 100%;
		height: 100%;
	}
}

.search-box{
	position: sticky;
	top:0;
	z-index: 999;
}
.nav-list{
	display: flex;
	justify-content: space-around;
	margin: 15px 0;
	.nav-img{
		width: 128rpx;
		height: 140rpx;
	}
}
.floor-title{
	height: 60rpx;
	width: 100%;
	display: flex;
}
.right-img-box{
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}
.floor-img-box{
	display: flex;
	padding-left: 10rpx;
}
</style>
