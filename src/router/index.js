import React, { Component } from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

import Admin from '../views/admin';
import Home from '../views/home';
import NotMatch from '../views/notMatch';
import Order from '../views/order/index';
import OrderDetail from '../views/order/detail';
import Pie from '../views/echarts/pie';
// import Bar from '../views/echarts/bar';

export default class Router extends Component {
    render() {
        return (
            <HashRouter>
                <div>
                    <Switch>
                        <Route path="/common/order/detail/:id" component={OrderDetail}></Route>
                        <Route path="/admin" render={()=>
                            <Admin>
                                <Switch>
                                    <Route path="/admin/home" component={Home}></Route>
                                    <Route path="/admin/order" component={Order}></Route>
                                    <Route path="/admin/echarts/pie" component={Pie}></Route>
                                    <Route component={NotMatch}></Route>
                                </Switch>
                            </Admin>
                        }></Route>
                        <Route component={NotMatch}></Route>
                    </Switch>   
                </div>
            </HashRouter>
        )
    }
} 