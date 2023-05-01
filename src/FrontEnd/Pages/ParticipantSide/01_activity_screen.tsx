import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = axios.create({ baseURL: 'https://cs565-backend-2023.herokuapp.com/' });

const ParticipantActivityScreen = () => {
  const [measure, setMeasure] = useState({ _id: '', image: '' });
  const [num_submission, setNum_submission] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMeasure();
  }, [num_submission]);

  const fetchMeasure = () => {
    API.get('api/measuretask')
      .then((response) => {
        const data = response.data;
        let u8 = new Uint8Array(data.data.image.data);
        let decoder = new TextDecoder('utf8');
        let b64 = decoder.decode(u8);
        setMeasure({
          _id: data.data._id,
          image: `data:image/png;base64,${b64}`,
        });
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  const handleSubmitClick = () => {
    setNum_submission((prevState) => prevState + 1);
  };

  const handleFinishClick = () => {
    navigate('/thankyou');
  };

  return (
    <React.Fragment>
      <section className="section-02-participant-activity-screen">
          <div className="activity-container">
            <div className="response-counter">
                {num_submission < 4 ?  (<h3>Please submit at least 4 responses </h3>) : (<h3>Thank you for your participation, Now you can continue or click the "Finish" button to leave</h3>)}
            </div>
            
            <div className="image-preview">
                {
                    measure.image !== '' ? (
                        <img src={measure.image} alt="Measure Image" />
                    ) : null
                }
            </div>

            <div className="submit-finish">
                <button onClick={handleSubmitClick}>Submit</button>
                {
                  num_submission >= 4 ? (
                    <button onClick={handleFinishClick}>Finish</button>
                  ) : null
                }
              </div>
          </div>
                

        </section>
    </React.Fragment>
  );
};

export default ParticipantActivityScreen;
