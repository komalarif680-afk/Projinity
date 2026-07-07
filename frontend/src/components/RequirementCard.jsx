const STATUS_LABELS = {
  backlog: "Backlog",
  in_progress: "In progress",
  done: "Done",
};

const PRIORITY_LABELS = {
  must: "Must have",
  should: "Should have",
  could: "Could have",
  wont: "Won't have",
};

export default function RequirementCard({ requirement, onStatusChange, onDelete }) {
  return (
    <div className={`requirement-card status-${requirement.status}`}>
      <div className="requirement-card-header">
        <h3>{requirement.title}</h3>
        <span className={`priority-badge priority-${requirement.priority}`}>
          {PRIORITY_LABELS[requirement.priority]}
        </span>
      </div>

      {requirement.description && <p>{requirement.description}</p>}

      <div className="requirement-card-footer">
        <select
          value={requirement.status}
          onChange={(e) => onStatusChange(requirement.id, e.target.value)}
        >
          {Object.entries(STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <button
          className="delete-button"
          onClick={() => onDelete(requirement.id)}
          aria-label={`Delete ${requirement.title}`}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
