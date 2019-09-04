import { mapKeys } from 'lodash';
import { FETCH_PROJECTS, FETCH_PROJECTS_SINGLE } from "../types";

const initState = {}

export const projectsReducer = (state = initState, action) => {  
  switch (action.type) {
    case FETCH_PROJECTS:
      return {...mapKeys(action.data.entries, '_id')};
    case FETCH_PROJECTS_SINGLE:
      const [entry] = action.data.entries;
      const id = entry['_id'];
      
      return {...state, [id]: entry};
    default:
      return state;
  }
}
