import { Fragment, useEffect, useState } from "react";
import Option from "./Option";
import axios from "axios";

// const inc = (init = 0) => () => ++init;
// const genId = inc();

const apiGetLists = 'http://localhost:3000/api/lists/';

let lists;

async function getAllLists() {
    return await axios.get(apiGetLists).then(res => res.data);
}

function resetFormData() {
    const taskForm = document.querySelector('.modal-box');    
  
    const taskName = document.querySelector('input[name="name"]');
    const taskDescription = document.querySelector('[name="description"]');
    const taskList = document.querySelector('.modal-box-form__select');
    const taskDate = document.querySelector('input[name="due_date"]');

    taskName.value = '';
    taskDescription.value = '';
    taskList.value = '';
    taskDate.value = '';

    taskForm.classList.remove('modal-box_show');

    return true;
}

function addTaskDataToForm() {       
    const taskForm = document.querySelector('.modal-box-form');

    const taskName = document.querySelector('input[name="name"]');
    const taskDescription = document.querySelector('[name="description"]');
    const taskList = document.querySelector('.modal-box-form__select');
    const taskDate = document.querySelector('input[name="due_date"]');

    const formData = new FormData(taskForm); 
    const newTaskDataOdj = Object.fromEntries(formData.entries());

    newTaskDataOdj.name = taskName.value;    

    const list_id = parseInt(taskList.options[taskList.selectedIndex].value);

    if (!list_id) {
        alert('Виберіть список для задачі');
        return false;
    }

    newTaskDataOdj.list_id = list_id;
    newTaskDataOdj.done = false;

    if (taskDate.value) {
        newTaskDataOdj.due_date = taskDate.value;
    } else newTaskDataOdj.due_date = new Date();    

    return newTaskDataOdj;
}

const ModalForm = ({ postForm, formStatus }) => {
    const [modelBox, setModelBox] = useState('modal-box');
    const [formState, setFormState] = useState(false);

    const [listArr, setListArr] = useState();

    useEffect(() => {
        getAllLists().then(res => setListArr(res));
    }, []);

    const showModalBox = () => {
        setModelBox('modal-box modal-box_show');
    }

    useEffect(() => {
        if (formStatus) {

            resetFormData();

            setModelBox('modal-box');
            setFormState(formStatus);
        }

    }, [formStatus]);

    const createTask = () => {

        const newTaskDataOdj = addTaskDataToForm();

        postForm(newTaskDataOdj);
    }


    if (listArr) {

        lists = listArr
            .map((list) => {
                return (
                    <Option key={list.id} list={list} />
                )
            })
    }

    return (
        <Fragment>
            <button className="context__add-task-button" onClick={showModalBox}></button>
            <div className={modelBox}>
                <div className="modal-box__input">
                    <form className="modal-box-form" name="newTask" action="" />                    
                    <input type="text" id="taskName" name="name" placeholder="Назва задачі"/>
                    
                    <textarea type="textarea" rows="3" cols="31" name="description" placeholder="Опис задачі"></textarea>

                    <select className="modal-box-form__select" name="lists" id="lists" required="required">
                        {lists}
                    </select>

                    <label className="form__label" htmlFor="name">Дата виконання:</label>
                    <input type="date" date-format="DD MM YYYY" id="due_date" name="due_date" />

                    <span className="model-box-error">Назва задачі обов'язкова!</span>

                    <input className="form__button" type="submit" value="Додати задачу" onClick={createTask} />
                    <form />
                </div>
            </div>
        </Fragment>
    );
}

export default ModalForm;