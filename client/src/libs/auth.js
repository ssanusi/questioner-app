import jwtDecode from 'jwt-decode';

export const decodeToken = token => jwtDecode(token);

export const setLocalStorage = (item, value) => localStorage.setItem(item, value);
