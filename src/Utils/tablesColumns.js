import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

export const productsColumns = [
    {
        title: 'Nom du produit',
        key: 'name',
        render: (item) =>(
            <>
                <Avatar src={item.cover} /> {item.name}
            </>
        )
    },
    {
        title: 'Catégorie',
        key: 'category',
        dataIndex: 'category'
    },
    {
        title: 'Prix',
        key: 'price',
        render: (item) =>(
            <>
                {item.price}{item.currency === 'cdf'?'FC': '$' }
            </>
        )
    },
    {
        title: 'Stock',
        key: 'stock',
        render: (item) =>(
            <>{item.quantity}{item.quantityMetric}{item.quantity > 1 ? 's': ''}</>
        )
    },
    {
        title: 'Réduction',
        key: 'discount',
        render: (item) =>(
            <>{item.discount}{item.currency === 'cdf'?'FC': '$' }</>
        )
    },
    {
        title: 'Détail',
        key: 'detail',
        render: (item) =>(
            <EyeOutlined />
        )
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (item) =>(
            <>
                <EditOutlined /> <DeleteOutlined />
            </>
        )
    }
]