Feature: Create a Store
  As an admin
  I want to create a store

  Scenario: Create a new store
    Given I send a PUT request to "/api/users/8899AABB-CCDD-4EE1-8FF2-0123456789AB" with body:
    """
    {
      "name": "Admin User",
      "username": "admin.store1",
      "email": "adminstore1@example.com",
      "password": "adminpass111",
      "role": "admin"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "adminstore1@example.com",
      "password": "adminpass111"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "token"
    Given I set bearer token from variable "token"
    Given I send a PUT request to "/api/stores/44556677-8899-4AA0-8BB1-223344556677" with body:
    """
    {
      "name": "Supermercado Central",
      "address": "Av. Principal #123",
      "phone": "+591-444-555-666"
    }
    """
    Then the response status code should be 201
    And the response should be empty
