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
          We are researching the feasibility of such a system, and would be highly grateful for your participation. All that we would ask of you is five minutes of your time to digitize four straightforward measures of music via our interface.
          Do not worry about your experience level with sheet music or how accurately you complete the task, the most important part is that you make an honest effort.
          Obbligato was designed to be used on a computer, so we ask that you do this on a computer if possible, otherwise the site may break.
        </p>

        <p>
          If you consent to participate in the study, feel free to proceed. As an additional incentive, we will be giving away a few $10 Amazon gift cards to a few lucky participants! If you are interested in entering, feel free to provide your email below.
          We will not be using your email for any part of the study other than contacting you in the near future should you win a gift card.
          Other than that, select the option that best describes your experience working with sheet music, and once ready, hit the submit button to begin the task!
        </p>

      <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* <h4 style={{ textAlign: 'center' }}>Your Email - Optional, for Gift Card Raffle only</h4> */}
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
          {/* <h4>Your Experience of Writing/Reading Music</h4> */}
          <label htmlFor="musicExperience">Experience reading or writing sheet music:</label>
          <form id="musicExperience">
            {/* <div>
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
            </div> */}
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