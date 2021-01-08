# Login

> ## Success Cases

1. Receives a **POST** request on route **/api/login**
2. Validates required data **email** and **password**
3. Validates that field **email** has a valid email
4. **Finds** a user with provided email and password
5. Generates an access **token** with user ID
6. **Updates** user data with generated access token
7. Returns **200** with access token and user name

> ## Exceptions

1. Returns error **404** if APi does not exists
2. Returns error **400** if email or password are not provided
3. Returns error **400** if email field has an invalid email
4. Returns error **401** if does not find a user with provided data
5. Returns error **500** if occurs an error when trying to generate the access token
6. Returns error **500** if occurs an error when trying to update user with generated access token