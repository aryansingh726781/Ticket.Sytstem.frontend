// // import React, { useState } from 'react';
// // import api  from '../api/axios';
// // import { useNavigate } from 'react-router-dom';
// // export default function CreateTicket() {
// // const [subject, setSubject] = useState('');
// // const [description, setDescription] = useState('');
// // const [priority, setPriority] = useState('Medium');
// // const [files, setFiles] = useState([]);
// // const navigate = useNavigate();
// // const handleSubmit = async (e) => {
// // e.preventDefault();
// // const formData = new FormData();
// // formData.append('subject', subject);
// // formData.append('description', description);
// // formData.append('priority', priority);
// // Array.from(files).forEach(f => formData.append('attachments', f));
// // try {
// // await api.create(formData);
// // alert('Ticket created successfully');
// // navigate('/tickets');
// // } catch (err) {
// // alert('Error creating ticket');
// // }
// // };
// // return (
// // <div className="page">
// // <h2>Create Ticket</h2>
// // <form onSubmit={handleSubmit}>
// // <input value={subject} onChange={e => setSubject(e.target.value)}
// // placeholder="Subject" required />
// // <textarea value={description} onChange={e =>
// // setDescription(e.target.value)} placeholder="Description" />
// // <select value={priority} onChange={e => setPriority(e.target.value)}>
// // <option>Low</option>
// // <option>Medium</option>
// // <option>High</option>
// // <option>Urgent</option>

// // </select>
// // <input type="file" multiple onChange={e => setFiles(e.target.files)} />
// // <button type="submit">Submit</button>
// // </form>
// // </div>
// // );
// // }





// // src/pages/CreateTicket.js
// import React, { useState } from "react";
// import api from "../api/axios";

// export default function CreateTicket() {
//   const [form, setForm] = useState({
//     subject: "",
//     description: "",
//     priority: "Medium",
//     assignee: "",
//   });
//   const [attachments, setAttachments] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setAttachments(e.target.files);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const formData = new FormData();
//       formData.append("subject", form.subject);
//       formData.append("description", form.description);
//       formData.append("priority", form.priority);
//       if (form.assignee) formData.append("assignee", form.assignee);

//       if (attachments.length > 0) {
//         Array.from(attachments).forEach((file) => {
//           formData.append("attachments", file);
//         });
//       }

//       const res = await api.post("/tickets", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       alert("✅ Ticket created successfully!");
//       console.log("Created ticket:", res.data.ticket);

//       setForm({
//         subject: "",
//         description: "",
//         priority: "Medium",
//         assignee: "",
//       });
//       setAttachments([]);
//     } catch (err) {
//       console.error("❌ Error creating ticket:", err);
//       alert(err.response?.data?.message || "Error creating ticket");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 max-w-2xl mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Create Ticket</h2>

//       <form
//         onSubmit={handleSubmit}
//         className="space-y-4 border p-4 rounded bg-gray-50"
//       >
//         <input
//           type="text"
//           name="subject"
//           placeholder="Subject"
//           value={form.subject}
//           onChange={handleChange}
//           className="border p-2 w-full"
//           required
//         />
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={form.description}
//           onChange={handleChange}
//           className="border p-2 w-full h-24"
//         />
//         <select
//           name="priority"
//           value={form.priority}
//           onChange={handleChange}
//           className="border p-2 w-full"
//         >
//           <option value="Low">Low</option>
//           <option value="Medium">Medium</option>
//           <option value="High">High</option>
//         </select>

//         {/* Optional assignee (support/admin only, backend enforces permissions) */}
//         {/* <input
//           type="text"
//           name="assignee"
//           placeholder="Assignee User ID (optional)"
//           value={form.assignee}
//           onChange={handleChange}
//           className="border p-2 w-full"
//         /> */}

//         <input
//           type="file"
//           name="attachments"
//           multiple
//           onChange={handleFileChange}
//           className="border p-2 w-full"
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >
//           {loading ? "Creating..." : "Create Ticket"}
//         </button>
//       </form>
//     </div>
//   );
// }









import React, { useState } from "react";
import api from "../api/axios";
import "./CreateTicket.css"; // ✅ import CSS file

export default function CreateTicket() {
  const [form, setForm] = useState({
    subject: "",
    description: "",
    priority: "Medium",
    assignee: "",
  });
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setAttachments(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("subject", form.subject);
      formData.append("description", form.description);
      formData.append("priority", form.priority);
      if (form.assignee) formData.append("assignee", form.assignee);

      if (attachments.length > 0) {
        Array.from(attachments).forEach((file) => {
          formData.append("attachments", file);
        });
      }

      const res = await api.post("/tickets", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Ticket created successfully!");
      console.log("Created ticket:", res.data.ticket);

      setForm({
        subject: "",
        description: "",
        priority: "Medium",
        assignee: "",
      });
      setAttachments([]);
    } catch (err) {
      console.error("❌ Error creating ticket:", err);
      alert(err.response?.data?.message || "Error creating ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h2>Create Ticket</h2>
      <form onSubmit={handleSubmit} className="ticket-form">
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          type="file"
          name="attachments"
          multiple
          onChange={handleFileChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Ticket"}
        </button>
      </form>
    </div>
  );
}
