// All communication with the backend lives in this one file. Every
// component below imports these functions instead of calling fetch()
// directly — that way, if the API changes later, you only update it here.

const API_URL = "http://localhost:4000/api/requirements";

export async function getRequirements() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to load requirements");
  return res.json();
}

export async function createRequirement(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create requirement");
  return res.json();
}

export async function updateRequirementStatus(id, status) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error("Failed to update requirement");
  return res.json();
}

export async function deleteRequirement(id) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete requirement");
}
