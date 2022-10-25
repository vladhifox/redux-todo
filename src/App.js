import './style.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import TodoListPage from './pages/TodoListPage'
import TodayTasksPage from './pages/TodayTasksPage'


function App() {

    return (
        <BrowserRouter>
            <div className="wrapper">
                <div className="todo">
                    <div className="todo__row">
                        <Routes>
                            <Route path={'/'} element={<Main />} />
                            <Route path={'/todo-list/:id'} element={<TodoListPage />} />
                            <Route path={'/today'} element={<TodayTasksPage />} />
                        </Routes>

                        {/* <Dashboard />
                        <Content /> */}
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
