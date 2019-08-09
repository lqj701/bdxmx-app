import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { RecommendSwiper } from '../../components/recommendSwiper'
import PaperList from '../../components/paperList'
import { getOpenId, getStudentByOpenid } from '../../service/apis'
import store from '../../service/store'
import './index.scss'

/** 发现页 */
export default class Find extends Taro.Component {
  config = {
    navigationBarTitleText: '博达鑫梦想教育',
  }

  state = {
    loading: true,
  }

  async componentDidMount() {
    Taro.showLoading({
      title: '加载中',
      mask: true,
    })
    const getOpenIdResult = await getOpenId()

    if (getOpenIdResult.code === 0) {
      const getStudentResult = await getStudentByOpenid(
        getOpenIdResult.data.openid
      )
      getStudentResult.code === 0 && store.set('student', getStudentResult.data)
      Taro.hideLoading({
        success: () =>
          this.setState({
            loading: false,
          }),
      })
    }
  }

  render() {
    const { loading } = this.state
    return (
      <View>
        {!loading && <RecommendSwiper />}
        {!loading && <PaperList />}
      </View>
    )
  }
}
