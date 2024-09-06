"use client";

import { useState } from "react";
import { PlaceholdersAndVanishInput } from "../components/ui/placeholders-and-vanish-input";
import { useNavigate} from "react-router-dom";

export function PlaceholdersAndVanishInputDemo({titel}) {
  const placeholders = [
    "Enter the no Courses:","Enter the no Courses:"
  ];
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e) => {
    // console.log(e.target.value);
    setInputValue(e.target.value)
  };
  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(inputValue)
    setTimeout(() => {

      // navigate(`/gpa-cal/input/${inputValue}`); 
      // navigate(`/gpa-cal/NG/${inputValue}`); 
      navigate(`/gpa-cal/${titel==="NG" ? "NG" : "AG"}/${inputValue}`); 
      
    }, 1000);
  };
  return (
    (<div className="flex flex-col justify-center  items-center px-4 bg-black">
      {/* <h2 data-aos="fade-up"
        className="mb-10 sm:mb-20 text-2xl text-center sm:text-5xl text-secondary">
        Enter the no of Courses
      </h2> */}
      <PlaceholdersAndVanishInput placeholders={placeholders} onChange={handleChange} onSubmit={onSubmit} />
    </div>)
  );
}
