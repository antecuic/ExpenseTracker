import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    transition: 'all .2s ease',
    '&:hover': {
      transform: 'scale(1.04)'
    }
  },
}));

const LogoutButton = ({ clicked }) => {
  const classes = useStyles();

  return (
    <div className={classes.root} onClick={clicked}>
      <IconButton aria-label="logout" >
        <ExitToAppOutlinedIcon style={{fontSize: '45px', color: '#f97068'}}/>
      </IconButton>
    </div>
  );
}
export default LogoutButton