import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProjectsSingle extends Component {
  componentDidMount() {
  }
  
  render() {            
    return (
      <div>
        single
      </div>
    )
  }
}

const mapStateToProps = ({ projects }) => {
  return {projects};
}


export default connect(mapStateToProps, null)(ProjectsSingle)
