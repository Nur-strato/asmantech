"use client";

import React, { useState } from "react";
import { Sliders, Activity } from "lucide-react";

export function ConuratSandbox({ isZoomed }: { isZoomed: boolean }) {
    const [concreteVol, setConcreteVol] = useState<number>(140);
    const [subSection, setSubSection] = useState<"calc" | "logistics">("calc");

    if (!isZoomed) {
        return (
            <div className="flex-1 bg-black p-3.5 text-white flex flex-col justify-between overflow-hidden select-none font-mono">
                <div className="flex justify-between items-center text-[10px]">
                    <span className="font-semibold text-neutral-300 tracking-tight">CONURAT ERP</span>
                    <span className="text-white/70 text-[9px] px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800">BIM 4D</span>
                </div>
                <div className="p-3 bg-neutral-900/90 rounded-xl border border-neutral-800 text-[10px] space-y-1">
                    <div className="text-neutral-400 text-[9px] uppercase tracking-wider">Logistics CAD</div>
                    <div className="font-bold text-white text-xs sm:text-sm">B25 Concrete Calculator</div>
                </div>
                <div className="text-[9px] text-neutral-500 flex justify-between pt-1 border-t border-neutral-900">
                    <span>14 Active Sites</span>
                    <span className="text-emerald-400">● Live Sync</span>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 bg-[#0A0A0A] text-white flex flex-col overflow-hidden select-text text-left font-mono">
            <div className="h-8 bg-neutral-950/90 border-b border-white/10 px-4 flex items-center justify-between text-xs shrink-0">
                <div className="flex items-center gap-2.5 text-neutral-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-bold tracking-wider">CONURAT_ERP // SPECIFICATIONS</span>
                </div>
                <div className="text-neutral-500 text-[11px]">BIM REALTIME</div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                <div className="w-36 sm:w-44 bg-black border-r border-white/10 p-3 space-y-1.5 text-xs shrink-0">
                    <button
                        type="button"
                        onClick={() => setSubSection("calc")}
                        className={`w-full text-left p-2 rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
                            subSection === "calc" ? "bg-white text-black font-bold shadow-md" : "text-neutral-400 hover:text-white"
                        }`}
                    >
                        <Sliders size={14} />
                        <span>Смета BIM</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setSubSection("logistics")}
                        className={`w-full text-left p-2 rounded-lg transition-all cursor-pointer flex items-center gap-2 ${
                            subSection === "logistics" ? "bg-white text-black font-bold shadow-md" : "text-neutral-400 hover:text-white"
                        }`}
                    >
                        <Activity size={14} />
                        <span>Логистика</span>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 text-sm [scrollbar-width:none]">
                    {subSection === "calc" ? (
                        <div className="space-y-4 max-w-xl">
                            <div className="text-xs text-neutral-400 border-b border-white/10 pb-2 flex justify-between">
                                <span className="uppercase tracking-wider">Интерактивный расчет бетона B25</span>
                                <span className="text-emerald-400 font-bold text-base">${concreteVol * 94}</span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span>Объем для заливки перекрытий:</span>
                                    <span className="text-white font-bold text-sm">{concreteVol} м³</span>
                                </div>
                                <input
                                    type="range"
                                    min="20"
                                    max="500"
                                    value={concreteVol}
                                    onChange={(e) => setConcreteVol(Number(e.target.value))}
                                    className="w-full accent-white cursor-pointer h-2 bg-neutral-800 rounded-lg"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <div className="p-3 rounded-xl bg-white/5 text-xs text-neutral-400">
                                    <div>Масса партии:</div>
                                    <div className="text-white font-bold text-sm mt-0.5">{(concreteVol * 2.4).toFixed(1)} тонн</div>
                                </div>
                                <div className="p-3 rounded-xl bg-white/5 text-xs text-neutral-400">
                                    <div>Логистика (миксеры 8м³):</div>
                                    <div className="text-white font-bold text-sm mt-0.5">{Math.ceil(concreteVol / 8)} рейсов</div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-3 text-xs">
                            <div className="text-neutral-400 border-b border-white/10 pb-2 uppercase tracking-wider">
                                Мониторинг 14 строительных площадок в реальном времени
                            </div>
                            <div className="p-3 rounded-xl bg-white/5 flex justify-between items-center">
                                <span>Объект «Север 01» (Монолитные работы)</span>
                                <span className="text-emerald-400 font-bold">2 миксера в пути (16м³)</span>
                            </div>
                            <div className="p-3 rounded-xl bg-white/5 flex justify-between items-center">
                                <span>ЖК «Ала-Тоо» (Блок 3)</span>
                                <span className="text-white">КС-2 Подписано Технадзором</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ConuratSandbox;