import { createSelector } from "reselect";

const selectAllLists = state => state.lists.listsArr;
const selectAllTasks = state => state.tasks.TasksArr;

// export const ChangeAllLists = createSelector(

//   );