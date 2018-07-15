import React, { Component } from 'react'

export default class Register extends Component {
  render() {
    return (
      <div>
       	<form>

       		<input type="text" placeholder="email" name="email" />
       		<input type="password" placeholder="hasło" name="password" />
       		<input type="text" placeholder="imię" name="name" />
       		<input type="text" placeholder="nazwisko" name="surname" />


       		<input type="submit" />

       	</form>
      </div>
    )
  }
}
