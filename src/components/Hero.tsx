import { useState, useMemo, useRef, useEffect } from "react";
import { Trophy, Star, ShieldCheck} from "lucide-react";
import * as THREE from "three";

// ── Types (for existing 2D effects) ─────────────────────────────────────

interface TrailDot {
  x: number;
  y: number;
  life: number;
  size: number;
  isRing?: boolean;
}

interface HeroCoin {
  id: number;
  x: number;
  y: number;
}

// ── Golden Cursor Trail (unchanged) ────────────────────────────────────

function TrailCanvas({ containerRef }: { containerRef: React.RefObject<HTMLElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const dotsRef = useRef<TrailDot[]>([]);

  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    const handleMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      dotsRef.current.push({
        x: mouseRef.current.x,
        y: mouseRef.current.y,
        life: 1,
        size: 3 + Math.random() * 4,
      });
    };
    section.addEventListener("mousemove", handleMove);
    return () => section.removeEventListener("mousemove", handleMove);
  }, [containerRef]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let animId: number;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const dots = dotsRef.current;

      for (let i = dots.length - 1; i >= 0; i--) {
        const d = dots[i];
        d.life -= 0.02;
        if (d.life <= 0) {
          dots.splice(i, 1);
          continue;
        }
        const dx = mouseRef.current.x - d.x;
        const dy = mouseRef.current.y - d.y;
        d.x += dx * 0.08;
        d.y += dy * 0.08;

        const alpha = d.life * 0.7;
        const radius = d.size * d.life;
        ctx.beginPath();
        ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(253,224,71,${alpha})`;
        ctx.shadowColor = "#facc15";
        ctx.shadowBlur = 10 * d.life;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      if (Math.random() < 0.05 && mouseRef.current.x > 0) {
        dots.push({
          x: mouseRef.current.x,
          y: mouseRef.current.y,
          life: 1,
          size: 20 + Math.random() * 20,
          isRing: true,
        });
      }

      animId = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 5,
      }}
    />
  );
}

// ── 3D Scene (Three.js) – Fixed Camera, Smooth Earth Rotation ───────────

const ThreeScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const earthRef = useRef<THREE.Mesh | null>(null);
  const cloudsRef = useRef<THREE.Mesh | null>(null);
  const coinsRef = useRef<THREE.Group[]>([]);
  const requestRef = useRef<number | null>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050816);
    scene.fog = new THREE.FogExp2(0x050816, 0.0005);
    sceneRef.current = scene;

    // Camera: fixed position (no zoom, no orbit)
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.5, 12);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer with transparency for overlay
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404060);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    scene.add(dirLight);
    const fillLight = new THREE.PointLight(0x445566, 0.5);
    fillLight.position.set(0, -3, 0);
    scene.add(fillLight);
    const rimLight = new THREE.PointLight(0xffaa33, 0.8);
    rimLight.position.set(-2, 1, -4);
    scene.add(rimLight);
    const goldLight = new THREE.PointLight(0xfacc15, 0.6);
    goldLight.position.set(3, 2, 4);
    scene.add(goldLight);

    // Stars background
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 2000;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 200;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 80 - 40;
    }
    starGeometry.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1, transparent: true, opacity: 0.7 });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Earth textures
    const textureLoader = new THREE.TextureLoader();
    const earthMap = textureLoader.load("https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg");
    const earthSpecularMap = textureLoader.load("https://threejs.org/examples/textures/planets/earth_specular_2048.jpg");
    const earthNormalMap = textureLoader.load("https://threejs.org/examples/textures/planets/earth_normal_2048.jpg");
    const cloudMap = textureLoader.load("https://threejs.org/examples/textures/planets/earth_clouds_1024.png");

    const earthGeometry = new THREE.SphereGeometry(2.2, 128, 128);
    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthMap,
      specularMap: earthSpecularMap,
      specular: new THREE.Color("grey"),
      shininess: 5,
      normalMap: earthNormalMap,
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);
    earthRef.current = earth;

    const cloudGeometry = new THREE.SphereGeometry(2.22, 128, 128);
    const cloudMaterial = new THREE.MeshPhongMaterial({
      map: cloudMap,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });
    const clouds = new THREE.Mesh(cloudGeometry, cloudMaterial);
    scene.add(clouds);
    cloudsRef.current = clouds;

    // Floating Bitcoin coins (3D)
    const createBitcoinCoin = (x: number, y: number, z: number) => {
      const group = new THREE.Group();

      const cylinderGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.08, 64);
      const goldMaterial = new THREE.MeshStandardMaterial({
        color: 0xfacc15,
        emissive: 0x442200,
        emissiveIntensity: 0.3,
        metalness: 0.85,
        roughness: 0.25,
      });
      const body = new THREE.Mesh(cylinderGeo, goldMaterial);
      body.castShadow = true;
      group.add(body);

      const edgeGeo = new THREE.TorusGeometry(0.36, 0.03, 32, 100);
      const edgeMat = new THREE.MeshStandardMaterial({ color: 0xffdd77, metalness: 0.9, roughness: 0.2 });
      const ring = new THREE.Mesh(edgeGeo, edgeMat);
      ring.rotation.x = Math.PI / 2;
      group.add(ring);

      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext("2d")!;
      ctx.fillStyle = "#facc15";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = "Bold 380px 'Arial'";
      ctx.fillStyle = "#000000";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("₿", canvas.width / 2, canvas.height / 2);
      const symbolTexture = new THREE.CanvasTexture(canvas);
      const symbolMaterial = new THREE.MeshStandardMaterial({
        map: symbolTexture,
        metalness: 0.7,
        roughness: 0.3,
        color: 0xfacc15,
      });
      const frontFace = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.02, 32), symbolMaterial);
      frontFace.position.z = 0.045;
      const backFace = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.02, 32), symbolMaterial);
      backFace.position.z = -0.045;
      group.add(frontFace);
      group.add(backFace);

      group.position.set(x, y, z);
      return group;
    };

    const coinCount = 25;
    for (let i = 0; i < coinCount; i++) {
      const radius = 4 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const x = Math.sin(phi) * Math.cos(theta) * radius;
      const y = Math.sin(phi) * Math.sin(theta) * radius * 0.8;
      const z = Math.cos(phi) * radius;
      const coin = createBitcoinCoin(x, y, z);
      scene.add(coin);
      coinsRef.current.push(coin);
    }

    // Animation loop (no camera movement, only Earth rotation and coin floating)
    const animate = () => {
      timeRef.current += 0.008;

      // Rotate Earth and clouds smoothly
      if (earthRef.current) {
        earthRef.current.rotation.y += 0.002; // smooth rotation speed
      }
      if (cloudsRef.current) {
        cloudsRef.current.rotation.y += 0.0022;
      }

      // Animate coins: floating motion and self-rotation
      coinsRef.current.forEach((coin, idx) => {
        coin.rotation.y += 0.01;
        coin.rotation.x = Math.sin(timeRef.current * 0.8 + idx) * 0.2;
        coin.rotation.z = Math.cos(timeRef.current * 0.5 + idx) * 0.15;
        const offsetX = Math.sin(timeRef.current * 0.7 + idx) * 0.08;
        const offsetY = Math.cos(timeRef.current * 0.9 + idx * 0.5) * 0.1;
        const offsetZ = Math.sin(timeRef.current * 1.1 + idx) * 0.06;
        coin.position.x += (offsetX - (coin.userData?.offX || 0)) * 0.05;
        coin.position.y += (offsetY - (coin.userData?.offY || 0)) * 0.05;
        coin.position.z += (offsetZ - (coin.userData?.offZ || 0)) * 0.05;
        coin.userData = { offX: offsetX, offY: offsetY, offZ: offsetZ };
      });

      // Rotate golden light slowly
      goldLight.position.x = 3.5 * Math.sin(timeRef.current * 0.2);
      goldLight.position.z = 4.5 * Math.cos(timeRef.current * 0.3);

      // Rotate stars very slowly
      stars.rotation.y += 0.0002;
      stars.rotation.x += 0.0001;

      // Render
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize (mobile responsive)
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      if (sceneRef.current) {
        sceneRef.current.traverse((obj: any) => {
          if ((obj as any).isMesh) {
            const mesh = obj as any;
            if (mesh.geometry) mesh.geometry.dispose();
            if (mesh.material) {
              if (Array.isArray(mesh.material)) mesh.material.forEach((m: any) => m.dispose());
              else mesh.material.dispose();
            }
          }
        });
      }
    };
  }, []);

  return <div ref={containerRef} style={{ position: "absolute", inset: 0, zIndex: 0 }} />;
};

// ── Styles (unchanged, fully responsive) ────────────────────────────────

const styles = `
@keyframes floatUp {
  0% { opacity: 0; transform: translateY(0) scale(0); }
  20% { opacity: 1; transform: translateY(-60px) scale(1.3); }
  80% { opacity: 1; transform: translateY(-200px) scale(1); }
  100% { opacity: 0; transform: translateY(-250px) scale(0.5); }
}
@keyframes spin {
  0% { transform: rotateY(0deg); }
  100% { transform: rotateY(360deg); }
}
@keyframes rotateSpotlight {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}
@keyframes floatOrb1 {
  0%,100% { transform: translate(0, 0); }
  33% { transform: translate(100px, -80px); }
  66% { transform: translate(-50px, 50px); }
}
@keyframes floatOrb2 {
  0%,100% { transform: translate(0, 0); }
  33% { transform: translate(-120px, 80px); }
  66% { transform: translate(80px, -50px); }
}
@keyframes floatContent {
  0%,100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}
@keyframes particleRise {
  0% { opacity: 0; transform: translateY(0); }
  20% { opacity: 1; }
  80% { opacity: 0.5; }
  100% { opacity: 0; transform: translateY(-700px); }
}
@keyframes pulseText {
  0%,100% { opacity: 1; }
  50% { opacity: 0.7; }
}
@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 150%; }
}
@keyframes coinFloat {
  0% { opacity: 0; transform: scale(0) rotate(0deg); }
  20% { opacity: 1; transform: scale(1.3) rotate(144deg); }
  80% { opacity: 1; transform: scale(1) rotate(576deg); }
  100% { opacity: 0; transform: scale(0.5) rotate(720deg); }
}

.hero-section {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: #050816;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 128px 24px 80px;
  cursor: default;
}
.content-wrapper {
  position: relative;
  z-index: 10;
  max-width: 1280px;
  margin: 0 auto;
  text-align: center;
  animation: floatContent 5s ease-in-out infinite;
}
.badge {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: rgba(234,179,8,0.1);
  border: 1px solid rgba(234,179,8,0.3);
  padding: 12px 24px;
  border-radius: 9999px;
  margin-bottom: 32px;
  backdrop-filter: blur(16px);
}
.badge-text {
  color: #fde68a;
  font-weight: 600;
}
.heading {
  font-size: clamp(2.5rem, 8vw, 5rem);
  font-weight: 900;
  color: #fff;
  line-height: 1.1;
  margin-bottom: 32px;
  text-shadow: 0 0 30px rgba(250,204,21,0.4);
}
.heading-gradient {
  display: block;
  background: linear-gradient(to right, #fef9c3, #eab308, #f97316);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: pulseText 3s ease-in-out infinite;
}
.description {
  max-width: 896px;
  margin: 0 auto 48px;
  font-size: 1.25rem;
  color: #cbd5e1;
  line-height: 1.7;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  max-width: 1024px;
  margin: 0 auto 56px;
}
.stat-card {
  position: relative;
  overflow: hidden;
  background: rgba(255,255,255,0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 30px;
  padding: 32px;
  transition: all 0.5s ease;
  cursor: default;
}
.stat-card:hover {
  transform: translateY(-15px) scale(1.04);
}
.stat-card-yellow:hover { border-color: rgba(250,204,21,0.5); box-shadow: 0 0 50px rgba(250,204,21,0.25); }
.stat-card-cyan:hover { border-color: rgba(34,211,238,0.5); box-shadow: 0 0 50px rgba(34,211,238,0.25); }
.stat-card-green:hover { border-color: rgba(74,222,128,0.5); box-shadow: 0 0 50px rgba(74,222,128,0.25); }
.stat-number { font-size: 3rem; font-weight: 900; color: #fff; margin: 16px 0 8px; }
.stat-label { color: #94a3b8; }
.sub-desc { max-width: 768px; margin: 0 auto 32px; font-size: 1.125rem; color: #cbd5e1; }
.no-risk-text { color: #fde68a; font-weight: 600; font-size: 1.25rem; margin-bottom: 48px; }
.cta-btn {
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(to right, #facc15, #eab308, #f97316);
  color: #000;
  font-weight: 900;
  padding: 20px 48px;
  border-radius: 16px;
  font-size: 1.125rem;
  box-shadow: 0 0 40px rgba(250,204,21,0.4);
  margin-bottom: 64px;
  text-decoration: none;
  transition: transform 0.2s;
  border: none;
  cursor: pointer;
}
.cta-btn:hover { transform: scale(1.05); }
.cta-btn:active { transform: scale(0.95); }
.cta-shimmer {
  position: absolute;
  top: 0;
  left: -100%;
  height: 100%;
  width: 50%;
  background: linear-gradient(to right, transparent, rgba(255,255,255,0.5), transparent);
  transform: skewX(-12deg);
  animation: shimmer 2s ease-in-out infinite;
}
.traders-row {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
}
.trader-avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 4px solid #050816;
  background: linear-gradient(135deg, #facc15, #eab308, #f97316);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  font-weight: 700;
  box-shadow: 0 0 25px rgba(250,204,21,0.5);
  transition: transform 0.2s;
  margin-left: -16px;
}
.trader-avatar:first-child { margin-left: 0; }
.trader-avatar:hover { transform: scale(1.15) translateY(-5px); }
.trust-text { color: #cbd5e1; font-size: 1.125rem; margin-bottom: 40px; }
.trust-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 40px;
}
.trust-item { display: flex; align-items: center; gap: 8px; }
.trust-item span { color: #fff; font-weight: 700; }
.trust-divider { width: 1px; height: 32px; background: #334155; }

.coin-wrapper {
  position: absolute;
  pointer-events: none;
  z-index: 50;
}
.coin-glow {
  position: absolute;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(250,204,21,0.3);
  filter: blur(16px);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.coin-face {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: linear-gradient(135deg, #fde68a, #eab308, #f97316);
  border: 1px solid #fef3c7;
  box-shadow: 0 0 10px rgba(250,204,21,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 20px;
  color: #000;
  animation: spin 1.5s linear infinite;
}

@media (max-width: 768px) {
  .hero-section {
    padding: 80px 16px 56px;
  }
  .coin-glow {
    width: 42px;
    height: 42px;
  }
  .coin-face {
    font-size: 16px;
  }
  .content-wrapper {
    padding: 0 8px;
  }
  .description {
    font-size: 1rem;
    margin-bottom: 32px;
  }
  .stats-grid {
    gap: 16px;
    margin-bottom: 40px;
  }
  .stat-card {
    padding: 24px;
  }
  .stat-number {
    font-size: 2.3rem;
  }
  .sub-desc {
    font-size: 1rem;
    margin-bottom: 24px;
  }
  .no-risk-text {
    font-size: 1.1rem;
    margin-bottom: 32px;
  }
  .cta-btn {
    width: 100%;
    padding: 16px 28px;
    font-size: 1rem;
    margin-bottom: 40px;
  }
  .traders-row {
    gap: 12px;
    flex-wrap: wrap;
  }
  .trader-avatar {
    width: 52px;
    height: 52px;
    margin-left: -12px;
  }
  .trust-row {
    gap: 20px;
  }
  .trust-divider {
    height: 24px;
  }
}
`;

// ── Hero Component (with 3D scene) ──────────────────────────────────────

export default function Hero() {
  const [coins, setCoins] = useState<HeroCoin[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: `${(i * 3.33 + 7) % 100}%`,
        duration: 12 + (i % 10),
        delay: (i * 0.17) % 5,
      })),
    []
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (Math.random() > 0.15) return;
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const batch: HeroCoin[] = Array.from({ length: 3 }, (_, i) => ({
      id: Date.now() + Math.random() + i,
      x: x + (Math.random() * 100 - 50),
      y: y + (Math.random() * 100 - 50),
    }));

    setCoins((prev) => [...prev, ...batch]);

    setTimeout(() => {
      setCoins((prev) =>
        prev.filter((coin) => !batch.some((c) => c.id === coin.id))
      );
    }, 2500);
  };

  return (
    <>
      <style>{styles}</style>
      <section
        ref={sectionRef}
        className="hero-section"
        onMouseMove={handleMouseMove}
      >
        {/* 3D Cinematic Scene (Earth + floating Gold Bitcoins) */}
        <ThreeScene />

        {/* Golden Cursor Trail (2D overlay) */}
        <TrailCanvas containerRef={sectionRef} />

        {/* Floating particles (2D) */}
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: p.left,
              bottom: "-20px",
              width: "4px",
              height: "4px",
              background: "#facc15",
              borderRadius: "50%",
              animation: `particleRise ${p.duration}s ${p.delay}s infinite`,
              zIndex: 2,
            }}
          />
        ))}

        {/* Coins on hover (2D burst) */}
        {coins.map((coin) => (
          <div
            key={coin.id}
            className="coin-wrapper"
            style={{
              left: coin.x,
              top: coin.y,
              animation: `coinFloat 2.5s ease-out forwards`,
            }}
          >
            <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div className="coin-glow" />
              <div className="coin-face">₿</div>
            </div>
          </div>
        ))}

        {/* UI Content (unchanged) */}
        <div className="content-wrapper">
          <div className="badge">
            <Trophy color="#facc15" size={20} />
            <span className="badge-text">Asia's Biggest Demo Trading Competition</span>
          </div>
          <h1 className="heading">
            Join Asia's Biggest
            <span className="heading-gradient">Demo Trading Competition</span>
          </h1>
          <p className="description">
            Trade with <strong>$10,000 virtual funds</strong>, compete for real
            cash-equivalent rewards, and prove you belong among the top traders.
          </p>
          <p className="sub-desc">
            Whether you're a day trader, scalper, or swing specialist — your
            skills decide your rank.
          </p>
          <p className="no-risk-text">
            No real money required. No risk. Just pure competition.
          </p>
          <a href="#contact" className="cta-btn">
            <span className="cta-shimmer" />
            Start Trading – Free Entry
          </a>
          <div className="traders-row">
            {[
              "https://i.pravatar.cc/150?img=12",
              "https://i.pravatar.cc/150?img=32",
              "https://i.pravatar.cc/150?img=45",
              "https://i.pravatar.cc/150?img=68",
            ].map((avatar, index) => (
              <div key={index} className="trader-avatar">
                <img
                  src={avatar}
                  alt={`Trader ${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </div>
            ))}
          </div>
          <p className="trust-text">
            Trusted by Taiwan, TJR, JM, AMAS, and 50k+ other traders
          </p>
          <div className="trust-row">
            <div className="trust-item">
              <Star color="#facc15" fill="#facc15" size={18} />
              <span>Trustpilot</span>
            </div>
            <div className="trust-divider" />
            <div className="trust-item">
              <ShieldCheck color="#22d3ee" size={18} />
              <span>Powered by Capital</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}