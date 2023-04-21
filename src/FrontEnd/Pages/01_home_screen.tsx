import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';


export default class HomeScreen extends Component
{
    render()
    {
        return (
            <React.Fragment>
                <section className="section-01-home-screen">
                    <div>
                            <Button>
                                <h1>Begin Study</h1>
                            </Button>


                            <Button>
                                <h1>Upload Image</h1>
                            </Button>
                    </div>
                </section>
            </React.Fragment>
        );
    }
}


