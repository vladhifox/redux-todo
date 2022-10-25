import React from 'react';
import SideBar from '../components/SideBar/SideBar';
import Content from '../components/Content/Content';
import { Fragment } from 'react';

const TodayTasksPage = () => {

    return (
        <Fragment>
            <SideBar isToday={true}/>
            <Content isToday={true} />
        </Fragment>
    );
}

export default TodayTasksPage;