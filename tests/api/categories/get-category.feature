Feature: Get a Category by ID
  In order to retrieve category information
  As a user
  I want to get a category by its ID

  Scenario: Get an existing category
    Given I send a PUT request to "/api/users/D1E2F3A4-B5C6-4DE9-8A1B-23456789ABCD" with body:
    """
    {
      "name": "Admin User",
      "username": "admin.user4",
      "email": "admin4@example.com",
      "password": "adminpass000",
      "role": "admin"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "admin4@example.com",
      "password": "adminpass000"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "token"
    Given I set bearer token from variable "token"
    Given I send a PUT request to "/api/categories/3FA85F64-5717-4562-B3FC-2C963F66AFA6" with body:
    """
    {
      "name": "Tecnología",
      "description": "Productos electrónicos"
    }
    """
    Then the response status code should be 201
    When I send a GET request to "/api/categories/3FA85F64-5717-4562-B3FC-2C963F66AFA6"
    Then the response status code should be 200
    And the response should contain:
    """
    {
      "id": "3FA85F64-5717-4562-B3FC-2C963F66AFA6",
      "name": "Tecnología",
      "description": "Productos electrónicos"
    }
    """

  Scenario: Get a non-existing category
    Given I send a GET request to "/api/categories/7C9E6679-7425-40DE-944B-E07FC1F90AE7"
    Then the response status code should be 404
