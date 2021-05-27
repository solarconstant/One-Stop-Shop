import React from "react";
import { Card } from "antd";
import generic_phone from "./../../Images/smartphone.png";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"

const { Meta } = Card;

const AdminProductCard = ({product}) =>
{
    const { title, description, images, price } = product;

    return(
        <Card
            hoverable
            style = {{width : "25vw", height: "450px", objectFit : "contain", marginBottom: "10px"}}
            className = "p-1"
            cover = {
                <img
                    alt="example"
                    src={images && images.length ? images[0].url : generic_phone}
                    style = {{maxHeight: "300px"}}
                />
            }
            actions = {
                [
                    <EditOutlined />,
                    <DeleteOutlined />
                ]
            } 
        >
            <Meta title = {title} description = {`${description && description.substring(0, 30)}...`} />

        </Card>
    )
};

export default AdminProductCard;