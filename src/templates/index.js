import React from 'react';
import {Redirect} from 'react-router-dom';
import '../styles/home.css';


class index extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			first_name: 'Nikhil',
			isLoggedIn: true
		};
		this.logout = this.logout.bind(this);

	}

	componentDidMount() {
		const token = localStorage.getItem("token")
		// console.log(typeof(token))
		if(token.length > 0)
		{
			
		}
		else {
			this.setState({
				isLoggedIn: false
			})
		}
	}

	logout() {
		fetch('http://127.0.0.1:8000/logout/')
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

		if(isLoggedIn)
		{
			return (
				<div className = 'full'>
					<header className = 'homeHeader'>
						<div className = 'indexHeader'>
							Welcome {first_name}
						</div>

						<div className = "logoutButton">
							<button onClick = {this.logout}>Logout</button>
						</div>
					</header>
					{/*<div>
						<form onSubmit = {this.handleSubmit} method = "POST">
							<div className = 'form-group col'>
							
							<div >
								<label>Username</label>
								<input disabled className = 'form-control' type = "text" name = "username" value = {this.state.username} onChange = {this.handleChange}/>
							</div>

							<div>
								<label>First Name</label>
								<input className = 'form-control' type = "text" name = "first_name" value = {this.state.first_name}/>
							</div>
							<div>
								<label>Last Name</label>
								<input className = 'form-control' type = "text" name = "last_name" value = {this.state.last_name}/>
							</div>
							<div>
								<label>Phone Number</label>
								<input className = 'form-control' type = "text" name = "phone_no" value = {this.state.phone_no}/>
							</div>
							<div>
								<label>Gender</label>
								<input className = 'form-control' type = "text" name = "gender" value = {this.state.gender}/>
							</div>
							<div>
								<label>Age</label>
								<input className = 'form-control' type = "text" name = "age" value = {this.state.age}/>
							</div>

							<div>
								<button className = 'btn btn-primary' type = "submit">Login</button>
							</div>

							</div>
						</form>
					</div>*/}
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