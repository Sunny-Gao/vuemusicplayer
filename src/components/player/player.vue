<template>
	<div class="player" v-show='playlist.length>0'>
		<transition name='normal'>
		<div class="normal-player" v-show='fullScreen'>
			<div class="background">
				<img width='100%' height='100%' v-if='currentSong!=null' :src='currentSong.image' />
			
			</div>
			<div class="top">
				<div class="back" @click='back'>
					<i class="icon-back"></i>
				</div>
				<h1 class="title" v-text='currentSong.name' v-if='currentSong!=null'></h1>
				<h2 class="subtitle" v-text='currentSong.singer' v-if='currentSong!=null'></h2>
			</div>
			<div class="middle">
				 <div class="middle-l">
				 	<div class="cd-wrapper">
				 		<div class="cd" :class='rotate'>
				 			
				 		 <img class="image"  v-if='currentSong!=null'  :src='currentSong.image' />
				 	
				 	   </div>
				    </div>
				 </div>
				 	
			</div>
		  
			<div class="bottom">
				 
				<div class="operators">
					
					<div class="icon i-left"  @click='prev' :class='disablecls'>
						<i class="icon-prev"></i>
					</div>
					<div class="icon i-center" :class='disablecls'>
						<i :class="palyIcon" v-if='currentSong!=null' @click='toggleplaying'></i>
					</div>
					<div class="icon i-right" @click='next' :class='disablecls'>
						<i class="icon-next"></i>
					</div>
					
				</div>
			</div>	
		</div>
		</transition>
		<transition name='mini'>
		<div class="mini-player" v-show='!fullScreen' @click='open'>
			<div class="icon">
				<img :class="rotate" width='40' height='40' v-if='currentSong!=null' :src='currentSong.image'>
			</div>
			<div class="text">
				<h2 class="name" v-if='currentSong!=null' v-text='currentSong.name'></h2>
				<p class="desc" v-if='currentSong!=null' v-text='currentSong.singer'></p>
			</div>
			<span class="time time-l" v-if='currentSong!=null' style="display: block; color:#ffffff">{{formal(currentTime)}}/{{formal(currentSong.duration)}}</span>
			<div class="control">
				<i @click.stop='toggleplaying' :class="minipalyIcon" style="color:#ffffff"></i>
			</div>
			
		</div>
		</transition>
		<audio v-if='currentSong!=null' :src='currentSong.url' ref='audio' @canplay='ready' @error='error' @timeupdate='timeupdate' @ended='end'></audio>
	</div>
</template>			
				
<script type='text/ecmascript-6'>
	import {mapGetters,mapMutations} from 'vuex'
	export default{
		data(){
			return{
				songReady:false,
				currentTime:0
				
			}
			
		},
	
		computed:{
			palyIcon(){
				
				return this.playing?'icon-pause':'icon-play'
			},
			minipalyIcon(){
				
				return this.playing?'icon-pause-mini':'icon-play-mini'
			},
			rotate(){
				
				return this.playing?'play':'pause'
			},
			 disablecls(){
			 	
			 	return this.songReady?'':'disable'
			 	
			 },
			...mapGetters([
				'fullScreen',
				'playlist',
				'currentSong',
				'playing',
				'currentIndex'
			])	
		},
		
		methods:{
			back(){
				
		       this.setFullScreen(false)
			
			},
			open(){
				
				this.setFullScreen(true)
			},
			toggleplaying(){
				if(!this.songReady){
					
					return
					
				}
				
				this.setPlayingState(!this.playing)
				
			},
			prev(){
				if(!this.songReady){
					
					return
					
				}
				let num=this.currentIndex+1
				if(num==this.playlist.length){
					num=0
					
				}
				this.setCurrentIndex(num)
				if(!this.playing){
					
				  this.toggleplaying()
					
				}
				this.songReady=false
			 },
			 end(){
			 	
			 	this.next()
			 	
			 },
			next(){
				if(!this.songReady){
					
					return
					
				}
				let num=this.currentIndex-1
				if(num==-1){
					num=this.playlist.length-1
				}	
				this.setCurrentIndex(num)
				if(!this.playing){
					this.toggleplaying()
					
				}
				this.songReady=false
				
			},
			ready(){
				
				this.songReady=true
			},
			error(){
				
				this.songReady=true
				alert('亲！没有加载到资源....')
				
				
			
			},
			timeupdate(e){
				
				this.currentTime=e.target.currentTime
				
			   
			},
			
			formal(time){
				time=time|0
				const min=time/60|0
				
				const sec=this._pad(time%60)
				return `${min}:${sec}`
			},
			_pad(num,n=2){
				let len=num.toString().length;
				while (len<n){
					num='0'+num
					len++
				}
				return num
			},
			...mapMutations({
				setFullScreen:'SET_FULL_SCREEN',
				setPlayingState:'SET_PLAYING_STATE',
				setCurrentIndex:'SET_CURRENT_INDEX'
				
			})
			
		},
		watch:{
			currentSong(){
				this.$nextTick(()=>{
					
				  this.$refs.audio.play()
				
				})
				
			},
			playing(Bool){
				this.$nextTick(()=>{
			    	const audio=this.$refs.audio	
			    	Bool ? audio.play() : audio.pause()
			    	
			     })
			 }
			}
		}	
			
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .player
    .normal-player
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 150
      background: $color-background
      .background
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
      .top
        position: relative
        margin-bottom: 25px
        .back
          position absolute
          top: 0
          left: 6px
          z-index: 50
          .icon-back
            display: block
            padding: 9px
            font-size: $font-size-large-x
            color: $color-theme
            transform: rotate(-90deg)
        .title
          width: 70%
          margin: 0 auto
          line-height: 40px
          text-align: center
          no-wrap()
          font-size: $font-size-large
          color: #ffffff
        .subtitle
          line-height: 20px
          text-align: center
          font-size: $font-size-medium
          color:#ffffff
      .middle
        position: fixed
        width: 100%
        top: 80px
        bottom: 170px
        white-space: nowrap
        font-size: 0
        .middle-l
          display: inline-block
          vertical-align: top
          position: relative
          width: 100%
          height: 0
          padding-top: 80%
          .cd-wrapper
            position: absolute
            left: 10%
            top: 0
            width: 80%
            height: 100%
            .cd
              width: 100%
              height: 100%
              box-sizing: border-box
              border: 10px solid rgba(255, 255, 255, 0.1)
              border-radius: 50%
              &.play
                animation: rotate 20s linear infinite
              &.pause
                animation-play-state: paused
               .image
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                border-radius: 50%

          .playing-lyric-wrapper
            width: 80%
            margin: 30px auto 0 auto
            overflow: hidden
            text-align: center
            .playing-lyric
              height: 20px
              line-height: 20px
              font-size: $font-size-medium
              color: $color-text-l
        .middle-r
          display: inline-block
          vertical-align: top
          width: 100%
          height: 100%
          overflow: hidden
          .lyric-wrapper
            width: 80%
            margin: 0 auto
            overflow: hidden
            text-align: center
            .text
              line-height: 32px
              color: $color-text-l
              font-size: $font-size-medium
              &.current
                color: $color-text
      .bottom
        position: absolute
        bottom: 50px
        width: 100%
        .dot-wrapper
          text-align: center
          font-size: 0
          .dot
            display: inline-block
            vertical-align: middle
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            &.active
              width: 20px
              border-radius: 5px
              background: $color-text-ll
        .progress-wrapper
          display: flex
          align-items: center
          width: 80%
          margin: 0px auto
          padding: 10px 0
          .time
            
            font-size: $font-size-large
            flex: 0 0 30px
            line-height: 30px
            width: 30px
            
            &.time-l
              text-align: left
              
            &.time-r
              text-align: right
          .progress-bar-wrapper
            flex: 1
        .operators
          display: flex
          align-items: center
          .icon
            flex: 1
            color: $color-theme
            &.disable
              color: $color-theme-d
            i
              font-size: 30px
          .i-left
            text-align: right
          .i-center
            padding: 0 20px
            text-align: center
            i
              font-size: 40px
          .i-right
            text-align: left
          .icon-favorite
            color: $color-sub-theme
      &.normal-enter-active, &.normal-leave-active
        transition: all 0.4s
        .top, .bottom
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.normal-enter, &.normal-leave-to
        opacity: 0
        .top
          transform: translate3d(0, -100px, 0)
        .bottom
          transform: translate3d(0, 100px, 0)
    .mini-player
      display: flex
      align-items: center
      position: fixed
      left: 0
      bottom: 0
      z-index: 180
      width: 100%
      height: 60px
      background: $color-theme
      &.mini-enter-active, &.mini-leave-active
        transition: all 0.4s
      &.mini-enter, &.mini-leave-to
        opacity: 0
      .icon
        flex: 0 0 40px
        width: 40px
        padding: 0 10px 0 20px
        img
          border-radius: 50%
          &.play
            animation: rotate 10s linear infinite
          &.pause
            animation-play-state: paused
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          margin-bottom: 2px
          no-wrap()
          font-size: $font-size-medium
          color: #ffffff
        .desc
          no-wrap()
          font-size: $font-size-small
          color: #ffffff
      .control
        flex: 0 0 30px
        width: 30px
        padding: 0 10px
        .icon-play-mini, .icon-pause-mini, .icon-playlist
          font-size: 30px
          color: $color-theme-d
        .icon-mini
          font-size: 32px
          position: absolute
          left: 0
          top: 0

  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>		
			
		
		
		
	