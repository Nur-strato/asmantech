"use client";

import React from "react";
import { ProjectItem } from "./part2";
import { AucahackSandbox } from "./inter_aucahack";
import { ProQuizSandbox } from "./inter_proquiz";
import { ConuratSandbox } from "./inter_conurat";

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