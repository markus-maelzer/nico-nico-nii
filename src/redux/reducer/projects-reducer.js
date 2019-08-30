import { FETCH_PROJECTS, FETCH_SINGLE_PROJECT } from "../types";

const initState = {
  projects: [{test: 'hi'}],
}

export const projectsReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_PROJECTS:
      return [...action.data.entries];
    case FETCH_SINGLE_PROJECT:
      return [...action.data.entries];
    default:
      return state;
  }
}
