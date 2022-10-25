import { createSelector } from "reselect";

const defaultState = []

const GET_TASKS = 'GET_TASKS';
const UPDATE_TASKS = 'UPDATE_TASKS';
const DEL_TASK = 'DEL_TASK';

export const tasks_reducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_TASKS:
            return action.payload  
        case DEL_TASK:
                return state.filter(task => task.id !== action.payload)
        default: 
            return state;

    }
}

export const addTaskAction = (payload) => ({type: GET_TASKS, payload});
export const upDateTaskAction = (payload) => ({type: UPDATE_TASKS, payload});
export const delTaskAction = (payload) => ({type: DEL_TASK, payload});

const selectAllTasks = state => state.tasks;
export const selectTasks = createSelector(
    [selectAllTasks],
    (allTasks) => {
        return allTasks.map(task => {

            return task
        });
    }
)