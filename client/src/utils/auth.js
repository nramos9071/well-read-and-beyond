class Auth {
    // Store the token in local storage
    static login(token) {
      localStorage.setItem('id_token', token);
    //   window.location.assign('/');
    }
  
    // Retrieve the token from local storage
    static getToken() {
      return localStorage.getItem('id_token');
    }
  
    // Remove the token from local storage
    static logout() {
      localStorage.removeItem('id_token');
      // window.location.assign('/login');
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
        return false;
      }
    }
  }
  
  export default Auth;