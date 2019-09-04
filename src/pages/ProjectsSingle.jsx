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
  
  renderContent() {
    const { content } = this.props.project;
    if(!content) return;
    return content.map(({ value }) => (
      <div className="container-big row justify-space-between" key={value.title}>
        <div className="col-md-6">
          <img src={API_URL.DOMAIN + value.img.path} alt="" />
        </div>
        <div className="col-md-4">
          <p>
            {value.description}
          </p>
        </div>
      </div>
    ))
  }

  render() {           
    const { project, loaded } = this.props;
    console.log(project);
    
    if(!project) return <div></div>;
    return (
      <div className="project__single row justify-space-between">
        <InView triggerOnce threshold={0.1}>
          {({ inView, ref, entry }) => (
            <div className="col-md-6 project" ref={ref}>
              <Title>
                <TextFadeIn visible={inView && loaded} timeout={600}>
                  {project.title}
                </TextFadeIn>
              </Title>
              <ColorOverlay visible={inView && loaded}>
                <img src={API_URL.DOMAIN + project.img.path} alt={project.title} />
              </ColorOverlay>
            </div>
          )}
        </InView>        
        <div className="col-md-4">
          <p>
            {project.mainText}
          </p>
        </div>
        {this.renderContent()}
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
