import { Table, Button, Input, DatePicker, Modal, Form, Select, Tabs,} from 'antd';
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import moment from 'moment';


const { RangePicker } = DatePicker;
const { TabPane } = Tabs;
const columns = [
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    width: 150,
    fixed: 'left',
  },
  {
    title: 'Breakfast',
    children: [
      {
        title: 'Pre (mg/dL)',
        dataIndex: 'breakfastPre',
        key: 'breakfastPre',
        width: 100,
      },
      {
        title: 'Post (mg/dL)',
        dataIndex: 'breakfastPost',
        key: 'breakfastPost',
        width: 100,
      },
    ],
  },
  {
    title: 'Lunch',
    children: [
      {
        title: 'Pre (mg/dL)',
        dataIndex: 'lunchPre',
        key: 'lunchPre',
        width: 100,
      },
      {
        title: 'Post (mg/dL)',
        dataIndex: 'lunchPost',
        key: 'lunchPost',
        width: 100,
      },
    ],
  },
  {
    title: 'Supper',
    children: [
      {
        title: 'Pre (mg/dL)',
        dataIndex: 'supperPre',
        key: 'supperPre',
        width: 100,
      },
      {
        title: 'Post (mg/dL)',
        dataIndex: 'supperPost',
        key: 'supperPost',
        width: 100,
      },
    ],
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    width: 150,
  },
];

const rawData = [
  {
    key: '1',
    date: '2023-06-01',
    type: 'Meds',
    breakfastPre: '120',
    breakfastPost: '140',
    lunchPre: '130',
    lunchPost: '150',
    supperPre: '110',
    supperPost: '130',
  },
  {
    key: '2',
    date: '2023-06-01',
    type: 'Foods',
    breakfastPre: '80',
    breakfastPost: '100',
    lunchPre: '90',
    lunchPost: '110',
    supperPre: '70',
    supperPost: '90',
  },
  {
    key: '3',
    date: '2023-06-02',
    type: 'Sugar Levels (mg/dL)',
    breakfastPre: '110',
    breakfastPost: '130',
    lunchPre: '120',
    lunchPost: '140',
    supperPre: '100',
    supperPost: '120',
  },
  {
    key: '4',
    date: '2023-06-03',
    type: 'Meds',
    breakfastPre: '115',
    breakfastPost: '135',
    lunchPre: '125',
    lunchPost: '145',
    supperPre: '105',
    supperPost: '125',
  },
  {
    key: '5',
    date: '2023-06-04',
    type: 'Foods',
    breakfastPre: '85',
    breakfastPost: '105',
    lunchPre: '95',
    lunchPost: '115',
    supperPre: '75',
    supperPost: '95',
  },
  {
    key: '6',
    date: '2023-06-05',
    type: 'Sugar Levels (mg/dL)',
    breakfastPre: '105',
    breakfastPost: '125',
    lunchPre: '115',
    lunchPost: '135',
    supperPre: '95',
    supperPost: '115',
  },
  {
    key: '7',
    date: '2023-06-06',
    type: 'Meds',
    breakfastPre: '110',
    breakfastPost: '130',
    lunchPre: '120',
    lunchPost: '140',
    supperPre: '100',
    supperPost: '120',
  },
  {
    key: '8',
    date: '2023-06-07',
    type: 'Foods',
    breakfastPre: '90',
    breakfastPost: '110',
    lunchPre: '100',
    lunchPost: '120',
    supperPre: '80',
    supperPost: '100',
  },
  {
    key: '9',
    date: '2023-06-08',
    type: 'Sugar Levels (mg/dL)',
    breakfastPre: '100',
    breakfastPost: '120',
    lunchPre: '110',
    lunchPost: '130',
    supperPre: '90',
    supperPost: '110',
  },
];


const processData = (data) => {
  const processedData = [];
  let currentDate = null;
  data.forEach((item) => {
    if (item.date !== currentDate) {
      currentDate = item.date;
      processedData.push({
        key: `date-${currentDate}`,
        type: `Date: ${currentDate}`,
        breakfastPre: '',
        breakfastPost: '',
        lunchPre: '',
        lunchPost: '',
        supperPre: '',
        supperPost: '',
        date: '',
        isDateRow: true,
      });
    }
    processedData.push(item);
  });
  return processedData;
};

const rowClassName = (record) => (record.isDateRow ? 'date-row' : '');

const BloodSugarLog = () => {
  const [data, setData] = useState(processData(rawData));
  const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleDateRangeChange = (dates) => {
    setDateRange(dates);
  };

  const handleAddNewRow = () => {
    setIsModalOpen(true);
  };

  const handleModalOk = (values) => {
    const newDate = moment().format('YYYY-MM-DD');
    const newRow = {
      key: `${data.length + 1}`,
      date: newDate,
      type: values.type,
      breakfastPre: values.breakfastPre,
      breakfastPost: values.breakfastPost,
      lunchPre: values.lunchPre,
      lunchPost: values.lunchPost,
      supperPre: values.supperPre,
      supperPost: values.supperPost,
    };
    setData([...data, newRow]);
    setIsModalOpen(false);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const filteredData = data.filter(
    (record) =>
      (!searchText ||
        JSON.stringify(record)
          .toLowerCase()
          .includes(searchText.toLowerCase())) &&
      (!dateRange.length ||
        (moment(record.date).isBetween(dateRange[0], dateRange[1]) ||
          moment(record.date).isSame(dateRange[0], 'day') ||
          moment(record.date).isSame(dateRange[1], 'day')))
  );

  const AddRowModal = ({ visible, onOk, onCancel }) => {
    const [form] = Form.useForm();
  
    const handleOk = () => {
      form
        .validateFields()
        .then((values) => {
          onOk(values);
          form.resetFields();
        })
        .catch((err) => console.error(err));
    };
  
    return (
      <Modal
        visible={visible}
        title="Add New Row"
        okText="Add"
        cancelText="Cancel"
        onOk={handleOk}
        onCancel={onCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: 'Please select a type' }]}
          >
            <Select placeholder="Select a type">
              <Select.Option value="Meds">Meds</Select.Option>
              <Select.Option value="Foods">Foods</Select.Option>
              <Select.Option value="Sugar Levels (mg/dL)">Sugar Levels (mg/dL)</Select.Option>
            </Select>
          </Form.Item>
  
          <Tabs defaultActiveKey="1">
            <TabPane tab="Breakfast" key="1">
              <Form.Item name="breakfastPre" label="Pre (mg/dL)">
                <Input />
              </Form.Item>
              <Form.Item name="breakfastPost" label="Post (mg/dL)">
                <Input />
              </Form.Item>
            </TabPane>
            <TabPane tab="Lunch" key="2">
              <Form.Item name="lunchPre" label="Pre (mg/dL)">
                <Input />
              </Form.Item>
              <Form.Item name="lunchPost" label="Post (mg/dL)">
                <Input />
              </Form.Item>
            </TabPane>
            <TabPane tab="Supper" key="3">
              <Form.Item name="supperPre" label="Pre (mg/dL)">
                <Input />
              </Form.Item>
              <Form.Item name="supperPost" label="Post (mg/dL)">
                <Input />
              </Form.Item>
            </TabPane>
          </Tabs>
        </Form>
      </Modal>
    );
  };



  return (
    <Container fluid className="mt-4">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
        <Input.Search
          placeholder="Search..."
          onSearch={handleSearch}
          style={{ width: '200px' }}
        />

        <Button type="primary" onClick={handleAddNewRow}>
          Add
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={filteredData}
        bordered
        size="middle"
        pagination={false}
        rowClassName={rowClassName}
        scroll={{
          x: 'calc(700px + 50%)',
          y: 240,
        }}
        style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      />
      <AddRowModal
        visible={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      />
    </Container>
  );
};

export default BloodSugarLog;