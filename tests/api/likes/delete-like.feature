Feature: Delete a Like
  In order to remove likes from products
  As a viewer user
  I want to delete my like for a product in a store

  Scenario: Delete an existing like
    # Create admin user for creating product and store
    Given I send a PUT request to "/api/users/AABBCCDD-2222-4A1B-9C2D-222222222222" with body:
    """
    {
      "name": "Admin User Likes2",
      "username": "admin.likes2",
      "email": "admin.likes2@example.com",
      "password": "adminpass222",
      "role": "admin"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "admin.likes2@example.com",
      "password": "adminpass222"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "adminToken"
    Given I set bearer token from variable "adminToken"
    # Create category
    Given I send a PUT request to "/api/categories/AAAA2222-BBBB-4CCC-8DDD-EEEEEEEE2222" with body:
    """
    {
      "name": "Alimentos Test Likes2",
      "description": "Productos alimenticios"
    }
    """
    Then the response status code should be 201
    # Create product
    Given I send a PUT request to "/api/products/A2B3C4D5-E6F7-4789-ABCD-789012345ABC" with body:
    """
    {
      "name": "Arroz Test Likes2",
      "description": "Arroz de grano largo",
      "categoryId": "AAAA2222-BBBB-4CCC-8DDD-EEEEEEEE2222"
    }
    """
    Then the response status code should be 201
    # Create store
    Given I send a PUT request to "/api/stores/B2C3D4E5-F6A7-4789-BCDE-890123456BCD" with body:
    """
    {
      "name": "Supermercado Test Likes2",
      "address": "Av. Test 456",
      "phone": "5555555"
    }
    """
    Then the response status code should be 201
    # Create viewer user for liking
    Given I send a PUT request to "/api/users/E1F2A3B4-C5D6-4789-8FAB-567890123EFA" with body:
    """
    {
      "name": "Like Test User 2",
      "username": "liketest.user2",
      "email": "liketest2@example.com",
      "password": "likepass222",
      "role": "viewer"
    }
    """
    Then the response status code should be 201
    When I send a POST request to "/api/users/auth" with body:
    """
    {
      "email": "liketest2@example.com",
      "password": "likepass222"
    }
    """
    Then the response status code should be 200
    And I store field "token" as variable "token"
    Given I set bearer token from variable "token"
    # Create like
    Given I send a PUT request to "/api/likes/F1A2B3C4-D5E6-4789-8ABC-678901234FAB" with body:
    """
    {
      "productId": "A2B3C4D5-E6F7-4789-ABCD-789012345ABC",
      "storeId": "B2C3D4E5-F6A7-4789-BCDE-890123456BCD"
    }
    """
    Then the response status code should be 201
    # Delete like
    When I send a DELETE request to "/api/likes/F1A2B3C4-D5E6-4789-8ABC-678901234FAB"
    Then the response status code should be 204
