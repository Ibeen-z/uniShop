export default {
	namespaced:true,
	
	state:()=>({
		// {goods_id,goods_name,goods_price,goods_count,goods_small_logo,goods_state}
		cart:JSON.parse(uni.getStorageSync('cart') || '[]')
	}),
	
	mutations:{
		addToCart(state,goods){
			const findResult = state.cart.find((x)=>{
				x.goods_id === goods.goods_id
			})
			if(!findResult){
				state.cart.push(goods)
			}else{
				findResult.goods_count++
			}
			
		this.commit('m_cart/saveToStorage')
		},
		saveToStorage(state){
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		updataGoodsState(state,goods){
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			
			if(findResult){
				
				findResult.goods_state = goods.goods_state
				
				this.commit('m_cart/saveToStorage')
			}
		},
		updataGoodsCount(state,goods){
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			
			if(findResult){
				findResult.goods_count = goods.goods_count
				this.commit('m_cart/saveToStorage')
			}
		},
		removeGoodsById(state, goods_id) {
		  // 调用数组的 filter 方法进行过滤
		  state.cart = state.cart.filter(x => x.goods_id !== goods_id)
		  // 持久化存储到本地
		  this.commit('m_cart/saveToStorage')
		},
		updateAllGoodsState(state,newState){
			// 循环更新购物车中每件商品的勾选状态
			  state.cart.forEach(x => x.goods_state = newState)
			  // 持久化存储到本地
			  this.commit('m_cart/saveToStorage')
		}
	},
	
	getters:{
		// 购物车商品总数
		total(state){
			// let c = 0
			// state.cart.forEach(goods =>c += goods.goods_count)
			// return c
			return state.cart.reduce((total,item)=> total+=item.goods_count,0)
		},
		// 已勾选总数
		checkedCount(state) {
		  // 先使用 filter 方法，从购物车中过滤器已勾选的商品
		  // 再使用 reduce 方法，将已勾选的商品总数量进行累加
		  // reduce() 的返回值就是已勾选的商品的总数量
		  return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
		},
		checkedGoodsAmount(state) {
		  // 先使用 filter 方法，从购物车中过滤器已勾选的商品
		  // 再使用 reduce 方法，将已勾选的商品数量 * 单价之后，进行累加
		  // reduce() 的返回值就是已勾选的商品的总价
		  // 最后调用 toFixed(2) 方法，保留两位小数
		  return state.cart.filter(x => x.goods_state)
		                   .reduce((total, item) => total += item.goods_count * item.goods_price, 0)
		                   .toFixed(2)
		}
	},
}
