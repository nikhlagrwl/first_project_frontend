import React from 'react';
import '../styles/home.css';
import {HashRouter as Router, Redirect} from 'react-router-dom';
import Register from './register.js';
import Login from './login.js';


class Home extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			password: '',
			username: '',
			isNewUser: false,
			isLoggedIn: false
		};

	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	this.changeMode = this.changeMode.bind(this);

	}



	handleChange(e) {
		let target = e.target;

		this.setState({
			[target.name]: target.value
		});
	}


	changeMode(event) {
		event.preventDefault();
		this.setState({
			isNewUser: !this.state.isNewUser
		})
	}


	componentDidMount() {
		let token = localStorage.getItem("token");

		if( token !== null)
		{
			this.setState({
				isLoggedIn: true
			})
			
		}
		
	}

	handleSubmit(e) {

	}


	render() {
		let isNewUser = this.state.isNewUser;
		let isLoggedIn = this.state.isLoggedIn;
		if(isLoggedIn)
		{
			return(
				<Redirect to = "/index" />
			)
		}
		else
		{
			return(
				<Router>

					<div className = "full">
						<header className = 'homeHeader'>
							<div className = 'headerText'>The Dev Partner</div>
						</header>

						<div className = "outerDiv">

							<div className = "innerDiv">
								<div className = "headlineDiv">
									Welcome to my CRUD Application<br />
									Here you can Signup, Login, Store<br/> and update your data!!!
								</div>
							</div>

							<div  className = 'innerDiv'>
								<div className = "innerFormDiv">

									<div className = 'formHead'>
									{ !isNewUser ?
										<div className = 'modeTxt'>
											Login
										</div>
										:
										<div className = 'modeTxt'>
											Signup
										</div>
									}
									</div>

									<div className = 'mainForm'>
										{!isNewUser ? <Login /> : <Register />}
									</div>

									<div className = 'afterForm'>
									{ !isNewUser ?
										<div>
											<button className = "changeButton" onClick = {this.changeMode}>
												Don't have an account ?
											</button>
											<button className = "changeButton" onClick = {this.changeMode}>
												Forgot Password
											</button>
										</div>
										:
										<button className = "changeButton" onClick = {this.changeMode}>
											Already a member
										</button>
									}
									</div>

								</div>
							</div>

						</div>
						
					</div>

				</Router>
			);
		}
	}
}

export default Home;