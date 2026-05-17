# SpendWise - Smart Expense Tracker

SpendWise is a full stack expense tracker web application. It helps users manage income, expenses, balance, monthly budget, and spending categories in one simple dashboard.

## Features

- User registration
- User login
- JWT authentication
- Protected routes
- Add income
- Add expense
- View dashboard summary
- View all transactions
- Delete income records
- Delete expense records
- Monthly budget tracking
- Remaining budget calculation
- Income vs expense chart
- Category-wise expense chart
- Responsive design for mobile and desktop

## Technologies Used

### Frontend

- React.js
- Vite
- React Router DOM
- Axios
- Recharts
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- dotenv
- CORS

## Project Structure

```text
spendwise-expense-tracker
|
|-- backend
|   |-- controllers
|   |-- middleware
|   |-- models
|   |-- routes
|   |-- .env
|   |-- package.json
|   |-- server.js
|
|-- frontend
|   |-- src
|   |   |-- api
|   |   |-- components
|   |   |-- pages
|   |   |-- App.jsx
|   |   |-- index.css
|   |-- package.json
|   |-- vite.config.js
|
|-- README.md
````

## Backend Setup

Go to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run backend server:

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

## Frontend Setup

Go to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run frontend server:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

## API Routes

### Auth Routes

| Method | Route                | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user          |

### Income Routes

| Method | Route             | Description            |
| ------ | ----------------- | ---------------------- |
| POST   | `/api/income`     | Add income             |
| GET    | `/api/income`     | Get all income records |
| DELETE | `/api/income/:id` | Delete income record   |

### Expense Routes

| Method | Route              | Description             |
| ------ | ------------------ | ----------------------- |
| POST   | `/api/expense`     | Add expense             |
| GET    | `/api/expense`     | Get all expense records |
| DELETE | `/api/expense/:id` | Delete expense record   |

### Dashboard Route

| Method | Route            | Description                                           |
| ------ | ---------------- | ----------------------------------------------------- |
| GET    | `/api/dashboard` | Get dashboard summary, recent records, and chart data |

### Budget Routes

| Method | Route                       | Description                           |
| ------ | --------------------------- | ------------------------------------- |
| POST   | `/api/budget`               | Set or update monthly budget          |
| GET    | `/api/budget?month=YYYY-MM` | Get budget summary for selected month |

## Main Pages

### Home Page

The home page introduces SpendWise and provides options to get started or login.

### Register Page

Users can create a new account by entering name, email, and password.

### Login Page

Registered users can login using email and password.

### Dashboard Page

The dashboard shows:

* Total income
* Total expense
* Balance
* Monthly budget
* This month expense
* Remaining budget
* Income vs expense chart
* Expense by category chart
* Recent income records
* Recent expense records

### Add Income Page

Users can add income details such as title, amount, category, and date.

### Add Expense Page

Users can add expense details such as title, amount, category, date, and note.

### Transactions Page

Users can view all income and expense records. Users can also delete records from this page.

### Budget Page

Users can set a monthly budget and view budget summary.

## Sample User Flow

1. Register a new account.
2. Login using email and password.
3. Add income.
4. Add expense.
5. Set monthly budget.
6. View dashboard summary.
7. View income and expense charts.
8. View all transactions.
9. Delete incorrect records if needed.
10. Logout safely.

## Security Features

* Passwords are hashed using bcryptjs.
* JWT token is used for authentication.
* Protected routes prevent unauthorized access.
* User-specific data is stored and fetched separately.
* Users can only access their own income, expense, and budget records.

## Conclusion

SpendWise is a beginner-friendly full stack project that demonstrates authentication, CRUD operations, MongoDB database usage, protected routes, charts, budget tracking, and responsive frontend design.

It is useful for learning how a real-world MERN stack application works.

````

After pasting:

```text
Ctrl + S
````

Then reply **done**.
