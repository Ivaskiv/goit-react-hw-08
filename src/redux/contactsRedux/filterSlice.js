import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    name: '',
  },
  reducers: {
    setContactsFilter(state, action) {
      return (state.name = action.payload);
    },
  },
});

export const { setContactsFilter } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
