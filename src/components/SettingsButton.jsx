import IconButton from '@mui/joy/IconButton';
import Settings from '@mui/icons-material/Settings';

function SettingsButton(props) {
  return (
    <IconButton
      onClick={props.onClick}
      variant="plain"
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        width: '45px',
        height: '45px',
        color: 'white',
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          transform: 'scale(1.1)',
        }
      }}
    >
      <Settings />
    </IconButton>
  );
}

export default SettingsButton;
