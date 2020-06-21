import { AppError } from '../errors/AppError';
import fs from 'fs';

export default function makeLoginController ({ loginUseCase }) {
  return async function loginController (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const login = await loginUseCase(httpRequest.body);
      const { isLogin, user, accessToken, refreshToken } = login;

      const fileRetrieved = fs.readFileSync('../uploads/' + user.file);
      const fileData = Buffer.from(fileRetrieved).toString('base64');
      user.file = fileData;

      if(!isLogin) {
        throw new AppError('User or password are wrong', 404);
      }
      return {
        headers,
        statusCode: 200,
        body: { logged: true, user, accessToken, refreshToken }
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
