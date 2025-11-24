Feature: Get a User by ID
  In order to retrieve user information
  As a user
  I want to get a user by their ID

  Scenario: Get an existing user
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
    When I send a GET request to "/api/users/0A1A0805-B22B-4179-A09C-B4F21F2994FB"
    Then the response status code should be 200
    And the response should contain:
    """
    {
      "id": "0A1A0805-B22B-4179-A09C-B4F21F2994FB",
      "name": "Pepe Garcia",
      "username": "pepe123",
      "email": "pepe@example.com",
      "role": "viewer"
    }
    """

  Scenario: Get a non-existing user
    Given I send a GET request to "/api/users/715FB794-0CCF-4407-9438-DF6709B130FB"
    Then the response status code should be 404
