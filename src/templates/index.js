import React from 'react';
import {Redirect} from 'react-router-dom';
import '../styles/home.css';


class index extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			first_name: 'Nikhil',
			isLoggedIn: true,
			skillList: null,
			isLoaded: false
		};
		this.logout = this.logout.bind(this);

	}

	componentDidMount() {
		const token = localStorage.getItem("token");
		// const csrf = localStorage.getItem("csrftoken");
		// console.log(csrf)
		// console.log(typeof(token))
		if(token !== null)
		{
			fetch('http://localhost:8000/get_skill_list/', {
			method: 'GET',
			headers: {
				'Authorization' : "Token "+token
			}
			})
			.then(result => result.json())
			.then( (result) => {
				console.log(result);
				this.setState({
					skillList: result,
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
					{ isLoaded ? skillList.map(obj => (
						<li key = {obj.skill_id}>{obj.skill_name}
						</li>
						)) : null}
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