import { getToken } from "./src/services/payment-service";

interface token {
    access_token: string,
    token_type: string,
    expires_in: string,
    scope: string
};

getToken().then(res => console.log(res))
