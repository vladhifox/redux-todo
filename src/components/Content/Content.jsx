import { useState } from 'react';
import ModalForm from "./ModalForm";
import YesNoBox from "./YesNoBox";
import Tasks from "./Tasks";

let lastTab;

const Content = ({ activeList, listIdFromURL, isToday }) => {
    const [tabStatus, setTabStatus] = useState(-2);
    const [formData, setFormData] = useState();
    const [formStatus, setFormStatus] = useState();

    const handleFormData = (formData) => {
        setFormData(formData);
    }

    const handleFormStatus = (formStatus) => {
        setFormStatus(formStatus);
    }

    const handleTabStatus = (event) => {
        if (lastTab) {
            lastTab.classList.remove('status-bar_active');
        }

        event.target.classList.add('status-bar_active');
        lastTab = event.target;

        const tabState = event.target.getAttribute('data-status')

        setTabStatus(parseInt(tabState));
    }

    return (
        <div className="content">
            <ModalForm postForm={handleFormData} formStatus={formStatus} />

            <div className="container">
                <div className="context__header">
                    <div className="context__header-body">
                        <div className="context__header-ico"></div>
                        <div className="context__header-title title">Поточні завдання
                            <div className="context__header-description">
                                <p>Загальна дошка в системі, що містить поточні завдання</p>
                            </div>
                        </div>
                    </div>

                    <div className="context__status-bar" onClick={(event) => { handleTabStatus(event) }}>
                        <span className="status-bar__all" data-status="-2">Всі</span>
                        <span className="status-bar__done" data-status="1">Виконані</span>
                        <span className="status-bar__process" data-status="0">У роботі</span>
                    </div>
                </div>
            </div>

            <main className="main">
                <YesNoBox />

                <div className="container">
                    <Tasks isToday={isToday} listIdFromURL={listIdFromURL} activeList={activeList} getTabStatus={tabStatus} getForm={formData} getFormStatus={handleFormStatus} />
                </div>
            </main>
        </div>
    );
}

export default Content;