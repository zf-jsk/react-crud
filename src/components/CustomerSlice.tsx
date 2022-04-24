import { createSlice, createAsyncThunk, configureStore, AnyAction, applyMiddleware } from "@reduxjs/toolkit";
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { CustomerService } from '../services';

interface CustomerState {
    items:[]
}
const pageState:CustomerState ={
    items: []
}

export const fetchCustomers = createAsyncThunk(
    'customers/fetch',
    async (options:any, thunkAPI) => {
      const customerService:any = CustomerService();
      const response = await customerService.getCustomers();
      return response;
    }
);

const customerSlice = createSlice({
    name: "customers-slice",
    initialState: pageState,
    reducers: {
      getItems: (draft, action) => {
        
      }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCustomers.fulfilled, (draft, action) => {
            const items:[] = action.payload;
            draft.items = [...draft.items, ...items];
        });
    }        
});

export const store = configureStore({
    reducer: {
        customer: customerSlice.reducer,        
    },
    middleware:[thunk]
});

export const {
    getItems,
} = customerSlice.actions;


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type TypedDispatch = ThunkDispatch<RootState, any, AnyAction>;
export type TypedThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;



export default customerSlice.reducer;

