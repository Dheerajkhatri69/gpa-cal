import React from "react";
import GetInput from "../comp/getNumber";
import { useParams } from 'react-router-dom';

const InputPage = () => {
    const { inputno } = useParams();  // Extract inputno from URL parameters

    return (
        <div>
            <GetInput courseNo={inputno} />
        </div>
    );
};

export default InputPage;
