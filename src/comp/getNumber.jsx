import React, { useState } from "react";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { AnimatedModalDemo } from "./result";
import { useNavigate } from "react-router-dom";

export default function GetInput({ courseNo }) {
    const [labVisibility, setLabVisibility] = useState(Array(Number(courseNo)).fill(false));
    const [creditHours, setCreditHours] = useState(Array(Number(courseNo)).fill(0));
    const [gradePoints, setGradePoints] = useState(Array(Number(courseNo)).fill({ main: 0, lab: 0 }));
    const [gpa, setGpa] = useState(null);

    const Cradit = [
        { key: 3, label: "3" },
        { key: 4, label: "4" }
    ];

    const handleCreditChange = (index, e) => {
        const newLabVisibility = [...labVisibility];
        const newCreditHours = [...creditHours];
        newCreditHours[index] = Number(e);
        newLabVisibility[index] = Number(e) === 4;
        setLabVisibility(newLabVisibility);
        setCreditHours(newCreditHours);
    };

    const handleGradeChange = (index, type, e) => {
        const newGradePoints = [...gradePoints];
        newGradePoints[index] = {
            ...newGradePoints[index],
            [type]: Number(e.target.value)
        };
        setGradePoints(newGradePoints);
    };
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const calculateGPA = () => {
        setIsLoading(true);
        setTimeout(() => {
            let totalCreditHours = 0;
            let totalGradePoints = 0;

            // Array to hold the data for each course
            const courseDataArray = [];

            for (let i = 0; i < courseNo; i++) {
                let courseData = {
                    courseNumber: i + 1,
                    creditHours: creditHours[i],
                    mainGrade: gradePoints[i].main,
                    labGrade: labVisibility[i] ? gradePoints[i].lab : null
                };

                if (creditHours[i] === 4) {
                    // 4 credit hours split: 3 for main, 1 for lab
                    totalCreditHours += 3; // main subject
                    totalGradePoints += 3 * gradePoints[i].main; // main subject grade points

                    totalCreditHours += 1; // lab subject
                    totalGradePoints += 1 * gradePoints[i].lab; // lab subject grade points
                } else {
                    totalCreditHours += creditHours[i];
                    totalGradePoints += creditHours[i] * gradePoints[i].main;
                }

                // Add the course data to the array
                courseDataArray.push(courseData);
            }

            // Calculate GPA
            const gpa = totalGradePoints / totalCreditHours;
            setGpa(gpa.toFixed(2));

            // Store course data array in localStorage
            localStorage.setItem("courseData", JSON.stringify(courseDataArray));
            localStorage.setItem("GPAData", JSON.stringify(gpa.toFixed(2)));
            // console.log("array obj:", courseDataArray)

            // alert(`Your GPA is: ${gpa.toFixed(2)}`);

            navigate(`/gpa-cal/result/${gpa.toFixed(2)}`);

        }, 1000);
    };

    return (
        <div className="w-full flex flex-col gap-4 container mb-20">
            <h1 data-aos="zoom-in" className="mt-4 text-center text-secondary font-bold text-2xl sm:text-5xl">Enter Your Grades</h1>
            <div className="container mb-4 w-full flex justify-center"><AnimatedModalDemo /></div>
            {[...Array(Number(courseNo))].map((_, i) => (
                <div key={i} className="w-full grid grid-cols-2 gap-4">
                    <Select label="Select Credit Hours" className="w-full" onChange={(e) => handleCreditChange(i, e.target.value)}>
                        {Cradit.map((option) => (
                            <SelectItem key={option.key} value={option.key}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </Select>
                    <span>
                        <Input
                            type="number"
                            label="0-4 Grade (Main Subject)"
                            onChange={(e) => handleGradeChange(i, 'main', e)}
                            className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <Input
                            className={`${labVisibility[i] ? "" : "hidden"} mt-2 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                            type="number"
                            label="Lab Grade"
                            onChange={(e) => handleGradeChange(i, 'lab', e)}
                        />
                    </span>
                </div>
            ))}
            <div className="w-full flex justify-center">
                <Button
                    radius="full"
                    className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                    onClick={calculateGPA}
                    isLoading={isLoading}
                >
                    Show result
                </Button>
            </div>
            {gpa !== null && (
                <div className="w-full flex justify-center mt-4 text-cyan-400">
                    <h2>Your GPA is: {gpa}</h2>
                </div>
            )}
        </div>
    );
}
