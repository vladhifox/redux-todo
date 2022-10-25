import Lists from "./Lists";
import ModalListForm from "./ModalListForm";
import { useState, useEffect } from 'react';

const Dashboard = ({ formChange, getDelFormStatus }) => {
    const [formData, setFormData] = useState();
    const [formStatus, setFormStatus] = useState();

    const handleFormData = (formData) => {
        setFormData(formData);
    }

    const handleFormStatus = (formStatus) => {
        setFormStatus(formStatus);
        formChange(formStatus);
    }

    const handleDelListStatus = (id) => {
        getDelFormStatus(id);
    }

    return (
        <div className="content">
            <ModalListForm postForm={handleFormData} formStatus={formStatus} />

            <main className="main">
                <div className="container">
                    <Lists getForm={formData} getFormStatus={handleFormStatus} delListStatus={handleDelListStatus} />
                </div>
            </main>
        </div>
    );
}

export default Dashboard;