import React from 'react';
import {Link} from 'react-router-dom';
import projectPage from './projectPage';

const baseUrl = `https://crudapp01.herokuapp.com/`;

class ProjectComponent extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			details: {},
			isLoaded: false
		}
	}

	componentDidMount(){
		const token = localStorage.getItem("token");

		let data = {
			"project_id" : this.props.name
		}

		data = JSON.stringify(data);

		const url = baseUrl + `get_project/`;
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
			this.setState({
				details: result,
				isLoaded: true
			})
		},
			(error) => {
				console.log(error);
			}
		)

	}

	render() {

		let _id = this.state.details.project_id;
		let _desc = this.state.details.project_description;
		let _title = this.state.details.project_title;
		let _category = this.state.details.project_category;
		let _link = (_category + _title + _id);


		return(
			<div>
			
				<h1> {_category} </h1>
				<h2> Owner </h2>
				<div>
					<span> Apply By </span>
					<span> Start By </span>
					<span> Duration </span>
				</div>
				<h3> Project Title </h3>
				<Link to = {"/project/details/" + _link}> View Details </Link>

			</div>

		);
	}
}

export default ProjectComponent;