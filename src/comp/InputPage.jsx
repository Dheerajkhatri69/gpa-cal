import React from "react";
import { useParams } from 'react-router-dom';
import GetInput from "./getNumber";

const InputPage = () => {
    const { inputno } = useParams();  // Extract inputno from URL parameters

    return (
        <div>
            <GetInput courseNo={inputno} />
        </div>
    );
};

export default InputPage;
