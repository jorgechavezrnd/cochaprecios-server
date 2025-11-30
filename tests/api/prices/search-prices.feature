Feature: Search Prices
  As a user
  I want to search prices by product and range

  Scenario: Search by productId returns prices
    Given I send a PUT request to "/api/users/3FA85F64-5717-4562-B3FC-2C963F66AFA6" with body:
    """
    {
      "name": "Admin User",
      "username": "admin.price4",
      "email": "adminprice4@example.com",
      "password": "adminpass444",
      "role": "admin"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "adminprice4@example.com",
      "password": "adminpass444"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "token"
    Given I set bearer token from variable "token"
    Given I send a PUT request to "/api/stores/99AA00BB-11CC-4DD4-8EE5-99AABBCCDDEE" with body:
    """
    {
      "name": "Hipermaxi Este",
      "address": "Av. Cuarta #89",
      "phone": "+591-111-222-333"
    }
    """
    Then the response status code should be 201
    Given I set bearer token from variable "token"
    Given I send a PUT request to "/api/products/00AA11BB-22CC-4DD4-8EE5-99AABBCCDDEF" with body:
    """
    {
      "name": "Azúcar Blanca",
      "description": "Azúcar refinada",
      "categoryId": "D1E2F3A4-B5C6-4DD8-A123-89ABCDEF0123"
    }
    """
    Then the response status code should be 201
    Given I set bearer token from variable "token"
    Given I send a PUT request to "/api/prices/11AA22BB-33CC-4DD4-8EE5-99AABBCCDDEF" with body:
    """
    {
      "productId": "00AA11BB-22CC-4DD4-8EE5-99AABBCCDDEF",
      "storeId": "99AA00BB-11CC-4DD4-8EE5-99AABBCCDDEE",
      "price": 5.50,
      "currency": "BOB",
      "collectedAt": "2024-08-01T00:00:00.000Z",
      "source": "manual"
    }
    """
    Then the response status code should be 201
    When I send a GET request to "/api/prices?productId=00AA11BB-22CC-4DD4-8EE5-99AABBCCDDEF&from=2024-08-01T00:00:00.000Z&to=2024-08-31T00:00:00.000Z"
    Then the response status code should be 200
