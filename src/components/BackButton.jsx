import IconButton from '@mui/joy/IconButton';
import ArrowBack from '@mui/icons-material/ArrowBack';

function BackButton(props) {
  return (
    <IconButton
      onClick={props.onClick}
      variant='plain'
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        width: '45px',
        height: '45px',
        color: 'white',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          transform: 'scale(1.1)',
        },
        '&:active': {
          transform: 'translateY(4px)',
        }
      }}
    >
      <ArrowBack />
    </IconButton>
  );
}

export default BackButton;
