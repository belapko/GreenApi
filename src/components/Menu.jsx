import React, {useState} from 'react';
import '../styles/Menu.css'
import {FaUser} from "react-icons/fa";


const Menu = ({users, activeUser, getActiveUser, getUsers}) => {
    const [value, setValue] = useState('');

    return (
        <div className='menu'>
            <div className='add-user'>
                <input  className='menu-input' placeholder='Введите номер телефона' value={value}
                        onChange={(e) => setValue(e.target.value)} />
                <button className='menu-button' onClick={() =>
                    !users.includes(value + '@c.us') && value !== '' ? getUsers([...users, value + '@c.us']) : null}>Добавить</button>
            </div>
            {users.map(user => user === activeUser ? (
                    <div onClick={() => getActiveUser(user)} key={Math.random()} className='menu-user' style={{'background': '#444444'}}>
                        <FaUser className='user-icon' size={50} color={'#ffffff'}/>
                        <div className='menu-user__text'>
                            <p>{user}</p>
                        </div>
                    </div>
                )
            :
                (
                    <div onClick={() => getActiveUser(user)} key={Math.random()} className='menu-user' style={{'background': '#333333'}}>
                        <FaUser className='user-icon' size={50} color={'#ffffff'}/>
                        <div className='menu-user__text'>
                            <p>{user}</p>
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default Menu;