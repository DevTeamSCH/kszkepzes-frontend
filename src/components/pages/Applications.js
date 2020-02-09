import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, Label, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getProfiles, setStatus } from '../../actions/statistics';
import ConfirmModal from '../forms/ConfirmModal';

class Applications extends Component {
  UNSAFE_componentWillMount() {
    this.props.getProfiles();
  }

  renderApplicants() {
    return this.props.profiles.map((profile) =>
    { return (
      <Table.Row>
        <Table.Cell textAlign='center'>
          <Link to={`applicant/${profile.id}`}>
            {profile.full_name}
          </Link>
        </Table.Cell>
        { profile.signed ?
          <Table.Cell textAlign='center'>
            { profile.role === 'Student' ?
              <Label color='green'>Elfogadva</Label>
              :
              null
            }
            { profile.role === 'Staff' ?
              <Label color='blue'>Staff</Label>
              :
              null
            }
            { profile.role === 'Applicant' ?
              <Label color='orange'>Jelentkezett</Label>
              :
              null
            }
            { profile.role === 'Denied' ?
              <Label color='red'>Elutasítva</Label>
              :
              null
            }
          </Table.Cell>
          :
          <Table.Cell textAlign='center'>
            <Label color='red'>Nem jelentkezett</Label>
          </Table.Cell>
        }
        <Table.Cell textAlign='center'>
        <ConfirmModal
          button = {<Button
            color='blue'
            size='tiny'
          >
          ADD STAFF STATUS
        </Button>}
        text='staff jogot adsz neki'
        onAccept={() => this.props.setStatus(profile.id, 'Staff')}
        />
        </Table.Cell>
      </Table.Row>
    );
    });
  }

  render() {
    return (
      <Container
        textAlign='center' style={{paddingTop: '1em', paddingBottom: '5em'}}
      >
        <Table color='blue' unstackable celled selectable compact>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Jelentkezettek</Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>Jelentkezés státusza:</Table.HeaderCell>
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

export default connect(mapStateToProps, { getProfiles, setStatus })(Applications);
