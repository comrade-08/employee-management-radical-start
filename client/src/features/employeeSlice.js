// redux/employeeSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = "http://localhost:5000/api/employees";

// Fetch all
export const fetchEmployees = createAsyncThunk(
    "employees/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(API_URL);
            return res.data;
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || "Failed to fetch employees!");
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

export const fetchEmployeeById = createAsyncThunk(
    "employees/fetch",
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${API_URL}/${id}`);
            return res.data;
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || "Failed to fetch employee!");
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// Add employee
export const addEmployee = createAsyncThunk(
    "employees/add",
    async (employee, { rejectWithValue }) => {
        try {
            const res = await axios.post(API_URL, employee);
            toast.success("Employee added successfully");
            console.log(res.data, 'addEmployee')
            return res.data;
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || "Failed to add employee!");
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// Delete employee
export const deleteEmployee = createAsyncThunk(
    "employees/delete",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            toast.success("Employee deleted");
            return id;
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || "Failed to delete employee!");
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

// Update employee
export const updateEmployee = createAsyncThunk(
    "employees/update",
    async (employee, { rejectWithValue }) => {
        try {
            const res = await axios.put(`${API_URL}/${employee._id}`, employee);
            toast.success("Employee updated");
            return res.data;
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || "Failed to update employee!");
            console.log(err)
            return rejectWithValue(err.response?.data?.message || err.message);
        }
    }
);

const employeeSlice = createSlice({
    name: "employees",
    initialState: {
        employees: [],
        selectedEmployee: null,
        loading: false,
        isUpdating: false,
        isSaving: false,
        isDeleting: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.loading = false;
                state.employees = action.payload;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.loading = false;
                state.employees = [];
                state.error = action.payload;
            })
            .addCase(fetchEmployeeById.fulfilled, (state, action) => {
                state.isFetch = false;
                state.selectedEmployee = action.payload;
            })
            .addCase(fetchEmployeeById.rejected, (state, action) => {
                state.isFetch = false;
                state.selectedEmployee = null;
                state.error = action.payload;
            })
            .addCase(addEmployee.fulfilled, (state, action) => {
                state.employees.push(action.payload);
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                console.log(action.payload, "deleteEmployee")
                state.employees = state.employees.filter((emp) => emp._id !== action.payload);
            })
            .addCase(updateEmployee.pending, (state) => {
                state.isUpdating = true;
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                console.log(action.payload, 'updateEmployee', state.employees)
                const index = state.employees.findIndex((emp) => emp._id === action.payload._id);
                if (index !== -1) state.employees[index] = action.payload;
                state.isUpdating = false;
            })
            .addCase(updateEmployee.rejected, (state, action) => {
                state.isUpdating = false;
                state.error = action.payload;
            })
    },
});

export default employeeSlice.reducer;
