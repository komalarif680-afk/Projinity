# Projinity — starter project

This is a working first slice of Projinity: a **requirements inbox**. You can
add a requirement, see it in a list, change its status (backlog → in progress
→ done), and delete it. It's small on purpose — the goal is to get one thing
fully working end to end before adding more features.

## How it's built

- **backend/** — a Node.js + Express server. It stores requirements in memory
  and exposes a REST API (`GET`, `POST`, `PATCH`, `DELETE` at
  `/api/requirements`).
- **frontend/** — a React app (built with Vite) that calls that API and
  renders the UI.

They're two separate programs that talk to each other over HTTP — this is
the same basic shape as almost every real web app (a frontend, a backend,
and an API between them).

## 1. Install prerequisites

You need **Node.js** (which includes `npm`). If you don't have it:

1. Go to https://nodejs.org
2. Download and install the **LTS** version
3. Confirm it worked by opening a terminal in VS Code (`` Ctrl+` `` or
   `` Cmd+` ``) and running:
   ```
   node -v
   npm -v
   ```
   Both should print a version number.

## 2. Run the backend

Open a terminal in VS Code, then:

```
cd backend
npm install
npm start
```

You should see:
```
Projinity backend running at http://localhost:4000
```

Leave this terminal running.

## 3. Run the frontend

Open a **second** terminal (don't close the first one):

```
cd frontend
npm install
npm run dev
```

Vite will print a local URL, usually `http://localhost:5173`. Open that in
your browser — you should see the Projinity app with one example
requirement already in it.

## 4. Try it out

- Add a requirement using the form
- Change its status using the dropdown
- Delete it
- Refresh the page — since data is only stored in memory, restarting the
  **backend** will reset it back to the one example requirement. That's
  expected for now; a real database comes later.

## Project structure

```
projinity/
  backend/
    server.js        <- Express API and in-memory data
    package.json
  frontend/
    src/
      App.jsx         <- top-level component, holds the requirements state
      api.js          <- all fetch() calls to the backend live here
      components/
        RequirementForm.jsx
        RequirementList.jsx
        RequirementCard.jsx
    package.json
```

## Putting this on GitHub

1. Create a new repository on GitHub (don't initialize it with a README —
   you already have one).
2. In the terminal, from the `projinity` folder:
   ```
   git init
   git add .
   git commit -m "Initial working slice: requirements inbox"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
3. Add a `.gitignore` (included) so `node_modules` folders aren't committed.

## Suggested next steps

Looking back at the feature list, good next additions in order:
1. Persist data to a file or a real database (so it survives a restart)
2. Add a "task" model and link tasks to requirements (this becomes your
   traceability matrix)
3. Add basic authentication (sign up / log in)
4. Add a dashboard view summarizing everything

Each of these can be built and understood on its own — ask me for any of
them whenever you're ready.
