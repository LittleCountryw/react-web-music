import React, { memo } from 'react'
import PropTypes from 'prop-types'

import { HeaderWrapper } from './style'

const LCThemeHeaderRCM = memo((props) => {
  const { title, keywords } = props
  return (
    <HeaderWrapper className="sprite_02">
      <div className="left">
        <div className="title">{title}</div>
        <div className="keyword">
          {keywords.map((item, index) => {
            return (
              <div className="item" key={item}>
                <a href="todo">{item}</a>
                <span className="divider">|</span>
              </div>
            )
          })}
        </div>
      </div>
      <div className="right">
        <a href="todo">更多</a>
        <i className="icon sprite_02"></i>
      </div>
    </HeaderWrapper>
  )
})

// 有可能别人不传keywords这时直接调用map方法会报错
// 可以使用propTypes库给默认值和类型检测
LCThemeHeaderRCM.propTypes = {
  title: PropTypes.string.isRequired,
  keywords: PropTypes.array,
}
LCThemeHeaderRCM.defaultProps = {
  keywords: [],
}

export default LCThemeHeaderRCM
