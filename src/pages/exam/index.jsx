import Taro from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { AtButton, AtProgress } from 'taro-ui'
import Question from '../../components/question'
import store from '../../service/store'
import { getPaper, submitPaper } from '../../service/apis'
import './index.scss'

export default class Exam extends Taro.Component {
  config = {
    navigationBarTitleText: '试题大闯关',
    disableSwipeBack: true,
  }

  state = {
    start: false,
    finished: false,
    currentQuestion: {},
    paparInfo: {},
    questionList: [],
    startTime: '',
    endTime: '',
    answers: {},
  }

  tempAnswer = ''

  async componentDidMount() {
    const routeParams = this.$router.params
    const getPaperResult = await getPaper({
      examPaperId: Number(routeParams.id),
    })

    if (getPaperResult.code === 0) {
      getPaperResult.data.questionIdList.forEach(q => {
        q.questionAudio = JSON.parse(q.questionAudio).address
        q.questionChoice = JSON.parse(q.questionChoice)
      })
      this.setState({
        questionList: getPaperResult.data.questionIdList,
        paparInfo: getPaperResult.data.examPaper,
      })
    }
  }

  start() {
    this.setState(prevState => ({
      start: true,
      startTime: Date.now(),
      currentQuestionIndex: 0,
      currentQuestion: prevState.questionList[0],
      finished: this.state.questionList.length === 1,
    }))
  }

  goNextQuestion() {
    const { finished } = this.state

    this.setState(
      prev => ({
        answers: [...prev.answers, this.tempAnswer],
      }),
      () => {
        if (finished) {
          this.submit()
        } else {
          this.setState(
            prevState => ({
              currentQuestion:
                prevState.questionList[prevState.currentQuestionIndex + 1],
              currentQuestionIndex: prevState.currentQuestionIndex + 1,
            }),
            () => {
              if (
                this.state.currentQuestionIndex ===
                this.state.questionList.length - 1
              ) {
                this.setState({ finished: true })
              }
            }
          )
        }
      }
    )
  }

  onChangeAnswer = answer => {
    this.tempAnswer = answer
  }

  submit = async () => {
    const { paparInfo, startTime, answers } = this.state
    const student = store.get('student')
    const result = await submitPaper({
      paperId: paparInfo.id,
      studentId: student.id,
      teacherId: paparInfo.teacherId,
      studentAnswer: answers,
      startedAt: startTime,
      completedAt: Date.now(),
    })

    if (result.code === 0) {
      Taro.showToast({
        title: '恭喜，提交成功！',
        icon: 'success',
        duration: 2000,
        success: () => {
          setTimeout(() => Taro.navigateBack(), 2000)
        },
      })
    }
  }

  render() {
    const {
      paparInfo,
      start,
      currentQuestion,
      currentQuestionIndex,
      questionList,
      finished,
    } = this.state
    const percent = ((currentQuestionIndex + 1) / questionList.length) * 100

    return (
      <View className="exam">
        {start ? (
          <View>
            <AtProgress percent={percent} />
            <Question
              question={currentQuestion}
              onChangeAnswer={this.onChangeAnswer}
            />
            <Button
              style={{ width: '600rpx', margin: '20rpx auto' }}
              onClick={this.goNextQuestion}
              type={finished ? 'primary' : 'default'}
            >
              {finished ? '提交试卷' : '下一题'}
            </Button>
            <Button
                style={{ width: '600rpx', margin: '20rpx auto' }}
                onClick={this.getQuestionAnswer}
            >
              {'标准答案'}
            </Button>
          </View>
        ) : (
          <View className="start">
            <View className="name">
              <View className="label">试卷：</View>
              {paparInfo.name}
            </View>
            <View className="auther">
              <View className="label">老师：</View>
              {paparInfo.setPerson}
            </View>
            <View className="score">
              <View className="label">总分：</View>
              {paparInfo.totalScores}
            </View>
            <AtButton className="button" onClick={this.start} type="primary">
              开始
            </AtButton>
          </View>
        )}
      </View>
    )
  }
}
