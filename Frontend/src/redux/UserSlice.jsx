import { createSlice } from "@reduxjs/toolkit"
import { Socket } from "socket.io-client";

const initialState ={
    _id:"",
    name:"",
    email:"",
    profile_pic:"",
    token:"",
    onlineUser:[],
    // SocketConnection : null
};

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser :(state,action)=>{
            state._id = action.payload._id
            state.name = action.payload.name
            state.email = action.payload.email
            state.profile_pic = action.payload.profile_pic
        },
        setToken :(state,action)=>{
            state.token = action.payload;
        }, 
        logOut : (state,action)=>{
            state._id = ""
            state.name = ""
            state.email = ""
            state.profile_pic = ""
            state.token = ""
            // state.SocketConnection = null    
        },

        setOnlineUser:(state,action)=>{
            state.onlineUser = action.payload
        },

        // setSocketConnection:(state,action)=>{
        //     state.SocketConnection = action.payload
        // }

    }
});

export const {setUser ,setToken ,logOut,setOnlineUser } = userSlice.actions;

export default userSlice.reducer