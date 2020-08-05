import axios from 'axios';
import React, { Component } from 'react';
import UserStats from './UserStats';
import GeneralStats from './GeneralStats';

export default class DashBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'data' : Array
        }
    }
    componentDidMount() {
        axios
        .get("https://navilearn.herokuapp.com/admin/stats/dashboard")
        .then((res)=>{
            const {stats} = res.data
            this.setState({
                'data': stats
            })
        })
    };
    render(){
		return (
            <div>
                <GeneralStats data={this.state.data} />
            </div>
		);
	}
}
