import { useState } from "react";

// This component only knows how to collect input and call onAdd.
// It doesn't know anything about the API or the list — that separation
// makes each piece easier to understand and test on its own.
export default function RequirementForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("should");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);
    try {
      await onAdd({ title, description, priority });
      // Clear the form after a successful add.
      setTitle("");
      setDescription("");
      setPriority("should");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="requirement-form" onSubmit={handleSubmit}>
      <h2>Add a requirement</h2>

      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        placeholder="e.g. User login"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        placeholder="As a [role], I want [goal], so that [reason]"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
      />

      <label htmlFor="priority">Priority</label>
      <select
        id="priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="must">Must have</option>
        <option value="should">Should have</option>
        <option value="could">Could have</option>
        <option value="wont">Won't have (this time)</option>
      </select>

      <button type="submit" disabled={submitting}>
        {submitting ? "Adding..." : "Add requirement"}
      </button>
    </form>
  );
}
