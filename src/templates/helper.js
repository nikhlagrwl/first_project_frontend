async function getRequest(child, method, token){

	let url = `https://thedevpartnerbackend.herokuapp.com/` + child;
	fetch(url, {
	method: method,
	headers: {
		'Content-Type': 'application/json',
		'Authorization' : "Token "+token
	}
	})
	.then(result => result.json())
	.then( (result) => {
		return {"status": "pass", "result": result.data};
	},
	(error) => {
		return {"status": "failed", "result": error};
	})
}

export default getRequest;