"use client";

import React from "react";
import { ProjectItem } from "./part2";
import { AucahackSandbox } from "./aucahack/aucahack";
import { ProQuizSandbox } from "./proquiz/proquiz";
import { ConuratSandbox } from "./konurat/konurat";

export interface SandboxProps {
    project: ProjectItem;
    isZoomed: boolean;
}

export function InteractiveSandbox({ project, isZoomed }: SandboxProps) {
    if (project.id === "aucahack") {
        return <AucahackSandbox isZoomed={isZoomed} />;
    }
    if (project.id === "proquizkg") {
        return <ProQuizSandbox isZoomed={isZoomed} />;
    }
    return <ConuratSandbox isZoomed={isZoomed} />;
}