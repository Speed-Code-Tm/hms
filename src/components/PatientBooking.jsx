import React, { useState } from 'react';
import { Modal, Form, Input, Select, DatePicker, Button, AutoComplete, List, Typography } from 'antd';
import moment from 'moment';

const { Option } = Select;
const { Title } = Typography;

const mockServices = [
  { id: 1, name: 'Cardiology Consultation', price: 100 },
  { id: 2, name: 'X-Ray', price: 80 },
  { id: 3, name: 'Blood Test', price: 50 },
  { id: 4, name: 'Physical Therapy', price: 120 },
  { id: 5, name: 'Orthopedic Surgery', price: 5000 },
];

const BookingModal = ({ show, onHide, patientInsuranceInfo }) => {
  const [form] = Form.useForm();
  const [services, setServices] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [options, setOptions] = useState([]);

  const handleBooking = (values) => {
    onHide(values);
    form.resetFields();
    setServices([]);
    setTotalCost(0);
  };

  const handleServiceSearch = (value) => {
    const filteredServices = mockServices.filter((service) =>
      service.name.toLowerCase().includes(value.toLowerCase())
    );
    setOptions(
      filteredServices.length > 0
        ? filteredServices.map((service) => ({
            value: service.name,
            label: service.name,
          }))
        : []
    );
  };

  const handleServiceSelect = (value, option) => {
    const selectedService = mockServices.find((service) => service.name === option.label);
    setServices((prevServices) => [...prevServices, { ...selectedService, quantity: 1 }]);
    setTotalCost((prevTotalCost) => prevTotalCost + selectedService.price);
  };

  const handleServiceQuantityChange = (service, quantity) => {
    setServices((prevServices) =>
      prevServices.map((item) =>
        item === service ? { ...item, quantity: quantity } : item
      )
    );
    setTotalCost((prevTotalCost) =>
      prevTotalCost - service.price * service.quantity + service.price * quantity
    );
  };

  const handleServiceRemove = (service) => {
    setServices((prevServices) => prevServices.filter((item) => item !== service));
    setTotalCost((prevTotalCost) => prevTotalCost - service.price * service.quantity);
  };

  return (
    <Modal
      visible={show}
      title="Book Appointment"
      okText="Book"
      cancelText="Cancel"
      onCancel={onHide}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            handleBooking(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="services"
          label="Services"
          rules={[{ required: true, message: 'Please select at least one service' }]}
        >
          <AutoComplete
            options={options}
            onSearch={handleServiceSearch}
            onSelect={handleServiceSelect}
            placeholder="Search for a service"
          />
          <List
            dataSource={services}
            renderItem={(service) => (
              <List.Item>
                {service.name}{' '}
                <Button.Group>
                  <Button onClick={() => handleServiceQuantityChange(service, service.quantity - 1)} disabled={service.quantity <= 1}>
                    -
                  </Button>
                  <Button disabled>{service.quantity}</Button>
                  <Button onClick={() => handleServiceQuantityChange(service, service.quantity + 1)}>+</Button>
                </Button.Group>{' '}
                <Button type="link" danger onClick={() => handleServiceRemove(service)}>
                  X
                </Button>
              </List.Item>
            )}
          />
        </Form.Item>

        <Form.Item name="insuranceInfo" label="Insurance Information" initialValue={patientInsuranceInfo}>
          <Input disabled />
        </Form.Item>

        <Form.Item
          name="purpose"
          label="Purpose of Visit"
          rules={[{ required: true, message: 'Please enter the purpose of visit' }]}
        >
          <Input placeholder="Enter purpose of visit" />
        </Form.Item>

        <Form.Item
          name="specialist"
          label="Specialist"
          rules={[{ required: true, message: 'Please select a specialist' }]}
        >
          <Select placeholder="Select a specialist">
            <Option value="cardiology">Cardiology</Option>
            <Option value="neurology">Neurology</Option>
            <Option value="orthopedics">Orthopedics</Option>
            {/* Add more specialist options */}
          </Select>
        </Form.Item>

        <Form.Item
          name="preferredDate"
          label="Preferred Date"
          rules={[{ required: true, message: 'Please select a preferred date' }]}
          initialValue={moment()}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          name="paymentMethod"
          label="Payment Method"
          rules={[{ required: true, message: 'Please select a payment method' }]}
        >
          <Select placeholder="Select a payment method">
            <Option value="cash">Cash</Option>
            <Option value="insurance">Insurance</Option>
          </Select>
        </Form.Item>

        <Title level={4}>Total Cost: {totalCost}</Title>
      </Form>
    </Modal>
  );
};

export default BookingModal;
