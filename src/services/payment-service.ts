import https from 'https';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv'
import axios from '../../node_modules/axios/index';

dotenv.config()

const baseUrl = 'https://pix-h.api.efipay.com.br'

//caminho do certificado e leitura
const certPath : string = path.join(__dirname, '../config/certification/single_dev_certification.p12');
const certification : Buffer = fs.readFileSync(certPath);

//codificar as chaves em base 64
const data : string = JSON.stringify({ grant_type: "client_credentials" });
const credentials : string = `${process.env.CLIENT_ID_DEV}:${process.env.CLIENT_SECRET_DEV}`;
const auth : string = Buffer.from(credentials).toString("base64");

//criar um agent https
const agent : https.Agent = new https.Agent({
    pfx: certification,
    passphrase: "",
});

//criar objeto body
const body = {
    method: 'POST',
    url: baseUrl + '/oauth/token',
    headers: {
        Authorization: 'Basic ' + auth,
        'Content-Type': 'application/json'
    },
    data: data,
    httpsAgent: agent
};

//fazer requisição para api
export async function getToken() : Promise<Object> {

    return axios(body)
    .then(res => {return JSON.stringify(res.data)})
    .catch(e => e);
};