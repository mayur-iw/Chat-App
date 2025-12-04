import { createSlice } from "@reduxjs/toolkit"

const initialState ={
    _id:"",
    name:"",
    email:"",
    profil_pic:"",
    token:""
};

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser :(state,action)=>{
            state._id = action.payload._id
            state.name = action.payload.name
            state.email = action.payload.email
            state.profil_pic = action.payload.profil_pic
        },
        setToken :(state,action)=>{
            state.token = action.payload;
        },
        logOut : (state,action)=>{
            state._id = ""
            state.name = ""
            state.email = ""
            state.profil_pic = ""
            state.token = ""
        }
    }
});

export const {setUser ,setToken ,logOut } = userSlice.actions;

export default userSlice.reducer