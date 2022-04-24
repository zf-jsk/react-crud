import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Customers from './components/Customers/Customers';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import CustomerForm from './components/CustomerForm/CustomerForm';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      {/* Header Bar */}
      <Box sx={{ flexGrow: 1, mb: 4 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Link to={`/`}>
              <IconButton edge="start" aria-label="menu" sx={{ mr: 2, color: 'white' }}>
                <HomeIcon />
              </IconButton>
            </Link>
            <Typography variant="h6" color="inherit" component="div">
              Customer
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      {/* Header Bar */}

      <Routes>
        <Route path="/" element={<Customers />} />
        <Route path="/create" element={<CustomerForm />} />
        <Route path="/create/:id" element={<CustomerForm />} />
      </Routes>
      <ToastContainer />

    </Router>
  );
}

export default App;
