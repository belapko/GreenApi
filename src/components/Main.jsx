import React, {useState} from 'react';
import '../styles/Main.css'
import Menu from './Menu'
import Chat from "./Chat";


const Main = () => {
    const [activeUser, setActiveUser] = useState();
    const [users, setUsers] = useState([]);

    function getUsers(users) {
        setUsers(users);
    }

    function getActiveUser(user) {
        setActiveUser(user);
    }

    return (
        <div className='main'>
            <Menu users={users} activeUser={activeUser} getActiveUser={getActiveUser} getUsers={getUsers}/>
            <Chat getUsers={getUsers} user={activeUser} users={users}/>
        </div>
    );
};

export default Main;