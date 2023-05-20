import { useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';


const ParticipantEntraceScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
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
        <div className="welcome-message">Welcome to the Sheet Music Digitization Study!</div>
        <img src ={process.env.PUBLIC_URL + "/notes/img7.png"} alt = "music" style={{ width: '40%', height: 'auto' }}></img>
        <p>
          Hello! This is an early version of Obbligato, a platform that seeks to digitize handwritten sheet music one measure at a time.
          The idea behind Obbligato is that we can leverage the power of a crowd to efficiently and accurately perform the task of <a href="https://en.wikipedia.org/wiki/Optical_music_recognition">optical music recognition</a>.
          The study we were running has since closed, thank you to everyone that participated! If you want to see example tasks in the system, feel free to continue onwards!
          Do not worry about your experience level with sheet music or how accurately you complete the task, the most important part is that you make an honest effort.
          Obbligato was designed to be used on a computer, so if using a mobile phone the site may not work 100% correctly.
        </p>

        <p>
          The email field was previously used for a giveaway, but it is not needed for entry.
          Simply select the option that best describes your experience working with sheet music, and once ready, hit the submit button to begin the task!
        </p>

      <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label htmlFor="email">Email (optional, for gift card raffle):</label>
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
        <br></br>
        <div style={{ textAlign: 'center' }}>
          <label htmlFor="musicExperience">Experience reading or writing sheet music:</label>
          <form id="musicExperience">
            <div>
              <input id="musicExperienceZero" type="radio" name="musicExperience" value="Zero experience" defaultChecked />
              <label style={{ paddingLeft: "20px"}} htmlFor="musicExperienceZero">Zero experience</label>
            </div>
            <div>
              <input id="musicExperienceSome" type="radio" name="musicExperience" value="Some previous experience" />
              <label style={{ paddingLeft: "20px"}} htmlFor="musicExperienceSome">Some previous experience</label>
            </div>
            <div>
              <input id="musicExperienceMuch" type="radio" name="musicExperience" value="Actively work with sheet music" />
              <label style={{ paddingLeft: "20px"}} htmlFor="musicExperienceMuch">Actively work with sheet music</label>
            </div>
            <div>
              <input id="musicExperienceNoAnswer" type="radio" name="musicExperience" value="Prefer not to answer" />
              <label style={{ paddingLeft: "20px"}} htmlFor="musicExperienceNoAnswer">Prefer not to answer</label>
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