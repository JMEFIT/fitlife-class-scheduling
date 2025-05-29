# FitLife Health Clubs - Class Scheduling App

A mobile-responsive web application for FitLife Health Clubs that allows fitness instructors to select time slots and days they're available to teach classes, either as permanent instructors or substitutes.

## Features

- Mobile-responsive design
- Instructor availability input system (permanent and substitute)
- No login required, just name and email input
- Toggle between calendar and list views
- Admin panel with schedule management
- Settings management for available days and time slots
- Secure admin authentication
- Local data storage with IndexedDB
- Optimized for deployment on Netlify

## Class Types Supported

- BodyPump
- BodyCombat
- BodyStep
- BodyBalance
- Core
- Zumba
- Sprint
- RPM

## Purpose

This app was developed to help FitLife Health Clubs reorganize their classes when transitioning from 2 rooms to 1 room. It provides an easy way for instructors to indicate their availability and for administrators to manage the scheduling process.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone this repository
   ```
   git clone https://github.com/JMEFIT/fitlife-class-scheduling.git
   cd fitlife-class-scheduling
   ```

2. Copy the environment file example and configure it (if needed)
   ```
   cp .env.example .env
   ```

3. Install dependencies
   ```
   npm install
   ```

4. Start the development server
   ```
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser

## Admin Access

The default admin password is `fitlife123`. For security reasons, you should change this password immediately after the first login through the Security tab in the Admin Panel.

## Data Storage

This application uses IndexedDB for local storage, eliminating the need for a backend server. All data is stored locally in the user's browser.

## Deployment

This app is configured for easy deployment to Netlify:

```
npm run build
netlify deploy --prod
```

## Security Features

- Secure admin password storage
- Environment variables protection with .gitignore
- No sensitive information hardcoded in the application