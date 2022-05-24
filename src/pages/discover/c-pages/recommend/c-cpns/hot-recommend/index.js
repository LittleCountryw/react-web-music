import React, { memo, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { HotRecommendWrapper } from './style'

import { getHotRecommendAction } from '../../store/actionCreators'

import LCThemeHeaderRCM from '@/components/theme-header-rcm'
import LCSongsCover from '@/components/songs-cover'
const LCHotRecommend = memo(() => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getHotRecommendAction(8))
  }, [dispatch])

  const { hotRecommends } = useSelector((state) => {
    return {
      hotRecommends: state.recommend.hotRecommends,
    }
  }, shallowEqual)
  return (
    <HotRecommendWrapper>
      <LCThemeHeaderRCM
        title="热门推荐"
        keywords={['华语', '流行', '民谣', '摇滚', '电子']}
      />
      <div className="recommend-list">
        {hotRecommends.map((item, index) => {
          return <LCSongsCover key={item.id} info={item} />
        })}
      </div>
    </HotRecommendWrapper>
  )
})

export default LCHotRecommend
