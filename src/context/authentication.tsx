import { createContext, useState } from "react";
import Profile from "../interfaces/profile.dto";

interface AuthContextType {
    auth: Profile | null;
    setAuth: React.Dispatch<React.SetStateAction<Profile | null>>;
}

const AuthContext = createContext<AuthContextType>({
    auth: null,
    setAuth: () => {}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [auth, setAuth] = useState<Profile | null>(null);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
