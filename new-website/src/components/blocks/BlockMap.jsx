// react
import React from 'react';

export default function BlockMap() {
    return (
        <div className="block-map block">
            <div className="block-map__body">
                <iframe
                    title="Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3563.5888199462433!2d85.94169914998172!3d26.72557987447386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ec3f9ad560453b%3A0x9b986e06b8562553!2sChitwa%20Shop!5e0!3m2!1sen!2sin!4v1616615816392!5m2!1sen!2sin"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                />
            </div>
        </div>
    );
}
