import React, {Component} from 'react'
import axios from 'axios';
import './App.css';
const API_URL = process.env.REACT_APP_API_URL;



export default class App extends Component {
  constructor(props){
    super();
    this.state = {
      users: [],
      id: '',
      name: '',
      email: '',
      gender: '',
      data: undefined,
      status: undefined
    }
  }
  //create
      handleChange = event => {
      this.setState({
        [event.target.name]: event.target.value
      })
    }
      handleSubmit = event => {
      event.preventDefault()

      const user = {
        id: this.state.id,
        name: this.state.name,
        email: this.state.email,
        gender: this.state.gender
      }
      
      axios.post(`${API_URL}/create`, {...user}).then(res => {
        
        this.setState({
          data: res.data
        })
      }).catch =(error) => {
        console.log(error)
      }
    }
// -------------------------------//
    //delete

    handleChangeToDelete = event => {
      this.setState({
        [event.target.name]: event.target.value
      })
    }
    handleSubmitToDelete = event => {
      event.preventDefault()
  
      axios.delete(`${API_URL}/${this.state.id}`).then(res => {
        this.setState({
          status: res.status,
          data: res.data
        })
      })
    }
// -----------------------------------//
    
        //edit

    handleEditChange = event => {
      this.setState({
        [event.target.name]: event.target.value
      })
    }
//------------------------------------------//
//get

  componentDidMount() {
    axios.get(`${API_URL}/users`).then(res => {
      const users = res.data;
      this.setState({users})
    })
  }
  

  render(){
    return(
      <div className="fluid-container">
        <div className="delete-form">
        <h3>Delete</h3>
        <form onSubmit={this.handleSubmitToDelete}>
          <label>Person ID:</label>
          <input type='text' name='id' onChange={this.handleChangeToDelete} />
          <button className="btn btn-danger" type='submit'>Delete Person</button>
        </form>
      </div>

        <div className="form-group center">
            <h2>Add new data</h2>
          <form onSubmit={this.handleSubmit}>
          {/* <div clasName="form-group">
          <label> id : </label>
          <input type="text" name="id" onChange={this.handleChange}/>
          </div> */}
          <div clasName="form-group">
          <label> Name : </label>
          <input type="text" name="name" onChange={this.handleChange}/>
          
          </div>
          <label> Email : </label>
          <input type="text" name="email" onChange={this.handleChange}/>
          
          <label> Gender : </label>
          <input type="text" name="gender" onChange={this.handleChange}/>
         
          <button type='submit' className="btn btn-success btn-center">Add Person</button>
          </form>
        </div>

        <div class="card text-white bg-success mb-3">
        <h2>Data</h2>
        <div class="card-body">
          <p class="card-text">
          <ul>
          {this.state.users.length > 0 && this.state.users.map(users =>
          <li>No. {users.id} <br/> 
          Name : {users.name} <br/> 
          Email : {users.email} <br/>
          Gender : {users.gender} <hr/></li>
          )}
        </ul>
          </p>
        </div>
        </div>

      </div>
    )
  }
}
