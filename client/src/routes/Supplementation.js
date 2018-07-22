import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import SupplementationForm from '../components/SupplementationForm';

export default class Supplementation extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <SupplementationForm />
      </div>
    )
  }
}
