<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>
    <div class="dots">
        <span class="dot" v-for='(item,index) in dots' :class='{active:current===index}'></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
	import scroll from 'better-scroll'
	import {addClass} from 'common/js/dom'
  export default{
  	data(){
  		 return {
  		 	
  		 	   dots:[],
  		 	   current:0
  		 }
  		
  	},
  	props:{
  		loop:{
  			type:Boolean,
  			default:true
  		},
  		autoplay:{
  			type:Boolean,
  			default:true
  		},
  		interval:{
  			type:Number,
  			default:4000
  		}
  	},
  	mounted(){
  		setTimeout(()=>{
  			this._setSliderWidth()
	  		this._initSlider()
	  		if(this.autoplay){
	  			this.paly()
	  		}
  		  
  		},20)
  		window.addEventListener('resize',()=>{
  		  if(!this.slider){
  		  	return
  		  }
  		  this._setSliderWidth(true)
  		  this.slider.refresh()
  		 
  		})
  	},
  	methods:{
  		_setSliderWidth(isRisize){
  			let children=this.$refs.sliderGroup.children
  			let width=0;
  			let sliderwidth=this.$refs.slider.clientWidth
  			for(let i=0; i<children.length; i++){
  				let child=children[i]
  				addClass(child,'slider-item')
  				child.style.width=sliderwidth+'px'
  				width+=sliderwidth
  			}
  			 this.dots=children.length
  			 if(isRisize){
  				this.dots=children.length-2
  				}
  			if(this.loop&&!isRisize){
  				
  				width+=2*sliderwidth
  				
  			}
  			this.$refs.sliderGroup.style.width=width+'px'
  		},
  		_initSlider(){
  			this.slider=new scroll(this.$refs.slider,{
  				scrollX:true,
  				scrollY:false,
  				momentum:false,
  				snap:true,
  				snapLoop:this.loop,
  				snapThreshold:0.3,
  				snapSpeed:400,
  				clikc:true
  			})
  			this.slider.on('scrollEnd',()=>{
  				let pageindex=this.slider.getCurrentPage().pageX
  				if(this.loop){
  					pageindex-=1
  				}	
  				this.current=pageindex
  				if(this.autoplay){
  					clearTimeout(this.timer)
  					this.paly()
  				}
  			})
  		},
  		paly(){
  	    let pageindex=this.current+1
  			if(this.loop){
  				pageindex+=1
  			}	
  			this.timer=setTimeout(()=>{
  				this.slider.goToPage(pageindex,0,400)
  				
  			},this.interval)
  			
  		}
  	},
  	destroyed(){
  		
  		clearTimeout(this.timer)
  	}
 } 	
  	
 </script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>   			
  						
		
  	
  	
  	
  	
  	
  