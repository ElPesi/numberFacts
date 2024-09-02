import './App.css';
import { useState } from 'react';

function App() {
  const [number, setNumber] = useState(0);
  const [date, setDate] = useState({
    day: 0,
    month: 0,
    year: 0
  });

  const handleNumberChange = (event) => setNumber(event.target.value);

  const handleDateChange = (event) => {
    const inputDate = event.target.value;
    const [inputYear, inputMonth, inputDay] = inputDate.split("-");
    setDate({
      day: inputDay,
      month: inputMonth,
      year: inputYear
    });
  };

  const fetchNumberFact = async () => {
    const response = await fetch(`http://numbersapi.com/${number}?json`);
    const data = await response.json();
    document.querySelector('.result-box').textContent = data.text;
  };

  const fetchDateFact = async () => {
    const { day, month, year } = date;

    const responseDate = await fetch(`http://numbersapi.com/${month}/${day}/date?json`);
    const dataDate = await responseDate.json();
    document.querySelectorAll('.result-box')[1].textContent = dataDate.text;

    const responseYear = await fetch(`http://numbersapi.com/${year}/year?json`);
    const dataYear = await responseYear.json();
    document.querySelectorAll('.result-box')[2].textContent = dataYear.text;
  };

  return (
    <main>
      <h1>Datos sobre números y fechas</h1>

      <section>
        <h2>Obtener un dato sobre un número</h2>
        <input type="number" onChange={handleNumberChange} />
        <button onClick={fetchNumberFact}>Enviar</button>
        <p className="result-box"></p>
      </section>

      <section>
        <h2>Obtener un dato sobre una fecha</h2>
        <input type="date" onChange={handleDateChange} />
        <button onClick={fetchDateFact}>Enviar</button>
        <h3>Dato sobre la fecha</h3>
        <p className="result-box"></p>
        <h3>Dato sobre el año</h3>
        <p className="result-box"></p>
      </section>
    </main>
  );
}

export default App;
