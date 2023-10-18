import {
  useState,
  useEffect,
  useRef
} from "react"
import WaveSurfer from "wavesurfer.js"
import ControlButton from "./ControlButton"

const AudioWaveform = (props: any) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const [wavesurferObj, setWavesurferObj] = useState<WaveSurfer | null>(null)
  // to keep track whether audio is currently playing or not
  const [playing, setPlaying] = useState<boolean>(true)
  // duration is used to set the default region of selection for trimming the audio
  const [duration, setDuration] = useState<number>(0)
  useEffect(() => {
    if (containerRef.current && !wavesurferObj) {
      const wave = WaveSurfer.create({
        barGap: 2,
        barRadius: 3,
        barWidth: 3,
        // backend: "MediaElement",
        cursorColor: "#567FFF",
        height: 32,
        cursorWidth: 3,
        container: "#waveform",
        responsive: true,
        waveColor: "#567FFF",
        xhr: {
          cache: "default",
          mode: "cors",
          method: "GET",
          credentials: "include"
        }
      })
      setWavesurferObj(wave)
    }
  }, [containerRef])

  useEffect(() => {
    if (wavesurferObj) {
      wavesurferObj.load(props.audioURL)
      wavesurferObj.on("ready", () => {
        wavesurferObj.play()
        setDuration(Math.floor(wavesurferObj.getDuration())) // set the duration in local state
      })

      wavesurferObj.on("play", () => {
        setPlaying(true)
      })

      wavesurferObj.on("finish", () => {
        setPlaying(false)
      })

      // wavesurferObj.on("region-updated", region => {
      //   const regions = region.wavesurfer.regions.list
      //   const keys = Object.keys(regions)
      //   if (keys.length > 1) {
      //     regions[keys[0]].remove()
      //   }
      // })
    }
  }, [wavesurferObj])

  const handlePlayPause = () => {
    wavesurferObj && wavesurferObj.playPause()
    setPlaying(!playing)
  }

  // const handleReload = e => {
  // 	// stop will return the audio to 0s, then play it again
  // 	wavesurferObj.stop()
  // 	wavesurferObj.play()
  // 	setPlaying(true) // to toggle the play/pause button icon
  // }

  // const handleVolumeSlider = e => {
  // 	setVolume(e.target.value)
  // }

  // const handleZoomSlider = e => {
  // 	setZoom(e.target.value)
  // }

  return (
    <div className="waveform-container">
      <div ref={containerRef} id="waveform">
      <div className="wave-control-container" onClick={handlePlayPause}>
        <ControlButton playing={playing} />
      </div>

      </div>
    </div>
  )
}

export default AudioWaveform
