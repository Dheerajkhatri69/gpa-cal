import React, { useState } from "react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Select, SelectItem } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { AnimatedModalDemo } from "./result";
import { useNavigate } from "react-router-dom";

export default function Smiu({ courseNo }) {
    const [labVisibility, setLabVisibility] = useState(Array(Number(courseNo)).fill(false));
    const [creditHours, setCreditHours] = useState(Array(Number(courseNo)).fill(0));
    const [gradePoints, setGradePoints] = useState(Array(Number(courseNo)).fill({ main: 0, lab: 0 }));
    const [gpa, setGpa] = useState(null);

    const Cradit = [
        { key: 3, label: "3" },
        { key: 4, label: "4" }
    ];

    const gradeTable = [
        { numericalGrade: "91% - 100%", alphabeticalGrade: "A", gpa: 4.00 },
        { numericalGrade: "80% - 90%", alphabeticalGrade: "A-", gpa: 3.66 },
        { numericalGrade: "75% - 79%", alphabeticalGrade: "B+", gpa: 3.33 },
        { numericalGrade: "71% - 74%", alphabeticalGrade: "B", gpa: 3.00 },
        { numericalGrade: "68% - 70%", alphabeticalGrade: "B-", gpa: 2.66 },
        { numericalGrade: "64% - 67%", alphabeticalGrade: "C+", gpa: 2.33 },
        { numericalGrade: "61% - 63%", alphabeticalGrade: "C", gpa: 2.00 },
        { numericalGrade: "58% - 60%", alphabeticalGrade: "C-", gpa: 1.66 },
        { numericalGrade: "54% - 57%", alphabeticalGrade: "D+", gpa: 1.33 },
        { numericalGrade: "50% - 53%", alphabeticalGrade: "D", gpa: 1.00 },
        { numericalGrade: "Below 50%", alphabeticalGrade: "F", gpa: 0.00 }
    ];

    // Function to get GPA based on numerical grade
    const getGPAFromNumericalGrade = (grade) => {
        if (grade >= 91) return { gpa: 4.00, grade: "A" };
        if (grade >= 80) return { gpa: 3.66, grade: "A-" };
        if (grade >= 75) return { gpa: 3.33, grade: "B+" };
        if (grade >= 71) return { gpa: 3.00, grade: "B" };
        if (grade >= 68) return { gpa: 2.66, grade: "B-" };
        if (grade >= 64) return { gpa: 2.33, grade: "C+" };
        if (grade >= 61) return { gpa: 2.00, grade: "C" };
        if (grade >= 58) return { gpa: 1.66, grade: "C-" };
        if (grade >= 54) return { gpa: 1.33, grade: "D+" };
        if (grade >= 50) return { gpa: 1.00, grade: "D" };
        return { gpa: 0.00, grade: "F" };
    };

    const handleCreditChange = (index, e) => {
        const newLabVisibility = [...labVisibility];
        const newCreditHours = [...creditHours];
        newCreditHours[index] = Number(e);
        newLabVisibility[index] = Number(e) === 4;
        setLabVisibility(newLabVisibility);
        setCreditHours(newCreditHours);
    };

    const handleGradeChange = (index, type, e) => {
        const numericalGrade = Number(e.target.value); // Get numerical grade
        const gradeData = getGPAFromNumericalGrade(numericalGrade); // Convert to GPA

        const newGradePoints = [...gradePoints];
        newGradePoints[index] = {
            ...newGradePoints[index],
            [type]: gradeData.gpa // Use GPA from the mapping
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

            navigate(`/gpa-cal/result/${gpa.toFixed(2)}`);

        }, 1000);
    };
    return (
        <div className="w-full flex flex-col gap-4 container mb-20">
            <h1 data-aos="zoom-in" className="mt-4 text-center text-secondary font-bold text-2xl sm:text-5xl">Enter Your Numerical Grade</h1>
            <div className="container mb-4 w-full flex justify-center"><AnimatedModalDemo /></div>
            <Dropdown backdrop="blur">
                <DropdownTrigger className="bg-secondary max-w-[100px] border-none">
                    <Button
                        variant="bordered"
                    >
                        Mode
                    </Button>
                </DropdownTrigger>
                <DropdownMenu variant="faded" aria-label="Static Actions">
                    <DropdownItem key="Numerical Grade"  className="grid grid-cols-2 bg-secondary"  onClick={()=>{navigate(`/gpa-cal/NG/${courseNo}`)}} >Numerical Grade</DropdownItem>
                    <DropdownItem key="Grade Point" onClick={()=>{navigate(`/gpa-cal/AG/${courseNo}`)}}>Grade Point</DropdownItem>
                </DropdownMenu>
            </Dropdown>
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
                            label="1-100 (Numerical Grade)"
                            onKeyDown={() => { }}
                            onChange={(e) => handleGradeChange(i, 'main', e)}
                            className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <Input
                            className={`${labVisibility[i] ? "" : "hidden"} mt-2 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                            type="number"
                            label="1-100 (Lab)"
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
