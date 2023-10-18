import classnames from "classnames"

const ControlButton = (props: any) => {
  const {
    playing
  } = props

  const title = playing ? "Pause" : "Play"
  const cls = classnames({
    "fas fa-pause": playing,
    "fas fa-play": !playing,
    "control": true
  })

  return (
    <i className={cls} title={title} />
  )
}

export default ControlButton
