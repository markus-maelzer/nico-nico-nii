import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InView } from 'react-intersection-observer';

import {
  Title, ColorOverlay,
  TextFadeIn
} from '../components';

class ProjectsSingle extends Component {
  componentDidMount() {
  }
  
  render() {            
    return (
      <div>
        {/* <InView triggerOnce threshold={0.1} key={project._id}>
        {({ inView, ref, entry }) => (
          <>
            <Title>
              <TextFadeIn visible={inView && loaded} timeout={600}>
                {project.title}
              </TextFadeIn>
            </Title>
            <ColorOverlay visible={inView && loaded}>
              <img src={API_URL.DOMAIN + project.img.path} alt={project.title} />
            </ColorOverlay>
          </>
        )}
      </InView> */}
      </div>
    )
  }
}

const mapStateToProps = ({ projects }) => {
  return {projects};
}


export default connect(mapStateToProps, null)(ProjectsSingle)
