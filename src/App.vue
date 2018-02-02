<template>
  <div id="app">
    <start></start>
    <mheader></mheader>
      <tab></tab>
    <keep-alive>
      <router-view></router-view>
     </keep-alive>
    <player></player>
  </div>
</template>

<script>
	import mheader from 'components/header/header'
	import tab from 'components/tab/tab'
  import player from 'components/player/player'
  import start from 'components/start/start'
export default {
     components:{
     	mheader,
     	tab,
     	player,
     	start
    
     }
}
</script>

<style >
 

</style>
