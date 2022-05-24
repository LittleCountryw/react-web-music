import { useRoutes, Navigate } from 'react-router-dom'
import React from 'react'

// import LCMine from '../pages/mine'
// import LCFriend from '../pages/friend'

// import LCRanking from '../pages/discover/c-pages/ranking'
// import LCSongs from '../pages/discover/c-pages/songs'
// import LCDjradio from '../pages/discover/c-pages/djradio'
// import LCArtist from '../pages/discover/c-pages/artist'
// import LCAlbum from '../pages/discover/c-pages/album'
// import LCPlayer from '../pages/player'

// 对于首屏 可以不懒加载
import LCRecommend from '../pages/discover/c-pages/recommend'
import LCDiscover from '../pages/discover'
// const LCDiscover = React.lazy(() => import('../pages/discover'))
const LCMine = React.lazy(() => import('../pages/mine'))
const LCFriend = React.lazy(() => import('../pages/friend'))
// const LCRecommend = React.lazy(() =>
//   import('../pages/discover/c-pages/recommend')
// )
const LCRanking = React.lazy(() => import('../pages/discover/c-pages/ranking'))
const LCSongs = React.lazy(() => import('../pages/discover/c-pages/songs'))
const LCDjradio = React.lazy(() => import('../pages/discover/c-pages/djradio'))
const LCArtist = React.lazy(() => import('../pages/discover/c-pages/artist'))
const LCAlbum = React.lazy(() => import('../pages/discover/c-pages/album'))
const LCPlayer = React.lazy(() => import('../pages/player'))

const GetRoutes = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Navigate to={'/discover'} />,
    },
    {
      path: '/discover',
      element: <LCDiscover />,
      children: [
        {
          path: '',
          element: <Navigate to={'recommend'} />,
        },
        {
          path: 'recommend',
          element: <LCRecommend />,
        },
        {
          path: 'ranking',
          element: <LCRanking />,
        },
        {
          path: 'songs',
          element: <LCSongs />,
        },
        {
          path: 'djradio',
          element: <LCDjradio />,
        },
        {
          path: 'artist',
          element: <LCArtist />,
        },
        {
          path: 'album',
          element: <LCAlbum />,
        },
      ],
    },
    {
      path: '/mine',
      element: <LCMine />,
      children: [{}],
    },
    {
      path: '/friend',
      element: <LCFriend />,
      children: [{}],
    },
    {
      path: '/play/:id',
      element: <LCPlayer />,
    },
  ])
  return routes
}

export default GetRoutes
