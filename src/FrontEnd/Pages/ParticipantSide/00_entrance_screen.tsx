import { useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, useNavigate} from 'react-router-dom';


const ParticipantEntraceScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const ENDPOINT = "https://cs565-backend-2023.herokuapp.com";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const email = form.email.value;
    const experience = form.experience.value;
  
    axios.post(`${ENDPOINT}/api/users`, {
      email: email,
      experience: experience
    })
    .then((response) => {
      const userId = response.data.result._id;
      navigate('/activity', { state: { userId } });
    })
    .catch((error) => {
      setErrorMessage(error.response.data.message);
    });
  }

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center">
        <div className="welcome-message">Welcome to the Music Identification activity!</div>
        <img src = "/notes/img1.png" alt = "music"></img>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            style={{ width: '300px' }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="experience">Your Music Experience</label>
          <input
            type="text"
            className="form-control"
            id="experience"
            placeholder="e.g. None, some, a lot, etc."
            value={experience}
            onChange={(event) => setExperience(event.target.value)}
            style={{ width: '300px' }}
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ marginTop: '20px' }}>Submit</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
}

export default ParticipantEntraceScreen;