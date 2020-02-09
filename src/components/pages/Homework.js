import React, { Component } from 'react';
import {
  Container,
  Header,
  Segment,
  Table,
  Icon,
  Message,
  Button,
  Label,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  getTasks,
  getSolutions,
  getDocuments,
  addTask,
  setSelectedTask,
  deleteTask,
  getProfiles,
} from '../../actions/homework';
import AddTaskForm from '../forms/AddTaskForm';
import AddSolutionForm from '../forms/AddSolutionForm';
import SolutionDetailsForm from '../forms/SolutionDetailsForm';
import EditTaskForm from '../forms/EditTaskForm';
import InfoModal from '../forms/InfoModal';
import ConfirmModal from '../forms/ConfirmModal';

// Display type for the Table Semantic UI component
// {icon} {text} - Displayed for the student for each Task
// {rowstyle} - Table row style (red text, yellow bg, ...)
const displayTypes = {
  can_submit: {
    text: 'Beadható',
    icon: 'send',
    rowstyle: { warning: false, positive: false, negative: false },
  },
  no_submit: {
    text: 'Beadás elmaradt',
    icon: 'warning circle',
    rowstyle: { warning: true, positive: false, negative: false },
  },
  wait_correction: {
    text: 'Javításra vár',
    icon: 'wait',
    rowstyle: { warning: true, positive: false, negative: false },
  },
  no_accept: {
    text: 'Nem elfogadható',
    icon: 'warning circle',
    rowstyle: { warning: false, positive: false, negative: true },
  },
  accepted: {
    text: 'Elfogadva',
    icon: 'checkmark',
    rowstyle: { warning: false, positive: true, negative: false },
  },
};

export const customMessage = (header, text, marginBottom, warning) => (
  <Message
    style={{ marginBottom }}
    icon={warning ? 'warning' : 'info'}
    info
    warning={warning}
    header={header}
    content={text}
  />
);

class Homework extends Component {
  componentDidMount() {
    this.props.getTasks()
    this.props.getProfiles()
    this.props.getSolutions()
    this.props.getDocuments()
  }

  // Returns a table style for the given task
  getTaskDisplayStyle(task) {
    const taskSolution = this.props.homeworks.solutions
      .filter(solution => solution.task === task.id)

    if (taskSolution.length === 0) {
      if (moment().isBefore(task.deadline)) {
        return 'can_submit';
      }

      return 'no_submit';
    }

    if (taskSolution[0].corrected === false) {
      return 'wait_correction';
    }

    if (taskSolution[0].accepted === false) {
      return 'no_accept';
    }

    return 'accepted';
  }

  // Returns table rows for the tasks
  // given parameters separates the active/inactive tasks and normal/staff users
  renderTaskList(active, staff) {
    const { user, homeworks } = this.props;
    const profileSolutions = homeworks.solutions
      .filter(solution => solution.created_by === user.id);
    

    // Normal user
    if (!staff) {
      return homeworks.tasks
        .filter(task => moment().isBefore(task.deadline) === active)
        .map(task => (
          // Style
          <Table.Row
            key={task.id}
            warning={
            displayTypes[this.getTaskDisplayStyle(task)].rowstyle.warning
          }
            positive={
            displayTypes[this.getTaskDisplayStyle(task)].rowstyle.positive
          }
            negative={
            displayTypes[this.getTaskDisplayStyle(task)].rowstyle.negative
          }
          >
            {/* Form component */}
            <Table.Cell>
              <AddSolutionForm
                taskid={task.id}
                tasktitle={task.title}
                taskdesc={task.text}
                multiple={this.getTaskDisplayStyle(task) !== 'can_submit'}
                disabled={moment().isAfter(task.deadline)}
              />
            </Table.Cell>
            {/* Deadline Date */}
            <Table.Cell>
              {moment(task.deadline).format('YYYY. MM. DD. HH:mm')}
            </Table.Cell>

            <Table.Cell>
              <Label color={
                  displayTypes[this.getTaskDisplayStyle(task)].rowstyle.positive ? 
                    'green' 
                  : moment().isAfter(task.deadline) ? 'red' 
                  : displayTypes[this.getTaskDisplayStyle(task)].rowstyle.negative ? 'red': null}>
                {task.bits} bit 
              </Label>
            </Table.Cell>
            {/* Status (Javításra vár, ...) */}
            <Table.Cell>
              <Icon name={displayTypes[this.getTaskDisplayStyle(task)].icon} />{' '}
              {displayTypes[this.getTaskDisplayStyle(task)].text}
              {profileSolutions.filter(solution => solution.task === task.id)
                && profileSolutions.filter(solution => solution.task === task.id).slice(-1)[0]
                && profileSolutions.filter(solution => solution.task === task.id).slice(-1)[0].note
                ?
                  <div>
                    <InfoModal
                      button={
                        <button id='tasknote'>
                          (Megjegyzés <Icon name='external' />)
                        </button>
                      }
                      title='Megjegyzés a feladathoz'
                      content={profileSolutions.filter(solution =>
                      solution.task === task.id).slice(-1)[0].note}
                      onAccept={() => {}}
                    />
                  </div>
                : ''
              }
            </Table.Cell>
          </Table.Row>
        ));
    }

    // Staff 

    const deleteButton = (
      <Button
        inverted
        style={{ marginRight: '2em' }}
        color='red'
      >
        <Icon name='x' /> Törlés
      </Button>
    );

    return this.props.homeworks.tasks
      .filter(task => moment().isBefore(task.deadline) === active)
      .map(task => (
        <Table.Row
          key={task.id}
          warning={
          displayTypes[this.getTaskDisplayStyle(task)].rowstyle.warning
        }
          positive={
          displayTypes[this.getTaskDisplayStyle(task)].rowstyle.positive
        }
          negative={
          displayTypes[this.getTaskDisplayStyle(task)].rowstyle.negative
        }
        >
          {/* Form */}
          <Table.Cell>
            <SolutionDetailsForm
              taskid={task.id}
              tasktitle={task.title}
              taskdesc={task.text}
            />
          </Table.Cell>
          {/* Deadline Date */}
          <Table.Cell>
            {moment(task.deadline).format('YYYY. MM. DD. HH:mm')}
          </Table.Cell>
          {/* Bits */}
          <Table.Cell>
              <Label color={null}>
                {task.bits} bit 
              </Label>
            </Table.Cell>
          {/* Admin buttons */}
          <Table.Cell>
            <EditTaskForm onClick={() => this.props.setSelectedTask(task)} />
            <ConfirmModal
              button={deleteButton}
              text='törlöd a kiválaszott feladatot a már beadott megoldásokkal együtt'
              onAccept={() => this.props.deleteTask(task)}
            />
          </Table.Cell>
        </Table.Row>
      ));
  }

  // Active/Inactive tasks table
  renderHomeworksTable(active, staff) {
    let tableColor = 'green';
    let marginBottom = '0em';

    if (!active) {
      tableColor = 'blue';
      marginBottom = '3em';
    }

    if (!staff) {
      return (
        <Table color={tableColor} fixed style={{ marginBottom }}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <Icon circular name='home' />
                Feladat megnevezése / beadása
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Icon circular name='calendar' />
                Beadási határidő
              </Table.HeaderCell>
              <Table.HeaderCell width={2}>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <Icon circular name='tasks' />
                Állapot
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{this.renderTaskList(active, staff)}</Table.Body>
        </Table>
      );
    }
    return (
      <Table color={tableColor} fixed style={{ marginBottom }}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <Icon circular name='home' />
              Feladat megnevezése / Beadások állapota
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Icon circular name='calendar' />
              Beadási határidő
            </Table.HeaderCell>
            <Table.HeaderCell width={2}>
            </Table.HeaderCell>
            <Table.HeaderCell>
              <Icon circular name='edit' />
              Módosítás / Törlés
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{this.renderTaskList(active, staff)}</Table.Body>
      </Table>
    );
  }

  // Headers and stuff around the Tables
  renderHomeworks(active, staff) {
    let noTask = false;
    let noTaskText = 'Jelenleg nincs egyetlen beadható feladat sem. ';
    let marginBottom = '0em';
    const noTaskHeaderText = 'Nincs feladat.';
    let headerText = 'Aktív feladatok';

    if (staff) {
      headerText = 'Aktív feladatok kijavítása, módosítása vagy törlése';
    }

    if (this.props.homeworks.tasks.filter(task =>
          moment().isBefore(task.deadline) === active).length === 0
    ) {
      noTask = true;
    }

    if (!active) {
      if (staff) {
        headerText = 'Lejárt határidejű feladatok kijavítása, módosítása vagy törlése';
      } else {
        headerText = 'Lejárt határidejű feladatok';
      }
      noTaskText = 'Jelenleg nincs egyetlen lejárt határidejű feladat sem.';
      marginBottom = '3em';
    }

    return (
      <Segment style={{ padding: '0 0 2em 0' }} vertical basic>
        <Container>
          <Header
            as='h1'
            dividing
            content={
              headerText
            }
            style={{
                fontSize: '2em',
                fontWeight: 'normal',
                marginBottom: 0,
                marginTop: '0.5em',
              }}
          />
          {noTask ? 
            customMessage(noTaskHeaderText, noTaskText, marginBottom, false)
            : 
            <div>
              {this.renderHomeworksTable(active, staff)}
            </div>
          }
          {!active && !staff ?
              <Header
                as='h3'
                content={
                  <div >
                    Jelenlegi bitjeid száma:
                    <Label color='green' size='large'>
                      {this.props.user.bits} bit 
                    </Label>
                  </div>
                }
                style={{
                    fontWeight: 'normal',
                    marginTop: '0.5em',
                    marginBottom: '1em'
                  }}
                textAlign='right'
              />
              : null
            }
        </Container>
      </Segment>
    );
  }

  render() {
    const { user } = this.props;

    if (user.role === 'Student') {
      return (
        <div style={{paddingBottom: '2em'}}>
          {this.renderHomeworks(true, false)}
          {this.renderHomeworks(false, false)}
        </div>
      );
    } else if (user.role === 'Staff') {
      return (
        <div style={{paddingBottom: '2em'}}>
          <Segment style={{ padding: '0 0 2em 0' }} vertical basic>
            <Container>
              <Header dividing as='h1'
                content='Új házi feladat létrehozása'
                style={{
                      fontSize: '2em',
                      fontWeight: 'normal',
                      marginBottom: '0.5em',
                      marginTop: '0.5em',
                    }}
              />
              <Button.Group>
                <AddTaskForm />
              </Button.Group>
            </Container>
          </Segment>
          {this.renderHomeworks(true, true)}
          {this.renderHomeworks(false, true)}
        </div>
      );
    }
    return null; // ¯\_(ツ)_/¯
  }
}

const mapStateToProps = ({ selectedTask, homeworks, user }) => ({ selectedTask, homeworks, user });

export default connect(
  mapStateToProps,
  {
    getTasks,
    setSelectedTask,
    getSolutions,
    getDocuments,
    addTask,
    deleteTask,
    getProfiles,
  },
)(Homework);
