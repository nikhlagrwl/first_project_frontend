import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import '../styles/home.css';

class userDetailsForm extends Component{

	constructor(props){
		super(props);
		this.state = {
			first_name: '',
			last_name: '',
			email: '',
			country: '',
			state: '',
			city: '',
			college_name: '',
			contact_no: '',
			gender: '',
			selectedSkills: [],
			skillList: [],
			currSkill: '',
			isLoggedIn: true
		}
	this.handleChange = this.handleChange.bind(this);
	this.handleSubmit = this.handleSubmit.bind(this);
	this.logout = this.logout.bind(this);
	this.addSkill = this.addSkill.bind(this);
	}

	logout(){
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

	componentDidMount(){
		const token = localStorage.getItem('token');

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

			fetch('http://localhost:8000/get_user_info/', {
				method: "GET",
				headers: {
					'content-type': 'application/json',
					'Authorization': "Token " + token
				}
			})
			.then(result => result.json())
			.then( (result) => {
				console.log(result);

				for (let obj in result){
					this.setState({
						[obj]: result[obj]
					})
				}
			},
				(error) => {
					console.log(error);
				}
			)
		}
		else{
			this.setState({
				isLoggedIn: false
			})
		}
	}

	handleChange(e){
		let target = e.target;

		this.setState({
			[target.name]: target.value
		})

	}

	addSkill(event) {
		event.preventDefault();
		console.log("adding skill");

		let skillList = this.state.skillList;
		let index = -1;

		skillList.map( obj => {
			if(obj.skill_name === this.state.currSkill) {
				index = skillList.indexOf(obj);
			}

		})

		console.log(index);
		skillList.splice(index, 1);

		console.log(skillList)





	}

	handleSubmit(e){
		e.preventDefault();

		const token = localStorage.getItem('token');

		let data = {
			country: this.state.country,
			state: this.state.state,
			city: this.state.city,
			college_name: this.state.college_name,
			contact_no: this.state.contact_no,
			gender: this.state.gender

		}

		data = JSON.stringify(data);

		fetch('http://localhost:8000/save_user_info/', {
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
			return(
				<Redirect to = "/index" />
			)
		}
		return(
			<div className = 'full'>

				<header className = 'homeHeader'>
						<div className = 'indexHeader'>
							Welcome Nikhil
						</div>

						<div className = "logoutButton">
							<button onClick = {this.logout}>Logout</button>
						</div>
				</header>

				<div className = "detailsForm">
					<form className = 'loginForm' method = "POST">

						<div>
							<label className = 'labelText'>First Name</label>
							<input className = 'inputText' placeholder = "First Name" type = "text" name = "first_name" value = {this.state.first_name} onChange = {this.handleChange}/>
						</div>

						<div>
							<label className = 'labelText'>Last Name</label>
							<input className = 'inputText' placeholder = "Last Name" type = "text" name = "last_name" value = {this.state.last_name} onChange = {this.handleChange}/>
						</div>

						<div>
							<label className = 'labelText'>Email</label>
							<input className = 'inputText' placeholder = "Email" disabled type = "email" name = "email" value = {this.state.email} onChange = {this.handleChange}/>
						</div>

						<div>
							<label className = 'labelText'>Country</label>
							<input className = 'inputText' placeholder = "Country" type = "text" name = "country" value = {this.state.country} onChange = {this.handleChange}/>
						</div>

						<div>
							<label className = 'labelText'>State</label>
							<input className = 'inputText' placeholder = "State" type = "text" name = "state" value = {this.state.state} onChange = {this.handleChange}/>
						</div>

						<div>
							<label className = 'labelText'>City</label>
							<input className = 'inputText' placeholder = "City" type = "text" name = "city" value = {this.state.city} onChange = {this.handleChange}/>
						</div>

						<div>
							<label className = 'labelText'>College Name</label>
							<input className = 'inputText' placeholder = "College Name" type = "text" name = "college_name" value = {this.state.college_name} onChange = {this.handleChange}/>
						</div>

						<div>
							<label className = 'labelText'>Contact Number</label>
							<input className = 'inputText' placeholder = "Contact Number" type = "text" name = "contact_no" value = {this.state.contact_no} onChange = {this.handleChange}/>
						</div>

						<div>
							<label className = 'labelText'>Gender</label>
							<input className = 'inputText' placeholder = "Gender" type = "text" name = "gender" value = {this.state.gender} onChange = {this.handleChange}/>
						</div>

						<div>
							<label className = 'labelText'>Skills</label>
							<input type = "text" className = "inputText" list = "skills" value = {this.state.currSkill} name = "currSkill" onChange = {this.handleChange}/>
								<datalist id = "skills" onSubmit = {() => console.log("click")}>
									{(this.state.currSkill)? this.state.skillList.map((obj) => <option key = {obj.skill_id} value = {obj.skill_name} onClick = {() => console.log("click")}/> ) : null}
								</datalist>
							<button onClick = {this.addSkill} >Add Skill</button>
						</div>

						<div>
							<button className = "logoutButton" onClick = {this.handleSubmit}>Submit</button>
						</div>

					</form>
				</div>
			</div>
		)
	}

}

export default userDetailsForm;