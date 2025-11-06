# Albonyan AlMarsous – Frontend

## 🌍 About the Project

**Albonyan AlMarsous** is a web application that helps patients share their stories and receive emotional and financial support from others.  
Patients can write posts, create donation campaigns, and communicate with supporters.  
Supporters can view patient posts, leave comments and likes, and donate securely.

This project was built using **React (Vite)** for the frontend and **Django REST Framework** for the backend.

---

## ⚛️ Frontend Tech Stack

### 🖥️ Frontend
- React (Vite)
- JavaScript 
- React Router DOM
- Axios 
- Bootstrap
- Custom CSS 

### ⚙️ Backend
- Django REST Framework
- Python
- PostgreSQL
- JWT Authentication

### 🧰 Dev Tools
- Git & GitHub
- Docker
- Postman

---

## 💚 Frontend Routes — Supporter

| **Path** | **Page / Component** | **Description** |
|:--|:--|:--|
| `/` | `LandingPage` | Landing page with About, Features, Testimonials, Contact, Login, and Signup |
| `/login` | `Login` | Login form for supporter |
| `/signup` | `Signup` | Signup form for supporter |
| `/posts` | `AllPatientsPosts` | View all patient posts and interact (like/comment) |
| `/posts/:id/comments` | `CommentPage` | View and add comments for a post |
| `/comments/:id/edit` | `EditCommentPage` | Edit an existing comment |
| `/donations` | `DonationsPage` | View donation campaigns and donate |
| `/donations/:id/pay` | `DonationPay` | Payment page to donate to a patient |
| `/profile` | `Profile` | View and edit supporter profile |
| `/logout` | `Logout` | Logout and redirect to Landing Page |

---

## 🩺 Frontend Routes — Patient

| **Path** | **Page / Component** | **Description** |
|:--|:--|:--|
| `/login` | `Login` | Login form for patient |
| `/signup` | `Signup` | Signup form for patient |
| `/patient/posts` | `MyPosts` | View, edit, or delete own posts |
| `/patient/add-post` | `AddPost` | Create a new post |
| `/patient/edit-post/:id` | `EditPost` | Edit an existing post |
| `/patient/posts/:id/comments` | `PostComments` | View and reply to comments on a post |
| `/patient/donations` | `MyDonations` | View and manage own donation campaigns |
| `/patient/add-donation` | `AddDonation` | Create a new donation campaign |
| `/patient/edit-donation/:id` | `EditDonation` | Edit an existing donation campaign |
| `/profile` | `Profile` | View and edit patient profile |
| `/logout` | `Logout` | Logout and redirect to Landing Page |

---

## 🔗 Links

- **Backend Repository:** [Albonyan AlMarsous Backend](https://github.com/alhassan-alshareef/albonyan-almarsous-backend)

---
## Installation Instructions (Docker)

### 1️⃣ Clone both repositories inside the same parent folder
```bash
git clone https://github.com/alhassan-alshareef/albonyan-almarsous-frontend.git
git clone https://github.com/alhassan-alshareef/albonyan-almarsous-backend.git

