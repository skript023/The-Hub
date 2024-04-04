import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Toast from './components/snackbar'
import { AuthProvider } from './context/authentication'
import Authorized from './util/authrorization'
import Unauthorized from './util/unauthorized'
import Loading from './components/backdrop'
import Notification from './components/notification'
import Confirmation from './components/confirmation'
import { AuthorizedRoutes, UnauthorizedRoutes } from './routes/routes'

function App() 
{
    return (
        <>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        { UnauthorizedRoutes.map((route) => (
                            <Route element={<Unauthorized/>}>
                                <Route path={route.path} element={route.element}/>
                            </Route> 
                        )) }
                        { AuthorizedRoutes.map((route) => (
                            <Route element={<Authorized/>}>
                                <Route path={route.path} element={route.element}/>
                            </Route>
                        )) }
                    </Routes>
                </AuthProvider>
                <Toast/>
                <Notification/>
                <Confirmation/>
                <Loading/>
        	</BrowserRouter>
        </>
    )
}

export default App
