import Button from '@mui/joy/Button';
import SettingsIcon from '@mui/icons-material/Settings';

function SettingsButton(props) {
  return (
    <Button 
      size="md" 
      variant="solid" 
      startDecorator={<SettingsIcon />} 
      color="warning"
      sx={{
        "--Button-gap": "5px"
      }} 
      {...props} >
      Settings
    </Button>
  );
}

export default SettingsButton;
