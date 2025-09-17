// Sample JavaScript code for invoking the password reset policy
// This code would be in your application

/**
 * Redirects to Azure AD B2C password reset flow with the user's email (if available)
 * @param {string} email - The user's email address (optional)
 */
function initiatePasswordReset(email) {
  // B2C tenant and policy information
  const tenantName = 'yourtenant.onmicrosoft.com';
  const policyName = 'B2C_1A_PasswordReset';
  const clientId = 'your-application-client-id';
  const redirectUri = encodeURIComponent('https://your-app.com/auth/callback');
  
  // Base URL for the B2C endpoint
  const baseUrl = `https://${tenantName.split('.')[0]}.b2clogin.com/${tenantName}/oauth2/v2.0/authorize`;
  
  // Standard OAuth 2.0 parameters
  const params = [
    `client_id=${clientId}`,
    `response_type=id_token`,
    `redirect_uri=${redirectUri}`,
    `response_mode=fragment`,
    `scope=openid profile`,
    `nonce=${generateNonce()}`,
  ];
  
  // Add the custom query parameter for email if provided
  if (email && email.trim() !== '') {
    params.push(`email_address=${encodeURIComponent(email)}`);
  }
  
  // Complete URL with policy name
  const url = `${baseUrl}?p=${policyName}&${params.join('&')}`;
  
  // Redirect the user to the password reset flow
  window.location.href = url;
}

/**
 * Generates a random nonce for OIDC security
 */
function generateNonce() {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

/**
 * Handles the redirect after password reset is complete
 * Extracts the id_token and verified email, then initiates sign-in
 */
function handlePasswordResetCallback() {
  // Get the fragment from the URL
  const fragment = window.location.hash.substring(1);
  const params = new URLSearchParams(fragment);
  
  // Extract the ID token
  const idToken = params.get('id_token');
  
  if (idToken) {
    // Parse the JWT token to get the claims
    const tokenParts = idToken.split('.');
    if (tokenParts.length === 3) {
      const payload = JSON.parse(atob(tokenParts[1]));
      
      // Get the verified email from the token
      const verifiedEmail = payload.email;
      
      if (verifiedEmail) {
        // Redirect to sign-in with the verified email pre-filled
        initiateSignIn(verifiedEmail);
      }
    }
  }
}

/**
 * Redirects to the sign-in page with the email pre-filled using login_hint
 * @param {string} email - The verified email address
 */
function initiateSignIn(email) {
  // B2C tenant and policy information for sign-in
  const tenantName = 'yourtenant.onmicrosoft.com';
  const policyName = 'B2C_1A_SIGNIN'; // Your sign-in policy
  const clientId = 'your-application-client-id';
  const redirectUri = encodeURIComponent('https://your-app.com/auth/signin-callback');
  
  // Base URL for the B2C endpoint
  const baseUrl = `https://${tenantName.split('.')[0]}.b2clogin.com/${tenantName}/oauth2/v2.0/authorize`;
  
  // Standard OAuth 2.0 parameters
  const params = [
    `client_id=${clientId}`,
    `response_type=id_token token`,
    `redirect_uri=${redirectUri}`,
    `response_mode=fragment`,
    `scope=openid profile https://yourtenant.onmicrosoft.com/api/read`,
    `nonce=${generateNonce()}`,
    `login_hint=${encodeURIComponent(email)}`, // Pre-fill the email field
  ];
  
  // Complete URL with policy name
  const url = `${baseUrl}?p=${policyName}&${params.join('&')}`;
  
  // Redirect the user to the sign-in flow
  window.location.href = url;
}
