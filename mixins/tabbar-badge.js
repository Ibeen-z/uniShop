import { mapGetters } from "vuex"
export default{
	computed:{
		...mapGetters('m_cart',['total'])
	},
	watch:{
		total(){
			this.setbadge()
		}
	},
	onShow(){
		this.setbadge()
	},methods: {
			setbadge(){
				uni.setTabBarBadge({
					index:2,
					text: this.total + ''
				})
			}
		}
}