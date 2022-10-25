import List from './List';
import axios from "axios";
import { Fragment, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import {addListAction, selectLists, delListAction} from '../../store/lists_reducer';


let lists;

const apiGetLists = 'http://localhost:3000/api/lists/';
const apiGetListsCounts = 'http://localhost:3000/api/counts/lists/';

async function postListToServer(formObj) {
    return await axios
        .post(apiGetLists, formObj)
        .then((res) => {
            console.log(res);
        });
}

async function getListsCounts() {
    return await axios.get(apiGetListsCounts).then(res => res.data)
}

async function delListFromServer(id) {
    return await axios.delete(apiGetLists + id);
}

//========== Компонента Lists =============

const Lists = ({ delListStatus, onClickToList, getForm, getFormStatus }) => {

    const [formStatus, setFormStatus] = useState('');

    const dispatch = useDispatch();
    const listArr = useSelector(selectLists);

    useEffect(() => {
            getListsCounts().then((res) => dispatch(addListAction(res)));

        }, [dispatch, formStatus]);


    useEffect(() => {
            if (!getForm) return;
            setFormStatus(getForm);

            postListToServer(getForm)
            .then(getFormStatus(true));            

        }, [getForm]);    


    const delListButton = (id) => {
        console.log(`List ID ${id} was del...`);

        delListFromServer(id)
        .then(dispatch(delListAction(id)));

        delListStatus(id);
    }    

    if (listArr) {

        lists = listArr
            .map((list) => {
                return (<List onClickToList={onClickToList} list={list} key={list.id} delList={delListButton}/>  )
            });

            return (
                <Fragment>
                    <div className="context__header">
                        <div className="context__header-body">
                            <div className="context__header-ico"></div>
                            <div className="context__header-title title">Поточні списки</div>;
                        </div>
                    </div>

                    <div className="lists">
                        {lists}
                    </div>
                </Fragment>
            );
        }
}

export default Lists;