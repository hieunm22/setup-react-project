import * as API from "./API"

function handleErrorResponse(response: any) {
	if (response.message) {
		let json: any = ""
		try {
			json = JSON.parse(response.message)
		} catch (error) {
			json = response.message
		}
		const error = `Error ${response.status || "unknown"} - ${json.status_message ?? json}`

		return {
			error
		}
	}
}
