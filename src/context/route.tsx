import { createContext, useState } from "react";

interface RouteContextType {
    route: boolean;
    setRoute: React.Dispatch<React.SetStateAction<boolean>>;
}

const RouteContext = createContext<RouteContextType>({
    route: false,
    setRoute: () => {}
});

export function RouteProvider({ children }: { children: React.ReactNode }) {
    const [route, setRoute] = useState<boolean>(false);

    return (
        <RouteContext.Provider value={{ route, setRoute }}>
            {children}
        </RouteContext.Provider>
    );
}

export default RouteContext;
