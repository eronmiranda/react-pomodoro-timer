import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
function NextButton(props) {
  return (
    <button {...props}>
      <SkipNextRoundedIcon sx={{ fontSize: 95 }} />
    </button>
  );
}

export default NextButton;
