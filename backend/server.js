// Projinity backend
// A small REST API for managing "requirements" (the core object in the
// requirements inbox / user story feature from the Projinity feature list).
//
// Data is stored in memory (a plain JavaScript array) for now, so it will
// reset every time you restart the server. That's fine for a first version —
// swapping this for a real database later won't change how the frontend
// talks to the API at all.

import express from "express";
import cors from "cors";

const app = express();
const PORT = 4000;

// Let the React app (running on a different port) call this API.
app.use(cors());
// Parse incoming JSON request bodies into req.body.
app.use(express.json());

// --- In-memory "database" ---
let requirements = [
  {
    id: 1,
    title: "User login",
    description: "As a user, I want to log in with my email and password so I can access my projects.",
    priority: "must",
    status: "backlog",
    createdAt: new Date().toISOString(),
  },
];
let nextId = 2;

// --- Routes ---

// GET /api/requirements — list everything
app.get("/api/requirements", (req, res) => {
  res.json(requirements);
});

// POST /api/requirements — create a new requirement
app.post("/api/requirements", (req, res) => {
  const { title, description, priority } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newRequirement = {
    id: nextId++,
    title: title.trim(),
    description: description ? description.trim() : "",
    priority: priority || "should",
    status: "backlog",
    createdAt: new Date().toISOString(),
  };

  requirements.push(newRequirement);
  res.status(201).json(newRequirement);
});

// PATCH /api/requirements/:id — update a requirement's status
app.patch("/api/requirements/:id", (req, res) => {
  const id = Number(req.params.id);
  const requirement = requirements.find((r) => r.id === id);

  if (!requirement) {
    return res.status(404).json({ error: "Requirement not found" });
  }

  const { status } = req.body;
  if (status) {
    requirement.status = status;
  }

  res.json(requirement);
});

// DELETE /api/requirements/:id — remove a requirement
app.delete("/api/requirements/:id", (req, res) => {
  const id = Number(req.params.id);
  requirements = requirements.filter((r) => r.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Projinity backend running at http://localhost:${PORT}`);
});
