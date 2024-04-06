# GaaB: GitHub as a Blog

This project, developed as part of a Dcard internship assignment, aims to transform GitHub issues into blog posts for seamless content sharing and search engine optimization (SEO) improvement.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fkane50613%2Fgithub-as-a-blog&env=GITHUB_CLIENT_ID,GITHUB_CLIENT_SECRET,JWT_SECRET,NEXT_PUBLIC_GITHUB_REPO_OWNER,NEXT_PUBLIC_GITHUB_REPO&demo-title=Github%20as%20a%20Blog&demo-description=Effortless%20blogging%20with%20GitHub%20issues%20and%20Next.js&demo-url=https%3A%2F%2Fgithub-as-a-blog.vercel.app%2F&demo-image=https%3A%2F%2Fgithub-as-a-blog.vercel.app%2Fcover.jpg)

- [What problem does GaaB solve?](#what-problem-does-gaab-solve)
- [Technical Details](#technical-details)
- [License](#license)

## What problem does GaaB solve?

GitHub issues is good, but it's still not a perfect place for blogging. GaaB aims to solve the following problems:

- [SEO](#seo)
- [User Experience](#user-experience)
- [Customization](#customization)
- [Subscription](#subscription)
- [Analytics](#analytics)
- [Security (Whitelisting)](#security-whitelisting)
- [Ownership](#ownership)
- [Performance](#performance)

### SEO

The content in GitHub issues is not indexed by search engines always, which means that the content is not discoverable and hard to gain organic traffic.

By self-hosting the content with GaaB on your own domain, it can be more professional and SEO-friendly because we use Next.js to generate server-side rendered pages with low latency.

### User Experience

GitHub issues is designed for issue tracking, with a lot of features that are not necessary for blogging. GaaB provides a clean and minimalistic interface for reading and writing blog posts.

### Customization

The website is made with Next.js and [shadcn/ui](https://ui.shadcn.com/) components, which means that you can easily customize the website by forking the repository and modifying the components.

### Subscription

GaaB provides RSS feed through `/api/rss.xml`, users can subscribe to the blog and get notified when new posts are published.

### Analytics

Tracking the performance of your blog is important. GaaB uses [Vercel Analytics](https://vercel.com/analytics) to provide insights into the traffic and performance of your blog.

You can simply enable Vercel Analytics by heading to the [Vercel dashboard](https://vercel.com/dashboard) and enabling the Analytics feature under the settings of your project.

If you want to use other analytics service like Cloudflare Web Analytics, you can easily integrate it by yourself.

### Security (Whitelisting)

Since the GitHub repository is public, anyone can create issues and comments. GaaB provides a whitelist feature to prevent spam and abuse.

By settings the `WHITELISTED_AUTHORS` environment variable in `.env`, separated by commas, only the authors in the whitelist can create issues and comments.

We also have XSS protection for the content, thanks to the [react-markdown](https://www.npmjs.com/package/react-markdown) library, which automatically escapes the HTML in the content and not using `dangerouslySetInnerHTML` directly.

### Ownership

By hosting the content on your own domain, you have full control over the page rendering.

We do not host any content, and the content is fetched from GitHub's API directly. This means that you can easily migrate to another platform without losing any content.

In the future, we may create a migration tool to help you migrate to another platform easily.

### Performance

GaaB is built with Next.js, which provides server-side rendering and static site generation out of the box.

With the help of CDN and well-optimized caching, the website can be loaded quickly and efficiently.
   
## Technical Details

- [Tech Stack](#tech-stack)
- [Infinite Scrolling Pagination](#infinite-scrolling-pagination)
- [Safe Server Actions](#safe-server-actions)
- [Local Development](#local-development)
- [Testing](#testing)

### Tech Stack

- [Next.js](https://nextjs.org/): React framework for server-side rendering and static site generation.
- [shadcn/ui](https://ui.shadcn.com/): A minimalistic UI library for building modern websites.
- [swr](https://swr.vercel.app/): React Hooks library for data fetching.
- [next-safe-action](https://www.npmjs.com/package/next-safe-action): Type safe server actions with validation, error handling, and loading states. 
- [react-intersection-observer](https://www.npmjs.com/package/react-intersection-observer): A React component for the Intersection Observer API.
- [react-markdown](https://www.npmjs.com/package/react-markdown): A markdown component for React.
- [playwright](https://playwright.dev/): Integration testing with Playwright.
- [create-t3-app](https://create.t3.gg/): The best way to start a full-stack, typesafe Next.js app.

### Infinite Scrolling Pagination

GaaB uses infinite scrolling pagination to load more issues when the user scrolls to the bottom of the page.

The infinite scrolling pagination is implemented with the Intersection Observer API and the `useSWRInfinite` hook from the SWR library.

Check out the implementation in [`src/hooks/use-infinite-data.tsx`](src/hooks/use-infinite-data.tsx).

### Safe Server Actions

GaaB uses the `next-safe-action` library to handle server actions with validation, error handling, and loading states.

When errors occur during server actions, the error message is displayed to the user with a toast notification, the [Error boundary](src/app/error.tsx) component catches the error and displays the error message.

Check out all the server actions in [`src/actions`](src/actions).

### Local Development

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

### Testing

To run the playwright tests, follow the steps below:

```bash
npx playwright install --with-deps
pnpm test
```

## License

This project is licensed under the [GPL-3.0 License](LICENSE).
