import { combineReducers } from 'redux'
import recommendReducer from '../pages/discover/c-pages/recommend/store'
import playerReducer from '../pages/player/store'
export const cReducer = combineReducers({
  recommend: recommendReducer,
  player: playerReducer,
})
export default cReducer
