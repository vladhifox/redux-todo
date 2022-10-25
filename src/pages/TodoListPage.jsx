import SideBar from '../components/SideBar/SideBar';
import Content from '../components/Content/Content';
import { Fragment} from 'react';
import { useParams } from 'react-router-dom';

const TodoListPage = () => {
    const { id } = useParams();    

    return (
        <Fragment>
            <SideBar/> 
            <Content listIdFromURL={parseInt(id)} />
        </Fragment>
    );
}

export default TodoListPage;