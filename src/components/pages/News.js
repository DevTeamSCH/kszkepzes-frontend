import React, { Component } from 'react';
import { Container, Header, Segment, Divider, List, Modal,
         Button, Image, Form, Input, TextArea, Checkbox, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import AddNewsForm  from '../forms/AddNewsForm'

import { getNews, deleteNews } from '../../actions/news'

class News extends Component {

  componentWillMount() {
    this.props.getNews();
  }

  render_news() {
    const news = this.props.news;

    return news.map( (item, index) => (
      <div key={index} id={index}>
        { index > 0 ? <Divider /> : ''}
        <Header as='h3' style={{ fontSize: '2em' }}>{item.title}</Header>
        <p style={{ fontSize: '1.33em' }}>{item.text}</p>
        <Button
          color='red'
          size='mini'
          onClick={() => this.props.deleteNews(item)}  >Delete</Button>
      </div>
    ));

  }

  render_sidebar() {
    const news = this.props.news;

    return news.map( (item, index) => (
        <List.Item as='a' href={`#${index}`}>
          <List.Icon name='align justify' verticalAlign={"middle"}/>
          <List.Content>
            <List.Header>
              {item.title}
            </List.Header>
          </List.Content>
        </List.Item>
    ));

  }

  render() {

    return (
      <div>
      {/*  <Segment inverted textAlign='center' vertical>
          <Container>
            <Header
              as='h1'
              content='Hírek'
              inverted
              style={{
                fontSize: '2em',
                fontWeight: 'normal',
                marginBottom: 0,
                marginTop: '0.2em',
                padding: 0
              }}
            />
          </Container>
        </Segment>
        */}

        <Segment floated={'left'} style={{ padding: '3em 3em' }} vertical>
          <AddNewsForm />
          <Container text textAlign = {'center'}>
            {this.render_news()}
          </Container>
        </Segment>
        <Segment floated={'right'} style={{ padding: '1em 1em' }} vertical>
          <List size={'big'} link divided>
              {this.render_sidebar()}
          </List>
        </Segment>
      </div>
    );
  }
}


const mapStateToProps = ({ news }) => ({ news });

export default connect(mapStateToProps, { getNews, deleteNews })(News);
