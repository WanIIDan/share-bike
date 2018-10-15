import React,{Component} from 'react'
import {Link} from 'react-router-dom';
import {Menu} from 'antd';
import './index.scss'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import action from '../../redux/action'

const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item

class NavLeft extends Component {

    clickMenuItem = ({item, key, keyPath}) => {
        const text = item.props.children.props.children
        this.props.action.changeMenuItem(text)
        console.log(this.props)
        // console.log(this.props.dispatch({type: 'CHANGE_MENU_ITEM', text}))
    }

    render() {
        return (
            <div className="nav-left">
                <Menu mode="vertical" theme="dark" onClick={this.clickMenuItem}>
                    <MenuItem key="/admin/home">
                        <Link to="/admin/home">首页</Link>
                    </MenuItem>
                    <MenuItem key="/admin/order">
                        <Link to="/admin/order">订单管理</Link>
                    </MenuItem>

                    <SubMenu title="图例">
                        <MenuItem key="/admin/echarts/bar">
                            <Link to="/admin/echarts/bar">条形图</Link>
                        </MenuItem>
                        <MenuItem key="/admin/echarts/pie">
                            <Link to="/admin/echarts/pie">饼状图</Link>
                        </MenuItem>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}

export default connect(
    null,
    function mapActionToDispatch(dispatch) {
        return {
            action: bindActionCreators(action, dispatch)
        }
    }
)(NavLeft)