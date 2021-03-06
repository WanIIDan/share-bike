import React,{Component} from 'react'
import { Link } from 'react-router-dom'
import './index.scss'
import axios from 'axios'
import utils from '../../utils'
import { connect } from 'react-redux'

class Header extends Component {
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

                <div className={this.props.type == 'common' ? 'common-header' : 'header'}>
                    <h2 className="title fl" style={{color: '#fff', marginLeft: '20px'}}>
                        共享单车后台系统
                    </h2>
                    <div className=" logout fr">
                        <Link to="/common/login">退出</Link>
                    </div>
                    <div className="user-wrap fr">
                        欢迎， <span className="username">张怡宁</span>
                    </div>
                </div>

                {
                    this.props.type == 'common' ? '' : <div className="header-detail clearfix">
                        <div className="fl breadcrumb-title">
                            {this.props.menuText}
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
                }
                
            </div>
        )
    }
}

// connect 接收两个参数，
// 一个参数叫做mapStateToProps，
// 另一个参数叫mapActionToDispatch.
// 这两个参数都应该是一个函数.

export default connect(
    function mapStateToProps(state) {
        return {
            menuText: state.menuItemText
        }
    }
)(Header)