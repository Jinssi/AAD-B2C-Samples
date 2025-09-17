// Custom JavaScript for Azure AD B2C password reset page
// Add this to your custom page layout template

// Function to run when the page loads
function handleReadOnlyEmail() {
  // Look for the email field
  const emailField = document.querySelector('input[id="email"]');
  if (!emailField) return;
  
  // Check if the isEmailProvided claim is set to true
  // B2C passes this information via data attributes
  const isEmailProvided = document.querySelector('[data-preload="isEmailProvided"]');
  
  if (isEmailProvided && isEmailProvided.getAttribute('data-preload-value') === 'true') {
    // Make the email field read-only
    emailField.readOnly = true;
    emailField.classList.add('readonly-email');
    
    // Add a class to the parent container to hide edit button
    const emailContainer = emailField.closest('.attrEntry');
    if (emailContainer) {
      emailContainer.classList.add('email-readonly');
    }
    
    // Ensure verification is still required even for pre-filled email
    // This ensures the OTP flow is always triggered
    setTimeout(() => {
      const verifyButton = document.querySelector('button[id="email_ver_but_send"]');
      if (verifyButton) {
        verifyButton.click();
      }
    }, 500);
  }
}

// Run the function when the page is fully loaded
if (window.addEventListener) {
  window.addEventListener('load', handleReadOnlyEmail);
} else {
  window.attachEvent('onload', handleReadOnlyEmail);
}
