import { useState, useEffect } from "react";

function LeadForm({addLead, editingLead, updateLead}) {
  const [lead, setLead] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "New",
    notes: "",
  });
  useEffect(() => {
  if (editingLead) {
    setLead(editingLead);
  }
}, [editingLead]);

  const handleChange = (e) => {
    setLead({
      ...lead,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = (e) => {
  e.preventDefault();

  if (editingLead) {
    updateLead(lead);   // EDIT mode
  } else {
    addLead({ ...lead, id: Date.now() }); // ADD mode
  }

  setLead({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "New",
    notes: "",
  });
  };

  return (
    <div>
      <h2>Add New Lead</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={lead.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={lead.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={lead.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={lead.company}
          onChange={handleChange}
        />

        <select
          name="status"
          value={lead.status}
          onChange={handleChange}
        >
          <option>New</option>
          <option>Contacted</option>
          <option>Qualified</option>
          <option>Converted</option>
          <option>Lost</option>
        </select>

        <textarea
          name="notes"
          placeholder="Notes"
          value={lead.notes}
          onChange={handleChange}
        />

        <button type="submit"> {editingLead ? "Update Lead" : "Add Lead"} </button>
      </form>
    </div>
  );
}

export default LeadForm;