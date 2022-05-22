<template>
  <view class="login-container">
    <!-- 提示登录的图标 -->
    <uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
    <!-- 登录按钮 -->
    <button type="primary" class="btn-login" @click="getUserInfo">一键登录</button>
    <!-- 登录提示 -->
    <view class="tips-text">登录后尽享更多权益</view>
  </view>
</template>

<script>
	import { mapMutations , mapState} from 'vuex'
	export default {
		name:"my-login",
		data() {
			return {
			};
		},
		methods:{
			 ...mapMutations('m_user', ['updateUserInfo','getToken','updateRedirectInfo']),
			getUserInfo(e) {
				uni.getUserProfile({
					desc: '获取用户信息',
					success: (e) => {
						// 判断是否获取用户信息成功
						console.log(e)
						if (e.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权！')
						// 获取用户信息成功， e.detail.userInfo 就是用户的基本信息
						 this.updateUserInfo(e.userInfo)
						 this.setToken()
					}
				})
			  },
			  setToken(){
					this.getToken('123')
					this.navigateBack()
			  },
			  navigateBack(){
				  if (this.redirectInfo && this.redirectInfo.openType === 'switchTab') {
				      // 调用小程序提供的 uni.switchTab() API 进行页面的导航
					  console.log('跳转'),
				      uni.switchTab({
				        // 要导航到的页面地址
				        url: this.redirectInfo.from,
				        // 导航成功之后，把 vuex 中的 redirectInfo 对象重置为 null
				        complete: () => {
				          this.updateRedirectInfo(null)
				        }
				      })
				    }
			  }
			 //  async getToken(e) {
			 //    // 调用微信登录接口
			 //    const [err,res] = await uni.login().catch(err => err)
			 //    // 判断是否 uni.login() 调用失败
			 //    if (err || res.errMsg !== 'login:ok') return uni.$showError('登录失败！')
			 //    // 准备参数对象
				// // console.log(info)
			 //    const query = {
			 //      code: res.code,
			 //      encryptedData: e.encryptedData,
			 //      iv: e.iv,
			 //      rawData: e.rawData,
			 //      signature: e.signature
			 //    }
				// console.log(query)
			 //    // 换取 token
			 //    const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin',query)
				// console.log(loginResult)
			 //    if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
			 //    uni.$showMsg('登录成功')
			 //  }
		},
		computed:{
			...mapState('m_user',['token','redirectInfo'])
		}
	}
</script>

<style lang="scss" scoped>
.login-container {
  // 登录盒子的样式
  height: 750rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  position: relative;
  overflow: hidden;

  // 绘制登录盒子底部的半椭圆造型
  &::after {
    content: ' ';
    display: block;
    position: absolute;
    width: 100%;
    height: 40px;
    left: 0;
    bottom: 0;
    background-color: white;
    border-radius: 100%;
    transform: translateY(50%);
  }

  // 登录按钮的样式
  .btn-login {
    width: 90%;
    border-radius: 100px;
    margin: 15px 0;
    background-color: #c00000;
  }

  // 按钮下方提示消息的样式
  .tips-text {
    font-size: 12px;
    color: gray;
  }
}
</style>
