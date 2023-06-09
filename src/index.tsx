import "@fortawesome/fontawesome-free/css/all.css"
import ReactDOM from "react-dom"
import { Provider } from "redux-zero/react"
import App from "./App"
// import registerServiceWorker from './registerServiceWorker'
import store from "./store"

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
