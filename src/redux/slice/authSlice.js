import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    email:null,
    username:null,
    userId:null,
    isAdminloggedin : false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER: (state,action)=>{
        const{email,username,userId} = action.payload
        state.isLoggedIn = true;
        state.email = email
        state.username=username
        state.userId=userId
    },
    REMOVE_ACTIVE_USER(state){
        state.isLoggedIn = false;
        state.email =null
        state.username=null
        state.userId=null
    },
    ADMIN_LOGIN(state){
      state.isAdminloggedin = true;
    },
    ADMIN_LOGOUT(state){
      state.isAdminloggedin = false;
    }
  }
});

export const {SET_ACTIVE_USER,REMOVE_ACTIVE_USER,ADMIN_LOGIN,ADMIN_LOGOUT} = authSlice.actions

export const selectisLoggedIn=(state)=>state.auth.isLoggedIn;
export const selectisEmail=(state)=>state.auth.email;
export const selectisUsername=(state)=>state.auth.username;
export const selectisUserId=(state)=>state.auth.userId;
export const selectisAdminLoggedin=(state)=>state.auth.isAdminloggedin;

export default authSlice.reducer