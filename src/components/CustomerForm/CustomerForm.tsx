import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { AlertService, CustomerService } from '../../services';

const CustomerForm = (props: any) => {
  const customerService = CustomerService();
  let navigate = useNavigate();

  let defaultFormModel: any = {
    "first_name": "",
    "last_name": "",
    "email": "",
    "phone": "",
    "address": "",
    "description": ""
  };

  const [formModel, setFormModel] = useState(defaultFormModel);

  const handleInputChange = (item: any) => {
    handleFormModelChange({ [item.name]: item.value });
  }

  const handleFormModelChange = (data: any) => {
    setFormModel((prevState: any) => {
      return { ...prevState, ...data }
    });
  };

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getCustomerById();
    }
  }, []);

  const getCustomerById = async () => {
    try {
      let inputData: any = { id: id }
      let result = await customerService.getCustomerById(inputData);
      setFormModel(result)
    } catch (err: any) { console.log(err) };
  }

  const handleChange = (event: any) => {
    handleInputChange(event.target);
  }

  const handleSubmit = async (event: any) => {
    event.persist();
    if (id) {
      let inputData: any = {
        data: formModel,
        id: id
      }
      await customerService.updateCustomer(inputData);
    } else {
      let inputData: any = {
        data: formModel
      }
      await customerService.addCustomer(inputData);
    }
    AlertService.showSuccessMsg();
    goBack()
  }

  const goBack = () => {
    navigate(-1);
  }

  return (
    <div className='container'>
      <div className='row m-0'>
        <div className='col-3 mb-3'>
          <TextField
            id="outlined-input"
            name="first_name"
            value={formModel.first_name}
            label="First Name"
            placeholder="First Name"
            type="text"
            size="small"
            variant="outlined"
            onChange={handleChange}
          />
        </div>
        <div className='col-3 mb-3'>
          <TextField
            id="outlined-input"
            name="last_name"
            value={formModel.last_name}
            label="Last Name"
            placeholder="Last Name"
            type="text"
            size="small"
            variant="outlined"
            onChange={handleChange}
          />
        </div>
        <div className='col-3 mb-3'>
          <TextField
            id="outlined-input"
            name="email"
            value={formModel.email}
            label="Email Address"
            placeholder="Email Address"
            type="email"
            size="small"
            variant="outlined"
            onChange={handleChange}
          />
        </div>
        <div className='col-3 mb-3'>
          <TextField
            id="outlined-input"
            name="phone"
            value={formModel.phone}
            label="Contact Number"
            placeholder="Contact Number"
            type="text"
            size="small"
            variant="outlined"
            onChange={handleChange}
          />
        </div>
        <div className='col-3 mb-3'>
          <TextField
            id="outlined-input"
            name="address"
            label="Address"
            placeholder="Address"
            value={formModel.address}
            type="text"
            size="small"
            variant="outlined"
            onChange={handleChange}
          />
        </div>
        <div className='col-3 mb-3'>
          <TextField
            id="outlined-input"
            name="description"
            value={formModel.description}
            label="Description"
            placeholder="Description"
            type="text"
            size="small"
            variant="outlined"
            onChange={handleChange}
          />
        </div>
        <div className='col-12 d-flex justify-content-end'>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleSubmit}
          >
            {id &&
              <>Update</>
            }
            {!id &&
              <>Save</>
            }
          </Button>
          <Button
            className='ms-3'
            variant="contained"
            color="error"
            size="small"
            onClick={goBack}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CustomerForm;