import React, { Component } from 'react';
import CountUp from 'react-countup';

export default class GeneralStats extends Component {
    render(){
        let countUp = this.props.data
		return (
            <div>
			    Sinh viên: <CountUp end={countUp.sinh_vien ? countUp.sinh_vien : 0} duration={5} /> <br />
                Giáo viên: <CountUp end={countUp.giao_vien ? countUp.giao_vien : 0} duration={5} /> <br />
                
            </div>
		);
	}
}
