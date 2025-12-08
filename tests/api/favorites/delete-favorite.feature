Feature: Delete a Favorite
  In order to manage my favorites
  As a viewer
  I want to remove a product from my favorites

  Scenario: Delete an existing favorite
    # Create admin user for creating product and store
    Given I send a PUT request to "/api/users/AABBCCDD-2222-4A1B-9C2D-EEEEEEEEEEEE" with body:
    """
    {
      "name": "Admin User Favorites2",
      "username": "admin.favorites2",
      "email": "admin.favorites2@example.com",
      "password": "adminpass222",
      "role": "admin"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "admin.favorites2@example.com",
      "password": "adminpass222"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "adminToken"
    Given I set bearer token from variable "adminToken"
    # Create category
    Given I send a PUT request to "/api/categories/AAAA2222-BBBB-4CCC-8DDD-EEEEEEEEEEEE" with body:
    """
    {
      "name": "Alimentos Test Favorites2",
      "description": "Productos alimenticios"
    }
    """
    Then the response status code should be 201
    # Create product
    Given I send a PUT request to "/api/products/A2B3C4D5-E6F7-4789-8BCD-EEEEEEEEEEEE" with body:
    """
    {
      "name": "Arroz Test Favorites2",
      "description": "Arroz de grano largo",
      "categoryId": "AAAA2222-BBBB-4CCC-8DDD-EEEEEEEEEEEE"
    }
    """
    Then the response status code should be 201
    # Create store
    Given I send a PUT request to "/api/stores/B2C3D4E5-F6A7-4789-8CDE-EEEEEEEEEEEE" with body:
    """
    {
      "name": "Supermercado Test Favorites2",
      "address": "Av. Test 456",
      "phone": "5555555"
    }
    """
    Then the response status code should be 201
    # Create viewer user for favoriting
    Given I send a PUT request to "/api/users/E1F2A3B4-C5D6-4789-8FAB-EEEEEEEEEEEE" with body:
    """
    {
      "name": "Favorite Test User 2",
      "username": "favoritetest.user2",
      "email": "favoritetest2@example.com",
      "password": "favoritepass222",
      "role": "viewer"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "favoritetest2@example.com",
      "password": "favoritepass222"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "token"
    Given I set bearer token from variable "token"
    # Create favorite
    Given I send a PUT request to "/api/favorites/F1A2B3C4-D5E6-4789-8ABC-EEEEEEEEEEEE" with body:
    """
    {
      "productId": "A2B3C4D5-E6F7-4789-8BCD-EEEEEEEEEEEE",
      "storeId": "B2C3D4E5-F6A7-4789-8CDE-EEEEEEEEEEEE"
    }
    """
    Then the response status code should be 201
    # Delete favorite
    When I send a DELETE request to "/api/favorites/F1A2B3C4-D5E6-4789-8ABC-EEEEEEEEEEEE"
    Then the response status code should be 204
