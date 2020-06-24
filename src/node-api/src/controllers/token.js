import { AppError } from "../errors/AppError";
import fs from 'fs';

export default function makeTokenController ({ tokenUseCase }) {
  return async function tokenController({ cookies }) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      if(!cookies || !cookies.refresh_token) {
        throw new AppError('Unauthorized', 401);
      }
      const response = await tokenUseCase(cookies.refresh_token);

      const { userLogged, accessToken } = response;

      const fileRetrieved = fs.readFileSync('./uploads/' + userLogged.file);
      const fileData = Buffer.from(fileRetrieved).toString('base64');
      userLogged.file = fileData;

      return {
        headers,
        statusCode: 200,
        body: { userLogged, accessToken }
      }
    } catch (e) {
      console.log(e);
      return {
        headers,
        statusCode: e.code,
        body: e.message
      }
    }
  }
}
