import jwt from 'jsonwebtoken';
import makeAuthOperations from './operations';

const auth = makeAuthOperations({ jwt });

export default auth;
