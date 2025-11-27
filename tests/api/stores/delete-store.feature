Feature: Delete a Store
  As an admin
  I want to delete a store

  Scenario: Delete existing store
    Given I send a PUT request to "/api/users/5566AABB-CCDD-4EE1-8FF2-112233445566" with body:
    """
    {
      "name": "Admin User",
      "username": "admin.store3",
      "email": "adminstore3@example.com",
      "password": "adminpass333",
      "role": "admin"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "adminstore3@example.com",
      "password": "adminpass333"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "token"
    Given I set bearer token from variable "token"
    Given I send a PUT request to "/api/stores/77889900-AABB-4CC1-8DD2-334455667799" with body:
    """
    {
      "name": "Hipermaxi Norte",
      "address": "Av. Secundaria #45",
      "phone": "+591-333-444-555"
    }
    """
    Then the response status code should be 201
    Given I set bearer token from variable "token"
    When I send a DELETE request to "/api/stores/77889900-AABB-4CC1-8DD2-334455667799"
    Then the response status code should be 204

