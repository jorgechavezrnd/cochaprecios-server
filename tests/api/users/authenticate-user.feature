Feature: Authenticate a User
  In order to login to the platform
  As a user
  I want to authenticate with my credentials

  Scenario: Authenticate with valid credentials
    Given I send a PUT request to "/api/users/1B2B0805-C33C-4279-B09C-B4F21F2994FC" with body:
    """
    {
      "name": "Ana Torres",
      "username": "ana2024",
      "email": "ana@example.com",
      "password": "superpass456",
      "role": "viewer"
    }
    """
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "ana@example.com",
      "password": "superpass456"
    }
    """
    Then the response status code should be 200
    And the response should contain:
    """
    {
      "id": "1B2B0805-C33C-4279-B09C-B4F21F2994FC",
      "name": "Ana Torres",
      "username": "ana2024",
      "email": "ana@example.com",
      "role": "viewer"
    }
    """

  Scenario: Authenticate with invalid email
    Given I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "nonexistent@example.com",
      "password": "password123"
    }
    """
    Then the response status code should be 401

  Scenario: Authenticate with invalid password
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
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "pepe@example.com",
      "password": "wrongpassword"
    }
    """
    Then the response status code should be 401

  Scenario: Authenticate with missing credentials
    Given I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "pepe@example.com"
    }
    """
    Then the response status code should be 422
