import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Title, ScrollSlider, Box } from '../components';


class Projects extends Component {

  render() {
    return (
      <div>
        <Title>
          Hey, <br />
          I’m Nicolas <span className="accent">Cetl,</span>
        </Title>
        <ScrollSlider totalSlides={2}>
          {({setRef, poseClass}, {activeIndex, init}) => {
            return (
            <>
              <Box ref={setRef(0)} pose={poseClass(activeIndex, 0)}>
                <Title className={`outline ${activeIndex === 0 ? 'anim' : ''}`}>
                  a media designer
                  from Villach, Austria
                </Title>
              </Box>
              <Box ref={setRef(1)} pose={poseClass(activeIndex, 1)}>
                <Title className={`outline ${activeIndex === 1 ? 'anim' : ''}`}>
                  these are<br /> my <span className="accent">Projects</span>
                </Title>
              </Box>
            </>
          )
        }}
        </ScrollSlider>
        <div className="fh-v"></div>
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
