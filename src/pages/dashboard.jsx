import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, BriefcaseIcon, MegaphoneIcon } from 'lucide-react';

// Sample data
const events = [
  { id: 1, title: 'Team Meeting', type: 'appointment', date: '2024-06-24', time: '10:00 AM', location: 'Conference Room A' },
  { id: 2, title: 'Project Deadline', type: 'announcement', date: '2024-06-25', time: '11:30 AM', description: 'Submit final project report' },
  { id: 3, title: 'Client Call', type: 'appointment', date: '2024-06-26', time: '2:00 PM', location: 'Virtual' },
  { id: 4, title: 'Company Picnic', type: 'announcement', date: '2024-06-28', time: '12:00 PM', description: 'Annual company picnic at Central Park' },
];

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState("appointments");

  const selectedDateEvents = events.filter(event => event.date === format(selectedDate, 'yyyy-MM-dd'));

  const renderEventList = (eventType) => {
    const filteredEvents = selectedDateEvents.filter(event => event.type === eventType);
    
    return filteredEvents.length > 0 ? (
      <ul className="space-y-2">
        {filteredEvents.map(event => (
          <li key={event.id} className="bg-gray-100 p-3 rounded-md">
            <div className="font-semibold">{event.title}</div>
            <div className="text-sm text-gray-600">{event.time}</div>
            {event.location && <div className="text-sm text-gray-600">{event.location}</div>}
            {event.description && <div className="text-sm mt-1">{event.description}</div>}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500">No {eventType}s for the selected date.</p>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
              modifiers={{
                hasEvent: (date) => events.some(event => event.date === format(date, 'yyyy-MM-dd'))
              }}
              modifiersClassNames={{
                selected: 'bg-blue-800 text-white hover:bg-blue-700',
                today: 'bg-orange-500 text-white',
                hasEvent: 'bg-green-100'
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {format(selectedDate, 'MMMM d, yyyy')}
              {selectedDateEvents.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {selectedDateEvents.length} event{selectedDateEvents.length !== 1 ? 's' : ''}
                </Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="appointments">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  Appointments
                </TabsTrigger>
                <TabsTrigger value="announcements">
                  <MegaphoneIcon className="w-4 h-4 mr-2" />
                  Announcements
                </TabsTrigger>
              </TabsList>
              <TabsContent value="appointments" className="mt-4">
                {renderEventList('appointment')}
              </TabsContent>
              <TabsContent value="announcements" className="mt-4">
                {renderEventList('announcement')}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;