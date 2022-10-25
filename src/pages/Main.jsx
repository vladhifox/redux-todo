import { Fragment } from 'react';
import SideBar from "../components/SideBar/SideBar";
import Main_comp from "../components/Content/Main_comp";
import { useState } from 'react';

const Main = () => {
    const [newListStatus, setNewListStatus] = useState();
    const [delFormStatus, setDelFormStatus] = useState();

    const handleFormStatus = (listFormObj) => {
        setNewListStatus(listFormObj);
    }

    const handleDelListStatus = (id) => {
        setDelFormStatus(id);
    }

    return (
        <Fragment>
            <SideBar newListStatus={newListStatus} delFormStatus={delFormStatus} />
            <Main_comp formChange={handleFormStatus} getDelFormStatus={handleDelListStatus} />
        </Fragment>
    );

}

export default Main;