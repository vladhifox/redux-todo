import { NavLink } from 'react-router-dom';

const SideBarHeader = () => {
    return (
            <div className="sidebar__header">
                <div className="sidebar__header-body">
                    <NavLink to="/">
                        <div className="sidebar__header-logo"></div>
                    </NavLink>
                    
                    <div className="sidebar__header-logo-body">
                        <div className="sidebar__header-title">Onboarding Tool</div>
                        <div className="sidebar__header-subtitle">Software Planet Group</div>                
                    </div>                    
                    <div className='sidebar__links'>
                        <NavLink className="sidebar__list" to="/">Dashboard</NavLink>
                        <NavLink className="sidebar__list" to="/today">Today</NavLink>
                    </div>
                </div>                
            </div>
    );
}

export default SideBarHeader;