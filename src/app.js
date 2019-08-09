import Taro, { Component } from '@tarojs/taro'
import '@tarojs/async-await'
import Index from './pages/index'
import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
  config = {
    pages: [
      'pages/find/index',
      'pages/paper/index',
      'pages/exam/index',
      'pages/me/index',
      'pages/me/pickTeacher/index',
      'pages/me/history/index',
      'pages/me/historyDetail/index',
      'pages/me/help/index',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
      backgroundColor: '#f0f2f5',
    },
    tabBar: {
      list: [
        {
          pagePath: 'pages/find/index',
          text: '发现',
          iconPath: './assets/icon/rencai.png',
          selectedIconPath: './assets/icon/rencai.png',
        },
        {
          pagePath: 'pages/paper/index',
          text: '试题集',
          iconPath: './assets/icon/shoucang.png',
          selectedIconPath: './assets/icon/shoucang.png',
        },
        {
          pagePath: 'pages/me/index',
          text: '我的',
          iconPath: './assets/icon/huiyuanzhongxin.png',
          selectedIconPath: './assets/icon/huiyuanzhongxin.png',
        },
      ],
    },
  }

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return <Index />
  }
}

Taro.render(<App />, document.getElementById('app'))
