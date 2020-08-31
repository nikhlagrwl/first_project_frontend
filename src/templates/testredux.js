const redux = require('redux');
const createStore = redux.createStore;


const initialState = {
	counter: 0
}




// Reducer

const reducer = (state = initialState, action) => {
	if(action.type === "INCREMENT")
	{
		return{
			...state,
			counter: state.counter + 1
		};
	}

}

// State
	const store = createStore(reducer);

// Subscription
	store.subscribe(() => {
		console.log("[subscribe]", store.getState());
	})

// Dispatch
	store.dispatch({type: "INCREMENT"});
	store.dispatch({type: "INCREMENT"});
	store.dispatch({type: "INCREMENT"});
	store.dispatch({type: "INCREMENT"});
	store.dispatch({type: "INCREMENT"});
