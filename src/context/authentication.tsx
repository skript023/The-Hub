import { createContext, useState } from "react";

interface AuthContextType {
    auth: boolean;
    setAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType>({
    auth: false,
    setAuth: () => {}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [auth, setAuth] = useState<boolean>(false);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
