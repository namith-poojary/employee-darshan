import React, { Component } from 'react';
import axios from 'axios';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'

import './progress.css'

class progress extends Component {
  constructor(props) {
    super(props)
    this.state = {
        isReferred: false,
        isAccepted: false,
        isInterviewed: false,
        isHired:false,
        notHired:false,
    
        immutablePosts: [ ],
        posts:[],  
    };
    // this.onCheckChange=this.onCheckChange.bind(this)
    //  this.handleSubmit = this.handleSubmit.bind(this);
  
  }

  componentDidMount() {

    
   
    this.getPosts()
    // console.log(this.state.immutablePosts)
  }

  getPosts() { 
    const sam =localStorage.getItem('token');
    const headers= {
     
      "Content-Type": "application/json",
       "Accept":"*/*",
       "Authorization":sam
   }
    axios.get('https://employee-referals.herokuapp.com/api/referee/show_referals',{headers})
  .then(res => {
    //console.log(res.data.data[0].status)
      this.setState({
        isReferred: res.data[0].status.isReferred,
        isAccepted: res.data[0].status.isAccepted,
        isInterviewed: res.data[0].status.isInterviewed,
        isHired:res.data[0].status.isHired,
        notHired:res.data[0].status.notHired,
          immutablePosts: res.data,
         
      }, () => {
          this.setState({
              posts: this.state.immutablePosts
          })
          console.log(this.state.posts)
      })
      
  })
  }


  
  render() {
    var posts=this.state.posts;
    
   return (
      
 posts.map((post,index)=>{

   
   return(
<Card className="card" style={{ width:'100%'}}>
     <Card.Body>
       <div className="sam">
   <h1>{post.qualification}</h1>
   <h2>{(post.job)}</h2> 
  
   </div>

  <form >
    <p>
      <label>
  <input  type="checkbox" name="isReferred" id="isReferred"
  checked={post.status.isReferred} /><span>Referred</span></label>
  <label><input type="checkbox" name="isAccepted" id="isAccepted"

  checked={post.status.isAccepted} /><span>Accepted</span></label>
  <label><input  type="checkbox" name="isInterviewed" id="isInterviewed"
  checked={post.status.isInterviewed} /><span>Interviewing</span></label>
  <label><input  type="checkbox" name="isHired" id="isHired"
  checked={post.status.isHired} /><span>Hired</span></label>
  <label><input  type="checkbox" name="notHired" id="notHired"
  checked={post.status.notHired} /><span>Not Hired</span></label>
<br></br>

    </p>
  </form>
  
</Card.Body>
</Card>
   )
 })
 

   
     
   );
 }
}

export default progress;