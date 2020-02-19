import React, { Component } from 'react';
import { Modal, Button, Form, Input, TextArea, Icon, Header, Segment, Divider, Dimmer, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addSolution, writeSolution, writeSolutionFile, addDocument, clearWrite } from '../../actions/homework';
import './Forms.css';
import ConfirmModal from '../forms/ConfirmModal';
import { customMessage } from '../pages/Homework';
import {
  getDocuments,
  getSolutions,
} from '../../actions/homework';

const allowedFileTypes = [
  'image/jpeg',
  'image/png',
  'application/x-zip-compressed',
];

// in megabytes
const maxFileSize = 50;

class AddSolutionForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      uploadState: true,
    };
  }

  render() {
    const {
      name, description, file
    } = this.props.newSolution

    const task = this.props.taskid;

    const thisTaskSolution = this.props.homeworks.solutions
      .filter(solution => solution.task === task)
    const thisTaskDocument = this.props.homeworks.documents
      .filter(document => document.solution === thisTaskSolution[0]?.id)

    const lastName = thisTaskDocument[0]?.name
    const lastDesc = thisTaskDocument[0]?.description
    const lastFile = thisTaskDocument[0]?.file_url

    const corrected = false;
    const accepted = false;
    const sentences = this.props.taskdesc.split('\n');
    const note = '';
    const disabledText = 'A határidő lejárt, további beadás nem lehetséges.';

    return (
      <Modal
        open={this.state.showModal}
        closeOnDimmerClick
        onClose={() => this.setState({ showModal: false })}
        trigger={
          <button
            id='task'
            onClick={() => { 
              this.setState({ showModal: true });
            }}
          >
            <Icon name='external' />
            {this.props.tasktitle}
          </button>
        }
      >
        <Modal.Header>
          {this.props.multiple ? 'Másik megoldás' : 'Megoldás'} beadása a(z) {this.props.tasktitle} nevű feladathoz:
        </Modal.Header>
        <Modal.Content>
          <Modal.Description style={{ marginBottom: '2em' }}>
            <Header as='h5'>Feladat leírása:</Header>
            {sentences.map(s => (<p key={Math.random()}>{s}</p>))}
          </Modal.Description>
          {this.props.disabled ?
            <div>
              {lastName ?
                <div style={{paddingBottom: '1em'}}>
                  <div style={{ marginBottom: '1em', fontWeight: 'bold' }}>Legutóbbi megoldásod:</div>
                  <Segment attached='top'>
                    <h5 style={{paddingBottom: '0.4em'}}>Cím:</h5>
                    {lastName}
                  </Segment>
                  <Segment attached>
                    <h5 style={{paddingBottom: '0.4em'}}>Leírás:</h5>
                    {lastDesc}
                  </Segment>
                  <Segment attached='bottom'>
                    <h5>Beadott fájl:</h5>
                    {lastFile ? 
                      <a href={lastFile} rel='noreferrer noopener' target='_blank'>Fájl letöltése</a>
                    :
                      <span>-</span>
                    }
                  </Segment>
                </div>
              :
                customMessage(disabledText, undefined, undefined, this.props.disabled)
              }
            </div>
            
            :
            <Form>
              {lastName ?
                <div style={{paddingBottom: '1em'}}>
                  <div style={{ fontWeight: 'bold' }}>Legutóbbi megoldásod:</div>
                  <Segment attached='top'>
                    <h5 style={{paddingBottom: '0.4em'}}>Cím:</h5>
                    {lastName}
                  </Segment>
                  <Segment attached>
                    <h5 style={{paddingBottom: '0.4em'}}>Leírás:</h5>
                    {lastDesc}
                  </Segment>
                  <Segment attached='bottom'>
                    <h5>Beadott fájl:</h5>
                    {lastFile ? 
                      <a href={lastFile} rel='noreferrer noopener' target='_blank'>Fájl letöltése</a>
                    :
                      <span>-</span>
                    }
                  </Segment>
                </div>
                
                :
                null
              }
              <Divider />
              <Form.Field
                control={Input}
                label='Megoldás címe:'
                name='name'
                onChange={e => this.props.writeSolution(e)}
                value={name}
                placeholder='Adj meg egy címet a beadandó megoldásodnak...'
              />
              <Form.Field
                control={TextArea}
                label='Megoldás leírása:'
                name='description'
                onChange={e => this.props.writeSolution(e)}
                value={description}
                placeholder='Add meg a megoldás leírását...'
              />
              <Form.Field>
                <label>Fájl (Megengedett fájltípusok: png, jpeg, jpg, zip. Maximum 50 MB.):</label>
                <Input type='file' onChange={e => this.props.writeSolutionFile(e)} />
              </Form.Field>
            </Form>
          }
        </Modal.Content>
        <Modal.Actions>
          <Button
            inverted
            color='red'
            onClick={() => {
              this.setState({ showModal: false });
              this.props.clearWrite();
            }}
          >
            <Icon name='remove' /> Mégse
          </Button>
          {this.props.multiple
            ?
              <ConfirmModal
                button={
                  <Button
                    disabled={
                      !name || !description ||
                      (!file ? false : !allowedFileTypes.includes(file.type) ||
                      file.size > (maxFileSize) * (1024 ** 2))
                    }
                    inverted
                    color='green'
                  >
                    <Icon name='checkmark' /> 
                    Beadás 
                    {this.state.uploadState? 
                      null
                    :
                    <Dimmer active>
                      <Loader size='massive'/>
                    </Dimmer>}
                  </Button>
                }
                text='beadod az új megoldást, ami felülírja az előzőt'
                onAccept={() => {
                  this.setState({
                    uploadState: false
                  })
                  this.props.addSolution({
                    task, accepted, corrected, note, name, description, file,
                    }).then( (response)=> {
                      this.setState({
                        uploadState: true,
                        showModal: false
                      })
                      this.props.clearWrite();
                    }, (response)=> {
                      alert('Sikertelen feltöltés!')
                    });
                  }
                }
              />
            :
              <Button
                inverted
                color='green'
                disabled={
                  !name || !description ||
                  (!file ? false : !allowedFileTypes.includes(file.type) ||
                  file.size > (maxFileSize) * (1024 ** 2))
                }
                onClick={() => {
                this.props.addSolution({
                  task, accepted, corrected, note, name, description, file,
                  });
                this.setState({ showModal: false });
                this.props.clearWrite();
                }
              }
              >
                <Icon name='checkmark' /> Beadás
              </Button>
          }
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = ({ newSolution, homeworks, user }) => ({ newSolution, homeworks, user });

export default connect(mapStateToProps, {
  addSolution,
  writeSolution,
  writeSolutionFile,
  addDocument,
  getDocuments,
  clearWrite,
  getSolutions,
})(AddSolutionForm);
