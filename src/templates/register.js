import React from 'react';
import {Redirect} from 'react-router-dom';
import '../styles/home.css';

const baseUrl = `https://thedevpartnerbackend.herokuapp.com/`;
// const baseUrl = `https://crudapp01.herokuapp.com/`;
// const baseUrl = `http://localhost:8000/`;

class Register extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			full_name: '',
			email: '',
			password: '',
			confirm_password: '',
			registrationSuccess: false
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

		let name = this.state.full_name.split(" ");

		let data = {
			"first_name": name[0],
			"last_name": name[1],
			"email": this.state.email,
			"username": this.state.email,
			"password": this.state.password
		}

		let val = JSON.stringify(data);

		const url = baseUrl + `register/`;
		fetch(url, {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: val
		})
		.then( result => result.json())
		.then( (result) => {
			console.log(result);
			if(result.response === 'registration successfull') {
				this.setState({
				registrationSuccess: true
				})
				localStorage.setItem("token", result.token);
			}
		},
		 (error) => {
		 	console.log(error);
		 }
		)

	}

	render() {
		let registrationSuccess = this.state.registrationSuccess;
		if(registrationSuccess) {
			return(
				<Redirect to = "/user/userdetails" />
			)
		}
		else {
			return (
				<div>
				
					<form  onSubmit = {this.handleSubmit} method = "POST" >

						<div>
							<input placeholder = "First and Last name" className = 'inputText' type = "text" name = "full_name" value = {this.state.full_name} onChange = {this.handleChange}/>
						</div>

						<div>
							<input placeholder = "Email" className = 'inputText' type = "email" name = "email" value = {this.state.email} onChange = {this.handleChange}/>
						</div>
						
						<div>
							<input placeholder = "Password" className = 'inputText' type = "password" name = "password" value = {this.state.password} onChange = {this.handleChange}/>
						</div>

						<div>
							<input placeholder = "Confirm Password" className = 'inputText' type = "password" name = "confirm_password" value = {this.state.confirm_password} onChange = {this.handleChange}/>
						</div>

						<div >
							<button className = "submitButton" >Sign Up!</button>
						</div>
					</form>

				</div>
			);
		}
	}
}

export default Register;