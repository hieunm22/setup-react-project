import "./Home.scss"
import { useEffect, useRef, useState } from "react"

const Home = () => {
	let mediaRecorder: MediaRecorder | null = null
	let chunks: Blob[] = []
	const [stream, setStream] = useState<MediaStream | null>(null)
	const audioRef = useRef<HTMLAudioElement | null>(null)

	useEffect(() => {
		async function init() {
			if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
				const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true })
				setStream(mediaStream)
			} else {
				/* eslint-disable no-alert */
				alert("getUserMedia not supported on your browser!")
				/* eslint-enable no-alert */
			}
		}
		init()
	}, [])


	useEffect(() => {
		if (stream) {
			mediaRecorder = new MediaRecorder(stream)
			mediaRecorder.ondataavailable = (e: BlobEvent) => {
				chunks.push(e.data)
				const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" })
				const audioURL = window.URL.createObjectURL(blob)
				const audio = audioRef.current as HTMLAudioElement
				chunks = []
				audio.src = audioURL
			}
		}
	}, [stream])

	const onRecord = () => {
		if (mediaRecorder && mediaRecorder.state !== "recording") {
			mediaRecorder.start()
		}
	}
	const onStop = () => {
		if (mediaRecorder && mediaRecorder.state !== "inactive") {
			mediaRecorder.stop()
		}
	}

	return (
		<div>
			<button onClick={onRecord}>Record</button>
			<button onClick={onStop}>Stop</button>

			<audio ref={audioRef} controls />
		</div>
	)
}

export default Home
