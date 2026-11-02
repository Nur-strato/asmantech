"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
    Building2,
    MonitorPlay,
    Box,
    ArrowRight,
    RotateCw,
    ZoomIn,
    Palette,
    Eye,
    Maximize2,
    X,
} from "lucide-react";

// =========================================================================
// 01. РЕАЛЬНЫЙ 3D МОКАП: АРХИТЕКТУРНАЯ ВИЛЛА (CANTILEVER LUXURY VILLA)
// =========================================================================
function RealArchCanvas({ onZoom }: { onZoom: () => void }) {
    const mountRef = useRef<HTMLDivElement>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const targetAngleRef = useRef<{ x: number; y: number; z: number }>({ x: 0, y: 1.4, z: 6.2 });

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const scene = new THREE.Scene();
        const width = mount.clientWidth || 360;
        const height = mount.clientHeight || 260;

        const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
        camera.position.set(0, 1.4, 6.2);
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.35;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        mount.appendChild(renderer.domElement);

        // --- МАТЕРИАЛЫ АРХИТЕКТУРЫ ---
        const darkConcrete = new THREE.MeshStandardMaterial({
            color: 0x1f232b,
            roughness: 0.7,
            metalness: 0.15,
        });

        const whiteStucco = new THREE.MeshStandardMaterial({
            color: 0xdcdfe4,
            roughness: 0.6,
        });

        const teakWood = new THREE.MeshStandardMaterial({
            color: 0x854d27,
            roughness: 0.45,
        });

        const structuralSteel = new THREE.MeshStandardMaterial({
            color: 0x111317,
            metalness: 0.9,
            roughness: 0.2,
        });

        const glassMat = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            metalness: 0.05,
            roughness: 0.05,
            transmission: 0.92,
            transparent: true,
            opacity: 0.85,
            reflectivity: 0.9,
        });

        const warmLightMat = new THREE.MeshBasicMaterial({
            color: 0xfde047,
        });

        const poolWaterMat = new THREE.MeshPhysicalMaterial({
            color: 0x0ea5e9,
            metalness: 0.1,
            roughness: 0.08,
            transmission: 0.75,
            transparent: true,
            opacity: 0.85,
        });

        const archGroup = new THREE.Group();
        archGroup.position.set(0, -0.35, 0);
        scene.add(archGroup);

        // 1. Подиум ландшафта и отмостка
        const ground = new THREE.Mesh(new THREE.BoxGeometry(6.2, 0.22, 4.4), darkConcrete);
        ground.position.y = -0.7;
        ground.receiveShadow = true;
        archGroup.add(ground);

        // Терраса из тикового дерева
        const deck = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.06, 2.4), teakWood);
        deck.position.set(-0.8, -0.56, 0.6);
        deck.receiveShadow = true;
        archGroup.add(deck);

        // Бассейн Infinity
        const pool = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.08, 1.8), poolWaterMat);
        pool.position.set(1.6, -0.57, 0.8);
        archGroup.add(pool);

        // Бортик бассейна
        const poolRim = new THREE.Mesh(new THREE.BoxGeometry(2.15, 0.1, 1.95), whiteStucco);
        poolRim.position.set(1.6, -0.64, 0.8);
        archGroup.add(poolRim);

        // 2. Первый этаж — прозрачный стеклянный павильон
        const groundFloorGlass = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.1, 2.2), glassMat);
        groundFloorGlass.position.set(-0.5, 0.0, -0.2);
        archGroup.add(groundFloorGlass);

        // Тёплый светящийся блок интерьера (кухня-гостиная)
        const interiorCeilingGlow = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.05, 1.6), warmLightMat);
        interiorCeilingGlow.position.set(-0.5, 0.48, -0.2);
        archGroup.add(interiorCeilingGlow);

        const interiorCouch = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.25, 0.6), darkConcrete);
        interiorCouch.position.set(-0.8, -0.4, 0.2);
        archGroup.add(interiorCouch);

        // Парящая внутренняя лестница
        for (let i = 0; i < 6; i++) {
            const step = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.04, 0.16), teakWood);
            step.position.set(0.6, -0.4 + i * 0.15, -0.6 + i * 0.15);
            archGroup.add(step);
        }

        // Вертикальные колонны из черной стали
        const pillarGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.1, 16);
        [-2.2, 1.2].forEach((x) => {
            const pillar = new THREE.Mesh(pillarGeo, structuralSteel);
            pillar.position.set(x, 0.0, 0.8);
            pillar.castShadow = true;
            archGroup.add(pillar);
        });

        // 3. Межэтажное железобетонное перекрытие с вылетом
        const slabMid = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.16, 3.2), whiteStucco);
        slabMid.position.set(-0.2, 0.6, 0.1);
        slabMid.castShadow = true;
        slabMid.receiveShadow = true;
        archGroup.add(slabMid);

        // 4. Второй этаж — парящая консоль (выступает на 1.4м над бассейном)
        const upperBox = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.05, 2.4), darkConcrete);
        upperBox.position.set(0.4, 1.18, 0.2);
        upperBox.castShadow = true;
        upperBox.receiveShadow = true;
        archGroup.add(upperBox);

        // Панорамное окно спальни второго этажа
        const upperWindow = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.8, 0.06), glassMat);
        upperWindow.position.set(0.6, 1.18, 1.42);
        archGroup.add(upperWindow);

        // Теплый свет в спальне
        const upperGlow = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.04, 1.2), warmLightMat);
        upperGlow.position.set(0.6, 1.62, 0.3);
        archGroup.add(upperGlow);

        // Деревянные фасадные ламели (brise-soleil)
        const louverGeo = new THREE.BoxGeometry(0.04, 0.85, 0.15);
        for (let i = 0; i < 9; i++) {
            const louver = new THREE.Mesh(louverGeo, teakWood);
            louver.position.set(-0.4 + i * 0.18, 1.18, 1.44);
            archGroup.add(louver);
        }

        // Финальная кровля второго этажа
        const topRoof = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.14, 2.8), whiteStucco);
        topRoof.position.set(0.4, 1.76, 0.2);
        topRoof.castShadow = true;
        archGroup.add(topRoof);

        // 5. Детали окружения: шезлонги у бассейна
        for (let i = 0; i < 2; i++) {
            const lounger = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.08, 0.8), whiteStucco);
            lounger.position.set(0.2 + i * 0.5, -0.48, 1.4);
            lounger.rotation.y = -0.15;
            archGroup.add(lounger);
        }

        // --- СТУДИЙНЫЙ ВЕЧЕРНИЙ СВЕТ (GOLDEN HOUR + INTERIOR) ---
        const ambient = new THREE.AmbientLight(0x0f172a, 1.8);
        scene.add(ambient);

        // Тёплое закатное солнце
        const sunLight = new THREE.DirectionalLight(0xf59e0b, 3.8);
        sunLight.position.set(4, 3.5, 3);
        sunLight.castShadow = true;
        scene.add(sunLight);

        // Холодный контровой свет неба
        const skyLight = new THREE.DirectionalLight(0x38bdf8, 2.0);
        skyLight.position.set(-3.5, 3, -3);
        scene.add(skyLight);

        // Локальное свечение интерьера первого этажа
        const interiorPoint = new THREE.PointLight(0xfde047, 4.5, 5);
        interiorPoint.position.set(-0.5, 0.1, 0.0);
        scene.add(interiorPoint);

        // Подводная подсветка бассейна
        const poolPoint = new THREE.PointLight(0x38bdf8, 3.0, 3);
        poolPoint.position.set(1.6, -0.6, 0.8);
        scene.add(poolPoint);

        // Драг мышью (вращение сцены)
        let isDragging = false;
        let prevMouseX = 0;
        let rotY = -0.3;

        const handleMouseDown = (e: MouseEvent) => {
            isDragging = true;
            prevMouseX = e.clientX;
        };
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;
            const delta = e.clientX - prevMouseX;
            rotY += delta * 0.009;
            prevMouseX = e.clientX;
        };
        const handleMouseUp = () => {
            isDragging = false;
        };

        mount.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        let animId: number;
        const animate = () => {
            animId = requestAnimationFrame(animate);

            if (!isDragging) {
                rotY += 0.0018; // Плавное синематик-вращение
            }
            archGroup.rotation.y = rotY;

            // Плавное переключение ракурсов камеры
            camera.position.x += (targetAngleRef.current.x - camera.position.x) * 0.06;
            camera.position.y += (targetAngleRef.current.y - camera.position.y) * 0.06;
            camera.position.z += (targetAngleRef.current.z - camera.position.z) * 0.06;
            camera.lookAt(0, 0.25, 0);

            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            if (!mount) return;
            const w = mount.clientWidth;
            const h = mount.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        const ro = new ResizeObserver(handleResize);
        ro.observe(mount);

        return () => {
            mount.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
            ro.disconnect();
            cancelAnimationFrame(animId);
            if (mount.contains(renderer.domElement)) {
                mount.removeChild(renderer.domElement);
            }
            renderer.dispose();
            ground.geometry.dispose();
            deck.geometry.dispose();
            pool.geometry.dispose();
            groundFloorGlass.geometry.dispose();
            upperBox.geometry.dispose();
        };
    }, []);

    const setPresetAngle = (preset: number) => {
        if (preset === 0) targetAngleRef.current = { x: 0, y: 1.4, z: 6.2 }; // Фронтальный фасад
        if (preset === 1) targetAngleRef.current = { x: 3.6, y: 3.0, z: 4.8 }; // Сверху 45° на бассейн
        if (preset === 2) targetAngleRef.current = { x: -3.4, y: 0.6, z: 4.4 }; // Ракурс террасы
    };

    return (
        <div className="relative w-full h-[255px] sm:h-[275px] rounded-[24px] overflow-hidden bg-gradient-to-b from-[#090d16] to-[#04060a] border border-neutral-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.06)] select-none group">
            {/* 3D Canvas */}
            <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

            {/* Бейдж 3D RENDER слева снизу */}
            <div className="absolute bottom-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white font-mono text-[9px] uppercase tracking-wider font-semibold z-10 pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8] animate-pulse" />
                <span className="font-sans font-medium text-[9.5px]">3D RENDER</span>
            </div>

            {/* Кнопка «Увеличить» по центру снизу */}
            <button
                type="button"
                onClick={onZoom}
                className="absolute bottom-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-black/55 hover:bg-black/80 text-white/90 hover:text-white backdrop-blur-md border border-white/20 text-[10.5px] font-sans font-medium tracking-wide transition-all duration-200 shadow-md hover:scale-105 cursor-pointer z-20 active:scale-95"
            >
                <Maximize2 size={12} className="opacity-80" />
                <span>Увеличить</span>
            </button>

            {/* Боковой стек переключения ракурсов камеры */}
            <div className="absolute top-3.5 bottom-3.5 right-3.5 w-12 sm:w-[50px] flex flex-col justify-between items-center z-10">
                <div className="flex flex-col gap-1.5 w-full">
                    {[
                        { label: "FRONT", preset: 0 },
                        { label: "POOL 45°", preset: 1 },
                        { label: "DECK", preset: 2 },
                    ].map((item, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => setPresetAngle(item.preset)}
                            className="w-full aspect-square rounded-[10px] bg-white/10 hover:bg-white/25 border border-white/30 backdrop-blur-md flex flex-col items-center justify-center text-[7.5px] font-mono text-white/90 font-bold transition-all shadow-xs cursor-pointer active:scale-95"
                            title={`Камера: ${item.label}`}
                        >
                            <span>CAM</span>
                            <span className="text-[9px] text-[#38bdf8]">0{idx + 1}</span>
                        </button>
                    ))}
                </div>

                <div className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xs transition-colors cursor-pointer">
                    <ArrowRight size={13} />
                </div>
            </div>
        </div>
    );
}

// =========================================================================
// 02. РЕАЛЬНЫЙ 3D МОКАП: WEB 3D DESIGN (ХРОМИРОВАННАЯ 3D-ЛЕНТА)
// =========================================================================
function RealWeb3DCanvas({ onZoom }: { onZoom: () => void }) {
    const mountRef = useRef<HTMLDivElement>(null);
    const knotRef = useRef<THREE.Mesh | null>(null);
    const knotMatRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const isAutoRotating = useRef(true);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const scene = new THREE.Scene();
        const width = mount.clientWidth || 360;
        const height = mount.clientHeight || 260;

        const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
        camera.position.set(0, 0, 4.4);
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        mount.appendChild(renderer.domElement);

        // Реальный жидкий хром (Liquid Chrome Ribbon)
        const geometry = new THREE.TorusKnotGeometry(1.0, 0.28, 128, 32, 2, 3);
        const chromeMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x93c5fd,
            metalness: 0.95,
            roughness: 0.12,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            reflectivity: 1.0,
        });
        knotMatRef.current = chromeMaterial;

        const knotMesh = new THREE.Mesh(geometry, chromeMaterial);
        knotMesh.position.set(0.1, -0.05, 0);
        knotRef.current = knotMesh;
        scene.add(knotMesh);

        // Студийный холодный свет
        const ambient = new THREE.AmbientLight(0xffffff, 1.2);
        scene.add(ambient);

        const keyLight = new THREE.DirectionalLight(0x38bdf8, 4.5);
        keyLight.position.set(3, 4, 3);
        scene.add(keyLight);

        const fillViolet = new THREE.PointLight(0x818cf8, 4.0, 10);
        fillViolet.position.set(-3, -2, 2);
        scene.add(fillViolet);

        const rimLight = new THREE.DirectionalLight(0xffffff, 3.0);
        rimLight.position.set(0, -4, -2);
        scene.add(rimLight);

        // Драг мышью
        let isDragging = false;
        let prevX = 0;
        let prevY = 0;

        const handleMouseDown = (e: MouseEvent) => {
            isDragging = true;
            prevX = e.clientX;
            prevY = e.clientY;
        };
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging || !knotRef.current) return;
            const dx = e.clientX - prevX;
            const dy = e.clientY - prevY;
            knotRef.current.rotation.y += dx * 0.01;
            knotRef.current.rotation.x += dy * 0.01;
            prevX = e.clientX;
            prevY = e.clientY;
        };
        const handleMouseUp = () => {
            isDragging = false;
        };

        mount.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        let animId: number;
        const animate = () => {
            animId = requestAnimationFrame(animate);
            if (isAutoRotating.current && knotRef.current && !isDragging) {
                knotRef.current.rotation.y += 0.012;
                knotRef.current.rotation.x += 0.008;
            }
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            if (!mount) return;
            const w = mount.clientWidth;
            const h = mount.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        const ro = new ResizeObserver(handleResize);
        ro.observe(mount);

        return () => {
            mount.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
            ro.disconnect();
            cancelAnimationFrame(animId);
            if (mount.contains(renderer.domElement)) {
                mount.removeChild(renderer.domElement);
            }
            renderer.dispose();
            geometry.dispose();
        };
    }, []);

    // Интерактивные функции инструментов панели
    const toggleRotate = () => {
        isAutoRotating.current = !isAutoRotating.current;
    };
    const toggleZoom = () => {
        if (!cameraRef.current) return;
        cameraRef.current.position.z = cameraRef.current.position.z === 4.4 ? 3.4 : 4.4;
    };
    const cycleColor = () => {
        if (!knotMatRef.current) return;
        const colors = [0x93c5fd, 0xe879f9, 0x34d399, 0xfbbf24];
        const next = colors[Math.floor(Math.random() * colors.length)];
        knotMatRef.current.color.setHex(next);
    };
    const resetView = () => {
        if (!knotRef.current || !cameraRef.current) return;
        knotRef.current.rotation.set(0, 0, 0);
        cameraRef.current.position.set(0, 0, 4.4);
    };

    return (
        <div className="relative w-full h-[255px] sm:h-[275px] rounded-[24px] overflow-hidden bg-[#07090e] border border-neutral-800/90 p-4 text-white flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.06)] select-none group">
            {/* Верхний бар интерфейса */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2 z-10">
                <span className="font-extrabold text-[9px] tracking-wider uppercase text-white font-sans">
                    ASMAN TECH
                </span>
                <div className="flex items-center gap-2 sm:gap-2.5 text-[7px] text-neutral-400 font-sans">
                    <span>Home</span>
                    <span>Services</span>
                    <span>About</span>
                    <span>Contact</span>
                </div>
                <div className="px-2 py-0.5 rounded-full bg-[#2563eb] text-[7px] font-bold text-white shadow-xs">
                    Get Started
                </div>
            </div>

            {/* Левый заголовок поверх Three.js */}
            <div className="absolute top-14 left-4 z-10 pointer-events-none space-y-1">
                <h4 className="text-base sm:text-[18px] font-black leading-[1.05] tracking-tight font-sans">
                    Ideas <br />
                    into <br />
                    <span className="text-[#3b82f6]">3D Reality</span>
                </h4>
                <p className="text-[6.5px] sm:text-[7px] text-neutral-400 leading-tight max-w-[110px]">
                    Interactive 3D experiences for your digital products.
                </p>
            </div>

            {/* 3D Canvas */}
            <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

            {/* Панель живых инструментов справа */}
            <div className="absolute top-12 right-3.5 z-20 flex flex-col gap-1 w-[72px]">
                {[
                    { icon: RotateCw, label: "Rotate", action: toggleRotate },
                    { icon: ZoomIn, label: "Zoom", action: toggleZoom },
                    { icon: Palette, label: "Color", action: cycleColor },
                    { icon: Eye, label: "Reset", action: resetView },
                ].map((tool, idx) => {
                    const ToolIcon = tool.icon;
                    return (
                        <button
                            key={idx}
                            type="button"
                            onClick={tool.action}
                            className="flex items-center gap-1.5 px-2 py-1 rounded-[7px] bg-[#161d2b]/90 hover:bg-[#20293d] border border-white/15 text-[7px] font-sans text-neutral-200 shadow-sm transition-all cursor-pointer active:scale-95"
                        >
                            <ToolIcon size={9} className="text-[#38bdf8] shrink-0" />
                            <span className="font-medium">{tool.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Кнопка «Увеличить» по центру снизу */}
            <button
                type="button"
                onClick={onZoom}
                className="absolute bottom-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white backdrop-blur-md border border-white/20 text-[10.5px] font-sans font-medium tracking-wide transition-all duration-200 shadow-md hover:scale-105 cursor-pointer z-20 active:scale-95"
            >
                <Maximize2 size={12} className="opacity-80" />
                <span>Увеличить</span>
            </button>

            {/* Нижний статус-бар */}
            <div className="flex items-center justify-between pt-1 border-t border-white/5 text-[6.5px] font-mono text-neutral-500 z-10 pointer-events-none">
                <span>WebGL 2.0 • Three.js</span>
                <span className="text-emerald-400 font-bold">60 FPS Locked</span>
            </div>
        </div>
    );
}

// =========================================================================
// 03. РЕАЛЬНЫЙ 3D МОКАП: 3D PRODUCT (НАУШНИКИ 360° СО СМЕНОЙ МАТЕРИАЛА)
// =========================================================================
function RealProductCanvas({ onZoom }: { onZoom: () => void }) {
    const mountRef = useRef<HTMLDivElement>(null);
    const productGroupRef = useRef<THREE.Group | null>(null);
    const bodyMatRef = useRef<THREE.MeshStandardMaterial | null>(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const scene = new THREE.Scene();
        const width = mount.clientWidth || 360;
        const height = mount.clientHeight || 260;

        const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
        camera.position.set(0, 0.3, 4.8);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.3;
        renderer.shadowMap.enabled = true;
        mount.appendChild(renderer.domElement);

        // --- ГРУППА НАУШНИКОВ ---
        const productGroup = new THREE.Group();
        productGroupRef.current = productGroup;
        scene.add(productGroup);

        // Студийный подиум
        const pedestal = new THREE.Mesh(
            new THREE.CylinderGeometry(1.4, 1.5, 0.2, 48),
            new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.7 })
        );
        pedestal.position.y = -0.95;
        scene.add(pedestal);

        // Материал наушников
        const earphoneBodyMat = new THREE.MeshStandardMaterial({
            color: 0x18181b, // По умолчанию Space Gray
            metalness: 0.85,
            roughness: 0.25,
        });
        bodyMatRef.current = earphoneBodyMat;

        const cushionMat = new THREE.MeshStandardMaterial({
            color: 0x09090b,
            roughness: 0.7,
            metalness: 0.1,
        });
        const metalAccentMat = new THREE.MeshStandardMaterial({
            color: 0xd4d4d8,
            metalness: 0.95,
            roughness: 0.15,
        });

        // 1. Оголовье (дуга)
        const headbandGeo = new THREE.TorusGeometry(0.9, 0.08, 20, 48, Math.PI);
        const headband = new THREE.Mesh(headbandGeo, earphoneBodyMat);
        headband.rotation.z = Math.PI;
        headband.position.y = 0.2;
        productGroup.add(headband);

        // 2. Металлические шарниры
        const hingeL = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.24, 20), metalAccentMat);
        hingeL.position.set(-0.9, 0.2, 0);
        productGroup.add(hingeL);

        const hingeR = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.24, 20), metalAccentMat);
        hingeR.position.set(0.9, 0.2, 0);
        productGroup.add(hingeR);

        // 3. Чаши наушников с амбушюрами
        const createEarCup = (posX: number, rotY: number) => {
            const cupGroup = new THREE.Group();
            cupGroup.position.set(posX, 0.0, 0);
            cupGroup.rotation.y = rotY;

            // Внешний корпус чаши
            const outer = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.36, 0.22, 32), earphoneBodyMat);
            outer.rotation.z = Math.PI / 2;
            cupGroup.add(outer);

            // Мягкий кожаный амбушюр
            const cushion = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.1, 16, 32), cushionMat);
            cushion.rotation.y = Math.PI / 2;
            cushion.position.x = posX > 0 ? -0.12 : 0.12;
            cupGroup.add(cushion);

            return cupGroup;
        };

        productGroup.add(createEarCup(-0.95, 0.15));
        productGroup.add(createEarCup(0.95, -0.15));

        // Студийный свет
        const ambient = new THREE.AmbientLight(0xffffff, 1.8);
        scene.add(ambient);

        const keyFront = new THREE.DirectionalLight(0xffffff, 4.0);
        keyFront.position.set(2, 4, 4);
        scene.add(keyFront);

        const rimBack = new THREE.DirectionalLight(0x38bdf8, 2.5);
        rimBack.position.set(-3, 2, -3);
        scene.add(rimBack);

        // Вращение 360° драгом мыши
        let isDragging = false;
        let prevX = 0;
        let rotY = 0.4;

        const handleMouseDown = (e: MouseEvent) => {
            isDragging = true;
            prevX = e.clientX;
        };
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;
            const delta = e.clientX - prevX;
            rotY += delta * 0.012;
            prevX = e.clientX;
        };
        const handleMouseUp = () => {
            isDragging = false;
        };

        mount.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        let animId: number;
        const animate = () => {
            animId = requestAnimationFrame(animate);
            if (!isDragging) {
                rotY += 0.003; // Медленное автовращение в витрине
            }
            productGroup.rotation.y = rotY;
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            if (!mount) return;
            const w = mount.clientWidth;
            const h = mount.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        const ro = new ResizeObserver(handleResize);
        ro.observe(mount);

        return () => {
            mount.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
            ro.disconnect();
            cancelAnimationFrame(animId);
            if (mount.contains(renderer.domElement)) {
                mount.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    // Смена расцветки 3D-модели в реальном времени
    const changeProductColor = (hex: number) => {
        if (!bodyMatRef.current) return;
        bodyMatRef.current.color.setHex(hex);
    };

    return (
        <div className="relative w-full h-[255px] sm:h-[275px] rounded-[24px] overflow-hidden bg-gradient-to-b from-[#18181b] via-[#09090b] to-[#040405] border border-neutral-300/80 shadow-[0_8px_30px_rgba(0,0,0,0.06)] select-none group">
            {/* 3D Canvas */}
            <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

            {/* Бейдж 360° слева снизу */}
            <div className="absolute bottom-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white font-mono text-[9px] font-bold z-10 pointer-events-none">
                <span className="text-[11px] leading-none">🔄</span>
                <span>360°</span>
            </div>

            {/* Кнопка «Увеличить» по центру снизу */}
            <button
                type="button"
                onClick={onZoom}
                className="absolute bottom-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-black/55 hover:bg-black/80 text-white/90 hover:text-white backdrop-blur-md border border-white/20 text-[10.5px] font-sans font-medium tracking-wide transition-all duration-200 shadow-md hover:scale-105 cursor-pointer z-20 active:scale-95"
            >
                <Maximize2 size={12} className="opacity-80" />
                <span>Увеличить</span>
            </button>

            {/* Интерактивная палитра цветов справа (меняет цвет 3D-наушников) */}
            <div className="absolute top-3.5 bottom-3.5 right-3.5 w-11 sm:w-[48px] flex flex-col justify-between items-center py-2.5 bg-white/10 backdrop-blur-md rounded-[16px] border border-white/20 z-20 shadow-sm">
                <div className="flex flex-col gap-2.5 items-center w-full">
                    {[
                        { color: "bg-[#18181b]", hex: 0x18181b, name: "Space Gray" },
                        { color: "bg-[#d4d4d8]", hex: 0xd4d4d8, name: "Silver" },
                        { color: "bg-[#1e3a8a]", hex: 0x1e3a8a, name: "Midnight Blue" },
                        { color: "bg-[#b45309]", hex: 0xb45309, name: "Champagne Gold" },
                    ].map((item, idx) => (
                        <button
                            key={idx}
                            type="button"
                            onClick={() => changeProductColor(item.hex)}
                            className={`w-6 h-6 rounded-full ${item.color} border-2 border-white/80 shadow-xs cursor-pointer hover:scale-115 transition-transform active:scale-90`}
                            title={`Перекрасить: ${item.name}`}
                        />
                    ))}
                </div>

                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white/90 shadow-xs pointer-events-none">
                    <ArrowRight size={11} />
                </div>
            </div>
        </div>
    );
}

// =========================================================================
// ОСНОВНАЯ СЕКЦИЯ КАРТОЧЕК С 3D-СЦЕНАМИ
// =========================================================================
interface DirectionItem {
    num: string;
    type: "arch" | "web3d" | "product";
    title: string;
    description: string;
    icon: React.ElementType;
    iconBg: string;
    iconColor: string;
    examples: string[];
    previewImg: string;
}

const THREE_DIRECTIONS: DirectionItem[] = [
    {
        num: "01",
        type: "arch",
        title: "Architectural 3D",
        description:
            "Архитектурная визуализация экстерьеров, интерьеров и жилых комплексов в масштабе 1:1.",
        icon: Building2,
        iconBg: "bg-[#e0f2fe]",
        iconColor: "text-[#0284c7]",
        examples: [
            "Фотореалистичные экстерьеры зданий, ЖК и коттеджных посёлков",
            "Дизайн интерьеров по точным чертежам и обмерочным планам",
            "Дневное и ночное освещение, синематик-облёты камерой для продаж",
        ],
        previewImg:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=90",
    },
    {
        num: "02",
        type: "web3d",
        title: "Web 3D Design",
        description:
            "Интерактивная 3D-графика прямо в браузере на Three.js и WebGL со стабильными 60 FPS.",
        icon: MonitorPlay,
        iconBg: "bg-[#f3e8ff]",
        iconColor: "text-[#9333ea]",
        examples: [
            "Интерактивные 3D-конфигураторы товаров со сменой цвета и комплектаций",
            "Пространственные промо-сцены и интерактивные персонажи для лендингов",
            "Экстремальное сжатие моделей Draco (вес GLTF/GLB до 2–3 МБ)",
        ],
        previewImg:
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=90",
    },
    {
        num: "03",
        type: "product",
        title: "3D Product Visualization",
        description:
            "Коммерческий предметный рендеринг товаров для каталогов, маркетплейсов и презентаций.",
        icon: Box,
        iconBg: "bg-[#fef3c7]",
        iconColor: "text-[#d97706]",
        examples: [
            "Студийные рендеры упаковок, электроники, мебели и украшений",
            "Рендер на чистом прозрачном фоне (Alpha Channel) для верстки",
            "Взрыв-схемы (Exploded View), макро-детали и физически точные PBR-материалы",
        ],
        previewImg:
            "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1600&q=90",
    },
];

export function ThreeDirectionsSection() {
    const [zoomItem, setZoomItem] = useState<DirectionItem | null>(null);

    return (
        <section className="space-y-10 pt-2">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
                {THREE_DIRECTIONS.map((item) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={item.num}
                            className="bg-white rounded-[32px] border border-neutral-200/90 p-6 sm:p-7 flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.05)] hover:border-neutral-300 transition-all duration-300"
                        >
                            <div className="space-y-4">
                                {/* Иконка и номер 01/02/03 */}
                                <div className="flex items-center justify-between">
                                    <div
                                        className={`w-11 h-11 rounded-[14px] flex items-center justify-center ${item.iconBg} ${item.iconColor}`}
                                    >
                                        <Icon size={21} strokeWidth={2.2} />
                                    </div>
                                    <span className="font-mono text-xs font-bold text-neutral-400">
                                        {item.num}
                                    </span>
                                </div>

                                {/* Заголовок и подзаголовок */}
                                <div className="space-y-1.5">
                                    <h3 className="text-[23px] sm:text-[25px] font-extrabold tracking-[-0.03em] text-[#09090b] leading-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-neutral-500 text-[13.5px] sm:text-[14px] leading-relaxed min-h-[42px]">
                                        {item.description}
                                    </p>
                                </div>

                                {/* Настоящий интерактивный 3D холст */}
                                <div className="pt-0.5">
                                    {item.type === "arch" && (
                                        <RealArchCanvas onZoom={() => setZoomItem(item)} />
                                    )}
                                    {item.type === "web3d" && (
                                        <RealWeb3DCanvas onZoom={() => setZoomItem(item)} />
                                    )}
                                    {item.type === "product" && (
                                        <RealProductCanvas onZoom={() => setZoomItem(item)} />
                                    )}
                                </div>
                            </div>

                            {/* Список задач */}
                            <div className="pt-5 border-t border-neutral-100 space-y-2.5 mt-5">
                                <span className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider font-semibold block">
                                    ПРИМЕРЫ ЗАДАЧ:
                                </span>
                                <ul className="space-y-2 text-[13px] sm:text-[13.5px] text-neutral-600 leading-snug">
                                    {item.examples.map((ex, idx) => (
                                        <li key={idx} className="flex items-start gap-2.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] mt-1.5 shrink-0" />
                                            <span>{ex}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Полноэкранный модальный зум */}
            {zoomItem && (
                <div
                    role="dialog"
                    aria-modal="true"
                    className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
                    onClick={() => setZoomItem(null)}
                >
                    <div
                        className="relative max-w-5xl w-full bg-neutral-900 rounded-[28px] overflow-hidden border border-white/15 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between p-4 px-6 border-b border-white/10 text-white font-mono text-xs">
                            <span className="font-bold uppercase tracking-wider">
                                {zoomItem.num} // {zoomItem.title}
                            </span>
                            <button
                                type="button"
                                onClick={() => setZoomItem(null)}
                                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer text-white"
                            >
                                <X size={16} />
                            </button>
                        </div>
                        <div className="relative w-full aspect-[16/10] bg-black">
                            <img
                                src={zoomItem.previewImg}
                                alt={zoomItem.title}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default ThreeDirectionsSection;