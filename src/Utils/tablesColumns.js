import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { Tag } from "atomize";
import moment from "moment";

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
];

export const productTypesColumns = [
    {
        title: 'Icon',
        key: 'icon',
        render: (item) =>(
            <Avatar src={item.icon} />
        )
    },
    {
        title: 'Nom',
        key: 'name',
        dataIndex: 'name'
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

export const categorysColumns = [
    {
        title: 'Icon',
        key: 'icon',
        render: (item) =>(
            <Avatar src={item.cover} />
        )
    },
    {
        title: 'Nom',
        key: 'name',
        dataIndex: 'name'
    },
    {
        title: 'Type',
        key: 'type',
        render: item =>(
            <span>{item.ProductType?.name}</span>
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

export const subCategorysColumns = [
    {
        title: 'Nom',
        key: 'name',
        dataIndex: 'name'
    },
    {
        title: 'Catégorie parent',
        key: 'type',
        render: item =>(
            <span>{item.Category?.name}</span>
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

export const ordersColumns = [
    {
        title: 'Reference',
        key: 'reference',
        dataIndex: 'ref'
    },
    {
        title: 'Temps',
        key: 'time',
        render: item =>(
            <span>{moment(item.createdAt).format('ll')}</span>
        )
    },
    {
        title: 'Adresse de livraison',
        key: 'address',
        dataIndex: 'address'
    },
    {
        title: 'N° de téléphone',
        key: 'phone',
        dataIndex: 'phone'
    },
    {
        title: 'Etat',
        key: 'status',
        render: item =>(
            <Tag rounded="xl">{item.status}</Tag>
        )
    }
]