import Button from '@mui/joy/Button';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

function BackButton(props) {
  return (
    <Button 
      size="lg" 
      variant="soft" 
      startDecorator={<ArrowBackRoundedIcon />} 
      color="warning"
      sx={{
        "--Button-gap": "5px",
      }}
      {...props} >
      Back
    </Button>
  );
}

export default BackButton;
