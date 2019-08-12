import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InView } from 'react-intersection-observer';
import axios from 'axios';
import Plx from 'react-plx';

import { DelayLink } from "../router/delay-link";

import {
  Title, ScrollSlider,
  Box, ColorOverlay,
  TextFadeIn
} from '../components';

const GenerateApiUrls = function() {
  const DOMAIN = 'http://markusmaelzer-at.stackstaging.com';
  const ROOT_URL = '/cockpit';
  const API_TOKEN = '?token=47b491ec7e8b7c012f69d1eeb8e417';
  this.DOMAIN = DOMAIN;
  this.collection = (name) => `${DOMAIN}${ROOT_URL}/api/collections/get/${name}${API_TOKEN}`;
  this.singleton = (name) => `${DOMAIN}${ROOT_URL}/api/singletons/get/${name}${API_TOKEN}`;
}

export const API_URL = new GenerateApiUrls();

const parallaxData = [
  {
    start: 0,
    end: window.innerHeight,
    properties: [
      {
        startValue: 1,
        endValue: 1.4,
        property: 'scale',
      },
    ],
  },
];


// const imgLink = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/50532ae6-dd17-46cd-832b-491558fe64ad/dag69ua-d77e67e1-942f-4ae0-bc1e-da6cad0bf6df.png/v1/fill/w_1141,h_700,q_70,strp/darker_thank_black_hei_low_poly_wallpaper_by_flapoly_dag69ua-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTgyIiwicGF0aCI6IlwvZlwvNTA1MzJhZTYtZGQxNy00NmNkLTgzMmItNDkxNTU4ZmU2NGFkXC9kYWc2OXVhLWQ3N2U2N2UxLTk0MmYtNGFlMC1iYzFlLWRhNmNhZDBiZjZkZi5wbmciLCJ3aWR0aCI6Ijw9MTYwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.jRo5eVKiIruXWBT5NjYqbJxQu1yGFICIAvK7zoCMZvs";
class Projects extends Component {
  state = {
    projects: [],
  }
  componentDidMount() {
    axios.get(API_URL.collection('projects')).then(({data}) => {
      this.setState({
        projects: data.entries
      })
    })
  }

  // TODO: put this into Projects reducer
  formatTitle = (string) => string.trim().toLowerCase()
                            .replace().split(' ').join('-');

  // TODO: make this into its own component 
  renderProjects = () => {
    const { loaded, unload } = this.props;    
    return this.state.projects.map((project, i) => (
      <InView triggerOnce key={project._id}>
        {({ inView, ref, entry }) => (
          <DelayLink className="col-md-8 project" innerRef={ref}
          delay={500} onDelayStart={unload}
          to={`/projects/${this.formatTitle(project.title)}-${project._id}`}>
            <Title>
              <TextFadeIn visible={inView && loaded} timeout={600}>
                {project.title}
              </TextFadeIn>
            </Title>
            <ColorOverlay visible={inView && loaded}>
              <Plx parallaxData={parallaxData}>
                <img src={API_URL.DOMAIN + project.img.path} alt={project.title} />
              </Plx>
            </ColorOverlay>
          </DelayLink>
        )}
      </InView>
    ))
  }

  render() {
    const { loaded } = this.props;
    return (
      <>
        <section className="fh-v row justify-center flex-align-center nopt">
          <div className="container-big">
            <Title>
              <TextFadeIn visible={loaded}>Hey,</TextFadeIn>
              <br />
              <TextFadeIn visible={loaded}>I’m Nicolas</TextFadeIn>
              <span className="accent">
                <TextFadeIn visible={loaded}> Cetl,</TextFadeIn>
              </span>
            </Title>

            <ScrollSlider totalSlides={2} scrollLock={false} reLockSlider={false}>
              {({setRef, poseClass}, {activeIndex, init}) => {
                console.log(poseClass(0));
                return (
                <>
                  <Box ref={setRef(0)} pose={poseClass(activeIndex, 0)}>
                    <Title className={`outline ${activeIndex === 0 ? 'anim' : ''}`}>
                      <TextFadeIn visible={activeIndex === 0 && loaded}>
                        a media designer
                      </TextFadeIn>
                      <br />
                      <TextFadeIn visible={activeIndex === 0 && loaded}>
                        from Vienna, Austria
                      </TextFadeIn>
                    </Title>
                  </Box>
                  <Box ref={setRef(1)} pose={poseClass(activeIndex, 1)}>
                    <Title className={`outline ${activeIndex === 1 ? 'anim' : ''}`}>
                      <TextFadeIn visible={activeIndex === 1}>
                      these are</TextFadeIn><br />
                      <TextFadeIn visible={activeIndex === 1}>
                      my </TextFadeIn>
                      <span className="accent">
                      <TextFadeIn visible={activeIndex === 1}>
                      Projects</TextFadeIn>
                       </span>
                    </Title>
                  </Box>
                </>
              )
            }}
            </ScrollSlider>
          </div>
        </section>
        <div className="container-big column justify-space-between">
          {this.renderProjects()}
        </div>
      </>
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
