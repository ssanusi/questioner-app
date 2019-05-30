import bcrypt from 'bcryptjs';

export const hashPassword = password => bcrypt.hashSync(password, 14);

export const checkPassword = (password, hashPass) => bcrypt.compareSync(password, hashPass);
