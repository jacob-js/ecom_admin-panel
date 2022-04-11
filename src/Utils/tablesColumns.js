import { DeleteOutlined, EditOutlined, EyeOutlined, LoadingOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Popconfirm } from "antd";
import { Tag } from "atomize";
import moment from "moment";
import { MdOutlineCategory } from "react-icons/md";

export const productsColumns = (onDelete, loadingDelete, id, viewEdit, onDetailView) => [
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
        render: (item) =>(
            <span>{item.Category?.name}</span>
        )
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
            <div className="row-actions">
                <EyeOutlined className="view-row" onClick={() =>onDetailView(item)} />
            </div>
        )
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (item) =>(
            <div className="row-actions">
                <EditOutlined className="edit-row" onClick={() =>viewEdit(item)} /> {
                    loadingDelete && item.id === id ? <LoadingOutlined />:
                    <Popconfirm 
                        onConfirm={() =>onDelete(item.id)} title="Etes-vous sûr de vouloir supprimer ?"
                        okText="Confirmer"
                        cancelText='Annuler'
                        okType="danger"
                    >
                        <DeleteOutlined className="delete-row" />
                    </Popconfirm>
                }
            </div>
        )
    }
];

export const productTypesColumns = (onDelete, loadingDelete, id) => [
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
            <div className="row-actions">
                <EditOutlined className="edit-row" /> {
                    loadingDelete && item.id === id ? <LoadingOutlined />:
                    <Popconfirm 
                        onConfirm={() =>onDelete(item.id)} title="Etes-vous sûr de vouloir supprimer ?"
                        okText="Confirmer"
                        cancelText='Annuler'
                        okType="danger"
                    >
                        <DeleteOutlined className="delete-row" />
                    </Popconfirm>
                }
            </div>
        )
    }
]

export const categorysColumns = (onDelete, loadingDelete, id) => [
    {
        title: 'Icon',
        key: 'icon',
        render: (item) =>(
            item.cover ? <Avatar src={item.cover} />:
            <Avatar icon={<MdOutlineCategory />} />
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
            <span>{item.ParentCateg?.name}</span>
        )
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (item) =>(
            <div className="row-actions">
                <EditOutlined className="edit-row" /> {
                    loadingDelete && item.id === id ? <LoadingOutlined />:
                    <Popconfirm 
                        onConfirm={() =>onDelete(item.id)} title="Etes-vous sûr de vouloir supprimer ?"
                        okText="Confirmer"
                        cancelText='Annuler'
                        okType="danger"
                    >
                        <DeleteOutlined className="delete-row" />
                    </Popconfirm>
                }
            </div>
        )
    }
]

export const subCategorysColumns = (onDelete, loadingDelete, id) => [
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
            <div className="row-actions">
                <EditOutlined className="edit-row" /> {
                    loadingDelete && item.id === id ? <LoadingOutlined />:
                    <Popconfirm 
                        onConfirm={() =>onDelete(item.id)} title="Etes-vous sûr de vouloir supprimer ?"
                        okText="Confirmer"
                        cancelText='Annuler'
                        okType="danger"
                    >
                        <DeleteOutlined className="delete-row" />
                    </Popconfirm>
                }
            </div>
        )
    }
]

export const ordersColumns = (onViewOrder) => [
    {
        title: 'Reference',
        key: 'reference',
        dataIndex: 'ref'
    },
    {
        title: 'Temps',
        key: 'time',
        render: item =>(
            <span>{moment(item.createdAt).format('DD-MM-YYYY  HH:mm')}</span>
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
        render: record =>(
            record.status === 'inProcess' ?
            <Tag p={{ x: "10px", y: "5px" }} bg="warning400" rounded="circle">{record.status}</Tag> :
            record.status === 'delivered' ?
            <Tag textColor="success700" bg="success400" p={{ x: "10px", y: "5px" }} rounded="circle">{record.status}</Tag> :
            record.status === 'cancelled' ?
            <Tag textColor="danger700" bg="danger200" p={{ x: "10px", y: "5px" }} rounded="circle">{record.status}</Tag>:
            <Tag p={{ x: "10px", y: "5px" }} rounded="xl">{record.status}</Tag>
        )
    },
    {
        title: 'Détail',
        key: 'detail',
        render: (item) =>(
            <div className="row-actions">
                <EyeOutlined className="view-row" onClick={() =>onViewOrder(item)} />
            </div>
        )
    },
]

export const usersColumns = () => [
    {
        render: user =>(
            <Avatar src={user.cover ? user.cover: null} icon={<UserOutlined />} />
        )
    },
    {
        title: 'ID',
        dataIndex: 'id'
    },
    {
        title: "Date d'inscription",
        render: (user) =>(
            <span>{moment(user.createdAt).format('DD-MM-YYYY')}</span>
        )
    },
    {
        title: 'Nom',
        dataIndex: 'fullname'
    },
    {
        title: 'Email',
        dataIndex: 'email'
    },
    {
        title: 'Phone',
        dataIndex: 'phone'
    },
    {
        title: 'Actions',
        key: 'actions',
        render: (item) =>(
            <div className="row-actions">
                <EyeOutlined className="edit-row" /> {
                    <Popconfirm 
                        onConfirm title="Etes-vous sûr de vouloir supprimer ?"
                        okText="Confirmer"
                        cancelText='Annuler'
                        okType="danger"
                    >
                        <DeleteOutlined className="delete-row" />
                    </Popconfirm>
                }
            </div>
        )
    }
];