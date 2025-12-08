Feature: Delete a Comment
  In order to remove my comments
  As a viewer
  I want to delete my comment for a product in a store

  Scenario: Delete an existing comment
    # Create admin user for creating product and store
    Given I send a PUT request to "/api/users/AABBCCDD-2222-4A1B-9C2D-777777777777" with body:
    """
    {
      "name": "Admin User Comments2",
      "username": "admin.comments2",
      "email": "admin.comments2@example.com",
      "password": "adminpass222",
      "role": "admin"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "admin.comments2@example.com",
      "password": "adminpass222"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "adminToken"
    Given I set bearer token from variable "adminToken"
    # Create category
    Given I send a PUT request to "/api/categories/AAAA2222-BBBB-4CCC-8DDD-777777777777" with body:
    """
    {
      "name": "Alimentos Test Comments2",
      "description": "Productos alimenticios"
    }
    """
    Then the response status code should be 201
    # Create product
    Given I send a PUT request to "/api/products/A2B3C4D5-E6F7-4789-8BCD-888888888888" with body:
    """
    {
      "name": "Arroz Test Comments2",
      "description": "Arroz de grano largo",
      "categoryId": "AAAA2222-BBBB-4CCC-8DDD-777777777777"
    }
    """
    Then the response status code should be 201
    # Create store
    Given I send a PUT request to "/api/stores/B2C3D4E5-F6A7-4789-8CDE-999999999999" with body:
    """
    {
      "name": "Supermercado Test Comments2",
      "address": "Av. Test 456",
      "phone": "5555555"
    }
    """
    Then the response status code should be 201
    # Create viewer user for commenting
    Given I send a PUT request to "/api/users/E1F2A3B4-C5D6-4789-8FAB-AAAAAAAAAAAA" with body:
    """
    {
      "name": "Comment Test User 2",
      "username": "commenttest.user2",
      "email": "commenttest2@example.com",
      "password": "commentpass222",
      "role": "viewer"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "commenttest2@example.com",
      "password": "commentpass222"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "token"
    Given I set bearer token from variable "token"
    # Create comment
    Given I send a PUT request to "/api/comments/F1A2B3C4-D5E6-4789-8ABC-BBBBBBBBBBBB" with body:
    """
    {
      "productId": "A2B3C4D5-E6F7-4789-8BCD-888888888888",
      "storeId": "B2C3D4E5-F6A7-4789-8CDE-999999999999",
      "content": "This is a test comment to be deleted"
    }
    """
    Then the response status code should be 201
    # Delete comment
    When I send a DELETE request to "/api/comments/F1A2B3C4-D5E6-4789-8ABC-BBBBBBBBBBBB"
    Then the response status code should be 204
