# React Todo App

A modern, responsive React Todo application with advanced filtering, priority management, and a clean user interface.

## Features

### 🎯 Core Functionality
- **Create, Read, Update, Delete** tasks
- **Task completion** toggle with visual feedback
- **Persistent storage** using localStorage
- **Responsive design** optimized for mobile and desktop

### 🔍 Advanced Filtering
- **Search** tasks by title and description
- **Filter by status** (All, Pending, Completed)
- **Filter by priority** (High, Medium, Low)
- **Filter by category** (Work, Personal, Health, Shopping, Other)
- **Filter by date** (All, Due Today, This Week, Overdue)

### 📊 Priority Management
- **Visual priority badges** with color coding
- **Priority-based sorting**
- **Interactive priority selector**

### 🎨 UI/UX Features
- **Clean, modern design** with Tailwind CSS
- **Accessible components** with ARIA labels
- **Smooth animations** and transitions
- **Task statistics dashboard**
- **Expandable filter panel**

## Project Structure

```
src/
├── components/
│   ├── TaskCard.jsx          # Individual task display and editing
│   ├── FilterBar.jsx         # Comprehensive filtering interface
│   └── PriorityBadge.jsx     # Priority visualization components
├── pages/
│   └── Home.jsx              # Main dashboard page
├── context/
│   └── TaskContext.jsx       # Global state management
├── utils/
│   └── dateUtils.js          # Date manipulation utilities
├── App.jsx                   # Root component
├── index.js                  # Application entry point
└── index.css                 # Global styles and Tailwind setup
```

## Component Architecture

### State Management
- **React Context API** for global state
- **useReducer** for complex state logic
- **localStorage** for data persistence
- **Separation of concerns** between UI and business logic

### Component Hierarchy
```
App
└── TaskProvider (Context)
    └── Home
        ├── FilterBar
        │   ├── PriorityFilter
        │   └── Search/Sort controls
        └── TaskCard[]
            └── PriorityBadge
```

## Getting Started

### Prerequisites
- Node.js 14+ 
- npm or yarn

### Installation

1. Clone the repository or extract the files
2. Navigate to the project directory
3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production
```bash
npm run build
```

## Key Features Explained

### 1. Task Management
- **Create tasks** with title, description, priority, due date, and category
- **Edit existing tasks** with inline editing
- **Mark tasks as complete** with checkbox interaction
- **Delete tasks** with confirmation dialog

### 2. Filtering System
- **Multi-criteria filtering** that works together
- **Real-time search** across title and description
- **Active filter indicators** with counts
- **Quick filter reset** functionality

### 3. Priority System
- **Three priority levels**: High (🔴), Medium (🟡), Low (🟢)
- **Visual priority badges** with consistent color coding
- **Priority-based sorting** and filtering
- **Interactive priority selection**

### 4. Date Management
- **Smart date formatting** (Today, Tomorrow, relative dates)
- **Overdue task highlighting**
- **Date range filtering**
- **Due date sorting**

### 5. Responsive Design
- **Mobile-first approach**
- **Flexible grid layouts**
- **Touch-friendly interactions**
- **Consistent spacing and typography**

## Accessibility Features

- **Semantic HTML** elements
- **ARIA labels** and descriptions
- **Keyboard navigation** support
- **Screen reader** friendly
- **High contrast** color schemes
- **Focus indicators** for all interactive elements

## Technologies Used

- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Context API** - State management
- **Local Storage** - Data persistence
- **ESLint** - Code quality
- **Modern ES6+** - JavaScript features

## Code Quality

### Best Practices Implemented
- **Modular components** with single responsibility
- **Custom hooks** for reusable logic
- **Prop validation** and documentation
- **Consistent naming** conventions
- **Error handling** and user feedback
- **Performance optimizations** with useMemo

### File Organization
- **Feature-based** component structure
- **Utility functions** separated
- **Consistent imports** and exports
- **Clear component documentation**

## Future Enhancements

Potential features for future versions:
- **Task categories** management
- **Recurring tasks** support
- **Task attachments** and notes
- **Team collaboration** features
- **Export/import** functionality
- **Dark mode** theme
- **Keyboard shortcuts**
- **Drag and drop** reordering

## License

This project is open source and available under the MIT License.
