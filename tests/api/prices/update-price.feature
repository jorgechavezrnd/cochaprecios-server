Feature: Update a Price
  As an admin
  I want to update a price

  Scenario: Update existing price
    Given I send a PUT request to "/api/users/BB11CC22-DD33-4EE4-8FF5-66778899AABB" with body:
    """
    {
      "name": "Admin User",
      "username": "admin.price2",
      "email": "adminprice2@example.com",
      "password": "adminpass222",
      "role": "admin"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "adminprice2@example.com",
      "password": "adminpass222"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "token"
    Given I set bearer token from variable "token"
    Given I send a PUT request to "/api/stores/33AA44BB-55CC-4DD4-8EE5-99AABBCCDDEE" with body:
    """
    {
      "name": "Hipermaxi Norte",
      "address": "Av. Secundaria #45",
      "phone": "+591-333-444-555"
    }
    """
    Then the response status code should be 201
    Given I set bearer token from variable "token"
    Given I send a PUT request to "/api/products/44AA55BB-66CC-4DD4-8EE5-99AABBCCDDEE" with body:
    """
    {
      "name": "Leche Entera",
      "description": "Leche pasteurizada",
      "categoryId": "B1C2D3E4-F5A6-4BC7-8DEF-0123456789AB"
    }
    """
    Then the response status code should be 201
    Given I set bearer token from variable "token"
    Given I send a PUT request to "/api/prices/55AA66BB-77CC-4DD4-8EE5-99AABBCCDDEE" with body:
    """
    {
      "productId": "44AA55BB-66CC-4DD4-8EE5-99AABBCCDDEE",
      "storeId": "33AA44BB-55CC-4DD4-8EE5-99AABBCCDDEE",
      "price": 10.00,
      "currency": "BOB",
      "collectedAt": "2024-08-01T00:00:00.000Z",
      "source": "manual"
    }
    """
    Then the response status code should be 201
    Given I set bearer token from variable "token"
    Given I send a PUT request to "/api/prices/55AA66BB-77CC-4DD4-8EE5-99AABBCCDDEE" with body:
    """
    {
      "productId": "44AA55BB-66CC-4DD4-8EE5-99AABBCCDDEE",
      "storeId": "33AA44BB-55CC-4DD4-8EE5-99AABBCCDDEE",
      "price": 11.25,
      "currency": "BOB",
      "collectedAt": "2024-08-02T00:00:00.000Z",
      "source": "app"
    }
    """
    Then the response status code should be 200

