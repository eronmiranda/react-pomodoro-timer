import IconButton from '@mui/joy/IconButton';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';

function NextButton(props) {
  return (
    <IconButton 
      variant="soft" 
      color="primary" 
      {...props}
    >
      <SkipNextRoundedIcon />
    </IconButton>
  );
}

export default NextButton;
