/**
 * All Users Module
 * @module Users
 */


import React, { Component } from 'react';

import {  Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';


import axios from 'axios';

//import '../css/button1.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import './one.css'

// function UserRow(props) {
 
//   const userLink = `/users/${user.id}`

//   // const getBadge = (status) => {
//   //   return status === 'Active' ? 'success' :
//   //     status === 'Inactive' ? 'secondary' :
//   //       status === 'Pending' ? 'warning' :
//   //         status === 'Banned' ? 'danger' :
//   //           'primary'
//   // }

//   return (
    
//   )
// }
/**
 * Class to view all the job openings and to refer it to a person
 */
class Users extends Component {
  constructor(props){
    super(props)

this.state = {
  modal: false,
      name:'',
      email:'',
      phone:'',
      qualification:'',
      job:'',
      referee_id:' ',
      referred_on:'',
      department:'',
      index:'',
posts:[],


}
this.toggle = this.toggle.bind(this);
  }
  toggle(index) {
    console.log(index)
    this.setState(prevState => ({
      modal: !prevState.modal,
      index:index
    }));
    
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.type === 'number' ? parseInt(e.target.value) : e.target.value
    });
  }
  /**
   * @property {Function} handleSubmit runs on submit
   */
  handleSubmit = (e,index) => {
   e.preventDefault();
   var d=new Date()
  var date=""
  var month=d.getMonth()
  var day=d.getDate()
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
   date=d.getFullYear()+"-"+month+"-"+day
   console.log(date)
   var code=""
   code=d.getTime();
   const status = {
      
    isReferred:true,
    isAccepted:false,
    isInterviewed:false,
    isHired:false,
    notHired:false


 };
 //console.log(this.state.posts[this.state.index].department)
   const one = {
     job_id:this.state.posts[this.state.index]._id,
     name:this.state.name,   
     email:this.state.email,
     phone:this.state.phone,
     qualification:this.state.posts[this.state.index].qualification,
     job:this.state.posts[this.state.index].role,
    //  referee_id:1003,
     referred_on:date,
     department:this.state.posts[this.state.index].department,
     status:status,
     
    };
    //console.log(this.state.posts)
    
    // this.props.addPosts(one)
    // this.setState(prevState => ({
    //   modal: !prevState.modal
    // }));
    console.log(one);
    const samm =localStorage.getItem('token');
    const options={
      url:'https://employee-referals.herokuapp.com/api/referee/addreferee',
      method:'POST',
      headers:{
       'Content-Type': 'application/json',
        'Authorization':samm
      },
      data:{
        job_id:this.state.posts[this.state.index]._id,
     name:this.state.name,   
     email:this.state.email,
     phone:this.state.phone,
     qualification:this.state.posts[this.state.index].qualification,
     job:this.state.posts[this.state.index].role,
    //  referee_id:1003,
     referred_on:date,
     department:this.state.posts[this.state.index].department,
     status:status,
      }
    }
    axios(options)
    .then(this.setState({modal:false}))
    .catch(function (error) {
    console.log("ERROR"+ error);
  })
  }
  componentDidMount () {
    
    this.getPosts()
   
}
/**
 * @property {Function} getPosts gets all the informstion for that logged in user
 */
getPosts() {
  const sam =localStorage.getItem('token');
  const headers= {
     
    "Content-Type": "application/json",
     "Accept":"*/*",
     'Authorization':sam
 }
  axios.get('https://employee-referals.herokuapp.com/api/job',{headers})
  .then(res => {
      this.setState({
        posts:res.data
        
      })
     console.log(this.state.posts)
    } )
  
}

  render() {

    const userList = this.state.posts
    
   // console.log(this.state.posts)
  // const user = props.user

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={12}>
            <Card>
              <CardHeader>
                {/* <i className="fa fa-align-justify"></i> Users <small className="text-muted">example</small> */}
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">Role</th>
                      <th scope="col">Qualification</th>
                      <th scope="col">Experience</th>
                      <th scope="col">Salary</th>
                      <th scope="col">Department</th>
                      <th scope="col">Referal Bonus</th>
                      <th scope="col">Refer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userList.map((user, index) =>
                      <tr >
      <th scope="row">{user.role}</th>
      <td>{user.qualification}</td>
       <td>{user.experience}</td>
      <td>{user.salary}</td>
      <td>{user.department}</td>
      <td>{user.referalbonus}</td> 
      <td>
      <div>
      <div className="but">
     <Button className="Button"  onClick={()=>{this.toggle(index)}}>{this.props.buttonLabel}refer</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}></ModalHeader>
          <ModalBody>
           <div className="base-container">
      <div className="header">Refer</div>
        <div className="content" >
    <div className="form">
    <div className="form-group">
              <label htmlFor="empid">Name</label>
              <input type="text" id="name" name="name" placeholder="name" onChange={this.handleChange}  />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Email Id</label>
              <input type="text" id="email" name="email" placeholder="email" onChange={this.handleChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="username">Phone</label>
              <input type="number" id="phone"name="phone" placeholder="phone" onChange={this.handleChange}  />
            </div>
           
            
          </div>
         </div>
        </div>
        </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleSubmit} >Submit</Button>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
        
      </div>
      </div>
    
    </td>
     
    </tr>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Users;
