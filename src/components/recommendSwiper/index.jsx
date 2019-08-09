import Taro from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image } from '@tarojs/components'
import fly from '../../assets/fly.jpeg'
import './index.scss'

/** 发现页顶部的推荐图片 */
export class RecommendSwiper extends Taro.Component {
  state = {
    data: [fly],
  }

  render() {
    const { data } = this.state
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
              <Image src={image} class="slide-image" mode="aspectFill" />
            </SwiperItem>
          ))}
        </Swiper>
      </View>
    )
  }
}
