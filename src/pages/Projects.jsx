import React, { Component } from 'react';
import { connect } from 'react-redux';
import { InView } from 'react-intersection-observer';
import { map } from 'lodash';

import { fetch, API_URL } from '../redux/actions';
import { FETCH_PROJECTS } from '../redux/types';

import { DelayLink } from '../router/delay-link';

import { Title, ScrollSlider, Box, TextFadeIn } from '../components';
import { ProjectImage } from '../components/animators/project-image';

import SmoothScroll from '../components/smooth-scroll';

// const parallaxData = [
//   {
//     start: 'self',
//     duration: window.innerHeight,
//     easing: 'easeOut',
//     properties: [
//       {
//         startValue: 1,
//         endValue: 1.4,
//         property: 'scale',
//       },
//     ],
//   },
// ];

// const imgLink = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/50532ae6-dd17-46cd-832b-491558fe64ad/dag69ua-d77e67e1-942f-4ae0-bc1e-da6cad0bf6df.png/v1/fill/w_1141,h_700,q_70,strp/darker_thank_black_hei_low_poly_wallpaper_by_flapoly_dag69ua-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTgyIiwicGF0aCI6IlwvZlwvNTA1MzJhZTYtZGQxNy00NmNkLTgzMmItNDkxNTU4ZmU2NGFkXC9kYWc2OXVhLWQ3N2U2N2UxLTk0MmYtNGFlMC1iYzFlLWRhNmNhZDBiZjZkZi5wbmciLCJ3aWR0aCI6Ijw9MTYwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.jRo5eVKiIruXWBT5NjYqbJxQu1yGFICIAvK7zoCMZvs";
class Projects extends Component {
  state = {
    projects: []
  };
  componentDidMount() {
    if (!this.props.products)
      this.props.fetch(FETCH_PROJECTS, API_URL.collection('projects'));
    // axios.get(API_URL.collection('projects')).then(({data}) => {
    //   console.log(data.entries);
    //   this.setState({
    //     projects: data.entries
    //   })
    // })
  }

  // TODO: put this into Projects reducer
  formatTitle = string =>
    string
      .trim()
      .toLowerCase()
      .replace()
      .split(' ')
      .join('-');

  // TODO: make this into its own component
  renderProjects = () => {
    const { loaded, unload, projects } = this.props;
    if (!projects) return;
    return map(projects, (project, i) => (
      <InView triggerOnce threshold={0.1} key={project._id}>
        {({ inView, ref, entry }) => (
          <DelayLink
            className="col-md-8 project"
            innerRef={ref}
            delay={700}
            onDelayStart={unload}
            to={`/projects/${this.formatTitle(project.title)}-${project._id}`}
          >
            <Title>
              {/* <TextFadeIn visible={inView && loaded} timeout={600}> */}
              {project.title}
              {/* </TextFadeIn> */}
            </Title>
            {/* <ColorOverlay visible={inView && loaded}> */}
            {/* <Plx parallaxData={parallaxData}> */}
            {/* <img src={API_URL.DOMAIN + project.img.path} alt={project.title} /> */}
            {/* <div
                style={{
                  backgroundImage: `url(${API_URL.DOMAIN + project.img.path})`,
                  backgroundAttachment: 'fixed',
                  backgroundSize: 'cover',
                  height: 'calc(300px + 15vw)'
                }}
              /> */}
            <ProjectImage src={API_URL.DOMAIN + project.img.path} />
            {/* </Plx> */}
            {/* </ColorOverlay> */}
          </DelayLink>
        )}
      </InView>
    ));
  };

  render() {
    const { loaded } = this.props;
    return (
      <>
        <section className="fh-v row justify-center flex-align-center nopt">
          <div className="container-big">
            <Title>
              Hey,
              <br />
              I’m Nicolas
              <span className="accent">Cetl,</span>
            </Title>

            <ScrollSlider totalSlides={2} scrollLock={false} reLockSlider={false}>
              {({ setRef, poseClass }, { activeIndex, init }) => {
                return (
                  <>
                    <Box ref={setRef(0)} pose={poseClass(activeIndex, 0)}>
                      <Title
                        className={`outline ${activeIndex === 0 ? 'anim' : ''}`}
                      >
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
                      <Title
                        className={`outline ${activeIndex === 1 ? 'anim' : ''}`}
                      >
                        <TextFadeIn visible={activeIndex === 1}>
                          these are
                        </TextFadeIn>
                        <br />
                        <TextFadeIn visible={activeIndex === 1}>my </TextFadeIn>
                        <span className="accent">
                          <TextFadeIn visible={activeIndex === 1}>
                            Projects
                          </TextFadeIn>
                        </span>
                      </Title>
                    </Box>
                  </>
                );
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
  return { projects };
};

export default connect(mapStateToProps, { fetch })(Projects);
