Feature: Get User Favorites
  In order to see my saved products
  As a viewer
  I want to get my list of favorites

  Scenario: Get favorites for a user with existing favorites
    # Create admin user for creating product and store
    Given I send a PUT request to "/api/users/AABBCCDD-3333-4A1B-9C2D-DDDDDDDDDDDD" with body:
    """
    {
      "name": "Admin User Favorites3",
      "username": "admin.favorites3",
      "email": "admin.favorites3@example.com",
      "password": "adminpass333",
      "role": "admin"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "admin.favorites3@example.com",
      "password": "adminpass333"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "adminToken"
    Given I set bearer token from variable "adminToken"
    # Create category
    Given I send a PUT request to "/api/categories/AAAA3333-BBBB-4CCC-8DDD-DDDDDDDDDDDD" with body:
    """
    {
      "name": "Alimentos Test Favorites3",
      "description": "Productos alimenticios"
    }
    """
    Then the response status code should be 201
    # Create product
    Given I send a PUT request to "/api/products/A1B2C3D4-E5F6-4789-8BCD-123456789ABC" with body:
    """
    {
      "name": "Arroz Test Favorites3",
      "description": "Arroz de grano largo",
      "categoryId": "AAAA3333-BBBB-4CCC-8DDD-DDDDDDDDDDDD"
    }
    """
    Then the response status code should be 201
    # Create store
    Given I send a PUT request to "/api/stores/B1C2D3E4-F5A6-4789-8CDE-234567890BCD" with body:
    """
    {
      "name": "Supermercado Test Favorites3",
      "address": "Av. Test 789",
      "phone": "6666666"
    }
    """
    Then the response status code should be 201
    # Create viewer user for favoriting
    Given I send a PUT request to "/api/users/C2D3E4F5-A6B7-4789-8DEF-DDDDDDDDDDDD" with body:
    """
    {
      "name": "Favorite Test User 3",
      "username": "favoritetest.user3",
      "email": "favoritetest3@example.com",
      "password": "favoritepass333",
      "role": "viewer"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "favoritetest3@example.com",
      "password": "favoritepass333"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "token"
    Given I set bearer token from variable "token"
    # Create favorite
    Given I send a PUT request to "/api/favorites/C1D2E3F4-A5B6-4789-8DEF-345678901CDE" with body:
    """
    {
      "productId": "A1B2C3D4-E5F6-4789-8BCD-123456789ABC",
      "storeId": "B1C2D3E4-F5A6-4789-8CDE-234567890BCD"
    }
    """
    Then the response status code should be 201
    # Get favorites
    When I send a GET request to "/api/favorites"
    Then the response status code should be 200
    And the response should contain field "favorites"
