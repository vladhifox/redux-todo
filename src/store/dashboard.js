const defaultState = {
    today: 0,
    lists: [],
    openedTasks: []
};

const GET_DASH = 'GET_DASH';

export const dashboard_reducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_DASH:
                return {...state, 
                    today: action.payload.today,
                    lists: action.payload.lists,
                    openedTasks:action.payload.tasks 
                }    
        default: 
            return state;

    }
}

export const addDashAction = (payload) => ({type: GET_DASH, payload});