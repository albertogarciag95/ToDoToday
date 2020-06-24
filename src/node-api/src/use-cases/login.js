import { AppError } from '../errors/AppError';
import makeUser from '../entities/user';

export default function makeLoginUseCase({ db, auth }) {

  return async function loginUseCase(loginInfo) {

    const { userName, password } = loginInfo;
    if(!userName || !password) {
      throw new AppError('Username/mail and password are mandatory', 400);
    }

    const exists = await db.findUser(userName, userName);
    if(exists.length === 0) {
      throw new AppError('User or password are wrong', 404);
    }

    return db.login(exists[0], password)
      .then(async isLogin => {
        const userEntity = makeUser(exists[0]);
        const user = {
          name: userEntity.getName(),
          userName: userEntity.getUserName(),
          birthDate: userEntity.getBirthDate(),
          email: userEntity.getEmail(),
          file: userEntity.getFileName()
        };
        const accessToken = auth.generateAccessToken(user);
        const refreshToken = auth.getRefreshToken(user);
        await db.saveToken(refreshToken);

        return { isLogin, user: isLogin ? user : null, accessToken, refreshToken };
      })
      .catch(error => { throw new AppError(error, 500); })

  }
}
