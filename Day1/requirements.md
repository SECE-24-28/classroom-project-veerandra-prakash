# Day 1 – Requirement Analysis (Version 2) for Mobile Recharge Web App – MERN

## 1. Objective

To gather and clearly document all requirements for a Mobile Recharge Web Application
that will be built using the MERN stack (MongoDB, Express.js, React.js, Node.js).
This version focuses on a slightly different UI flow but the same core functionality.

## 2. Functional Requirements

### 2.1 User Management
- New users can register with name, email, mobile number, and password.
- Existing users can log in using email / mobile + password.
- Users can log out securely.
- Users can view and update basic profile details.

### 2.2 Recharge Workflow
- User enters mobile number on a dedicated "Quick Recharge" page.
- User selects operator and circle.
- User chooses Prepaid / Postpaid.
- User views list of available plans based on type (prepaid/postpaid).
- User selects a plan and sees a confirmation summary.
- User goes to a payment screen (simulated).
- After fake payment, a confirmation page is shown.

### 2.3 Plans Management
- System stores multiple plans with:
  - type (prepaid / postpaid)
  - price
  - validity
  - data benefits
  - description
- Plans can be filtered by type, price range, and validity (future MERN phase).
- Admin can add, edit, delete plans (in admin UI).

### 2.4 Recharge History
- User can see all completed recharges in a table.
- Each record shows date, mobile, operator, amount, plan type, and status.

### 2.5 Admin Features
- Admin login page (separate from user login).
- Admin dashboard with:
  - list of all users
  - list of all recharge transactions
  - plan management screen (add / edit / delete / activate / deactivate).

## 3. Non-Functional Requirements

### 3.1 Performance
- Landing / Login page should render quickly (2–3 seconds under normal network).
- API calls (when MERN backend is added) should respond within acceptable time.
- UI interactions should feel smooth and responsive.

### 3.2 Security
- All passwords must be hashed on the backend.
- Inputs must be validated on both client and server.
- Only authenticated users can access recharge and history pages.
- Only admin can access admin pages.

### 3.3 Usability
- Simple sidebar-based navigation with clear labels.
- Consistent color theme and font usage.
- Responsive design for mobiles, tablets, and desktops.
- Error messages and success messages must be user friendly.

### 3.4 Reliability & Availability
- No data loss for recharge history.
- Proper error UI when API fails in the future MERN version.

### 3.5 Maintainability & Scalability
- Clean separation of modules and components.
- Easily extendable to add new plan categories, offers, and loyalty points.
- Code commented properly for future developers.

## 4. User Roles and Actions

### 4.1 Normal User
- Register, login, logout.
- Perform mobile recharge.
- View recharge history.
- View/update profile.

### 4.2 Admin
- Login as admin.
- Manage plans (CRUD).
- View all users.
- View all recharge records.

## 5. Feature List (Summary)

- User Authentication (Signup/Login/Logout)
- Quick Recharge screen
- Operator & Circle selection
- Plan listing (prepaid/postpaid)
- Plan details view
- Payment UI (dummy)
- Recharge confirmation screen
- User dashboard with history
- Admin dashboard (users, plans, transactions)

## 6. Basic Wireframe Ideas (Text-only)

- Left sidebar navigation (Dashboard, Quick Recharge, Plans, History, Profile).
- Header showing app title and current user name.
- Content area for each active screen.
- Admin UI with similar layout but different menu items.

## 7. Navigation Flow (User)

1. User opens app → Login or Signup.
2. After login → User Dashboard (summary + quick links).
3. From dashboard → goes to Quick Recharge.
4. Enters number → chooses operator, circle, type → goes to Plan List.
5. Selects a plan → goes to Payment.
6. Completes fake payment → sees Confirmation.
7. Later can open History page from sidebar to review all recharges.

Admin navigation is similar but starts at Admin Login → Admin Dashboard.
