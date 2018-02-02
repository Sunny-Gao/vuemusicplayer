import {mapGetters} from 'vuex'
export const playlistMixxin={
	computed:{
		...mapGetters(
			[
			  'playlist'
			])
			
	},
	mounted(){
		setTimeout(()=>{
			
		this.handlePlaylist(this.playlist)	
		
	},3000)
		
		
	},
	activated(){
		
		setTimeout(()=>{
			
		this.handlePlaylist(this.playlist)	
		},3000)
		
	},
   
	watch:{
		playlist(val){
			
			this.handlePlaylist(val)
			
		}
		
		
	},
   methods:{
	   handlePlaylist(){
	  
	   	throw new Error('请在组件中定义handlePlaylist-methods!')
	   	
	   }
  }
	
}


