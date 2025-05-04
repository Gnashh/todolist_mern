# Docker Image
URL = https://hub.docker.com/r/gnashh/merntodo

# mongoDB : 
![image](https://github.com/user-attachments/assets/dcd0fe80-e050-4822-ad09-23b56f1b585c)

# GET
![image](https://github.com/user-attachments/assets/059d04a6-b0d5-4324-b223-21bb3127fcc3)

# UPDATE
![image](https://github.com/user-attachments/assets/8e504c31-9a87-49b6-ae27-6dd11e88918b)

# DELETE
![image](https://github.com/user-attachments/assets/f45846bf-d6f8-449b-aded-5832bc76231a)

# Swagger API

![image](https://github.com/user-attachments/assets/cda82e19-4405-4577-a822-01d9a1a601dc)
![image](https://github.com/user-attachments/assets/99aebf52-6fda-4ab7-ae14-88c1f4efd4cb)

## API Endpoints

### User Authentication & Management

```http
POST   /signup                - Register a new user
POST   /signin                - Log in a user and receive a JWT token
GET    /user-infor            - Get user information (requires authentication)

GET    /generate-otp          - Generate OTP secret for 2FA (requires authentication)
POST   /verify-enable-otp     - Enable 2FA using OTP (requires authentication)
POST   /verify-otp            - Verify OTP during login
```
### To do Management
```http
GET    /get_all               - Retrieve all todo items (requires authentication)
POST   /add_todo              - Create a new todo item (requires authentication)
PATCH  /update_todo/{id}      - Update an existing todo item by ID (requires authentication)
DELETE /delete_todo/{id}      - Delete a todo item by ID (requires authentication)
```
