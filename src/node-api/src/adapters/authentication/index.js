import jwt from 'jsonwebtoken';
import db from '../data-access';
import makeAuthOperations from './operations';

const auth = makeAuthOperations({ jwt, db });

export default auth;
