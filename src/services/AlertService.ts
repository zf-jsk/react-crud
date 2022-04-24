import React from 'react';
import { toast } from 'react-toastify';

export const AlertService = {

    showSuccessMsg(msg: any="Success") {
        toast(msg, {
            type: 'success',
            position: 'top-right'
        });
    },

    showErrorMsg(msg: any) {
        toast(msg, {
            type: 'error',
            position: 'top-right'
        });
    },

    showMsg(options: any) {
        const position = options.position || 'top-right';
        const message = options.action == 'success' && !options.message ? 'Success' : options.message;
        const messageType = options.type || 'info';
        toast(message, {
            type: messageType,
            position: position
        });
    },
}