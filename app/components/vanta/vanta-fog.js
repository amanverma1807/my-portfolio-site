import * as THREE from 'three';

const VERTEX_SHADER = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const FRAGMENT_SHADER = `
uniform vec2 iResolution;
uniform vec2 iMouse;
uniform float iTime;

uniform float blurFactor;
uniform vec3 baseColor;
uniform vec3 lowlightColor;
uniform vec3 midtoneColor;
uniform vec3 highlightColor;
uniform float zoom;

float random(in vec2 _st) {
  return fract(sin(dot(_st.xy, vec2(0.129898, 0.78233))) * 437.585453123);
}

float noise(in vec2 _st) {
  vec2 i = floor(_st);
  vec2 f = fract(_st);

  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(a, b, u.x) +
         (c - a) * u.y * (1.0 - u.x) +
         (d - b) * u.x * u.y;
}

#define NUM_OCTAVES 6

float fbm(in vec2 _st) {
  float v = 0.0;
  float a = blurFactor;
  vec2 shift = vec2(100.0);
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
  for (int i = 0; i < NUM_OCTAVES; ++i) {
    v += a * noise(_st);
    _st = rot * _st * 2.0 + shift;
    a *= (1.0 - blurFactor);
  }
  return v;
}

void main() {
  vec2 st = gl_FragCoord.xy / iResolution.xy * 3.0;
  st.x *= 0.7 * iResolution.x / iResolution.y;
  st *= zoom;

  vec3 color = vec3(0.0);

  vec2 q = vec2(0.0);
  q.x = fbm(st + 0.00 * iTime);
  q.y = fbm(st + vec2(1.0));

  vec2 dir = vec2(0.15, 0.126);
  vec2 r = vec2(0.0);
  r.x = fbm(st + 1.0 * q + vec2(1.7, 9.2) + dir.x * iTime);
  r.y = fbm(st + 1.0 * q + vec2(8.3, 2.8) + dir.y * iTime);

  float f = fbm(st + r);

  color = mix(baseColor,
              lowlightColor,
              clamp((f * f) * 4.0, 0.0, 1.0));

  color = mix(color,
              midtoneColor,
              clamp(length(q), 0.0, 1.0));

  color = mix(color,
              highlightColor,
              clamp(length(r.x), 0.0, 1.0));

  // Enhance fog contrast and visibility against deep dark background
  float fogStrength = clamp(f * 1.8 + length(r.x) * 0.5, 0.0, 1.0);
  vec3 finalColor = mix(baseColor, color * 2.4, fogStrength);
  gl_FragColor = vec4(finalColor, 1.0);
}
`;

const defaultOptions = {
  highlightColor: 0x4d4d4d,
  midtoneColor: 0x4a4a4a,
  lowlightColor: 0x000000,
  baseColor: 0x000000,
  blurFactor: 0.18,
  speed: 1.70,
  zoom: 2.60,
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
};

/**
 * Initializes a locally managed Vanta.js FOG shader effect on a target element.
 * Uses the project's installed Three.js instance without external CDN dependencies.
 */
export function vantaFog(userOptions = {}) {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return null;
  }

  // Respect user preference for reduced motion
  const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
  if (prefersReducedMotion) {
    return null;
  }

  const options = { ...defaultOptions, ...userOptions };
  const el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el;
  if (!el || !(el instanceof HTMLElement)) {
    return null;
  }

  let renderer = null;
  let scene = null;
  let camera = null;
  let material = null;
  let geometry = null;
  let mesh = null;
  let reqId = null;
  let isDestroyed = false;

  let width = Math.max(el.offsetWidth, 200);
  let height = Math.max(el.offsetHeight, 200);

  let mouseX = width / 2;
  let mouseY = height / 2;
  let mouseEaseX = mouseX;
  let mouseEaseY = mouseY;
  let t = 0;
  let prevNow = performance.now();

  try {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
      failIfMajorPerformanceCaveat: false,
    });
  } catch (err) {
    console.warn('[VANTA] WebGL initialization failed; using fallback background', err);
    return null;
  }

  // Check mobile device to throttle pixel ratio for high battery and frame-rate performance
  const isMobile =
    typeof navigator !== 'undefined' &&
    (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      window.innerWidth < 768);
  const pixelRatio = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);

  renderer.setPixelRatio(pixelRatio);
  renderer.setSize(width, height);

  const canvas = renderer.domElement;
  canvas.className = 'vanta-canvas';
  Object.assign(canvas.style, {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    zIndex: '0',
    pointerEvents: 'none',
  });

  const highlightCol = new THREE.Color(options.highlightColor);
  const midtoneCol = new THREE.Color(options.midtoneColor);
  const lowlightCol = new THREE.Color(options.lowlightColor);
  const baseCol = new THREE.Color(options.baseColor);

  const uniforms = {
    iTime: { value: 1.0 },
    iResolution: { value: new THREE.Vector2(width * pixelRatio, height * pixelRatio) },
    iMouse: { value: new THREE.Vector2(mouseX, mouseY) },
    blurFactor: { value: options.blurFactor },
    zoom: { value: options.zoom },
    baseColor: { value: new THREE.Vector3(baseCol.r, baseCol.g, baseCol.b) },
    lowlightColor: { value: new THREE.Vector3(lowlightCol.r, lowlightCol.g, lowlightCol.b) },
    midtoneColor: { value: new THREE.Vector3(midtoneCol.r, midtoneCol.g, midtoneCol.b) },
    highlightColor: { value: new THREE.Vector3(highlightCol.r, highlightCol.g, highlightCol.b) },
  };

  material = new THREE.ShaderMaterial({
    vertexShader: VERTEX_SHADER,
    fragmentShader: FRAGMENT_SHADER,
    uniforms: uniforms,
    depthTest: false,
    depthWrite: false,
  });

  geometry = new THREE.PlaneGeometry(2, 2);
  mesh = new THREE.Mesh(geometry, material);
  scene = new THREE.Scene();
  scene.add(mesh);
  camera = new THREE.Camera();

  // Insert canvas at beginning of el so it is behind all other content
  if (el.firstChild) {
    el.insertBefore(canvas, el.firstChild);
  } else {
    el.appendChild(canvas);
  }

  const handleResize = () => {
    if (!el || isDestroyed || !renderer) return;
    width = Math.max(el.offsetWidth, 200);
    height = Math.max(el.offsetHeight, 200);
    renderer.setSize(width, height);
    uniforms.iResolution.value.set(width * pixelRatio, height * pixelRatio);
  };

  let resizeObserver = null;
  if (typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(el);
  }

  const updateMouseCoords = (clientX, clientY) => {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
      mouseX = x;
      mouseY = y;
    }
  };

  const handleMouseMove = e => {
    updateMouseCoords(e.clientX, e.clientY);
  };

  const handleTouchMove = e => {
    if (e.touches && e.touches.length === 1) {
      updateMouseCoords(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  if (options.mouseControls) {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
  }
  if (options.touchControls) {
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
  }
  window.addEventListener('resize', handleResize, { passive: true });

  const isOnScreen = () => {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return rect.top <= window.innerHeight + 300 && rect.bottom >= -300;
  };

  const animate = () => {
    if (isDestroyed) return;

    const now = performance.now();
    let delta = (now - prevNow) / 1000;
    delta = Math.max(0.001, Math.min(delta, 0.1));
    prevNow = now;

    // Only render when contact section is in viewport to conserve GPU & CPU
    if (isOnScreen()) {
      t += delta * (options.speed || 1.7);
      uniforms.iTime.value = t;

      mouseEaseX += (mouseX - mouseEaseX) * 0.05;
      mouseEaseY += (mouseY - mouseEaseY) * 0.05;
      uniforms.iMouse.value.set(mouseEaseX, mouseEaseY);

      renderer.render(scene, camera);
    }

    reqId = requestAnimationFrame(animate);
  };

  reqId = requestAnimationFrame(animate);

  return {
    destroy: () => {
      isDestroyed = true;
      if (reqId) cancelAnimationFrame(reqId);
      if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = null;
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);

      if (geometry) geometry.dispose();
      if (material) material.dispose();
      if (renderer) {
        if (canvas && canvas.parentNode) {
          canvas.parentNode.removeChild(canvas);
        }
        renderer.dispose();
      }
      mesh = null;
      geometry = null;
      material = null;
      scene = null;
      camera = null;
      renderer = null;
    },
  };
}
