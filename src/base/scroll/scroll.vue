<template>
	<div ref="wrapper" class="wrapper">
		<slot></slot>
		
    </div>		
</template>

<script>
	import scroll from 'better-scroll'
   export default{
   	props:{
   		probeType:{
   			type:Number,
   			default:1
   		},
   		click:{
   			type:Boolean,
   			default:true
   		},
   		data:{
   			type:Array,
   			default:null
   		},
   		listenScroll:{
   			type:Boolean,
   			default:false
   		}
   	},
   	mounted(){
   		setTimeout(()=>{
   		
   		   this._initscroll()
   		
   		},20)
   		
   	},
   	methods:{
   		_initscroll(){
   		  if(!this.$refs.wrapper){
   		  	return
   		  }	
   		  this.scorll=new scroll(this.$refs.wrapper,{
   		  	probeType:this.probeType,
   		  	click:this.click
   		  })
   		  //console.log(this.data)
   		 
          if(this.listenScroll){
          	 let that=this
          	
          	 this.scorll.on('scroll',(pos)=>{
          	 	
          	 	that.$emit('scroll',pos)
          	 
          	 })
          }	
          
   		 },
   		enable(){
   			
   			this.scorll && this.scorll.enable()
   			
   		},
   		disable(){
   			this.scorll && this.scorll.disable()
   			
   		},
   		refresh(){
   			
   			this.scorll && this.scorll.refresh()
   		   
   		},
        scrollTo() {
         	
        this.scorll && this.scorll.scrollTo.apply(this.scorll, arguments)
        
       },
       scrollToElement() {
       	
        this.scorll && this.scorll.scrollToElement.apply(this.scorll, arguments)
        
       }
   		
   	},
   	watch:{
   			data(){
   				
   			 setTimeout(()=>{
   		
   		       this.refresh()
   		        
   		     },50)
   				
   			}
   		}
   	}	
   			
</script>

<style>
	.wrapper{
		  height:95%;
	}
</style>   			
  		
	
	
	
