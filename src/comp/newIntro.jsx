"use client";
import React from "react";
import { SparklesCore } from "../components/ui/sparkles";
import { PlaceholdersAndVanishInputDemo } from "./input"
export function SparklesPreview() {
    return (
        (<div
            className="min-h-[550px] h-[700px] relative w-full bg-black  flex flex-col items-center justify-center overflow-hidden">
            <div className="w-full absolute inset-0 h-screen">
                <SparklesCore
                    id="tsparticlesfullpage"
                    background="transparent"
                    minSize={0.6}
                    maxSize={1.4}
                    particleDensity={100}
                    className="w-full h-full"
                    particleColor="#FFFFFF" />
            </div>
            <h1 data-aos="zoom-in"
                className="md:text-5xl mb-5 text-4xl lg:text-6xl font-bold text-center text-secondary relative z-20">
                GPA CALCULATOR
            </h1>
            <PlaceholdersAndVanishInputDemo/>
        </div>)
    );
}
