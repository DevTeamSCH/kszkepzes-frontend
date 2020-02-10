import React, { Component } from 'react';
import { Container, Form, Dropdown, Divider, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { textChange, submitRegistration, groupChange } from '../../actions';
import { getDeadline } from '../../actions/auth'
import HiddenForm from '../forms/HiddenForm'

const options = [
  { key: 'DT', text: 'DevTeam', value: 'DT' },
  { key: 'NET', text: 'NETeam', value: 'NET' },
  { key: 'ST', text: 'SecurITeam', value: 'ST' },
  { key: 'SYS', text: 'SysAdmin', value: 'SYS' },
  { key: 'HAT', text: 'Hallgatói Tudásbázis', value: 'HAT' },
];

class Profile extends Component {
  UNSAFE_componentWillMount() {
    this.props.getDeadline()
    if (!this.props.id) {
      this.props.history.push('/home');
    }
  }

  render() {
    const {
      nick, groups, motivationAbout, motivationProfession, 
      motivationExercise, signed, id, deadline, messageBefore, 
      messageAfter
    } = this.props;
    const endDate = new Date(deadline)
    let canEdit = Date.now()<endDate
    return (
      <Container
        style={{
          marginTop: '1em',
        }}
      >
        {canEdit ?
        <Segment inverted color='red' tertiary>
          <p style={{ fontSize: '1.3em' }} dangerouslySetInnerHTML={{__html: messageBefore}} />
        </Segment>
        :
        <Segment inverted color='red' tertiary>
          <p style={{ fontSize: '1.3em' }} dangerouslySetInnerHTML={{__html: messageAfter}} />
        </Segment>}

        <Form>
          {canEdit ? 
            <Form.Input
            fluid
            name='nick'
            label='Becenév'
            onChange={e => this.props.textChange(e)}
            placeholder='Becenév'
            value={nick}
            /> :
            <HiddenForm fontWeight='bold' label='Becenév' value={nick} />
          }
          <Divider horizontal>Motiváció</Divider>
          {canEdit ? 
          <Form.TextArea
            rows={10}
            name='motivationAbout'
            label='Mesélj nekünk egy kicsit magadról. Milyen szakmai vagy más eredményeket értél el, amikre büszke vagy?'
            onChange={e => this.props.textChange(e)}
            placeholder='Mesélj nekünk egy kicsit magadról. Milyen szakmai vagy más eredményeket értél el, amikre büszke vagy?'
            value={motivationAbout}
          /> :
            <HiddenForm 
              fontWeight='bold'
              label='Mesélj nekünk egy kicsit magadról. Milyen szakmai vagy más eredményeket értél el, amikre büszke vagy?' 
              value={motivationAbout} />
          }
          <Divider horizontal />
          {canEdit ? 
          <Form.TextArea
            rows={10}
            label='Mit vársz el a képzéstől, miért szeretnél rá jelentkezni, szerinted mire tudod majd használni az itt megszerzett tudást? Mit szeretnél elérni a szakmádban?'
            name='motivationProfession'
            onChange={e => this.props.textChange(e)}
            placeholder='Mit vársz el a képzéstől, miért szeretnél rá jelentkezni, szerinted mire tudod majd használni az itt megszerzett tudást? Mit szeretnél elérni a szakmádban?'
            value={motivationProfession}
          /> :
            <HiddenForm
              fontWeight='bold'
              label='Mit vársz el a képzéstől, miért szeretnél rá jelentkezni, szerinted mire tudod majd használni az itt megszerzett tudást? Mit szeretnél elérni a szakmádban?' 
              value={motivationProfession} />
          }

          <Divider horizontal />
          {canEdit ?
          <Form.TextArea
            rows={10}
            name='motivationExercise'
            onChange={e => this.props.textChange(e)}
            placeholder=''
            label={
              <div>
                <b>Alább találsz néhány elgondolkodtató kérdést, megoldandó feladatot.
                  A kérdések és feladatok elkészítése opcionális,
                  nem titkolt célunk ezzel a lelkesedés felmérése.
                  A válaszokat a kérdések alatti szövegdobozba várjuk.
                </b>
                <ul>
                  <li>
                  Szeretnéd kedvenc tantárgyad vik.wiki oldalát elérni,
                  de szomorúan látod, hogy az oldal nem jön be.
                  A Steam pedig hibátlanul megy a háttérben és az emailek is megérkeznek...
                  Szobatársadnak pont megvan a vik.wiki szerverének IP-címe.
                  Csodálkozva látod, hogy a böngésző címsorába írva eléred a kiszolgáló webszervert.
                  Mi lehet a baj?
                  </li>
                  <br />
                  <li>
                  Két előadás közti szünetben úgy döntesz,
                  hogy laptopoddal az index.hu tech cikkeit fogod görgetni.
                  Ám az oldal nem válaszol, a hiba okát megpróbálod kideríteni.
                  Ekkor veszed észre, hogy az alábbiakat sem éred el:
                  sze.hu, 444.hu, corvinus.hu, startlap.hu.
                  Ugyanakkor a Facebook, a Gmail, a YouTube, de még az egyetemi
                  oldalak többsége is működik. Szerinted mi lehet a hiba oka?
                  </li>
                  <br />
                  <li>
                  Találsz egy értelmetlen szöveget egy honlapon (például: <a href='https://ujonc.kszk.bme.hu/zebra.html'>https://ujonc.kszk.bme.hu/zebra.html</a>), de feltűnik, hogy két egyenlőségjellel fejeződik be. Nyomozz, s a végeredményt (amit találtál) írd ide!
                  </li>
                  <br />
                  <li>
                  A <b>ujonc.kszk.bme.hu</b> címen elérhető gépen
                  fut egy szolgáltatás az alapértelmezett <b>5432</b> porton
                  (használd az előző feladatban kapott adatokat).
                  Belépés után keresd meg a feladat megoldását!
                  </li>
                </ul>
              </div>
            }
            value={motivationExercise}
          /> :
            <HiddenForm
              fontWeight='normal'
              label={
                <div>
                  <b>Alább találsz néhány elgondolkodtató kérdést, megoldandó feladatot.
                    A kérdések és feladatok elkészítése opcionális,
                    nem titkolt célunk ezzel a lelkesedés felmérése.
                    A válaszokat a kérdések alatti szövegdobozba várjuk.
                  </b>
                  <ul>
                    <li>
                    Szeretnéd kedvenc tantárgyad vik.wiki oldalát elérni,
                    de szomorúan látod, hogy az oldal nem jön be.
                    A Steam pedig hibátlanul megy a háttérben és az emailek is megérkeznek...
                    Szobatársadnak pont megvan a vik.wiki szerverének IP-címe.
                    Csodálkozva látod, hogy a böngésző címsorába írva eléred a kiszolgáló webszervert.
                    Mi lehet a baj?
                    </li>
                    <li>
                    Két előadás közti szünetben úgy döntesz,
                    hogy laptopoddal az index.hu tech cikkeit fogod görgetni.
                    Ám az oldal nem válaszol, a hiba okát megpróbálod kideríteni.
                    Ekkor veszed észre, hogy az alábbiakat sem éred el:
                    sze.hu, 444.hu, corvinus.hu, startlap.hu.
                    Ugyanakkor a Facebook, a Gmail, a YouTube, de még az egyetemi
                    oldalak többsége is működik. Szerinted mi lehet a hiba oka?
                    </li>
                    <li>
                    Találsz egy értelmetlen szöveget egy honlapon (például: <a href='http://kszkepzes18.sch.bme.hu/zebra.html'>http://kszkepzes18.sch.bme.hu/zebra.html</a>), de feltűnik, hogy két egyenlőségjellel fejeződik be. Nyomozz, s a végeredményt (amit találtál) írd ide!
                    </li>
                    <li>
                    A <b>kszkepzes18.sch.bme.hu</b> címen elérhető gépen
                    fut egy szolgáltatás az alapértelmezett <b>5432</b> porton
                    (használd az előző feladatban kapott adatokat).
                    Belépés után keresd meg a feladat megoldását!
                    </li>
                  </ul>
                </div>
              }
              value={motivationExercise} />
          }

          <Divider horizontal>Érdekelődés</Divider>
          <Dropdown
            fluid
            multiple
            selection
            placeholder='DevTeam, ...'
            onChange={(_, v) => this.props.groupChange(v.value)}
            options={options}
            defaultValue={groups}
            disabled={!canEdit}
          />
          <br />
          <Form.Checkbox required
            name='signed'
            label='Szeretnék a képzés során emaileket kapni és jelentkezni a KSZKépzésre'
            onChange={(_, v) =>
              this.props.textChange({ target: { name: v.name, value: v.checked } })
            }
            checked={signed}
            readOnly={!canEdit}
            style={ !canEdit ? { marginBottom: '5em' } : null}
          />
          {canEdit ? 
          <Form.Button
            primary
            style={{ marginBottom: '5em' }} disabled={!signed}
            onClick={() => this.props.submitRegistration({
              nick, motivationAbout, motivationProfession, motivationExercise, signed, groups, id,
            })}
          >
            Mentés
          </Form.Button>
          : '' }
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = ({
  user: {
    nick, groups, motivationAbout, motivationProfession, 
    motivationExercise, signed, id, deadline, messageBefore, 
    messageAfter
  }
}) => ({
  nick,
  groups,
  motivationAbout,
  motivationProfession,
  motivationExercise,
  signed,
  id,
  deadline,
  messageBefore,
  messageAfter
});

export default connect(mapStateToProps, { textChange, submitRegistration, groupChange, getDeadline })(Profile);
