"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

// Utility function


function GlassFilter() {
  return (
    <svg className="hidden">
      <defs>
        <filter id="container-glass" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.05" numOctaves="1" seed="1" result="turbulence"/>
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise"/>
          <feDisplacementMap in="SourceGraphic" in2="blurredNoise" scale="70" xChannelSelector="R" yChannelSelector="B" result="displaced"/>
          <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur"/>
          <feComposite in="finalBlur" in2="finalBlur" operator="over"/>
        </filter>
      </defs>
    </svg>
  );
}

export function WebGLShader() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000);

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uniforms = { 
      time: { value: 0 }, 
      resolution: { value: [window.innerWidth, window.innerHeight] } 
    };

    const vertexShader = `
      attribute vec3 position; 
      void main(){ 
        gl_Position = vec4(position,1.0); 
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      void main(){
        vec2 p = (gl_FragCoord.xy*2.0 - resolution)/min(resolution.x,resolution.y);
        
        // 4 neon lines - 3 very slow, 1 medium speed
        float pink1 = 0.01/abs(p.y + sin((p.x - time * 0.3) * 2.5) * 0.3 + 0.4);   // Very slow
        float pink2 = 0.01/abs(p.y + sin((p.x + time * 0.2) * 1.8) * 0.25 - 0.2);  // Very slow
        float blue1 = 0.01/abs(p.y + sin((p.x - time * 1.0) * 2.2) * 0.28 + 0.1);  // Medium speed
        float blue2 = 0.01/abs(p.y + sin((p.x + time * 0.15) * 1.6) * 0.32 - 0.35); // Very slow
        
        // Combine colors with proper neon effect
        vec3 pinkColor = vec3(1.0, 0.1, 0.5) * (pink1 + pink2);
        vec3 blueColor = vec3(0.1, 0.3, 1.0) * (blue1 + blue2);
        
        vec3 finalColor = pinkColor + blueColor;
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array([
      -1,-1,0, 1,-1,0, -1,1,0, 1,-1,0, -1,1,0, 1,1,0
    ]), 3));

    const material = new THREE.RawShaderMaterial({ 
      vertexShader, 
      fragmentShader, 
      uniforms, 
      side: THREE.DoubleSide 
    });
    
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const animate = () => {
      uniforms.time.value += 0.012;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      uniforms.resolution.value = [window.innerWidth, window.innerHeight];
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full block"/>;
}
export default function App() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-black min-h-screen">
      <WebGLShader />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-full mx-auto max-w-md pointer-events-auto">
          <main className="relative py-10 overflow-hidden text-center">
            
            {/* Caixa de fundo com opacidade */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              
              {/* Logo */}
              <div className="flex items-center justify-center mb-6">
                <img
                  src="logo.png"
                  alt="Logo Bleed"
                  className="h-12 w-auto"
                />
              </div>

              {/* Tagline */}
              <p className="text-white/80 text-sm mb-6">
                Digital Marketing | Branding | Development
              </p>

              {/* Description */}
              <p className="text-white/60 px-4 text-xs leading-relaxed mb-8">
                Dar o primeiro pequeno passo ajuda a cruzar a fronteira invisível em direcção ao seu objetivo, algo que tem de superar para o atingir. Deixe-nos dar esse passo consigo e entre em contacto com um dos nossos especialistas.
              </p>

              {/* Social Icons */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/20 transition-all cursor-pointer">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/20 transition-all cursor-pointer">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/20 transition-all cursor-pointer">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 text-xs text-white/60">
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <span>business@blendd.pt</span>
                </div>
                
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  <div className="text-center">
                    <div>+351 91 423 61 83</div>
                    <div className="text-white/40 text-xs">chamada para rede móvel nacional</div>
                  </div>
                </div>

                <div className="flex items-start justify-center gap-2">
                  <svg className="w-4 h-4 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <div className="text-center">
                    <div>Palácio Sotto Mayor, Av. Fontes</div>
                    <div>Pereira de Melo 16</div>
                    <div>Lisboa 1250-162, Portugal</div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
