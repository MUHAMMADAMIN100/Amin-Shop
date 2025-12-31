import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../../entities/cart/thunks';
import { CartTable } from '../../entities/cart/ui/CartTableUi';
import { Button } from 'antd';
import { clearCart } from '../../entities/cart/thunks';
import type { AppDispatch } from '../../app/store/store';

export default function CartPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { products, loading } = useSelector((state: any) => state.cart ?? []);
    const totalPrice = products.reduce(
        (acc: number, item: any) => acc + (item.product.price * item.quantity),
        0
    );

    useEffect(() => {   
        dispatch(fetchCart());
    }, [dispatch]);

    return (
        <>
            <h2>Корзина</h2>
            <CartTable items={products || []} loading={loading} />
            <Button danger onClick={() => dispatch(clearCart())} disabled={!products.length}>
                Очистить корзину
            </Button>
            <h3>Итого: {totalPrice}$</h3>
        </>
    );
}
