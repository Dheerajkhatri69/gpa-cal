"use client";

import React, { useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-card";
import { Link } from "react-router-dom";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { html } from "framer-motion/client";
import logoUrl from "./pdf_logo.png"
export function ThreeDCardDemo() {
  const [courseData, setCourseData] = useState([]);

  // Retrieve and map local storage data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('courseData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setCourseData(parsedData);
    }
  }, []);
  const docpdf = new jsPDF();
  const sharepdf = () => {
    // Get the page height
    const pageHeight = docpdf.internal.pageSize.height; // Height of the page in points
    const logoWidth = 30;  // Set the desired width of the logo
    const logoHeight = 30; // Set the desired height of the logo
    const logoX = 10;      // X coordinate (left position of the logo)
    const logoY = pageHeight - logoHeight - 10; // Y coordinate (10 points from the bottom)
  
    // const logoX = (docpdf.internal.pageSize.width - logoWidth) / 2; // Center the logo horizontally

    
    docpdf.text(`  Your Grade:  ${localStorage.getItem('GPAData')}`, 10, 10);
    autoTable(docpdf, {
      html: '#gpa-table',
      theme: 'striped',
      headStyles: {
        fillColor: [205, 194, 165], // Header background color
        textColor: [0, 0, 0], // Header text color
        fontStyle: 'bold', // Bold header text
      },
    });
    docpdf.addImage(logoUrl, 'PNG', logoX, logoY, logoWidth, logoHeight); // Position the image at the bottom

    // Save the PDF
    docpdf.save('dheeraj_gpa.pdf');
    console.log("Share PDF");
  }

  return (
    (<CardContainer className="inter-var">
      <CardBody
        className="bg-secondary relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] container h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-black dark:text-white">
          Your Grade:{" "}
          <span
            className="px-1 rounded-md bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 border border-gray-200">
            {localStorage.getItem('GPAData')}
          </span>
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-800 text-sm max-w-sm mt-2 dark:text-neutral-300">
          GradeTable
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Table aria-label="Example static collection table" id="gpa-table" className="object-cover rounded-xl group-hover/card:shadow-xl">
            <TableHeader>
              <TableColumn>CreditHours</TableColumn>
              <TableColumn>Main</TableColumn>
              <TableColumn>Lab</TableColumn>
            </TableHeader>
            <TableBody>
              {courseData.map((grade, index) => (
                <TableRow key={index}>
                  <TableCell>{grade.creditHours}</TableCell>
                  <TableCell>{grade.mainGrade}</TableCell>
                  <TableCell>{grade.labGrade === null ? "-" : grade.labGrade}</TableCell>
                  {/* <TableCell>{typeof grade.gpa === 'number' ? grade.gpa.toFixed(2) : grade.gpa}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem translateZ={30}>
            <button onClick={() => { window.history.back() }} className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-normal dark:text-white"><FaArrowAltCircleLeft />Back</button>
          </CardItem>
          <CardItem
            onClick={sharepdf}
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold">
            Share
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>)
  );
}
