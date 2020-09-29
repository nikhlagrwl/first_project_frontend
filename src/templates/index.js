import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import '../styles/home.css';


class index extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			first_name: 'Nikhil',
			isLoggedIn: true,
			skillList: null,
			isLoaded: false,
			ownerProject: null,
			appliedProject: null
		};
		this.logout = this.logout.bind(this);

	}

	componentDidMount() {
		const token = localStorage.getItem("token");
		if(token !== null)
		{
			fetch('http://localhost:8000/get_owner_project/', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization' : "Token "+token
			}
			})
			.then(result => result.json())
			.then( (result) => {
				console.log(result.data);
				this.setState({
					ownerProject: result.data,
					isLoaded: true
				})
			},
			(error) => {
				console.log(error);
			})
		}
		else {
			this.setState({
				isLoggedIn: false
			})
		}
	}

	logout() {
		fetch('http://localhost:8000/logout/')
		.then(result => result.json())
		.then( (result) => {
			if(result.response === 'logout success') {
				localStorage.removeItem("token");
				this.setState({
					isLoggedIn: false
				});
			}
		},
		(error) => {
			console.log(error);
		})
	}

	render() {
		let isLoggedIn = this.state.isLoggedIn;
		let first_name = this.state.first_name;
		let skillList = this.state.skillList;
		let isLoaded = this.state.isLoaded;
		let ownerProject = this.state.ownerProject;

		if(isLoggedIn)
		{
			return (
				<div className = 'full'>
					<header className = 'homeHeader'>
						<div className = 'indexHeader'>
							Welcome {first_name}
						</div>

						<div >
							<button className = "logoutButton" onClick = {this.logout}>Logout</button>
						</div>
					</header>


					<div>

						<h1>My Published Projects</h1>
						<div>
						{ isLoaded ? ownerProject.map(obj => (
							<div>
								<div>
									{obj.project_title}
								</div>
								<a href = "/"+{obj.project_id}>View Details</a>
							</div>
							)) : <div>Loading</div> }
						</div>

					</div>
					
				</div>
			);
		}
		else
		{
			return (
				<Redirect to ="/" />
			);
		}
	}

}

export default index;