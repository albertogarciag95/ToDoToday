import { AppError } from '../errors/AppError';

import makeUser from '../entities/user';

export default function makePostUserUseCase({ db }) {

  return async function postUserUseCase(userInfo) {

    const user = makeUser(userInfo);
    const exists = await db.findUser(user.getEmail(), user.getUserName());
    if (exists.length !== 0) {
      throw new AppError('User already exists', 400);
    }

    return db.postUser({
      name: user.getName(),
      userName: user.getUserName(),
      birthDate: user.getBirthDate(),
      email: user.getEmail(),
      password: user.getPassword(),
      file: user.getFileName()
    });
  }
}
