Feature: Create a Price
  As an admin
  I want to create a price

  Scenario: Create a new price
    Given I send a PUT request to "/api/users/AA11BB22-CC33-4DD4-8EE5-66778899AACC" with body:
    """
    {
      "name": "Admin User",
      "username": "admin.price1",
      "email": "adminprice1@example.com",
      "password": "adminpass111",
      "role": "admin"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "adminprice1@example.com",
      "password": "adminpass111"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "token"
    Given I set bearer token from variable "token"
    Given I send a PUT request to "/api/stores/00AA11BB-22CC-4DD4-8EE5-99AABBCCDDEE" with body:
    """
    {
      "name": "Hipermaxi Centro",
      "address": "Av. Principal #123",
      "phone": "+591-444-555-666"
    }
    """
    Then the response status code should be 201
    Given I set bearer token from variable "token"
    Given I send a PUT request to "/api/products/11AA22BB-33CC-4DD4-8EE5-99AABBCCDDEE" with body:
    """
    {
      "name": "Arroz Premium",
      "description": "Arroz de grano largo",
      "categoryId": "A1B2C3D4-E5F6-47A8-9ABC-0DEF12345678"
    }
    """
    Then the response status code should be 201
    Given I set bearer token from variable "token"
    Given I send a PUT request to "/api/prices/22AA33BB-44CC-4DD4-8EE5-99AABBCCDDEE" with body:
    """
    {
      "productId": "11AA22BB-33CC-4DD4-8EE5-99AABBCCDDEE",
      "storeId": "00AA11BB-22CC-4DD4-8EE5-99AABBCCDDEE",
      "price": 12.50,
      "currency": "BOB",
      "collectedAt": "2024-08-01T00:00:00.000Z",
      "source": "manual"
    }
    """
    Then the response status code should be 201
    And the response should be empty

