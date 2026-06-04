import { useState } from "react";

function LeadTable({leads, deleteLead, editLead}) {

  return (
    <div>
      <h2>Lead List</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  {leads.map((lead) => (
    <tr key={lead._id}>
      <td>{lead.name}</td>
      <td>{lead.email}</td>
      <td>{lead.phone}</td>
      <td>{lead.company}</td>
      <td>{lead.status || "new"}</td>
      <td>
         <button onClick={() => editLead(lead)}> Edit </button>
        <button onClick={() => deleteLead(lead._id)}> Delete </button>
      </td>
    </tr>
  ))}
</tbody>
        
      </table>
    </div>
  );
}

export default LeadTable;