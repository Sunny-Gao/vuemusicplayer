<template>
  <transition name="slide">
    <musiclist :title='title' :bgImage='bgImage' :songs='songs'></musiclist>
  </transition>
</template>

<script>
	 import musiclist from 'components/musiclist/musiclist'
	 import {mapGetters} from 'vuex'
	 import {getSonglist} from 'api/recommend'
	 import {ERR_OK} from 'api/config'
	 import {createRecomSong} from 'common/js/song'
	 export default{
	 	data(){
	 		return{
	 			songs:[]
	 			
	 		}
	 		
	 		
	 	},
	 	components:{
	 		musiclist
	 		
	 	},
	 	
	 	computed:{
	 		title(){
	 			return this.disc.dissname

	 			
	 		},
	 		bgImage(){
	 			return this.disc.imgurl
	 			
	 		},
	 		...mapGetters([
	 			'disc'
	 			
	 		])
	 		
	 	},
	 	created(){
	 		this._getSongList()
	 	
	 	},
	 	methods:{
	 		
	 		_getSongList(){
	 			if(!this.disc.dissid){
	 				this.$router.push('/recommend')
	 				return
	 			}
	 		 getSonglist(this.disc.dissid).then((res)=>{
	 		 	if(res.code===ERR_OK){
	 		 		 this.songs=this._handle(res.cdlist[0].songlist)
	 		 	}
	 	  
	 		 })	
	 		 
	 		},
	 		_handle(list){
	 			let arr=[]
	 			list.forEach((musicData)=>{
		 			if(musicData.id && musicData.album){	
		 		   arr.push(createRecomSong(musicData))
		 			
		 			}
		 	 
	 			})
	 		return arr
	 }

		}
	 	
	 } 		
	 		
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>