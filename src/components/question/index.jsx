import Taro from '@tarojs/taro'
import {View} from '@tarojs/components'
import {AtRadio, AtTextarea} from 'taro-ui'
import {PropTypes} from 'nervjs'
import StopIcon from '../../assets/icon/suspend.png'
import PlayIcon from '../../assets/icon/playon_fill.png'
import './index.scss'

const typeLabel = {
    1: '选择题',
    2: '判断题',
    3: '填空题',
    4: '解答题',
}

export default class Question extends Taro.Component {
    static defaultProps = {
        question: PropTypes.object,
        collectAnswer: PropTypes.func,
    }

    state = {
        answer: '',
        playStatus: 'stop',
    }

    constructor() {
        this.audioCtx = Taro.createInnerAudioContext()
    }

    //1：选择；2：判断；3：填空；4：解答
    handleAnswer = value => {
        const {question, onChangeAnswer} = this.props
        if (question.questionType === 1 || question.questionType === 2) {
            this.setState({answer: value})
            onChangeAnswer({answer: value, name: question.questionStem})
        } else {
            onChangeAnswer({
                answer: value.detail.value,
                name: question.questionStem,
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.question.id !== nextProps.question.id) {
            this.audioCtx.stop()
            this.setState({
                playStatus: 'stop',
            })
        }
    }

    playAudio = audio => {
        this.audioCtx.src = audio
        this.state.playStatus === 'stop'
            ? this.audioCtx.play()
            : this.audioCtx.stop()
        this.setState({
            playStatus: this.state.playStatus === 'stop' ? 'play' : 'stop',
        })
        console.log(audio)
    }

    render() {
        const {question} = this.props
        const {answer, playStatus} = this.state

        return (
            <View className="question">
                <View className="name">
                    {typeLabel[question.questionType]}： {question.questionStem}
                </View>
                <View>
                    {question.questionAudio &&
                    question.questionAudio.map(audio => (
                        <View
                            key={audio}
                            style="display: flex;align-items: center"
                            onClick={() => this.playAudio('https://' + audio)}
                        >
                            {playStatus === 'stop' ? (
                                <Image style="width: 100rpx;height: 100rpx" src={PlayIcon}/>
                            ) : (
                                <Image style="width: 100rpx;height: 100rpx" src={StopIcon}/>
                            )}
                            音频
                        </View>
                    ))}
                </View>
                {question.questionType === 1 && (
                    <View>
                        <AtRadio
                            options={[
                                {
                                    label: 'A',
                                    value: 'A',
                                    desc: question.questionChoice.A,
                                },
                                {
                                    label: 'B',
                                    value: 'B',
                                    desc: question.questionChoice.B,
                                },
                                {
                                    label: 'C',
                                    value: 'C',
                                    desc: question.questionChoice.C,
                                },
                                {
                                    label: 'D',
                                    value: 'D',
                                    desc: question.questionChoice.D,
                                },
                            ]}
                            value={answer}
                            onClick={this.handleAnswer}
                        />
                    </View>
                )}
                {question.questionType === 2 && (
                    <View>
                        <AtRadio
                            options={[
                                {
                                    label: '正确',
                                    value: '正确',
                                },
                                {
                                    label: '错误',
                                    value: '错误',
                                },
                            ]}
                            value={answer}
                            onClick={this.handleAnswer}
                        />
                    </View>
                )}
                {question.questionType === 3 && (
                    <View>
                        <AtTextarea
                            onChange={this.handleAnswer}
                            maxLength={200}
                            placeholder="请输入答案..."
                        />
                    </View>
                )}
                {question.questionType === 4 && (
                    <View>
                        <AtTextarea
                            onChange={this.handleAnswer}
                            maxLength={200}
                            placeholder="请输入答案..."
                        />
                    </View>
                )}
            </View>
        )
    }
}
