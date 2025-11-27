# Front-End React App Rewrite Plan

## Information Gathered
- Current app: Hotel booking React app using Vite, React Router.
- Pages: Home, Login, Register, Rooms, Booking, Feedback, AdminDashboard.
- Components: Navbar, RoomCard.
- Functionality: User auth (login/register), view rooms, book rooms, feedback, admin dashboard.
- Uses localStorage for tokens, API calls to backend.
- Basic styling with CSS.

## Plan
- Rewrite all components and pages using modern React practices (functional components, hooks).
- Add global auth context for state management.
- Implement loading states and better error handling.
- Enhance UI with improved styling and responsiveness.
- Add form validation and user feedback.
- Keep same API integrations.

## Dependent Files to be edited
- src/App.jsx: Update routing and add context providers.
- src/main.jsx: Keep as entry point.
- src/pages/Home.jsx: Modernize welcome page.
- src/pages/Login.jsx: Add validation, loading, better UI.
- src/pages/Register.jsx: Similar to Login.
- src/pages/Rooms.jsx: Add loading, error states.
- src/pages/Booking.jsx: Rewrite booking form.
- src/pages/Feedback.jsx: Rewrite feedback form.
- src/pages/AdminDashboard.jsx: Rewrite admin features.
- src/components/Navbar.jsx: Update with auth state.
- src/components/RoomCard.jsx: Improve design.
- src/styles/main.css: Enhance styles.
- Add new files: src/context/AuthContext.jsx for auth state.

## Followup steps
- Test all pages and functionality.
- Ensure API calls work.
- Check responsiveness.
