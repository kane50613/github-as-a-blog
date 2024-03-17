# GaaB: GitHub as a Blog

This project, developed as part of a Dcard internship assignment, aims to transform GitHub issues into blog posts for seamless content sharing and search engine optimization (SEO) improvement.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkane50613%2Fgithub-as-a-blog&env=GITHUB_CLIENT_ID,GITHUB_CLIENT_SECRET,JWT_SECRET,NEXT_PUBLIC_GITHUB_REPO_OWNER,NEXT_PUBLIC_GITHUB_REPO&demo-title=Github%20as%20a%20Blog&demo-description=Effortless%20blogging%20with%20GitHub%20issues%20and%20Next.js&demo-url=https%3A%2F%2Fgithub-as-a-blog.vercel.app%2F&demo-image=https%3A%2F%2Fgithub-as-a-blog.vercel.app%2Fcover.jpg)

## GitHub issues is good, what problem does GaaB solve?

### SEO

### User Experience

### Whitelisting

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
