import { useState } from "react";
import wheel from "../assets/wheel.png";

export default function Reservation(){

const seats = Array.from({ length: 40 }, (_, i) => i + 1)

const lowerDeck = seats.slice(0,20)
const upperDeck = seats.slice(20,40)

const [selectedSeat,setSelectedSeat] = useState(null)

const [name,setName] = useState("")
const [email,setEmail] = useState("")
const [age,setAge] = useState("")
const [gender,setGender] = useState("")

const bookedSeats =
JSON.parse(localStorage.getItem("tickets")) || []

const bookSeat = () => {

let tickets =
JSON.parse(localStorage.getItem("tickets")) || []

const seatTaken = tickets.some(
ticket => ticket.seat === selectedSeat
)

if(seatTaken){
alert("Seat already booked")
return
}

if(age < 1 || age > 100){
alert("Age must be between 1 and 100")
return
}

const booking = {
seat:selectedSeat,
name,
email,
age,
gender,
date:new Date().toLocaleDateString()
}

tickets.push(booking)

localStorage.setItem("tickets",JSON.stringify(tickets))

alert("Seat booked successfully!")

setSelectedSeat(null)
setName("")
setEmail("")
setAge("")
setGender("")
}

const renderSeat = (seat) => {

const isBooked = bookedSeats.some(
ticket => ticket.seat === seat
)

return(

<div key={seat} className="seat-wrapper">

<button
className={`seat 
${isBooked ? "sold" : ""} 
${selectedSeat===seat ? "selected" : ""}`}

disabled={isBooked}
onClick={()=>setSelectedSeat(seat)}
>

<div className="seat-pill"></div>

</button>

<div className="price">
{isBooked ? "Sold" : `₹${seat%2===0?1160:1410}`}
</div>

</div>

)

}

const renderDeck = (deckSeats) => {

let layout = []

for(let i=0;i<deckSeats.length;i+=3){

layout.push(renderSeat(deckSeats[i]))

layout.push(<div key={"aisle"+i}></div>)

layout.push(renderSeat(deckSeats[i+1]))

layout.push(renderSeat(deckSeats[i+2]))

}

return layout

}

return(

<div>

<div className="bus-container">

<div className="deck">

<div className="deck-header">
<h3>Lower deck</h3>
<img src={wheel} className="wheel"/>
</div>

<div className="seat-grid">
{renderDeck(lowerDeck)}
</div>

</div>


<div className="deck">

<h3>Upper deck</h3>

<div className="seat-grid">
{renderDeck(upperDeck)}
</div>

</div>

</div>


{selectedSeat && (

<div className="passenger-form">

<h3>Passenger Details (Seat {selectedSeat})</h3>

<input
placeholder="Full Name"
value={name}
onChange={(e)=>setName(e.target.value)}
required
/>

<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
required
/>

<input
type="number"
placeholder="Age"
min="1"
max="100"
value={age}
onChange={(e)=>setAge(e.target.value)}
required
/>

<select
value={gender}
onChange={(e)=>setGender(e.target.value)}
required
>

<option value="">Select Gender</option>
<option value="Male">Male</option>
<option value="Female">Female</option>

</select>

<button onClick={bookSeat}>
Confirm Booking
</button>

</div>

)}

</div>

)

}