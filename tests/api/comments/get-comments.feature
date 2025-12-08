Feature: Get Comments for a Product
  In order to see what others think
  As anyone
  I want to get comments for a product in a store

  Scenario: Get comments for a product with existing comments
    # Create admin user for creating product and store
    Given I send a PUT request to "/api/users/AABBCCDD-3333-4A1B-9C2D-CCCCCCCCCCCC" with body:
    """
    {
      "name": "Admin User Comments3",
      "username": "admin.comments3",
      "email": "admin.comments3@example.com",
      "password": "adminpass333",
      "role": "admin"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "admin.comments3@example.com",
      "password": "adminpass333"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "adminToken"
    Given I set bearer token from variable "adminToken"
    # Create category
    Given I send a PUT request to "/api/categories/AAAA3333-BBBB-4CCC-8DDD-CCCCCCCCCCCC" with body:
    """
    {
      "name": "Alimentos Test Comments3",
      "description": "Productos alimenticios"
    }
    """
    Then the response status code should be 201
    # Create product
    Given I send a PUT request to "/api/products/E2F3A4B5-C6D7-4789-8FAB-DDDDDDDDDDDD" with body:
    """
    {
      "name": "Arroz Test Comments3",
      "description": "Arroz de grano largo",
      "categoryId": "AAAA3333-BBBB-4CCC-8DDD-CCCCCCCCCCCC"
    }
    """
    Then the response status code should be 201
    # Create store
    Given I send a PUT request to "/api/stores/F2A3B4C5-D6E7-4789-8ABC-EEEEEEEEEEEE" with body:
    """
    {
      "name": "Supermercado Test Comments3",
      "address": "Av. Test 789",
      "phone": "6666666"
    }
    """
    Then the response status code should be 201
    # Create viewer user for commenting
    Given I send a PUT request to "/api/users/C2D3E4F5-A6B7-4789-8DEF-FFFFFFFFFFFF" with body:
    """
    {
      "name": "Comment Test User 3",
      "username": "commenttest.user3",
      "email": "commenttest3@example.com",
      "password": "commentpass333",
      "role": "viewer"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "commenttest3@example.com",
      "password": "commentpass333"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "token"
    Given I set bearer token from variable "token"
    # Create comment
    Given I send a PUT request to "/api/comments/D2E3F4A5-B6C7-4789-8EFA-000000000000" with body:
    """
    {
      "productId": "E2F3A4B5-C6D7-4789-8FAB-DDDDDDDDDDDD",
      "storeId": "F2A3B4C5-D6E7-4789-8ABC-EEEEEEEEEEEE",
      "content": "Excellent quality and price"
    }
    """
    Then the response status code should be 201
    # Get comments
    When I send a GET request to "/api/comments?productId=E2F3A4B5-C6D7-4789-8FAB-DDDDDDDDDDDD&storeId=F2A3B4C5-D6E7-4789-8ABC-EEEEEEEEEEEE"
    Then the response status code should be 200
    And the response should contain field "comments"
