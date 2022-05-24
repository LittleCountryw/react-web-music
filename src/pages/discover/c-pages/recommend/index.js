import React, { memo } from 'react'

import LCTopBanners from './c-cpns/top-banner'
import LCHotRecommend from './c-cpns/hot-recommend'
import LCNewAlbum from './c-cpns/new-album'
import LCRecommendRanking from './c-cpns/recommend-ranking'

import {
  RecommendWrapper,
  Content,
  RecommendLeft,
  RecommendRight,
} from './style'

export default memo(function LCRecommend(props) {
  return (
    <RecommendWrapper>
      <LCTopBanners />
      <Content className="wrap-v2">
        <RecommendLeft>
          <LCHotRecommend />
          <LCNewAlbum />
          <LCRecommendRanking />
        </RecommendLeft>
        <RecommendRight></RecommendRight>
      </Content>
    </RecommendWrapper>
  )
})

/* function LCRecommend(props) {
  const { getBanners, topBanners } = props
  useEffect(() => {
    getBanners()
  }, [getBanners])
  return (
    <div>
      <h2>{topBanners.length}</h2>
    </div>
  )
}

const mapStateToProps = (state) => ({
  topBanners: state.recommend.topBanners,
})

const mapActionToProps = (dispatch) => ({
  getBanners: () => {
    dispatch(getTopBannerAction())
  },
})

export default connect(mapStateToProps, mapActionToProps)(memo(LCRecommend))
 */
