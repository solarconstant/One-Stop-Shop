import React, { useState } from 'react';
import { Menu } from 'antd';
import { HomeOutlined, SettingOutlined, UserOutlined, UserAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';     //like dispatch is used to change the state by sending data, selector is used to get the state
import firebase from 'firebase';
import { useHistory } from 'react-router-dom';      //Header is not a route on its own; so history cannot be accessed. This hook is used to resolve that.


const { SubMenu } = Menu;
const Header = () =>
{
    const [current, setCurrent] = useState('');
    let dispatch = useDispatch();
    let history = useHistory();
    let { user } = useSelector((state) => ({ ...state }));     //redux state
    console.log(user);
    const { Item } = Menu;
    const handleClick = (e) =>
    {
        setCurrent(e.key);
    }
    const logout = () =>
    {
        firebase.auth().signOut();
        dispatch(
            {
                type: "LOGOUT",
                payload: null,
            }
        );
        history.push('/login');
    };
    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={<HomeOutlined />}>
                <Link to = "/home">Home</Link>
            </Item>

            {(!user) && (
                <Item key="login" icon={<UserOutlined />} className = "float-right">
                <Link to = "/login">Login</Link>
                </Item>
            )}
            {(!user) && (
                <Item key="register" icon={<UserAddOutlined />} className = "float-right">
                <Link to = "/register">Register</Link>
                </Item>
            )}
            
            {user && (
                <SubMenu
                className = "float-right"
                key="user"
                icon={<SettingOutlined />}
                title={user.email && user.email.split('@')[0]}>
                    <Item icon = {<UserOutlined />} onClick = {logout}>Log Out</Item>
                    {user && user.role === "subscriber" && (
                        <Item>
                            <Link to = 'user/history'>Dashboard</Link>
                        </Item>
                    )}
                    {user && user.role === "admin" && (
                        <Item>
                            <Link to = '/admin/dashboard'>Dashboard</Link>
                        </Item>
                    )}
                </SubMenu>
            )}
      </Menu>
    )
}

export default Header;