import Taro from '@tarojs/taro'
import { View, OpenData } from '@tarojs/components'
import { AtList, AtListItem, AtAvatar } from 'taro-ui'
import './index.scss'

export default class User extends Taro.Component {
  config = {
    navigationBarBackgroundColor: '#0cb956',
    navigationBarTextStyle: 'white',
    navigationBarTitleText: '个人中心',
  }

  setUserInfo = () => {}

  goHistory = () => {
    Taro.navigateTo({ url: '/pages/me/history/index' })
  }

  goHelp = () => {
    Taro.navigateTo({ url: '/pages/me/help/index' })
  }

  render() {
    return (
      <View className="me">
        <View className="at-row header">
          <OpenData className="avatar" type="userAvatarUrl" />
          <View className="info">
            <OpenData className="name" type="userNickName" />
            <OpenData className="gender" type="userGender" lang="zh_CN" />
          </View>
        </View>
        <View className="at-row at-row__justify--center profile">
          <View className="at-row at-row__justify--center profile-content">
            学习使我快乐～
          </View>
        </View>
        <View className="at-row at-row__justify--center setting">
          <AtList className="setting-list" hasBorder={false}>
            <AtListItem
              title="查看历史试卷"
              hasBorder={false}
              arrow="right"
              onClick={this.goHistory}
            />
            <AtListItem
              title="设置个人信息"
              hasBorder={false}
              onClick={this.setUserInfo}
            />
            <AtListItem
              title="使用帮助"
              hasBorder={false}
              extraText="学习秘诀"
              onClick={this.goHelp}
            />
          </AtList>
        </View>
      </View>
    )
  }
}
