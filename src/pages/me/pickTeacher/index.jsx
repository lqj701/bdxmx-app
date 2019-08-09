import Taro from '@tarojs/taro'
import { AtButton } from 'taro-ui'
import store from '../../../service/store'
import { getTeacherList, bindTeacher } from '../../../service/apis'
import { transformType } from '../../../service/utils'
import './index.scss'

export default class Paper extends Taro.Component {
  config = {
    navigationBarTitleText: '绑定老师',
  }

  state = {
    pending: false,
    teachers: [],
    selectedTeacher: [],
  }

  async componentDidMount() {
    const student = store.get('student')
    const teacherList = await getTeacherList()
    this.setState({
      teachers: teacherList.data,
      selectedTeacher: student.bindedTeacherids
        ? student.bindedTeacherids.split(',').map(id => Number(id))
        : [],
    })
  }

  handleClickTeacher = teacher => {
    let selectedTeacher = this.state.selectedTeacher
    const prevIdx = this.state.selectedTeacher.findIndex(
      id => id === teacher.id
    )
    if (prevIdx >= 0) {
      selectedTeacher.splice(prevIdx, 1)
    } else {
      selectedTeacher.push(teacher.id)
    }
    this.setState({ selectedTeacher })
  }

  bindTeacher = async () => {
    const body = {
      studentId: store.get('student').id,
      teacherIds: this.state.selectedTeacher,
    }
    const bindTeacherResult = await bindTeacher(body)
    if (bindTeacherResult.code === 0) {
      Taro.showToast({
        title: '恭喜，申请成功！',
        duration: 800,
        success: () => {
          setTimeout(() => {
            this.setState({ pending: true })
          }, 800)
        },
      })
    }
  }

  gohome = () => {
    Taro.switchTab({
      url: '/pages/find/index',
    })
  }

  render() {
    const { teachers, selectedTeacher, pending } = this.state

    return (
      <View className="register">
        <View className="header">
          <View className="title">博达鑫梦想教育</View>
          <View className="sub-title">
            学生第一，诚信务实，创新发展，成就梦想！
          </View>
        </View>
        <View className="content">
          {!pending && (
            <View>
              <View className="title">申请您的辅导老师</View>
              <View className="select-area">
                {teachers.map(teacher => (
                  <View
                    className={`card ${selectedTeacher.find(
                      id => id === teacher.id
                    ) && 'card--active'}`}
                    key={teacher.id}
                    onClick={() => this.handleClickTeacher(teacher)}
                  >
                    <View className="name">{teacher.name}</View>
                    <View className="course">
                      {transformType(teacher.type)}
                    </View>
                  </View>
                ))}
              </View>
              <AtButton
                className="bind-teacher"
                type="primary"
                onClick={this.bindTeacher}
              >
                一键绑定
              </AtButton>
            </View>
          )}
          {pending && (
            <View className="pending">
              您成功申请辅导老师，请等待老师审核哦~
              <AtButton className="gohome" onClick={this.gohome}>
                返回首页
              </AtButton>
            </View>
          )}
        </View>
      </View>
    )
  }
}
