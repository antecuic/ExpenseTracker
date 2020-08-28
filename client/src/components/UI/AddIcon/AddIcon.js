import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({
  root: {
    // '& > span': {
    //   margin: theme.spacing(2),
    // },
    position: 'absolute',
    bottom: '2rem',
    right: '2rem',
    cursor: 'pointer'

  },
}));

const AddIcon = ({ clicked }) => {
  const classes = useStyles();

  return (
    <div className={classes.root} onClick={clicked}>
     
      <Icon style={{ color: "#57c4e5", fontSize: 50 }}>add_circle</Icon>
     
    </div>
  );
}

export default AddIcon