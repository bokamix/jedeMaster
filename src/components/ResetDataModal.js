import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    background: '#202334',
    border: '2px solid #000',
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ResetDataModal({handleClose, open, clearData}) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);


  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">UWAGA</h2>
          <p id="simple-modal-description">
        Na pewno chcesz usunąć wszystkie swoje dane? Nie będzie możliwości odwrotu.
          </p>
        <button onClick={clearData}>Tak, usuń wszysztko.</button>
        </div>
      </Modal>
    </div>
  );
}