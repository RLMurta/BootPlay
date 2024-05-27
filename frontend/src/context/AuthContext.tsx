import { AlbumModel } from "@/models/AlbumModel";
import { UserAlbumModel } from "@/models/UserAlbumModel";
import { UserModel } from "@/models/UserModel";
import { WalletModel } from "@/models/WalletModel";
import { album_api, user_api, wallet_api } from "@/services/apiService";
import { createContext, useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface AuthContextModel extends UserModel {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<string | void>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<string | void>;
  getUserAlbums: () => Promise<UserAlbumModel[]>;
  getAlbums: (search: string) => Promise<AlbumModel[]>;
  buyAlbum: (name: string, idSpotify: string, artistName: string, imageUrl: string, value: number) => Promise<AlbumModel | void>;
  getWallet: (email: string) => Promise<WalletModel>;
}

export const AuthContext = createContext({} as AuthContextModel);

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({children}) => {
  const [userData, setUserData] = useState<UserModel>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const data: UserModel = JSON.parse(localStorage.getItem('@Auth.Data') || "{}");
    if(data.id) {
      setIsAuthenticated(true);
      setUserData(data);
    }
    Logout();
  }, []);

  const Login = useCallback(async (email: string, password: string) => {
    const respAuth = await user_api.post('/users/auth', {email, password});

    if(respAuth instanceof Error) {
      return respAuth.message;
    }
 
    user_api.defaults.headers.common.Authorization = `Basic ${respAuth.data.token}`;
    album_api.defaults.headers.common.Authorization = `Basic ${respAuth.data.token}`;
    wallet_api.defaults.headers.common.Authorization = `Basic ${respAuth.data.token}`;
    const respUserInfo = await user_api.get(`/users/${respAuth.data.id}`);

    if(respUserInfo instanceof Error) {
      return respUserInfo.message;
    }

    localStorage.setItem('@Auth.Data', JSON.stringify(respUserInfo.data));
    setUserData(respUserInfo.data);
    setIsAuthenticated(true);
  }, []);

  const Logout = useCallback(() => {
    localStorage.removeItem('@Auth.Data');
    setUserData(undefined);
    setIsAuthenticated(false);
    return <Navigate to='/' />;
  }, []);

  const Signup = useCallback(async (name: string, email: string, password: string) => {
    const resp = await user_api.post('/users/create', {name, email, password});

    if(resp instanceof Error) {
      return resp.message;
    }
  }, []);

  const GetUserAlbums = useCallback(async () => {
    const resp = await album_api.get('/albums/my-collection');

    if(resp instanceof Error) {
      return resp.message;
    }

    return resp.data;
  }, []);

  const GetAlbums = useCallback(async (search: string) => {
    const resp = await album_api.get(`/albums/all?search=${search}`);

    if(resp instanceof Error) {
      return resp.message;
    }

    return resp.data;
  }, []);

  const BuyAlbum = useCallback(async (name: string, idSpotify: string, artistName: string, imageUrl: string, value: number) => {
    const resp = await album_api.post('/albums/sale', {name, idSpotify, artistName, imageUrl, value});

    if(resp instanceof Error) {
      return resp.message;
    }

    return resp.data;
  }, []);

  const GetWallet = useCallback(async (email: string) => {
    const resp = await wallet_api.get(`/wallet?email=${email}`);

    if(resp instanceof Error) {
      return resp.message;
    }

    return resp.data;
  }, []);

  return (
    <AuthContext.Provider value={
        { isAuthenticated: isAuthenticated, ...userData, login: Login, logout: Logout, signup: Signup, 
        getUserAlbums: GetUserAlbums, getAlbums: GetAlbums, buyAlbum: BuyAlbum, getWallet: GetWallet}}>
      {children}
    </AuthContext.Provider>
  );
}
