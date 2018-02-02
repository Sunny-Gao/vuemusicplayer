<template>
<div class="start" v-if='show' :style="{backgroundImage:`url(${img})`}">
	<div class="word">
	  <p>岁月长，衣裳薄</p>
	  <p>——《再见二丁目》</p>
	  <loading  class='loading' :wdith='width' :height='height'></loading>
	</div>
	
</div>	
</template>

<script>
import loading from 'base/loading/loading'	
export default {
	data(){
		return{
			
			show:true,
			img: require('common/image/start.jpg'),
			width:100,
			height:100
		}
		
		
	},
	
	created(){
		setTimeout(()=>{
			this.show=false
			
		},10000)
	},
	components:{
		loading
		
		
	}
	
}	
</script>

<style scoped>
	.start{
		position:fixed;
		width: 100%;
		top:0;
		bottom:0;
		z-index: 2000;
		background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
	}
	
	.word{ margin: 50px auto 0 auto;
	       width:300px;
	       text-align: center;
	       animation:show 6s linear;
	       -webkit-opacity: 1;
	     }
	.word p{
		  font-size: 15px;
		  font-weight: bold;
		  line-height: 30px;
		  color:#31c27c;
		
	}
	.word p:nth-child(2){
		text-align: right;
		
	}
	@-webkit-keyframes show{
	     0%{
	        -webkit-opacity: 0;
	        
	       }
	     50%{
	     	
	     	-webkit-opacity: 0.5;
	     
	     }
	      100%{
	     	
	     	-webkit-opacity: 1;
	     }
	}
	.loading{
		margin-top: 30px;
		
		
	}
</style>