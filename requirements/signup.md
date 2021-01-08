# Sign Up

> ## Success Cases

1. Receives a **POST** request on route **/api/signup**
2. Validates required data **name**, **email**, **password** and **passwordConfirmation**
3. Validates if **password** and **passwordConfirmation** are equal
4. Validates if **email** field has a valid email
5. **Validates** if already exists and user with provided email
6. Generates an **encrypted** password (this password cannot be decrypted)
7. **Creates** an account for the user with provided data, **replacing** the password by the encrypted password
8. Generates an access **token** with user ID
9. **Updates** user data with generated access token
10. Returns **200** with access token and user name

> ## Exceptions

1. Returns error **404** if API does not exists
2. Returns error **400** if name, email, password or passwordConfirmation are not provided
3. Returns error **400** if password and passwordConfirmation are not equal
4. Returns error **400** if email field has and invalid email
5. Returns error **403** if provided email is already in use
6. Returns error **500** if occurs an error when trying to generate an encrypted password
7. Returns error **500** if occurs an error when trying to create an user account
8. Returns error **500** if occurs an error when trying to generate and access token
9. Returns error **500** if occurs an error when trying to update user account with generated access token