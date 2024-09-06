import React from 'react'
import Smiu from '../comp/Smiu';
import { useParams } from 'react-router-dom';

const SmiuPage = () => {
    const { inputno } = useParams();  // Extract inputno from URL parameters

    return (
        <div>
            <Smiu courseNo={inputno} />
        </div>
    );
}

export default SmiuPage
