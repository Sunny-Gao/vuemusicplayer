<template>
	<transition name="slide">
	  <musiclist :songs='song' :title='title' :bg-image='bgimg'>
	  	
	  </musiclist>
	 
  </transition>
</template>

<script type="text/ecmascript-6">
	import {ERR_OK} from 'api/config'
	import {getSingerDetail} from 'api/singer'
	import {mapGetters} from 'vuex'
	import {createSong} from 'api/song'
	import musiclist from 'components/musiclist/musiclist'
   export default {
     computed:{
     	title(){
     		return this.singer.name
     		
     	},
     	bgimg(){
     		
     		return this.singer.avatar
     	},
     ...mapGetters([
        'singer'		
     		
     	])
     },
     components:{
     	musiclist
     	
     },
     created(){
     	this.getSinerList()
     	
     },
     data(){
     	return {
     		
     		song:[]
     		
     	}
      },
     methods:{
     	getSinerList(){
     		if(!this.singer.id){
     			
     		   this.$router.push('/singer')
     		   
     		   return
     	    }
     		getSingerDetail(this.singer.id).then((res)=>{
     			if(res.code===ERR_OK){
     				
     					
     					this.song=this._narmalsongs(res.data.list)
     				
     				//console.log(this.song)
     			}
     			
     		})
     	},
     	_narmalsongs(list){
     		let ret=[]
     		
     		list.forEach((item)=>{
     			
     			let {musicData}=item
     
     			if(musicData.songid && musicData.albummid){
     				
     				ret.push(createSong(musicData))
     				
     			}
     			
     		})
     		
     		return ret
     		
     	}
     	
     	}
     
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
 
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>