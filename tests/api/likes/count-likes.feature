Feature: Count Likes for a Product
  In order to see how many likes a product has
  As any user
  I want to count likes for a product in a store

  Scenario: Count likes for a product with existing likes
    # Create admin user for creating product and store
    Given I send a PUT request to "/api/users/AABBCCDD-3333-4A1B-9C2D-333333333333" with body:
    """
    {
      "name": "Admin User Likes3",
      "username": "admin.likes3",
      "email": "admin.likes3@example.com",
      "password": "adminpass333",
      "role": "admin"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "admin.likes3@example.com",
      "password": "adminpass333"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "adminToken"
    Given I set bearer token from variable "adminToken"
    # Create category
    Given I send a PUT request to "/api/categories/AAAA3333-BBBB-4CCC-8DDD-EEEEEEEE3333" with body:
    """
    {
      "name": "Alimentos Test Likes3",
      "description": "Productos alimenticios"
    }
    """
    Then the response status code should be 201
    # Create product
    Given I send a PUT request to "/api/products/E2F3A4B5-C6D7-4789-8FAB-123456789EFA" with body:
    """
    {
      "name": "Arroz Test Likes3",
      "description": "Arroz de grano largo",
      "categoryId": "AAAA3333-BBBB-4CCC-8DDD-EEEEEEEE3333"
    }
    """
    Then the response status code should be 201
    # Create store
    Given I send a PUT request to "/api/stores/F2A3B4C5-D6E7-4789-8ABC-234567890FAB" with body:
    """
    {
      "name": "Supermercado Test Likes3",
      "address": "Av. Test 789",
      "phone": "6666666"
    }
    """
    Then the response status code should be 201
    # Create viewer user for liking
    Given I send a PUT request to "/api/users/C2D3E4F5-A6B7-4789-8DEF-901234567CDE" with body:
    """
    {
      "name": "Like Test User 3",
      "username": "liketest.user3",
      "email": "liketest3@example.com",
      "password": "likepass333",
      "role": "viewer"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "liketest3@example.com",
      "password": "likepass333"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "token"
    Given I set bearer token from variable "token"
    # Create like
    Given I send a PUT request to "/api/likes/D2E3F4A5-B6C7-4789-8EFA-012345678DEF" with body:
    """
    {
      "productId": "E2F3A4B5-C6D7-4789-8FAB-123456789EFA",
      "storeId": "F2A3B4C5-D6E7-4789-8ABC-234567890FAB"
    }
    """
    Then the response status code should be 201
    # Count likes
    When I send a GET request to "/api/likes/count?productId=E2F3A4B5-C6D7-4789-8FAB-123456789EFA&storeId=F2A3B4C5-D6E7-4789-8ABC-234567890FAB"
    Then the response status code should be 200
    And the response should contain field "count"
