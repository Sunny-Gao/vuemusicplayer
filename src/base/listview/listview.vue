<template>
	<scroll class="listview" :data='data' ref='listview' :listenScroll='listenScroll' @scroll='scroll' :probeType='probeType'>
	      <ul>
	      	 <li  v-for='item in data' class="list-group" ref='listgroup'>
	      	 	<h2 class="list-group-title" >{{item.title}}</h2>
	      	 	<ul>
	      	 		<li @click='selected(neiro)' v-for='neiro in item.items' class="list-group-item">
	      	 			<img class="avatar" v-lazy='neiro.avatar' />
	      	 			<span class="name">{{neiro.name}}</span>
	      	 		</li>
	      	 	</ul>	
	      	 </li>
	</ul>
	 <div class="list-shortcut" @touchstart='onStart' @touchmove.stop.prevent='onMove'>
	 	<ul>
	 		<li v-for='(item,index) in _shotcardlist' class="item" :data-index='index' :class="{'current': currentIndex===index}">{{item}}</li>
	 		
	 	</ul>
	 </div>
	 <div class='loading-container' v-if='!data.length'>
	 	
	 	<loading></loading>
	 	
	 </div>	
	</scroll>
</template>

<script>
import scroll from 'base/scroll/scroll'
import {getData} from 'common/js/dom'
import loading from 'base/loading/loading'
const num=18
	export default {
		created(){
			this.touch={},
			this.listHeight=[]
			
		},
		data(){
			
			return {
				listenScroll:true,
				scrollY:-1,
				currentIndex:0,
				probeType:3
			}
		},
		components:{
			scroll,
			loading
			
		},	
		
		props:{
			data:{
			     type:Array,
			     default:[]  
			}
		},
		computed:{
			_shotcardlist(){
			 return this.data.map((item)=>{
					return item.title.substr(0,1)
					
				})
				
				
			}
		  },
			methods:{
				selected(item){
					this.$emit('select',item)
					
				},
				onStart(e){
					
				   let acu=getData(e.target, 'index')
				   let firstTouch=e.touches[0]
				   this.touch.y1=firstTouch.pageY
	               this.touch.acu=acu
	               this._scrollTo(this.$refs.listgroup[acu],acu)
	               
	            },   
	           onMove(e){
					let firstTouch=e.touches[0]
					this.touch.y2=firstTouch.pageY
					let delta=(this.touch.y2-this.touch.y1) / 18 | 0
					let touchindex=parseInt(this.touch.acu)+delta
					this._scrollTo(this.$refs.listgroup[touchindex],touchindex)
				},
				
				scroll(pos){
					
					this.scrollY=pos.y
					
				},
				_scrollTo(index,num){
					if(index==null){
						return
						
					}
					 this.scrollY=-this.listHeight[num]
					 this.$refs.listview.scrollToElement(index,0)
				},
				_Height(){
					this.listHeight=[]
					const list=this.$refs.listgroup
				    let height=0
				    this.listHeight.push(height)
				    for(let i=0; i<list.length; i++){
				    	let item=list[i]
				    	height+=item.clientHeight
				    	this.listHeight.push(height)
				    }
				 
				},
				re(){
					
					this.$refs.listview.refresh()
					
				}
		   },
		    watch:{
			     data(){
			     	setTimeout(()=>{
			     		
			     		this._Height()
			     		
			     	},20)
			     	
			     },
			     scrollY(Y){
			     	
			        const listHeight=this.listHeight
			        
			        if(Y>0){
			        	
			           this.currentIndex=0;	
			        	return
			        }
			         
			     for(let i=0; i<listHeight.length-1; i++){
			     	let top=listHeight[i]
			     	let bottom=listHeight[i+1]
			    
			     	if(!bottom || (-Y) >= top && (-Y) < bottom){
			     		this.currentIndex=i
			     		return
			     	}	
			     		
			     }	 
			     		
			     	
			        this.currentIndex=listHeight.length-2
			     }//scrollY
			
		        }
		}	
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

   .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: #f3f3f3
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: fixed
      z-index: 30
      right: 0
      top: 56%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: #f3f3f3
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>	        
                  
				
				
					
		
		
	

