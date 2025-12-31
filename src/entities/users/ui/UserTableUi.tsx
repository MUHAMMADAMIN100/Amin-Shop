import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../userSlice';
import { type RootState, type AppDispatch } from '../../../app/providers/ReduxProvider';
import { Table } from 'antd';
import { useEffect } from 'react';

export const UserTable = () => {
    const dispatch = useDispatch<AppDispatch>()
    const { users, loading } = useSelector((state: RootState) => state.users)

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
        { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
    ]
    return <Table    dataSource={Array.isArray(users) ? users : []} columns={columns} loading={loading} rowKey="userId" />

}