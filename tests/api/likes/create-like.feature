Feature: Create a new Like
  In order to like products
  As a viewer user
  I want to create a like for a product in a store

  Scenario: A valid like for a product
    # Create admin user for creating product and store
    Given I send a PUT request to "/api/users/11111111-2222-4333-8444-555555555555" with body:
    """
    {
      "name": "Admin User Likes1",
      "username": "admin.likes1",
      "email": "admin.likes1@example.com",
      "password": "adminpass111",
      "role": "admin"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "admin.likes1@example.com",
      "password": "adminpass111"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "adminToken"
    Given I set bearer token from variable "adminToken"
    # Create category
    Given I send a PUT request to "/api/categories/22222222-3333-4444-8555-666666666666" with body:
    """
    {
      "name": "Alimentos Test Likes1",
      "description": "Productos alimenticios"
    }
    """
    Then the response status code should be 201
    # Create product
    Given I send a PUT request to "/api/products/33333333-4444-4555-8666-777777777777" with body:
    """
    {
      "name": "Arroz Test Likes1",
      "description": "Arroz de grano largo",
      "categoryId": "22222222-3333-4444-8555-666666666666"
    }
    """
    Then the response status code should be 201
    # Create store
    Given I send a PUT request to "/api/stores/44444444-5555-4666-8777-888888888888" with body:
    """
    {
      "name": "Supermercado Test Likes1",
      "address": "Av. Test 123",
      "phone": "4444444"
    }
    """
    Then the response status code should be 201
    # Create viewer user for liking
    Given I send a PUT request to "/api/users/55555555-6666-4777-8888-999999999999" with body:
    """
    {
      "name": "Like Test User 1",
      "username": "liketest.user1",
      "email": "liketest1@example.com",
      "password": "likepass111",
      "role": "viewer"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "liketest1@example.com",
      "password": "likepass111"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "token"
    Given I set bearer token from variable "token"
    # Create like
    Given I send a PUT request to "/api/likes/66666666-7777-4888-8999-AAAAAAAAAAAA" with body:
    """
    {
      "productId": "33333333-4444-4555-8666-777777777777",
      "storeId": "44444444-5555-4666-8777-888888888888"
    }
    """
    Then the response status code should be 201
    And the response should be empty
