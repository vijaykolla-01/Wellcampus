import { useState } from 'react';

const MentalHealthAssessment = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  // Student Mental Health Self-Assessment Questions (10 Questions)
  const questions = [
    {
      id: 1,
      question: "I feel nervous, anxious, or on edge.",
      options: [
        { text: "Not at all", value: 0 },
        { text: "Several days", value: 1 },
        { text: "More than half the days", value: 2 },
        { text: "Nearly every day", value: 3 }
      ]
    },
    {
      id: 2,
      question: "I find it hard to control my worrying.",
      options: [
        { text: "Not at all", value: 0 },
        { text: "Several days", value: 1 },
        { text: "More than half the days", value: 2 },
        { text: "Nearly every day", value: 3 }
      ]
    },
    {
      id: 3,
      question: "I feel little interest or pleasure in doing things.",
      options: [
        { text: "Not at all", value: 0 },
        { text: "Several days", value: 1 },
        { text: "More than half the days", value: 2 },
        { text: "Nearly every day", value: 3 }
      ]
    },
    {
      id: 4,
      question: "I feel down, depressed, or hopeless.",
      options: [
        { text: "Not at all", value: 0 },
        { text: "Several days", value: 1 },
        { text: "More than half the days", value: 2 },
        { text: "Nearly every day", value: 3 }
      ]
    },
    {
      id: 5,
      question: "I have trouble sleeping (too little or too much).",
      options: [
        { text: "Not at all", value: 0 },
        { text: "Several days", value: 1 },
        { text: "More than half the days", value: 2 },
        { text: "Nearly every day", value: 3 }
      ]
    },
    {
      id: 6,
      question: "I feel tired or have low energy.",
      options: [
        { text: "Not at all", value: 0 },
        { text: "Several days", value: 1 },
        { text: "More than half the days", value: 2 },
        { text: "Nearly every day", value: 3 }
      ]
    },
    {
      id: 7,
      question: "I have difficulty concentrating on studies.",
      options: [
        { text: "Not at all", value: 0 },
        { text: "Several days", value: 1 },
        { text: "More than half the days", value: 2 },
        { text: "Nearly every day", value: 3 }
      ]
    },
    {
      id: 8,
      question: "I feel overwhelmed by academic pressure.",
      options: [
        { text: "Not at all", value: 0 },
        { text: "Several days", value: 1 },
        { text: "More than half the days", value: 2 },
        { text: "Nearly every day", value: 3 }
      ]
    },
    {
      id: 9,
      question: "I feel isolated or disconnected from friends/family.",
      options: [
        { text: "Not at all", value: 0 },
        { text: "Several days", value: 1 },
        { text: "More than half the days", value: 2 },
        { text: "Nearly every day", value: 3 }
      ]
    },
    {
      id: 10,
      question: "I feel confident in handling my daily responsibilities.",
      options: [
        { text: "Not at all", value: 3 }, // Reverse scoring
        { text: "Several days", value: 2 }, // Reverse scoring
        { text: "More than half the days", value: 1 }, // Reverse scoring
        { text: "Nearly every day", value: 0 } // Reverse scoring
      ]
    }
  ];

  const handleAnswer = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
    
    // Calculate total score
    const newScore = newAnswers.reduce((sum, answer) => {
      // For question 10 (index 9), we use the stored value directly
      // For other questions, we add the selected value
      return sum + answer;
    }, value);
    
    setScore(newScore);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Test completed
      finishTest(newScore);
    }
  };

  const finishTest = (finalScore) => {
    setLoading(true);
    
    // Simulate processing time
    setTimeout(() => {
      setLoading(false);
      setShowResults(true);
      
      // Call the onComplete callback with the results
      if (onComplete) {
        onComplete({
          score: finalScore,
          maxScore: 30, // Maximum possible score (10 questions, max 3 points each)
          percentage: Math.round((finalScore / 30) * 100),
          timestamp: new Date().toISOString()
        });
      }
    }, 1500);
  };

  const restartTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setScore(0);
    setShowResults(false);
    setLoading(false);
  };

  const getMentalHealthCategory = (score) => {
    if (score <= 7) return { category: "Healthy", color: "green", message: "Your mental health appears to be in a good state. Keep maintaining good habits!" };
    if (score <= 14) return { category: "Mild Stress", color: "#FFA500", message: "You may be experiencing some mild stress. Practice relaxation & time management." };
    if (score <= 21) return { category: "Moderate Stress", color: "orange", message: "You may be experiencing moderate stress. Try guided exercises & talk to mentor." };
    return { category: "High Risk", color: "red", message: "You may be experiencing high levels of stress. We strongly recommend scheduling a counselor appointment." };
  };

  if (showResults) {
    const resultData = getMentalHealthCategory(score);
    
    return (
      <div className="assessment-results">
        <div className="results-card">
          <h2>Assessment Results</h2>
          
          <div className="score-display">
            <h3>Your Score: <span style={{ color: resultData.color, fontWeight: 'bold' }}>{score}/30</span></h3>
            <p style={{ color: resultData.color, fontSize: '1.2em', fontWeight: 'bold' }}>
              Mental Health Status: {resultData.category}
            </p>
          </div>
          
          <div className="result-message">
            <p>{resultData.message}</p>
          </div>
          
          <div className="recommendations">
            <h4>Recommended Actions:</h4>
            <ul>
              {resultData.category === "High Risk" && (
                <>
                  <li>Practice breathing exercises</li>
                  <li>Use our guided meditation module</li>
                  <li>Schedule meeting with mentor</li>
                  <li>Contact campus counseling services for support</li>
                </>
              )}
              {resultData.category === "Moderate Stress" && (
                <>
                  <li>Practice breathing exercises</li>
                  <li>Use our guided meditation module</li>
                  <li>Schedule meeting with mentor</li>
                  <li>Try our breathing exercises and mindfulness resources</li>
                </>
              )}
              {resultData.category === "Mild Stress" && (
                <>
                  <li>Practice relaxation & time management</li>
                  <li>Explore our stress management resources</li>
                  <li>Maintain regular sleep and exercise routines</li>
                </>
              )}
              {(resultData.category === "Healthy") && (
                <>
                  <li>Continue practicing good mental health habits</li>
                  <li>Consider peer support groups</li>
                  <li>Explore our stress management resources</li>
                </>
              )}
              <li>Take breaks when feeling overwhelmed</li>
              <li>Stay connected with friends and family</li>
            </ul>
          </div>
          
          <div className="actions">
            <button className="btn btn-primary" onClick={restartTest}>Retake Assessment</button>
            <button className="btn btn-secondary" onClick={() => window.location.hash = '#counseling'}>
              Contact Support
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="assessment-loading">
        <div className="loading-spinner"></div>
        <p>Evaluating your responses...</p>
      </div>
    );
  }

  return (
    <div className="mental-health-assessment">
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        ></div>
      </div>
      
      <div className="question-container">
        <div className="question-counter">
          Question {currentQuestion + 1} of {questions.length}
        </div>
        
        <p className="assessment-instructions">
          Over the last <strong>2 weeks</strong>, how often have you experienced the following?
        </p>
        
        <h3 className="question-text">
          {questions[currentQuestion].question}
        </h3>
        
        <div className="options-container">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className="option-btn"
              onClick={() => handleAnswer(option.value)}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentalHealthAssessment;