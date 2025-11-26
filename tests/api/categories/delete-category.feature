Feature: Delete a Category
  In order to remove categories from the platform
  As a user
  I want to delete a category by its ID

  Scenario: Delete an existing category
    Given I send a PUT request to "/api/categories/8E2A1C3B-4F2B-4C3A-8E2B-1A2B3C4D5E6F" with body:
    """
    {
      "name": "Libros",
      "description": "Libros y literatura"
    }
    """
    Then the response status code should be 201
    When I send a DELETE request to "/api/categories/8E2A1C3B-4F2B-4C3A-8E2B-1A2B3C4D5E6F"
    Then the response status code should be 204

  Scenario: Delete a non-existing category
    Given I send a DELETE request to "/api/categories/9E2A1C3B-4F2B-4C3A-8E2B-1A2B3C4D5E6F"
    Then the response status code should be 204
