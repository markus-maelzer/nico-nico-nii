import React, { Component } from 'react';
import { connect } from 'react-redux';

class Projects extends Component {

  render() {
    return (
      <div>
        Projects
      </div>
    );
  }
}

const mapStateToProps = ({ projects }) => {
  return projects;
}

export default connect(
  mapStateToProps,
  null
)(Projects);
