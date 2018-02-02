<template>
  <div class='recommend' ref='recom'  >	
	<bscroll ref='scroll' :data='list' class='recommend-content' v-if='data.length'>
		<div>
	    <div class='slider-wrapper'>
	    	<slider>
	    	 <div v-for="item in data">
	    	 	<a :href='item.linkUrl'>
	    	 		<img :src="item.picUrl">
	    	 	</a>
	    	 </div>	
	    	</slider>
	    </div>	
	    <div class='recommend-list'>
	    	<h1 class='list-title'>热门歌曲推荐</h1>
	    
			    	<ul>
			         <li @click='slectItem(item)' v-for="item in list" class="item">
			         	  <div class="icon">
			         	  	<img @load="loadimage" width="60" height="60" v-lazy='item.imgurl'>
			         	  </div>
			         	  <div class="text">
			         	  	  <h2 class="name" v-text="item.creator.name"></h2>
			         	  	  <p class="desc" v-text="item.dissname"></p>
			         	  </div>
			         </li>
			    	</ul>
			    </div>
			  </div>
			  <div class="loading-container" v-if='!list.length'>
			  	 <loading></loading>
			  </div>
	   </bscroll>	
	   <router-view></router-view>
		</div>	  
	</template>
<script>
	import {getRecommend,getDiscList} from 'api/recommend'
	import {ERR_OK} from 'api/config'
	import slider from 'base/slider'
	import bscroll from 'base/scroll/scroll'
	import loading from 'base/loading/loading'
	import {playlistMixxin} from 'common/js/mixin'
	import {mapMutations} from 'vuex'
	export default{
		mixins:[playlistMixxin],
		data(){
			return {
			   data:'',	
				 list:[]
				 
			}
			
		},
		components:{
			slider,
			bscroll,
			loading
		},
		created(){
			
			setTimeout(()=>{
			this._getRecommend()	
				this._getDiscList()	
			},500)
		
		 },
		methods:{
			
	     handlePlaylist(playlist){
						let bottom=playlist.length>0?'60px':'0px'
						this.$refs.recom.style.bottom=bottom
						this.$refs.scroll.refresh()
						
					},
			 _getRecommend(){
			 	
			   getRecommend().then((res)=>{
			 		if(res.code===ERR_OK){
			 			this.data=res.data.slider
			 	
			 		}
			 	})
			    
			},
			_getDiscList(){
				getDiscList().then((res)=>{
					if(res.code===ERR_OK){
						this.list=res.data.list
						//console.log(this.list)
					}else{
						alert("链接错误！")
					}
				})
	     },
	     loadimage(){
	     	if(!this.isload){
	     		this.$refs.scroll.refresh()
	     		this.isload=true
	     	}
     	},
       slectItem(item){
	     		
	     		this.$router.push({
	     			path:`/recommend/${item.dissid}`
	     			
	     		})
	     		this.setDisc(item)
	     	},
	     	...mapMutations({
	     		setDisc:'SET_DISC'
	     		
	     	})
     
    }
	}		
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
   body
    height:2000px;
  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
          font-weight:bold
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-theme
              font-weight:bold
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>		 		
		
				 
			
			
		
		
		
	


	
