import { BACKEND_URL } from "@lib/constants/constants";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type FC,
  type ReactNode,
} from "react";

interface User {
  id: number | null;
  name: string;
  balance: number;
  currency: string;
}

interface Credentials {
  email: string;
  password: string;
}

type SignupData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  signup: (data: SignupData) => Promise<Response>;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  updateBalance: (newBalance: number) => void;
}

const initialAuthState = {
  user: {
    id: null,
    name: "",
    balance: 0,
    currency: "",
  },
  accessToken: null,
  login: async () => {},
  logout: () => {},
  updateBalance: () => {},
  signup: async () => {
    return new Response();
  },
};

const AuthContext = createContext<AuthContextType>(initialAuthState);

//Kadangi Context yra pastatytas ant Observable pattern, lengviau debuginti kai context turi name
AuthContext.displayName = "AuthContext";

//Kadangi auth yra mazesnis context, darau be reducer, bet is karto matosi kiek daug useState reikia naudoti, nes jei ateityje wallet darys daug daugiau dalyku, gausim sphagheti :(
export const AuthProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    return localStorage.getItem("accessToken");
  });

  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  //Labai nesaugus ir negeras budas, jei kas matysit nedarykit taip prode, gali saugoti refresh tokena

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
    } else {
        localStorage.removeItem("accessToken");
    }
  }, [accessToken]);

  const signup = async (credentials: SignupData) => {
    const res = await fetch(`${BACKEND_URL}/register`, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
      let errorMessage = "Signup failed";
      try {
        const data = await res.json();
        if (data?.message) errorMessage = data.message;
      } catch (e) {}

      throw new Error(errorMessage);
    }

    //Funkcijos negali per daug apkrauti, ypac darant signup, kur
    //galima prigalvoti ivairiu variaciju kaip zmogus signupina,
    //tad tiesiog grazina res o tada mes jau galim veikti ka norim su response :)

    //A gdie refresh token? :( Saugoti jwt i local storage labai blogas sprendimas :(
    return res.json();
  };

  const login = async (credentials: Credentials) => {
    const res = await fetch(`${BACKEND_URL}/login`, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
      let errorMessage = "Login failed";
      try {
        const data = await res.json();
        if (data?.message) errorMessage = data.message;
      } catch (e) {}

      throw new Error(errorMessage);
    }

    const data = await res.json();

    setUser({
      id: data.id,
      name: data.name,
      balance: data.balance,
      currency: data.currency,
    });
    setAccessToken(data.accessToken);
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
  };

  const updateBalance = (newBalance: number) => {
    setUser((prev) => {
      if (!prev) return null;
      return { ...prev, balance: newBalance };
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, login, logout, signup, updateBalance }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
