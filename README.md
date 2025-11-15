# HealthyMeAI
## Setup and Development

### Installation
To use and develop for this project, you first need to install the necessary libraries used in the project.

**Pre-installation requirements:**

A computer with Node version >= `18.x` installed.

**Installation steps:**

**Step 1:** In the root directory of the repo, install the libraries listed in the `package.json` file using the following command:

Using pnpm

```shell
pnpm install
```

**Step 2:** This repo is used Google Gemini API Key so you need to Copy the `.env.expamle` file to a new `.env` file in the root directory.

**Step 3:** Get your API key from: https://aistudio.google.com/apikey then paste into `.env` file 

**Step 4:** Once the installation is complete, use the command `pnpm run dev` to run all the modules in the repo.
