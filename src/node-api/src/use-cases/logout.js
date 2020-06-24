import { AppError } from '../errors/AppError';

export default function makeLogoutUseCase({ db }) {

  return async function logoutUseCase(refreshToken) {

    if(refreshToken === null) {
      throw new AppError('Unauthorized', 401);
    }

    return await db.removeToken(refreshToken);
  }
}
