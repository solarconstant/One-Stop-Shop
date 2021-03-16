import React from "react";
import { Card } from "antd";

const { Meta } = Card;

const AdminProductCard = ({product}) =>
{
    const { title, description, images, price } = product;

    return(
        <Card
            hoverable
            style = {{height : "100px", objectFit : "contain"}}
            className = "p-1"
        >
            <Meta title = {title} description = {description} />
        </Card>
    )
};

export default AdminProductCard;