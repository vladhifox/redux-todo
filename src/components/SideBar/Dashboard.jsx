import SideBarList from './SideBarList';
import { useState, useEffect } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {addDashAction} from '../../store/dashboard';
import {addListAction, selectLists} from '../../store/lists_reducer';
import {ChangeAllLists} from '../../store/task_count_selector'

const apiGetListsCounts = 'http://localhost:3000/api/counts/lists/';
const apiGetDashboard = 'http://localhost:3000/api/dashboard';

async function getListsCounts() {
    return await axios.get(apiGetListsCounts).then(res => res.data)
}

async function getDashBoard() {
    return await axios.get(apiGetDashboard).then(res => res.data)
}

let lists;

const Dashboard = ({handleClick, newListStatus, delFormStatus, isToday}) => {
    //const [listArr, setListArr] = useState([]);

    const dispatch = useDispatch();
    //const DashArr = useSelector(state => state.dashboard);
    
    const listArr = useSelector(selectLists);   //ChangeAllLists

    const handleListClick = (id) => {
        handleClick(id);
    }    

    useEffect(() => {
        getListsCounts().then((res) => dispatch(addListAction(res)));
        getDashBoard().then((res) => dispatch(addDashAction(res))); //setListArr(res)

    }, [newListStatus, delFormStatus]);

  
    if (listArr) {

        lists = listArr
            .map((list) => {
                return (<SideBarList handleListClick = {handleListClick} key = {list.id} list = {list}/>)
            });
    }

    return (
            <div className="sidebar__content">
                <ul className="sidebar__lists">    
                    {lists}         
                </ul>
            </div>
    );

}

export default Dashboard;