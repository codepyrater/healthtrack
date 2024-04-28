import React, { useState, useContext} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/AddMetrics.css';
import { AuthContext } from '../context/AuthContext';


const AddMetrics = () => {
  const { auth } = useContext(AuthContext);
  const userId = localStorage.getItem('userId');
  const [steps, setSteps] = useState('');
  const [calories, setCalories] = useState('');
  const [sleepHours, setSleepHours] = useState('');
  const [waterConsumed, setWaterConsumed] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMetric = {
      userId,
      steps: parseInt(steps),
      calories: parseInt(calories),
      sleepHours: parseInt(sleepHours),
      waterConsumed: parseFloat(waterConsumed),
    };

    try {
      const response = await axios.post(`http://localhost:5000/api/metrics`, newMetric, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (response.status === 201) {
        toast.success('Metrics added successfully!');
        alert('Metrics added successfully!');
        setSteps('');
        setCalories('');
        setSleepHours('');
        setWaterConsumed('');
      } else {
        toast.error('Failed to add metrics.');
      }
    } catch (error) {
      console.error('Error adding metrics:', error);
      toast.error('An error occurred while adding metrics.');
    }
  };

  return (
    <div className="add-metrics">
      <h2 className="add-metrics__title">Add Daily Health Metrics</h2>
      <form onSubmit={handleSubmit} className="add-metrics__form">
        <div className="add-metrics__input-group">
          <label htmlFor="steps" className="add-metrics__label">
            Steps:
          </label>
          <input
            type="number"
            id="steps"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className="add-metrics__input"
            required
          />
        </div>
        <div className="add-metrics__input-group">
          <label htmlFor="calories" className="add-metrics__label">
            Calories:
          </label>
          <input
            type="number"
            id="calories"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className="add-metrics__input"
            required
          />
        </div>
        <div className="add-metrics__input-group">
          <label htmlFor="sleepHours" className="add-metrics__label">
            Sleep Hours:
          </label>
          <input
            type="number"
            id="sleepHours"
            value={sleepHours}
            onChange={(e) => setSleepHours(e.target.value)}
            className="add-metrics__input"
            required
          />
        </div>
        <div className="add-metrics__input-group">
          <label htmlFor="waterConsumed" className="add-metrics__label">
            Water Consumed (liters):
          </label>
          <input
            type="number"
            step="0.1"
            id="waterConsumed"
            value={waterConsumed}
            onChange={(e) => setWaterConsumed(e.target.value)}
            className="add-metrics__input"
            required
          />
        </div>
        <button type="submit" className="add-metrics__submit-btn">
          Add Metrics
        </button>
      </form>
    </div>
  );
};

export default AddMetrics;