import {
    useState,
    useEffect,
    useRef
  } from "react"
  // @ts-ignore
  import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min.js"
  // @ts-ignore
  import RegionsPlugin from "wavesurfer.js/dist/plugin/wavesurfer.regions.min.js"
  import WaveSurfer from "wavesurfer.js"

  const AudioWaveform = (props: any) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const timelineRef = useRef<HTMLDivElement>(null)

    const [wavesurferObj, setWavesurferObj] = useState<WaveSurfer | null>(null)
    // to keep track whether audio is currently playing or not
    const [playing, setPlaying] = useState<boolean>(true)
    // duration is used to set the default region of selection for trimming the audio
    const [duration, setDuration] = useState<number>(0)
    useEffect(() => {
      if (containerRef.current && !wavesurferObj) {
        const timePlugin = TimelinePlugin.create({
          container: "#wave-timeline"
        })
        const regionPlugin = RegionsPlugin.create()
        const plugins = [timePlugin, regionPlugin]
        const wave = WaveSurfer.create({
          barGap: 2,
          barRadius: 3,
          barWidth: 3,
          // backend: "MediaElement",
          cursorColor: "#567FFF",
          cursorWidth: 3,
          container: "#waveform",
          plugins,
          // responsive: true,
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
      <section className="waveform-container">
        <div ref={containerRef} id="waveform" />
        <div ref={timelineRef} id="wave-timeline" />
        <div className="all-controls">
          <div className="left-container">
            <button
              title="play/pause"
              className="controls"
              onClick={handlePlayPause}
            >
              {playing ? (
                <i className="material-icons">pause</i>
              ) : (
                <i className="material-icons">play_arrow</i>
              )}
            </button>
          </div>
        </div>
      </section>
    )
  }

  export default AudioWaveform
