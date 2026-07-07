import { useEffect, useState } from "react";
import RequirementForm from "./components/RequirementForm.jsx";
import RequirementList from "./components/RequirementList.jsx";
import {
  getRequirements,
  createRequirement,
  updateRequirementStatus,
  deleteRequirement,
} from "./api.js";

export default function App() {
  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load requirements once when the app first renders.
  useEffect(() => {
    loadRequirements();
  }, []);

  async function loadRequirements() {
    try {
      setLoading(true);
      const data = await getRequirements();
      setRequirements(data);
      setError(null);
    } catch (err) {
      setError("Could not reach the backend. Is it running on port 4000?");
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd(data) {
    const newRequirement = await createRequirement(data);
    setRequirements((prev) => [...prev, newRequirement]);
  }

  async function handleStatusChange(id, status) {
    const updated = await updateRequirementStatus(id, status);
    setRequirements((prev) =>
      prev.map((r) => (r.id === id ? updated : r))
    );
  }

  async function handleDelete(id) {
    await deleteRequirement(id);
    setRequirements((prev) => prev.filter((r) => r.id !== id));
  }

  const counts = {
    backlog: requirements.filter((r) => r.status === "backlog").length,
    in_progress: requirements.filter((r) => r.status === "in_progress").length,
    done: requirements.filter((r) => r.status === "done").length,
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Projinity</h1>
        <p className="tagline">From ideas to implementation</p>
      </header>

      {error && <div className="error-banner">{error}</div>}

      <div className="summary-bar">
        <div className="summary-item">
          <span className="summary-count">{counts.backlog}</span>
          <span>Backlog</span>
        </div>
        <div className="summary-item">
          <span className="summary-count">{counts.in_progress}</span>
          <span>In progress</span>
        </div>
        <div className="summary-item">
          <span className="summary-count">{counts.done}</span>
          <span>Done</span>
        </div>
      </div>

      <main className="app-main">
        <RequirementForm onAdd={handleAdd} />

        <section>
          <h2>Requirements</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <RequirementList
              requirements={requirements}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          )}
        </section>
      </main>
    </div>
  );
}
