import {atom, useRecoilCallback} from 'recoil'
import { axiosClient } from '../axios/axios'

export const userState = atom({
    key:'userState',
    default:null

})

export const isAuthenticated = atom({
    key:'isAuthenticatedAtom',
    default:false
})

export const Loading = atom({
    key:"loadingAtom",
    default:null
})

export const errorState = atom({
    key:"errorAtom",
    default:null
})


export const isCheckingAtom= atom({
    key:"isCheckingAtomuthAtom",
    default:null
})

export const messageState = atom({
    key: 'messageState',
    default: null,
  });
  

  export const useAuthActions = () => {
    const signup = useRecoilCallback(({ set }) => async (email, password, name) => {
      set(Loading, true);
      set(errorState, null);
  
      try {
        const response = await axiosClient.post(`/signup`, { email, password, name });
        set(userState, response.data.user);
        set(isAuthenticated, true);
        return response
      } catch (error) {
        set(errorState, error.response?.data?.message || "Invalid OR Expired Code");
      } finally {
        set(Loading, false);
      }
    });
  
    const login = useRecoilCallback(({ set }) => async (email, password) => {
      set(Loading, true);
      set(errorState, null);
  
      try {
        const response = await axiosClient.post(`/login`, { email, password });
        set(userState, response.data.user);
        set(isAuthenticated, true);
        return response
      } catch (error) {
        set(errorState, error.response?.data?.message || "Error logging in");
      } finally {
        set(Loading, false);
      }
    });
  
    const logout = useRecoilCallback(({ set }) => async () => {
      set(Loading, true);
      set(errorState, null);
  
      try {
        const response=await axiosClient.post(`/logout`);
        set(userState, null);
        set(isAuthenticated, false);
        return response
      } catch (error) {
        set(errorState, "Error logging out");
      } finally {
        set(Loading, false);
      }
    });
  
    const verifyEmail = useRecoilCallback(({ set }) => async (code) => {
      set(Loading, true);
      set(errorState, null);
  
      try {
        const response = await axiosClient.post(`/verify-email`, { code });
        set(userState, response.data.user);
        set(isAuthenticated, true);
        return response
      } catch (error) {
        set(errorState, error.response?.data?.message || "Error verifying email");
      } finally {
        set(Loading, false);
      }
    });
  
    const checkAuth = useRecoilCallback(({ set }) => async () => {
      set(isCheckingAtom, true);
      set(errorState, null);
  
      try {
        const response = await axiosClient.get(`/check-auth`);
        set(userState, response.data.user);
        set(isAuthenticated, true);
        return response
      } catch (error) {
        set(isAuthenticated, false);
      }
    });
  
    const forgotPassword = useRecoilCallback(({ set }) => async (email) => {
      set(Loading, true);
      set(errorState, null);
  
      try {
        const response = await axiosClient.post(`/forgot-password`, { email });
        set(messageState, response.data.message);
        return response
      } catch (error) {
        set(errorState, error.response?.data?.message || "Error sending reset password email");
      } finally {
        set(Loading, false);
      }
    });
  
    const resetPassword = useRecoilCallback(({ set }) => async (token, password) => {
      set(Loading, true);
      set(errorState, null);
  
      try {
        const response = await axiosClient.post(`/reset-password/${token}`, { password });
        set(messageState, response.data.message);
        set(isAuthenticated , false)
        return response
      } catch (error) {
        set(errorState, error.response?.data?.message || "Error resetting password");
      } finally {
        set(Loading, false);
      }
    });
  
    return {
      signup,
      login,
      logout,
      verifyEmail,
      checkAuth,
      forgotPassword,
      resetPassword,
    }
  }
