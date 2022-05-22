<template>
	<view class="userInfo">
		<!-- 头部区域 -->
		<view class="top-box">
			<image :src="userinfo.avatarUrl"></image>
			<text>{{userinfo.nickName}}</text>
		</view>
		
		<!-- 面板的列表区域 -->
		<view class="panel-list">
			 <!-- panel 的 item 项 -->
			 <view class="panel">
			 	<view class="panel-body">
			 		<view class="panel-item" v-for="(item,i) in panelitem" :key="i">
			 		  <text>{{item.total}}</text>
			 		  <text>{{item.text}}</text>
			 		</view>
			 	</view>
			 </view>
			 
			 <!-- 第二个面板 -->
			 <view class="panel">
			   <!-- 面板的标题 -->
			   <view class="panel-title">我的订单</view>
			   <!-- 面板的主体 -->
			   <view class="panel-body">
			     <!-- 面板主体中的 item 项 -->
			     <view class="panel-item">
			       <image src="/static/my-icons/icon1.png" class="icon"></image>
			       <text>待付款</text>
			     </view>
			     <view class="panel-item">
			       <image src="/static/my-icons/icon2.png" class="icon"></image>
			       <text>待收货</text>
			     </view>
			     <view class="panel-item">
			       <image src="/static/my-icons/icon3.png" class="icon"></image>
			       <text>退款/退货</text>
			     </view>
			     <view class="panel-item">
			       <image src="/static/my-icons/icon4.png" class="icon"></image>
			       <text>全部订单</text>
			     </view>
			   </view>
			 </view>
			 
			 
			 <!-- 第三个面板 -->
			 <view class="panel">
			   <view class="panel-list-item">
			     <text>收货地址</text>
			     <uni-icons type="arrowright" size="15"></uni-icons>
			   </view>
			   <view class="panel-list-item">
			     <text>联系客服</text>
			     <uni-icons type="arrowright" size="15"></uni-icons>
			   </view>
			   <view class="panel-list-item"  @click="logout">
			     <text>退出登录</text>
			     <uni-icons type="arrowright" size="15"></uni-icons>
			   </view>
			 </view>
			 
			 
		</view>
		
	</view>
</template>

<script>
	import {
		mapState,mapMutations
	} from 'vuex'
	export default {
		name: "my-userinfo",
		data() {
			return {
				panelitem:[
					{total:8,text:'收藏的店铺'},
					{total:18,text:'收藏的商品'},
					{total:14,text:'关注的商品'},
					{total:84,text:'足迹'}],
			};
		},
		methods:{
			...mapMutations('m_user',['updateUserInfo','updateToken','updateAddress','getToken']),
			// 退出登录
			async logout() {
			  // 询问用户是否退出登录
			  const [err, succ] = await uni.showModal({
			    title: '提示',
			    content: '确认退出登录吗？'
			  }).catch(err => err)
			
			  if (succ && succ.confirm) {
			     // 用户确认了退出登录的操作
			     // 需要清空 vuex 中的 userinfo、token 和 address
			     this.updateUserInfo({})
			     // this.updateToken('')
				 this.getToken('')
			     this.updateAddress({})
			  }
			}
		},
		computed: {
			...mapState('m_user', ['userinfo'])
		}
	}
</script>

<style lang="scss" scoped>
	.userInfo {
		height: 100%;
		// 为整个组件的结构添加浅灰色的背景
		background-color: #f4f4f4;

		.top-box {
			height: 400rpx;
			background-color: #c00000;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			background-color: #c00000;

			image {
				display: block;
				width: 80px;
				height: 80px;
				border-radius: 45px;
				border: 2px solid white;
				box-shadow: 0 1px 5px black;
			}
		}
		
		.panel-list {
		  padding: 0 10px;
		  position: relative;
		  top: -10px;
		
		  .panel {
		    background-color: white;
		    border-radius: 3px;
		    margin-bottom: 8px;
			
			.panel-title {
			      line-height: 45px;
			      padding-left: 10px;
			      font-size: 15px;
			      border-bottom: 1px solid #f4f4f4;
			    }
				
		    .panel-body {
		      display: flex;
		      justify-content: space-around;
		
		      .panel-item {
		        display: flex;
		        flex-direction: column;
		        align-items: center;
		        justify-content: space-around;
		        font-size: 13px;
		        padding: 10px 0;
				.icon {
				          width: 35px;
				          height: 35px;
				        }
		      }
		    }
		  }
		  .panel-list-item {
		    height: 45px;
		    display: flex;
		    justify-content: space-between;
		    align-items: center;
		    font-size: 15px;
		    padding: 0 10px;
		  }
		}
	}
</style>
