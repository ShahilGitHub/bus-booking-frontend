import { useEffect, useState } from "react";

export default function Dashboard(){

const [tickets,setTickets] = useState([])
const [editIndex,setEditIndex] = useState(null)
const [editData,setEditData] = useState({})

useEffect(()=>{

const data = JSON.parse(localStorage.getItem("tickets")) || []

setTickets(data)

},[])

const deleteTicket = (index) => {

let updated = [...tickets]

updated.splice(index,1)

localStorage.setItem("tickets",JSON.stringify(updated))

setTickets(updated)

}

const openEditModal = (index) => {

setEditIndex(index)
setEditData(tickets[index])

}

const closeModal = () => {

setEditIndex(null)

}

const saveEdit = () => {

let updated = [...tickets]

updated[editIndex] = editData

localStorage.setItem("tickets",JSON.stringify(updated))

setTickets(updated)

setEditIndex(null)

}

return(

<div className="dashboard-container">

<div className="dashboard-card">

<h2>Passengers Dashboard</h2>

<table className="dashboard-table">

<thead>

<tr>
<th>Name</th>
<th>Email</th>
<th>Age</th>
<th>Gender</th>
<th>Seat</th>
<th>Date</th>
<th>Action</th>
</tr>

</thead>

<tbody>

{tickets.length === 0 ? (

<tr>
<td colSpan="7" className="no-bookings">
No bookings yet
</td>
</tr>

) : (

tickets.map((ticket,index)=>(

<tr key={index}>

<td>{ticket.name}</td>
<td>{ticket.email}</td>
<td>{ticket.age}</td>
<td>{ticket.gender}</td>
<td>{ticket.seat}</td>
<td>{ticket.date}</td>

<td>

<button
className="edit-btn"
onClick={()=>openEditModal(index)}
>
Edit
</button>

<button
className="delete-btn"
onClick={()=>deleteTicket(index)}
>
Delete
</button>

</td>

</tr>

))

)}

</tbody>

</table>

</div>


{/* EDIT MODAL */}

{editIndex !== null && (

<div className="modal-overlay">

<div className="modal">

<h3>Edit Passenger</h3>

<input
value={editData.name}
onChange={(e)=>setEditData({...editData,name:e.target.value})}
/>

<input
value={editData.email}
onChange={(e)=>setEditData({...editData,email:e.target.value})}
/>

<input
type="number"
value={editData.age}
onChange={(e)=>setEditData({...editData,age:e.target.value})}
/>

<select
value={editData.gender}
onChange={(e)=>setEditData({...editData,gender:e.target.value})}
>

<option>Male</option>
<option>Female</option>

</select>

<div className="modal-buttons">

<button className="save-btn" onClick={saveEdit}>
Save
</button>

<button className="cancel-btn" onClick={closeModal}>
Cancel
</button>

</div>

</div>

</div>

)}

</div>

)

}