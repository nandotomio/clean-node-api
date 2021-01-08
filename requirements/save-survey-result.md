# Answer survey

> ## Success Cases

1. Receives a **PUT** request on route **/api/surveys/{survey_id}/results**
2. Validates if the request was made by a **user**
3. Validates parameter **survey_id**
4. Validates if **answer** field has a valid answer
5. **Creates** a survey result with provided data in case a record does not exists
6. **Updates** a survey result with provided data in case a record already exists
7. Returns **200** with survey results

> ## Exceptions

1. Returns error **404** if API does not exists
2. Returns error **403** if its not a user
3. Returns error **403** if a invalid survey_id is provided on URL
4. Returns error **403** if a invalid answer is provided
5. Returns error **500** if occurs an error when trying to create the survey result
6. Returns error **500** if occurs an error when trying update the survey result
7. Returns error **500** if occurs an error when trying to load the survey