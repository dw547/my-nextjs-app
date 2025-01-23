// pages/index.js

import { useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({ name: '', ua: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Submitting...');

    try {
      const res = await fetch('/api/saveData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        setMessage('Data submitted successfully!');
        setForm({ name: '', ua: '' });
      } else {
        setMessage('Failed to submit data.');
      }
    } catch (error) {
      console.error(error);
      setMessage('An error occurred.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Submit Your Data</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>UA:</label><br />
          <input
            type="text"
            name="ua"
            value={form.ua}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
