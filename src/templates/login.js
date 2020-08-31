import React from 'react';
import {Redirect} from 'react-router-dom';
import '../styles/home.css';

class Login extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: '',
			loginSuccess: false
		};

	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e){
		let target = e.target;

		this.setState({
			[target.name]: target.value
		})
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log("logging in!!!!")

		let data = {
			"username": this.state.email,
			"password": this.state.password
		}
		
		let val = JSON.stringify(data);

		fetch('http://localhost:8000/login/', {
		    method: 'POST',
		    headers: {
		    	'content-type': 'application/json'
		    },
		    body: val,
		})
		.then( result => result.json())
		.then((result) => {
			console.log("printing result------------")
			console.log(result)
			if('token' in result) {
				this.setState({
					loginSuccess: true
				});
				localStorage.setItem("token", result.token);
			}
			else {
				console.log("error logging in!!!----------!!!")
			}

		},
			(error) => {
				console.log(error);
			}
		)
	}

	render() {
		let loginSuccess = this.state.loginSuccess;
		return (
			<div>
				{loginSuccess ? <Redirect to = "/index" /> : null}
				<form className = 'loginForm' onSubmit = {this.handleSubmit} method = "POST">

					<div>
						{/*<label className = 'labelText'>Username</label>*/}
						<input className = 'inputText' placeholder = "Email" type = "email" name = "email" value = {this.state.email} onChange = {this.handleChange}/>
					</div>

					<div>
						{/*<label className = 'labelText'>Password</label>*/}
						<input className = 'inputText' placeholder = "Password" type = "password" name = "password" value = {this.state.password} onChange = {this.handleChange}/>
					</div>

					<div>
						<button className = "submitButton">Login</button>
					</div>

				</form>
			</div>
		);
	}
}

export default Login;