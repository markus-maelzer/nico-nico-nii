import React, { Component } from 'react';

import {
  Title, Text, ScrollSlider,
  Box, TextFadeIn
} from '../components';

const aboutMeData = [
  {
    title: [
      'life.'
    ],
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    title: [
      'ex',
      'peri',
      'ence.',
    ],
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    title: [
      'con',
      'tact'
    ],
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
]

export default class AboutMe extends Component {
  test = React.createRef();


  renderTitle = ({ text }) => {

  }

  render() {
    const { loaded } = this.props;
    // console.log(this.test.current);
    return (
      <div>
        <div className="container-big fh-v">
          <div className="col-md-6 align-right">
            <Title>
              <TextFadeIn visible={loaded}>
                about my
              </TextFadeIn>
            </Title>
          </div>
          <ScrollSlider totalSlides={aboutMeData.length}>
            {({setRef, poseClass}, {activeIndex, init}) => {
              return (
              <>
                {aboutMeData.map((item, i) => (
                  <Box key={i} ref={setRef(i)} pose={poseClass(activeIndex, i)} className="row flex-align-start justify-end fh">
                    <Title className="col-md-6 align-right accent">
                      {item.title.map((text, e) => (
                        <span key={e} className="about-me">
                          <TextFadeIn visible={activeIndex === i && loaded} timeout={100}>
                            {text}
                          </TextFadeIn>
                        </span>
                      ))}
                    </Title>
                    <Text className="col-md-6">
                      {item.text}
                    </Text>
                  </Box>
                ))}
              </>
            )
          }}
          </ScrollSlider>
        </div>
      </div>
    );
  }
}
