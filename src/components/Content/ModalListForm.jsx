import { useState, useEffect, Fragment } from "react";

// const inc = (init = 0) => () => ++init;
// const genId = inc();

function resetFormData() {
    const listForm = document.querySelector('.modal-box-form');
    const listName = document.querySelector('input[name="name_list"]');

    listName.value = '';

    listForm.classList.remove('modal-box_show');

    return true;
}

function addListDataToForm() {
    const listForm = document.querySelector('.modal-box-form');
    const formData = new FormData(listForm);
    const newListDataOdj = Object.fromEntries(formData.entries());

    const listName = document.querySelector('input[name="name_list"]');

    newListDataOdj.title = listName.value;

    return newListDataOdj;
}

const ModalListForm = ({ postForm, formStatus }) => {
    const [modelBox, setModelBox] = useState('modal-box-list');
    const [formState, setFormState] = useState();

    const showModalBox = () => {
        setModelBox('modal-box-list modal-box-list_show');
    }

    useEffect(() => {
        if (formStatus) {

            resetFormData();

            setModelBox('modal-box-list');
            setFormState(formStatus);
        }

    }, [formStatus]);

    const createList = () => {

        const newListDataOdj = addListDataToForm();

        postForm(newListDataOdj);
    }

    return (
        <Fragment>
            <button className="context__add-task-button" onClick={showModalBox}></button>
            <div className={modelBox}>
                <div className="modal-box__input">
                    <form className="modal-box-form" name="newList" action="" />
                    <input type="text" id="listName" placeholder="Назва списку:" name="name_list" />

                    <input className="form__button" type="submit" value="Додати список" onClick={createList} />
                    <form />
                </div>
            </div>
        </Fragment>

    );
}

export default ModalListForm;