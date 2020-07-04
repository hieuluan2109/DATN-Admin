import React, { Component } from 'react'
import axios from 'axios'
export default class StatusRequest extends React.Component{
    constructor(props){
        super(props)
        state={
            status:""
        }
    }
    handleSubmit(event){
             event.preventDefault();
             axios.post('http://localhost:8000/admin/login').then(res=>{
                 console.log(res)
                 console.log(res.data)
             })
    }

}