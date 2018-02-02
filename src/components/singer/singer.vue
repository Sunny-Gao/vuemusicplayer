<template>
   <div class="singer" ref='singer'>
		<listvue :data='maps' @select='selected' ref='list'></listvue>
		<router-view></router-view>
	</div>
</template>

<script>
	import {getSingerList} from 'api/singer'
	import {ERR_OK} from 'api/config'
	import singer from 'common/js/singer'
	import listvue from 'base/listview/listview'
	import {getSingerDetail} from 'api/singer'
	import {mapMutations} from 'vuex'
	import {playlistMixxin} from 'common/js/mixin'
	
    const HOT_NAME='热门'
    const HOT_SINGGERLEN=10
	export default{
		mixins:[playlistMixxin],
		components:{
			listvue
			
		},
		data(){
			return {
			singer:[],
			maps:[],
			id:''
			}
		},	
		created(){
			setTimeout(()=>{
				
			this._getsingerlist()	
			},1000)
         	
		},
		methods:{
		selected(item){
			this.id=item.id
			this.$router.push({
				path: `/singer/${item.id}`
				
			   })
			this.setSinger(item)
			
		},
		_getsingerlist(){
			getSingerList().then((res)=>{
				if(res.code===ERR_OK){
					this.singer=res.data.list
			        this._normalSinger(this.singer)
			  
				}
			})	
		},
		_normalSinger(list){
			let map={
				hot:{
					title:HOT_NAME,
					items:[]
				}	
			}
		 list.forEach((item,index)=>{
				if(index<HOT_SINGGERLEN){
					map.hot.items.push(new singer({
						name: item.Fsinger_name,
                        id: item.Fsinger_mid
						
					}))
				}
				const key=item.Findex
				if(!map[key]){
					map[key]={
						title:key,
						items:[]
					}
				}	
				map[key].items.push(new singer({
						name: item.Fsinger_name,
                        id: item.Fsinger_mid
						
					}))
			})
		 	//处理map得到有序数组
		 	let hot=[]
		 	let ret=[]
		 	
		 	for(let key in map){
		 	   let val=map[key]
		 	   if(val.title.match(/[a-zA-Z]/)){
		 	   	  ret.push(val)
		 	   	
		 	   }else if(val.title===HOT_NAME){
		 	   	
		 	   	hot.push(val)
		 	   }	
		 	 }  
		 		
		   ret.sort((a, b) => {
                  return a.title.charCodeAt(0) - b.title.charCodeAt(0)
             })
		     
		      let mapu=hot.concat(ret)
		 	  this.maps=mapu
		 	  
		   },//_normalSinger 
		    handlePlaylist(playlist){
					let bottom=playlist.length>0?'60px':'0px'
					this.$refs.singer.style.bottom=bottom
					this.$refs.list.re()
				  
				},
		   ...mapMutations({
		   	  setSinger:"SET_SINGER"
		   })
		}
	}//export		
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>		
	

		
					
		
			
			
		
		
		
	