# ChetnAI - Installation and Usage Guide

## Overview

ChetnAI is an AI-powered intellectual workspace designed to help users organize, track, and evolve their thoughts through:
- Interactive mindmaps with graph and linear modes
- Mirror mode for reflection and self-debate
- Social features for collaboration
- Gamified reward system with intellectual points (IP)

This document provides instructions for installing and running the application.

## Prerequisites

- Node.js 16.x or higher
- npm 8.x or higher

## Installation

1. Unzip the project files to your desired location
2. Navigate to the project directory in your terminal
3. Install dependencies:

```bash
npm install
```

## Running the Application

### Development Mode

To run the application in development mode with hot-reloading:

```bash
npm run dev
```

This will start the application on [http://localhost:3000](http://localhost:3000)

### Production Build

To create a production build:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

## Features

### Mirror Mode
- Contradiction detection and resolution
- AI-powered debate mode with different personas
- Timeline evolution of your thoughts

### Notes Management
- Create, edit, and organize notes
- Categorize and tag notes for easy retrieval
- Public and private note options

### Social Features
- Community feed to discover other thinkers
- User profiles with intellectual progress tracking
- Collaboration invites for joint projects
- Live chat for real-time discussions

### Rewards System
- Intellectual Points (IP) for various activities
- Badges for achievements
- Leaderboard to compare progress with others
- Goal tracking for personal development

## Project Structure

```
chetnai-nextjs/
├── app/                  # Next.js app directory
│   ├── components/       # React components
│   │   ├── auth/         # Authentication components
│   │   ├── layout/       # Layout components
│   │   ├── mindmap/      # Mindmap components
│   │   ├── mirror/       # Mirror mode components
│   │   ├── notes/        # Notes management components
│   │   ├── rewards/      # Rewards system components
│   │   ├── social/       # Social features components
│   │   └── ui/           # UI components
│   ├── lib/              # Utility libraries
│   ├── mirror/           # Mirror mode page
│   ├── notes/            # Notes management page
│   ├── rewards/          # Rewards system page
│   ├── social/           # Social features page
│   ├── utils/            # Utility functions
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout component
│   └── page.tsx          # Home page
├── public/               # Static assets
├── next.config.js        # Next.js configuration
├── package.json          # Project dependencies
├── tailwind.config.js    # Tailwind CSS configuration
└── README.md             # Project documentation
```

## Technologies Used

- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Backend**: Node.js/Express with API routes
- **Databases**: Supabase (PostgreSQL) for structured data and Neo4j for graph relationships
- **Real-time Features**: Socket.io for collaborative editing and live debates
- **AI Integration**: OpenAI API for various AI features

## Next Steps

This implementation includes all the frontend components needed for the application. To make it fully functional, you would need to:

1. Set up the backend API endpoints
2. Configure the database connections
3. Implement the AI integration
4. Deploy to a production environment

## Support

For any questions or issues, please refer to the documentation or contact the development team.
