import Cookies from 'js-cookie';
import * as jwt_decode from 'jwt-decode';

class Auth {
  // Store the token in cookies
  static login(token) {
    Cookies.set('id_token', token, { expires: 7 }); // Set the token with an expiration of 7 days
  }

  // Retrieve the token from cookies
  static getToken() {
    // Retrieve the token from cookies using js-cookie
    const token = Cookies.get('id_token');
    console.log('Retrieved token:', token);
    return token;
  }

  // Remove the token from cookies
  static logout() {
    Cookies.remove('id_token');
  }

  // Check if the user is logged in
  static loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Check if the token is expired
  static isTokenExpired(token) {
    try {
      const decoded = jwt_decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error('Failed to decode token', err);
      return false;
    }
  }
 //refresh an expired token in case the user is still active
 static refresh() {
  const token = this.getToken();
  
  if (!token || this.isTokenExpired(token)) {
      // Token is either missing or expired
      // Decode the token to get the expiration time and user ID
      try {
          const decoded = jwt_decode(token);
          const currentTime = Date.now() / 1000;

          // Check if the token is expired
          if (decoded.exp < currentTime) {
              // If expired, optionally get the user's ID or other details
              const userId = decoded._id;
              console.log('Token expired, refreshing...');

              // Call the refresh token mutation or a custom API endpoint here
              refresh({ variables: { userId } }).then(response => {
                  const newToken = response.data.refreshToken; // Adjust based on your server response
                  this.login(newToken);  // Store the new token in cookies or localStorage
              }).catch(err => {
                  console.error('Error refreshing token:', err);
                  this.logout();  // Log out if refresh fails
                  window.location.href = '/login';  // Redirect to login page
              });
          }
      } catch (err) {
          console.error('Failed to decode token:', err);
          this.logout();  // Log out if the token is malformed or invalid
          window.location.href = '/login';  // Redirect to login page
      }
  }
}

  


  
 

}

export default Auth;