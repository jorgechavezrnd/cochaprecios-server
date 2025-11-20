Feature: Create a new User
  In order to have users in the platform
  As a user
  I want to create a new user

  Scenario: A Valid non existing user
    Given I send a PUT request to "/api/users/0A1A0805-B22B-4179-A09C-B4F21F2994FB" with body:
    """
    {
      "name": "Pepe"
    }
    """
    Then the response status code should be 201
    And the response should be empty
