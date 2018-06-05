import React from 'react';
import Button from '../../components/button/button'
import sendMessage from '../../services/comunicationManager';

export default class Popup extends React.Component {
  setGreen() {
    sendMessage('change-color', { color: 'green' })
  }

  setRed() {
    sendMessage('change-color', { color: 'red' })
  }

  render() {
    return <div>
        <Button label='green' action={this.setGreen}></Button>
        <Button label='red' action={this.setRed}></Button>
      </div>;
  }
}