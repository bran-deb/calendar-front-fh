import { Navigate } from "react-router-dom";



export const PublicRoute = ({ isAuthenticated, children }) => {

    return isAuthenticated
        ? <Navigate to='/' />   //si esta autenticado no permite ir a screenLogin
        : children              //puede ingresar a screenLogin
};
