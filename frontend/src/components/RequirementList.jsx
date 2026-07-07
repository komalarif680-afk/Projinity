import RequirementCard from "./RequirementCard.jsx";

export default function RequirementList({ requirements, onStatusChange, onDelete }) {
  if (requirements.length === 0) {
    return <p className="empty-state">No requirements yet — add your first one above.</p>;
  }

  return (
    <div className="requirement-list">
      {requirements.map((requirement) => (
        <RequirementCard
          key={requirement.id}
          requirement={requirement}
          onStatusChange={onStatusChange}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
