import { jwtDecode } from "jwt-decode";

interface UserJwtPayload {
  "cognito:username": string;
  family_name: string;
  given_name: string;
}

interface SimplifiedUserInfo {
  username: string;
  firstName: string;
  lastName: string;
}

export const decodeUserToken = (): SimplifiedUserInfo | null => {
  try {
    const token = localStorage.getItem('idToken');
    
    if (!token) {
      return null;
    }

    const decodedToken = jwtDecode<UserJwtPayload>(token);
    
    return {
      username: decodedToken["cognito:username"],
      firstName: decodedToken.given_name,
      lastName: decodedToken.family_name
    };
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
