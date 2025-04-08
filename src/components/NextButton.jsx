import IconButton from '@mui/joy/IconButton';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';

function NextButton(props) {
  return (
    <IconButton
      {...props}
      variant='plain'
      sx={{
        fontSize: '1.2rem',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: 'white',
        width: '45px',
        height: '45px',
        borderRadius: '10px',
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
        },
        '&:active': {
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
        },
        ...props.sx
      }} 
    >
      <SkipNextRoundedIcon />
    </IconButton>
  );
}

export default NextButton;
