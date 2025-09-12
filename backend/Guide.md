# Create table

    Go to migartion folder
    cmd > npm run make table (user_table)
    Copy content of the 'template' file
    Edit nalang tabi

# Create stored procedures

    Go to procedures folder
    Create File (using table name) eg. table_name_procedures.js
    Copy content of the 'latest' file
    Edit nalang tabi

# Create controller

    Go to controller folder
    Create File (using table name) eg. TableNameController.js
    Copy content of the 'latest' file
    Edit nalang tabi

# Create routes

    Go to routes folder
    Create File (using table name) eg. TableNameRoutes.js
    Copy content of the 'latest' file
    Edit nalang tabi

# Index.js file

    Go to index.js file
    import user from "./routes/table_name.js";
    const routes = [{ path: "/api/user", handler: user },{ path: "/api/user", handler: user }];

# Last step

    Open Xampp - Apache & Mysql
    npm run latest - For creating new table in database
    npm run dev

# Testing

    Go to postman
    Copy http://localhost:4000/api/(table name)/(routes)

# Frontend

    go to visual studio code
    npm install axios
    Set up Script
