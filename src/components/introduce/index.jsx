import Taro from '@tarojs/taro'
import {Image, Swiper, SwiperItem, View} from '@tarojs/components'
import introduce1 from '../../assets/introduce1.jpg'
import introduce2 from '../../assets/introduce2.jpg'
import introduce3 from '../../assets/introduce3.png'
import './index.scss'

export class Introduce extends Taro.Component {
    state = {
        data: [introduce3,introduce1,introduce2],
    }

    render() {
        return (

            <View className="introduce">
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
                <View className="introduce1">  学校介绍</View>
                <View className="introduce1-content">
                    武汉博达鑫梦想文化教育培训学校，是经教育行政部门批准和在工商注册登记的一所合法民办教育培训学校，
                    是光谷地区一站式全能全优培训学校，涵盖小学至高中各科文化课培训，常年开设精品班课、VIP一对一、
                    一对二、一对三、 一对四等多种教学模式。我校目前拥有武大航域、华一腾睿和天祥尚府三个校区，
                    教学面积2000平米，学校拥有一支思想素 质高、服务意识强的管理团队和一支专业水平过硬、
                    教学经验丰富且极具活力的教师团队。
                </View>
                <View className="address">  学校地址</View>
                <View className="address-content1">
                    华一腾睿校区（高中部）：武汉市洪山区华师园一路（华师一附中北门附近）腾睿大厦7号楼A座3楼
                </View>
                <View className="address-content2">
                    武大航域校区（中小学部）：武汉市洪山区武大科技园航域二区B3栋3楼302室
                </View>
                <View className="address-content3">
                    天祥尚府校区（中小学部）：武汉市东湖高新区庙山中路（汤逊湖学校旁）天祥尚府商业街A区3楼
                </View>

                <View className="enroll">  报名热线</View>
                <View className="enroll-content">
                    027-87565896   027-87988699
                </View>

            </View>
        )
    }
}
