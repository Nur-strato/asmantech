"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import * as THREE from "three";
import {
    ArrowLeft,
    ArrowUpRight,
    Sparkles,
    Eye,
    Cpu,
    Check,
    Shapes,
    CheckCircle2,
} from "lucide-react";
import { ThreeDirectionsSection } from "@/components/ThreeDirectionsSection";

// =========================================================================
// ИНТЕРАКТИВНЫЙ 3D РОБОТ-СВЕТИЛЬНИК (МИНУС 5%, ИТОГО 0.9025)
// =========================================================================
function RobotLampCanvas() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const currentMount = mountRef.current;
        if (!currentMount) return;

        const scene = new THREE.Scene();
        const width = currentMount.clientWidth || 450;
        const height = currentMount.clientHeight || 550;

        const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
        camera.position.set(0, 0.35, 6.2);

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.25;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        currentMount.appendChild(renderer.domElement);

        // Функция создания скругленных геометрий
        const createRoundedBoxGeometry = (w: number, h: number, d: number, r: number, s: number) => {
            const shape = new THREE.Shape();
            const x = -w / 2;
            const y = -h / 2;
            shape.moveTo(x + r, y);
            shape.lineTo(x + w - r, y);
            shape.quadraticCurveTo(x + w, y, x + w, y + r);
            shape.lineTo(x + w, y + h - r);
            shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
            shape.lineTo(x + r, y + h);
            shape.quadraticCurveTo(x, y + h, x, y + h - r);
            shape.lineTo(x, y + r);
            shape.quadraticCurveTo(x, y, x + r, y);

            const extrudeSettings = {
                depth: Math.max(0.01, d - 2 * r),
                bevelEnabled: true,
                bevelSegments: s,
                steps: 1,
                bevelSize: r,
                bevelThickness: r,
            };

            const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
            geo.center();
            return geo;
        };

        // --- МАТЕРИАЛЫ: SPACE GRAY & MATTE TITANIUM ---
        const bodyMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x1c2026,
            metalness: 0.82,
            roughness: 0.32,
            clearcoat: 0.6,
            clearcoatRoughness: 0.15,
            reflectivity: 0.8,
        });

        const titaniumMaterial = new THREE.MeshStandardMaterial({
            color: 0x3b4352,
            metalness: 0.9,
            roughness: 0.22,
        });

        const facePlateMaterial = new THREE.MeshStandardMaterial({
            color: 0xe2e6eb,
            metalness: 0.18,
            roughness: 0.32,
        });

        const eyeMaterial = new THREE.MeshStandardMaterial({
            color: 0xf8fafc,
            emissive: 0xe2e8f0,
            emissiveIntensity: 0.85,
            roughness: 0.05,
            metalness: 0.1,
        });

        const accentIndicatorMat = new THREE.MeshStandardMaterial({
            color: 0xe2e8f0,
            emissive: 0xffffff,
            emissiveIntensity: 0.6,
            roughness: 0.2,
        });

        // Корневая группа светильника (уменьшена ещё на 5%: 0.95 * 0.95 = ~0.9)
        const lamp = new THREE.Group();
        lamp.scale.set(0.9, 0.9, 0.9);
        lamp.position.set(0, -0.4, 0);
        scene.add(lamp);

        // =========================================================
        // 1. ПОДСТАВКА СВЕТИЛЬНИКА
        // =========================================================
        const basePlateGeo = new THREE.CylinderGeometry(1.05, 1.15, 0.14, 48);
        const basePlate = new THREE.Mesh(basePlateGeo, titaniumMaterial);
        basePlate.position.y = -0.58;
        basePlate.receiveShadow = true;
        lamp.add(basePlate);

        const ringGeo = new THREE.TorusGeometry(1.08, 0.022, 16, 64);
        const ringMesh = new THREE.Mesh(ringGeo, titaniumMaterial);
        ringMesh.rotation.x = Math.PI / 2;
        ringMesh.position.y = -0.56;
        lamp.add(ringMesh);

        const baseConeGeo = new THREE.CylinderGeometry(0.32, 0.55, 0.18, 36);
        const baseCone = new THREE.Mesh(baseConeGeo, titaniumMaterial);
        baseCone.position.y = -0.44;
        lamp.add(baseCone);

        // =========================================================
        // 2. КОРПУС СВЕТИЛЬНИКА
        // =========================================================
        const bodyGeo = createRoundedBoxGeometry(1.28, 1.15, 1.15, 0.14, 5);
        const bodyMesh = new THREE.Mesh(bodyGeo, bodyMaterial);
        bodyMesh.position.y = 0.22;
        bodyMesh.castShadow = true;
        lamp.add(bodyMesh);

        const bodyLightGeo = createRoundedBoxGeometry(0.68, 0.12, 0.04, 0.04, 3);
        const bodyLight = new THREE.Mesh(bodyLightGeo, accentIndicatorMat);
        bodyLight.position.set(0, 0.26, 0.6);
        lamp.add(bodyLight);

        // =========================================================
        // 3. МЕХАНИЧЕСКИЙ ШАРНИР ШЕИ
        // =========================================================
        const neckGroup = new THREE.Group();
        neckGroup.position.set(0, 0.82, 0);
        lamp.add(neckGroup);

        const collarGeo = new THREE.CylinderGeometry(0.26, 0.32, 0.12, 28);
        const collar = new THREE.Mesh(collarGeo, titaniumMaterial);
        neckGroup.add(collar);

        const neckBallGeo = new THREE.SphereGeometry(0.22, 24, 20);
        const neckBall = new THREE.Mesh(neckBallGeo, titaniumMaterial);
        neckBall.position.y = 0.16;
        neckGroup.add(neckBall);

        // =========================================================
        // 4. ГОЛОВА СВЕТИЛЬНИКА
        // =========================================================
        const headPivot = new THREE.Group();
        headPivot.position.set(0, 0.32, 0);
        neckGroup.add(headPivot);

        const headGeo = createRoundedBoxGeometry(1.3, 0.94, 0.96, 0.14, 5);
        const headMesh = new THREE.Mesh(headGeo, bodyMaterial);
        headMesh.position.set(0, 0.44, 0);
        headMesh.castShadow = true;
        headPivot.add(headMesh);

        const facePlateGeo = createRoundedBoxGeometry(1.04, 0.7, 0.08, 0.09, 4);
        const facePlate = new THREE.Mesh(facePlateGeo, facePlateMaterial);
        facePlate.position.set(0, 0.44, 0.48);
        headPivot.add(facePlate);

        // Глаза-линзы
        const eyeGeo = new THREE.SphereGeometry(0.125, 32, 24);
        const eyeLeft = new THREE.Mesh(eyeGeo, eyeMaterial);
        eyeLeft.position.set(-0.22, 0.47, 0.52);
        eyeLeft.scale.set(1, 1.15, 0.55);
        headPivot.add(eyeLeft);

        const eyeRight = new THREE.Mesh(eyeGeo, eyeMaterial);
        eyeRight.position.set(0.22, 0.47, 0.52);
        eyeRight.scale.set(1, 1.15, 0.55);
        headPivot.add(eyeRight);

        // Боковые разъемы на висках
        const earRingGeo = new THREE.TorusGeometry(0.15, 0.02, 16, 32);
        const earLeft = new THREE.Mesh(earRingGeo, titaniumMaterial);
        earLeft.position.set(-0.66, 0.44, 0);
        earLeft.rotation.y = Math.PI / 2;
        headPivot.add(earLeft);

        const earRight = new THREE.Mesh(earRingGeo, titaniumMaterial);
        earRight.position.set(0.66, 0.44, 0);
        earRight.rotation.y = Math.PI / 2;
        headPivot.add(earRight);

        // =========================================================
        // 5. НЕЙТРАЛЬНЫЙ СТУДИЙНЫЙ СВЕТ
        // =========================================================
        const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
        scene.add(ambientLight);

        const frontKey = new THREE.DirectionalLight(0xffffff, 3.8);
        frontKey.position.set(3, 4, 6);
        scene.add(frontKey);

        const fillCool = new THREE.DirectionalLight(0xcfd8dc, 2.2);
        fillCool.position.set(-4, 2.5, 4);
        scene.add(fillCool);

        const topRim = new THREE.DirectionalLight(0xffffff, 3.2);
        topRim.position.set(0, 6, 1.5);
        scene.add(topRim);

        const backRim = new THREE.DirectionalLight(0x94a3b8, 2.0);
        backRim.position.set(0, 2, -4);
        scene.add(backRim);

        // =========================================================
        // 6. СЛЕЖЕНИЕ ЗА КУРСОРОМ И АНИМАЦИЯ
        // =========================================================
        const targetHead = { x: -0.12, y: 0.22, z: 0.08 };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = currentMount.getBoundingClientRect();
            const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

            targetHead.y = THREE.MathUtils.clamp(nx * 0.65, -0.6, 0.6);
            targetHead.x = THREE.MathUtils.clamp(-ny * 0.45 - 0.1, -0.35, 0.3);
            targetHead.z = THREE.MathUtils.clamp(-nx * 0.18 + 0.06, -0.12, 0.18);
        };

        window.addEventListener("mousemove", handleMouseMove);

        let animationFrameId: number;
        const clock = new THREE.Clock();

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            const time = clock.getElapsedTime();

            headPivot.rotation.y += (targetHead.y - headPivot.rotation.y) * 0.08;
            headPivot.rotation.x += (targetHead.x - headPivot.rotation.x) * 0.08;
            headPivot.rotation.z += (targetHead.z - headPivot.rotation.z) * 0.08;

            lamp.position.y = -0.4 + Math.sin(time * 1.6) * 0.018;

            const blink = time % 4.8;
            if (blink > 4.65) {
                eyeLeft.scale.y = 0.06;
                eyeRight.scale.y = 0.06;
            } else {
                eyeLeft.scale.y = 1.15;
                eyeRight.scale.y = 1.15;
            }

            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            if (!currentMount) return;
            const w = currentMount.clientWidth;
            const h = currentMount.clientHeight;
            if (w === 0 || h === 0) return;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h, false);
        };

        const ro = new ResizeObserver(() => handleResize());
        ro.observe(currentMount);
        handleResize();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            ro.disconnect();
            cancelAnimationFrame(animationFrameId);
            if (currentMount.contains(renderer.domElement)) {
                currentMount.removeChild(renderer.domElement);
            }
            renderer.dispose();
            basePlateGeo.dispose();
            ringGeo.dispose();
            baseConeGeo.dispose();
            bodyGeo.dispose();
            bodyLightGeo.dispose();
            collarGeo.dispose();
            neckBallGeo.dispose();
            headGeo.dispose();
            facePlateGeo.dispose();
            eyeGeo.dispose();
            earRingGeo.dispose();
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className="w-full h-full flex items-center justify-center relative  cursor-grab active:cursor-grabbing overflow-visible"
        />
    );
}

// =========================================================================
// ДАННЫЕ РЕАЛЬНЫХ КЕЙСОВ
// =========================================================================
interface ThreeCaseItem {
    id: string;
    directionNum: string;
    directionTitle: string;
    caseTitle: string;
    client: string;
    badge: string;
    description: string;
    metrics: { label: string; value: string }[];
    deliverables: string[];
    techStack: string[];
    imageUrl: string;
}

const THREE_CASES: ThreeCaseItem[] = [
    {
        id: "case-arch",
        directionNum: "01",
        directionTitle: "Architectural 3D",
        caseTitle: "Жилой комплекс «Baytik Hills Residence»",
        client: "Девелоперская группа",
        badge: "Архитектурный рендеринг & Видеооблёт",
        description:
            "Создание полного пакета визуализации жилого комплекса по чертежам DWG: дневной и закатный свет, ландшафтный дизайн, подземный паркинг и 60-секундный 4K-видеоролик для отдела продаж.",
        metrics: [
            { label: "Разрешение", value: "4K UHD" },
            { label: "Срок проекта", value: "12 дней" },
            { label: "Бронь на старте", value: "+42%" },
        ],
        deliverables: [
            "16 ракурсов экстерьера с дневным и ночным светом",
            "Интерьер лобби и видовых пентхаусов 1:1 по чертежам",
            "Синематик-видеоролик с плавными облётами камеры",
        ],
        techStack: ["3ds Max", "Corona Renderer", "AutoCAD", "Photoshop"],
        imageUrl:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "case-web3d",
        directionNum: "02",
        directionTitle: "Web 3D Design",
        caseTitle: "3D-конфигуратор аудиосистемы «Aura Horizon»",
        client: "Hi-Fi Audio Brand",
        badge: "Интерактивный WebGL прямо на сайте",
        description:
            "Разработка веб-конфигуратора колонок и наушников: свободное вращение на 360°, смена отделки (орех, полированный алюминий, матовый графит) и интерактивная взрыв-схема компонентов.",
        metrics: [
            { label: "Вес GLB модели", value: "1.9 MB" },
            { label: "Частота кадров", value: "60 FPS" },
            { label: "Глубина сессии", value: "3.4x" },
        ],
        deliverables: [
            "Плавная 3D-сцена на Three.js с поддержкой тач-жестов",
            "Оптимизация полигонов сжатием Google Draco",
            "Прямая связь со страницей оформления заказа",
        ],
        techStack: ["Three.js", "React / Next.js", "Blender", "Draco GLTF"],
        imageUrl:
            "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=80",
    },
    {
        id: "case-product",
        directionNum: "03",
        directionTitle: "3D Product Visualization",
        caseTitle: "Хронограф «Apex Chrono Titanium»",
        client: "Премиальный часовой бренд",
        badge: "Студийный PBR-рендеринг для каталога",
        description:
            "Рекламная визуализация титанового корпуса без затрат на студию: макро-съемка сапфирового стекла, чистые кадры на прозрачном фоне (Alpha) и наглядный послойный разбор часового механизма.",
        metrics: [
            { label: "Разрешение", value: "8000×6000" },
            { label: "Готовых кадров", value: "24 ракурса" },
            { label: "Экономия на фото", value: "~60%" },
        ],
        deliverables: [
            "Кадры на прозрачном фоне (PNG) под любую верстку",
            "Послойная взрыв-схема механизма (Exploded View)",
            "Исходные файлы сцены (.blend) и 4K PBR-карты",
        ],
        techStack: ["Blender 4.2", "Cycles", "Substance Painter", "PBR 4K"],
        imageUrl:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
    },
];

export default function ThreeDesignPage() {
    return (
        <main className="max-w-[1544px] mx-auto px-6 sm:px-10 pt-28 pb-32 space-y-28 bg-white text-neutral-900 font-sans ">

            {/* Навигация */}
            <div className="flex items-center justify-between border-b border-neutral-200/80 pb-6">
                <Link
                    href="/#solutions"
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 hover:text-neutral-950 transition-colors group"
                >
                    <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Solutions // 03</span>
                </Link>

                <div className="flex items-center gap-2 font-mono text-[11px] text-neutral-500 uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>ARCHVIZ • WEB 3D • PRODUCT VISUALS</span>
                </div>
            </div>

            {/* ========================================================= */}
            {/* 1-Й ЭКРАН: Главный блок (Хиро) с роботом-светильником    */}
            {/* ========================================================= */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-2">

                {/* Левая колонка */}
                <div className="lg:col-span-6 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 font-mono text-[11.5px] uppercase tracking-wider">
                        <span>3D DIGITAL STUDIO</span>
                        <span>•</span>
                        <span className="font-bold text-neutral-900">BLENDER, THREE.JS & CORONA</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-neutral-950 leading-[1.02]">
                        3D визуализация и Web 3D.
                    </h1>

                    <p className="text-neutral-600 text-[16.8px] sm:text-[18.9px] leading-relaxed font-normal">
                        Создаем убедительный 3D-контент по трем ключевым направлениям: архитектурные рендеры зданий и интерьеров, интерактивные трехмерные модели для браузера и студийную визуализацию предметов без затрат на физическую съемку.
                    </p>

                    <div className="flex flex-wrap gap-4 pt-2 font-mono text-[12.6px] text-neutral-600">
                        <div className="px-3.5 py-1.5 rounded-xl bg-neutral-50 border border-neutral-200">
                            КАЧЕСТВО: <span className="font-bold text-sky-600">4K Ultra-HD & 60 FPS</span>
                        </div>
                        <div className="px-3.5 py-1.5 rounded-xl bg-neutral-50 border border-neutral-200">
                            ДОГОВОР: <span className="font-bold text-neutral-900">FIXED PRICE</span>
                        </div>
                    </div>

                    <div className="pt-2">
                        <Link
                            href="/contacts"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-neutral-950 hover:bg-neutral-800 text-white font-mono text-[12.6px] uppercase tracking-wider font-bold transition-all shadow-md active:scale-95"
                        >
                            <span>Обсудить 3D-проект</span>
                            <ArrowUpRight size={15} />
                        </Link>
                    </div>
                </div>

                {/* Правая колонка: чистый 3D робот-светильник без фона и без срезов */}
                <div className="lg:col-span-6 flex items-center justify-center relative min-h-[480px] sm:min-h-[560px]">
                    <div className="w-full h-[480px] sm:h-[560px] relative">
                        <RobotLampCanvas />
                    </div>
                </div>

            </section>

            {/* ========================================================= */}
            {/* 2-Й ЭКРАН: 02 / НАШИ 3 НАПРАВЛЕНИЯ                        */}
            {/* ========================================================= */}
            <ThreeDirectionsSection />

            {/* ========================================================= */}
            {/* СЕКЦИЯ: РЕАЛЬНЫЕ КЕЙСЫ ПО 3 НАПРАВЛЕНИЯМ                  */}
            {/* ========================================================= */}
            <section className="space-y-12 pt-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-200/80 pb-6">
                    <div className="space-y-3 max-w-2xl">
                        <div className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold">
                            РЕАЛЬНЫЕ РЕЗУЛЬТАТЫ
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 leading-[1.15]">
                            Кейсы по каждому направлению
                        </h2>
                        <p className="text-neutral-500 text-sm sm:text-base leading-relaxed">
                            Показываем, как архитектурные рендеры, WebGL-конфигураторы и предметная визуализация решают бизнес-задачи наших клиентов.
                        </p>
                    </div>

                    <div className="font-mono text-xs text-neutral-500 bg-neutral-50 border border-neutral-200 px-4 py-2 rounded-xl shrink-0">
                        STATUS: <span className="text-emerald-600 font-bold">100% PRODUCTION READY</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {THREE_CASES.map((item) => (
                        <div
                            key={item.id}
                            className="rounded-[32px] bg-neutral-50/70 border border-neutral-200/90 overflow-hidden flex flex-col justify-between hover:border-neutral-300 transition-all duration-300 shadow-sm group hover:shadow-md"
                        >
                            <div className="space-y-5">
                                <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-neutral-900 border-b border-neutral-200/80">
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.caseTitle}
                                        fill
                                        unoptimized
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="(max-width: 1024px) 100vw, 33vw"
                                    />
                                    <div className="absolute top-4 left-4 flex items-center gap-2">
                                        <span className="font-mono text-[10.5px] uppercase tracking-wider px-2.5 py-1 rounded-lg bg-neutral-950/80 text-white font-bold backdrop-blur-xs">
                                            {item.directionTitle}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-3 right-4 font-mono text-[10px] text-white/90 bg-neutral-950/70 px-2 py-0.5 rounded backdrop-blur-xs">
                                        {item.badge}
                                    </div>
                                </div>

                                <div className="p-6 sm:p-7 pt-1 space-y-4">
                                    <div>
                                        <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider font-semibold">
                                            {item.client}
                                        </span>
                                        <h3 className="text-xl font-bold tracking-tight text-neutral-950 mt-1 leading-snug">
                                            {item.caseTitle}
                                        </h3>
                                    </div>

                                    <p className="text-neutral-600 text-sm leading-relaxed">
                                        {item.description}
                                    </p>

                                    <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-white border border-neutral-200/80 text-center font-mono">
                                        {item.metrics.map((m, idx) => (
                                            <div key={idx} className="space-y-0.5">
                                                <div className="text-[13px] font-bold text-neutral-950">
                                                    {m.value}
                                                </div>
                                                <div className="text-[9px] text-neutral-400 uppercase leading-tight">
                                                    {m.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-2 pt-2">
                                        <span className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider font-semibold block">
                                            Результат:
                                        </span>
                                        <ul className="space-y-1.5 text-xs text-neutral-600">
                                            {item.deliverables.map((del, dIdx) => (
                                                <li key={dIdx} className="flex items-start gap-2">
                                                    <CheckCircle2
                                                        size={14}
                                                        className="text-emerald-600 mt-0.5 shrink-0"
                                                    />
                                                    <span className="leading-tight">{del}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 sm:p-7 pt-0 border-t border-neutral-200/60 mt-4 space-y-4">
                                <div className="flex flex-wrap gap-1.5 pt-3">
                                    {item.techStack.map((tech, tIdx) => (
                                        <span
                                            key={tIdx}
                                            className="font-mono text-[10px] px-2 py-0.5 rounded bg-white border border-neutral-200 text-neutral-600"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <Link
                                    href="/contacts"
                                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs font-semibold uppercase tracking-wider transition-all active:scale-[0.98]"
                                >
                                    <span>Заказать такой же</span>
                                    <ArrowUpRight size={14} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ========================================================= */}
            {/* 3-Й ЭКРАН: 03 / ПРЕИМУЩЕСТВА                               */}
            {/* ========================================================= */}
            <section className="space-y-10 pt-4">
                <div className="space-y-3 max-w-3xl">
                    <div className="font-mono text-xs uppercase tracking-widest text-neutral-400 font-semibold">
                        03 / ПРЕИМУЩЕСТВА
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 leading-[1.12]">
                        Что вы получаете
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7">
                    <div className="rounded-[28px] bg-neutral-50/70 border border-neutral-200/80 p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-neutral-300 transition-all">
                        <div className="space-y-3 flex-1 min-w-[200px]">
                            <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-100/80 flex items-center justify-center text-sky-600">
                                <Sparkles size={22} strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight text-neutral-950">
                                Премиальный фотореализм
                            </h3>
                            <p className="text-neutral-500 text-[16.2px] leading-relaxed">
                                Любые ракурсы, сложные фактуры и идеальная инсоляция без необходимости реальной фотосъемки.
                            </p>
                        </div>
                        <div className="relative w-full sm:w-[300px] h-[152px] flex items-center justify-center gap-3  shrink-0">
                            <div className="p-3.5 rounded-2xl bg-white border border-neutral-200/90 shadow-sm flex flex-col items-center justify-center text-center space-y-1.5 w-[136px] shrink-0 z-10">
                                <div className="relative w-[60px] h-[60px] rounded-full border-4 border-sky-500 flex items-center justify-center font-extrabold text-[17px] text-sky-600">
                                    4K
                                </div>
                                <span className="text-[10px] font-mono text-neutral-700 leading-tight font-bold">
                                    Ultra-HD Stills
                                </span>
                            </div>
                            <div className="w-[152px] h-[118px] rounded-xl bg-white border border-neutral-200/90 shadow-2xs p-2.5 flex flex-col justify-between -ml-3.5">
                                <div className="flex items-center gap-1 border-b border-neutral-100 pb-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                                </div>
                                <div className="space-y-1.5 my-auto">
                                    <div className="text-[10px] font-mono font-bold text-neutral-800">Raytraced PBR</div>
                                    <div className="h-1.5 w-full bg-sky-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-sky-500 w-full" />
                                    </div>
                                    <span className="text-[8px] font-mono text-neutral-400 block">Alpha Transparency</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[28px] bg-neutral-50/70 border border-neutral-200/80 p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-neutral-300 transition-all">
                        <div className="space-y-3 flex-1 min-w-[200px]">
                            <div className="w-11 h-11 rounded-2xl bg-purple-50 border border-purple-100/80 flex items-center justify-center text-purple-600">
                                <Eye size={22} strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight text-neutral-950">
                                Интерактивный опыт 360°
                            </h3>
                            <p className="text-neutral-500 text-[16.2px] leading-relaxed">
                                Возможность покрутить здание или товар прямо в браузере в разы увеличивает глубину просмотра и продажи.
                            </p>
                        </div>
                        <div className="relative w-full sm:w-[300px] h-[152px] flex items-center justify-center  shrink-0">
                            <div className="w-full max-w-[268px] p-3.5 rounded-2xl bg-white border border-neutral-200/90 shadow-sm space-y-2">
                                <div className="flex items-center justify-between text-[11px] font-mono">
                                    <span className="text-neutral-500">Interaction Rate:</span>
                                    <span className="text-emerald-600 font-bold">+68% Avg</span>
                                </div>
                                <div className="p-2 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-between text-[12px] font-bold">
                                    <span>Глубина взаимодействия</span>
                                    <span className="font-mono text-neutral-900">3.8x выше</span>
                                </div>
                                <div className="text-[9px] font-mono text-neutral-400 text-center">
                                    Мгновенный отклик на смартфонах и ПК
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[28px] bg-neutral-50/70 border border-neutral-200/80 p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-neutral-300 transition-all">
                        <div className="space-y-3 flex-1 min-w-[200px]">
                            <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100/80 flex items-center justify-center text-emerald-600">
                                <Cpu size={22} strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight text-neutral-950">
                                Оптимизация под веб
                            </h3>
                            <p className="text-neutral-500 text-[16.2px] leading-relaxed">
                                Сжатие Draco и чистая топология позволяют открывать 3D-модели за 1-2 секунды даже на смартфонах.
                            </p>
                        </div>
                        <div className="relative w-full sm:w-[300px] h-[152px] flex items-center justify-center  shrink-0">
                            <div className="w-full max-w-[268px] p-4 rounded-2xl bg-white border border-neutral-200/90 shadow-sm space-y-2.5">
                                <div className="flex items-center justify-between font-mono text-xs">
                                    <span className="text-neutral-500">WebGL Frame Rate:</span>
                                    <span className="font-bold text-emerald-600">60 FPS Locked</span>
                                </div>
                                <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                                    <div className="bg-emerald-500 h-full w-[95%]" />
                                </div>
                                <div className="flex justify-between text-[10px] font-mono text-neutral-400">
                                    <span>Draco: 1.5–2.5 MB</span>
                                    <span>Draw Calls: Optimized</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[28px] bg-neutral-50/70 border border-neutral-200/80 p-6 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-neutral-300 transition-all">
                        <div className="space-y-3 flex-1 min-w-[200px]">
                            <div className="w-11 h-11 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-800">
                                <Shapes size={22} strokeWidth={2} />
                            </div>
                            <h3 className="text-xl font-bold tracking-tight text-neutral-950">
                                Все исходники ваши
                            </h3>
                            <p className="text-neutral-500 text-[16.2px] leading-relaxed">
                                Передаем исходные проекты, настроенные сцены и коммерческие лицензии без скрытых условий.
                            </p>
                        </div>
                        <div className="relative w-full sm:w-[300px] h-[152px] flex items-center justify-center  shrink-0">
                            <div className="w-full max-w-[258px] p-4 rounded-2xl bg-[#111827] text-white shadow-lg space-y-2">
                                {[
                                    ".BLEND / .MAX исходники",
                                    "GLTF 2.0 / GLB веб-форматы",
                                    "4K PBR текстурные карты",
                                    "Полные авторские права",
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-[12.6px]">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                                                <Check size={9} strokeWidth={3} />
                                            </div>
                                            <span className="text-neutral-300 font-medium">{item}</span>
                                        </div>
                                        {idx === 3 && (
                                            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold text-[9.5px]">
                                                100%
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* 4-Й ЭКРАН: 04 / ПРОЦЕСС — ЭТАПЫ РАБОТЫ                    */}
            {/* ========================================================= */}
            <section className="space-y-8 pt-4">
                <div className="space-y-3 max-w-3xl">
                    <div className="flex items-center gap-2.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 font-mono text-xs font-semibold">
                            04
                        </span>
                        <span className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight">
                            Процесс разработки
                        </span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-neutral-950 leading-[1.12]">
                        От чертежей до рендера и внедрения.
                    </h2>
                </div>

                <div className="rounded-[32px] bg-white border border-neutral-200/90 shadow-[0_10px_35px_rgba(0,0,0,0.02)] p-8 sm:p-12 divide-y divide-neutral-100">
                    <div className="pb-8 space-y-1.5">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-sm text-neutral-400 font-semibold">01</span>
                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
                                Анализ чертежей, планов и референсов
                            </h3>
                        </div>
                        <p className="text-neutral-500 text-[15.4px] sm:text-[16.5px] leading-relaxed pl-7">
                            Изучаем архитектурные файлы (DWG, BIM), габариты изделий или референсы товаров и фиксируем требования к детализации.
                        </p>
                    </div>

                    <div className="py-8 space-y-1.5">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-sm text-neutral-400 font-semibold">02</span>
                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
                                Высокоточное полигональное моделирование
                            </h3>
                        </div>
                        <p className="text-neutral-500 text-[15.4px] sm:text-[16.5px] leading-relaxed pl-7">
                            Строим точную геометрию зданий или предметов с правильной топологией без артефактов и самопересечений.
                        </p>
                    </div>

                    <div className="py-8 space-y-1.5">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-sm text-neutral-400 font-semibold">03</span>
                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
                                PBR-материалы, солнце и студийное освещение
                            </h3>
                        </div>
                        <p className="text-neutral-500 text-[15.4px] sm:text-[16.5px] leading-relaxed pl-7">
                            Настраиваем физические карты бетона, стекла, дерева, металла и ткани с физически достоверным светом и тенями.
                        </p>
                    </div>

                    <div className="py-8 space-y-1.5">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-sm text-neutral-400 font-semibold">04</span>
                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
                                Финальный рендеринг или интеграция в код сайта
                            </h3>
                        </div>
                        <p className="text-neutral-500 text-[15.4px] sm:text-[16.5px] leading-relaxed pl-7">
                            Просчитываем Ultra-HD кадры и синематик-видео либо интегрируем 3D-сцену в браузер на Three.js с логикой кастомизатора.
                        </p>
                    </div>

                    <div className="pt-8 space-y-1.5">
                        <div className="flex items-center gap-3">
                            <span className="font-mono text-sm text-emerald-600 font-semibold">05</span>
                            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950">
                                Передача полного пакета файлов
                            </h3>
                        </div>
                        <p className="text-neutral-500 text-[15.4px] sm:text-[16.5px] leading-relaxed pl-7">
                            Предоставляем готовые 4K-рендеры, оптимизированные GLTF-модели и оригинальные файлы проектов со всеми текстурами.
                        </p>
                    </div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* 5-Й ЭКРАН: 05 / НАШИ ГАРАНТИИ                            */}
            {/* ========================================================= */}
            <section className="space-y-10 pt-4">
                <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 font-mono text-xs font-semibold">
                        05
                    </span>
                    <span className="text-base sm:text-lg font-bold text-neutral-900 tracking-tight">
                        Наши гарантии
                    </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 divide-y md:divide-y-0 md:divide-x divide-neutral-200/80">
                    <div className="group pt-6 md:pt-0 md:pr-8 transition-transform duration-300">
                        <h3 className="text-2xl sm:text-3xl lg:text-[34px] font-black tracking-tight text-neutral-950 leading-[1.12]">
                            100% реализм. <br />
                            <span className="text-neutral-400 font-bold group-hover:text-neutral-600 transition-colors">
                                Доводим геометрию и свет до идеала по брифу.
                            </span>
                        </h3>
                    </div>

                    <div className="group pt-8 md:pt-0 md:px-8 transition-transform duration-300">
                        <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-black tracking-tight text-neutral-950 leading-[1.14]">
                            Все исходники <br className="hidden lg:inline" />
                            остаются у вас. <br />
                            <span className="text-neutral-400 font-bold group-hover:text-neutral-600 transition-colors">
                                Полная коммерческая свобода без роялти.
                            </span>
                        </h3>
                    </div>

                    <div className="group pt-8 md:pt-0 md:pl-8 transition-transform duration-300">
                        <h3 className="text-2xl sm:text-3xl lg:text-[28px] font-black tracking-tight text-neutral-950 leading-[1.18]">
                            Фиксированная цена <br className="hidden lg:inline" />
                            в договоре — <br />
                            <span className="text-neutral-400 font-bold group-hover:text-neutral-600 transition-colors">
                                стоимость не изменится в ходе работы.
                            </span>
                        </h3>
                    </div>
                </div>
            </section>

            {/* ========================================================= */}
            {/* 6-Й ЭКРАН: Финальный CTA                                 */}
            {/* ========================================================= */}
            <section className="bg-neutral-950 text-white rounded-[32px] p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
                <div className="space-y-2 text-center lg:text-left">
                    <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                        Запустим 3D-проект с гарантией по договору
                    </h2>
                    <p className="text-neutral-400 text-xs sm:text-sm">
                        Архитектура, WebGL или предметный рендеринг: фиксируем срок, бюджет и передаем все исходники.
                    </p>
                </div>

                <Link
                    href="/contacts"
                    className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 font-mono text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 shrink-0"
                >
                    <span>Обсудить 3D</span>
                    <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
            </section>

        </main>
    );
}