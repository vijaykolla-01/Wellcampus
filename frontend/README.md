# WellCampus Frontend

A comprehensive health and wellness platform designed exclusively for college students, combining mental health support, fitness programs, and nutrition advice in one place.

## Features

🧠 **Mental Health Support**
- Stress management guides and techniques
- Anxiety support resources with CBT workbooks
- 4-7-8 breathing exercises with guided timer
- Mental health self-assessment tool
- Access to campus counseling services

💪 **Fitness Programs**
- Home workout plans (no equipment required)
- Yoga programs for students
- 7-day fitness challenge with progress tracking
- Structured workout routines for different fitness levels

🥗 **Nutrition Advice**
- Balanced diet plans
- Budget-friendly recipes
- Interactive BMI calculator
- Whey protein guide with brand recommendations
- Post-workout meal planning
- Protein intake calculator

## Tech Stack

- **Frontend Framework**: React 18.2.0
- **Build Tool**: Vite 5.1.0
- **Routing**: React Router v6.22.0
- **Styling**: CSS (with custom animations and responsive design)
- **Linting**: ESLint with React plugins

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/wellcampus.git
cd wellcampus/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file for environment variables:
```env
VITE_API_URL=http://localhost:5000
```

### Development

Run the development server:
```bash
npm run dev
```

The application will open at `http://localhost:5173`

### Building

Create a production build:
```bash
npm run build
```

The build output will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

### Linting

Check and report code quality issues:
```bash
npm run lint
```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── MentalHealthAssessment.jsx
│   └── Navbar.jsx
├── context/            # React Context for state management
│   └── AuthContext.jsx
├── pages/              # Page components
│   ├── AdminDashboard.jsx
│   ├── AdminResources.jsx
│   ├── AuthPage.jsx
│   ├── FitnessPage.jsx
│   ├── LandingPage.jsx
│   ├── MentalHealthPage.jsx
│   ├── NutritionPage.jsx
│   └── StudentDashboard.jsx
├── App.jsx            # Main app component with routing
├── main.jsx           # Entry point
└── index.css          # Global styles
```

## Routing

- `/` - Landing page (public)
- `/login` - Authentication page
- `/student/dashboard` - Student dashboard
- `/student/mental-health` - Mental health resources
- `/student/fitness` - Fitness programs
- `/student/nutrition` - Nutrition resources
- `/admin` - Admin dashboard
- `/admin/resources` - Resource management (admin only)

## Authentication

The application uses role-based access control with two roles:
- **Student**: Access to wellness resources and self-assessment tools
- **Admin**: Manage users and resources

Authentication is handled via the `AuthContext` and persisted in localStorage.

## API Integration

The frontend communicates with a backend API for:
- User authentication (login/register)
- Resource management
- User management (admin)
- Assessment data

Base API URL can be configured via the `VITE_API_URL` environment variable.

## Deployment on GitHub Pages

This project is configured for deployment on GitHub Pages:

1. Fork the repository to your GitHub account
2. Update the `base` path in `vite.config.js` if using a different repository name:
   ```javascript
   base: '/your-repo-name/'
   ```
3. Enable GitHub Pages in repository settings (Settings → Pages)
4. Select the `gh-pages` branch as the source
5. The CI/CD workflow will automatically deploy on push to main

## Environment Variables

Create a `.env.local` file in the project root:

```env
# Backend API URL
VITE_API_URL=http://localhost:5000
```

## Performance Optimizations

- Code splitting with React Router
- Asset optimization with Vite
- CSS minification
- JavaScript bundling and minification
- Lazy loading of components via routing

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## License

This project is part of a B.Tech Full Stack Application Development project.

## Contact & Support

- 📧 Email: wellness@university.edu
- 🆘 Crisis Helpline: 1800-599-0019 (24/7, Free)
- 📍 Campus Counseling: Student Services Building, Room 201

## Acknowledgments

- Built as part of B.Tech Full Stack Application Development (FSAD)
- Mental health resources curated from evidence-based sources
- UI/UX inspired by modern wellness platforms
