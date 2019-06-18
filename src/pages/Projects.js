import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Title, ScrollSlider } from '../components';


class Projects extends Component {

  render() {
    return (
      <div>
        <Title>
          Hey, <br />
          I’m Nicolas <span className="accent">Cetl,</span>
        </Title>
        <div className="scrolltainer noscroll row flex-align-stretch">
          <ScrollSlider totalSlides={2}>
            <Title>
              a media designer
              from Villach, Austria
            </Title>
            <Title>
              these are<br /> my <span className="accent">Projects</span>
            </Title>
          </ScrollSlider>
        </div>
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
