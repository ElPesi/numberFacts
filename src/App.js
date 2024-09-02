import './App.css';
import { useState } from 'react';

function App() {

  const [number, setNumber] = useState(0);
  const [dato, setDato] = useState("");
  const [dateFact, setDateFact] = useState("");
  const [yearFact, setYearFact] = useState("");
  const [date, setDate] = useState({
    day: 0,
    month: 0,
    year: 0
  })

  const getNumber = () => {
    fetch(`http://numbersapi.com/${number}/math?json`)
    .then((response)=> response.json())
    .then((data)=>  setDato(data.text))
    .catch((error)=> console.log(error))
  }
  const getDate = () => {
    
    fetch(`http://numbersapi.com/${date.day}/${date.month}/date?json`)
    .then((response)=> response.json())
    .then((data)=>  setDateFact(data.text))
    .catch((error)=> console.log(error))

    fetch(`http://numbersapi.com/${date.year}/year?json`)
    .then((response)=> response.json())
    .then((data)=>  setYearFact(data.text))
  }
  const handleNumberChange = (event) => setNumber(event.target.value)

  const handleDateChange = (event) => {
    const inputDate = event.target.value;
    const [inputYear, inputMonth, inputDay] = inputDate.split("-")
    setDate({
      day: inputDay,
      month: inputMonth,
      year: inputYear
    });
  }


  return (
    <main>

      <h1>Datos sobre números y fechas</h1>

      <section>
        <h2>Obtener un dato sobre un número</h2>
        <input type="number" onChange={handleNumberChange} />
        <button onClick={getNumber}>Enviar</button>
        <p className="result-box">{dato}</p>
      </section>

      <section>
        <h2>Obtener un dato sobre una fecha</h2>
        <input type="date" onChange={handleDateChange} />
        <button onClick={getDate}>Enviar</button>
        <h3>Dato sobre la fecha</h3>
        <p className="result-box">{dateFact}</p>
        <h3>Dato sobre el año</h3>
        <p className="result-box">{yearFact}</p>
      </section>

    </main>
  );
}

export default App;
