Feature: Update a Store
  As an admin
  I want to update a store

  Scenario: Update existing store
    Given I send a PUT request to "/api/users/99887766-5544-4AA1-8BB2-66778899AABB" with body:
    """
    {
      "name": "Admin User",
      "username": "admin.store2",
      "email": "adminstore2@example.com",
      "password": "adminpass222",
      "role": "admin"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "adminstore2@example.com",
      "password": "adminpass222"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "token"
    Given I set bearer token from variable "token"
    Given I send a PUT request to "/api/stores/1122AABB-CCDD-4EE1-8FF2-334455667788" with body:
    """
    {
      "name": "Hipermaxi Centro X",
      "address": "Av. Principal #123",
      "phone": "+591-444-555-666"
    }
    """
    Then the response status code should be 201
    Given I set bearer token from variable "token"
    Given I send a PUT request to "/api/stores/1122AABB-CCDD-4EE1-8FF2-334455667788" with body:
    """
    {
      "name": "Hipermaxi Centro X2",
      "address": "Av. Principal #124",
      "phone": "+591-777-888-999"
    }
    """
    Then the response status code should be 200
