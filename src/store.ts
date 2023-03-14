import createStore from "redux-zero"
import { ReduxState } from "./types/Redux"

const initialState: ReduxState = {
	searchResults: [],
	detail: null,
	error: null,
	query: "",
	currentPage: 1
}

const store = createStore(initialState)

export default store
