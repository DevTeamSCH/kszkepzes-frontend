import React, { Component } from 'react';
import {
  Button,
  Container,
  Header,
  Icon,
  Segment,
  Image,
  Divider,
  Responsive,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import './Home.css';
import KSZKbiglogo from '../images/kszk_with_shadow.png';
import { getImages } from '../../actions/home'

const settings = {
  dots: false,
  autoplay: true,
  arrows: false,
  infinite: true,
  speed: 2000,
  autoplaySpeed: 4000,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerMode: true,
  lazyLoad: true,
  initialSlide: Math.floor((Math.random() * 32) + 1),
};

class Home extends Component {
  UNSAFE_componentWillMount() {
    this.props.getImages();
  }

  renderSlider(view, imageWidth) {
    if(view === 0) {
      return (
        <div>
          <Slider {...settings}>
            {
              this.props.images.map(image => (
                <div key={image}>
                  <img src={image.image} width={imageWidth} alt='' />
                </div>
              ))
            }
          </Slider>
          <div className='car-text-kszk'>
            <Segment textAlign='center' vertical>
              <Header
                as='h1'
                content='Üdvözlünk a'
                inverted
                style={{
                  fontSize: '3vw',
                  fontWeight: 'normal',
                  marginBottom: 0,
                }}
              />
              <Header
                as='h1'
                content='Kollégiumi Számítástechnikai Kör'
                inverted
                style={{
                  fontSize: '3.5vw',
                  fontWeight: 'bold',
                  marginBottom: '0.5vw',
                  marginTop: '0.5vw',
                }}
              />
              <Header
                as='h1'
                content='újoncképzésének weboldalán!'
                inverted
                style={{
                  fontSize: '3vw',
                  fontWeight: 'normal',
                  marginBottom: 0,
                  marginTop: '0.5vw',
                }}
              />
              <Image
                verticalAlign='middle'
                src={KSZKbiglogo}
                style={{ marginTop: '1vw', width: '17%' }}
              />
              <Header
                as='h1'
                content='Szeretettel várunk a KSZKépzésre!'
                inverted
                style={{
                  fontSize: '3vw',
                  fontWeight: 'normal',
                  marginBottom: 0,
                  marginTop: '1vw',
                }}
              />
              <Container>
                {
                  this.props.user.id ?
                    <Button
                      as={Link}
                      to='/profile'
                      primary
                      size='huge'
                      style={{
                        fontSize: '2vw',
                        marginTop: '1vw',
                        marginBottom: '1vw',
                        fontWeight: 'bold',
                        letterSpacing: '0.13vw'
                      }}
                    >
                      Jelentkezés
                      <Icon name='right arrow' />
                    </Button>
                      :
                    <Button
                      href='/api/v1/login/authsch/'
                      primary
                      size='huge'
                      style={{
                        fontSize: '2vw',
                        marginTop: '1vw',
                        marginBottom: '1vw',
                        fontWeight: 'bold',
                        letterSpacing: '0.13vw'
                      }}
                    >
                      Bejelentkezés
                      <Icon name='right arrow' />
                    </Button>
                }
              </Container>
            </Segment>
          </div>
        </div>
      )
    } else if (view === 1) {
      return (
        <div>
          <Slider {...settings}>
            {
              this.props.images.map(image => (
                <div key={image}>
                  <img src={image.image} width={imageWidth} alt='' />
                </div>
              ))
            }
          </Slider>
          <div className='car-text-kszk'>
            <Segment textAlign='center' vertical>
              <Header
                as='h1'
                content='Üdvözlünk a'
                inverted
                style={{
                  fontSize: '5vw',
                  fontWeight: 'bold',
                  marginBottom: 0,
                }}
              />
              <Header
                as='h1'
                content='Kollégiumi Számítástechnikai Kör'
                inverted
                style={{
                  fontSize: '6vw',
                  fontWeight: 'bold',
                  marginBottom: '0.5vw',
                  marginTop: '0.5vw',
                }}
              />
              <Header
                as='h1'
                content='újoncképzésének weboldalán!'
                inverted
                style={{
                  fontSize: '5vw',
                  fontWeight: 'bold',
                  marginBottom: 0,
                  marginTop: '0.5vw',
                }}
              />
              <Image
                className='kszklogo'
                verticalAlign='middle'
                src={KSZKbiglogo}
                style={{ marginTop: '1vw', width: '20%' }}
              />
              <Header
                as='h1'
                content='Szeretettel várunk a KSZKépzésre!'
                inverted
                style={{
                  fontSize: '5vw',
                  fontWeight: 'bold',
                  marginBottom: 0,
                  marginTop: '1vw',
                }}
              />
              <Container>
                {
                  this.props.user.id ?
                    <Button
                      as={Link}
                      to='/profile'
                      primary
                      size='massive'
                      style={{
                        fontSize: '4vw',
                        marginTop: '1.5vw',
                        marginBottom: '1vw',
                        fontWeight: 'bold',
                        letterSpacing: '0.15vw'
                      }}
                    >
                      Jelentkezés
                      <Icon name='right arrow' />
                    </Button>
                      :
                    <Button
                      href='/api/v1/login/authsch/'
                      primary
                      size='massive'
                      style={{
                        fontSize: '4vw',
                        marginTop: '1vw',
                        marginBottom: '1vw',
                        fontWeight: 'bold',
                        letterSpacing: '0.15vw'
                      }}
                    >
                      Bejelentkezés
                      <Icon name='right arrow' />
                    </Button>
                }
              </Container>
            </Segment>
          </div>
        </div>
      )
    }
  }

  renderText(){
    const kszk_age = new Date().getFullYear() - 1976
    return (
      <Segment style={{ padding: '2em 0em 6em' }} vertical>
        <Container text>
          <Header as='h3' style={{ fontSize: '2em' }}>
            Kik is vagyunk mi?
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            A Kollégiumi Számítástechnikai Kör az Egyetem legrégebben működő
            és legnagyobb aktív, informatikával foglalkozó öntevékeny
            csoportosulása, idén ünnepeljük {kszk_age}. születésnapunkat. A patinás
            név mögött vidám hangulatú, alkotó kedvű csapat rejlik, mely a Kar
            jó szakmai képességű, számítástechnika iránt kiemelten érdeklődő
            tagjaiból verbuválódott, és bővül évente új tehetségekkel, lelkes
            informatikusokkal, villamosmérnökökkel.
          </p>
          <Button as={Link} size='large' to='/groups'>
            Ismerd meg a köreinket! <Icon name='right arrow' />
          </Button>
          <Divider as='h4' className='header' style={{ margin: '3em 0em' }} />
          <Header as='h3' style={{ fontSize: '2em' }}>
            Lehetőségek
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            A KSZK a lehetőségek tárháza, a hely ahol Te – leendő mérnök –
            minden területen kipróbálhatod, továbbképezheted magad. Nálunk
            kibontakoztathatod kreativitásod, tapasztalatot, mérnöki
            szemléletet szerezhetsz, miközben az ún. soft skill-jeidet is
            fejlesztheted. Ha számodra a szakma hivatás, ha szeretsz új
            dolgokat alkotni vagy csak jó társaságra vágysz, a legjobb helyre
            kerültél. A reszort körei a szakma egy-egy meghatározó területével
            foglalkoznak a fejlesztés és üzemeltetés területén.
          </p>
          <Divider as='h4' className='header' style={{ margin: '3em 0em' }} />
          <Header as='h3' style={{ fontSize: '2em' }}>
            Képzésünk
          </Header>
          <p style={{ fontSize: '1.33em' }}>
            Kilenc alkalmas képzésünk végén Te is igazi KSZK-ssá válhatsz,
            hiszen rengeteg szakmai tudást igyekszünk átadni nektek. A
            képzésalkalmak rendkívül jó hangulatban telnek, és a szociális
            irányultságú foglalkozások alatt egy nagyon jó csapat kovácsolódik
            az érdeklődőkből. Az első képzés időpontja február 16. vasárnap
            18:00, ettől kezdve pedig minden héten találkozunk ugyanabban az
            időpontban. A képzés ideje alatt április 17-19 között rendezünk
            tábort. Az alkalmakon és a táborban kötelező a részvétel.
          </p>
          <Divider as='h4' className='header' style={{ margin: '3em 0em' }} />
          <Segment inverted color='red' tertiary>
            <Header as='h3' style={{ fontSize: '2em' }}>
              Korlátos férőhely
            </Header>
            <p style={{ fontSize: '1.33em' }}>
              Általánosságban elmondható, hogy a KSZK tagjai rengeteg dologgal foglalkoznak
              a hétköznapjaik során, hogy minden informatikai rendszer úgy működjön
              a kollégiumban, ahogy kell. Így van ez velünk képzőkkel is, emiatt
              hetente csak egy képzésalkalmat tudunk tartani. Mivel az oktatóterem
              férőhelyében korlátozott, ezért a képzésre maximum 35 embert tudunk befogadni.
            </p>
            <p style={{ fontSize: '1.33em' }}>
              Sajnos előfordulhat olyan eset, hogy valaki már nem fér be a képzésre,
              ezért kérünk titeket, hogy ennek tudatában jelentkezzetek majd.
              Ilyen esetben reméljük ez nem szegi kedveteket és jövőre újra próbálkoztok majd!
            </p>
          </Segment>
        </Container>
      </Segment>
    )
  }

  render() {
    return (
      <div>
        <Responsive minWidth={600} >
          <div className='car-image-kszk'>
            <div></div>
            { this.renderSlider(0, '120%') }
          </div>
          { this.renderText() }
        </Responsive>
        <Responsive maxWidth={600} >
          <div className='car-image-kszk'>
            { this.renderSlider(1, '200%') }
          </div>
          { this.renderText() }
        </Responsive>
      </div>
    );
  }
}

const mapStateToProps = ({ user, images }) => ({
  user, images
});

export default connect(mapStateToProps, { getImages })(Home);
