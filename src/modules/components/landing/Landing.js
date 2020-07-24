import React from 'react';
import Button from '@material-ui/core/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import DaiIcon from '../../../assets/icons/dai.svg';

import JoinDialog from './JoinDialog/JoinDialogContainer';
import RedeemDialog from './RedeemDialog/RedeemDilogContainer';

const Landing = ({ isJoinDialogOpen, handleState, isRedeemDialogOpen }) => {
  const podInfo = [
    {
      header: 'Total Contract Balances',
      value: '234',
    },
    {
      header: 'Your Investment',
      value: '0',
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
      <RedeemDialog
        openDialog={isRedeemDialogOpen}
        handleState={handleState}
      />
      <div className="pod">
        <h3 className="pod-name">Pod Name</h3>
        <div className="join-pod">
          <div className="pod-progressbar">
            <ProgressBar now={60} />
            <div className="total-investor">02/10</div>
          </div>
          <div className="button-wrapper">
            <Button
              className="button-content join-pod-button"
              disableRipple
              disableElevation
              onClick={() => handleState({ isJoinDialogOpen: true })}
            >
              Join
            </Button>
            <Button
              className="button-content redeem-button"
              disableRipple
              disableElevation
              onClick={() => handleState({ isRedeemDialogOpen: true })}
            >
              Redeem
            </Button>
          </div>
        </div>
        <div className="stats">
          <div className="stats-info-header">
            <div className="estimated-info">
              <div className="estimated-header">Estimated Prize</div>
              <h1 className="estimated-value">
                <img src={DaiIcon} className="coin-icon" alt="coin" />
                &nbsp;234.098789
              </h1>
            </div>
          </div>
          <div className="stats-info-footer">
            {
              podInfo.map((pod) => (
                <div className="total-contract-balance stats-info">
                  <div className="stats-header">{pod.header}</div>
                  <h2 className="stats-value">{`$${pod.value}`}</h2>
                </div>
              ))
            }
          </div>
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
      <div className="right-content">
        <div className="create-pod button-wrapper">
          <h4 className="header">Create Pod</h4>
          <Button
            className="button-style create-button"
            disableRipple
            disableElevation
            // onClick={() => onJoinClick()}
          >
            Create
          </Button>
        </div>
        <div className="total-winning">
          <h4 className="header">Your Total Winning</h4>
          <h4 className="value">$400</h4>
        </div>
        <div className="last-pod-winner">
          <h4 className="header">Last Pod Details</h4>
          <div className="winner-info">
            <div className="label">Pod Name</div>
            <h6 className="value">PodName</h6>
            <div className="label">Prize Amount</div>
            <h6 className="value">$234</h6>
            <div className="label">Winner Address</div>
            <h6 className="value">0x55E73A69B2315A6e7192af118705079Eb1dB2184</h6>
          </div>
        </div>
        <div className="disburse-button button-wrapper">
          <Button
            className="button-style"
            disableRipple
            disableElevation
            onClick={() => handleState({ isDisburseDialogOpen: true })}
          >
            Disburse
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
