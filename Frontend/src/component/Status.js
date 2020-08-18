import React from 'react';
import Switch from '@material-ui/core/Switch';

export default function CheckedStatus() {
  const [check, setCheck] = React.useState({
    checked: true,
  });

  const handleChange = (event) => {
    setCheck({ ...check, [event.target.name]: event.target.checked });
  };

  return (
    <div>
      <Switch
        checked={check.checkedA}
        onChange={handleChange}
        name="checkedA"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
    </div>
  );
}
