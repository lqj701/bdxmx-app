import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem, AtAvatar } from 'taro-ui'
import './index.scss'

export default class Help extends Taro.Component {
  config = {
    navigationBarBackgroundColor: '#0cb956',
    navigationBarTextStyle: 'white',
    navigationBarTitleText: '使用帮助',
  }

  render() {
    return (
      <View className="help">
        <View className="title">一，首先你必须承认没有捷径</View>
        <View className="content">
          是的没有捷径。学习也好，工作也好，都是。你要做好持久战的心里准备。
        </View>
        <View className="title">二、永远保持一颗好奇的心</View>
        <View className="content">
          优秀的人会有一颗好奇的心，他会尝试涉猎不同专业不同领域的知识。我在读高中和大学的时候，对任何能打开我视野、见解的知识点，都会非常感兴趣。
        </View>
        <View className="title">三、好奇心带来的另一个好处</View>
        <View className="content">
          一颗永远好奇的心，还有另外一个好处——它更快地帮你消除迷茫。
        </View>
        <View className="title">四、寻找自己的弱点，做出改变</View>
        <View className="title">努力突破自己吧！</View>
      </View>
    )
  }
}
