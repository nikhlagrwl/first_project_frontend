import React from 'react';

const baseUrl = `https://thedevpartnerbackend.herokuapp.com/`;

class projectPage extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			details: {}
		}
	}

	componentDidMount(){
		let str = this.props.location.pathname;
		let _id = str.match(/(\d+)/)[0];
		console.log(_id);

		const token = localStorage.getItem("token");

		let data = {
			"project_id" : _id
		}

		data = JSON.stringify(data);
		const url = baseUrl + `get_project/`
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
			// console.log(result);
			this.setState({
				details: result,
				isLoaded: true
			})
			console.log(this.state.details);

		},
			(error) => {
				console.log(error);
			}
		)
	}

	render(){
		return(
			<div>
				<div> Hello world </div>
			</div>
		)
	}
}

export default projectPage;