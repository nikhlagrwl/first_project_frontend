import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';
import '../styles/home.css';
import ProjectComponent from './projectComponent';
import getRequest from './helper';

const baseUrl = `https://thedevpartnerbackend.herokuapp.com/`;

class index extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			first_name: 'Nikhil',
			isLoggedIn: true,
			skillList: null,
			isLoaded_1: false,
			isLoaded_2: false,
			ownerProject: null,
			appliedProject: null
		};
		this.logout = this.logout.bind(this);

	}

	componentDidMount() {
		const token = localStorage.getItem("token");
		if(token !== null)
		{


			const url_1 = baseUrl + `get_owner_project/`;
			const url_2 = baseUrl + `get_applied_projects/`

			fetch(url_1, {
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
					isLoaded_1: true
				})
			},
			(error) => {
				console.log(error);
			})


			fetch(url_2, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization' : "Token "+token
			}
			})
			.then(result => result.json())
			.then( (result) => {
				// console.log(result.data);
				this.setState({
					appliedProject: result.data,
					isLoaded_2: true
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
		const url = baseUrl + `logout/`;
		fetch(url)
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
		let isLoaded_1 = this.state.isLoaded_1;
		let isLoaded_2 = this.state.isLoaded_2;
		let ownerProject = this.state.ownerProject;
		let appliedProject = this.state.appliedProject;

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


					<div className = "projectList">
						<div className = "topic">
							<h1>My Published Projects</h1>
						</div>
						<div>
							<ul className = "listItem">
								{ isLoaded_1 ? (ownerProject.length > 0 ? (ownerProject.map(obj => (
									<li className = "projectComponent" key = {obj.project_id}>
										<ProjectComponent name = {obj.project_id} />
									</li>
									))) : <div>You haven't published any projects</div>) : <div>Loading...</div> }
							</ul>
						</div>

					</div>
					<div className = "projectList">
						<div>
							<h1>My applications</h1>
						</div>
						<div>
						<ul className = "listItem">
								{ isLoaded_2 ? (appliedProject.length > 0 ? (appliedProject.map(obj => (
									<li className = "projectComponent" key = {obj.project_id}>
										<ProjectComponent name = {obj.project_id} />
									</li>
									))) : <div>You haven't applied to any projects</div>) : <div>Loading...</div> }
							</ul>

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