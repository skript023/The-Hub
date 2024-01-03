import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './dashboard/home'
import Product from './dashboard/products/products'
import WorkerTask from './dashboard/tasks/tasks'
import Login from './login/login'
import User from './dashboard/users/users'
import { base } from './util/base'
import Toast from './components/snackbar'

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={`${base}`} element={<Login/>}/>
                    <Route path={`${base}home`} element={<Home/>}/>
                    <Route path={`${base}products`} element={< Product />}/>
                    <Route path={`${base}activity`} element={< WorkerTask />}/>
                    <Route path={`${base}users`} element={< User />}/>
                </Routes>
                <Toast/>
        	</BrowserRouter>
        </>
    )
}

export default App
