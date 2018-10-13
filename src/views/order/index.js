import React, { Component } from 'react';
import { Form, Select, Card, DatePicker, Button, Table, Modal, message } from 'antd';
import './index.scss'
import axios from '../../axios'

const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

class Order extends Component {

    state = {
        dataSource: [],
        pageSize: '',
        total: '',
        isLoading: false,
        endItem: {}
    }

    params = {
        pn: 1
    }

    componentWillMount() {
        this.getTable()
    }

    // 获取数据
    getTable = () => {
        this.setState({
            isLoading: true
        })
        axios.get('/order/list', this.params).then(res=> {
            if(res.code == 0) {
                this.setState({
                    dataSource: res.result.item_list.map((item, index)=>{
                        item.key = index
                        return item
                    }),
                    pageSize: 10,
                    total: res.result.total_count,
                    isLoading: false
                })
            }
        })
    }

    // 重置数据
    handleClick = () => {
        this.props.form.resetFields()
    }

    // 查询：获取表单数据
    handleSearch = () => {
        const form = this.props.form.getFieldsValue()
        console.log(form);
    }

    // 结束订单(弹出确认框，展示数据并让用户选择是否结束订单)
    handleDone = () => {
        let selectItem = this.state.selectItem
        if(selectItem) {
            axios.get('/order/ebike_info', {id: selectItem[0].id}).then(res=>{
                if(res.code == 0) {
                    this.setState({
                        endItem: res.result,
                        visible: true
                    })
                }
                
            })
        }else {
            Modal.info({
                content: '请选择一条订单结束'
            })
        }
    }

    // 用户确认结束订单
    handleEnd = () => {
        let id = this.state.selectItem[0].id
        axios.get('/order/finish_order', {id}).then(res=>{
            if(res.code == 0) {
                this.setState({
                    visible: false
                })
                message.success('成功结束订单')
                this.getTable()
            }
        })
    }

    // 跳转到订单详情页面
    handleDetail = () => {
        let selectItem = this.state.selectItem
        if(selectItem) {
            window.open(`/#/common/order/detail/${selectItem[0].id}`)
        }else {
            Modal.info({
                content: '请选择一项订单进行操作'
            })
        }
    }

    render() {

        const { getFieldDecorator } = this.props.form;
    
        const cityOptions = [
            {
                label: '北京',
                value: '0'
            },
            {
                label: '上海',
                value: '1'
            },
            {
                label: '广州',
                value: '2'
            },
            {
                label: '深圳',
                value: '3'
            }
        ]

        const orderState = [
            {
                label: '进行中',
                value: '0'
            },
            {
                label: '已完成',
                value: '1'
            },
            {
                label: '结束行程',
                value: '2'
            }
        ]

        const columns = [
            {
                title: '订单编号',
                dataIndex: 'order_sn',
                key: 'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn',
                key: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name',
                key: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'mobile',
                key: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render(distance){
                    return distance/1000 + 'Km';
                },
                key: 'distance'
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time',
                key: 'total_time'
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status'
            },
            {
                title: '开始时间',
                dataIndex: 'start_time',
                key: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time',
                key: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee',
                key: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay',
                key: 'user_pay'
            }
        ]

        const that = this
        const pagination = {
            total: this.state.total,
            pageSize: 10,
            onChange: (index) => {
                that.params.pn = index
                that.getTable()
            }
        }

        const rowSelection = {
            type: 'radio',
            selectedRowKeys: this.state.selectIndex,
            onChange: (selectedRowKeys, selectedRows) => {
                console.log(selectedRowKeys, selectedRows)
                this.setState({
                    selectItem: selectedRows,
                    selectIndex: selectedRowKeys
                })
            }
        }

        return (
            <div>
                <Card>
                    <Form layout="inline">
                        <FormItem label="城市" style={{marginRight: '50px'}}>
                            {getFieldDecorator('city',{
                                initialValue: '0'
                            })( 
                                <Select style={{width: 180}} placeholder="请选择一个城市">
                                    {cityOptions.map(item => 
                                        <Option value={item.value} key={item.value}>
                                            {item.label}
                                        </Option>
                                    )}
                                </Select>
                            )} 
                        </FormItem>
                        <FormItem label="订单时间" style={{marginRight: '50px'}}>
                            {getFieldDecorator('date')( 
                                <RangePicker
                                    showTime={{ format: 'HH:mm' }}
                                    format="YYYY-MM-DD HH:mm"
                                    placeholder={['Start Time', 'End Time']}
                                />
                            )}
                            
                        </FormItem>
                        <FormItem label="订单状态">
                            {getFieldDecorator('state')(
                                <Select style={{width: 200}}>
                                    {orderState.map(item => 
                                        <Option value={item.value} key={item.value}>
                                            {item.label}
                                        </Option>
                                    )}
                                </Select>
                            )}
                        </FormItem>
                    </Form> 
                    <div className="btn-wrap">
                        <Button type="primary" onClick={this.handleSearch}>查询</Button>
                        <Button onClick={this.handleClick}>重置</Button>
                    </div>
                </Card>
                <Card /*style={{marginTop: '-1px'}}*/>
                    <Button type="primary" className="mr20" onClick={this.handleDetail}>订单详情</Button>
                    <Button type="primary" onClick={this.handleDone}>结束订单</Button>
                </Card>
                <Card>
                    <Table
                        bordered
                        columns={columns} 
                        dataSource={this.state.dataSource}
                        loading={this.state.isLoading}
                        pagination={pagination}
                        rowSelection={rowSelection}
                    />
                </Card>
                <Modal 
                    title="结束订单" 
                    visible={this.state.visible}
                    onOk={this.handleEnd}
                    onCancel={() => this.setState({visible: false})}
                >
                    <ul className="ul-data">
                        <li>
                            <span className="car-num li-title">车辆编号：</span>
                            {this.state.endItem.bike_sn}
                        </li>
                        <li>
                            <span className="car-num li-title">剩余电量：</span>
                            {this.state.endItem.battery}
                        </li>
                        <li>
                            <span className="car-num li-title">行程开始时间：</span>
                            {this.state.endItem.start_time}
                        </li>
                        <li>
                            <span className="car-num li-title">当前位置：</span>
                            {this.state.endItem.location}
                        </li>
                    </ul>
                </Modal>
            </div>
        )
    }
} 

const OrderWrap = Form.create()(Order)

export default OrderWrap