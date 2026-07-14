# 🔷 Spike Admin - CRM Dashboard

A modern, clean CRM dashboard application built with React and Vite, featuring authentication and lead management capabilities.

## ✨ Features

### 🔐 Authentication System
- **Registration Page** - Create new account with social login options
- **Login Page** - Secure login with "Remember Device" option
- **Session Management** - Persistent authentication state

### 📊 Dashboard Features
- **Sidebar Navigation** - Clean left sidebar with Dashboard, Enquiry, and Leads
- **Statistics Cards** - Quick overview of New Leads, Follow Ups, Converted, and Pending
- **Recent Activity** - Real-time view of latest customer interactions
- **User Profile** - Display user info in header

### 💬 Enquiry Management
- **Enquiry List** - Table view of all customer enquiries
- **Status Tracking** - New, Contacted, Qualified status badges
- **Quick Actions** - View and edit enquiries directly from list

### 🎯 Lead Management
- **Lead Cards** - Visual card-based layout for leads
- **Progress Tracking** - Progress bars showing lead conversion status
- **Stage Management** - Hot Lead, Warm Lead, Follow Up stages
- **Contact Actions** - Quick contact and view details buttons

## 🎨 Design System

### Colors
- **Primary Blue**: `#3b82f6` - Buttons, active states, links
- **Success Green**: `#10b981` - Converted status, success actions
- **Warning Orange**: `#f59e0b` - Pending status, warm leads
- **Danger Red**: `#ef4444` - Hot leads, urgent items
- **Purple Accent**: `#8b5cf6` - Follow up status

### Typography
- **Font Family**: Inter (Google Fonts)
- **Title**: 700-800 weight, 20-32px size
- **Body**: 400-600 weight, 14-16px size
- **Labels**: 500-600 weight, 13-14px size

### Layout
- **White Background**: Clean, professional appearance
- **Sidebar**: 260px fixed width
- **Border Radius**: 8-12px for modern feel
- **Spacing**: Consistent 16-32px padding
- **Borders**: 1px solid #e2e8f0

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Application Flow

1. **Start**: Application opens on Login page
2. **Registration**: Click "Create an account" to register
3. **Login**: Enter credentials (no validation for demo)
4. **Dashboard**: Access main dashboard with sidebar navigation
5. **Navigation**: Use sidebar to switch between Dashboard, Enquiry, and Leads
6. **Logout**: Click Logout button to return to login page

## 📁 Project Structure

```
src/
├── components/
│   ├── Login.jsx           # Login page with illustration
│   ├── Registration.jsx    # Registration page with social options
│   └── Dashboard.jsx       # Main dashboard with sidebar
├── pages/
│   ├── DashboardPage.jsx   # Dashboard content with stats
│   ├── EnquiryPage.jsx     # Enquiry list table
│   └── LeadsPage.jsx       # Lead cards grid
├── App.jsx                 # Main app with routing logic
├── main.jsx                # Application entry point
└── styles.css              # Global styles and animations
```

## 🎯 Key Features

### Authentication Flow
- **No Validation**: Static design without required fields for easy testing
- **Social Login**: Google and Facebook login buttons (UI only)
- **Remember Device**: Checkbox option on login
- **Forgot Password**: Link available (UI only)

### Dashboard Layout
- **Fixed Sidebar**: Always visible navigation
- **Header Bar**: Shows current page and user profile
- **White Background**: Clean, professional look
- **Responsive Grid**: Auto-adjusting card layouts

### Data Display
- **Stat Cards**: Border style with icons
- **Tables**: Clean borders with hover effects
- **Progress Bars**: Visual progress indicators
- **Status Badges**: Color-coded status pills
- **Avatars**: Emoji avatars with colored backgrounds

## 🎨 Design Highlights

1. **Clean White Background** - Professional appearance
2. **Subtle Borders** - Define sections without heaviness
3. **Blue Accent Color** - Consistent throughout
4. **Icon Integration** - Emojis for visual clarity
5. **Smooth Transitions** - Hover and click animations
6. **Responsive Layout** - Works on various screen sizes

## 📱 Responsive Design

- **Desktop**: Full sidebar + main content layout
- **Tablet**: Optimized card grids
- **Mobile**: Stack layout (future enhancement)

## 🔧 Customization

### Change Primary Color
Update `#3b82f6` throughout the codebase to your brand color

### Modify Sidebar Items
Edit the `menuItems` array in `Dashboard.jsx`:

```javascript
const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'enquiry', label: 'Enquiry', icon: '💬' },
  { id: 'leads', label: 'Leads', icon: '🎯' },
  // Add more items here
];
```

### Add New Pages
1. Create new page component in `src/pages/`
2. Import in `Dashboard.jsx`
3. Add to menuItems and routing logic

## 🛠️ Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **CSS-in-JS** - Inline styling for component isolation
- **Inter Font** - Modern typography

## 📝 License

This project is for demonstration purposes.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

Built with ❤️ using React and Vite
