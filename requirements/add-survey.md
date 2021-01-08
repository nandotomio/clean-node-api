# Create survey

> ## Success Cases

1. Receives a **POST** request on route **/api/surveys**
2. Validates if the request was made by a **admin**
3. Validates required data **question** and **answers**
4. **Create** a survey with provided data
5. Returns **204** without data

> ## Exceptions

1. Returns an error **404** if API does not exists
2. Returns an error **403** if user is not and admin
3. Returns an error **400** if question or answers are not provided by the client
4. Returns an error **500** if occurs and error when trying to create a survey