import React, {Component} from 'react';

export default class ResearcherAnalytics extends Component {
    render()
    {
        return (
            <React.Fragment>
                <section className="section-01-researcher-analytics">

                    <div className="analytics-container">

                        <div className="image-preview">
                            <p>
                                This section is supposed to contain the overall progress bar and the main generate digital sheet button.
                                <br />
                                The contents will be finalized after the team meeting.
                            </p>
                        </div>

                        <div className="recognition-questions">
                            <div className="question-box">

                                This is supposed to be a repeating component. A single component will repeat itself based on the number of images in the database.
                                The final design is yet to be decided because of change of requirements decided after the survey.
                                <h3>Potential contents:</h3>
                                <br />
                                Column 1: Image <br />
                                Column 2: Multiple columns of users. (Each user may generate different output, because of which the contents of this parts are also not yet decided.)<br />
                                <br />

                                <div className="question">

                                </div>

                                <div className="option">

                                </div>

                            </div>

                        </div>



                    </div>

                </section>
            </React.Fragment>
        );
    }
}

