Feature: Search Products
  In order to find products
  As a user
  I want to search products by name or category

  Scenario: Search by name returns product
    Given I send a PUT request to "/api/users/11223344-5566-4A77-8B88-99AABBCCDDEE" with body:
    """
    {
      "name": "Admin User",
      "username": "admin.user7",
      "email": "admin7@example.com",
      "password": "adminpass777",
      "role": "admin"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "admin7@example.com",
      "password": "adminpass777"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "token"
    Given I set bearer token from variable "token"
    Given I send a PUT request to "/api/products/ABCDEF12-3456-4ABC-8DEF-0123456789AB" with body:
    """
    {
      "name": "Cepillo Dental",
      "description": "Cepillo de cerdas suaves",
      "categoryId": "C1D2E3F4-A5B6-4CD8-A123-89ABCDEF0123"
    }
    """
    Then the response status code should be 201
    When I send a GET request to "/api/products?name=Cepillo%20Dental"
    Then the response status code should be 200
