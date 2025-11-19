# 🚀 TinyLink – Modern URL Shortener

## A minimal, fast, and analytics-enabled URL shortener built using Next.js (App Router), PostgreSQL (Neon), and Drizzle ORM.
Create short links, track clicks, view statistics, and manage your links from a clean dashboard.

### ✨ Features

* 🔗 URL Shortening

* Create short URLs with auto-generated or custom codes

* Instant response with validation

* Prevents duplicate codes

### 🔄 Redirection

* Smart 302 redirect from /:code

* Updates click count

* Updates lastClickedAt timestamp

### 📊 Analytics Page

* Total clicks

* Last clicked time

* Original target URL

* Created date

* Full short link preview

### 📋 Dashboard

* View all links in a table

* Copy short link

* Delete link

* Stats page per link

## 💻 Full Stack

* Next.js API Routes for backend

* Next.js App Pages for frontend

* Drizzle ORM schema + migration

* Neon PostgreSQL cloud database

## 🛠 Tech Stack
### Frontend

* ⚛️ Next.js (App Router)

* 🎨 TailwindCSS

* 🌼 DaisyUI

* 📦 PrimeReact (UI form components)

* 🔥 react-hot-toast (notifications)

* ✨ TypeScript

### Backend

* 🐘 PostgreSQL (Neon Database)

* 🟦 Drizzle ORM

* 🔗 Next.js Route Handlers

* 📑 Schema-based migrations

⚙️ Environment Variables

## Create a .env.local file:

``` 
DATABASE_URL="your-neon-connection-string"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```


## 💡 Use your Vercel domain in production:

``` 
NEXT_PUBLIC_BASE_URL="https://yourapp.vercel.app"
```

