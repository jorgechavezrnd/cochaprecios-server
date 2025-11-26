Feature: Update a Category
  In order to modify category information
  As a user
  I want to update a category by its ID

  Scenario: Update an existing category
    Given I send a PUT request to "/api/users/B1C2D3E4-F5A6-4BC7-8DEF-0123456789AB" with body:
    """
    {
      "name": "Admin User",
      "username": "admin.user2",
      "email": "admin2@example.com",
      "password": "adminpass456",
      "role": "admin"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "admin2@example.com",
      "password": "adminpass456"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "token"
    Given I set bearer token from variable "token"
    Given I send a PUT request to "/api/categories/6A5EC04D-6981-43B1-AD95-9F4C8891D6D0" with body:
    """
    {
      "name": "Hogar",
      "description": "Artículos para el hogar"
    }
    """
    Then the response status code should be 201
    Given I set bearer token from variable "token"
    When I send a PUT request to "/api/categories/6A5EC04D-6981-43B1-AD95-9F4C8891D6D0" with body:
    """
    {
      "name": "Hogar y Jardín",
      "description": "Artículos para el hogar y jardín"
    }
    """
    Then the response status code should be 200
    And the response should be empty
