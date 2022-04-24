import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { AlertService, CustomerService } from '../../services';

const Customers = (props: any) => {
    const customerService = CustomerService();
    let initialList: any = [];
    const [items, setItems] = useState(initialList)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            let result = await customerService.getCustomers();
            setItems(result);
        } catch (err: any) { console.log(err) };
    }

    const deleteCustomer = async (id: any) => {
        try {
            let inputData: any = { id: id }
            await customerService.deleteCustomer(inputData);
            AlertService.showSuccessMsg();
            getData();
        } catch (err: any) { console.log(err) };
    }

    return (
        <div className='container'>
            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }}>
                <Link to={`/create`}>
                    <i className="fas fa-plus-circle"></i>
                </Link>
            </Box>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Contact Number</th>
                        <th scope="col">Address</th>
                        <th scope="col">Description</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items && items.length > 0 && items.map((item: any, index:any) => (
                        <tr key={index}>
                            <td>
                                {item.first_name} {item.last_name}
                            </td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.address}</td>
                            <td>{item.description}</td>
                            <td>
                                <Link to={`create/${item.id}`}>
                                    <i className="fas fa-pencil-alt"></i>
                                </Link>
                                <span className='ms-3' onClick={e => deleteCustomer(item.id)}>
                                    <i className="far fa-trash-alt text-danger pointer"></i>
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default Customers;