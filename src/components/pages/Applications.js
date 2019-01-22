import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, Icon, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getProfiles, setStaffStatus } from '../../actions/statistics';

class Applications extends Component {
  componentWillMount() {
    this.props.getProfiles();
  }

  renderApplicants() {
    return this.props.profiles.map((profile) =>
    { return (
      <Table.Row>
        <Table.Cell>
          <Link to={`applicant/${profile.id}`}>
            {profile.full_name}
          </Link>
        </Table.Cell>
        <Table.Cell textAlign='center'>
          { profile.role === 'Student' ?
            <Icon color='green' name='checkmark' />
            :
              profile.role === 'Staff' ?
              <strong>Staff</strong>
              :
              <Icon color='red' name='cancel' />
          }
        </Table.Cell>
        <Table.Cell>
          <Button
            onClick={() => this.props.setStaffStatus(profile.id)}
            color='blue'
            size='tiny'
          >
          ADD STAFF STATUS
          </Button>
        </Table.Cell>
      </Table.Row>
    );
    });
  }

  render() {
    return (
      <Container
        textAlign='center'
        style={{
          padding: '80px'
        }}
      >
        <Table color='blue' celled selectable compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Jelentkezettek</Table.HeaderCell>
              <Table.HeaderCell>Jelentkezés elfogadva:</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.renderApplicants()}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

const mapStateToProps = ({ trainees: { profiles }, user }) => ({ profiles, user });

export default connect(mapStateToProps, { getProfiles, setStaffStatus })(Applications);
