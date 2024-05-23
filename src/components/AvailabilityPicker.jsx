import React, { useState } from 'react';
import { Checkbox, TimePicker, Row, Col, Switch } from 'antd';
import moment from 'moment';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const AvailabilityPicker = () => {
  const [is24x7, setIs24x7] = useState(false);
  const [availability, setAvailability] = useState({
    Monday: { isFullDay: false, timeRange: [null, null] },
    Tuesday: { isFullDay: false, timeRange: [null, null] },
    Wednesday: { isFullDay: false, timeRange: [null, null] },
    Thursday: { isFullDay: false, timeRange: [null, null] },
    Friday: { isFullDay: false, timeRange: [null, null] },
    Saturday: { isFullDay: false, timeRange: [null, null] },
    Sunday: { isFullDay: false, timeRange: [null, null] },
  });

  const handleDayChange = (day, isFullDay, timeRange) => {
    setAvailability((prev) => ({ ...prev, [day]: { isFullDay, timeRange } }));
  };

  const handleIs24x7Change = (checked) => {
    setIs24x7(checked);
    if (checked) {
      const allDayAvailability = daysOfWeek.reduce((acc, day) => {
        acc[day] = { isFullDay: true, timeRange: [null, null] };
        return acc;
      }, {});
      setAvailability(allDayAvailability);
    } else {
      const noAvailability = daysOfWeek.reduce((acc, day) => {
        acc[day] = { isFullDay: false, timeRange: [null, null] };
        return acc;
      }, {});
      setAvailability(noAvailability);
    }
  };

  return (
    <div>
      <Row>
        <Col span={6}>
          <Switch checked={is24x7} onChange={handleIs24x7Change}>
            24x7 Availability
          </Switch>
        </Col>
      </Row>
      {daysOfWeek.map((day) => (
        <Row key={day} style={{ marginTop: 16 }}>
          <Col span={6}>
            <Checkbox
              checked={availability[day].isFullDay}
              onChange={(e) => handleDayChange(day, e.target.checked, availability[day].timeRange)}
            >
              {day} (Full Day)
            </Checkbox>
          </Col>
          <Col span={18}>
            <TimePicker.RangePicker
              disabled={availability[day].isFullDay || is24x7}
              format="HH:mm"
              value={availability[day].timeRange}
              onChange={(times) => handleDayChange(day, false, times)}
            />
          </Col>
        </Row>
      ))}
    </div>
  );
};

export default AvailabilityPicker;