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
                            <h2>Feel free to fill out this post survey, also running a raffle</h2>
                            <a href="https://docs.google.com/forms/d/e/1FAIpQLSeMIvilV2i-5zEedAoZyp_U_3w2GNXJ7mH0E-rp8jRjVrR30A/viewform?usp=sharing"> Post Survey Click Here</a>
                            <h2>We will be in contact with you if you entered the raffle</h2>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}

