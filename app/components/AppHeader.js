import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import {PropTypes, defaultProps } from 'prop-types';

export default class AppHeader extends Component {
  render() {
    return (
        <Container>
        <Header>
          <Left/>
          <Body>
            <Title>{this.props.headerTitle}</Title>
          </Body>
          <Right />
        </Header>
      </Container>
    );
  }
}
AppHeader.propTypes = {
      headerTitle: PropTypes.string
};

AppHeader.defaultProps = {
  headerTitle: 'Header'
};