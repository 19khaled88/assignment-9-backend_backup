import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';
import config from '../config';

export const signJwt = (payload: Object, options: SignOptions = {}) => {
	return jwt.sign(payload, config.accessTokenKey as Secret, {
		...(options && options),
	});
};
// process.env.ACCESS_TOKEN_KEY
export const verifyJwt = <T>(token: string): JwtPayload  => {
	try {
		return jwt.verify(token, config.accessTokenKey as Secret) as JwtPayload;
	} catch (error) {
		throw new Error('Invalid token found')
		
	}
};