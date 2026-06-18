import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ─── Floating Particles (dots orbiting in 3D space) ────────────── */
const FloatingParticles: React.FC<{ count?: number; radius?: number }> = ({
  count = 200,
  radius = 4,
}) => {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      // Distribute particles in a sphere shell
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * (0.5 + Math.random() * 0.5);
      temp.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        speed: 0.2 + Math.random() * 0.6,
        offset: Math.random() * Math.PI * 2,
        scale: 0.015 + Math.random() * 0.03,
        opacity: 0.3 + Math.random() * 0.7,
      });
    }
    return temp;
  }, [count, radius]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    particles.forEach((p, i) => {
      // Gentle orbital drift
      const angle = t * p.speed * 0.3 + p.offset;
      dummy.position.set(
        p.x * Math.cos(angle * 0.5) - p.z * Math.sin(angle * 0.5),
        p.y + Math.sin(t * p.speed + p.offset) * 0.3,
        p.x * Math.sin(angle * 0.5) + p.z * Math.cos(angle * 0.5)
      );
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
    </instancedMesh>
  );
};

/* ─── Primary Torus Knot (hero centerpiece) ─────────────────────── */
const HeroTorusKnot: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const wireRef = useRef<THREE.LineSegments>(null!);

  const geometry = useMemo(() => new THREE.TorusKnotGeometry(1.6, 0.45, 128, 32, 2, 3), []);
  const wireGeo = useMemo(() => new THREE.WireframeGeometry(geometry), [geometry]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.08;
      meshRef.current.rotation.y = t * 0.12;
      meshRef.current.rotation.z = t * 0.05;
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = t * 0.08;
      wireRef.current.rotation.y = t * 0.12;
      wireRef.current.rotation.z = t * 0.05;
    }
  });

  return (
    <group>
      {/* Solid glass-like inner shape */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshPhysicalMaterial
          color="#1a1a2e"
          roughness={0.15}
          metalness={0.8}
          transparent
          opacity={0.25}
          envMapIntensity={1}
        />
      </mesh>
      {/* Glowing wireframe overlay */}
      <lineSegments ref={wireRef} geometry={wireGeo}>
        <lineBasicMaterial color="#ffffff" transparent opacity={0.18} />
      </lineSegments>
    </group>
  );
};

/* ─── Orbiting Ring (secondary element) ─────────────────────────── */
const OrbitingRing: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15;
      groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.2;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={ringRef}>
        <torusGeometry args={[2.8, 0.02, 16, 100]} />
        <meshBasicMaterial color="#6b7280" transparent opacity={0.4} />
      </mesh>
      {/* Small accent dots on the ring */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i / 6) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(angle) * 2.8, Math.sin(angle) * 2.8, 0]}>
            <sphereGeometry args={[0.04, 8, 8]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
          </mesh>
        );
      })}
    </group>
  );
};

/* ─── Secondary Icosahedron Wireframe ───────────────────────────── */
const FloatingIcosahedron: React.FC = () => {
  const meshRef = useRef<THREE.LineSegments>(null!);
  const geo = useMemo(() => new THREE.IcosahedronGeometry(3.2, 1), []);
  const wireGeo = useMemo(() => new THREE.WireframeGeometry(geo), [geo]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.03;
      meshRef.current.rotation.y = -t * 0.05;
    }
  });

  return (
    <lineSegments ref={meshRef} geometry={wireGeo}>
      <lineBasicMaterial color="#374151" transparent opacity={0.12} />
    </lineSegments>
  );
};

/* ─── Mouse-Reactive Camera Controller ──────────────────────────── */
const CameraController: React.FC = () => {
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 0.8;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    camera.position.x += (target.current.x - camera.position.x) * 0.02;
    camera.position.y += (-target.current.y - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);
  });

  return null;
};

/* ─── Main Exported Component ───────────────────────────────────── */
export const HeroScene3D: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        style={{ pointerEvents: 'auto' }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={0.5} color="#ffffff" />
          <pointLight position={[-5, -3, 3]} intensity={0.3} color="#9ca3af" />
          <pointLight position={[0, 3, -5]} intensity={0.2} color="#d1d5db" />

          {/* 3D Elements */}
          <HeroTorusKnot />
          <OrbitingRing />
          <FloatingIcosahedron />
          <FloatingParticles count={160} radius={4.5} />

          {/* Mouse Reactivity */}
          <CameraController />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroScene3D;
