import axios from 'axios';
import React, { Component } from 'react';

import CanvasJSReact from '../../canvars/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class UserStats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'sinh_vien': 0,
            'giao_vien': 0,
            'total_user': 0,
        }
    }
    componentDidMount() {
        axios
        .get("https://navilearn.herokuapp.com/admin/stats/dashboard")
        .then((res)=>{
            const {stats} = res.data
            this.setState({
                'sinh_vien': stats.sinh_vien,
                'giao_vien': stats.giao_vien,
                'total_user': stats.sinh_vien + stats.giao_vien,
            })
        })
    }
    render() {
		const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light1", // "light1", "dark1", "dark2"
			title:{
				text: "Trip Expenses"
			},
			data: [{
				type: "pie",
				indexLabel: "{label}: {y}%",		
				startAngle: -90,
				dataPoints: [
					{ y: ( this.state.sinh_vien % this.state.total_user ), label: "Sinh viên" },
					{ y: (this.state.giao_vien % this.state.total_user ), label: "Giáo viên" },
				]
			}]
		}
		return (
			<div>
				<CanvasJSChart options = {options} />
			</div>
		);
	}
}
