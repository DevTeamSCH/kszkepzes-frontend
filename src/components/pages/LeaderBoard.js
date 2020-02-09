import React, { Component } from 'react';
import { Container, Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getTrainees } from '../../actions/statistics';

class LeaderBoard extends Component {
  UNSAFE_componentWillMount() {
    this.props.getTrainees();
  }

  // Every event rendered
  renderTraineeBits() {
    return this.props.trainees.sort( (a,b) => {
      return (Number(b.homework_bits) + b.events_visited)
        - (Number(a.homework_bits) + a.events_visited)
    }).map((trainee) => { 
      return (
        trainee.role === 'Student' ?
          <Table.Row key={trainee.nick}>
            <Table.Cell textAlign='center'>
              {trainee.full_name} 
            </Table.Cell>
            <Table.Cell textAlign='center' >
              {trainee.events_visited}
            </Table.Cell>
            <Table.Cell textAlign='center'>
              {Number(trainee.homework_bits)}
            </Table.Cell>
            <Table.Cell textAlign='center'>
              {Number(trainee.homework_bits) + trainee.events_visited}
            </Table.Cell>
          </Table.Row>
        : null
      )
    })
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
              <Table.HeaderCell textAlign='center'>
                Jelenlét
              </Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>
                Bitek
              </Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>
                Szumma
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.trainees ? 
              this.renderTraineeBits() 
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

const mapStateToProps = ({ trainees: { trainees }, user }) => ({ trainees, user });

export default connect(mapStateToProps, { getTrainees })(LeaderBoard);
