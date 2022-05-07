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

const defaultAlert = {
  type: '',
  text: '',
  show: false,
};

const initialState = {
  searchForm: defaultSearchForm,
  jobForm: defaultJobForm,
  editId: '',
  alert: defaultAlert,
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
      state.editId = '';
    },
    setJobForm: (state, action) => {
      const { company, job_location, position, status, job_type } =
        action.payload.job;
      state.jobForm = { company, job_location, position, status, job_type };
      state.editId = action.payload.id;
    },
    setAlert: (state, action) => {
      state.alert = { ...action.payload, show: true };
    },
    unsetAlert: (state) => {
      state.alert = defaultAlert;
    },
  },
});

export const {
  onSearchFormChange,
  resetSearchForm,
  onJobFormChange,
  resetJobForm,
  setJobForm,
  setAlert,
  unsetAlert,
} = appSlice.actions;

export default appSlice.reducer;
