## Before you run

Create a `.env` and a `.env.development` in the root of your project.
```
// .env
HOME_URL="https://[your-github-username].github.io/[remote-repo-name]/"

// .env.development
HOME_URL="http://localhost:8080/"
```

## gh-pages

For react router to work on `gh-pages` your `env` files should look like this:
```
HOME_URL="https://myusername.github.io/my-cool-repo/"
ROUTER_BASE_URL="/my-cool-repo"
```

## Hide your keys

Add your private keys to `.env` (for production) or `.env.development` and access them
anywhere in your code by doing `process.env.MY_API_KEY`.


## Scripts

Start the local Webpack Dev Server (usually on port `8080`):

```bash
yarn start
```

Lint all JavaScript files in the `src` folder:

```bash
yarn lint
```

Build and deploy your app to `gh-pages` branch on the GitHub repo:

```bash
yarn deploy
```
