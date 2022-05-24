import React, { memo, useState, useEffect, useRef, useCallback } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import {
  getSongDetailAction,
  changeCurrentIndexAndSongAction,
  changeSequenceAction,
  changeCurrentLyricIndexAction,
} from '../store/actionCreator'
import { NavLink } from 'react-router-dom'
import { getSizeImage, formatDate, getPlaySong } from '@/utils/format-utils'

import { Slider, message } from 'antd'
import { PlaybarWrapper, Control, PlayInfo, Operator } from './style'

const LCAppPlayerBar = memo(() => {
  // props / state
  const [currentTime, setCurrentTime] = useState(0) //单位是毫秒
  const [isChanging, setIsChanging] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  // redux
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getSongDetailAction(1485033549))
  }, [dispatch])

  const { currentSong, sequence, lyricList, currentLyricIndex } = useSelector(
    (state) => ({
      currentSong: state.player.currentSong,
      sequence: state.player.sequence,
      lyricList: state.player.lyricList,
      currentLyricIndex: state.player.currentLyricIndex,
    }),
    shallowEqual
  )

  // other hook
  const audioRef = useRef()
  useEffect(() => {
    audioRef.current.src = getPlaySong(currentSong.id)
    audioRef.current
      .play()
      .then((res) => {
        // 点击一首歌时播放成功,此时将播放设置为true
        setIsPlaying(true)
      })
      .catch((err) => {
        // chrome浏览器不允许自动播放,所以直接刷新时播放失败
        // 抛出异常在此处捕获
        setIsPlaying(false)
      })
  }, [currentSong])

  // other handle
  // 防止报错
  const picUrl = (currentSong.al && currentSong.al.picUrl) || ''
  const singerName = (currentSong.ar && currentSong.ar[0].name) || '未知歌手'
  const duration = currentSong.dt || 0
  const showDuration = formatDate(duration, 'mm:ss')
  const showCurrentTime = formatDate(currentTime, 'mm:ss')

  // handle function

  // time handle
  const timeUpdate = (e) => {
    const currentTime = e.target.currentTime
    // console.log(currentTime)
    if (!isChanging) {
      setCurrentTime(currentTime * 1000)
      setProgress(((currentTime * 1000) / duration) * 100)
    }
    // 获取当前歌词
    let i = 0
    for (; i < lyricList.length; i++) {
      let lyricItem = lyricList[i]
      if (currentTime * 1000 < lyricItem.time) {
        break
      }
    }
    if (i - 1 !== currentLyricIndex) {
      dispatch(changeCurrentLyricIndexAction(i - 1))
      const content = lyricList[i - 1] && lyricList[i - 1].content
      if (content) {
        message.open({
          key: 'lyric',
          content: content,
          duration: 0,
          className: 'lyric-class',
        })
      }
    }
  }

  const playMusic = useCallback(() => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play()
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  // change handle
  const changeMusic = (tag) => {
    dispatch(changeCurrentIndexAndSongAction(tag))
  }

  const changeSequence = () => {
    let currentSequence = sequence + 1
    if (currentSequence > 2) {
      currentSequence = 0
    }
    dispatch(changeSequenceAction(currentSequence))
  }

  const handleMusicEnded = () => {
    // 判断sequence,如果是随机播放或顺序播放,同点击下一首
    // 如果是单曲循环 将歌曲的currentTime置为0 重新开始播放
    if (sequence === 2) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
    } else {
      dispatch(changeCurrentIndexAndSongAction(1))
    }
  }

  // progress handle
  const sliderChange = useCallback(
    (value) => {
      setIsChanging(true)
      const currentTime = (value / 100) * duration
      // console.log(currentTime, 'sliderChange')
      setCurrentTime(currentTime)
      setProgress(value)
    },
    [duration]
  )

  const sliderAfterChange = useCallback(
    (value) => {
      const currentTime = (value / 100) * duration
      audioRef.current.currentTime = currentTime / 1000
      setCurrentTime(currentTime)
      setIsChanging(false)

      if (!isPlaying) {
        playMusic()
      }
    },
    [duration, isPlaying, playMusic]
  )

  return (
    <PlaybarWrapper className="sprite_player">
      <div className="content wrap-v2">
        <Control isPlaying={isPlaying}>
          <button
            className="sprite_player prev"
            onClick={(e) => changeMusic(-1)}
          ></button>
          <button
            className="sprite_player play"
            onClick={(e) => playMusic()}
          ></button>
          <button
            className="sprite_player next"
            onClick={(e) => changeMusic(1)}
          ></button>
        </Control>
        <PlayInfo>
          <div className="image">
            <NavLink to={`/play/${currentSong.id}`}>
              <img src={getSizeImage(picUrl, 35)} alt="" />
            </NavLink>
          </div>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong.name}</span>
              <a href="/#" className="singer-name">
                {singerName}
              </a>
            </div>
            <div className="progress">
              <Slider
                onChange={sliderChange}
                onAfterChange={sliderAfterChange}
                value={progress}
              />
              <div className="time">
                <span className="now-time">{showCurrentTime}</span>
                <span className="divider">/</span>
                <span className="duration">{showDuration}</span>
              </div>
            </div>
          </div>
        </PlayInfo>
        <Operator sequence={sequence}>
          <div className="left">
            <button className="sprite_player btn favor"></button>
            <button className="sprite_player btn share"></button>
          </div>
          <div className="right sprite_player">
            <button className="sprite_player btn volume"></button>
            <button
              className="sprite_player btn loop"
              onClick={(e) => changeSequence()}
            ></button>
            <button className="sprite_player btn playlist"></button>
          </div>
        </Operator>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={(e) => timeUpdate(e)}
        onEnded={(e) => handleMusicEnded()}
      ></audio>
    </PlaybarWrapper>
  )
})

export default LCAppPlayerBar
