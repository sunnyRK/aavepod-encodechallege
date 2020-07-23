import React from 'react';
import Button from '@material-ui/core/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';

import JoinDialog from './JoinDialog/JoinDialogContainer';

const Landing = ({ onJoinClick, isJoinDialogOpen, handleState }) => {
  const podInfo = [
    {
      header: 'Total Contract Balances',
      value: '234',
    },
    {
      header: 'Estimated Prize',
      value: '234',
    },
    {
      header: 'Your Investment',
      value: '20',
    },
    {
      header: 'Joining Amount',
      value: '20',
    },
  ];

  const countdownInfo = [
    {
      value: '2',
      label: 'Days',
    },
    {
      value: '12',
      label: 'Hours',
    },
    {
      value: '36',
      label: 'Minutes',
    },
    {
      value: '57',
      label: 'Seconds',
    },
  ];
  return (
    <div className="landing">
      <JoinDialog
        openDialog={isJoinDialogOpen}
        handleState={handleState}
      />
      <div className="pod">
        <h4 className="pod-name">Pod Name</h4>
        <div className="join-pod">
          <div className="pod-progressbar">
            <ProgressBar now={60} />
            <div className="total-investor">02/10</div>
          </div>
          <div className="join-button">
            <Button
              className="join-pod-button"
              disableRipple
              disableElevation
              onClick={() => onJoinClick()}
            >
              Join
            </Button>
          </div>
        </div>
        <div className="stats">
          {
            podInfo.map((pod) => (
              <div className="total-contract-balance stats-info">
                <div className="stats-header">{pod.header}</div>
                <h2 className="stats-value">{`$${pod.value}`}</h2>
              </div>
            ))
          }
        </div>
        <div className="timer">
          {
            countdownInfo.map((countdown) => (
              <div className="days-countdown countdown">
                <h1 className="countdown-value">{countdown.value}</h1>
                <div className="countdown-footer">{countdown.label}</div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Landing;
