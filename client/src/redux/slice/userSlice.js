import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { delay } from '../../utils/myUtils';
import userApi from '../../apis/userApi';
import Toast from '../../components/Toastify';
import apiService from '../../utils/apiService';
import { getLatestToken } from '../../utils/myUtils';
const initialState = {
    isLoading: false,
    info: {},
    listComments: [],
    countView: {},
    isOtp: false,
    isSend: false,
    isAuth: false,
    verifySocialUser: true,
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        refreshToken(state, action) {
            // console.log('User Refresh Token', action);s
            state.info = {
                ...state.info,
                ...action?.payload?.data,
            };
        },
        addComment(state, action) {
            state.listComments.push(action.payload);
        },
        verifyOtp(state, action) {
            state.isOtp = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Login
        builder.addCase(login.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.info = action.payload.data;
            state.isAuth = true;
        });
        builder.addCase(login.rejected, (state, action) => {
            state.isAuth = false;
            state.isLoading = false;
        });
        // Register
        builder.addCase(register.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(register.rejected, (state, action) => {
            state.isLoading = false;
        });
        // Logout
        builder.addCase(logout.pending, (state, action) => {
            state.isAuth = true;
            state.isLogout = true;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.info = {};
            state.isAuth = false;
            state.isLogout = false;
        });
        builder.addCase(logout.rejected, (state, action) => {
            state.isAuth = true;
            state.isLogout = false;
        });
        // Update User
        builder.addCase(updateUser.pending, (state, action) => {
            state.isUpdateUser = true;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.info = {
                ...state.info,
                ...action.payload.data,
            };
            state.isUpdateUser = false;
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            state.isUpdateUser= false;
        });
        // Get Comments
        builder.addCase(getComments.fulfilled, (state, action) => {
            state.isLoading = false;
            state.listComments = action.payload?.data?.listComments;
            state.countView = action.payload?.data?.countFeedbackProduct;
        });
        // Comment
        builder.addCase(commentUser.pending, (state, action) => {
            state.isLoading = true;
        });
        //  Delete comment
        builder.addCase(deleteComment.pending, (state, action) => {
            state.isLoading = true;
        });
        // Login Social
        builder.addCase(loginSocial.fulfilled, (state, action) => {
            state.info = action.payload?.data;
            state.verifySocialUser = true;
            state.isAuth = true;
        });
        builder.addCase(loginSocial.rejected, (state, action) => {
            state.verifySocialUser = false;
        });
        // Get User Info
        builder.addCase(getUserInfo.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getUserInfo.fulfilled, (state, action) => {
            state.info = { ...state.info, ...action?.payload?.data };
            state.isLoading = false;
        });
        builder.addCase(getUserInfo.rejected, (state, action) => {
            state.isLoading = true;
        });
        // Change Pw
        builder.addCase(changePw.pending, (state, action) => {
            state.isChangePw = true;
        });
        builder.addCase(changePw.fulfilled, (state, action) => {
            state.isChangePw = false;
        });
        builder.addCase(changePw.rejected, (state, action) => {
            state.isChangePw = false;
        });
        // contact
        builder.addCase(addContact.pending, (state, action) => {
            state.isContact= true;
        });
        builder.addCase(addContact.fulfilled, (state, action) => {
            state.isContact= false;
        });
        builder.addCase(addContact.rejected, (state, action) => {
            state.isContact= false;
        });
    },
});

// LOGIN
const login = createAsyncThunk('user/login', async (data) => {
    try {
        await delay(500);
        const result = await userApi.login(data);
        Toast('success', 'Login Success');
        return result;
    } catch (error) {
        console.log('Error>>>', error);
        apiService.handleApi(error);
    }
});

// REGISTER
const register = createAsyncThunk('user/register', async (data) => {
    try {
        await delay(500);
        const result = await userApi.register(data);
        Toast('success', 'Register Success');
        return result;
    } catch (error) {
        apiService.handleApi(error);
    }
});

// LOGOUT
const logout = createAsyncThunk('user/logout', async (data, { dispatch }) => {
    try {
        await delay(500);
        const result = await userApi.logout(data);
        Toast('success', 'Logout Success');
        return result;
    } catch (error) {
        apiService.handleApi(error);
    }
});

// CHANGEPASSWORD
const changePw = createAsyncThunk('user/changePw', async (data, { dispatch }) => {
    try {
        await delay(500);
        console.log('change pw');
        const result = await userApi.changePw(data, dispatch);
        Toast('success', 'Change Password Success');
        return result;
    } catch (error) {
        console.log(error);
        apiService.handleApi(error);
    }
});

// UPDATE USER
const updateUser = createAsyncThunk('user/update', async (data, { dispatch }) => {
    try {
        await delay(500);
        const result = await userApi.updateUser(data, dispatch);
        Toast('success', 'Update Success');
        return result;
    } catch (error) {
        console.log(error);
        apiService.handleApi(error);
    }
});

// COMMENT USER
const commentUser = createAsyncThunk('user/comment', async (data, { dispatch }) => {
    try {
        await delay(500);
        const result = await userApi.commentUser(data, dispatch);
        const token = getLatestToken();
        dispatch(getComments({ ...data, ...token }))
        .then(() => {
            Toast('success', 'Comment Success');
        });
        return result;
    } catch (error) {
        console.log(error);
        apiService.handleApi(error);
    }
});

// GET COMMENTS
const getComments = createAsyncThunk('user/getComments', async (data, { dispatch }) => {
    const result = await userApi.getComments(data, dispatch);
    return result;
});

// DELETE COMMENT
const deleteComment = createAsyncThunk('user/deleteComment', async (data, { dispatch }) => {
    try {
        await delay(500);
        const reuslt = await userApi.deleteComment(data, dispatch);
        const token = getLatestToken();
        dispatch(getComments({ ...data, ...token })).then(() => {
            Toast('success', 'Delete Comment Success');
        });
        return reuslt;
    } catch (error) {
        console.log(error);
        apiService.handleApi(error);
    }
});

// Get User Info
const getUserInfo = createAsyncThunk('user/getUserInfo', async (data, { dispatch }) => {
    try {
        await delay(300)
        const result = await userApi.getUserInfo(data, dispatch);
        return result;
    } catch (error) {
        console.log(error);
    }
});

// LOGIN SOCIAL
const loginSocial = createAsyncThunk('user/loginSocial', async (data) => {
    try {
        const result = await userApi.loginSocial(data);
        return result;
    } catch (error) {
        console.log(error);
        apiService.handleApi(error);
    }
});
const addContact = createAsyncThunk('user/addContact', async (data) => {
    try {
        const result = await userApi.addContact(data);
        Toast('success', 'Thank you for your message. It has been sent.', 1300);
        return result;
    } catch (error) {
        console.log(error);
        apiService.handleApi(error);
    }
});
export {
    changePw,
    commentUser,
    deleteComment,
    getComments,
    getUserInfo,
    login,
    loginSocial,
    logout,
    register,
    updateUser,
    addContact,
};
export default userSlice;
