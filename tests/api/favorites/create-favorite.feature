Feature: Create a new Favorite
  In order to save products for later
  As a viewer
  I want to add a product to my favorites

  Scenario: A valid favorite for a product
    # Create admin user for creating product and store
    Given I send a PUT request to "/api/users/11111111-2222-4333-8444-FFFFFFFFFFFF" with body:
    """
    {
      "name": "Admin User Favorites1",
      "username": "admin.favorites1",
      "email": "admin.favorites1@example.com",
      "password": "adminpass111",
      "role": "admin"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "admin.favorites1@example.com",
      "password": "adminpass111"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "adminToken"
    Given I set bearer token from variable "adminToken"
    # Create category
    Given I send a PUT request to "/api/categories/22222222-3333-4444-8555-FFFFFFFFFFFF" with body:
    """
    {
      "name": "Alimentos Test Favorites1",
      "description": "Productos alimenticios"
    }
    """
    Then the response status code should be 201
    # Create product
    Given I send a PUT request to "/api/products/33333333-4444-4555-8666-FFFFFFFFFFFF" with body:
    """
    {
      "name": "Arroz Test Favorites1",
      "description": "Arroz de grano largo",
      "categoryId": "22222222-3333-4444-8555-FFFFFFFFFFFF"
    }
    """
    Then the response status code should be 201
    # Create store
    Given I send a PUT request to "/api/stores/44444444-5555-4666-8777-FFFFFFFFFFFF" with body:
    """
    {
      "name": "Supermercado Test Favorites1",
      "address": "Av. Test 123",
      "phone": "4444444"
    }
    """
    Then the response status code should be 201
    # Create viewer user for favoriting
    Given I send a PUT request to "/api/users/55555555-6666-4777-8888-FFFFFFFFFFFF" with body:
    """
    {
      "name": "Favorite Test User 1",
      "username": "favoritetest.user1",
      "email": "favoritetest1@example.com",
      "password": "favoritepass111",
      "role": "viewer"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "favoritetest1@example.com",
      "password": "favoritepass111"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "token"
    Given I set bearer token from variable "token"
    # Create favorite
    Given I send a PUT request to "/api/favorites/66666666-7777-4888-8999-FFFFFFFFFFFF" with body:
    """
    {
      "productId": "33333333-4444-4555-8666-FFFFFFFFFFFF",
      "storeId": "44444444-5555-4666-8777-FFFFFFFFFFFF"
    }
    """
    Then the response status code should be 201
    And the response should be empty
