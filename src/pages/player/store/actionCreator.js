import * as actionTypes from './constants'
import { getSongDetail, getLyric } from '@/service/player'
import { getRandomNumber } from '@/utils/math-utils'
import { parseLyric } from '@/utils/parse-lyric'

const changeCurrentSongAction = (currentSong) => ({
  type: actionTypes.CHANGE_CURRENT_SONG,
  currentSong,
})

const changeCurrentSongIndexAction = (index) => ({
  type: actionTypes.CHANGE_CURRENT_SONG_INDEX,
  index,
})

const changePlayListAction = (playList) => ({
  type: actionTypes.CHANGE_PLAY_LIST,
  playList,
})

const changeLyricListAction = (lyricList) => ({
  type: actionTypes.CHANGE_LYRIC_LIST,
  lyricList,
})

// 切换播放顺序
export const changeSequenceAction = (sequence) => ({
  type: actionTypes.CHANGE_SEQUENCE,
  sequence,
})

export const changeCurrentLyricIndexAction = (index) => ({
  type: actionTypes.CHANGE_CURRENT_LYRIC_INDEX,
  index,
})

// 点击播放的处理逻辑
export const getSongDetailAction = (ids) => {
  return (dispatch, getState) => {
    // 点击歌曲之后的逻辑
    // 1.根据id查找playList中是否已经存在该歌曲
    const { playList } = getState().player
    const songIndex = playList.findIndex((song) => song.id === ids)
    // 2.存在该歌曲 则 1.改变currentIndex 2.改变currentSong 3.请求歌词信息
    let song = null
    if (songIndex !== -1) {
      dispatch(changeCurrentSongIndexAction(songIndex))
      song = playList[songIndex]
      dispatch(changeCurrentSongAction(song))
      // 歌词信息
      dispatch(getLyricAction(song.id))
    } else {
      // 3.不存在该歌曲 则1.请求歌曲数据 2.将歌曲添加到播放列表中 3.改变currentIndex和currentSong 4.请求歌词信息
      getSongDetail(ids).then((res) => {
        song = res.songs && res.songs[0]
        if (!song) return

        const newPlayList = [...playList]
        newPlayList.push(song)
        dispatch(changePlayListAction(newPlayList))
        dispatch(changeCurrentSongIndexAction(newPlayList.length - 1))
        dispatch(changeCurrentSongAction(song))

        // 请求歌词
        dispatch(getLyricAction(song.id))
      })
    }
  }
}

// 点击上下的处理逻辑
export const changeCurrentIndexAndSongAction = (tag) => {
  // 能够执行上一首或下一首证明播放列表中已经存在歌曲,只需要切换index和currentSong以及每次请求歌词即可
  // tag为-1 前一首 tag为1 后一首
  // 切换时要判断sequence 顺序播放和单曲循环都直接播放下一首 随机播放不同
  // 该函数中没有执行异步操作,但是为了在其中dispatch其他action 还是一个函数
  return (dispatch, getState) => {
    const sequence = getState().player.sequence
    let currentSongIndex = getState().player.currentIndex
    const playList = getState().player.playList

    switch (sequence) {
      case 1:
        let randomIndex = getRandomNumber(playList.length)
        while (randomIndex === currentSongIndex) {
          randomIndex = getRandomNumber(playList.length)
        }
        currentSongIndex = randomIndex
        break
      default:
        currentSongIndex += tag
        if (currentSongIndex >= playList.length) currentSongIndex = 0
        if (currentSongIndex < 0) currentSongIndex = playList.length - 1
    }

    const currentSong = playList[currentSongIndex]
    dispatch(changeCurrentSongAction(currentSong))
    dispatch(changeCurrentSongIndexAction(currentSongIndex))

    // 请求歌词 由于不走get所以也要重新获取歌词
    dispatch(getLyricAction(currentSong.id))
  }
}

export const getLyricAction = (id) => {
  return (dispatch) => {
    getLyric(id).then((res) => {
      const lyric = res.lrc.lyric
      const lyricList = parseLyric(lyric)
      dispatch(changeLyricListAction(lyricList))
    })
  }
}
