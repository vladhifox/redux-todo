import { useDispatch, useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';

function declOfNum(n, text_forms) {  
    n = Math.abs(n) % 100; 
    var n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 === 1) { return text_forms[0]; }
    return text_forms[2];
}

const SideBarList = ({list}) => {

    const {id, title, all_tasks, done_tasks} = list;     

    let bodyStatus = (done_tasks) ? "sidebar__list sidebar__list_status-blue" : 'sidebar__list sidebar__list_status-gray';

    if (done_tasks === all_tasks && all_tasks) {
        bodyStatus = "sidebar__list sidebar__list_status-green";
    }

    return (
        <div className={bodyStatus}>
            <NavLink key={id} to={`/todo-list/${id}`}
                className={({ isActive }) => (isActive ? 'sidebar__list_active' : '')}
            >
                <div className="sidebar__list-tasks-count">{all_tasks} {declOfNum(all_tasks, ['завдання', 'завдання', 'завдань'])}</div>    
                <div className="sidebar__list-title">{title}</div>                            
                <div className="sidebar__list-progress">{done_tasks}/{all_tasks}</div>               
            </NavLink>
        </div>            
    );
}

export default SideBarList;