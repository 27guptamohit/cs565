import React, { Component } from 'react';
import axios from 'axios';
const API = axios.create({ baseURL: "https://cs565-backend-2023.herokuapp.com/" })
type State = {
  measure: {
    _id: string;
    image: string;
  };
  num_submission : number;
};

export default class ParticipantActivityScreen extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      measure: {
        _id: '',
        image: '',
      },
      num_submission : 0
    };
    

  }

  componentDidMount() {
    this.fetchMeasure();
  }

  componentDidUpdate(prevProps: {}, prevState: State) {
    if (prevState.num_submission !== this.state.num_submission) {
      this.fetchMeasure();
    }
  }

  fetchMeasure() {
    API.get('api/measuretask')
      .then((response) => {
        const data = response.data;
        let u8 = new Uint8Array(data.data.image.data);
        let decoder = new TextDecoder('utf8');
        let b64 = decoder.decode(u8);
        this.setState({
          measure: {
            _id: data.data._id,
            image: `data:image/png;base64,${b64}`,
          },
        });
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  handleSubmitClick = () => {
    this.setState((prevState) => ({
      num_submission: prevState.num_submission + 1,
    }));
  };

  render() {
    return (
      <React.Fragment>
        <section className="section-02-participant-activity-screen">
          <div className="activity-container">
            <div className="image-preview">
                {
                    this.state.measure.image !== '' ? (
                        <img src={this.state.measure.image} alt="Measure Image" />
                    ) : null
                }
            </div>
            <div className="recognition-questions">
                <div className="question-box">

                    <div className="question">
                        <h3>
                            The shortlisted questions will be shown here after final discussion.
                        </h3>
                    </div>

                    <div className="option">

                    </div>

                </div>

                <div className="question-box">

                    <div className="question">

                    </div>

                    <div className="option">

                    </div>

                </div>

                <div className="question-box">

                    <div className="question">

                    </div>

                    <div className="option">

                    </div>

                </div>

                <div className="question-box">

                    <div className="question">

                    </div>

                    <div className="option">

                    </div>

                </div>

                <div className="question-box">

                    <div className="question">

                    </div>

                    <div className="option">

                    </div>

                </div>

                <div className="question-box">

                    <div className="question">

                    </div>

                    <div className="option">

                    </div>

                </div>

                <div className="question-box">

                    <div className="question">

                    </div>

                    <div className="option">

                    </div>

                </div>

                <div className="question-box">

                    <div className="question">

                    </div>

                    <div className="option">

                    </div>

                </div>

                <div className="question-box">

                    <div className="question">

                    </div>

                    <div className="option">

                    </div>

                </div>
            </div>
                <button onClick={this.handleSubmitClick}>Submit</button>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
