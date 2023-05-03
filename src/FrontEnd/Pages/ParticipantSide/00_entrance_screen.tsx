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
    const experience = (form.querySelector('input[name="musicExperience"]:checked') as HTMLInputElement)?.value;
  
    if (!email) {
        // If email is empty, only post experience
        axios.post(`${ENDPOINT}/api/users`, {
          experience: experience
        })
        .then((response) => {
          const userId = response.data.result._id;
          navigate('/activity', { state: { userId } });
        })
        .catch((error) => {
          setErrorMessage(error.response.data.message);
        });
      } else {
        // If email is not empty, post both email and experience
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
  }

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center">
        <div className="welcome-message">Welcome to the Music Sheet Identification activity!</div>
        <img src = "/notes/img7.png" alt = "music" style={{ width: '50%', height: 'auto' }}></img>
        <div>About the study:</div>
        <div>xxxx</div>

      <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h4 style={{ textAlign: 'center' }}>Your Email - Optional, for Gift Card Raffel only</h4>
          {/* <label htmlFor="email">Your Email - Optional, only for Gift Card Raffel</label> */}
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
        {/* <div className="form-group">
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
        </div> */}

        <div style={{ textAlign: 'center' }}>
        <h4>Your Experience of Writing/Reading Music</h4>
        <form>
            <div>
                <label>
                <input type="radio" name="musicExperience" value="Zero experience" defaultChecked />
                Zero experience
                </label>
            </div>
            <div>
                <label>
                <input type="radio" name="musicExperience" value="Some experience" />
                Some experience
                </label>
            </div>
            <div>
                <label>
                <input type="radio" name="musicExperience" value="Actively working with music" />
                Actively working with music
                </label>
            </div>
            <div>
                <label>
                <input type="radio" name="musicExperience" value="Prefer not to answer" />
                Prefer not to answer
                </label>
            </div>
            </form>

        </div>
        <button type="submit" className="btn btn-primary" style={{ marginTop: '20px' }}>Submit</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
}

export default ParticipantEntraceScreen;