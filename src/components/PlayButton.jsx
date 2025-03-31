import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
function PlayButton(props) {
  return (
    <button {...props}>
      <PlayCircleRoundedIcon sx={{ fontSize: 95 }} />
    </button>
  );
}

export default PlayButton;
