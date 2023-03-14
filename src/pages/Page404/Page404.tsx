import { useEffect } from "react"

const Page404 = () => {
	useEffect(() => {
		document.title = "Not found"
	}, [])
	return <>Not found</>
}

export default Page404
