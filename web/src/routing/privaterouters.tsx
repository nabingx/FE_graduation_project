import React, { ReactElement, useEffect } from "react";
import { Navigate } from "react-router-dom";
import StorageService from "../common/service/StorageService";

interface PrivateRoute {
    element: ReactElement;
}

const PrivateRoute: React.FC<PrivateRoute> = ({ element }) => {


    return StorageService.getToken() !== null &&
    StorageService.getToken() !== undefined ? (
        element
    ) : (
        <Navigate to={`/dang-nhap`} />
    );
};

export default PrivateRoute;
