import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtDivider } from 'taro-ui'
import { getAnswerSheet } from '../../../service/apis'
import { transformTime } from '../../../service/utils'
import './index.scss'

export default class History extends Taro.Component {
  config = {
    navigationBarBackgroundColor: '#0cb956',
    navigationBarTextStyle: 'white',
    navigationBarTitleText: '历史试卷',
  }

  state = {
    answerSheet: {},
  }

  componentDidMount() {
    const routeParams = this.$router.params
    this.getAnswerSheet(routeParams.id)
  }

  getAnswerSheet = async id => {
    const { code, data: answerSheet } = await getAnswerSheet(id)
    if (code === 0) {
      this.setState({ answerSheet })
    }
  }

  render() {
    const { answerSheet } = this.state
    const answers = answerSheet.answerSheet
      ? JSON.parse(answerSheet.answerSheet.studentAnswer)
      : []

    return (
      <View className="history-detail">
        <View className="item">
          <View className="label">试卷名</View>
          {answerSheet.paperName}
        </View>
        <View className="item">
          <View className="label">出卷老师</View>
          {answerSheet.setPerson}
        </View>
        {answerSheet.answerSheet && (
          <View className="item">
            <View className="label">开始时间</View>
            {transformTime(answerSheet.answerSheet.createdAt)}
          </View>
        )}
        {answerSheet.answerSheet && (
          <View className="item">
            <View className="label">完成时间</View>
            {transformTime(answerSheet.answerSheet.completedAt)}
          </View>
        )}
        <AtDivider content="你的答卷" />
        <View className="answers">
          {answers.map((v, i) => (
            <View key={i} className="answer">
              <View
                className="item"
                style={{
                  borderBottom: '2rpx solid #eee',
                  paddingBottom: '10rpx',
                }}
              >
                第{`${i + 1}`}题
              </View>
              <View className="item">题目：{v.name}</View>
              <View className="item">你的答案：{v.answer}</View>
              <View className="item">
                正确答案：{answerSheet.standardAnswer[i]}
              </View>
              <View className="item">
                解答：{answerSheet.answerExplain[i]}
              </View>
            </View>
          ))}
        </View>
      </View>
    )
  }
}
