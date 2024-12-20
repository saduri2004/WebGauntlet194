import React, { useState, useEffect } from 'react';

function App() {
  const [visitCount, setVisitCount] = useState<number>(() => {
    // Retrieve visit count from localStorage or start at 0
    const savedCount = localStorage.getItem('taskDivertedVisits');
    return savedCount ? parseInt(savedCount, 10) : 0;
  });

  useEffect(() => {
    // Increment visit count
    const newCount = visitCount + 1;
    setVisitCount(newCount);

    // Save to localStorage
    localStorage.setItem('taskDivertedVisits', newCount.toString());
  }, []);

  const handleGoBack = () => {
    // Attempt to go back to the previous page
    window.history.back();
  };

  return (
    <div className="diversion-warning">
      <h1>⚠️ YOUR AI AGENT TASK HAS BEEN DIVERTED ⚠️</h1>
      <p>
        It seems like you've fallen for a distraction! This is a notification to help you refocus on your main task.
      </p>
      <p>
        Here's what you can do now:
        <ul>
          <li>Return to the previous site to continue your task.</li>
          <li>Maintain focus to complete your goals efficiently.</li>
        </ul>
      </p>
      <button onClick={handleGoBack}>Go Back to Your Task</button>
      <div className="counter">
        This diversion warning has been triggered {visitCount} time{visitCount !== 1 ? 's' : ''} during this session.
      </div>
    </div>
  );
}

export default App;
