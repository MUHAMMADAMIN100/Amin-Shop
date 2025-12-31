import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../../app/store/store';
import { fetchProductById } from '../thunks';
import { clearProductById } from '../productByIdSlice';
import { Button, Spin } from 'antd';
import { addToCart } from '../../cart/thunks';

export default function ProductByIdUi() {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();

    const { product, loading } = useSelector(
        (state: any) => state.productById
    );

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(Number(id)));
        }

        return () => {
            dispatch(clearProductById());
        };
    }, [id, dispatch]);

    if (loading) return <Spin />;
    if (!product) return <h3>Продукт не найден</h3>;

    return (
        <div>
            <img
                src={`http://37.27.29.18:8002/${product.image}`}
                width={300}
                alt={product.productName}
            />

            <h2>{product.productName}</h2>
            <h3>{product.price} $</h3>

            <Button
                type="primary"
                onClick={() => dispatch(addToCart(product.id))}
            >
                Добавить в корзину
            </Button>
        </div>
    );
}
