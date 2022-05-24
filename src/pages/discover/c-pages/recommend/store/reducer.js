import * as actionTypes from './constants'
import produce from 'immer'
const defaultState = {
  topBanners: [],
  hotRecommends: [],
  newAlbums: [],
  upRanking: [],
  newRanking: [],
  originRanking: [],
}

const reducer = produce((state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_TOP_BANNERS:
      state.topBanners = action.topBanners
      break
    case actionTypes.CHANGE_HOT_RECOMMEND:
      state.hotRecommends = action.hotRecommends
      break
    case actionTypes.CHANGE_NEW_ALBUM:
      state.newAlbums = action.newAlbums
      break
    case actionTypes.CHANGE_UP_RANKING:
      state.upRanking = action.upRanking
      break
    case actionTypes.CHANGE_NEW_RANKING:
      state.newRanking = action.newRanking
      break
    case actionTypes.CHANGE_ORIGIN_RANKING:
      state.originRanking = action.originRanking
      break
    default:
      return state
  }
})

// function reducer(state = defaultState, action) {
//   switch (action.type) {
//     case actionTypes.CHANGE_TOP_BANNERS:
//       return { ...state, topBanners: action.topBanners }
//     default:
//       return state
//   }
// }

export default reducer
