import React, { memo } from 'react'

import { PlayerWrapper, PlayerLeft, PlayerRight } from './style'

export default memo(function LCPlayer() {
  return (
    <PlayerWrapper>
      <div className="content wrap-v2">
        <PlayerLeft>
          <h2>LCPlayerInfo</h2>
          <h2>LCSongContent</h2>
        </PlayerLeft>
        <PlayerRight>
          <h2>LCSimiPlaylist</h2>
          <h2>LCSimiSong</h2>
          <h2>Download</h2>
        </PlayerRight>
      </div>
    </PlayerWrapper>
  )
})
