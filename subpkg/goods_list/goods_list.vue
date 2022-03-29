<template>
	<view>
		<view class="goods-list">
			<view v-for="(goods,i) in goodList" :key="i" @click="gotoDetail(goods)">
				<my-goods :goods="goods"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryobj:{
					query:'',
					cid:'',
					pagenum:1,
					pagesize:10
				},
				goodList:[],
				total:0,
				isloading:false
			}
		},
		onLoad(options) {
			this.queryobj.query = options.query || ''
			this.queryobj.cid = options.cid || ''
			this.getGoodsList()
		},
		methods:{
			async getGoodsList(cb){
				this.isloading =true
				const {data:res} = await uni.$http.get('/api/public/v1/goods/search',this.queryobj)
				this.isloading = false
				cb && cb()
				if(res.meta.status !== 200) return uni.showMsg()
				this.goodList = [...this.goodList,...res.message.goods]
				this.total = res.message.total
			},
			gotoDetail(goods){
				uni.navigateTo({
					url:'../good_detail/good_detail?goods_id='+ goods.goods_id
				})
			}
		},
		onReachBottom() {
			if(this.queryobj.pagenum*this.queryobj.pagesize >= this.total) return uni.$showMsg('数据加赞完毕！')
			
			if(this.isloading) return
			
			this.queryobj.pagenum ++
			this.getGoodsList()
		},
		onPullDownRefresh() {
			this.queryobj.pagenum = 0
			this.total = 0 
			this.isloading =false
			this.goodList = []
			
			this.getGoodsList(()=>{
				uni.stopPullDownRefresh()
			})
		}
	}
</script>

<style lang="scss">

</style>
