import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
import { getPapers } from '../../service/apis'
import store from '../../service/store'
import './index.scss'

/** 全部试卷列表 */
export default class PaperList extends Taro.Component {
  state = {
    data: [],
  }

  async componentDidMount() {
    const student = store.get('student')
    const getPapersResult = await getPapers(
      student.bindedTeacherids ? student.id : ''
    )
    if (getPapersResult.code === 0) {
      this.setState({ data: getPapersResult.data })
    }
  }

  onClickPaper(paper) {
    const student = store.get('student')
    if (student.bindedTeacherids) {
      Taro.navigateTo({ url: `/pages/exam/index?id=${paper.id}` })
    } else {
      Taro.showModal({
        title: '提示',
        content: '您还没有绑定该试卷的老师，暂时无法答题',
        cancelText: '取消',
        confirmText: '前去绑定',
        success: res => {
          if (res.confirm) {
            Taro.navigateTo({
              url: `/pages/me/pickTeacher/index?id=${paper.id}`,
            })
          }
        },
      })
    }
  }

  render() {
    const { data } = this.state
    return (
      <View className="paperList">
        {data.length > 0 ? (
          <AtList>
            {data.map(paper => (
              <AtListItem
                title={paper.name}
                note={`老师: ${paper.setPerson} 总分: ${paper.totalScores}`}
                key={paper.id}
                onClick={() => this.onClickPaper(paper)}
              />
            ))}
          </AtList>
        ) : (
          <View>抱歉，你绑定的老师暂时没有试卷...</View>
        )}
      </View>
    )
  }
}
