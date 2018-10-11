import React,{Component} from 'react'
import './index.scss'
import axios from 'axios'
import utils from '../../utils'

export default class Header extends Component {
    state = {
        weather: '',
        time: ''
    }

    getWeather = () => {
        axios.get(`http://t.weather.sojson.com/api/weather/city/101010100`).then(res=>{
            let weatherData = res.data.data.forecast[0]
            let weatherStr = `${weatherData.low} ~ ${weatherData.high} ${weatherData.fx} ${weatherData.fl}`
            this.setState({weather: weatherStr})
        })
    }

    getDate() {
        setInterval(()=>{
            let unixDate = new Date().getTime()
            let time = utils.formatDate(unixDate)
            this.setState({time})
        },1000)
    }

    componentWillMount() {
        this.getWeather()
        this.getDate()
    }

    render() {
        return (
            <div className="header-wrap">

                <div className="header">
                    <div className=" logout fr">
                        退出
                    </div>
                    <div className="user-wrap fr">
                        欢迎， <span className="username">张怡宁</span>
                    </div>
                </div>

                <div className="header-detail clearfix">
                    <div className="breadcrumb-title fl">
                        首页
                    </div>
                    <div className="weather fr clearfix">
                        <div className="date fl">
                            {this.state.time}
                        </div>
                        <div className="weather-detail fl">
                            {this.state.weather}
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}