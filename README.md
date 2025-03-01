# Next.js Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Tech Stack
- **Next.js v15**
- **React.js v19**
- **Tailwind CSS v4**
- **TypeScript**
- **SASS**

## Features Covered
- Display JSON data in a table
- Add new entries
- Form field validation
  - email validation (include @)
  - check if user existed
  - input required
- Data submission to "backend"
- Toggle between light and dark mode
- Usage of Google Places API (To suggest location)
- Responsive design for multiple screen sizes:
  - **Mobile:** 320px - 480px
  - **Tablet:** 481px - 768px
  - **Desktops** 1025px+
- Tested npm run build and npm run start (works)

### Clone the Repository
```bash
git clone <repository-url>
cd <project-folder>
```

### Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### Run the Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Deployment (WIP)
Currently, the web application consists of only the frontend.

### AWS Deployment Plan
- The frontend will be deployed on **Amazon S3**.
- If a backend is introduced, it will be deployed on **Amazon EC2**.

More deployment strategies will be considered in the future.

