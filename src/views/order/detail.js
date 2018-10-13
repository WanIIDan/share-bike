import React, { Component } from 'react';
import axios from '../../axios'
import { Card } from 'antd'
import Header from '../../components/header'
import './detail.scss'

export default class OrderDetail extends Component {

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        const {id} = this.props.match.params
        axios.get('/order/detail', {id}).then(res => {
            if(res.code == 0) {
                this.initMap(res.result)
            }
        })
    }

    initMap = (result) => {
        const BMap = window.BMap
        // 创建地图实例 
        this.map = new BMap.Map("map-container"); 
        // 创建点坐标
        const point = new BMap.Point(result.position_list[0].lon, result.position_list[result.position_list.length-1].lat);   
        // 初始化地图，设置中心点坐标和地图级别 
        this.map.centerAndZoom(point, 11); 
        //开启鼠标滚轮缩放
        this.map.enableScrollWheelZoom(true); 
        
        this.add_control()
        this.drawPolyline(result.position_list)
        this.drawServiceArea(result.area)
    }
    
    //添加控件和比例尺
    add_control = () => {
        // 左上角，添加比例尺
        this.map.addControl(new window.BMap.ScaleControl({
            anchor: window.BMAP_ANCHOR_TOP_LEFT
        }));
        //右上角，仅包含平移和缩放按钮
        this.map.addControl(new window.BMap.NavigationControl({
            anchor: window.BMAP_ANCHOR_TOP_RIGHT
        }));    
    }
    
    // 绘制路径折线图
    drawPolyline = (position_list) => {
        const BMap = window.BMap
        const map = this.map
        let startPoint = position_list[0] // 起点
        let endPoint = position_list[position_list.length-1] // 终点

        // 生成起始坐标点
        let startMapPoint = new BMap.Point(startPoint.lon, startPoint.lat) // 绘制一个百度地图的起始点
        let startIcon = new BMap.Icon("/imgs/start_point.png", new BMap.Size(36, 42), {    
            imageSize: new BMap.Size(36, 42)
        }); 

        // 生成结束坐标点
        let endtMapPoint = new BMap.Point(endPoint.lon, endPoint.lat) // 绘制一个百度地图的结束点
        let endIcon = new BMap.Icon("/imgs/end_point.png", new BMap.Size(36, 42), {    
            imageSize: new BMap.Size(36, 42)
        });

        //设置坐标点 
        let startMarker = new BMap.Marker(startMapPoint, {icon: startIcon}); // 创建起点标注    
        let endMarker = new BMap.Marker(endtMapPoint, {icon: endIcon}); // 创建终点标注    
        map.addOverlay(startMarker); // 添加起始标注 
        map.addOverlay(endMarker); // 添加结束标注
        map.centerAndZoom(startMapPoint, 11); // 设置地图中心点
        
        //生成折线图
        let polyline = new BMap.Polyline(position_list.map(point => {
            return new BMap.Point(point.lon, point.lat)}),
            {strokeColor:"#1869ad", strokeWeight:3, strokeOpacity:1}
        );
        map.addOverlay(polyline);
    }

    // 绘制服务区
    drawServiceArea = (area) => {
        const BMap = window.BMap
        const map = this.map
        let Polygon = new BMap.Polygon(
            area.map(point => new BMap.Point(point.lon, point.lat)),
            {
                strokeColor: '#ff0000',
                strokeWeight: 3,
                fillColor: '#ff6700',
                fillOpacity: 0.5
            }   
        )
        map.addOverlay(Polygon)
    }

    render() {
        return (
            <div className="detail">
                <Header type='common'></Header>
                <Card>
                    <div className="map-wrap" id="map-container"></div>
                </Card>
            </div>
        )
    }
} 