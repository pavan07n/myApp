# MyApp - Simple REST API for User Authentication and Post Creation

#### MyApp is a Node.js application that provides a simple REST API for user authentication and post creation. It utilizes Node.js, Express, and Passport.js for handling user authentication with JWT tokens.

## Features

    * User registration: Users can create an account by providing their username and password.
    * User authentication: JWT tokens are used for user authentication, allowing users to securely access protected endpoints.
    * Post creation: Authenticated users can generate posts with title, body, and other details.
    * Geolocation support: Posts can include geolocation information (latitude and longitude).
    * Dashboard statistics: Provides statistics on the count of active and inactive posts.

## API Endpoints

### Users

1.  **Route:** POST /users/register: This route registers a new user account.
    Request body:

    - `fullName` (String): User's Full Name.
    - `username` (String): User's username.
    - `password` (String): User's password.

    Response:

    - `201 Created`: User account created successfully and token generated.
    - `400 Bad request`: If User already exists or Invalid data.

2.  **Route:** `POST /users/login`: This route authenticates user and generates a JWT token.
    Request body:

    - `username` (String): User's username.
    - `password` (String): User's password.

    Response:

    - `200 OK`: User logged in and token generated.
    - `401 Unauthorized`: Invalid credentials.
    - `500 Internal Server Error`: If there's a server error.

3.  **Route:** `GET /users/me`: This route fetches user's profile.
    Requires authentication (JWT token)

    Response:

    - `200 OK`: Returns User's profile
    - `401 Unauthorized`: If logged out (token expired).
    - `500 Internal Server Error`: If there's a server error.

4.  **Route:** `PATCH /users/me/update`:This route updates user details.
    Requires authentication (JWT token)

    Request body:

    - `fullName` (String): User's Full Name.
    - `username` (String): User's username.
    - `password` (String): User's password.

      Response:

    - `200 OK`: Returns updated user info.
    - `400 Bad request`: Invalid update.
    - `401 Unauthorized`: If logged out (token expired).

5.  **Route:** `DELETE /users/me/delete`: This route deletes user and associated posts.
    Requires authentication (JWT token)

    Response:

- `200 OK`: Returns deleted user info.
- `401 Unauthorized`: If trying to delete non-existent user.
- `500 Internal Server Error`: If there's a server error.

### Posts

1. **Route:** `POST /api/posts`:This route creates a new post.
   Requires authentication (JWT token)

   Request body:

   - `title` (string): Title of the post
   - `body` (string): Body content of the post
   - `active` (boolean): Status of the post (active/inactive)
   - `location` (object): Location information of the post (Coordinates[Longitude and Latitude])
     Response:
   - `200 OK`: : Returns the created post.
   - `404 Bad Request `: If user inputs No data or Invalid data.

2. **Route:** `GET /posts`:This route retrieves all posts created by the authenticated user.
   Requires authentication (JWT token)

   Response:

   - `200 OK`: Returns an array of posts by the user.
   - `404 Not Found`: If no posts are found.
   - `500 Internal Server Error`: If there's a server error.

3. **Route:** `GET /posts/:id`: This route retrieves a specific post by its ID.
   Requires authentication (JWT token)

   Request Query:

   - `id` (String): Id of the post

   Response:

   - `200 OK`: Returns the requested post.
   - `404 Not Found`: If the post with the provided ID is not found.
   - `500 Internal Server Error`: If there's a server error.

4. **Route:** `PATCH /posts/:id`: This route updates a specific post
   Requires authentication (JWT token)

   Request Query:

   - `id` (String): Id of the post

   Request body:

   - `title` (string): Updated title of the post
   - `body` (string): Updated body content of the post
   - `active` (boolean): Updated status of the post (active/inactive)
   - `location` (object): Updated location information of the post (Coordinates[Longitude and Latitude])

   Response:

   - `200 OK`: Returns the updated post.
   - `400 Bad Request`: If the update request is invalid.
   - `404 Not Found`: If the post with the provided ID is not found.
   - `500 Internal Server Error`: If there's a server error.

5. **Route:** `DELETE /posts/:id`: This route deletes a specific post.
   Requires authentication (JWT token)

   Request Query:

   - `id` (String): Id of the post

   Response:

   - `200 OK`: Returns the deleted post.
   - `404 Not Found`: If the post with the provided ID is not found.
   - `500 Internal Server Error`: If there's a server error.

6. **Route:** `GET /postCounts`: This route retrieves counts of active and inactive posts for the authenticated user.
   Requires authentication (JWT token)

   Response:

   - `200 OK`: Returns counts of active and inactive posts.
   - `500 Internal Server Error`: If there's a server error.

7. **Route:** `GET /posts/:longitude/:latitude`: This route retrieves posts based on latitude and longitude.
   Requires authentication (JWT token)

   Request Query:

   - `longitude` (Number): Longitude of the location
   - `latitudetude` (Number): Latitude of the location

   Response:

   - `200 OK`: Returns posts within the specified location.
   - `500 Internal Server Error`: If there's a server error.

## Maintainers

- [Pavan N](https://github.com/pavan07n "Github home")
