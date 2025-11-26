Feature: Delete a Category
  In order to remove categories from the platform
  As a user
  I want to delete a category by its ID

  Scenario: Delete an existing category
    Given I send a PUT request to "/api/users/C1D2E3F4-A5B6-4CD8-A123-89ABCDEF0123" with body:
    """
    {
      "name": "Admin User",
      "username": "admin.user3",
      "email": "admin3@example.com",
      "password": "adminpass789",
      "role": "admin"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "admin3@example.com",
      "password": "adminpass789"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "token"
    Given I set bearer token from variable "token"
    Given I send a PUT request to "/api/categories/8E2A1C3B-4F2B-4C3A-8E2B-1A2B3C4D5E6F" with body:
    """
    {
      "name": "Libros",
      "description": "Libros y literatura"
    }
    """
    Then the response status code should be 201
    Given I set bearer token from variable "token"
    When I send a DELETE request to "/api/categories/8E2A1C3B-4F2B-4C3A-8E2B-1A2B3C4D5E6F"
    Then the response status code should be 204

  Scenario: Delete a non-existing category
    Given I set bearer token from variable "token"
    Given I send a DELETE request to "/api/categories/9E2A1C3B-4F2B-4C3A-8E2B-1A2B3C4D5E6F"
    Then the response status code should be 204
