"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function SeashoreOceanCanvas({ onPaletteRefReady }: { onPaletteRefReady?: (fn: (mode: "twilight" | "biolum" | "golden" | "mono") => void) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [automataActive, setAutomataActive] = useState<boolean>(false);
  const [currentPatternName, setCurrentPatternName] =
    useState<string>("Snapped Particles");
  const [paletteMode, setPaletteMode] = useState<
    "twilight" | "biolum" | "golden" | "mono"
  >("golden");
  const [hudCollapsed, setHudCollapsed] = useState<boolean>(false);

  useEffect(() => {
    if (automataActive) {
      setHudCollapsed(false);
      const timer = setTimeout(() => setHudCollapsed(true), 4000);
      return () => clearTimeout(timer);
    }
  }, [automataActive]);

  const triggerPatternRef = useRef<((name: string) => void) | null>(null);
  const setPaletteRef = useRef<
    ((mode: "twilight" | "biolum" | "golden" | "mono") => void) | null
  >(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let waveParticles: THREE.Points;
    let waveGeometry: THREE.BufferGeometry;
    let wavePositions: Float32Array;
    let waveInitialPositions: Float32Array;
    let waveColors: Float32Array;
    let oceanParticles: THREE.Points;
    let oceanGeometry: THREE.BufferGeometry;
    let oceanPositions: Float32Array;
    let oceanOriginalPositions: Float32Array;
    let oceanVelocities: Float32Array;
    let oceanColors: Float32Array;
    let sunMesh: THREE.Mesh;
    let sunGlowMesh: THREE.Mesh;

    // ─── BLACK HOLE STATE MACHINE ───
    let blackHoleMesh: THREE.Mesh;
    let bhRenderTarget: THREE.WebGLRenderTarget;
    let bhLensingMaterial: THREE.ShaderMaterial;
    let bhLensingScene: THREE.Scene;
    let bhLensingCamera: THREE.OrthographicCamera;
    const bhRaycaster = new THREE.Raycaster();
    const bhMouseNDC = new THREE.Vector2();

    let bhState: 'sun' | 'collapsing' | 'blackhole' | 'reverting' = 'sun';
    let bhCollapseStartTime = 0;
    let bhRevertStartTime = 0;
    let bhHoldStartTime = 0;
    let bhIsHolding = false;
    let bhIsDragging = false;
    let bhDragOffsetX = 0;
    let bhDragOffsetY = 0;
    let bhCoronaScale = 1.0;
    let bhSunScale = 1.0;
    let bhHorizonScale = 0.0;
    let bhLensStrength = 0.0;
    const bhOriginalPos = new THREE.Vector3(38, 24, -280);
    const bhWorldPos = new THREE.Vector3(38, 24, -280);
    // Snapshot of collapse progress when user releases, used for smooth revert
    let bhRevertFromCoronaScale = 1.0;
    let bhRevertFromSunScale = 1.0;

    const isMobileView = () => window.innerWidth < 768 || ('ontouchstart' in window);
    const getLensMax = () => isMobileView() ? 0.008 : 0.02;

    const BH_LENSING_FRAG = `
      varying vec2 vUv;
      uniform sampler2D tScene;
      uniform vec2 uResolution;
      uniform vec2 uBlackHolePos;
      uniform float uBlackHoleRadius;
      uniform float uLensStrength;
      uniform float uActive;

      void main() {
        vec2 uv = vUv;
        vec2 diff = uv - uBlackHolePos;
        float aspect = uResolution.x / uResolution.y;
        diff.x *= aspect;
        float dist = length(diff);
        vec2 dir = (dist > 0.0001) ? normalize(diff) : vec2(0.0);

        float distortion = uLensStrength / (dist * dist + 0.0005);
        distortion *= uActive;
        distortion = min(distortion, 0.35);

        // Subtract to magnify (push background outwards) instead of pulling inwards
        vec2 distortedUV = uv - dir * distortion * vec2(1.0 / aspect, 1.0);

        vec4 color = texture2D(tScene, distortedUV);
        
        // Prevent edge clamping artifacts by hiding out-of-bounds samples
        if (distortedUV.x < 0.0 || distortedUV.x > 1.0 || distortedUV.y < 0.0 || distortedUV.y > 1.0) {
            color = vec4(0.0);
        }

        float corrDist = dist / aspect;
        float horizonMask = smoothstep(uBlackHoleRadius - 0.004, uBlackHoleRadius, corrDist);

        gl_FragColor = vec4(color.rgb * horizonMask, 1.0);
      }
    `;


    let width = window.innerWidth;
    let height = window.innerHeight;

    let activePalette: "twilight" | "biolum" | "golden" | "mono" = "golden";

    // Three.js Color Lerping Targets
    const currentSunColor = new THREE.Color(0xf97316);
    const targetSunColor = new THREE.Color(0xf97316);
    const currentCoronaColor = new THREE.Color(0xfb923c);
    const targetCoronaColor = new THREE.Color(0xfb923c);

    // 3D Raycasted Mouse Coordinates for spherical repulsion
    const mouse = {
      x: 0,
      y: 0,
      worldX: 0,
      worldY: 0,
      worldZ: 0,
      targetWorldX: 0,
      targetWorldY: 0,
      targetWorldZ: 0,
      isHovering: false,
    };

    const ripples: {
      x: number;
      z: number;
      startTime: number;
      amplitude: number;
    }[] = [];

    let clickCount = 0;
    let lastClickTime = 0;

    /* GAME OF LIFE PHASED TRANSITION ENGINE */
    let isLifeMode = false;
    let waveCalmFactor = 1.0; // 1.0 = full waves, 0.0 = completely flattened calm surface
    let snapTransitionFactor = 0; // 0 = organic wave/float, 1 = snapped to grid
    let lifeStartedTime = 0;
    const GRID_W = 150;
    const GRID_H = 95;
    const TOTAL_WAVE_PARTICLES = GRID_W * GRID_H;
    const DEEP_OCEAN_PARTICLES = 1900;

    const xSpread = 430;
    const zNear = 125;
    const zFar = -325;

    let lifeGrid = new Uint8Array(GRID_W * GRID_H);
    let nextLifeGrid = new Uint8Array(GRID_W * GRID_H);
    let cellAlphas = new Float32Array(GRID_W * GRID_H);
    let lastLifeStepTime = 0;
    const LIFE_STEP_INTERVAL = 0.15;

    function applyTheme(theme: "twilight" | "biolum" | "golden" | "mono") {
      activePalette = theme;
      setPaletteMode(theme);
      if (typeof document !== "undefined") {
        document.documentElement.setAttribute("data-theme", theme);
      }

      if (theme === "mono") {
        targetSunColor.setHex(0xffffff);
        targetCoronaColor.setHex(0xffffff);
        if (renderer) renderer.setClearColor(0x000000, 1);
        if (scene) scene.fog = new THREE.FogExp2(0x000000, 0.0018);
      } else if (theme === "biolum") {
        targetSunColor.setHex(0x06b6d4);
        targetCoronaColor.setHex(0xa855f7);
        if (renderer) renderer.setClearColor(0x020f0d, 1);
        if (scene) scene.fog = new THREE.FogExp2(0x020f0d, 0.0018);
      } else if (theme === "golden") {
        targetSunColor.setHex(0xf59e0b);
        targetCoronaColor.setHex(0xea580c);
        if (renderer) renderer.setClearColor(0x0f0a03, 1);
        if (scene) scene.fog = new THREE.FogExp2(0x0f0a03, 0.0018);
      } else {
        targetSunColor.setHex(0xf97316);
        targetCoronaColor.setHex(0xfb923c);
        if (renderer) renderer.setClearColor(0x030712, 1);
        if (scene) scene.fog = new THREE.FogExp2(0x030712, 0.0018);
      }
    }

    /* PHASE 1 & 2: SNAP PARTICLES AND INITIATE CALMING PHASE */
    function initiateGameOfLifeSequence() {
      lifeGrid.fill(0);
      nextLifeGrid.fill(0);

      // Sample floating particles
      if (oceanPositions) {
        for (let i = 0; i < DEEP_OCEAN_PARTICLES; i++) {
          const px = oceanPositions[i * 3];
          const pz = oceanPositions[i * 3 + 2];
          const normalizedX = (px + xSpread / 2) / xSpread;
          const normalizedZ = (zNear - pz) / (zNear - zFar);

          if (
            normalizedX >= 0 &&
            normalizedX < 1 &&
            normalizedZ >= 0 &&
            normalizedZ < 1
          ) {
            const gx = Math.min(
              GRID_W - 1,
              Math.max(0, Math.floor(normalizedX * GRID_W))
            );
            const gy = Math.min(
              GRID_H - 1,
              Math.max(0, Math.floor(Math.pow(normalizedZ, 1 / 1.7) * GRID_H))
            );
            const idx = gy * GRID_W + gx;
            lifeGrid[idx] = 1;
            cellAlphas[idx] = 0.18;
          }
        }
      }

      if (wavePositions) {
        for (let idx = 0; idx < TOTAL_WAVE_PARTICLES; idx++) {
          const py = wavePositions[idx * 3 + 1];
          if (py > 2.2 || Math.random() < 0.08) {
            lifeGrid[idx] = 1;
            cellAlphas[idx] = 0.18;
          }
        }
      }

      setCurrentPatternName("Live Spatial Snapshot");
      lifeStartedTime = clock.getElapsedTime();
    }

    function clearLifeGrid() {
      lifeGrid.fill(0);
      nextLifeGrid.fill(0);
      cellAlphas.fill(0.15);
    }

    function seedRandom() {
      clearLifeGrid();
      for (let i = 0; i < GRID_W * GRID_H; i++) {
        lifeGrid[i] = Math.random() < 0.2 ? 1 : 0;
        cellAlphas[i] = lifeGrid[i] ? 1.0 : 0.15;
      }
      setCurrentPatternName("Random Density");
    }

    function seedGliderGun(startX = 20, startY = 25) {
      clearLifeGrid();
      const gunCoords = [
        [24, 0],
        [22, 1],
        [24, 1],
        [12, 2],
        [13, 2],
        [20, 2],
        [21, 2],
        [34, 2],
        [35, 2],
        [11, 3],
        [15, 3],
        [20, 3],
        [21, 3],
        [34, 3],
        [35, 3],
        [0, 4],
        [1, 4],
        [10, 4],
        [16, 4],
        [20, 4],
        [21, 4],
        [0, 5],
        [1, 5],
        [10, 5],
        [14, 5],
        [16, 5],
        [17, 5],
        [22, 5],
        [24, 5],
        [10, 6],
        [16, 6],
        [24, 6],
        [11, 7],
        [15, 7],
        [12, 8],
        [13, 8],
      ];
      for (const [gx, gy] of gunCoords) {
        const x = (startX + gx) % GRID_W;
        const y = (startY + gy) % GRID_H;
        lifeGrid[y * GRID_W + x] = 1;
        cellAlphas[y * GRID_W + x] = 1.0;
      }
      setCurrentPatternName("Gosper Glider Gun");
    }

    function seedAcorn(cx = 75, cy = 45) {
      clearLifeGrid();
      const acornCoords = [
        [1, 0],
        [3, 1],
        [0, 2],
        [1, 2],
        [4, 2],
        [5, 2],
        [6, 2],
      ];
      for (const [gx, gy] of acornCoords) {
        const x = (cx + gx) % GRID_W;
        const y = (cy + gy) % GRID_H;
        lifeGrid[y * GRID_W + x] = 1;
        cellAlphas[y * GRID_W + x] = 1.0;
      }
      setCurrentPatternName("Acorn (Methuselah)");
    }

    function seedPulsarPattern(cx = 75, cy = 45) {
      clearLifeGrid();
      const offsets = [-6, -1, 1, 6];
      const bars = [-4, -3, -2, 2, 3, 4];
      for (const o of offsets) {
        for (const b of bars) {
          const x1 = (cx + o + GRID_W) % GRID_W;
          const y1 = (cy + b + GRID_H) % GRID_H;
          lifeGrid[y1 * GRID_W + x1] = 1;

          const x2 = (cx + b + GRID_W) % GRID_W;
          const y2 = (cy + o + GRID_H) % GRID_H;
          lifeGrid[y2 * GRID_W + x2] = 1;
        }
      }
      setCurrentPatternName("Pulsar Oscillator");
    }

    triggerPatternRef.current = (name: string) => {
      if (name === "snap") initiateGameOfLifeSequence();
      else if (name === "gun") seedGliderGun(25, 30);
      else if (name === "pulsar") seedPulsarPattern(75, 45);
      else if (name === "acorn") seedAcorn(75, 45);
      else if (name === "random") seedRandom();
      else if (name === "clear") {
        clearLifeGrid();
        setCurrentPatternName("Cleared");
      }
    };

    setPaletteRef.current = (
      mode: "twilight" | "biolum" | "golden" | "mono"
    ) => {
      applyTheme(mode);
    };

    function seedGlider(x: number, y: number) {
      const pattern = [
        [0, 1, 0],
        [0, 0, 1],
        [1, 1, 1],
      ];
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          const gx = (x + c) % GRID_W;
          const gy = (y + r) % GRID_H;
          lifeGrid[gy * GRID_W + gx] = pattern[r][c];
          cellAlphas[gy * GRID_W + gx] = 1.0;
        }
      }
    }

    function stepLife() {
      for (let y = 0; y < GRID_H; y++) {
        for (let x = 0; x < GRID_W; x++) {
          let neighbors = 0;
          for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
              if (dx === 0 && dy === 0) continue;
              const nx = (x + dx + GRID_W) % GRID_W;
              const ny = (y + dy + GRID_H) % GRID_H;
              neighbors += lifeGrid[ny * GRID_W + nx];
            }
          }

          const idx = y * GRID_W + x;
          const alive = lifeGrid[idx];

          if (alive === 1) {
            nextLifeGrid[idx] = neighbors === 2 || neighbors === 3 ? 1 : 0;
          } else {
            nextLifeGrid[idx] = neighbors === 3 ? 1 : 0;
          }
        }
      }

      const temp = lifeGrid;
      lifeGrid = nextLifeGrid;
      nextLifeGrid = temp;
    }

    let scrollProgress = 0;
    let targetScrollProgress = 0;
    let animationFrameId: number;

    function init() {
      scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x030712, 0.0018);

      camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 3000);
      camera.position.set(0, 45, 160);
      camera.lookAt(0, 10, 0);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x030712, 1);

      if (containerRef.current) {
        containerRef.current.innerHTML = "";
        containerRef.current.appendChild(renderer.domElement);
      }

      createHorizonSun();
      createSeashoreWaveParticles();
      createDeepOceanParticles();
      applyTheme("twilight");

      // ─── BLACK HOLE POST-PROCESSING ───
      bhRenderTarget = new THREE.WebGLRenderTarget(width, height, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
      });

      bhLensingMaterial = new THREE.ShaderMaterial({
        uniforms: {
          tScene: { value: bhRenderTarget.texture },
          uResolution: { value: new THREE.Vector2(width, height) },
          uBlackHolePos: { value: new THREE.Vector2(0.5, 0.5) },
          uBlackHoleRadius: { value: 0.05 },
          uLensStrength: { value: 0.0 },
          uActive: { value: 0.0 },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `,
        fragmentShader: BH_LENSING_FRAG,
        depthTest: false,
        depthWrite: false,
      });

      bhLensingScene = new THREE.Scene();
      bhLensingCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
      bhLensingScene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), bhLensingMaterial));

      const bhGeo = new THREE.CircleGeometry(36, 64);
      const bhMat = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
      blackHoleMesh = new THREE.Mesh(bhGeo, bhMat);
      blackHoleMesh.visible = false;
      blackHoleMesh.position.copy(bhOriginalPos);
      scene.add(blackHoleMesh);

      window.addEventListener("resize", handleResize);
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("click", handleClick);
      window.addEventListener("pointerdown", handleBHPointerDown, { passive: false });
      window.addEventListener("pointerup", handleBHPointerUp, { passive: false });
      window.addEventListener("pointercancel", handleBHPointerUp, { passive: false });
      window.addEventListener("pointermove", handleBHPointerMove, { passive: false });

      handleScroll();
      animate();
    }

    function createSolarLimbTexture(): THREE.CanvasTexture {
      const canvas = document.createElement("canvas");
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1.0)");
        gradient.addColorStop(0.35, "rgba(255, 255, 255, 0.96)");
        gradient.addColorStop(0.75, "rgba(255, 255, 255, 0.85)");
        gradient.addColorStop(0.95, "rgba(255, 255, 255, 0.5)");
        gradient.addColorStop(1.0, "rgba(255, 255, 255, 0.0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 128, 128);
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    }

    function createHorizonSun() {
      const sunGeometry = new THREE.PlaneGeometry(72, 72);
      const sunTexture = createSolarLimbTexture();
      const sunMaterial = new THREE.MeshBasicMaterial({
        map: sunTexture,
        transparent: true,
        opacity: 0.96,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
      sunMesh.position.set(38, 24, -280);
      scene.add(sunMesh);

      const coronaGeo = new THREE.RingGeometry(32.5, 52, 64);
      const coronaMat = new THREE.MeshBasicMaterial({
        color: 0xfb923c,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
      });
      const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
      sunMesh.add(coronaMesh);

      const glowGeo = new THREE.RingGeometry(52.5, 84, 64);
      const glowMat = new THREE.MeshBasicMaterial({
        color: 0xfdba74,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.14,
        blending: THREE.AdditiveBlending,
      });
      sunGlowMesh = new THREE.Mesh(glowGeo, glowMat);
      sunMesh.add(sunGlowMesh);
    }

    function createGlowPointTexture(): THREE.CanvasTexture {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1.0)");
        gradient.addColorStop(0.25, "rgba(255, 255, 255, 0.85)");
        gradient.addColorStop(0.6, "rgba(255, 255, 255, 0.3)");
        gradient.addColorStop(1.0, "rgba(0, 0, 0, 0.0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    }

    function createSeashoreWaveParticles() {
      waveGeometry = new THREE.BufferGeometry();
      wavePositions = new Float32Array(TOTAL_WAVE_PARTICLES * 3);
      waveInitialPositions = new Float32Array(TOTAL_WAVE_PARTICLES * 3);
      waveColors = new Float32Array(TOTAL_WAVE_PARTICLES * 3);

      let idx = 0;
      for (let ix = 0; ix < GRID_W; ix++) {
        for (let iz = 0; iz < GRID_H; iz++) {
          const u = ix / (GRID_W - 1);
          const x = (u - 0.5) * xSpread;

          const v = iz / (GRID_H - 1);
          const nonLinearV = Math.pow(v, 1.7);
          const z = zNear - nonLinearV * (zNear - zFar);
          const y = 0;

          wavePositions[idx * 3] = x;
          wavePositions[idx * 3 + 1] = y;
          wavePositions[idx * 3 + 2] = z;

          waveInitialPositions[idx * 3] = x;
          waveInitialPositions[idx * 3 + 1] = y;
          waveInitialPositions[idx * 3 + 2] = z;

          const depthRatio = v;
          const r = 0.15 * (1 - depthRatio) + 0.98 * Math.pow(depthRatio, 3.2);
          const g = 0.74 * (1 - depthRatio) + 0.58 * Math.pow(depthRatio, 2.0);
          const b = 0.98 * (1 - depthRatio) + 0.88 * depthRatio;

          waveColors[idx * 3] = r;
          waveColors[idx * 3 + 1] = g;
          waveColors[idx * 3 + 2] = b;

          idx++;
        }
      }

      waveGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(wavePositions, 3)
      );
      waveGeometry.setAttribute(
        "color",
        new THREE.BufferAttribute(waveColors, 3)
      );

      const waveMaterial = new THREE.PointsMaterial({
        size: 3.3,
        map: createGlowPointTexture(),
        vertexColors: true,
        transparent: true,
        opacity: 0.92,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      waveParticles = new THREE.Points(waveGeometry, waveMaterial);
      scene.add(waveParticles);
    }

    function createDeepOceanParticles() {
      oceanGeometry = new THREE.BufferGeometry();
      oceanPositions = new Float32Array(DEEP_OCEAN_PARTICLES * 3);
      oceanOriginalPositions = new Float32Array(DEEP_OCEAN_PARTICLES * 3);
      oceanVelocities = new Float32Array(DEEP_OCEAN_PARTICLES * 3);
      oceanColors = new Float32Array(DEEP_OCEAN_PARTICLES * 3);

      for (let i = 0; i < DEEP_OCEAN_PARTICLES; i++) {
        const x = (Math.random() - 0.5) * 470;
        const y = -25 - Math.random() * 320;
        const z = (Math.random() - 0.5) * 370;

        oceanPositions[i * 3] = x;
        oceanPositions[i * 3 + 1] = y;
        oceanPositions[i * 3 + 2] = z;

        oceanOriginalPositions[i * 3] = x;
        oceanOriginalPositions[i * 3 + 1] = y;
        oceanOriginalPositions[i * 3 + 2] = z;

        oceanVelocities[i * 3] = 0;
        oceanVelocities[i * 3 + 1] = 0;
        oceanVelocities[i * 3 + 2] = 0;

        oceanColors[i * 3] = 0.15;
        oceanColors[i * 3 + 1] = 0.85;
        oceanColors[i * 3 + 2] = 0.95;
      }

      oceanGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(oceanPositions, 3)
      );
      oceanGeometry.setAttribute(
        "color",
        new THREE.BufferAttribute(oceanColors, 3)
      );

      const oceanMaterial = new THREE.PointsMaterial({
        size: 3.8,
        map: createGlowPointTexture(),
        vertexColors: true,
        transparent: true,
        opacity: 0.88,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      oceanParticles = new THREE.Points(oceanGeometry, oceanMaterial);
      scene.add(oceanParticles);
    }

    // ─── BLACK HOLE INTERACTION ───
    function bhIsSunHit(cx: number, cy: number): boolean {
      if (!sunMesh || bhState !== 'sun') return false;
      bhMouseNDC.x = (cx / width) * 2 - 1;
      bhMouseNDC.y = -(cy / height) * 2 + 1;
      bhRaycaster.setFromCamera(bhMouseNDC, camera);
      return bhRaycaster.intersectObject(sunMesh, false).length > 0;
    }

    function bhIsNearHole(cx: number, cy: number): boolean {
      const s = bhWorldPos.clone().project(camera);
      const sx = (s.x + 1) / 2 * width;
      const sy = (-s.y + 1) / 2 * height;
      return Math.hypot(cx - sx, cy - sy) < 100;
    }

    function bhScreenToWorld(cx: number, cy: number): THREE.Vector3 {
      const nx = (cx / width) * 2 - 1;
      const ny = -(cy / height) * 2 + 1;
      const nearPt = new THREE.Vector3(nx, ny, 0).unproject(camera);
      const farPt = new THREE.Vector3(nx, ny, 1).unproject(camera);
      const dir = new THREE.Vector3().subVectors(farPt, nearPt).normalize();
      const t = (bhOriginalPos.z - nearPt.z) / dir.z;
      return new THREE.Vector3().copy(nearPt).addScaledVector(dir, t);
    }

    function bhEaseOutBack(t: number): number {
      const c1 = 1.70158;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    }

    function bhClampToViewport() {
      const s = bhWorldPos.clone().project(camera);
      const m = 0.08;
      const cx = Math.max(-1 + m, Math.min(1 - m, s.x));
      const cy = Math.max(-1 + m, Math.min(1 - m, s.y));
      if (Math.abs(s.x - cx) > 0.001 || Math.abs(s.y - cy) > 0.001) {
        bhWorldPos.copy(bhScreenToWorld((cx + 1) / 2 * width, (-cy + 1) / 2 * height));
      }
    }

    function handleBHPointerDown(e: PointerEvent) {
      if (bhState === 'sun' && bhIsSunHit(e.clientX, e.clientY)) {
        bhIsHolding = true;
        bhHoldStartTime = performance.now();
        if (e.cancelable) e.preventDefault();
      } else if (bhState === 'blackhole' && bhIsNearHole(e.clientX, e.clientY)) {
        bhIsDragging = true;
        const s = bhWorldPos.clone().project(camera);
        bhDragOffsetX = e.clientX - (s.x + 1) / 2 * width;
        bhDragOffsetY = e.clientY - (-s.y + 1) / 2 * height;
        if (e.cancelable) e.preventDefault();
      }
    }

    function handleBHPointerUp() {
      if (bhIsHolding && bhState === 'collapsing') {
        // User released during collapse — revert back to sun
        bhRevertFromCoronaScale = bhCoronaScale;
        bhRevertFromSunScale = bhSunScale;
        bhState = 'reverting';
        bhRevertStartTime = performance.now();
      }
      bhIsHolding = false;
      bhIsDragging = false;
    }

    function handleBHPointerMove(e: PointerEvent) {
      if (bhIsDragging && bhState === 'blackhole') {
        if (e.cancelable) e.preventDefault();
        const tx = e.clientX - bhDragOffsetX;
        const ty = e.clientY - bhDragOffsetY;
        bhWorldPos.copy(bhScreenToWorld(tx, ty));
        bhClampToViewport();
      } else if (bhIsHolding && (bhState === 'sun' || bhState === 'collapsing')) {
        if (e.cancelable) e.preventDefault();
      }
    }

    function bhApplyVisuals() {
      if (!sunMesh) return;

      let sunOpacity = 1.0;
      let coronaOpacityMult = 1.0;
      let glowOpacityMult = 1.0;

      if (bhState === 'collapsing') {
        // Boost opacity and glow intensity as energy compresses during collapse
        sunOpacity = 1.0;
        coronaOpacityMult = 2.2;
        glowOpacityMult = 2.5;
      } else if (bhState === 'reverting') {
        sunOpacity = Math.min(1.0, bhSunScale * 0.96);
      }

      (sunMesh.material as THREE.MeshBasicMaterial).opacity = sunOpacity;

      if (sunMesh.children[0]) {
        (sunMesh.children[0] as THREE.Mesh).scale.setScalar(Math.max(0.001, bhCoronaScale));
        ((sunMesh.children[0] as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = Math.min(1.0, bhCoronaScale * 0.35 * coronaOpacityMult);
      }
      if (sunGlowMesh) {
        sunGlowMesh.scale.setScalar(Math.max(0.001, bhCoronaScale));
        (sunGlowMesh.material as THREE.MeshBasicMaterial).opacity = Math.min(1.0, bhCoronaScale * 0.14 * glowOpacityMult);
      }
      sunMesh.scale.setScalar(Math.max(0.001, bhSunScale));
      // Keep sun mesh position synced with bhWorldPos during all non-sun states
      if (bhState !== 'sun') {
        sunMesh.position.copy(bhWorldPos);
      }
      // Only show black hole disk when fully in blackhole state
      blackHoleMesh.visible = bhState === 'blackhole' && bhHorizonScale > 0.01;
      if (blackHoleMesh.visible) {
        blackHoleMesh.scale.setScalar(bhHorizonScale);
        blackHoleMesh.position.copy(bhWorldPos);
      }
    }

    function bhUpdate() {
      if (bhIsHolding && bhState === 'sun') {
        if (performance.now() - bhHoldStartTime > 200) {
          bhState = 'collapsing';
          bhCollapseStartTime = performance.now();
          // Keep bhIsHolding = true so we can detect release during collapse
        }
      }

      if (bhState === 'collapsing') {
        // If user released the pointer, the handleBHPointerUp already switched
        // to 'reverting', so this block only runs while still holding.
        const t = (performance.now() - bhCollapseStartTime) / 1000;
        if (t < 1.5) {
          // Phase 1: Corona collapses slowly with turbulence
          const progress = t / 1.5;
          const turbulence = (Math.sin(t * 40) + Math.cos(t * 27)) * 0.08 * progress;
          bhCoronaScale = Math.max(0, 1.0 - progress + turbulence);
          bhSunScale = 1.0 + (Math.sin(t * 30) * 0.04 * progress); // Slight tremble
          bhHorizonScale = 0;
          bhLensStrength = 0;
        } else if (t < 3.0) {
          // Phase 2: Sun collapses more violently
          const progress = (t - 1.5) / 1.5;
          const turbulence = (Math.sin(t * 50) + Math.cos(t * 37)) * 0.1 * (1.0 - progress);
          bhCoronaScale = 0;
          bhSunScale = Math.max(0, 1.0 - progress + turbulence);
          bhHorizonScale = 0;
          bhLensStrength = 0;
        } else if (t < 3.5) {
          // Phase 3: Black hole emerges
          bhCoronaScale = 0;
          bhSunScale = 0;
          const p = Math.min(1, (t - 3.0) / 0.5);
          bhHorizonScale = bhEaseOutBack(p);
          bhLensStrength = p * getLensMax();
        } else {
          bhState = 'blackhole';
          bhIsHolding = false;
          bhCoronaScale = 0;
          bhSunScale = 0;
          bhHorizonScale = 1.0;
          bhLensStrength = getLensMax();
          if (containerRef.current) {
            containerRef.current.style.zIndex = '50';
            containerRef.current.style.pointerEvents = 'auto';
          }
        }
        bhApplyVisuals();
      }

      if (bhState === 'blackhole') {
        bhApplyVisuals();
      }

      if (bhState === 'reverting') {
        const t = (performance.now() - bhRevertStartTime) / 1000;
        // Determine if we're reverting from a full black hole (has horizon) or mid-collapse
        const wasBlackHole = bhRevertFromSunScale <= 0.01 && bhRevertFromCoronaScale <= 0.01;

        if (wasBlackHole) {
          // Reverting from full black hole state — collapse horizon, move back, expand sun
          if (t < 0.4) {
            bhHorizonScale = Math.max(0, 1.0 - t / 0.4);
            bhLensStrength = getLensMax() * (1.0 - t / 0.4);
            bhSunScale = 0;
            bhCoronaScale = 0;
          } else if (t < 0.8) {
            bhHorizonScale = 0;
            bhLensStrength = 0;
            bhSunScale = 0;
            bhCoronaScale = 0;
            const moveT = (t - 0.4) / 0.4;
            bhWorldPos.lerp(bhOriginalPos, moveT * 0.2);
          } else if (t < 1.3) {
            const expandT = (t - 0.8) / 0.5;
            bhSunScale = Math.min(1.0, expandT);
            bhCoronaScale = Math.min(1.0, expandT);
            bhHorizonScale = 0;
            bhLensStrength = 0;
            bhWorldPos.copy(bhOriginalPos);
          } else {
            bhState = 'sun';
            bhSunScale = 1.0;
            bhCoronaScale = 1.0;
            bhHorizonScale = 0;
            bhLensStrength = 0;
            bhWorldPos.copy(bhOriginalPos);
            blackHoleMesh.visible = false;
            sunMesh.scale.setScalar(1.0);
            sunMesh.position.set(38, 24, -280);
            if (sunMesh.children[0]) (sunMesh.children[0] as THREE.Mesh).scale.setScalar(1.0);
            if (sunGlowMesh) sunGlowMesh.scale.setScalar(1.0);
            if (containerRef.current) {
              containerRef.current.style.zIndex = '0';
              containerRef.current.style.pointerEvents = 'none';
            }
          }
        } else {
          // Reverting from mid-collapse — smoothly restore sun/corona from wherever they were
          const revertDuration = 0.5;
          if (t < revertDuration) {
            const p = t / revertDuration;
            // Ease out quad
            const ease = 1 - (1 - p) * (1 - p);
            bhSunScale = bhRevertFromSunScale + (1.0 - bhRevertFromSunScale) * ease;
            bhCoronaScale = bhRevertFromCoronaScale + (1.0 - bhRevertFromCoronaScale) * ease;
            bhHorizonScale = 0;
            bhLensStrength = 0;
          } else {
            bhState = 'sun';
            bhSunScale = 1.0;
            bhCoronaScale = 1.0;
            bhHorizonScale = 0;
            bhLensStrength = 0;
            bhWorldPos.copy(bhOriginalPos);
            blackHoleMesh.visible = false;
            sunMesh.scale.setScalar(1.0);
            sunMesh.position.set(38, 24, -280);
            if (sunMesh.children[0]) (sunMesh.children[0] as THREE.Mesh).scale.setScalar(1.0);
            if (sunGlowMesh) sunGlowMesh.scale.setScalar(1.0);
            if (containerRef.current) {
              containerRef.current.style.zIndex = '0';
              containerRef.current.style.pointerEvents = 'none';
            }
          }
        }
        bhApplyVisuals();
      }

      if (bhLensingMaterial) {
        if (bhLensStrength > 0.0001 && (bhState === 'blackhole' || (bhState === 'collapsing' && bhSunScale <= 0.01) || (bhState === 'reverting' && bhHorizonScale > 0.01))) {
          const s = bhWorldPos.clone().project(camera);
          bhLensingMaterial.uniforms.uBlackHolePos.value.set((s.x + 1) / 2, (s.y + 1) / 2);
          bhLensingMaterial.uniforms.uLensStrength.value = bhLensStrength;
          bhLensingMaterial.uniforms.uActive.value = Math.min(1.0, bhLensStrength / (getLensMax() * 0.5));
          bhLensingMaterial.uniforms.uBlackHoleRadius.value = bhHorizonScale * 0.045;
        } else {
          // Ensure lensing is completely disabled when not needed
          bhLensingMaterial.uniforms.uLensStrength.value = 0;
          bhLensingMaterial.uniforms.uActive.value = 0;
        }
      }
    }

    function bhRender() {
      if (bhLensStrength > 0.0001 && bhRenderTarget && bhLensingMaterial) {
        renderer.setRenderTarget(bhRenderTarget);
        renderer.render(scene, camera);
        renderer.setRenderTarget(null);
        renderer.render(bhLensingScene, bhLensingCamera);
      } else {
        renderer.render(scene, camera);
      }
    }

    function handleClick(e: MouseEvent) {
      const now = performance.now() / 1000;
      if (now - lastClickTime < 0.85) {
        clickCount++;
      } else {
        clickCount = 1;
      }
      lastClickTime = now;

      // 3 clicks detected
      if (clickCount >= 3) {
        clickCount = 0;
        if (bhState === 'blackhole') {
          // Snapshot current state for revert animation
          bhRevertFromCoronaScale = bhCoronaScale;
          bhRevertFromSunScale = bhSunScale;
          bhState = 'reverting';
          bhRevertStartTime = performance.now();
          return;
        }
        isLifeMode = !isLifeMode;
        setAutomataActive(isLifeMode);
        if (isLifeMode) {
          initiateGameOfLifeSequence();
        }
      }

      if (scrollProgress < 0.3) {
        const rippleX = (e.clientX / window.innerWidth - 0.5) * 280;
        const rippleZ = 50;
        ripples.push({
          x: rippleX,
          z: rippleZ,
          startTime: now,
          amplitude: 8.0,
        });
        if (ripples.length > 5) ripples.shift();
      }

      if (isLifeMode && waveCalmFactor < 0.2) {
        const gridX = Math.floor((e.clientX / window.innerWidth) * GRID_W);
        const gridY = Math.min(
          GRID_H - 1,
          Math.max(0, Math.floor((1 - e.clientY / window.innerHeight) * GRID_H))
        );
        seedGlider(gridX, gridY);
      }
    }

    function handleMouseMove(e: MouseEvent) {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.isHovering = true;

      mouse.targetWorldX = mouse.x * 140;
      mouse.targetWorldY = camera.position.y + mouse.y * 90;
      mouse.targetWorldZ = camera.position.z - 110;

      if (isLifeMode && waveCalmFactor < 0.3) {
        const gx = Math.floor((e.clientX / window.innerWidth) * GRID_W);
        const gy = Math.min(
          GRID_H - 1,
          Math.max(0, Math.floor((1 - e.clientY / window.innerHeight) * GRID_H))
        );
        if (gx >= 0 && gx < GRID_W && gy >= 0 && gy < GRID_H) {
          lifeGrid[gy * GRID_W + gx] = 1;
          cellAlphas[gy * GRID_W + gx] = 1.0;
        }
      }
    }

    function handleTouchMove(e: TouchEvent) {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
        mouse.isHovering = true;
        mouse.targetWorldX = mouse.x * 140;
        mouse.targetWorldY = camera.position.y + mouse.y * 90;
        mouse.targetWorldZ = camera.position.z - 110;

        if (isLifeMode && waveCalmFactor < 0.3) {
          const gx = Math.floor((touch.clientX / window.innerWidth) * GRID_W);
          const gy = Math.min(
            GRID_H - 1,
            Math.max(
              0,
              Math.floor((1 - touch.clientY / window.innerHeight) * GRID_H)
            )
          );
          if (gx >= 0 && gx < GRID_W && gy >= 0 && gy < GRID_H) {
            lifeGrid[gy * GRID_W + gx] = 1;
          }
        }
      }
    }

    function handleScroll() {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      targetScrollProgress = Math.min(
        1,
        Math.max(0, scrollY / (window.innerHeight * 1.5))
      );
    }

    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      if (bhRenderTarget) bhRenderTarget.setSize(width, height);
      if (bhLensingMaterial) bhLensingMaterial.uniforms.uResolution.value.set(width, height);
    }

    const clock = new THREE.Clock();

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Gradual Sun & Corona Color Lerping in Three.js
      if (bhState === 'sun') {
        currentSunColor.lerp(targetSunColor, 0.06);
        currentCoronaColor.lerp(targetCoronaColor, 0.06);
        if (sunMesh) {
          (sunMesh.material as THREE.MeshBasicMaterial).color.copy(
            currentSunColor
          );
          if (sunMesh.children.length > 0) {
            (
              (sunMesh.children[0] as THREE.Mesh)
                .material as THREE.MeshBasicMaterial
            ).color.copy(currentCoronaColor);
          }
          if (sunGlowMesh) {
            (sunGlowMesh.material as THREE.MeshBasicMaterial).color.copy(
              currentCoronaColor
            );
          }
        }
      }

      /* PHASED SEQUENCE LOGIC:
         When isLifeMode turns ON:
         - waveCalmFactor decays from 1.0 down to 0.0 (waves calm down and flatten over ~0.8s)
         - snapTransitionFactor increases from 0.0 up to 1.0
         - Once waveCalmFactor is below 0.15, stepLife starts advancing generations!
      */
      const targetCalm = isLifeMode ? 0.0 : 1.0;
      waveCalmFactor += (targetCalm - waveCalmFactor) * 0.045; // Smooth calming easing

      const targetSnap = isLifeMode ? 1.0 : 0.0;
      snapTransitionFactor += (targetSnap - snapTransitionFactor) * 0.05;

      // Only advance Game of Life generations once waves have calmed and flattened
      if (
        isLifeMode &&
        waveCalmFactor < 0.25 &&
        elapsed - lastLifeStepTime > LIFE_STEP_INTERVAL
      ) {
        stepLife();
        lastLifeStepTime = elapsed;
      }

      scrollProgress += (targetScrollProgress - scrollProgress) * 0.07;

      const targetCamY = 45 - scrollProgress * 145;
      const targetCamZ = 160 - scrollProgress * 50;
      const targetLookY = 10 - scrollProgress * 110;

      camera.position.y += (targetCamY - camera.position.y) * 0.06;
      camera.position.z += (targetCamZ - camera.position.z) * 0.06;
      camera.lookAt(0, targetLookY, 0);

      if (sunMesh && bhState === 'sun') {
        sunMesh.position.y = 24 + scrollProgress * 92;
        const sunOpacity = Math.max(0, 0.95 - scrollProgress * 1.5);
        (sunMesh.material as THREE.MeshBasicMaterial).opacity = sunOpacity;
        if (sunGlowMesh) {
          (sunGlowMesh.material as THREE.MeshBasicMaterial).opacity =
            sunOpacity * 0.2;
        }
      }

      if (wavePositions && waveColors) {
        let idx = 0;
        for (let ix = 0; ix < GRID_W; ix++) {
          for (let iz = 0; iz < GRID_H; iz++) {
            const initX = waveInitialPositions[idx * 3];
            const initZ = waveInitialPositions[idx * 3 + 2];

            // Wave height modulated by waveCalmFactor (smoothly calms down and flattens!)
            const swell =
              Math.sin(initX * 0.032 + elapsed * 1.65 + initZ * 0.02) *
              5.4 *
              waveCalmFactor;
            const chop =
              Math.cos(initZ * 0.048 - elapsed * 1.15 + initX * 0.018) *
              3.9 *
              waveCalmFactor;
            const ripple =
              Math.sin(initX * 0.08 + initZ * 0.06 + elapsed * 2.2) *
              1.2 *
              waveCalmFactor;
            let baseHeight = swell + chop + ripple;

            const now = performance.now() / 1000;
            for (const r of ripples) {
              const age = now - r.startTime;
              if (age < 3.0) {
                const dist = Math.hypot(initX - r.x, initZ - r.z);
                const waveRadius = age * 65.0;
                const waveThickness = 25.0;
                if (Math.abs(dist - waveRadius) < waveThickness) {
                  const strength =
                    (1 - age / 3.0) * r.amplitude * waveCalmFactor;
                  baseHeight += Math.sin((dist - waveRadius) * 0.3) * strength;
                }
              }
            }

            const v = iz / (GRID_H - 1);

            // Palette colors
            let rBase = 0.15,
              gBase = 0.74,
              bBase = 0.98;
            if (activePalette === "mono") {
              rBase = 1.0;
              gBase = 1.0;
              bBase = 1.0;
            } else if (activePalette === "biolum") {
              rBase = 0.05 * (1 - v) + 0.65 * Math.pow(v, 2.5);
              gBase = 0.95 * (1 - v) + 0.25 * Math.pow(v, 2.0);
              bBase = 0.75 * (1 - v) + 0.98 * v;
            } else if (activePalette === "golden") {
              rBase = 0.98 * (1 - v) + 0.95 * Math.pow(v, 1.5);
              gBase = 0.65 * (1 - v) + 0.38 * Math.pow(v, 2.0);
              bBase = 0.1 * (1 - v) + 0.05 * v;
            } else {
              rBase = 0.15 * (1 - v) + 0.98 * Math.pow(v, 3.2);
              gBase = 0.74 * (1 - v) + 0.58 * Math.pow(v, 2.0);
              bBase = 0.98 * (1 - v) + 0.88 * v;
            }

            // Cellular Automata Modulation (only emerges once surface flattens)
            if (isLifeMode || snapTransitionFactor > 0.01) {
              const lifeIdx = iz * GRID_W + ix;
              const isAlive = lifeGrid[lifeIdx];
              const targetAlpha = isAlive ? 1.0 : 0.18;
              cellAlphas[lifeIdx] += (targetAlpha - cellAlphas[lifeIdx]) * 0.12;

              const alpha = cellAlphas[lifeIdx];
              // Subtle breathing elevation for living cells on the flat plane
              const automataHeight = alpha * 6.5 * (1 - waveCalmFactor);

              baseHeight += automataHeight;

              let rLife = rBase * 0.4 + alpha * 0.25;
              let gLife = gBase * 0.5 + alpha * 0.5;
              let bLife = bBase * 0.6 + alpha * 0.4;
              if (activePalette === "mono") {
                rLife = 0.3 + alpha * 0.7;
                gLife = 0.3 + alpha * 0.7;
                bLife = 0.3 + alpha * 0.7;
              }

              // Gradual color blend
              waveColors[idx * 3] += (rLife - waveColors[idx * 3]) * 0.08;
              waveColors[idx * 3 + 1] +=
                (gLife - waveColors[idx * 3 + 1]) * 0.08;
              waveColors[idx * 3 + 2] +=
                (bLife - waveColors[idx * 3 + 2]) * 0.08;
            } else {
              // Smooth gradual color lerp for theme switches
              waveColors[idx * 3] += (rBase - waveColors[idx * 3]) * 0.08;
              waveColors[idx * 3 + 1] +=
                (gBase - waveColors[idx * 3 + 1]) * 0.08;
              waveColors[idx * 3 + 2] +=
                (bBase - waveColors[idx * 3 + 2]) * 0.08;
            }

            const diveOffset =
              scrollProgress * 32 * Math.sin((ix / GRID_W) * Math.PI);
            wavePositions[idx * 3 + 1] = baseHeight - diveOffset;
            idx++;
          }
        }
        waveGeometry.attributes.position.needsUpdate = true;
        waveGeometry.attributes.color.needsUpdate = true;
        (waveParticles.material as THREE.PointsMaterial).opacity = Math.max(
          0.2,
          0.92 - scrollProgress * 0.65
        );
      }

      if (oceanPositions) {
        mouse.worldX += (mouse.targetWorldX - mouse.worldX) * 0.12;
        mouse.worldY += (mouse.targetWorldY - mouse.worldY) * 0.12;
        mouse.worldZ += (mouse.targetWorldZ - mouse.worldZ) * 0.12;

        const mouseRadius = 60.0;
        const mouseRepelForce = 3.8;

        for (let i = 0; i < DEEP_OCEAN_PARTICLES; i++) {
          const i3 = i * 3;
          let px = oceanPositions[i3];
          let py = oceanPositions[i3 + 1];
          let pz = oceanPositions[i3 + 2];

          const origX = oceanOriginalPositions[i3];
          const origY = oceanOriginalPositions[i3 + 1];
          const origZ = oceanOriginalPositions[i3 + 2];

          const floatOffset = Math.sin(elapsed * 0.85 + i) * 0.35;
          const driftX = Math.cos(elapsed * 0.38 + i * 2) * 0.25;

          const dx = px - mouse.worldX;
          const dy = py - mouse.worldY;
          const dz = pz - mouse.worldZ;
          const dist3D = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist3D < mouseRadius && mouse.isHovering && dist3D > 0.001) {
            const force = (1 - dist3D / mouseRadius) * mouseRepelForce;
            oceanVelocities[i3] += (dx / dist3D) * force;
            oceanVelocities[i3 + 1] += (dy / dist3D) * force;
            oceanVelocities[i3 + 2] += (dz / dist3D) * force;
          }

          px += oceanVelocities[i3];
          py += oceanVelocities[i3 + 1];
          pz += oceanVelocities[i3 + 2];

          oceanVelocities[i3] *= 0.82;
          oceanVelocities[i3 + 1] *= 0.82;
          oceanVelocities[i3 + 2] *= 0.82;

          px += (origX + driftX - px) * 0.06;
          py += (origY + floatOffset - py) * 0.06;
          pz += (origZ - pz) * 0.06;

          oceanPositions[i3] = px;
          oceanPositions[i3 + 1] = py;
          oceanPositions[i3 + 2] = pz;

          // Gradual color lerping for deep ocean / under the sea particles
          let tR = 0.15,
            tG = 0.85,
            tB = 0.95;
          if (activePalette === "mono") {
            tR = 1.0;
            tG = 1.0;
            tB = 1.0;
          } else if (activePalette === "biolum") {
            // Undersea palette variation with faint breathing glow.
            const paletteMixA = 0.5 + 0.5 * Math.sin(i * 0.41 + origY * 0.018);
            const paletteMixB =
              0.5 + 0.5 * Math.sin(i * 0.19 + origX * 0.012 + 1.7);
            const depthRatio = Math.min(
              1,
              Math.max(0, (Math.abs(origY) - 25) / 320)
            );

            // Base undersea colors: aqua, kelp-green, deep-lagoon blue.
            const aquaR = 0.04,
              aquaG = 0.86,
              aquaB = 0.95;
            const kelpR = 0.02,
              kelpG = 0.72,
              kelpB = 0.46;
            const lagoonR = 0.22,
              lagoonG = 0.62,
              lagoonB = 0.98;

            let baseR = aquaR + (kelpR - aquaR) * paletteMixA;
            let baseG = aquaG + (kelpG - aquaG) * paletteMixA;
            let baseB = aquaB + (kelpB - aquaB) * paletteMixA;

            const lagoonWeight = (0.15 + 0.55 * depthRatio) * paletteMixB;
            baseR += (lagoonR - baseR) * lagoonWeight;
            baseG += (lagoonG - baseG) * lagoonWeight;
            baseB += (lagoonB - baseB) * lagoonWeight;

            // Faint glow-dim cycle.
            const faintPulse =
              0.84 + 0.16 * Math.sin(elapsed * 1.7 + i * 0.27 + origZ * 0.01);

            // Stronger brightness when cursor physically repels particles.
            const displacement = Math.sqrt(
              (px - origX) * (px - origX) +
                (py - origY) * (py - origY) +
                (pz - origZ) * (pz - origZ)
            );
            const cursorBoost = 1.0 + Math.min(1.9, displacement / 14) * 1.35;
            const intensity = faintPulse * cursorBoost;

            tR = Math.min(1.8, baseR * intensity);
            tG = Math.min(1.8, baseG * intensity);
            tB = Math.min(1.8, baseB * intensity);
          } else if (activePalette === "golden") {
            tR = 0.98;
            tG = 0.65;
            tB = 0.15;
          }
          oceanColors[i3] += (tR - oceanColors[i3]) * 0.08;
          oceanColors[i3 + 1] += (tG - oceanColors[i3 + 1]) * 0.08;
          oceanColors[i3 + 2] += (tB - oceanColors[i3 + 2]) * 0.08;
        }

        oceanGeometry.attributes.position.needsUpdate = true;
        oceanGeometry.attributes.color.needsUpdate = true;
        const oceanMaterial = oceanParticles.material as THREE.PointsMaterial;
        const baseOpacity = Math.min(0.95, 0.22 + scrollProgress * 0.75);
        if (activePalette === "biolum") {
          const glowPulse = 0.9 + 0.1 * Math.sin(elapsed * 1.5);
          oceanMaterial.opacity = Math.min(0.98, baseOpacity * glowPulse);
        } else {
          oceanMaterial.opacity = baseOpacity;
        }
      }

      bhUpdate();
      bhRender();
    }

    init();
    applyTheme("golden");

    // Expose palette setter to parent
    if (onPaletteRefReady) {
      onPaletteRefReady((mode: "twilight" | "biolum" | "golden" | "mono") => {
        applyTheme(mode);
      });
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("pointerdown", handleBHPointerDown);
      window.removeEventListener("pointerup", handleBHPointerUp);
      window.removeEventListener("pointercancel", handleBHPointerUp);
      window.removeEventListener("pointermove", handleBHPointerMove);
      if (bhRenderTarget) bhRenderTarget.dispose();
      if (bhLensingMaterial) bhLensingMaterial.dispose();
      if (renderer) {
        renderer.dispose();
      }
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-0 touch-none"
        aria-hidden="true"
      />

      {/* Theme Switcher has been moved to Navbar */}

      {/* Cellular Automata HUD Controls when active */}
      {automataActive && (
        <div
          className={`hud-panel fixed top-20 right-6 z-40 bg-[#081226]/95 border border-[var(--accent-primary)]/40 backdrop-blur-xl shadow-2xl text-xs font-mono text-white/90 flex flex-col transition-[transform,width,height,padding,border-radius] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden ${
            hudCollapsed
              ? "w-7 h-10 p-0 rounded-l-xl rounded-r-none items-center justify-center"
              : "p-4 gap-2.5 rounded-2xl"
          }`}
          style={{
            transform: hudCollapsed
              ? "translateX(calc(100% - 1.15rem))"
              : "translateX(0)",
          }}
        >
          <button
            onClick={() => setHudCollapsed((prev) => !prev)}
            className={`z-10 text-white/85 hover:text-white transition-all ${
              hudCollapsed
                ? "w-7 h-10 border-0 bg-transparent flex items-center justify-center"
                : "absolute top-2 left-2 w-8 h-8 rounded-md bg-white/5 border border-white/15 hover:border-[var(--accent-primary)]"
            }`}
            aria-label={
              hudCollapsed
                ? "Expand Game of Life panel"
                : "Collapse Game of Life panel"
            }
            title={hudCollapsed ? "Expand panel" : "Collapse panel"}
          >
            {hudCollapsed ? "‹" : "›"}
          </button>

          <div
            className={`origin-top-right transition-[opacity,transform,max-height] duration-300 ease-out ${
              hudCollapsed
                ? "opacity-0 scale-95 max-h-0 pointer-events-none"
                : "opacity-100 scale-100 max-h-[420px]"
            }`}
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-2 pl-10">
              <div className="flex items-center gap-2 text-[var(--accent-primary)] font-bold">
                <span>Conway&apos;s Game of Life</span>
              </div>
              <span className="text-[10px] text-white/70 font-sans">
                Active
              </span>
            </div>

            <div className="text-[11px] text-white/75 mt-2">
              Pattern:{" "}
              <strong className="text-white">{currentPatternName}</strong> •
              Calmed &amp; Snapped
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              <button
                onClick={() =>
                  triggerPatternRef.current && triggerPatternRef.current("snap")
                }
                className="px-2.5 py-1 rounded-md bg-[var(--accent-primary)]/20 border border-[var(--accent-primary)]/40 text-[var(--accent-primary)] hover:bg-[var(--accent-primary)] hover:text-black text-[10px] font-bold transition-all"
              >
                Re-Snap
              </button>
              <button
                onClick={() =>
                  triggerPatternRef.current && triggerPatternRef.current("gun")
                }
                className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] text-[10px] font-semibold transition-all"
              >
                Glider Gun
              </button>
              <button
                onClick={() =>
                  triggerPatternRef.current &&
                  triggerPatternRef.current("pulsar")
                }
                className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] text-[10px] font-semibold transition-all"
              >
                Pulsar
              </button>
              <button
                onClick={() =>
                  triggerPatternRef.current &&
                  triggerPatternRef.current("acorn")
                }
                className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] text-[10px] font-semibold transition-all"
              >
                Acorn
              </button>
              <button
                onClick={() =>
                  triggerPatternRef.current &&
                  triggerPatternRef.current("clear")
                }
                className="px-2.5 py-1 rounded-md bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 text-[10px] font-semibold transition-all"
              >
                Clear
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
