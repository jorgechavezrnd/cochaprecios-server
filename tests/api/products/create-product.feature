Feature: Create a new Product
  In order to have products in the platform
  As an admin
  I want to create a new product

  Scenario: A valid non existing product
    Given I send a PUT request to "/api/users/AABBCCDD-EEFF-4A1B-9C2D-3E4F567890AB" with body:
    """
    {
      "name": "Admin User",
      "username": "admin.user5",
      "email": "admin5@example.com",
      "password": "adminpass555",
      "role": "admin"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "admin5@example.com",
      "password": "adminpass555"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "token"
    Given I set bearer token from variable "token"
    Given I send a PUT request to "/api/products/CAFEBABE-1234-4DEF-8A1B-23456789CDEF" with body:
    """
    {
      "name": "Arroz Premium",
      "description": "Arroz de grano largo",
      "categoryId": "A1B2C3D4-E5F6-47A8-9ABC-0DEF12345678"
    }
    """
    Then the response status code should be 201
    And the response should be empty

