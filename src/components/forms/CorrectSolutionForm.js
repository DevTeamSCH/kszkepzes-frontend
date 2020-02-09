import React, { Component } from 'react';
import { Modal, Button, Icon, Checkbox, Form, TextArea, Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { correctSolution,
  writeSolution,
  check,
  setchecktrue,
  clearWrite,
  getSolutions,
  getDocuments,
  selectSolution } from '../../actions/homework';

class CorrectSolutionForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  render() {
    const {
      studentFullName, studentId, taskTitle, taskSolutions,
    } = this.props;
    const taskSolutionsProfile =
    taskSolutions.filter(solution => solution.created_by === studentId);
    const relevantSolution = taskSolutionsProfile.slice(-1)[0];
    const relevantDocuments = this.props.homeworks.documents.filter(document =>
      document.solution === relevantSolution.id).filter(document =>
      document.uploaded_by_name === studentFullName);
    const relevantDocument = relevantDocuments.slice(-1)[0];
    let fileLink;
    if (relevantDocument && relevantDocument.file_url) {
      fileLink = `${relevantDocument.file_url}`;
    } else {
      fileLink = null;
    }
    const {
      corrected,
      accepted,
      note,
    } = this.props.correction;
    return (
      <Modal
        open={this.state.showModal}
        closeOnDimmerClick
        onClose={() => this.setState({ showModal: false })}
        trigger={
          <Button
            inverted
            color={this.props.color}
            style={{ marginRight: '1.5em', marginTop: '1.5em' }}
            onClick={() => {
              this.setState({ showModal: true });
              this.props.selectSolution(relevantSolution);
            }}
          >
            {studentFullName}
          </Button>
        }
      >
        <Modal.Header>
          A(z) {taskTitle} nevű feladat {studentFullName} által beadott megoldásának kijavítása:
        </Modal.Header>
        <Modal.Content>
          <Header as='h5'>A megoldás címe:</Header>
          {(relevantDocument && relevantDocument.description)
            ? <p>{relevantDocument.name}</p>
            : <p>Nincs cím.</p>
          }
          <Header as='h5'>A megoldás leírása:</Header>
          {(relevantDocument && relevantDocument.description)
            ? relevantDocument.description.split('\n').map(s => (<p key={Math.random()}>{s}</p>))
            : <p>Nincs leírás.</p>
          }
          <Header as='h5'>A beadott dokumentum:</Header>
          {fileLink
            ? <a href={fileLink} rel='noreferrer noopener' target='_blank'>Fájl letöltése</a>
            : <p>Nincs fájl.</p>
          }
          <Header as='h5'>Kijavítás állapotának változtatása:</Header>
          <Button
            color='orange'
            inverted={corrected}
            onClick={() => this.props.check('corrected')}
          >
            <Checkbox
              label='Nincs kijavítva'
              checked={!corrected}
            />
          </Button>
          <Header as='h5'>Elfogadás/elutasítás:</Header>
          <Button
            color='green'
            inverted={!accepted}
            onClick={() => {
              this.props.check('accepted')
              this.props.setchecktrue('corrected')
            }}
          >
            <Checkbox
              label='Elfogadható'
              checked={accepted}
            />
          </Button>
          <Button
            color='red'
            inverted={accepted}
            onClick={() => this.props.check('accepted')}
          >
            <Checkbox
              label='Nem elfogadható'
              checked={!accepted}
            />
          </Button>
          <Header as='h5'>A feladat megoldásának szöveges értékelése:</Header>
          <Form>
            <Form.Field
              control={TextArea}
              name='note'
              onChange={e => this.props.writeSolution(e)}
              value={note}
              placeholder='Írhatsz megjegyzést a megoldásra...'
            />
          </Form>
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
          <Button
            inverted
            color='green'
            onClick={() => {
              this.props.correctSolution(
                relevantSolution.id,
                corrected,
                accepted,
                note,
              );
              this.setState({ showModal: false });
              this.props.clearWrite();
            }}
          >
            <Icon name='checkmark' /> Beadás
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = ({ homeworks, correction, user }) => ({ homeworks, correction, user });

export default connect(mapStateToProps, {
  correctSolution,
  writeSolution,
  check,
  setchecktrue,
  clearWrite,
  getSolutions,
  getDocuments,
  selectSolution,
})(CorrectSolutionForm);
