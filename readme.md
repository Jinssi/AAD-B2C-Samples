# Azure AD B2C Custom Password Reset with Email Verification

This repository contains sample code for implementing a customized Azure AD B2C password reset journey with email verification using SendGrid OTP. The implementation addresses a specific scenario where an application needs to handle user emails across password reset and subsequent login flows.

## Features

- Optional email pre-filling from application
- Conditional read-only display of pre-filled emails
- Mandatory email verification via OTP using SendGrid
- Return of verified email to application for use in subsequent sign-in

## Files

- **policy-files/PasswordReset.xml**: Custom B2C policy for password reset with email verification
- **policy-files/TrustFrameworkExtensions.xml**: Extensions to the base trust framework
- **policy-files/app-integration.js**: Client-side JavaScript for integrating with the custom policy
- **policy-files/custom-script.js**: JavaScript for UI customization in B2C pages
- **policy-files/custom-ui.css**: CSS for styling the custom B2C pages

## Usage

1. Configure Azure AD B2C with custom policies
2. Set up the SendGrid integration for OTP delivery
3. Integrate the app-integration.js code in your application
4. Customize the UI with the provided CSS and JavaScript files

## Requirements

- Azure AD B2C tenant
- SendGrid account for email OTP delivery
- Web application registered in Azure AD B2C

## Documentation

For more information on Azure AD B2C custom policies, see the [official documentation](https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview).
"@ | Out-File -FilePath "README.md" -Encoding utf8
