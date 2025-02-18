import { createSlice } from "@reduxjs/toolkit";

const courtSlice = createSlice({
    name:"court",
    initialState:{
        singleCourt:null,
        courts:[],
        searchCourtByText:"",
    },
    reducers:{
        // actions
        setSingleCourt:(state,action) => {
            state.singleCourt = action.payload;
        },
        setCourts:(state,action) => {
            state.courts = action.payload;
        },
        setSearchCourtByText:(state,action) => {
            state.searchCourtByText = action.payload;
        }
    }
});
export const {setSingleCourt, setCourts,setSearchCourtByText} = courtSlice.actions;
export default courtSlice.reducer;