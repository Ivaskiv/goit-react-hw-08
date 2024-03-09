import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Set the base URL for Axios
axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

// Utility to add JWT
const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Utility to remove JWT
const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

/*
 * Асинхронна операція реєстрації користувача
 * POST @ /users/signup
 * body: { name, email, password }
 */
export const register = createAsyncThunk('auth/register', async (credentials, thunkAPI) => {
  try {
    const res = await axios.post('/users/signup', credentials);
    // Встановлення отриманого токену до заголовків
    setAuthHeader(res.data.token);
    // Виведення повідомлення про успішну реєстрацію
    toast.success('User created successfully!');
    // Повернення отриманих даних для збереження в Redux store
    return res.data;
  } catch (error) {
    console.error('Registration Error:', error);
    // Виведення повідомлення про помилку реєстрації
    toast.error('User creation error.');
    // Обробка різних видів помилок і повернення відповідного значення
    if (error.response) {
      return thunkAPI.rejectWithValue(error.response.data);
    } else if (error.request) {
      return thunkAPI.rejectWithValue('No response received from the server');
    } else {
      return thunkAPI.rejectWithValue('Error setting up the request');
    }
  }
});

/*
 * POST @ /users/login
 * body: { email, password }
 */
export const logIn = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
  console.log('Login Credentials:', credentials);
  try {
    const res = await axios.post('/users/login', credentials);
    setAuthHeader(res.data.token);
    toast.success('User is logged in.');
    return res.data;
  } catch (error) {
    console.error('Login Error:', error);
    toast.error('Login error.');
    return thunkAPI.rejectWithValue(error.message);
  }
});

/*
 * POST @ /users/logout
 * headers: Authorization: Bearer token
 */
export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await axios.post('/users/logout');
    clearAuthHeader();
    toast.success('User logged out successfully.');
  } catch (error) {
    toast.error('Logout error.');
    return thunkAPI.rejectWithValue(error.message);
  }
});

/*
 * GET @ /users/me
 * headers: Authorization: Bearer token
 */
export const refreshUser = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const persistedToken = state.auth.token;

  if (persistedToken === null) {
    return thunkAPI.rejectWithValue('Unable to fetch user');
  }

  try {
    setAuthHeader(persistedToken);
    const res = await axios.get('/users/current');
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
