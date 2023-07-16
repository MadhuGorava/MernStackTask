# Invoice Management System

This project is an Invoice Management System that provides API endpoints to manage invoices and a React frontend to interact with the backend.

The system allows users to enter, update, and delete invoices based on various parameters such as invoice date, invoice number, and invoice amount. It also provides filtering capabilities to search for invoices based on financial year, invoice number, and date range.

## Technologies Used

- Backend:
  - Node.js
  - Express.js
  - SQLite

- Frontend:
  - React
  - Material-UI

## Features

- Enter new invoice details with validation based on the invoice date of previous and next invoices.
- Update a specific invoice based on the invoice number.
- Delete a specific invoice based on the invoice number.
- Get all invoices stored in the database.
- Filter invoices based on financial year, invoice number, and date range.

## Setup and Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
Navigate to the project directory:


cd mern_stack_task
Install the backend dependencies:

bash
npm install
Start the backend server:

bash

npm start
Navigate to the frontend directory:

bash
cd frontend
Install the frontend dependencies:

bash
npm install
Start the frontend application:

bash
npm start
Access the application in your browser at http://localhost:3000.

**API Endpoints**
POST /invoices: Enter new invoice details.
PUT /invoices/:invoiceNumber: Update a specific invoice based on the invoice number.
DELETE /invoices/:invoiceNumber: Delete a specific invoice based on the invoice number.
GET /invoices: Get all invoices stored in the database.
GET /invoices/filter: Filter invoices based on financial year, invoice number, and date range.
**Contributing**
Contributions are welcome! If you find any issues or want to enhance the system, feel free to open a pull request.

Please make sure to update tests as appropriate.
