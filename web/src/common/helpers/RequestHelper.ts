import axios, { HttpStatusCode } from "axios";
import StorageService from "../service/StorageService";
let apiBaseUrl = "http://103.138.113.68/BE";
let newHeaders: any = {'Content-Type': 'application/json'}
if (StorageService.isTokenExits()) {
    newHeaders = {
        "Content-type": "application/json",
        Authorization: `Bearer ${StorageService.getToken()}`,
    }
};
export async function getRequest(path: string, params?: any) {
    return await axios
        .get(apiBaseUrl + path, { headers: newHeaders, params: params })
        .then(
            (response) => {
                const apiResponse: any = {
                    status: response.status,
                    body: response.data,
                };
                return apiResponse;
            },
            (error) => {
                return handleError(error);
            }
        );
}

export async function postRequest(path: string, params: any) {
    let data = JSON.stringify(params);

    return await axios
        .post(apiBaseUrl + path, data, {
            headers: newHeaders,
        })
        .then(
            (response) => {
                const apiResponse: any = {
                    status: response.status,
                    body: response.data,
                };

                return apiResponse;
            },
            (error) => {
                return handleError(error);
            }
        );
}
export async function postLoginRequest(path: string, params: any) {
    let data = JSON.stringify(params);
    return await axios
        .post(path, data, {
            headers: newHeaders,
        })
        .then(
            (response) => {
                const apiResponse: any = {
                    status: response.status,
                    body: response.data,
                };

                return apiResponse;
            },
            (error) => {
                return handleError(error);
            }
        );
}
export async function putRequest(path: string, params: any) {
    let data = JSON.stringify(params);
    return await axios
        .put(apiBaseUrl + path, data, {
            headers: newHeaders,
        })
        .then(
            (response) => {
                const apiResponse: any = {
                    status: response.status,
                    body: response.data,
                };
                return apiResponse;
            },
            (error) => {
                return handleError(error);
            }
        );
}
export async function deleteRequest(path: string) {
    return await axios
        .delete(apiBaseUrl + path, {
            headers: newHeaders,
        })
        .then(
            (response) => {
                const apiResponse: any = {
                    status: response.status,
                    body: response.data,
                };
                return apiResponse;
            },
            (error) => {
                return handleError(error);
            }
        );
}
function handleError(error: any) {
    let bodyError: any;
    try {
        if (error?.response?.status === HttpStatusCode.InternalServerError) {
            bodyError = {
                error: HttpStatusCode.InternalServerError,
                message: "Lỗi máy chủ nội bộ, vui lòng thử lại sau!",
            };
        }else {
            bodyError = {
                errorCode:
                    error?.response?.data?.errorCode ?? error?.response?.status,
                messageCode: error?.response?.data?.messageCode,
                message: error?.response?.data?.message,
            };
        }
    } catch (e) {
        bodyError = {
            error: 502,
            message: "Đã có lỗi xảy ra!",
        };
    }
    return {
        status: error?.response?.status,
        body: bodyError,
    };
}


axios.interceptors.request.use((config: any) => {
    if (!config.headers['X-Skip-Auth'] && StorageService.getToken()) {
        config.headers['Authorization'] = 'Bearer ' + StorageService.getToken();
    } else {
        delete config.headers['X-Skip-Auth'];
    }
    return config;
});


