import { HttpInterceptorFn } from "@angular/common/http";

export const AuthInterceptor: HttpInterceptorFn =  (req, next) => {
    const authToken = "fakeToken";

    const authReq = req.clone({
        setHeaders: {
            Authorization: `Bearer ${ authToken }`
        }
    })

    return next(authReq);
}