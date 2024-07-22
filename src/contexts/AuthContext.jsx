import { createContext, useEffect, useState } from "react";
import authApi from "../apis/auth";
import { getAccessToken, removeAccessToken, setAccessToken } from "../utils/local-storage";
import eventApi from "../apis/event";
import userApi from "../apis/user";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [isAuthUserLoading, setIsAuthUserLoading] = useState(true);
  const [eventUser, setEventUser] = useState(null);
  const [allEvents, setAllEvents] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (getAccessToken()) {
          const res = await authApi.getAuthUser();
          setAuthUser(res.data.user);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsAuthUserLoading(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    fetchUserEvent();
    if (!allEvents && getAccessToken()) {
      fetchAllEvents();
    }
  }, []);

  const fetchUserEvent = async () => {
    try {
      if (getAccessToken()) {
        const res = await eventApi.userEvent();
        setEventUser(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllEvents = async () => {
    try {
      const res = await eventApi.getAllEvents();
      console.log(res.data);
      setAllEvents(res.data); // Set the fetched events
    } catch (error) {
      console.log(error);
    }
  };

  const createEvent = async (data) => {
    try {
      await eventApi.createEvent(data);
      fetchUserEvent();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEvent = async (id) => {
    try {
      await eventApi.deleteEvent(id);
      fetchUserEvent();
    } catch (error) {
      console.log(error);
    }
  };

  const uploadProfileImage = async (data) => {
    try {
      const res = await userApi.uploadUserImage(data);
      const newData = authUser;
      newData.profileImage = res.data.profileImage;
      setAuthUser(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const joinEvent = async (id) => {
    try {
      await eventApi.joinEvent(id);
      fetchAllEvents();
    } catch (error) {
      console.log(error);
    }
  };

  const cancelEvent = async (id) => {
    try {
      await eventApi.cancelEvent(id);
      fetchAllEvents();
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (credentials) => {
    const res = await authApi.login(credentials);
    setAccessToken(res.data.accessToken);
    const resGetAuthUser = await authApi.getAuthUser();
    setAuthUser(resGetAuthUser.data.user);
    fetchUserEvent();
    fetchAllEvents();
  };

  const logout = () => {
    removeAccessToken();
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        login,
        logout,
        isAuthUserLoading,
        eventUser,
        createEvent,
        deleteEvent,
        uploadProfileImage,
        joinEvent,
        allEvents,
        cancelEvent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
