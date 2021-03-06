export default class Song {
	constructor({id,mid,singer,name,album,duration,image,url}){
		this.id=id
		this.mid=mid
		this.singer=singer
		this.name=name
		this.album=album
		this.duration=duration
		this.image=image
		this.url=url
	}
}

export function createSong(musicData){
	return new Song({
		id:musicData.songid,
		mid:musicData.songmid,
		singer:filterSinger(musicData.singer),
		name:musicData.songname,
		album:musicData.albumname,
		duration:musicData.interval,
		image:`https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=259200`,
		url:`http://isure.stream.qqmusic.qq.com/C100${musicData.songmid}.m4a?fromtag=32`
		//`http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`//404
	})
}


function filterSinger(singer){
	let ret=[]
	if(!singer){
		
		return ''
	}
	
	singer.forEach((item)=>{
		ret.push(item.name)
		
	})
	
	return ret.join('/')
	
}
