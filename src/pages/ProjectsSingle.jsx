import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InView } from 'react-intersection-observer';

import { fetchQuery, API_URL } from '../redux/actions';
import { FETCH_PROJECTS_SINGLE } from '../redux/types';

import {
  Title, ColorOverlay,
  TextFadeIn
} from '../components';
import { log } from 'util';

function getId(text) {
  return text.slice((text.lastIndexOf('-') + 1), text.length);
}

class ProjectsSingle extends Component {
  componentDidMount() {
    if(!this.props.project)
      this.props.fetchQuery(
        FETCH_PROJECTS_SINGLE, 
        API_URL.collection('projects'),
        {
          limit: 1,
          filter: {
            '_id': getId(this.props.match.params.id),
          }
        }
      );    
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

const mapStateToProps = ({ projects }, ownProps) => {  
  const id = getId(ownProps.match.params.id);

  return {project: projects[id]};
}


export default connect(
  mapStateToProps, 
  { fetchQuery }
)(ProjectsSingle);
