import PauseCircleRoundedIcon from '@mui/icons-material/PauseCircleRounded';
function PauseButton(props) {
  return (
    <button {...props}>
      <PauseCircleRoundedIcon sx={{ fontSize: 95 }} />
    </button>
  );
}

export default PauseButton;
