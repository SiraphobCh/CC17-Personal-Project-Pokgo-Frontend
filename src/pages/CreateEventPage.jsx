import { useState } from 'react';
import moment from 'moment-timezone';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function CreateEventPage() {
  const [formData, setFormData] = useState({
    eventName: '',
    locationName: '',
    locationUrl: '',
    bossSpawn: '',
    bossTerminate: '',
    teamLimit: '',
    addDescription: '',
  });

  const { createEvent } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log('Form submitted:', formData);

      const formattedData = {
        ...formData,
        bossSpawn: moment.tz(formData.bossSpawn, 'Asia/Bangkok').format(),
        bossTerminate: moment.tz(formData.bossTerminate, 'Asia/Bangkok').format(),
      };

      await createEvent(formattedData);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-800 rounded-lg mt-14">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-300">Event Name</label>
          <input
            type="text"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            className="w-full p-2 mt-2 bg-gray-700 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Location Name</label>
          <input
            type="text"
            name="locationName"
            value={formData.locationName}
            onChange={handleChange}
            className="w-full p-2 mt-2 bg-gray-700 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Location URL</label>
          <input
            type="text"
            name="locationUrl"
            value={formData.locationUrl}
            onChange={handleChange}
            className="w-full p-2 mt-2 bg-gray-700 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Boss Spawn Time</label>
          <input
            type="datetime-local"
            name="bossSpawn"
            value={formData.bossSpawn}
            onChange={handleChange}
            className="w-full p-2 mt-2 bg-gray-700 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Boss Terminate Time</label>
          <input
            type="datetime-local"
            name="bossTerminate"
            value={formData.bossTerminate}
            onChange={handleChange}
            className="w-full p-2 mt-2 bg-gray-700 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Team Limit</label>
          <input
            type="number"
            name="teamLimit"
            value={formData.teamLimit}
            onChange={handleChange}
            className="w-full p-2 mt-2 bg-gray-700 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300">Description</label>
          <textarea
            name="addDescription"
            value={formData.addDescription}
            onChange={handleChange}
            className="w-full p-2 mt-2 bg-gray-700 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-green-600 rounded text-gray-100 hover:bg-green-700"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}
