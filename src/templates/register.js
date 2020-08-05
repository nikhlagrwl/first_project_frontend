import React from 'react';
import '../styles/home.css';

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

		fetch('http://127.0.0.1:8000/register/', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: val
		})
		.then( result => result.json())
		.then( (result) => {
			console.log(result);
		},
		 (error) => {
		 	console.log(error);
		 }
		)

	}

	render() {
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

export default Register;