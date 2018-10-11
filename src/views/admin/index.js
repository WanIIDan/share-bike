import React,{Component} from 'react'
import NavLeft from '../../components/navLeft'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { Row, Col} from 'antd';
import './index.scss'

export default class Admin extends Component {

    componentDidMount() {
        console.log(this.props)
    }

    render() {
        return (
            <div className="admin">
                <Row>
                    <Col span={4}><NavLeft/></Col>
                    <Col span={20}>
                        <Header/>
                        <div className="content-wrap">
                            <div className="content">
                                {this.props.children}
                            </div>
                        </div>
                        <Footer/>
                    </Col>
                </Row> 
            </div>
        )
    }
}