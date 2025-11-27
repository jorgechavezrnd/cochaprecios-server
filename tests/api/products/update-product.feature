Feature: Update a Product
  In order to modify product information
  As an admin
  I want to update an existing product

  Scenario: Update an existing product
    Given I send a PUT request to "/api/users/AABBCCDD-EEFF-4A1B-9C2D-3E4F567890AB" with body:
    """
    {
      "name": "Admin User",
      "username": "admin.user8",
      "email": "admin8@example.com",
      "password": "adminpass888",
      "role": "admin"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "admin8@example.com",
      "password": "adminpass888"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "token"
    Given I set bearer token from variable "token"
    Given I send a PUT request to "/api/products/12AB34CD-56EF-4ABC-8DEF-0123456789AB" with body:
    """
    {
      "name": "Cepillo Dental",
      "description": "Cepillo de cerdas suaves",
      "categoryId": "C1D2E3F4-A5B6-4CD8-A123-89ABCDEF0123"
    }
    """
    Then the response status code should be 201
    Given I set bearer token from variable "token"
    Given I send a PUT request to "/api/products/12AB34CD-56EF-4ABC-8DEF-0123456789AB" with body:
    """
    {
      "name": "Cepillo Dental Deluxe",
      "description": "Cepillo de cerdas ultra suaves",
      "categoryId": "C1D2E3F4-A5B6-4CD8-A123-89ABCDEF0123"
    }
    """
    Then the response status code should be 200
