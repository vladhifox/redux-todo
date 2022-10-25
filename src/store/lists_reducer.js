import { createSelector } from "reselect";

const defaultState = [];

const GET_LISTS = 'GET_LISTS';
const UPDATE_ALLTASK_COUNT_IN_LIST = 'UPDATE_COUNTS_LISTS';
const UPDATE_DONETASK_COUNT_IN_LISTS = 'UPDATE_DONETASK_COUNT_IN_LISTS';
const DEL_LIST = 'DEL_LIST';

export const lists_reducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_LISTS:
            return action.payload
        case UPDATE_ALLTASK_COUNT_IN_LIST:

            return (                              
                state
                .map(list => {
                    if (list.id === action.payload) {
                        if (action.sign) {
                            list.all_tasks += 1;                        
                        } else list.all_tasks -= 1;                        
                        
                    }                    

                    return list;
                })
            )
        case UPDATE_DONETASK_COUNT_IN_LISTS:
            return (                              
                state
                .map(list => {
                    if (list.id === action.payload) {
                        if (action.sign) {
                            list.done_tasks += 1;                        
                        } else list.done_tasks -= 1;                        
                        
                    }                    

                    return list;
                })
            )                    
        case DEL_LIST:
            return state.filter(list => list.id !== action.payload)
        default: 
            return state;

    }
}

export const addListAction = (payload) => ({type: GET_LISTS, payload});
export const upDateAllTasksCountInListAction = (payload, sign) => ({type: UPDATE_ALLTASK_COUNT_IN_LIST, payload, sign:sign});
export const upDateDoneTasksCountInListAction = (payload, sign) => ({type: UPDATE_DONETASK_COUNT_IN_LISTS, payload, sign:sign});
export const delListAction = (payload) => ({type: DEL_LIST, payload});

const selectAllLists = state => state.lists;

export const selectLists = createSelector(
    [selectAllLists],
    (allLists) => {
        return allLists.map(list => {
            
            return list
        });
    }
)
