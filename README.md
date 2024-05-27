
# Mobile1st - Ecommerce website

This e-commerce project is developed for the assignment that given in the web services and server technologies (practical) - IT2234(P) subject in the University of Vavuniya.


# 🚨 Read before...
If you want to run the project, You need to follow the following instructions.

## Frontend

1. Open the folder in the integerated terminal.
2. Type the following command in terminal and press enter,
```bash
npm install
```
3. Create a env file inside the root directory (.env)
4. Open the .env file and declare following environmental variables inside the file and save it,
- PORT=*port number to run the frontend*
- REACT_APP_SIGNUP_URL=http://localhost: *your backend port number* /signup
- REACT_APP_LOGIN_URL=http://localhost: *your backend port number* /login
- REACT_APP_ALL_PRODUCT_URL=http://localhost: *your backend port number* /allproducts
- REACT_APP_NEW_URL=http://localhost: *your backend port number* /new
- REACT_APP_ADDTOCART_URL=http://localhost: *your backend port number* /addtocart
- REACT_APP_REMOVEFROMCART_URL=http://localhost: *your backend port number* /removefromcart
- REACT_APP_GETCART_URL=http://localhost: *your backend port number* /getcart
5. Type the following command in the terminal to run the frontend,
```bash
npm start
```

## Backend

1. Open the folder in the integerated terminal.
2. Type the following command in terminal and press enter,
```bash
npm install
```
3. Create a env file inside the root directory (.env)
4. Open the .env file and declare following environmental variables inside the file and save it,
- PORT=*port number to run the backend*
- DB_URL=*your mongodb database connection url*
- JWT_SECRET_KEY=*define your own secret key for the jwt*
5. Type the following command in the terminal to run the backend,
```bash
npm start
```

## Admin

1. Open the folder in the integerated terminal.
2. Type the following command in terminal and press enter,
```bash
npm install
```
3. Create a env file inside the root directory (.env)
4. Open the .env file and declare following environmental variables inside the file and save it,
- VITE_PORT=*port number to run the admin frontend*
- VITE_UPLOAD_API_URL=http://localhost: *your backend port number* /upload
- VITE_ADD_PRODUCT_API_URL=http://localhost: *your backend port number* /addproduct
- VITE_ALL_PRODUCT_API_URL=http://localhost: *your backend port number* /allproducts
- VITE_REMOVE_PRODUCT_API_URL=http://localhost: *your backend port number* /removeproduct
5. Type the following command in the terminal to run the admin panel,
```bash
npm run dev
```
## Tech Stack

**Client:** Reactjs, css

**Admin:** Vitejs, css

**Backend:** Node, Express

