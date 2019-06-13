import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Title, ScrollSlider } from '../components';


class Projects extends Component {

  render() {
    return (
      <div>
        <Title>
          Hey, <br />
          I’m Nicolas Cetl,
        </Title>
        <ScrollSlider>
          <Title>
            a media designer
            from Villach, Austria
          </Title>
        </ScrollSlider>
        <div className="fh-v">

        </div>
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
