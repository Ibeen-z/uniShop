<template>
	<view>
		<!-- 顶部搜索 -->
		<view class="search-box">
			<uni-search-bar placeholder="请输入搜索内容" @input="input" :radius="100" cancelButton="none"></uni-search-bar>
		</view>
		
		<!-- 搜索列表 -->
		<view class="sugg-list" v-if="searchResults.length !== 0">
			<view class="sugg-item" v-for="(item,i) in searchResults" :key="i" @click="gotoDetail(item.goods_id)">
				<view class="goods-name">
					{{item.goods_name}}
				</view>
				<uni-icons type="arrowright" size="20"></uni-icons>
			</view>
		</view>
		
		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="clean"></uni-icons>
			</view>
			<!-- 列表区域 -->
			<view class="histor-list">
				<uni-tag :text="item" v-for="(item,i) in histories" :key="i" @click="gotoGoodsList(item)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer:null,
				kw:'',
				searchResults:[],
				historyList:[]
			};
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
		},
		computed:{
			histories(){
				return [...this.historyList].reverse()
			}
		},
		methods:{
			input(e){
				clearTimeout(this.timer)
				this.timer = setTimeout(()=>{
					this.kw = e
					this.getSearchList()
					console.log(this.kw)
				},500)
			},
			async getSearchList(){
				if(this.kw.length === 0 ){
					this.searchResults = []
					return
				}
				const {data:res} =await uni.$http.get('/api/public/v1/goods/qsearch',{ query : this.kw })
				if(res.meta.status !== 200) return uni.$showMsg()
				this.searchResults = res.message
				
				this.saveSearchHistory()
			},
			gotoDetail(item){
				uni.navigateTo({
					url:'/subpkg/good_detail/good_detail'
				})
			},
			saveSearchHistory(){
				// this.historyList.push(this.kw)
				
				const set = new Set(this.historyList)
				
				set.delete(this.kw)
				
				set.add(this.kw)
				
				this.historyList = Array.from(set)
				
				uni.setStorageSync('kw',JSON.stringify(this.historyList))
			},
			clean(){
				this.historyList = []
				uni.setStorageSync('kw','[]')
			},
			gotoGoodsList(kw){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?query='+kw
				})
			}
		}
	}
</script>

<style lang="scss">
 .search-box{
	 position: sticky;
	 top: 0;
	 z-index: 999;
 }
 .sugg-list{
	 padding: 0 5px;
	 
	 .sugg-item{
		 font-size: 12px;
		 padding: 13px 0;
		 border-bottom: 1px solid #efefef;
		 display: flex;
		 align-items: center;
		justify-content: space-between;

		 .goods-name{
			 white-space: nowrap;
			 overflow: hidden;
			 text-overflow: ellipsis;
			 margin-right: 3px;
		 }
	 }
 }
 .history-box{
	 padding: 0 5px;
	 
	 .history-title{
		 display: flex;
		 justify-content: space-between;
		 height: 40px;
		 align-items: center;
		 font-size: 13px;
		 border-bottom: 1px solid #efefef;
	 }
	 .histor-list{
		 // display: flex;
		 // flex-wrap: wrap;
		 
		 .uni-tag{
			 margin-top: 5px;
			 margin-right: 5px;
			 background-color: #eee;
			 border-color: #eee;
			 color: #000000;
			}
	 }
 }
</style>
