import React, { memo, useEffect, useRef } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'

import { getNewAlbumAction } from '../../store/actionCreators'

import { Carousel } from 'antd'
import LCThemeHeaderRCM from '@/components/theme-header-rcm'
import LCAlbumCover from '@/components/album-cover'
import { AlbumWrapper } from './style'

const LCNewAlbum = memo(() => {
  // redux
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getNewAlbumAction(10))
  }, [dispatch])

  const { newAlbums } = useSelector(
    (state) => ({
      newAlbums: state.recommend.newAlbums,
    }),
    shallowEqual
  )
  // 其他hooks
  const pageRef = useRef()
  return (
    <AlbumWrapper>
      <LCThemeHeaderRCM title="新碟上架" />
      <div className="content">
        <button
          className="arrow arrow-left sprite_02"
          onClick={(e) => pageRef.current.prev()}
        ></button>
        <div className="album">
          <Carousel ref={pageRef} dots={false}>
            {/* 2个 但是newAlbum有10个 */}
            {[0, 1].map((item) => {
              return (
                <div key={item} className="page">
                  {newAlbums.slice(item * 5, (item + 1) * 5).map((album) => {
                    return (
                      <LCAlbumCover
                        key={album.id}
                        info={album}
                        size={100}
                        width={118}
                        bgp="-570px"
                      />
                    )
                  })}
                </div>
              )
            })}
          </Carousel>
        </div>
        <button
          className="arrow arrow-right sprite_02"
          onClick={(e) => pageRef.current.next()}
        ></button>
      </div>
    </AlbumWrapper>
  )
})

export default LCNewAlbum
