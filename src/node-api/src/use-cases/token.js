import { AppError } from '../errors/AppError';

export default function makeTokenUseCase({ db, auth }) {

  return async function tokenUseCase(refreshToken) {

    if(refreshToken === null) {
      throw new AppError('Unauthorized', 401);
    }

    const exists = await db.findToken(refreshToken);
    if(exists.length === 0) {
      throw new AppError('Unauthorized', 401);
    }

    return auth.verifyRefreshToken(exists[0])
      .then(user => {
        const accessToken = auth.generateAccessToken(user);
        const userLogged = {
          name: user.name,
          userName: user.userName,
          birthDate: user.birthDate,
          email: user.email,
          file: user.file
        };

        return { accessToken, userLogged };

      }).catch(() => {
        throw new AppError('Unauthorized', 401);
      });
  }
}
