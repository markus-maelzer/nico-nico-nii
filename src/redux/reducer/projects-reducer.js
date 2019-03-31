const initState = {
  scrollpos: 0,
  projectList: {},
}

export const projectsReducer = (state = initState, action) => {
  switch (action.type) {
    case 'scrollpos':
      return action.scrollpos;
    default:
      return state;
  }
}
