import React from 'react';
import { apiClient } from '../helpers/apiClient';

export const CustomerService = () => {

    const getCustomers = async () => {
        let result = await apiClient.doAction();
        return result;
    }

    const getCustomerById = async (inputData: any) => {
        let apiOptions: any = {
            id: inputData.id
        }
        let result = await apiClient.doAction(apiOptions);
        return result;
    }

    const deleteCustomer = async (inputData: any) => {
        let apiOptions: any = {
            method: "DELETE",
            id: inputData.id
        }
        let result = await apiClient.doAction(apiOptions);
        return result;
    }

    const addCustomer = async (inputData: any) => {
        let apiOptions: any = {
            method: "POST",
            body:inputData.data
        }
        let result = await apiClient.doAction(apiOptions);
        return result;
    }

    const updateCustomer = async (inputData: any) => {
        let apiOptions: any = {
            method: "PUT",
            body:inputData.data,
            id: inputData.id
        }
        let result = await apiClient.doAction(apiOptions);
        return result;
    }

    return {
        getCustomers,
        deleteCustomer,
        getCustomerById,
        addCustomer,
        updateCustomer
    }
}