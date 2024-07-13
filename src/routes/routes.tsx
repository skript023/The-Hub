import Route, { base } from "../util/base";
import Home from "../view/dashboard/home";
import Product from '../view/dashboard/products/products'
import WorkerTask from '../view/dashboard/tasks/tasks'
import Login from '../view/login/login'
import User from '../view/dashboard/users/users'
import Roles from '../view/dashboard/role/role'
import Attendances from '../view/dashboard/attendance/attendance'
import AccessManager from '../view/dashboard/access/access';
import ProductNew from "@/view/dashboard/products/product_new";

export const AuthorizedRoutes = [
    { path: Route('home'), element: <Home/> },
    { path: Route('products'), element: <Product/> },
    { path: Route('activity'), element: <WorkerTask/> },
    { path: Route('users'), element: <User/> },
    { path: Route('roles'), element: <Roles/> },
    { path: Route('attendance'), element: <Attendances/> },
    { path: Route('access'), element: <AccessManager/> },
    { path: Route('debug'), element: <ProductNew/> },
];

export const UnauthorizedRoutes = [
    { path: base, element: <Login/> },
];