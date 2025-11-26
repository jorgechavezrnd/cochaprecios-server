Feature: Update a Category
  In order to modify category information
  As a user
  I want to update a category by its ID

  Scenario: Update an existing category
    Given I send a PUT request to "/api/categories/6A5EC04D-6981-43B1-AD95-9F4C8891D6D0" with body:
    """
    {
      "name": "Hogar",
      "description": "Artículos para el hogar"
    }
    """
    Then the response status code should be 201
    When I send a PUT request to "/api/categories/6A5EC04D-6981-43B1-AD95-9F4C8891D6D0" with body:
    """
    {
      "name": "Hogar y Jardín",
      "description": "Artículos para el hogar y jardín"
    }
    """
    Then the response status code should be 200
    And the response should be empty
