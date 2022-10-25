import SideBarHeader from './SideBarHeader';
import SideBarFooter from './SideBarFooter';
import Dashboard from './Dashboard';

const SideBar = ({ newListStatus ,delFormStatus, isToday}) => {

    return (<div className="sidebar">
        <div className="sidebar__body">
            <SideBarHeader />
            <Dashboard newListStatus = {newListStatus} delFormStatus = {delFormStatus} isToday = {isToday}/>
        </div>

        <SideBarFooter />
    </div>);
}

export default SideBar;