import AppError from '../errors/AppError';

export default function makeLoginUseCase({ db }) {

  return async function loginUseCase(loginInfo) {

    const { userName, password } = loginInfo;
    if(!userName || !password) {
      throw new AppError('Username/mail and password are mandatory', 400);
    }

    const exists = await db.findUser(userName, userName);
    if(exists.length === 0) {
      throw new AppError('User does not exist', 404);
    }

    return db.login(exists[0], password)
      .then(isLogin => isLogin)
      .catch(error => { throw new AppError(error, 500); })

  }
}
