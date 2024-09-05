import React from 'react'
import { useParams } from 'react-router-dom';
import { ThreeDCardDemo } from '../comp/ShowResult';

const ResultPage = () => {
    const { result } = useParams();  // Extract inputno from URL parameters

    return (
        <div>
            <ThreeDCardDemo/>
        </div>
    );
}

export default ResultPage
