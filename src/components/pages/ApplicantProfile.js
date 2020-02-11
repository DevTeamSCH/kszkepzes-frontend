import React, { Component } from 'react';
import { Container, Header, Item, Button, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { getSelectedProfile, setStatus } from '../../actions/statistics';
import ConfirmModal from '../forms/ConfirmModal';

class ApplicantProfile extends Component {
  UNSAFE_componentWillMount() {
    this.props.getSelectedProfile(this.props.match.params.id);
  }

  render() {
    const { id, signed, role, full_name, nick, motivation_about, motivation_exercise, motivation_profession }
    = this.props.selectedProfile;
    return (
      <Container style={{ paddingTop: '3em', paddingBottom: '6em' }}>
        <Item>
          <Item.Content>
            <Container textAlign='center'>
              <Header as='h2'>{full_name}</Header>
              <Item.Meta>{nick}</Item.Meta>
            </Container>
            <Item.Description>
              <Container textAlign='justified' style={{ padding: '1em' }}>
                <Header as='h3'>Magamról, eddigi tevékenységem:</Header>
                <p>{motivation_about
                  ?.split ('\n').map ((item, i) => <div key={i}>{item}</div>)}
                </p>
                <Header as='h3'>Szakmai motiváció:</Header>
                <p>{motivation_profession
                  ?.split ('\n').map ((item, i) => <div key={i}>{item}</div>)}
                </p>
                <Header as='h3'>Feladatok megoldása:</Header>
                <p>{motivation_exercise
                  ?.split ('\n').map ((item, i) => <div key={i}>{item}</div>)}
                </p>
              </Container>
              <Container textAlign='center' style={{ padding: '1em' }}>
                <Header as='h3'>Státusz:</Header>
                { signed ?
                  <div>
                    { role === 'Student' ?
                      <Label color='green' size='huge'>Elfogadva</Label>
                        :
                        null
                      }
                    { role === 'Staff' ?
                      <Label color='blue' size='huge'>Staff</Label>
                        :
                        null
                      }
                    { role === 'Applicant' ?
                      <Label color='orange' size='huge'>Jelentkezett</Label>
                        :
                        null
                      }
                    { role === 'Denied' ?
                      <Label color='red' size='huge'>Elutasítva</Label>
                        :
                        null
                      }
                  </div>
                  :
                  <Label color='red' size='huge'>Nem jelentkezett</Label>
                }
              </Container>
            </Item.Description>
          </Item.Content>
        </Item>
        { signed && role !== 'Staff' ?
          <Container textAlign='center'>
            <ConfirmModal 
              button={
                <Button 
                  color='green'
                >Jelentkezés elfogadása
                </Button>}
              text='elfogadod a jelentkezést'
              onAccept={() => this.props.setStatus(id, 'Student')}
            />
            <ConfirmModal 
              button={
                <Button 
                  color='red'
                >Jelentkezés elutasítása
                </Button>}
              text='elutasítod a jelentkezést'
              onAccept={() => this.props.setStatus(id, 'Denied')}
            />
          </Container>
          :
          null
        }
      </Container>
    );
  }
}

const mapStateToProps = ({ trainees: { selectedProfile } }) => ({ selectedProfile });

export default connect(mapStateToProps, { getSelectedProfile, setStatus })(ApplicantProfile);
