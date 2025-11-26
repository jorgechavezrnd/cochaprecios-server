Feature: Create a new Category
  In order to have categories in the platform
  As a user
  I want to create a new category

  Scenario: A valid non existing category
    Given I send a PUT request to "/api/users/A1B2C3D4-E5F6-47A8-9ABC-0DEF12345678" with body:
    """
    {
      "name": "Admin User",
      "username": "admin.user",
      "email": "admin@example.com",
      "password": "adminpass123",
      "role": "admin"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "admin@example.com",
      "password": "adminpass123"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "token"
    Given I set bearer token from variable "token"
    Given I send a PUT request to "/api/categories/16FD2706-8BAF-433B-82EB-8C7FADA847DA" with body:
    """
    {
      "name": "Electrodomésticos",
      "description": "Productos para el hogar"
    }
    """
    Then the response status code should be 201
    And the response should be empty

  Scenario: An invalid category with missing required fields
    Given I set bearer token from variable "token"
    Given I send a PUT request to "/api/categories/1B4E28BA-2FA1-4B3C-9AAF-1D3B9A5A5A5A" with body:
    """
    {
      "name": "SoloNombre"
    }
    """
    Then the response status code should be 422

  Scenario: An invalid category with too long name
    Given I set bearer token from variable "token"
    Given I send a PUT request to "/api/categories/5A1B2C3D-4E5F-4A6B-8C7D-9E0F1A2B3C4D" with body:
    """
    {
      "name": "Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      "description": "Desc"
    }
    """
    Then the response status code should be 500
