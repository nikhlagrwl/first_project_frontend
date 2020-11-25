import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import '../styles/home.css';

const baseUrl = `https://crudapp01.herokuapp.com/`;

class createProject extends Component {
	constructor(props){
		super(props);
		this.state = {
			isLoggedIn: true,
			title: '',
			category: '',
			description: '',
			start_date: '',
			end_date: ''
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		const token = localStorage.getItem("token");
		if(token !== null) {

		}
		else {
			this.setState({
				isLoggedIn: false
			})
		}
	}

	handleChange(event) {
		let target = event.target;

		this.setState({
			[target.name]: target.value
		})
		console.log(this.state.start_date)
	}

	handleSubmit(event) {
		event.preventDefault();

		const token = localStorage.getItem("token");

		let data = {
			"details": {
				"project_category": this.state.category,
				"project_title": this.state.title,
				"project_description": this.state.description
			},
			"skills": []
		}

		data = JSON.stringify(data);

		const url = baseUrl + `create_new_project/`;
		fetch(url, {
			method: "POST",
			headers: {
				'content-type': 'application/json',
				'Authorization': "Token " + token
			},
			body: data
		})
		.then(result => result.json())
		.then(result => {
			console.log(result)
			if(result['response'] === "success")
				alert("Changes saved successfully")
		},
			(error) => {
					console.log(error);
			}
		)
	}



	render(){
		let isLoggedIn = this.state.isLoggedIn;
		if(!isLoggedIn) {
			return (
				<Redirect to ="/" />
			);
		}
		else {
		return(

			<div className = "full">

				<header className = 'homeHeader'>
					<div className = 'indexHeader'>
						Welcome Nikhil
					</div>

					<div >
						<button className = "logoutButton" onClick = {this.logout}>Logout</button>
					</div>
				</header>

				<div>
					<form method = "POST" onSubmit = {this.handleSubmit} className = "loginForm">
						
						<div>
							<label>Project Category</label>
							<input className = "inputText" type = "text" name = "category" value = {this.state.category} onChange = {this.handleChange}/>
						</div>

						<div>
							<label>Project Title</label>
							<input className = "inputText" type = "text" name = "title" value = {this.state.title} onChange = {this.handleChange}/>
						</div>						

						<div>
							<label>Project Description</label>
							<input className = "inputText" type = "text" name = "description" value = {this.state.description} onChange = {this.handleChange}/>
						</div>

						<div>
							<label>Start Date</label>
							<input className = "inputText" type = "date" name = "start_date" value = {this.state.start_date} onChange = {this.handleChange}/>
						</div>

						<div>
							<label>End Date</label>
							<input className = "inputText" type = "text" name = "end_date" value = {this.state.end_date} onChange = {this.handleChange}/>
						</div>

						<div>
							<button className = "logoutButton">Submit</button>
						</div>

					</form>
				</div>


			</div>

		)
		}
	}
}

export default createProject;