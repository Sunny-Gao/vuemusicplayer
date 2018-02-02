import Vue from 'vue'
import Router from 'vue-router'
import singerdetail from 'components/singer-detail/singer-detail'
import desc from 'components/desc/desc'

//异步加载组件
const recommend=(resolve)=>{
	import('components/recommend/recommend').then((module)=>{
		
		resolve(module)
		
	})
	
}

//异步加载组件
const singer=(resolve)=>{
	import('components/singer/singer').then((module)=>{
		
		resolve(module)
		
	})
	
}


Vue.use(Router)
export default new Router({
	routes:[
	    {path:'/',
	     redirect:'/recommend'
	    },
	    {path:'/recommend',
	     component:recommend,
	      children:[
	       {
	     	path:':id',
	     	component:desc
	     	}
	     ]
	    },
	    {path:'/singer',
	     component:singer,
	     children:[
	       {
	     	path:':id',
	     	component:singerdetail
	     	}
	     ]
	    }
	  ]
})   
	   	
	    
	
		
	
	


