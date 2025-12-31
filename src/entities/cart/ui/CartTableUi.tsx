import { Table, Button, Space } from 'antd';
import { useDispatch } from 'react-redux';
import {
    removeFromCart,
    increaseProduct,
    reduceProduct,
} from '../thunks.ts';

export const CartTable = ({ items, loading }) => {
    const dispatch = useDispatch();

    const columns = [
        {
            title: 'Название',
            dataIndex: ['product', 'productName'],
        },
        {
            title: 'Цена',
            dataIndex: ['product', 'price'],
        },
        {
            title: 'Количество',
            key: 'quantity',
            render: (_, record) => (
                <Space>
                    <Button
                        onClick={() => dispatch(reduceProduct(record.id))}
                        disabled={record.quantity <= 1}
                    >
                        -
                    </Button>

                    <strong>{record.quantity}</strong>

                    <Button
                        onClick={() => dispatch(increaseProduct(record.id))}
                    >
                        +
                    </Button>
                </Space>
            )
        },
        {
            title: 'Действия',
            render: (_, record) => (
                <Button
                    danger
                    onClick={() => dispatch(removeFromCart(record.id))}
                >
                    Удалить
                </Button>
            ),
        },
    ];

    return (
        <Table
            rowKey="id"
            dataSource={items}
            columns={columns}
            loading={loading}
        />
    );
};
