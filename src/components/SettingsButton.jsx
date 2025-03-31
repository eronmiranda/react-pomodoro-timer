import SettingsIcon from '@mui/icons-material/Settings';

function SettingsButton(props) {
  return (
    <button {...props} className={'with-text'}>
      <SettingsIcon fontSize="large" />
      Settings
    </button>
  );
}

export default SettingsButton;
