import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class About extends Component {

  state = {
    showKitten: false
  }

  handleToggleKitten = () => this.setState({showKitten: !this.state.showKitten});

  render() {
    return (
      <div className="container">
        <h1>Map Page</h1>
        <Helmet title="Map Page"/>
      </div>
    );
  }
}
