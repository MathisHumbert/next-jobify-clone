import { createSlice } from '@reduxjs/toolkit';

const defaultSearchForm = {
  position: '',
  status: 'all',
  type: 'all',
  sort: 'latest',
};

const initialState = {
  searchForm: defaultSearchForm,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    onSearchFormChange: (state, action) => {
      const { name, value } = action.payload;
      state.searchForm[name] = value;
    },
    resetSearchForm: (state) => {
      state.searchForm = defaultSearchForm;
    },
  },
});

export const { onSearchFormChange, resetSearchForm } = appSlice.actions;

export default appSlice.reducer;
