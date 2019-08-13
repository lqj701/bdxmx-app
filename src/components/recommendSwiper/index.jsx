import Taro from '@tarojs/taro'
import {Image, Swiper, SwiperItem, View} from '@tarojs/components'
import qinghua from '../../assets/qinghua.jpg'
import weiminhu from '../../assets/weiminhu.jpg'
import wuhandaxue from '../../assets/wuhandaxue.jpg'
import './index.scss'

/** 发现页顶部的推荐图片 */
export class RecommendSwiper extends Taro.Component {
    state = {
        data: [qinghua, weiminhu, wuhandaxue],
    }

    render() {
        const {data} = this.state
        return (
            <View>
                <Swiper
                    indicatorColor="#999"
                    indicatorActiveColor="#888"
                    circular
                    indicatorDots
                    autoplay
                >
                    {data.map((image, index) => (
                        <SwiperItem key={index}>
                            <Image src={image} class="slide-image" mode="aspectFill"/>
                        </SwiperItem>
                    ))}
                </Swiper>
            </View>
        )
    }
}
