import AudioWaveform from "../../components/WaveForm/AudioWaveform"
import "./Home.scss"
import { ChangeEvent, useState } from "react"

const Home = () => {
	const [url, setUrl] = useState<string>("")

	const onFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files && e.target.files[0] as Blob
		const newUrl = URL.createObjectURL(file as Blob)
		setUrl(newUrl)
	}

	const showFileSelect = () => {
		setUrl("")
	}
	if (url) {
		return (
			<>
				<AudioWaveform audioURL={url} />
				<input type="button" value="Select other file" onClick={showFileSelect} />
			</>
		)
	}
	return (
		<>
			<input type="file" onChange={onFileSelect} />
		</>
	)
}

export default Home
