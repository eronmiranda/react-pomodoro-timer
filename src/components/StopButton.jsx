import IconButton from '@mui/joy/IconButton';
import StopIcon from '@mui/icons-material/Stop';

function StopButton(props) {
  return (
    <IconButton 
    variant="soft" 
    color="danger" 
    {...props}
    >
      <StopIcon />
    </IconButton>
  )
}

export default StopButton
