# Aman Verma — Developer Portfolio

A personal portfolio showcasing my web development projects, technical skills, and services for businesses.

## Overview

This portfolio features interactive project showcases, animated UI elements, 3D visual effects, and contact options for potential clients.

## Tech Stack

- **Framework:** Remix v2
- **Build Tool:** Vite
- **Language:** JavaScript (ES Modules)
- **UI:** React
- **Animations:** Framer Motion
- **3D Graphics:** Three.js and custom GLSL shaders
- **Styling:** CSS Modules and custom CSS properties
- **Deployment:** Cloudflare Pages

## Featured Projects

- **Real Estate Website:** [Live Demo](https://real-estate-business.aff030832.workers.dev/)
- **Dental Clinic Website:** [Live Demo](https://dental-clinic-mu-bice.vercel.app/)
- **3D Printing Website:** [Live Demo](https://3d-printing-demo-site.vercel.app/)
- **Salon Website:** [Live Demo](https://smileluxurysalon.aff030832.workers.dev/)
- **Cleaning Services Website:** [Live Demo](https://freshnest-cleaning-demo.aff030832.workers.dev/)

## Getting Started

### Prerequisites

- Node.js compatible with the project
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/amanverma1807/portfolio.git
cd portfolio
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

## Environment Variables

Some features may require environment variables depending on your deployment configuration.

For the contact form and session management, check the application's implementation and configure the required Cloudflare environment variables, such as:

- `SESSION_SECRET`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `EMAIL`
- `FROM_EMAIL`

Never commit real credentials or secrets to the repository.

## Deployment

This project is configured for Cloudflare Pages. Review the existing `wrangler` configuration and deployment script before deploying.

## Credits & License

This portfolio is adapted from the original portfolio by Hamish Williams.

The original MIT license and applicable attribution notices are retained. Original third-party project work is not presented as my own.

---

Built by **Aman Verma**.
