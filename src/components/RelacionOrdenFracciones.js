import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function RelacionOrdenFracciones() {
  const [fraction1, setFraction1] = useState(generateFraction());
  const [fraction2, setFraction2] = useState(generateFraction());
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
      const fractionsElement = document.getElementById('fractions-display');
      if (fractionsElement) {
        fractionsElement.focus();
      }
    }
  }, [fraction1, fraction2, answered]);

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

  function generateFraction() {
    const numerator = Math.floor(Math.random() * 9) + 1; // Numerador entre 1 y 9
    const denominator = Math.floor(Math.random() * 9) + 1; // Denominador entre 1 y 9
    return `${numerator}/${denominator}`;
  }

  function handleAnswer(selectedAnswer) {
    const correctAnswer = compareFractions(fraction1, fraction2);

    if (selectedAnswer === correctAnswer) {
      setFeedback(`¡Correcto! ${fraction1} es ${correctAnswer} que ${fraction2}.`);
      setScore(score + 1);
    } else {
      setFeedback(`Incorrecto. ${fraction1} es ${correctAnswer} que ${fraction2}.`);
    }

    setAnswered(true);
    setAttempts(attempts + 1);

    const feedbackElement = document.getElementById('feedback');
    if (feedbackElement) {
      feedbackElement.focus();
    }
  }

  function handleNextQuestion() {
    setFraction1(generateFraction());
    setFraction2(generateFraction());
    setFeedback('');
    setAnswered(false);

    const instructionsElement = document.getElementById('instructions');
    if (instructionsElement) {
      instructionsElement.focus();
    }
  }

  function handleRetry() {
    setFraction1(generateFraction());
    setFraction2(generateFraction());
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

  function compareFractions(fraction1, fraction2) {
    const [num1, den1] = fraction1.split('/').map(Number);
    const [num2, den2] = fraction2.split('/').map(Number);

    const value1 = num1 / den1;
    const value2 = num2 / den2;

    if (value1 > value2) {
      return 'mayor';
    } else if (value1 < value2) {
      return 'menor';
    } else {
      return 'igual';
    }
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
      <h2 tabIndex="0">Relación de Orden entre Fracciones</h2>
      <p id="instructions" tabIndex="0">Selecciona la relación correcta entre las siguientes fracciones:</p>
      <p id="fractions-display" tabIndex="0" aria-live="assertive">
        <strong>{fraction1}</strong> y <strong>{fraction2}</strong>
      </p>

      <div>
        <button 
          onClick={() => handleAnswer('mayor')} 
          disabled={answered}
          tabIndex="0"
        >
          Mayor
        </button>
        <button 
          onClick={() => handleAnswer('menor')} 
          disabled={answered}
          tabIndex="0"
        >
          Menor
        </button>
        <button 
          onClick={() => handleAnswer('igual')} 
          disabled={answered}
          tabIndex="0"
        >
          Igual
        </button>
      </div>

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

export default RelacionOrdenFracciones;
