<template>
	<div class="song-list">
		<ul>
		   <li v-for='(item,index) in song' class='item' @click='selectItem(item,index)'>
			   	<div class="content">
			   		<h2 class="name">{{item.name}}</h2>
			   		<p class="desc">来自专辑—{{item.album}}</p>
			   	</div>
		   </li>
		</ul>
	</div>
</template>	
<script>
	export default{
		props:{
			song:{
			type:Array,
		    default:[]
		   }
		},
		created(){
			
			//console.log(this.song)
		},
		methods:{
			//desc(song){return `${song.singer}-${song.album}`}详细第二种实现方式
			selectItem(item,index){
				
				this.$emit('select',item,index)

			}
				
	  }
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
   @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
 .song-list
    margin-bottom:300px
    padding-top:20px
  .song-list
    .item
      display: flex
      align-items: center
      box-sizing: border-box
      height: 64px
      font-size: $font-size-medium
      .rank
        flex: 0 0 25px
        width: 25px
        margin-right: 30px
        text-align: center
        .icon
          display: inline-block
          width: 25px
          height: 24px
          background-size: 25px 24px
          &.icon0
            bg-image('first')
          &.icon1
            bg-image('second')
          &.icon2
            bg-image('third')
        .text
          color: $color-theme
          font-size: $font-size-large
      .content
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          no-wrap()
          color: $color-text
        .desc
          no-wrap()
          margin-top: 4px
          color: $color-text-d
</style>