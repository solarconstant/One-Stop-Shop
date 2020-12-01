import React, { useState } from 'react';
import { Menu } from 'antd';
import { HomeOutlined, SettingOutlined, UserOutlined, UserAddOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { SubMenu } = Menu;


const Header = () =>
{
    const [current, setCurrent] = useState('');
    const { Item } = Menu;
    const handleClick = (e) =>
    {
        setCurrent(e.key);
    }

    return (
        <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Item key="home" icon={<HomeOutlined />}>
                <Link to = "/home">Home</Link>
            </Item>
            <Item key="login" icon={<UserOutlined />} className = "float-right">
            <Link to = "/login">Login</Link>
            </Item>
            <Item key="register" icon={<UserAddOutlined />} className = "float-right">
                <Link to = "/register">Register</Link>
            </Item>
         

            <SubMenu
            key="user"
            icon={<SettingOutlined />}
            title="Username">
                <Item key="setting:1">Log Out</Item>
                <Item key="setting:2">Option 2</Item>
            </SubMenu>
      </Menu>
    )
}

export default Header;