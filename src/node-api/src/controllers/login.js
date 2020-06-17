import { AppError } from '../errors/AppError';

export default function makeLoginController ({ loginUseCase }) {
  return async function loginController (httpRequest) {
    const headers = {
      'Content-Type': 'application/json'
    }
    try {
      const login = await loginUseCase(httpRequest.body);
      if(!login) {
        throw new AppError('User or password are wrong', 404);
      }
      return {
        headers,
        statusCode: 200,
        body: { logged: true }
      }
    } catch (e) {
      return {
        headers,
        statusCode: e.code,
        body: e.message
      }
    }
  }
}
