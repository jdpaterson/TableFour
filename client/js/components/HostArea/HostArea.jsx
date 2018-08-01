import React, { Component } from 'react';
import Navbar from '../Navbar.jsx';
import AdminReservationDashboard from './AdminReservationDashboard.jsx';

export default class AdminArea extends Component {
  render() {
    return (
      <div className='container is-desktop'>
        <header>
          <Navbar />
        </header>
        <br />
        <main>
          <div className='tile is-ancestor top-tile'>
            <div className='tile is-parent'>
              <article className='tile is-child box'>
                <div className='content'>
                  <h3 className='title is-4'>RESERVATION STATUS</h3>
                  <AdminReservationDashboard />
                </div>
              </article>
            </div>
          </div>
        </main>
        <footer></footer>
      </div>
    );
  }
}