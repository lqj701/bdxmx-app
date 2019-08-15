import Taro from '@tarojs/taro'
import {View} from '@tarojs/components'
import {getPaper} from '../../../service/apis'
import './index.scss'

export class StandardAnswer extends Taro.Component {
    config = {
        navigationBarTitleText: '标准答案',
        disableSwipeBack: true,
    }

    state = {
        questionList: [],
    }

    tempAnswer = ''

    async componentDidMount() {
        const routeParams = this.$router.params
        const getPaperResult = await getPaper({
            examPaperId: Number(routeParams.id),
        })

        if (getPaperResult.code === 0) {
            this.setState({
                questionList: getPaperResult.data.questionIdList,
            })
        }
    }

    render() {
        const {
            questionList,
        } = this.state

        return (
            <View className="standardAnswer">
                <View className="answers">
                    {questionList.map((v, i) => (
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
                            <View className="item">题目：{v.questionStem}</View>
                            <View className="item">
                                正确答案：{v.questionAnswer}
                            </View>
                            <View className="item">
                                解答：{v.questionExplain}
                            </View>
                        </View>
                    ))}
                </View>
            </View>
        )
    }
}
