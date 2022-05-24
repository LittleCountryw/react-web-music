import produce from 'immer'
import * as actionTypes from './constants'

const defaultState = {
  currentSong: {},
  playList: [],
  currentIndex: 0,
  lyricList: [],
  sequence: 0, // 0 顺序播放 1 随机播放 2 单曲循环
  currentLyricIndex: 0,
}
const reducer = produce((state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_CURRENT_SONG:
      state.currentSong = action.currentSong
      break
    case actionTypes.CHANGE_CURRENT_SONG_INDEX:
      state.currentIndex = action.index
      break
    case actionTypes.CHANGE_PLAY_LIST:
      state.playList = action.playList
      break
    case actionTypes.CHANGE_SEQUENCE:
      state.sequence = action.sequence
      break
    case actionTypes.CHANGE_LYRIC_LIST:
      state.lyricList = action.lyricList
      break
    case actionTypes.CHANGE_CURRENT_LYRIC_INDEX:
      state.currentLyricIndex = action.index
      break
    default:
      return state
  }
})
export default reducer
