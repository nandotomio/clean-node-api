# Survey result

> ## Success Cases

1. Receives a **GET** request on route **/api/surveys/{survey_id}/results**
2. Validates if the request was made by a **user**
3. Returns **200** with survey results data

> ## Exceptions

1. Returns error **404** if API does not exists
2. Returns error **403** if its not a user
3. Returns error **500** if occurs and error when trying to list the survey results