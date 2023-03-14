import wretch from "wretch"
// import FormDataAddon from "wretch/addons/formData"
import QueryStringAddon from "wretch/addons/queryString"

const CLIENT_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL
const key = process.env.REACT_APP_API_KEY
const secret = process.env.REACT_APP_SECRET_KEY
const headers = {
	"Access-Control-Allow-Origin": "*",
	"Content-Type": "text/plain",
	Accept: "application/json"
}

const request = wretch(CLIENT_BASE_URL, { mode: "no-cors" })
	.addon(QueryStringAddon)
	// .addon(FormDataAddon)
	.headers(headers)

const EP = {
	// EP = end points
	getAll: "api-client/scores/live.json"
}

export const getAll = () => request.url(EP.getAll)
            // .headers({ "Access-Control-Allow-Origin": "*" })
            .query({ key, secret })
            .get()
            .json(handleGetAll)
            .catch(handleError)

// ----------------------------------------------------------------------------------

const handleGetAll = (response: any) => {
	return response
}

const handleError = (error: any) => ({ error })
