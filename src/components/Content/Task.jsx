import { Fragment, useState } from 'react';
import { NavLink } from 'react-router-dom';

let listInfo;

function renderDateToString(stringDate) {
    return stringDate.slice(0, 10);
}

const Task = ({ task, delTask, changeCheckBox }) => {
    const { id, list_id, name, title, description, due_date, done } = task;

    const dueDate = new Date(due_date);
    const nowDate = new Date();
    const strDate = renderDateToString(due_date);

    const [checkBox, setCheckBox] = useState(done);

    const stateCheckbox = ({ target: { checked } }) => {
        setCheckBox(checked);

        changeCheckBox(id, list_id); 
        
    };

    const iconStatus = (!done && dueDate < nowDate) ? "task__date-icon task__date-icon_status" : 'task__date-icon';
    const dateStatus = (!done && dueDate < nowDate) ? "task__date task__date_status" : 'task__date';
    const checkBoxStatus = checkBox ? 'task__body task__body_status-active' : 'task__body';

    return (

        <section className="task" data-id="{id}" data-done="{done}">
            <div className={checkBoxStatus}>

                <button className="task__cancel" onClick={() => delTask(id)} data-id="{id}">+</button>

                <div className="task__container">
                    <div className="task__row">
                        <div className="task__date-body">
                            <div className={iconStatus}></div>
                            <div className={dateStatus}>{strDate}</div>

                            <NavLink className="task-list" key={list_id} to={`/todo-list/${list_id}`}>
                                <div className="task-list__title">{title}</div>
                            </NavLink>
                        </div>

                        <input onChange={stateCheckbox} className="task__checkbox" type="checkbox" checked={checkBox} id="{id}" name="" />
                        <label className={checkBox ? 'task__title task__title_status' : 'task__title'} htmlFor="{id}">{name}</label>

                        <p className="task__description">{description}</p>
                    </div>
                </div>
            </div>
        </section >

    );
}

export default Task;