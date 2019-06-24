import React, { Component } from 'react';

import { Title, Text, ScrollSlider, Box } from '../components';

const aboutMeData = [
  {
    title: () => (
      <Title className="col-md-6 align-right accent">
        life.
      </Title>
    ),
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    title: () => (
      <Title className="col-md-6 align-right accent">
        exp<br />peri<br />ence.
      </Title>
    ),
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    title: () => (
      <Title className="col-md-6 align-right accent">
        cont<br />tact.
      </Title>
    ),
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
]

export default class AvoutMe extends Component {
  test = React.createRef();
  render() {
    console.log(this.test.current);
    return (
      <div>
        <div className="container-big fh-v">
          <div className="col-md-6">
            <Title>
              about my
            </Title>
          </div>
          <ScrollSlider totalSlides={aboutMeData.length}>
            {({setRef, poseClass}, {activeIndex, init}) => {
              return (
              <>
                {aboutMeData.map((item, i) => (
                  <Box key={i} ref={setRef(i)} pose={poseClass(activeIndex, i)} className="row flex-align-start justify-end fh">
                    {item.title()}
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
