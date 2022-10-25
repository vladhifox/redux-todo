import { useState, useEffect } from 'react';
import Task from './Task';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {addTaskAction, selectTasks, delTaskAction} from '../../store/tasks_reducer';
import {upDateAllTasksCountInListAction, upDateDoneTasksCountInListAction, selectLists} from '../../store/lists_reducer';

let tasks;
let currentList;

const apiGetTasks = 'http://localhost:3000/api/tasks/';
const apiGetLists = 'http://localhost:3000/api/lists/';
const apiCollectionTasksToday = 'http://localhost:3000/api/collection/today/';

async function getAllTasks() {
    return await axios.get(apiGetTasks).then(res => res.data);
}

async function getTasksByListId(list_id) {
    return await axios.get(apiGetLists + list_id + '/tasks?all=true').then(res => res.data)
}

async function getCollectionToday() {
    return await axios.get(apiCollectionTasksToday).then(res => res.data)
}

async function postTaskToServer(formObj) {
    return await axios
        .post(apiGetTasks, formObj)
        .then((res) => {
            console.log(res.data, res.status);
        });
}

async function patchTaskToServer(id, formObj) {
    return await axios
        .patch(apiGetTasks + id, formObj)
        .then((res) => {
            console.log(res.data, res.status);
        });
}

async function delTask(id) {
    return await axios.delete(apiGetTasks + id);
}

const Tasks = ({ getTabStatus, getForm, getFormStatus, listIdFromURL, isToday }) => {

    const dispatch = useDispatch();
    const taskArr = useSelector(selectTasks);  
    const listArr = useSelector(selectLists);    

    const [tabStatus, setTabStatus] = useState(-2);
    const [formStatus, setFormStatus] = useState(getForm);  
    

    useEffect(() => {
        if (getForm) {
            setFormStatus(getForm);

            postTaskToServer(getForm)
            .then(getFormStatus(true))            
            .catch(err => alert(err));

            dispatch(addTaskAction(taskArr));  
            dispatch(upDateAllTasksCountInListAction(listIdFromURL, true));                                          
        }

    }, [getForm]);       

    useEffect(() => {         

        if (listIdFromURL) {
            getTasksByListId(listIdFromURL).then(res => dispatch(addTaskAction(res)));

            const [curList] = listArr.filter(list => list.id === listIdFromURL);
            currentList = curList.title;

        } if (isToday && !listIdFromURL) {
            getCollectionToday().then(res => dispatch(addTaskAction(res)));

            currentList = 'Today tasks...';

        } else if (!isToday && !listIdFromURL) {
            getAllTasks().then(res => dispatch(addTaskAction(res)));
        }

        setTabStatus(getTabStatus);                                         

    }, [formStatus, getTabStatus, listIdFromURL, isToday]);        


    const delTaskButton = (id) => {
        console.log(`Task ID ${id} was del...`);

        dispatch(upDateAllTasksCountInListAction(listIdFromURL, false)); 
        dispatch(upDateDoneTasksCountInListAction(listIdFromURL, false)); 

        delTask(id)
        .then(dispatch(delTaskAction(id)));                
    }

    const handleCheckBoxStatus = (id, list_id) => {

        taskArr.map((task) => {
            if (task.id === id) {
                task.done = !task.done;

                patchTaskToServer(id, task);
                
                if (task.done) {
                    dispatch(upDateDoneTasksCountInListAction(listIdFromURL ? listIdFromURL: list_id, true)); 
                } else dispatch(upDateDoneTasksCountInListAction(listIdFromURL ? listIdFromURL: list_id, false)); 
                
            }

            return taskArr;
        });
    }           

    if (taskArr) {

        if (tabStatus === 1) {
            tasks = taskArr.filter((task) => task.done === true);
        } else if (tabStatus === 0) {
            tasks = taskArr.filter((task) => task.done === false);
        } else tasks = taskArr;

        let curTasksArr = tasks
            .map((task) => {
                return (<Task task={task} key={task.id} changeCheckBox={handleCheckBoxStatus} delTask={delTaskButton} />)
            });             

        return (
            <div className="tasks">
                <div className="task-list-name">{currentList ? currentList : ''}</div > 
                {curTasksArr}
            </div>
        );

    
    }

}

export default Tasks;