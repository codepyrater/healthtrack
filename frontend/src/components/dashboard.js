import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../components/styles/Dashboard.css'; // Import the CSS file

const Dashboard = () => {
  const [metrics, setMetrics] = useState([]);
  const { auth } = useContext(AuthContext);
  const userId = localStorage.getItem('userId');
  


  useEffect(() => {
    const fetchMetrics = async () => {
      const response = await fetch(`http://localhost:5000/api/metrics/${userId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setMetrics(data);
      } else {
        console.error('Failed to fetch metrics:', response.status);
      }
    };

    if (auth.isAuthenticated) {
      fetchMetrics();
    }
  }, [auth]);

  return (
    <div className="dashboard">
      <h1 className="dashboard__title">Health Metrics</h1>
      {metrics.length > 0 ? (
        <div className="dashboard__metrics">
          {metrics.map((metric) => (
            <div key={metric._id} className="dashboard__metric">
              <p className="dashboard__metric-date">{new Date(metric.date).toLocaleDateString()}</p>
              <div className="dashboard__metric-details">
                <p>Steps: {metric.steps}</p>
                <p>Calories: {metric.calories}</p>
                <p>Sleep Hours: {metric.sleepHours}</p>
                <p>Water Consumed: {metric.waterConsumed} liters</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="dashboard__no-data">
          <p>No health metrics available</p>
          <p>Here are some tips to improve your health:</p>
          <ul>
            <li>Aim for at least 30 minutes of moderate exercise daily</li>
            <li>Eat a balanced diet with plenty of fruits and vegetables</li>
            <li>Stay hydrated by drinking enough water</li>
            <li>Get enough sleep (7-9 hours for adults)</li>
            <li>Practice stress management techniques like meditation or yoga</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;