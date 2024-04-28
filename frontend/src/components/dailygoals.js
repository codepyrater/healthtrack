import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../components/styles/DailyGoals.css';
import { AuthContext } from '../context/AuthContext';

const DailyGoals = () => {
  const { auth } = useContext(AuthContext);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [goals, setGoals] = useState([]);
  const [steps, setSteps] = useState('');
  const [calories, setCalories] = useState('');
  const [sleepHours, setSleepHours] = useState('');
  const [waterConsumed, setWaterConsumed] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const userId = localStorage.getItem('userId');
  const fetchGoals = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`http://localhost:5000/api/goals/${userId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      console.log('Response data:', response.data);

      // Check if the API response is an array or a single object
      if (Array.isArray(response.data)) {
        setGoals(response.data);
      } else if (response.data && typeof response.data === 'object') {
        setGoals([response.data]);
      } else {
        setGoals([]);
        console.error('API response does not have the expected structure');
      }
    } catch (error) {
      console.error('Error fetching goals:', error);
      toast.error('An error occurred while fetching goals.');
    } finally {
      setIsLoading(false);
    }
  }, [auth.token, userId]);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);


  const handleAddGoal = async (e) => {
    e.preventDefault();

    const newGoal = {
      userId,
      steps: parseInt(steps),
      calories: parseInt(calories),
      sleepHours: parseInt(sleepHours),
      waterConsumed: parseFloat(waterConsumed),
    };

    try {
      const response = await axios.post('http://localhost:5000/api/goals', newGoal, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (response.status === 201) {
        toast.success('Goal added successfully!');
        setSteps('');
        setCalories('');
        setSleepHours('');
        setWaterConsumed('');
        fetchGoals();
        setShowAddGoal(false);
      } else {
        toast.error('Failed to add goal.');
      }
    } catch (error) {
      console.error('Error adding goal:', error);
      toast.error('An error occurred while adding goal.');
    }
  };

  return (
    <div className="daily-goals">
      <h2 className="daily-goals__title">Daily Goals</h2>
      <div className="daily-goals__buttons">
        <button
          className="daily-goals__btn"
          onClick={() => setShowAddGoal(true)}
        >
          Add Daily Goal
        </button>
        <button
          className="daily-goals__btn"
          onClick={() => fetchGoals()}
        >
          View Your Daily Goals
        </button>
      </div>

      {showAddGoal && (
        <div className="daily-goals__add-goal">
          <h3 className="daily-goals__subtitle">Add Daily Goal</h3>
          <form onSubmit={handleAddGoal} className="daily-goals__form">
            <div className="daily-goals__input-group">
              <label htmlFor="steps" className="daily-goals__label">
                Steps:
              </label>
              <input
                type="number"
                id="steps"
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                className="daily-goals__input"
                required
              />
            </div>
            <div className="daily-goals__input-group">
              <label htmlFor="calories" className="daily-goals__label">
                Calories:
              </label>
              <input
                type="number"
                id="calories"
                value={calories}
                onChange={(e) => setCalories(e.target.value)}
                className="daily-goals__input"
                required
              />
            </div>
            <div className="daily-goals__input-group">
              <label htmlFor="sleepHours" className="daily-goals__label">
                Sleep Hours:
              </label>
              <input
                type="number"
                id="sleepHours"
                value={sleepHours}
                onChange={(e) => setSleepHours(e.target.value)}
                className="daily-goals__input"
                required
              />
            </div>
            <div className="daily-goals__input-group">
              <label htmlFor="waterConsumed" className="daily-goals__label">
                Water Consumed (liters):
              </label>
              <input
                type="number"
                step="0.1"
                id="waterConsumed"
                value={waterConsumed}
                onChange={(e) => setWaterConsumed(e.target.value)}
                className="daily-goals__input"
                required
              />
            </div>
            <button type="submit" className="daily-goals__submit-btn">
              Add Goal
            </button>
          </form>
        </div>
      )}

      {!showAddGoal && (
        <div className="daily-goals__view-goals">
          <h3 className="daily-goals__subtitle">Your Daily Goals</h3>
          {isLoading ? (
            <p>Loading...</p>
          ) : goals.length > 0 ? (
            <div className="daily-goals__list">
              {goals.map((goal) => (
                <div key={goal._id} className="daily-goals__goal">
                  <p className="daily-goals__goal-date">
                  
                  </p>
                  <div className="daily-goals__goal-details">
                   
                    <p>Steps: {goal.steps}</p>
                    <p>Calories: {goal.calories}</p>
                    <p>Sleep Hours: {goal.sleepHours}</p>
                    <p>Water Consumed: {goal.waterConsumed} liters</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="daily-goals__no-data">
              <p>No daily goals available</p>
              <p>Set daily goals to track your progress and improve your health!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DailyGoals;