import React, { useState, useEffect } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const BloodSugarLog = () => {
  const [date, setDate] = useState('');
  const [glucoseLevels, setGlucoseLevels] = useState({
    breakfast: { pre: '', post: '' },
    lunch: { pre: '', post: '' },
    supper: { pre: '', post: '' },
  });
  const [meals, setMeals] = useState({
    breakfast: { foods: [], medications: [], time: '' },
    lunch: { foods: [], medications: [], time: '' },
    supper: { foods: [], medications: [], time: '' },
  });
  const [inputs, setInputs] = useState({
    breakfastFood: '',
    lunchFood: '',
    supperFood: '',
    breakfastMedication: '',
    lunchMedication: '',
    supperMedication: ''
  });

  useEffect(() => {
    const currentDate = new Date();
    setDate(currentDate.toLocaleDateString());
  }, []);

  const handleInputChange = (e, meal, type) => {
    const { value } = e.target;
    setGlucoseLevels(prevState => ({
      ...prevState,
      [meal]: { ...prevState[meal], [type]: value }
    }));
  };

  const handleFoodAdd = meal => {
    const currentTime = new Date().toLocaleTimeString();
    setMeals(prevMeals => ({
      ...prevMeals,
      [meal]: {
        ...prevMeals[meal],
        foods: [...prevMeals[meal].foods, inputs[`${meal}Food`]],
        time: currentTime,
      }
    }));
    setInputs({ ...inputs, [`${meal}Food`]: '' });
  };

  const handleMedicationAdd = meal => {
    const currentTime = new Date().toLocaleTimeString();
    setMeals(prevMeals => ({
      ...prevMeals,
      [meal]: {
        ...prevMeals[meal],
        medications: [...prevMeals[meal].medications, inputs[`${meal}Medication`]],
        time: currentTime,
      }
    }));
    setInputs({ ...inputs, [`${meal}Medication`]: '' });
  };

  return (
    <div className="container">
      <h3>Blood Glucose Tracker</h3>
      <Form>
        <Form.Group>
          <Form.Label>Date:</Form.Label>
          <Form.Control type="text" value={date} readOnly />
        </Form.Group>
        {['breakfast', 'lunch', 'supper'].map(meal => (
          <div key={meal} className="meal-section">
            <h4>{meal.charAt(0).toUpperCase() + meal.slice(1)}</h4>
            <Form.Group>
              <Form.Label>Pre {meal}:</Form.Label>
              <Form.Control
                type="number"
                value={glucoseLevels[meal].pre}
                onChange={e => handleInputChange(e, meal, 'pre')}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Post {meal}:</Form.Label>
              <Form.Control
                type="number"
                value={glucoseLevels[meal].post}
                onChange={e => handleInputChange(e, meal, 'post')}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Add Food for {meal}:</Form.Label>
              <Form.Control
                type="text"
                value={inputs[`${meal}Food`]}
                onChange={e => setInputs({ ...inputs, [`${meal}Food`]: e.target.value })}
                placeholder={`Add food for ${meal}`}
              />
              <Button variant="primary" onClick={() => handleFoodAdd(meal)}>
                Add
              </Button>
            </Form.Group>
            <ListGroup>
              {meals[meal].foods.map((item, index) => (
                <ListGroup.Item key={index}>{item} <Button variant="danger" size="sm" onClick={() => {
                  setMeals(prevMeals => ({
                    ...prevMeals,
                    [meal]: {
                      ...prevMeals[meal],
                      foods: prevMeals[meal].foods.filter((_, i) => i !== index),
                    },
                  }));
                }}>X</Button></ListGroup.Item>
              ))}
            </ListGroup>
            <Form.Group>
              <Form.Label>Add Medication for {meal}:</Form.Label>
              <Form.Control
                type="text"
                value={inputs[`${meal}Medication`]}
                onChange={e => setInputs({ ...inputs, [`${meal}Medication`]: e.target.value })}
                placeholder={`Add medication for ${meal}`}
              />
              <Button variant="primary" onClick={() => handleMedicationAdd(meal)}>
                Add
              </Button>
            </Form.Group>
            <ListGroup>
              {meals[meal].medications.map((item, index) => (
                <ListGroup.Item key={index}>{item} <Button variant="danger" size="sm" onClick={() => {
                  setMeals(prevMeals => ({
                    ...prevMeals,
                    [meal]: {
                      ...prevMeals[meal],
                      medications: prevMeals[meal].medications.filter((_, i) => i !== index),
                    },
                  }));
                }}>X</Button></ListGroup.Item>
              ))}
            </ListGroup>
            <Form.Group>
              <Form.Label>Time of Edits:</Form.Label>
              <Form.Control type="text" value={meals[meal].time} readOnly />
            </Form.Group>
          </div>
        ))}
      </Form>
    </div>
  );
};

export default BloodSugarLog;
