Feature: Get a Price by ID
  As a user
  I want to get a price by its ID

  Scenario: Get an existing price
    Given I send a PUT request to "/api/users/550E8400-E29B-41D4-A716-446655440000" with body:
    """
    {
      "name": "Admin User",
      "username": "admin.price3",
      "email": "adminprice3@example.com",
      "password": "adminpass333",
      "role": "admin"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "adminprice3@example.com",
      "password": "adminpass333"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "token"
    Given I set bearer token from variable "token"
    Given I send a PUT request to "/api/stores/66AA77BB-88CC-4DD4-8EE5-99AABBCCDDEE" with body:
    """
    {
      "name": "Hipermaxi Sur",
      "address": "Av. Tercera #67",
      "phone": "+591-222-333-444"
    }
    """
    Then the response status code should be 201
    Given I set bearer token from variable "token"
    Given I send a PUT request to "/api/products/77AA88BB-99CC-4DD4-8EE5-99AABBCCDDEE" with body:
    """
    {
      "name": "Harina Integral",
      "description": "Harina de trigo",
      "categoryId": "C1D2E3F4-A5B6-4CD8-A123-89ABCDEF0123"
    }
    """
    Then the response status code should be 201
    Given I set bearer token from variable "token"
    Given I send a PUT request to "/api/prices/88AA99BB-00CC-4DD4-8EE5-99AABBCCDDEE" with body:
    """
    {
      "productId": "77AA88BB-99CC-4DD4-8EE5-99AABBCCDDEE",
      "storeId": "66AA77BB-88CC-4DD4-8EE5-99AABBCCDDEE",
      "price": 8.99,
      "currency": "BOB",
      "collectedAt": "2024-08-03T00:00:00.000Z",
      "source": "manual"
    }
    """
    Then the response status code should be 201
    When I send a GET request to "/api/prices/88AA99BB-00CC-4DD4-8EE5-99AABBCCDDEE"
    Then the response status code should be 200
    And the response should contain:
    """
    {
      "id": "88AA99BB-00CC-4DD4-8EE5-99AABBCCDDEE",
      "currency": "BOB",
      "source": "manual"
    }
    """
