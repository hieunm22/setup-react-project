import "./Home.scss"
import QRCode from "react-qr-code"
import React, {
	useEffect,
	useRef,
	useState
} from "react"

const Home = () => {
	const [text, setText] = useState<string>("")
	const [qRValue, setQRValue] = useState<string>("")
	const txt = useRef<HTMLInputElement>(null)

	useEffect(() => {
		const textBox = txt.current as HTMLInputElement
		textBox.focus()
	}, [])

	const onTextChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value)
	}

	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.code === "Enter") {
			setQRValue(text)
			setText("")
		}
	}

	const onCopy = () => {
		qRValue && navigator.clipboard.writeText(qRValue)
	}

	const title = `"${qRValue}", click to copy to clipboard`

	return (
		<>
			<div className="qr-input-container flex-center">
				<input
					type="text"
					className="qr-input"
					value={text}
					ref={txt}
					onChange={onTextChanged}
					onKeyDown={onKeyDown}
					placeholder="Enter QR content"
				/>
			</div>
			{qRValue && <div className="qr-container flex-center">
				<div className="qr-wrapper" title={title} onClick={onCopy}>
					<QRCode
						value={qRValue}
						size={192}
						bgColor="#ffffff"
						fgColor="#000000"
						level="L"
					/>
				</div>
			</div>}
		</>
	)
}

export default Home
