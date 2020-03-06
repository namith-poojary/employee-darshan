
/**
 * Progress module
 * @module Progress
 * 
 * 
 */



import React, { Component } from 'react';
import axios from 'axios';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import './progress.css'
/**
 * class to view all the progress details of the referred peoples
 */
class progress extends Component {
  /**
   * 
   * @param {Object} props all the status info 
   */
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

    /**
     * @property {Function} getPosts calls the function
     */
   
    this.getPosts()
    // console.log(this.state.immutablePosts)
  }
  
/**
 * @property {Function} getPosts gets the header details and sets all the status information for the logged in user
 */
  getPosts() {  
    /**
     * @property {String} sam stores token information
     */
    const sam =localStorage.getItem('token');
    /**
     * @property {String} headers stores header information
     */
        
    const headers= {
     
      "Content-Type": "application/json",
       "Accept":"*/*",
       "Authorization":sam
   }
    axios.get('https://employee-referals.herokuapp.com/api/referee/emp_referals',{headers})
  .then(res => {
  
    console.log(sam);
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


  // onCheckChange(e,index) {
  // //   console.log(index);
  // //  console.log(e.target.value)
  // //  console.log(e.target.id)
   
  //  const value=true
  //  const [x] =[e.target.id]
  //   if(e.target.id==='isAccepted')
  //   {
  //     if(!this.state.immutablePosts[index].status.isReferred)
  //     {
  //       alert("Please Refer Before going to this step")
  //     }
  //     else
  //     {
  //       this.setState(prevState => {
  //         const imPosts = [...prevState.immutablePosts];
  //         imPosts[index].status = { ...imPosts[index].status, [x]: value };
         
  //        return { imPosts };
       
  //      })
  //     }
  //   }
  //   else if(e.target.id==='isInterviewed')
  //   {
  //     if(!this.state.immutablePosts[index].status.isAccepted)
  //     {
  //       alert("Please Accept Before going to this step")
  //     }
  //     else
  //     {
  //       this.setState(prevState => {
  //         const imPosts = [...prevState.immutablePosts];
  //         imPosts[index].status = { ...imPosts[index].status, [x]: value };
         
  //        return { imPosts };
       
  //      })
  //     }
  //   }
  //   else if(e.target.id==='isHired' || e.target.id==='notHired')
  //   {
      
  //     if(!this.state.immutablePosts[index].status.isInterviewed)
  //     {
  //       alert("Please Interview Before going to this step")
  //     }
  //     else if(e.target.id==='isHired')
  //     {
        
  //       if(this.state.immutablePosts[index].status.notHired)
  //       {
  //         alert("Not Hired Already")
  //       }
  //       else
  //       {
  //         this.setState(prevState => {
  //           const imPosts = [...prevState.immutablePosts];
  //           imPosts[index].status = { ...imPosts[index].status, [x]: value };
           
  //          return { imPosts };
         
  //        }) 
  //       }
  //     }
  //     else if(e.target.id==='notHired')
  //     {
        
  //       if(this.state.immutablePosts[index].status.isHired)
  //       {
  //         alert("Hired Already")
  //       }
  //       else
  //       {
  //         this.setState(prevState => {
  //           const imPosts = [...prevState.immutablePosts];
  //           imPosts[index].status = { ...imPosts[index].status, [x]: value };
           
  //          return { imPosts };
         
  //        }) 
  //       }
  //     }
     
  //   }


    
     
  // // console.log(this.state.immutablePosts)
  //  // console.log(imPosts);
   
  // }


  // handleSubmit = (e,post,index) => {
  //   e.preventDefault();
  //   // console.log(e)
  //   // //console.log(post)
  //   // console.log(index)
    
   
  //   const body=this.state.immutablePosts[index]
  //   //console.log(body)  
  //   const data={
  //       _id :this.state.immutablePosts[index]._id,
  //       status:this.state.immutablePosts[index].status
  //   }
  //   const samm =localStorage.getItem('token');
        
  // //   const headers= {
     
  // //     "Content-Type": "application/json",
  // //      "Accept":"*/*",
  // //      "Authorization":samm
  // //  }
  //  const options={
  //   url:'https://employee-referals.herokuapp.com/api/referee/update/',
  //   method:'POST',
  //   headers:{
  //    'Content-Type': 'application/json',
  //     'Authorization':samm
  //   },
  //   data:{
  //     _id :this.state.immutablePosts[index]._id,
  //       status:this.state.immutablePosts[index].status
  //   }
  // }
   
  
  //    axios(options)
  //         .then(res => console.log(res));
  //       alert("Updated for "+body.name)
  //       }
  render() {
    var posts=this.state.posts;
    
   return (
      
 posts.map((post,index)=>{

   
   return(
<Card className="ram" style={{ width:'100%'}}>
     <Card.Body>
       <div className="sam">
   <h1>{post.name}</h1>
   <h2>{(post.job)}</h2> 
   
   </div>

  <form >
    <p>
      <label>
  <input  type="checkbox" name="isReferred" id="isReferred"
  checked={post.status.isReferred}/><span>Referred</span></label>
  <label><input type="checkbox" name="isAccepted" id="isAccepted"

  checked={post.status.isAccepted} /><span>Accepted</span></label>
  <label><input  type="checkbox" name="isInterviewed" id="isInterviewed"
  checked={post.status.isInterviewed} /><span>Interviewing</span></label>
  <label><input  type="checkbox" name="isHired" id="isHired"
  checked={post.status.isHired}/><span>Hired</span></label>
  <label><input  type="checkbox" name="notHired" id="notHired"
  checked={post.status.notHired} /><span>Not Hired</span></label>
<br></br>

  {/* <Button  variant="primary" size="lg" className='offset-md-4'  type="submit" className="btn btn-danger">
            Submit
          </Button> */}
          
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
