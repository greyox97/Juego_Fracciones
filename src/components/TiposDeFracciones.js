import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function TiposDeFracciones() {
  const [fraction, setFraction] = useState(generateFraction());
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
      const fractionElement = document.getElementById('fraction-display');
      if (fractionElement) {
        fractionElement.focus();
      }
    }
  }, [fraction, answered]);

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
    const correctAnswer = identifyFractionType(fraction);

    if (selectedAnswer === correctAnswer) {
      setFeedback(`¡Correcto! ${fraction} es una fracción ${correctAnswer}.`);
      setScore(score + 1);
    } else {
      setFeedback(`Incorrecto. ${fraction} es una fracción ${correctAnswer}.`);
    }

    setAnswered(true);
    setAttempts(attempts + 1);

    const feedbackElement = document.getElementById('feedback');
    if (feedbackElement) {
      feedbackElement.focus();
    }
  }

  function handleNextQuestion() {
    setFraction(generateFraction());
    setFeedback('');
    setAnswered(false);

    const instructionsElement = document.getElementById('instructions');
    if (instructionsElement) {
      instructionsElement.focus();
    }
  }

  function handleRetry() {
    setFraction(generateFraction());
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

  function identifyFractionType(fraction) {
    const [numerator, denominator] = fraction.split('/').map(Number);

    if (numerator < denominator) {
      return 'propia';
    } else if (numerator > denominator) {
      return 'impropia';
    } else {
      return 'mixta';
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
      <h2 tabIndex="0">Tipos de Fracciones</h2>
      <p id="instructions" tabIndex="0">Identifica el tipo de la siguiente fracción:</p>
      <p id="fraction-display" tabIndex="0" aria-live="assertive"><strong>{fraction}</strong></p>

      <div>
        <button 
          onClick={() => handleAnswer('propia')} 
          disabled={answered}
          tabIndex="0"
        >
          Propia
        </button>
        <button 
          onClick={() => handleAnswer('impropia')} 
          disabled={answered}
          tabIndex="0"
        >
          Impropia
        </button>
        <button 
          onClick={() => handleAnswer('mixta')} 
          disabled={answered}
          tabIndex="0"
        >
          Mixta
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

export default TiposDeFracciones;
