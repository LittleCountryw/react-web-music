import React, { memo, useEffect } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { getTopListAction } from '../../store/actionCreators'

import LCThemeHeaderRCM from '@/components/theme-header-rcm'
import LCTopRanking from '@/components/top-ranking'
import { RankingWrapper } from './style'
const LCRecommendRanking = memo(() => {
  const dispatch = useDispatch()
  // redux hooks
  useEffect(() => {
    dispatch(getTopListAction(0))
    dispatch(getTopListAction(2))
    dispatch(getTopListAction(3))
  }, [dispatch])

  const { upRanking, newRanking, originRanking } = useSelector(
    (state) => ({
      upRanking: state.recommend.upRanking,
      newRanking: state.recommend.newRanking,
      originRanking: state.recommend.originRanking,
    }),
    shallowEqual
  )
  return (
    <RankingWrapper>
      <LCThemeHeaderRCM title="榜单" />
      <div className="tops">
        <LCTopRanking info={upRanking} />
        <LCTopRanking info={newRanking} />
        <LCTopRanking info={originRanking} />
      </div>
    </RankingWrapper>
  )
})

export default LCRecommendRanking
