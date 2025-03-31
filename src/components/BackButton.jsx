import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

function BackButton(props) {
  return (
    <button {...props} className={'with-text'}>
      <ArrowBackRoundedIcon fontSize="large" />
      Back
    </button>
  );
}

export default BackButton;
