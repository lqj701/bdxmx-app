import Taro from '@tarojs/taro'
import {View} from '@tarojs/components'
import './index.scss'
import store from '../../../service/store'

export default class SetInfo extends Taro.Component {
    config = {
        navigationBarBackgroundColor: '#0cb956',
        navigationBarTextStyle: 'white',
        navigationBarTitleText: '设置个人信息',
    }
    state = {
        student: {},
    }

    componentDidMount() {
        const student = store.get('student')
        this.setState({student})
    }

    render() {
        return (
            <View className="Info">
                <View className="Info">
                    {student.openid}
                </View>
                <View className="Info">
                    {student.id}
                </View>
            </View>
        )
    }
}
