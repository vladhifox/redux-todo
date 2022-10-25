import { NavLink } from 'react-router-dom';

function declOfNum(n, text_forms) {  
    n = Math.abs(n) % 100; 
    var n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 == 1) { return text_forms[0]; }
    return text_forms[2];
}

const List = ({ list, delList }) => {

    const {id, title, all_tasks, done_tasks} = list;    

    let bodyStatus = (done_tasks) ? "list__body list__body_status-blue" : 'list__body list__body_status-grey';

    if (done_tasks === all_tasks && all_tasks) {
        bodyStatus = "list__body list__body_status-green";
    }

    return (
                   
            <div className={bodyStatus}>              
                <button className="list__cancel" onClick={() => delList(id)} data-id="{id}">x</button>  
                <div className="list__container">
                    <div className="list__row">
                        <div className="list__count-tasks">{all_tasks} {declOfNum(all_tasks, ['завдання', 'завдання', 'завдань'])}</div>

                        <NavLink className="list" key={id} to={`/todo-list/${id}`}> 
                            <div className="list__title">{title}</div>
                        </NavLink>
                        
                        {/* <div className="list__description">
                            <p>Загальна дошка в системі, що містить поточні завдання для всіх
                                контракторів</p>
                        </div> */}

                        <div className="list__progress">
                            
                            <progress className="list__progress-bar" value={done_tasks} max = {all_tasks}></progress>
                            
                            <div className="list__progress-count">{done_tasks}/{all_tasks}</div>
                        </div>
                    </div>
                </div>
            </div>
        
    );
}

export default List;