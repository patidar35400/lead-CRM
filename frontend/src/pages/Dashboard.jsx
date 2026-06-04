import { useState , useEffect } from "react";
import LeadForm from "../components/LeadForm";
import SearchBar from "../components/SearchBar";
import LeadTable from "../components/LeadTable";
import axios from "axios";

function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingLead, setEditingLead] = useState(null);
  const [showModal, setShowModal] = useState(false);



  const modalStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

const modalBox = {
  background: "#fff",
  padding: "25px",
  borderRadius: "12px",
  width: "320px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
};

const inputStyle = {
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const updateBtn = {
  background: "green",
  color: "white",
  padding: "8px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};

const cancelBtn = {
  background: "red",
  color: "white",
  padding: "8px",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer"
};


  const addLead = (newLead) => {
    setLeads([...leads, newLead]);
  };
  const fetchLeads = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/leads");
    setLeads(res.data);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchLeads();
}, []);

  const deleteLead = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/leads/${id}`);

    setLeads(leads.filter((lead) => lead._id !== id));

  } catch (error) {
    console.log("Delete error:", error);
  }
};
  const editLead = (lead) => {
  setEditingLead(lead);
  setShowModal(true);
  }; 

  
 const updateLead = async (updatedLead) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/leads/${updatedLead._id}`,
      updatedLead
    );

    setLeads(
      leads.map((lead) =>
        lead._id === updatedLead._id ? res.data : lead
      )
    );

    setEditingLead(null);
    setShowModal(false); // modal close bhi hoga
  } catch (error) {
    console.log("Update error:", error);
  }
};
   const filteredLeads = leads.filter((lead) =>
  lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  lead.company.toLowerCase().includes(searchTerm.toLowerCase())

);

  return (
    <div>
      <h1>Lead Management CRM</h1>

      <LeadForm addLead={addLead} editingLead={editingLead} updateLead={updateLead}  />

      <hr />

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <hr />

    <LeadTable leads={filteredLeads} deleteLead={deleteLead} editLead={editLead}/>

     {showModal && editingLead && (
  <div style={modalStyle}>
    <div style={modalBox}>
      <h2>Edit Lead</h2>

      <input
        value={editingLead.name}
        onChange={(e) =>
          setEditingLead({ ...editingLead, name: e.target.value })
        }
        placeholder="Name"
      />

      <input
        value={editingLead.email}
        onChange={(e) =>
          setEditingLead({ ...editingLead, email: e.target.value })
        }
        placeholder="Email"
      />

      <input
        value={editingLead.phone}
        onChange={(e) =>
          setEditingLead({ ...editingLead, phone: e.target.value })
        }
        placeholder="Phone"
      />

      <input
        value={editingLead.company}
        onChange={(e) =>
          setEditingLead({ ...editingLead, company: e.target.value })
        }
        placeholder="Company"
      />

      <button onClick={() => updateLead(editingLead)}>
        Update
      </button>

      <button onClick={() => setShowModal(false)}>
        Cancel
      </button>
    </div>
  </div>
)}

    </div>
  );
}

export default Dashboard;