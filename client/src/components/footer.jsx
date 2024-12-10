import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';

const Footer = () => {
    // const location = useLocation();
    // const navigate = useNavigate();
    return (
        <footer className="footer">
            <div>
                <p>Created by <a href="https://github.com/lvdean">Lauren Dean</a> | <a href="https://github.com/jocelynnrd">Jocelyn Del Castillo</a> | <a href="https://github.com/tmcdaniel94">Taylor McDaniel</a> | <a href="https://github.com/nramos9071">Nicholas Ramos</a> | <a href="https://github.com/Br1dg3tt">Bridgett Rice</a> Copyright 2024</p>
            </div>
        </footer>
    );
};

export default Footer;