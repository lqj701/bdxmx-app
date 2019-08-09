import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
import store from '../../../service/store'
import { getAnswerSheets } from '../../../service/apis'
import { transformTime } from '../../../service/utils'
import './index.scss'

export default class History extends Taro.Component {
  config = {
    navigationBarBackgroundColor: '#0cb956',
    navigationBarTextStyle: 'white',
    navigationBarTitleText: '历史试卷',
  }

  state = {
    answerSheets: [],
  }

  componentDidMount() {
    this.getAnswerSheets()
  }

  getAnswerSheets = async () => {
    const student = store.get('student')
    const { code, data: answerSheets } = await getAnswerSheets(student.id)
    if (code === 0) {
      this.setState({ answerSheets })
    }
  }

  goDetail = value => {
    Taro.navigateTo({
      url: `/pages/me/historyDetail/index?id=${value}`,
    })
  }

  render() {
    const { answerSheets } = this.state

    return (
      <View className="history">
        <AtList>
          {answerSheets.map(item => (
            <AtListItem
              key={item.answerSheet.id}
              title={item.paperName}
              note={`${item.setPerson} ${transformTime(
                item.answerSheet.completedAt
              )}`}
              arrow="right"
              onClick={() => this.goDetail(item.answerSheet.id)}
            />
          ))}
        </AtList>
      </View>
    )
  }
}
