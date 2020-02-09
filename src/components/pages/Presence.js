import React, { Component } from 'react';
import { Container, Table, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getTrainees, getStaffEvents } from '../../actions/statistics';

class Presence extends Component {
  UNSAFE_componentWillMount() {
    this.props.getTrainees();
    this.props.getStaffEvents();
  }

  // Every event with visit status in table cells
  renderVisitedStatus(trainee) {
    return (this.props.events.map((event) => {
      if (event.visitors.includes(trainee.id)) {
        return (
          <Table.Cell textAlign='center' key={Math.random()}>
            <Icon color='green' name='checkmark' />
          </Table.Cell>
        );
      }
      return (
        <Table.Cell textAlign='center' key={Math.random()}>
          <Icon color='red' name='cancel' />
        </Table.Cell>
      );
    }));
  }

  // Every event rendered
  renderTraineesWithEvents() {
    return this.props.trainees.map((trainee) =>
    { return (
      trainee.role === 'Student' ? 
        <Table.Row key={Math.random()}>
          <Table.Cell textAlign='center'>
            {trainee.full_name}
          </Table.Cell>
          {this.renderVisitedStatus(trainee)}
        </Table.Row>
      : null
    );
    });
  }

  // Column for each event
  renderTableHeaderEvents() {
    return (this.props.events.map(event => {
      return (
      <Table.HeaderCell textAlign='center' key={event.id}>
        {event.name}
      </Table.HeaderCell>
      )
    }));
  }

  render() {
    return (
      <Container textAlign='center' style={{overflowX: 'scroll'}}>
        <Table color='blue' unstackable celled selectable compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign='center'>
                Képződők
              </Table.HeaderCell>
              { this.renderTableHeaderEvents() }
            </Table.Row>
          </Table.Header>
          <Table.Body>

            {this.props.trainees ? 
              this.renderTraineesWithEvents() 
            : 
              <Table.Row>
                <Table.Cell>
                  Nincsenek képződők
                </Table.Cell>
              </Table.Row>
            }
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

const mapStateToProps = ({ trainees: { trainees }, events: { events }, user }) => ({ trainees, events, user });

export default connect(mapStateToProps, { getTrainees, getStaffEvents })(Presence);
