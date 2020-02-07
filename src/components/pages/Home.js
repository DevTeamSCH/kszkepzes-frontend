import React, { Component} from 'react';
import {
  Button,
  Container,
  Header,
  Icon,
  Segment,
  Image,
  Divider,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import './Home.css';
import KSZKbiglogo from '../images/kszk_big_logo.png';

const settings = {
  dots: false,
  autoplay: true,
  arrows: true,
  infinite: true,
  speed: 2000,
  autoplaySpeed: 4000,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerMode: true,
  lazyLoad: true,
  initialSlide: Math.floor((Math.random() * 32) + 1),
};

const range = (count) => {
  const newArray = [];
  for (let i = 1; i < count; i += 1) {
    newArray.push(i);
  }

  return newArray;
};



class Home extends Component {

  onFocus = () => {
    if(this.slider)
      this.slider.slickPlay();
  }
  
  onBlur = () => {
    if(this.slider)
      this.slider.slickPause();
  }

  componentDidMount() {
    window.addEventListener("focus", this.onFocus);
    window.addEventListener("blur", this.onBlur);
  }
  

  componentWilUnmount() {
    window.removeEventListener("focus", this.onFocus)
    window.removeEventListener("blur", this.onBlur);
  }



  render() {
    const kszk_age = new Date().getFullYear() - 1976
    return (
      <div>
        <div className='car-image-kszk'>
          <Slider ref={slider => (this.slider = slider)} {...settings}>
            {
              range(32).map(image => (
                <div key={image}>
                  <img src={`images/${image}.jpg`} width='100%' alt='' />
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
                  marginTop: '0.5vw',
                }}
              />
              <Header
                as='h1'
                content='Kollégiumi Számítástechnikai Kör'
                inverted
                style={{
                  fontSize: '4vw',
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
                style={{ marginTop: '4vw', width: '15%' }}
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
        <Segment style={{ padding: '8em 0em', fontFamily: 'Arial' }} vertical>
          <Container text>
            <Header as='h3' style={{ fontSize: '2em', fontFamily: 'Arial' }}>
              Kik is vagyunk mi?
            </Header>
            <p style={{ fontSize: '1.33em', fontFamily: 'Arial' }}>
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
            <Header as='h3' style={{ fontSize: '2em', fontFamily: 'Arial' }}>
              Lehetőségek
            </Header>
            <p style={{ fontSize: '1.33em', fontFamily: 'Arial' }}>
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
            <Header as='h3' style={{ fontSize: '2em', fontFamily: 'Arial' }}>
              Képzésünk
            </Header>
            <p style={{ fontSize: '1.33em', fontFamily: 'Arial' }}>
              Kilenc alkalmas képzésünk végén Te is igazi KSZK-ssá válhatsz,
              hiszen rengeteg szakmai tudást igyekszünk átadni nektek. A
              képzésalkalmak rendkívül jó hangulatban telnek, és a szociális
              irányultságú foglalkozások alatt egy nagyon jó csapat kovácsolódik
              az érdeklődőkből. Az első képzés időpontja február 19. hétfő
              20:00, ettől kezdve pedig minden héten találkozunk ugyanabban az
              időpontban. A képzés ideje alatt április 6-8 között rendezünk
              tábort. Az alkalmakon és a táborban kötelező a részvétel.
            </p>
            <Divider as='h4' className='header' style={{ margin: '3em 0em' }} />
            <Segment inverted color='red' tertiary>
              <Header as='h3' style={{ fontSize: '2em', fontFamily: 'Arial' }}>
                Korlátos férőhely
              </Header>
              <p style={{ fontSize: '1.33em', fontFamily: 'Arial' }}>
                Általánosságban elmondható, hogy a KSZK tagjai rengeteg dologgal foglalkoznak
                a hétköznapjaik során, hogy minden informatikai rendszer úgy működjön
                a kollégiumban, ahogy kell. Így van ez velünk képzőkkel is, emiatt
                hetente csak egy képzésalkalmat tudunk tartani. Mivel az oktatóterem
                férőhelyében korlátozott, ezért a képzésre maximum 35 embert tudunk befogadni.
              </p>
              <p style={{ fontSize: '1.33em', fontFamily: 'Arial' }}>
                Sajnos előfordulhat olyan eset, hogy valaki már nem fér be a képzésre,
                ezért kérünk titeket, hogy ennek tudatában jelentkezzetek majd.
                Ilyen esetben reméljük ez nem szegi kedveteket és jövőre újra próbálkoztok majd!
              </p>
            </Segment>
          </Container>
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps, {})(Home);
