import React, { Component, PropTypes } from 'react';
import Header from '../component/header.jsx'
import Menu from '../component/menu.jsx'


class Home extends Component {

  render() {
    return (
      <div style={{ height: '100%' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}>
          <Header />
        </div>
        <div style={{ position: 'absolute', top: '56px', bottom: 0, left: 0, width: '100%' }}>
          <Menu />
          {this.props.children}
        </div>
      </div>
    )
  }
}


Home.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default Home