import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './dashboard/home'
import Product from './dashboard/products/products'
import WorkerTask from './dashboard/tasks/tasks'
import Login from './login/login'
import { Toaster } from 'react-hot-toast'
import User from './dashboard/users/users'

function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/The-Hub' element={<Login/>}/>
                    <Route path='/The-Hub/home' element={<Home/>}/>
                    <Route path='/The-Hub/products' element={< Product />}/>
                    <Route path='/The-Hub/activity' element={< WorkerTask />}/>
                    <Route path='/The-Hub/users' element={< User />}/>
                    {/* <Route path='team' element={< Team title="Team" />}/>
					<Route path='invoices' element={< Invoices title="Invoices" />}/>
					<Route path='calendar' element={< Calendar title="Calendar" />}/>
					<Route path='faq' element={< FAQ title="FAQ" />}/>
					<Route path='form' element={< Form title="Form" />}/>
					<Route path='bar' element={< Bar title="Bar" />}/> */}
                </Routes>
                <Toaster position="top-right" reverseOrder={false}/>
        	</BrowserRouter>
        </>
    )
}

export default App
