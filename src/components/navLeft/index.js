import React,{Component} from 'react'
import {Link} from 'react-router-dom';
import {Menu} from 'antd';
import './index.scss'

export default class Footer extends Component {
    render() {
        return (
            <div className="nav-left">
                <Menu mode="vertical" theme="dark">
                    <Menu.Item key="/admin/home">
                        <Link to="/admin/home">首页</Link>
                    </Menu.Item>
                    <Menu.Item key="/admin/order">
                        <Link to="/admin/order">订单管理</Link>
                    </Menu.Item>
                </Menu>
            </div>
        )
    }
}