# AppArchive

AppArchive is a full-stack web application that helps users store, organize, and reuse application responses by tagging experiences, skills, and personal qualities across different applications.

Instead of rewriting answers from scratch, users can search and filter past responses by tagged attributes (e.g. leadership, teamwork, Python) to quickly find relevant material for new applications.

---

## Features

- Create **Application Logs** with metadata such as:
  - Application name or purpose (internship, scholarship, fellowship, etc.)
  - Date and time
  - Status (draft, submitted, accepted, rejected)
- Store multiple **questions and responses** per application
- Tag individual responses with **skills, experiences, and qualities**
- Filter responses by one or more tags
- Search across all saved responses
- Color-coded tag system for quick visual scanning
- Clean, modern UI designed for productivity and reuse

---

## Tech Stack

### Frontend
- **React** with **TypeScript**
- Component-based architecture
- State managed with React hooks
- Desktop-first responsive design

### Backend
- **Node.js** with **Express**
- RESTful API
- JSON-based request and response handling

---

## Architecture Overview

AppArchive uses a client–server architecture:

- The **React + TypeScript frontend** handles user interaction, rendering application logs, filtering by tags, and displaying responses.
- The **Express backend** exposes RESTful endpoints for managing application logs, questions, and tags.
- The frontend communicates with the backend via HTTP requests using JSON payloads.

This separation keeps the UI logic independent from data management and makes the system easy to extend.

---

## High-Level Data Model

- **ApplicationLog**
  - `id`
  - `title`
  - `createdAt`
  - `status`
  - `questions[]`

- **Question**
  - `id`
  - `prompt`
  - `response`
  - `tags[]`

- **Tag**
  - `id`
  - `name`
  - `color`

---

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

---

### Installation

Clone the repository:

```bash
git clone https://github.com/your-username/apparchive.git
cd apparchive


# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```
---

### Set Up

Start the Development Server:

```bash
#Start the backend server:
cd backend
npm run dev


#Start the frontend development server:
cd frontend
npm start


```

