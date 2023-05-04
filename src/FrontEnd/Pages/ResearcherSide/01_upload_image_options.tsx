import React, {Component} from 'react';

export default class ResearcherUploadImageOptions extends Component
{
    render()
    {
        return (
            <React.Fragment>
                <section className="section-01-researcher-upload-image-options">

                    <div className="image-upload">

                        <div className="image-preview">
                            <img src="logo512.png" alt="Preview Image" />
                        </div>

                        <div className="image-upload-form">
                            <label htmlFor="upload-image">Upload Image:</label>
                            <input type="file" id="upload-image" name="upload-image" />
                            <label htmlFor="image-name">Image Name:</label>
                            <input type="text" id="image-name" name="image-name" />
                            <button className="done-button">Done</button>
                        </div>

                    </div>

                </section>
            </React.Fragment>
        );
    }
}

