import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import PaperList from '../../components/paperList'
import './index.scss'
import {RecommendSwiper} from "../../components/recommendSwiper";

export default class Paper extends Taro.Component {
  config = {
    navigationBarTitleText: '试题集',
  }

  state = {
    data: [],
  }

  render() {
    return (
      <View>
        <RecommendSwiper />
        <PaperList />
      </View>
    )
  }
}
