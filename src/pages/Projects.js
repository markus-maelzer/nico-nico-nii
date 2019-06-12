import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Title } from '../components/typography';

class Projects extends Component {

  render() {
    return (
      <div>
        <Title>
          Hey, <br />
          I’m Nicolas Cetl,
        </Title>
        <Title>
          a media designer
          from Villach, Austria
        </Title>
      </div>
    );
  }
}

const mapStateToProps = ({ projects }) => {
  return {projects};
}

export default connect(
  mapStateToProps,
  null
)(Projects);
