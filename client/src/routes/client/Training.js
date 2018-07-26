import React, { Component } from 'react';
import Navbar from '../../components/Navbar';
import TrainingForm from '../../components/TrainingForm';

export default class Training extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <TrainingForm />
      </div>
    )
  }
}
