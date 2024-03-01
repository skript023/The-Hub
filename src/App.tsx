import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './view/dashboard/home'
import Product from './view/dashboard/products/products'
import WorkerTask from './view/dashboard/tasks/tasks'
import Login from './view/login/login'
import User from './view/dashboard/users/users'
import { base } from './util/base'
import Toast from './components/snackbar'
import { AuthProvider } from './context/authentication'
import Authorized from './util/authrorization'
import Unauthorized from './util/unauthorized'
import Loading from './components/backdrop'

function App() 
{
    return (
        <>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route element={<Unauthorized/>}>
                            <Route path={`${base}`} element={<Login/>}/>
                        </Route>
                        <Route element={<Authorized/>}>
                            <Route path={`${base}home`} element={<Home/>}/>
                            <Route path={`${base}products`} element={< Product />}/>
                            <Route path={`${base}activity`} element={< WorkerTask />}/>
                            <Route path={`${base}users`} element={< User />}/>
                        </Route>
                    </Routes>
                </AuthProvider>
                <Toast/>
                <Loading/>
        	</BrowserRouter>
        </>
    )
}

export default App
