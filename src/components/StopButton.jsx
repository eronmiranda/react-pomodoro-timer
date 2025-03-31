import StopCircleRoundedIcon from '@mui/icons-material/StopCircleRounded';

function StopButton(props) {
  return (
    <button {...props}>
      <StopCircleRoundedIcon sx={{ fontSize: 95 }} />
    </button>
  )
}

export default StopButton
