import React, { Component } from 'react';
import { getAllReservations } from '../../../libs/reservation-func.js';
import io from 'socket.io-client';

const TableHead = () => {
  return (
    <thead>
      <tr>
        <th>#</th>
        <th>SIZE</th>
        <th>NAME</th>
        <th>ORDERED?</th>
        <th>STATUS</th>
      </tr>
    </thead>
  );
}

export default class AdminReservationDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { socket: '', reservations: [] };

    this.TableBody = this.TableBody.bind(this);
  }

  TableBody() {
    // loop through table rows
    const cells = this.state.reservations.map((reservation, index) => {
      const { id, group_size, name, order_id, status } = reservation;
      console.log(reservation);
      return (
        <tr key={id}>
          <td>{index + 1}</td>
          <td>{group_size}</td>
          <td>{name}</td>
          <td>{order_id}</td>
          <td>{status}</td>
        </tr>
      )
    });
    return <tbody>{cells}</tbody>;
  };

  componentDidMount() {
    // WEBSOCKET
    // initiate socket and save it in the state
    const socket = io('http://localhost:3001');
    this.setState({ socket });

    // INITIAL RESERVATION DATA
    // get all reservations
    getAllReservations()
      .then(reservations => {
        // save all reso data to state
        this.setState({ reservations });
        console.log(this.state);
      })
      .catch(err => { console.log(err) });

    // SOCKET CONNECTION
    // as customer submits the form, the form data's broadcast back here
    // add the new reservation data into the existing state
    socket.on('connect', () => {
      socket.on('news', newRecord => {
        const {
          customer: { email, name, phone },
          reservation: { customer_id, group_size, id, order_id, placement_time, status }
        } = newRecord;

        const newReservation = { customer_id, id, placement_time, group_size, status, order_id, email, id, name, phone }

        this.setState(oldState => {
          const reservations = [...oldState.reservations, newReservation];
          oldState.reservations = reservations;
          oldState.res_id = id;
          console.log(oldState);
          return oldState;
        });
      });
    });
  }

  render() {
    return (
      <table className='table is-striped is-hoverable is-fullwidth reservation-dashboard'>
        <TableHead />
        <this.TableBody />
      </table>
    );
  }
}
