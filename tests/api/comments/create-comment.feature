Feature: Create a new Comment
  In order to comment on products
  As a viewer
  I want to create a comment for a product in a store

  Scenario: A valid comment for a product
    # Create admin user for creating product and store
    Given I send a PUT request to "/api/users/11111111-2222-4333-8444-111111111111" with body:
    """
    {
      "name": "Admin User Comments1",
      "username": "admin.comments1",
      "email": "admin.comments1@example.com",
      "password": "adminpass111",
      "role": "admin"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "admin.comments1@example.com",
      "password": "adminpass111"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "adminToken"
    Given I set bearer token from variable "adminToken"
    # Create category
    Given I send a PUT request to "/api/categories/22222222-3333-4444-8555-222222222222" with body:
    """
    {
      "name": "Alimentos Test Comments1",
      "description": "Productos alimenticios"
    }
    """
    Then the response status code should be 201
    # Create product
    Given I send a PUT request to "/api/products/33333333-4444-4555-8666-333333333333" with body:
    """
    {
      "name": "Arroz Test Comments1",
      "description": "Arroz de grano largo",
      "categoryId": "22222222-3333-4444-8555-222222222222"
    }
    """
    Then the response status code should be 201
    # Create store
    Given I send a PUT request to "/api/stores/44444444-5555-4666-8777-444444444444" with body:
    """
    {
      "name": "Supermercado Test Comments1",
      "address": "Av. Test 123",
      "phone": "4444444"
    }
    """
    Then the response status code should be 201
    # Create viewer user for commenting
    Given I send a PUT request to "/api/users/55555555-6666-4777-8888-555555555555" with body:
    """
    {
      "name": "Comment Test User 1",
      "username": "commenttest.user1",
      "email": "commenttest1@example.com",
      "password": "commentpass111",
      "role": "viewer"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "commenttest1@example.com",
      "password": "commentpass111"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "token"
    Given I set bearer token from variable "token"
    # Create comment
    Given I send a PUT request to "/api/comments/66666666-7777-4888-8999-666666666666" with body:
    """
    {
      "productId": "33333333-4444-4555-8666-333333333333",
      "storeId": "44444444-5555-4666-8777-444444444444",
      "content": "Great product, highly recommended!"
    }
    """
    Then the response status code should be 201
    And the response should be empty
