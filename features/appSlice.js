import { createSlice } from '@reduxjs/toolkit';

const defaultSearchForm = {
  position: '',
  status: 'all',
  type: 'all',
  sort: 'latest',
};

const defaultJobForm = {
  position: '',
  company: '',
  job_location: '',
  status: 'pending',
  job_type: 'full-time',
};

const initialState = {
  searchForm: defaultSearchForm,
  jobForm: defaultJobForm,
  editId: '',
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
    onJobFormChange: (state, action) => {
      const { name, value } = action.payload;
      state.jobForm[name] = value;
    },
    resetJobForm: (state) => {
      state.jobForm = defaultJobForm;
      editId = '';
    },
    setJobForm: (state, action) => {
      const { company, job_location, position, status, job_type, id } =
        action.payload;
      state.jobForm = { company, job_location, position, status, job_type };
      editId = id;
    },
  },
});

export const {
  onSearchFormChange,
  resetSearchForm,
  onJobFormChange,
  resetJobForm,
  setJobForm,
} = appSlice.actions;

export default appSlice.reducer;
