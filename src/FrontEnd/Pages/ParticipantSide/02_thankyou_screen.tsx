import React, {Component} from 'react';

export default class ThankyouScreen extends Component
{
    render()
    {
        return (
            <React.Fragment>
                <section className="thankyou-screen">
                    <div>                       
                        <h1>Thank you for your participation!</h1>
                        <p>
                            If you have additional time, there is a separate opportunity to win another $10 Amazon gift card!
                            Click the button below to be taken to a Google Form that will ask a few other questions about your experience. Feel free to share the study with anyone else who may be interested!
                        </p>
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLSeMIvilV2i-5zEedAoZyp_U_3w2GNXJ7mH0E-rp8jRjVrR30A/viewform?usp=sharing"> Post-study Survey</a>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

