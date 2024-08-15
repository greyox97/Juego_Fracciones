import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function DecimalesAFRacciones() {
  const [decimal, setDecimal] = useState(generateDecimal());
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    if (attempts === 10) {
      setGameOver(true);
    }
  }, [attempts]);

  useEffect(() => {
    if (!answered) {
      const decimalElement = document.getElementById('decimal-display');
      if (decimalElement) {
        decimalElement.focus();
      }
    }
  }, [decimal, answered]);

  useEffect(() => {
    if (gameOver) {
      const gameOverElement = document.getElementById('game-over-message');
      if (gameOverElement) {
        gameOverElement.focus();
      }
    }
  }, [gameOver]);

  useEffect(() => {
    const instructionsElement = document.getElementById('instructions');
    if (instructionsElement) {
      instructionsElement.focus();
    }
  }, []);

  function generateDecimal() {
    const num = (Math.random() * (0.99 - 0.1) + 0.1).toFixed(2);
    return num;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const correctAnswer = convertDecimalToFraction(decimal);

    if (inputValue.trim() === correctAnswer) {
      setFeedback(`¡Correcto! ${decimal} es equivalente a ${correctAnswer}.`);
      setScore(score + 1);
    } else {
      setFeedback(`Incorrecto. ${decimal} es equivalente a ${correctAnswer}.`);
    }

    setAnswered(true);
    setAttempts(attempts + 1);

    const feedbackElement = document.getElementById('feedback');
    if (feedbackElement) {
      feedbackElement.focus();
    }
  }

  function handleNextQuestion() {
    setDecimal(generateDecimal());
    setInputValue('');
    setFeedback('');
    setAnswered(false);

    const instructionsElement = document.getElementById('instructions');
    if (instructionsElement) {
      instructionsElement.focus();
    }
  }

  function handleRetry() {
    setDecimal(generateDecimal());
    setInputValue('');
    setFeedback('');
    setAttempts(0);
    setScore(0);
    setGameOver(false);
    setAnswered(false);

    const instructionsElement = document.getElementById('instructions');
    if (instructionsElement) {
      instructionsElement.focus();
    }
  }

  function convertDecimalToFraction(decimal) {
    let [numerator, denominator] = decimal.split('.');
    denominator = Math.pow(10, denominator.length);
    numerator = parseInt(numerator) * denominator + parseInt(decimal.split('.')[1]);

    const gcd = (a, b) => b ? gcd(b, a % b) : a;
    const commonDivisor = gcd(numerator, denominator);

    return `${numerator / commonDivisor}/${denominator / commonDivisor}`;
  }

  if (gameOver) {
    return (
      <div>
        <h2 id="game-over-message" tabIndex="0">Juego Terminado</h2>
        <p tabIndex="0">Tu puntaje final es: {score} de 10.</p>
        <button onClick={handleRetry} tabIndex="0">
          Reintentar
        </button>
        <Link to="/" tabIndex="0" className="menu-item">
          Volver al Menú
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 tabIndex="0">Decimales a Fracciones</h2>
      <p id="instructions" tabIndex="0">Convierte el siguiente decimal a una fracción:</p>
      <p id="decimal-display" tabIndex="0" aria-live="assertive"><strong>{decimal}</strong></p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="fractionInput">Fracción:</label>
        <input
          type="text"
          id="fractionInput"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ejemplo: 1/2"
          aria-labelledby="fractionInput"
          disabled={answered}
        />
        <button type="submit" disabled={answered}>Enviar</button>
      </form>

      <p id="feedback" tabIndex="-1" aria-live="assertive">{feedback}</p>

      {answered && (
        <button onClick={handleNextQuestion} tabIndex="0">
          Siguiente Pregunta
        </button>
      )}

      <p>Intentos: {attempts}/10</p>
    </div>
  );
}

export default DecimalesAFRacciones;
