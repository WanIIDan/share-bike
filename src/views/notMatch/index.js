import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import notMatchImg from './img.gif';
import './index.scss'

export default class NotMatch extends Component {
    render() {
        return (
            <div className="notmatch clearfix">
                <div className="notmatch-left fl">
                    <div className="title">
                        Oh My God!
                    </div>
                    <h2 className="desc">
                        404 您要的页面没有找到！
                    </h2>
                    <div className="notmatch-content">
                        <p>如有不满，请联系你的领导</p>
                        <ul>
                            <li>或者你可以去</li>
                            <li><Link to="/admin/home">回首页</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="img-wrap fl">
                    <img src={notMatchImg} alt=""/>
                </div>
            </div>
        )
    }
} 