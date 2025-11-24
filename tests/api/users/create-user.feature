Feature: Create a new User
  In order to have users in the platform
  As a user
  I want to create a new user

  Scenario: A Valid non existing user
    Given I send a PUT request to "/api/users/0A1A0805-B22B-4179-A09C-B4F21F2994FB" with body:
    """
    {
      "name": "Pepe Garcia",
      "username": "pepe123",
      "email": "pepe@example.com",
      "password": "password123",
      "role": "viewer"
    }
    """
    Then the response status code should be 201
    And the response should be empty

  Scenario: An invalid user with missing required fields
    Given I send a PUT request to "/api/users/0A1A0805-B22B-4179-A09C-B4F21F2994FB" with body:
    """
    {
      "name": "Pepe Garcia"
    }
    """
    Then the response status code should be 422

  Scenario: An invalid user with invalid email
    Given I send a PUT request to "/api/users/0A1A0805-B22B-4179-A09C-B4F21F2994FB" with body:
    """
    {
      "name": "Pepe Garcia",
      "username": "pepe123",
      "email": "invalid-email",
      "password": "password123",
      "role": "viewer"
    }
    """
    Then the response status code should be 422

  Scenario: An invalid user with short password
    Given I send a PUT request to "/api/users/0A1A0805-B22B-4179-A09C-B4F21F2994FB" with body:
    """
    {
      "name": "Pepe Garcia",
      "username": "pepe123",
      "email": "pepe@example.com",
      "password": "12345",
      "role": "viewer"
    }
    """
    Then the response status code should be 422

  Scenario: An invalid user with invalid role
    Given I send a PUT request to "/api/users/0A1A0805-B22B-4179-A09C-B4F21F2994FB" with body:
    """
    {
      "name": "Pepe Garcia",
      "username": "pepe123",
      "email": "pepe@example.com",
      "password": "password123",
      "role": "superadmin"
    }
    """
    Then the response status code should be 422
