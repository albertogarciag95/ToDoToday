import { AppError } from '../errors/AppError';

export default function makeUser ({
    id,
    name,
    userName,
    birthDate,
    email,
    password
  } = {}) {
    if (!name) {
      throw new AppError(`User must have name`, 400);
    }
    if (!userName) {
      throw new AppError(`User ${name} must have a userName.`, 400);
    }
    if (!birthDate || birthDate > new Date()) {
      throw new AppError(`User ${name} must have a birthdate or is invalid`, 400);
    }
    if (!email || !email.match(/^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i)) {
      throw new AppError(`User ${name} must have email or is invalid`, 400);
    }
    if(!password) {
      throw new AppError(`User ${name} must have password`, 400);
    }

    return Object.freeze({
      getName: () => name,
      getUserName: () => userName,
      getBirthDate: () => birthDate,
      getEmail: () => email,
      getPassword: () => password
    })
}
