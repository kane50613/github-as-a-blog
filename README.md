# GaaB: GitHub as a Blog

This project, developed as part of a Dcard internship assignment, aims to transform GitHub issues into blog posts for seamless content sharing and search engine optimization (SEO) improvement.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkane50613%2Fgithub-as-a-blog)

## Key Features

- Support for both Light and Dark mode.
- Latest technologies including Next.js App Router, Server Actions, Edge Runtime, and more.
- SEO-friendly architecture with server-side rendering.
- `@tailwindcss/typography` for beautiful typography.
- Cached data for improved performance.
- Sitemap generation for better SEO.

---

## How do I plan the project?

When planning the project, several key considerations come into play:

- **React Based**: Utilizing React for its robust ecosystem and component-based architecture.
- **SEO-Friendly**: Ensuring that the project is optimized for search engine visibility.
- **Readability, Consistency, and Reusability**: Prioritizing maintainability and code quality.

Considering these factors, the options under consideration were Next.js and Astro. Next.js was ultimately chosen due to its advanced features such as Server Actions, Edge Runtime, and more.

[Astro doesn't support Vercel Edge Runtime _natively_](https://vercel.com/docs/frameworks/astro#edge-functions). Without Edge Runtime, there is a risk of cold starts, which can negatively impact user experience.

As per the homework requirements, all posts are to be stored in GitHub issues, eliminating the need for a separate database. This requires the use of the GitHub API to fetch the issues dynamically.

## Technical Insights

Below are some of the technical aspects and implementation details:

### Infinite Scroll Implementation

Implementing infinite scroll was an engaging experience, and surprisingly straightforward. The [react-intersection-observer](https://www.npmjs.com/package/react-intersection-observer) package proved instrumental, providing a React hook `useInView` that wraps `IntersectionObserver`.

To ensure reusability, a [`useInfiniteData`](./src/hooks/use-infinite-data.tsx) hook was crafted to manage the logic of infinite scrolling. The hook takes in a `render` function responsible for rendering the data as ReactNode and a `loader` function generating data arrays based on page numbers (starting from 1).

The actual usage can be found in [src/app/(auth)/[owner]/[repo]/page.tsx](./src/app/(auth)/[owner]/[repo]/page.tsx).

### Authentication Mechanism

GitHub OAuth App was used for user authentication. Users can log in using their GitHub accounts and authorize the app to access their profiles and public repositories with minimal scopes (`read:user` and `public_repo`).

The authentication process is straightforward: upon clicking the "Starts now" button, users are redirected to the GitHub OAuth page. Following authorization, GitHub redirects back to the app with a code, which is then exchanged for an access token.

The token is securely stored in httpOnly cookies using [iron-session](https://www.npmjs.com/package/iron-session), which encrypts and signs the token with a secret key, ensuring its safety and preventing XSS attacks.

## Local Development

To run the project locally, follow the steps below:

1. Clone the repository:

    ```bash
    git clone git@github.com:kane50613/github-as-a-blog.git
    ```
   
2. Install the dependencies:

    ```bash
    pnpm install
    ```
   
3. Prepare the environment variables:

    ```bash
    cp .env.example .env
    ```
   
   Fill in the environment variables in `.env` with your GitHub OAuth App credentials, and a secret key for encrypting the session token.

4. Run the development server:

    ```bash
    pnpm dev
    ```
