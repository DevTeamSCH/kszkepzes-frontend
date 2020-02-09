import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Table, Label, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getProfiles, setStatus } from '../../actions/statistics';
import ConfirmModal from '../forms/ConfirmModal';

const role = [
  {
    role: 'Staff',
    text: 'Staff',
    color: 'blue'
  },
  {
    role: 'Student',
    text: 'Elfogadott',
    color: 'green'
  },
  {
    role: 'Applicant',
    text: 'Jelentkezett',
    color: 'orange'
  },
  {
    role: 'Denied',
    text: 'Elutasított',
    color: 'red'
  },
  {
    role: 'no',
    text: 'Nem jelentkezett',
    color: 'red'
  },
];

class Applications extends Component {
  UNSAFE_componentWillMount() {
    this.props.getProfiles();
  }

  renderApplicants(format) {
    return this.props.profiles.map((profile) =>
    { return (
      profile.role === format.role 
      && (profile.signed === true || 
      profile.role === 'Staff') ? 
        <Table.Row key={profile.id}>
          <Table.Cell textAlign='center'>
            <Link to={`applicant/${profile.id}`}>
              {profile.full_name}
            </Link>
          </Table.Cell>
          <Table.Cell textAlign='center'>
          { format.role === 'Staff' ? null :
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
          }
          </Table.Cell>
        </Table.Row>
      : null
      );
    });
  }

  renderNotApplicants(format) {
    return this.props.profiles.map((profile) =>
    { return (
      profile.signed === false && profile.role !== 'Staff'? 
        <Table.Row key={profile.id}>
          <Table.Cell textAlign='center'>
            <Link to={`applicant/${profile.id}`}>
              {profile.full_name}
            </Link>
          </Table.Cell>
          <Table.Cell textAlign='center'>
          { format.role === 'Staff' ? null :
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
          }
          </Table.Cell>
        </Table.Row>
      : null
      );
    });
  }

  renderTable(format) {
    return (
      <Table color='blue' unstackable celled selectable compact>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign='center'>
              <Label color={format.color}>{format.text}</Label>
            </Table.HeaderCell>
            <Table.HeaderCell width={3} />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {format.role === 'no' ? 
            this.renderNotApplicants(format)
          :
            this.renderApplicants(format)
          }
        </Table.Body>
      </Table>
    )
  }
  
  


  render() {
    return (
      <Container
        textAlign='center' style={{paddingTop: '1em', paddingBottom: '5em'}}
      >
        {this.renderTable(role[2])} {/* Applicant */}
        {this.renderTable(role[1])} {/* Student */}
        {this.renderTable(role[0])} {/* Staff */} 
        {this.renderTable(role[3])} {/* Denied */}
        {this.renderTable(role[4])} {/* Not Signed */}
      </Container>
    );
  }
}

const mapStateToProps = ({ trainees: { profiles }, user }) => ({ profiles, user });

export default connect(mapStateToProps, { getProfiles, setStatus })(Applications);
