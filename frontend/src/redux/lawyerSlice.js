import { createSlice } from "@reduxjs/toolkit";

const lawyerSlice = createSlice({
    name:"lawyer",
    initialState:{
        allLawyers:[],
        allAdminLawyers:[],
        singleLawyer:null, 
        searchLawyerByText:"",
        allAppliedLawyers:[],
        searchedQuery:"",
    },
    reducers:{
        // actions
        setAllLawyers:(state,action) => {
            state.allLawyers = action.payload;
        },
        setSingleLawyer:(state,action) => {
            state.singleLawyer = action.payload;
        },
        setAllAdminLawyers:(state,action) => {
            state.allAdminLawyers = action.payload;
        },
        setSearchLawyerByText:(state,action) => {
            state.searchLawyerByText = action.payload;
        },
        setAllAppliedLawyers:(state,action) => {
            state.allAppliedLawyers = action.payload;
        },
        setSearchedQuery:(state,action) => {
            state.searchedQuery = action.payload;
        }
    }
});
export const {
    setAllLawyers, 
    setSingleLawyer, 
    setAllAdminLawyers,
    setSearchLawyerByText, 
    setAllAppliedLawyers,
    setSearchedQuery
} = lawyerSlice.actions;
export default lawyerSlice.reducer;