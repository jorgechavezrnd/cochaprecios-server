Feature: Get a Product by ID
  In order to retrieve product information
  As a user
  I want to get a product by its ID

  Scenario: Get an existing product
    Given I send a PUT request to "/api/users/DDCCBBAA-9988-4AA1-8B2C-3D4E5F6789AB" with body:
    """
    {
      "name": "Admin User",
      "username": "admin.user6",
      "email": "admin6@example.com",
      "password": "adminpass666",
      "role": "admin"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "admin6@example.com",
      "password": "adminpass666"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "token"
    Given I set bearer token from variable "token"
    Given I send a PUT request to "/api/products/DEADBEEF-0000-4ABC-8DEF-1234567890AB" with body:
    """
    {
      "name": "Leche Entera",
      "description": "Leche pasteurizada",
      "categoryId": "B1C2D3E4-F5A6-4BC7-8DEF-0123456789AB"
    }
    """
    Then the response status code should be 201
    When I send a GET request to "/api/products/DEADBEEF-0000-4ABC-8DEF-1234567890AB"
    Then the response status code should be 200
    And the response should contain:
    """
    {
      "id": "DEADBEEF-0000-4ABC-8DEF-1234567890AB",
      "name": "Leche Entera",
      "description": "Leche pasteurizada",
      "categoryId": "B1C2D3E4-F5A6-4BC7-8DEF-0123456789AB"
    }
    """

