import create from "zustand";
import md5 from 'blueimp-md5';
import supbase from '@lib/supbase';

const isExpires = () => {
  const token = localStorage.getItem("token");
  if (!token) return true;
  const { expires_at, expires_in } = JSON.parse(token);
  return Date.now() >= expires_at * 1000 + expires_in * 1000;
}

export default create((set, get) => ({
  user: null,
  token: null,
  getUser: () => {
    if (get().user) {
      return get().user
    }
    set({ user: JSON.parse(localStorage.getItem("user")) });
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
  getToken: () => {
    if (get().token) {
      return get().token
    }
    set({ token: JSON.parse(localStorage.getItem("token")) });
    const token = localStorage.getItem("token");
    return token ? JSON.parse(token) : null;
  },
  isExpires: () => isExpires(),
  isLogin: () => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    return user && token && !isExpires();
  },
  login: async (data) => {
    const { data: { user, session }, error } = await supbase.auth.signInWithPassword({
      ...data,
      password: md5(data.password, process.env.REACT_APP_KEY)
    })
    const token = {
      ...session,
      user: undefined
    }
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", JSON.stringify(token));
    set({ user, token });
    return {error};
  },
  siginUp: async (data) => {
    const { error } =  await supbase.auth.signUp({
      ...data,
      password: md5(data.password, process.env.REACT_APP_KEY)
    })
    return {error}
  },
  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null, token: null });
  }
}));