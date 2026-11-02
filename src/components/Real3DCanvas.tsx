"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function Real3DCanvas() {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const currentMount = mountRef.current;
        if (!currentMount) return;

        const scene = new THREE.Scene();
        const width = currentMount.clientWidth;
        const height = currentMount.clientHeight;

        const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
        camera.position.set(0, 0.55, 5.4);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.2;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        currentMount.appendChild(renderer.domElement);

        // --- ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ ДЛЯ СКРУГЛЁННОГО КУБА ---
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
                depth: d - 2 * r,
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

        // --- МАТЕРИАЛЫ ---
        // Фиолетовый металлик кузова с глубоким глянцем
        const bodyMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x22123d,
            metalness: 0.88,
            roughness: 0.18,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            reflectivity: 0.95,
        });

        // Тёмный полированный металл шарниров шеи
        const darkChromeMaterial = new THREE.MeshStandardMaterial({
            color: 0x1f232b,
            metalness: 0.95,
            roughness: 0.22,
        });

        // Светлая матовая лицевая панель
        const facePlateMaterial = new THREE.MeshStandardMaterial({
            color: 0xcebccc,
            metalness: 0.15,
            roughness: 0.45,
        });

        // Выпуклые глянцевые белые глаза-линзы с мягким внутренним свечением
        const eyeMaterial = new THREE.MeshStandardMaterial({
            color: 0xf8f8fa,
            emissive: 0xffffff,
            emissiveIntensity: 0.4,
            roughness: 0.1,
            metalness: 0.1,
        });

        // --- СБОРКА РОБОТА ---
        const robot = new THREE.Group();
        robot.position.set(0, -0.42, 0);
        scene.add(robot);

        // 1. Кубическое основание со скруглёнными гранями
        const baseGeo = createRoundedBoxGeometry(1.35, 1.35, 1.35, 0.08, 4);
        const baseMesh = new THREE.Mesh(baseGeo, bodyMaterial);
        baseMesh.castShadow = true;
        baseMesh.receiveShadow = true;
        robot.add(baseMesh);

        // 2. Механическая шарнирная шея
        const neckGroup = new THREE.Group();
        neckGroup.position.set(0, 0.68, 0);
        robot.add(neckGroup);

        // Два цилиндрических штифта-опоры внизу шеи
        const pinGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.16, 16);
        const pinLeft = new THREE.Mesh(pinGeo, darkChromeMaterial);
        pinLeft.position.set(-0.12, 0.08, 0);
        neckGroup.add(pinLeft);

        const pinRight = new THREE.Mesh(pinGeo, darkChromeMaterial);
        pinRight.position.set(0.12, 0.08, 0);
        neckGroup.add(pinRight);

        // Нижнее полушарие-основание шеи
        const socketGeo = new THREE.SphereGeometry(0.25, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
        const socketMesh = new THREE.Mesh(socketGeo, darkChromeMaterial);
        socketMesh.rotation.x = Math.PI;
        socketMesh.position.y = 0.25;
        neckGroup.add(socketMesh);

        // Верхний перевёрнутый конус-шарнир
        const coneGeo = new THREE.CylinderGeometry(0.28, 0.16, 0.35, 28);
        const coneMesh = new THREE.Mesh(coneGeo, darkChromeMaterial);
        coneMesh.position.y = 0.42;
        neckGroup.add(coneMesh);

        // 3. Голова робота с точкой вращения в шарнире
        const headPivot = new THREE.Group();
        headPivot.position.set(0, 0.58, 0);
        neckGroup.add(headPivot);

        // Корпус головы со скруглёнными углами
        const headGeo = createRoundedBoxGeometry(1.3, 0.95, 0.98, 0.12, 5);
        const headMesh = new THREE.Mesh(headGeo, bodyMaterial);
        headMesh.position.set(0, 0.45, 0);
        headMesh.castShadow = true;
        headPivot.add(headMesh);

        // Передняя панель-экран
        const facePlateGeo = createRoundedBoxGeometry(1.04, 0.72, 0.08, 0.08, 4);
        const facePlate = new THREE.Mesh(facePlateGeo, facePlateMaterial);
        facePlate.position.set(0, 0.45, 0.48);
        headPivot.add(facePlate);

        // Выпуклые глаза
        const eyeGeo = new THREE.SphereGeometry(0.13, 32, 24);

        const eyeLeft = new THREE.Mesh(eyeGeo, eyeMaterial);
        eyeLeft.position.set(-0.22, 0.49, 0.52);
        eyeLeft.scale.set(1, 1.15, 0.55);
        headPivot.add(eyeLeft);

        const eyeRight = new THREE.Mesh(eyeGeo, eyeMaterial);
        eyeRight.position.set(0.22, 0.49, 0.52);
        eyeRight.scale.set(1, 1.15, 0.55);
        headPivot.add(eyeRight);

        // Боковые круглые разъёмы на висках
        const earRingGeo = new THREE.TorusGeometry(0.15, 0.02, 16, 32);

        const earLeft = new THREE.Mesh(earRingGeo, darkChromeMaterial);
        earLeft.position.set(-0.66, 0.45, 0);
        earLeft.rotation.y = Math.PI / 2;
        headPivot.add(earLeft);

        const earRight = new THREE.Mesh(earRingGeo, darkChromeMaterial);
        earRight.position.set(0.66, 0.45, 0);
        earRight.rotation.y = Math.PI / 2;
        headPivot.add(earRight);

        // 4. Тёмный круглый пол с пятном света
        const floorGeo = new THREE.PlaneGeometry(12, 12);
        const floorMat = new THREE.MeshStandardMaterial({
            color: 0x050109,
            roughness: 0.8,
            metalness: 0.2,
        });
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = -0.68;
        floor.receiveShadow = true;
        robot.add(floor);

        // Овальное световое пятно на полу (малиновый градиент)
        const spotTextureCanvas = document.createElement("canvas");
        spotTextureCanvas.width = 256;
        spotTextureCanvas.height = 256;
        const ctx = spotTextureCanvas.getContext("2d");
        if (ctx) {
            const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
            grad.addColorStop(0, "rgba(225, 0, 115, 0.75)");
            grad.addColorStop(0.4, "rgba(180, 0, 140, 0.4)");
            grad.addColorStop(0.8, "rgba(80, 0, 120, 0.1)");
            grad.addColorStop(1, "rgba(0, 0, 0, 0)");
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, 256, 256);
        }
        const spotTexture = new THREE.CanvasTexture(spotTextureCanvas);
        const poolGeo = new THREE.PlaneGeometry(4.2, 4.2);
        const poolMat = new THREE.MeshBasicMaterial({
            map: spotTexture,
            transparent: true,
            opacity: 0.9,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });
        const poolMesh = new THREE.Mesh(poolGeo, poolMat);
        poolMesh.rotation.x = -Math.PI / 2;
        poolMesh.position.set(0.2, -0.67, 0.2);
        robot.add(poolMesh);

        // --- СТУДИЙНОЕ ОСВЕЩЕНИЕ ---
        const ambientLight = new THREE.AmbientLight(0x160724, 1.4);
        scene.add(ambientLight);

        // Направленный малиновый свет справа с мягкой тенью
        const spotMagenta = new THREE.SpotLight(0xff0066, 48, 14, Math.PI / 3.5, 0.4, 1);
        spotMagenta.position.set(3.4, 2.8, 3.5);
        spotMagenta.castShadow = true;
        spotMagenta.shadow.bias = -0.001;
        scene.add(spotMagenta);

        // Холодный фиолетовый заполняющий свет слева
        const pointViolet = new THREE.PointLight(0x8b22ee, 30, 12);
        pointViolet.position.set(-3.2, 2.0, 2.2);
        scene.add(pointViolet);

        // Верхний контровой свет для тонких световых полос на верхних скруглениях
        const topRim = new THREE.DirectionalLight(0xffffff, 2.6);
        topRim.position.set(-1, 5, 1);
        scene.add(topRim);

        // --- УПРАВЛЕНИЕ КУРСОРОМ ---
        const targetHead = { x: -0.15, y: 0.25, z: 0.1 };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = currentMount.getBoundingClientRect();
            const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

            // Плавные естественные пределы поворота
            targetHead.y = THREE.MathUtils.clamp(nx * 0.75, -0.7, 0.7);
            targetHead.x = THREE.MathUtils.clamp(-ny * 0.5 - 0.1, -0.4, 0.35);
            // Любопытный наклон головы набок при слежении за курсором
            targetHead.z = THREE.MathUtils.clamp(-nx * 0.22 + 0.08, -0.15, 0.22);
        };

        window.addEventListener("mousemove", handleMouseMove);

        // --- АНИМАЦИОННЫЙ ЦИКЛ ---
        let animationFrameId: number;
        const clock = new THREE.Clock();

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            const time = clock.getElapsedTime();

            // Плавное следование взгляда головы (lerp)
            headPivot.rotation.y += (targetHead.y - headPivot.rotation.y) * 0.07;
            headPivot.rotation.x += (targetHead.x - headPivot.rotation.x) * 0.07;
            headPivot.rotation.z += (targetHead.z - headPivot.rotation.z) * 0.07;

            // Мягкое дыхание
            robot.position.y = -0.42 + Math.sin(time * 1.8) * 0.02;

            // Моргание глаз
            const blink = time % 4.2;
            if (blink > 4.05) {
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
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
            if (currentMount.contains(renderer.domElement)) {
                currentMount.removeChild(renderer.domElement);
            }
            renderer.dispose();
            baseGeo.dispose();
            headGeo.dispose();
            facePlateGeo.dispose();
            eyeGeo.dispose();
            coneGeo.dispose();
            spotTexture.dispose();
        };
    }, []);

    return (
        <div
            ref={mountRef}
            className="w-full h-full cursor-grab active:cursor-grabbing bg-[#050109] flex items-center justify-center relative overflow-hidden"
        />
    );
}

export default Real3DCanvas;