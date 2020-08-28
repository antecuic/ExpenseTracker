import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuOpenOutlinedIcon from '@material-ui/icons/MenuOpenOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > span': {
      margin: theme.spacing(2),
    },
    position: 'absolute',
    top: '1rem',
    left: '2rem',
    cursor: 'pointer',
    zIndex: '97',
    color: '#edf2ef'
  },
}));

const MenuIcon = ({ clicked }) => {
  const classes = useStyles();

  return (
    <div className={classes.root} onClick={clicked}>
     
      <MenuOpenOutlinedIcon style={{fontSize: 50}}/>
     
    </div>
  );
}

export default MenuIcon