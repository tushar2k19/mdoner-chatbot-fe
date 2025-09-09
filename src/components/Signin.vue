<template>
  <div class="login-page">
    <!-- Left Side - Mandala Animation -->
    <div class="mandala-section">
      <!-- Floating Background Elements for Left Side -->
      <div class="floating-shapes-left">
        <div class="shape-left shape-left-1"></div>
        <div class="shape-left shape-left-2"></div>
        <div class="shape-left shape-left-3"></div>
        <div class="shape-left shape-left-4"></div>
        <div class="shape-left shape-left-5"></div>
        <div class="shape-left shape-left-6"></div>
        <div class="shape-left shape-left-7"></div>
        <div class="shape-left shape-left-8"></div>
      </div>
      <!-- Complex Corner Designs inspired by the image -->
      <div class="corner-design top-left">
        <svg viewBox="0 0 300 300" class="corner-svg">
          <defs>
            <pattern id="infinityPattern1" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
              <path d="M12.5,6 C18,6 23,11 23,16.5 C23,22 18,27 12.5,27 C7,27 2,22 2,16.5 C2,11 7,6 12.5,6 Z" fill="rgba(255,255,255,0.12)" />
              <path d="M12.5,9 C15.5,9 18.5,12 18.5,16.5 C18.5,21 15.5,24 12.5,24 C9.5,24 6.5,21 6.5,16.5 C6.5,12 9.5,9 12.5,9 Z" fill="rgba(255,255,255,0.06)" />
            </pattern>
            <pattern id="geometricPattern1" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <polygon points="10,3 17,10 10,17 3,10" fill="rgba(255,255,255,0.1)" />
              <circle cx="10" cy="10" r="4" fill="rgba(255,255,255,0.05)" />
              <polygon points="10,6 13,9 10,12 7,9" fill="rgba(255,255,255,0.08)" />
            </pattern>
            <pattern id="abstractPattern1" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
              <path d="M9,2 L16,9 L9,16 L2,9 Z" fill="rgba(255,255,255,0.08)" />
              <circle cx="9" cy="9" r="3" fill="rgba(255,255,255,0.04)" />
              <path d="M9,5 L12,8 L9,11 L6,8 Z" fill="rgba(255,255,255,0.06)" />
            </pattern>
          </defs>
          
          <!-- Main corner structure with multiple layers -->
          <path d="M0,0 L300,0 L300,60 L60,60 L60,300 L0,300 Z" fill="url(#infinityPattern1)" />
          <path d="M0,0 L240,0 L240,60 L60,60 L60,240 L0,240 Z" fill="url(#geometricPattern1)" />
          <path d="M0,0 L180,0 L180,60 L60,60 L60,180 L0,180 Z" fill="url(#abstractPattern1)" />
          
          <!-- Large infinity symbols -->
          <g transform="translate(30,30)">
            <path d="M15,8 C22,8 28,14 28,21 C28,28 22,34 15,34 C8,34 2,28 2,21 C2,14 8,8 15,8 Z" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="2" />
            <path d="M15,11 C19,11 23,15 23,21 C23,27 19,31 15,31 C11,31 7,27 7,21 C7,15 11,11 15,11 Z" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
            <circle cx="15" cy="21" r="3" fill="rgba(255,255,255,0.1)" />
          </g>
          
          <!-- Geometric shapes cluster -->
          <g transform="translate(80,20)">
            <polygon points="15,8 25,18 15,28 5,18" fill="rgba(255,255,255,0.2)" />
            <circle cx="15" cy="18" r="6" fill="rgba(255,255,255,0.1)" />
            <polygon points="15,12 18,15 15,18 12,15" fill="rgba(255,255,255,0.15)" />
          </g>
          
          <g transform="translate(20,80)">
            <rect x="8" y="8" width="24" height="24" fill="rgba(255,255,255,0.15)" />
            <circle cx="20" cy="20" r="8" fill="rgba(255,255,255,0.08)" />
            <rect x="14" y="14" width="12" height="12" fill="rgba(255,255,255,0.1)" />
          </g>
          
          <!-- Abstract symbols -->
          <g transform="translate(120,60)">
            <path d="M10,5 L20,15 L10,25 L0,15 Z" fill="rgba(255,255,255,0.12)" />
            <circle cx="10" cy="15" r="4" fill="rgba(255,255,255,0.06)" />
            <path d="M10,9 L13,12 L10,15 L7,12 Z" fill="rgba(255,255,255,0.08)" />
          </g>
          
          <g transform="translate(60,120)">
            <polygon points="12,6 18,12 12,18 6,12" fill="rgba(255,255,255,0.1)" />
            <circle cx="12" cy="12" r="5" fill="rgba(255,255,255,0.05)" />
            <polygon points="12,8 15,11 12,14 9,11" fill="rgba(255,255,255,0.07)" />
          </g>
        </svg>
      </div>

      <div class="corner-design top-right">
        <svg viewBox="0 0 300 300" class="corner-svg">
          <defs>
            <pattern id="infinityPattern2" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
              <path d="M12.5,6 C18,6 23,11 23,16.5 C23,22 18,27 12.5,27 C7,27 2,22 2,16.5 C2,11 7,6 12.5,6 Z" fill="rgba(255,255,255,0.12)" />
              <path d="M12.5,9 C15.5,9 18.5,12 18.5,16.5 C18.5,21 15.5,24 12.5,24 C9.5,24 6.5,21 6.5,16.5 C6.5,12 9.5,9 12.5,9 Z" fill="rgba(255,255,255,0.06)" />
            </pattern>
            <pattern id="geometricPattern2" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <polygon points="10,3 17,10 10,17 3,10" fill="rgba(255,255,255,0.1)" />
              <circle cx="10" cy="10" r="4" fill="rgba(255,255,255,0.05)" />
              <polygon points="10,6 13,9 10,12 7,9" fill="rgba(255,255,255,0.08)" />
            </pattern>
            <pattern id="abstractPattern2" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
              <path d="M9,2 L16,9 L9,16 L2,9 Z" fill="rgba(255,255,255,0.08)" />
              <circle cx="9" cy="9" r="3" fill="rgba(255,255,255,0.04)" />
              <path d="M9,5 L12,8 L9,11 L6,8 Z" fill="rgba(255,255,255,0.06)" />
            </pattern>
          </defs>
          
          <!-- Main corner structure -->
          <path d="M300,0 L0,0 L0,60 L240,60 L240,300 L300,300 Z" fill="url(#infinityPattern2)" />
          <path d="M300,0 L60,0 L60,60 L240,60 L240,240 L300,240 Z" fill="url(#geometricPattern2)" />
          <path d="M300,0 L120,0 L120,60 L240,60 L240,180 L300,180 Z" fill="url(#abstractPattern2)" />
          
          <!-- Large infinity symbols -->
          <g transform="translate(240,30)">
            <path d="M15,8 C22,8 28,14 28,21 C28,28 22,34 15,34 C8,34 2,28 2,21 C2,14 8,8 15,8 Z" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="2" />
            <path d="M15,11 C19,11 23,15 23,21 C23,27 19,31 15,31 C11,31 7,27 7,21 C7,15 11,11 15,11 Z" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
            <circle cx="15" cy="21" r="3" fill="rgba(255,255,255,0.1)" />
          </g>
          
          <!-- Geometric shapes cluster -->
          <g transform="translate(190,20)">
            <polygon points="15,8 25,18 15,28 5,18" fill="rgba(255,255,255,0.2)" />
            <circle cx="15" cy="18" r="6" fill="rgba(255,255,255,0.1)" />
            <polygon points="15,12 18,15 15,18 12,15" fill="rgba(255,255,255,0.15)" />
          </g>
          
          <g transform="translate(250,80)">
            <rect x="8" y="8" width="24" height="24" fill="rgba(255,255,255,0.15)" />
            <circle cx="20" cy="20" r="8" fill="rgba(255,255,255,0.08)" />
            <rect x="14" y="14" width="12" height="12" fill="rgba(255,255,255,0.1)" />
          </g>
          
          <!-- Abstract symbols -->
          <g transform="translate(150,60)">
            <path d="M10,5 L20,15 L10,25 L0,15 Z" fill="rgba(255,255,255,0.12)" />
            <circle cx="10" cy="15" r="4" fill="rgba(255,255,255,0.06)" />
            <path d="M10,9 L13,12 L10,15 L7,12 Z" fill="rgba(255,255,255,0.08)" />
          </g>
          
          <g transform="translate(210,120)">
            <polygon points="12,6 18,12 12,18 6,12" fill="rgba(255,255,255,0.1)" />
            <circle cx="12" cy="12" r="5" fill="rgba(255,255,255,0.05)" />
            <polygon points="12,8 15,11 12,14 9,11" fill="rgba(255,255,255,0.07)" />
          </g>
        </svg>
      </div>

      <div class="corner-design bottom-left">
        <svg viewBox="0 0 300 300" class="corner-svg">
          <defs>
            <pattern id="infinityPattern3" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
              <path d="M12.5,6 C18,6 23,11 23,16.5 C23,22 18,27 12.5,27 C7,27 2,22 2,16.5 C2,11 7,6 12.5,6 Z" fill="rgba(255,255,255,0.12)" />
              <path d="M12.5,9 C15.5,9 18.5,12 18.5,16.5 C18.5,21 15.5,24 12.5,24 C9.5,24 6.5,21 6.5,16.5 C6.5,12 9.5,9 12.5,9 Z" fill="rgba(255,255,255,0.06)" />
            </pattern>
            <pattern id="geometricPattern3" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <polygon points="10,3 17,10 10,17 3,10" fill="rgba(255,255,255,0.1)" />
              <circle cx="10" cy="10" r="4" fill="rgba(255,255,255,0.05)" />
              <polygon points="10,6 13,9 10,12 7,9" fill="rgba(255,255,255,0.08)" />
            </pattern>
            <pattern id="abstractPattern3" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
              <path d="M9,2 L16,9 L9,16 L2,9 Z" fill="rgba(255,255,255,0.08)" />
              <circle cx="9" cy="9" r="3" fill="rgba(255,255,255,0.04)" />
              <path d="M9,5 L12,8 L9,11 L6,8 Z" fill="rgba(255,255,255,0.06)" />
            </pattern>
          </defs>
          
          <!-- Main corner structure -->
          <path d="M0,300 L300,300 L300,240 L60,240 L60,0 L0,0 Z" fill="url(#infinityPattern3)" />
          <path d="M0,300 L240,300 L240,240 L60,240 L60,60 L0,60 Z" fill="url(#geometricPattern3)" />
          <path d="M0,300 L180,300 L180,240 L60,240 L60,120 L0,120 Z" fill="url(#abstractPattern3)" />
          
          <!-- Large infinity symbols -->
          <g transform="translate(30,240)">
            <path d="M15,8 C22,8 28,14 28,21 C28,28 22,34 15,34 C8,34 2,28 2,21 C2,14 8,8 15,8 Z" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="2" />
            <path d="M15,11 C19,11 23,15 23,21 C23,27 19,31 15,31 C11,31 7,27 7,21 C7,15 11,11 15,11 Z" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
            <circle cx="15" cy="21" r="3" fill="rgba(255,255,255,0.1)" />
          </g>
          
          <!-- Geometric shapes cluster -->
          <g transform="translate(80,250)">
            <polygon points="15,8 25,18 15,28 5,18" fill="rgba(255,255,255,0.2)" />
            <circle cx="15" cy="18" r="6" fill="rgba(255,255,255,0.1)" />
            <polygon points="15,12 18,15 15,18 12,15" fill="rgba(255,255,255,0.15)" />
          </g>
          
          <g transform="translate(20,190)">
            <rect x="8" y="8" width="24" height="24" fill="rgba(255,255,255,0.15)" />
            <circle cx="20" cy="20" r="8" fill="rgba(255,255,255,0.08)" />
            <rect x="14" y="14" width="12" height="12" fill="rgba(255,255,255,0.1)" />
          </g>
          
          <!-- Abstract symbols -->
          <g transform="translate(120,210)">
            <path d="M10,5 L20,15 L10,25 L0,15 Z" fill="rgba(255,255,255,0.12)" />
            <circle cx="10" cy="15" r="4" fill="rgba(255,255,255,0.06)" />
            <path d="M10,9 L13,12 L10,15 L7,12 Z" fill="rgba(255,255,255,0.08)" />
          </g>
          
          <g transform="translate(60,150)">
            <polygon points="12,6 18,12 12,18 6,12" fill="rgba(255,255,255,0.1)" />
            <circle cx="12" cy="12" r="5" fill="rgba(255,255,255,0.05)" />
            <polygon points="12,8 15,11 12,14 9,11" fill="rgba(255,255,255,0.07)" />
          </g>
        </svg>
      </div>

      <div class="corner-design bottom-right">
        <svg viewBox="0 0 300 300" class="corner-svg">
          <defs>
            <pattern id="infinityPattern4" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
              <path d="M12.5,6 C18,6 23,11 23,16.5 C23,22 18,27 12.5,27 C7,27 2,22 2,16.5 C2,11 7,6 12.5,6 Z" fill="rgba(255,255,255,0.12)" />
              <path d="M12.5,9 C15.5,9 18.5,12 18.5,16.5 C18.5,21 15.5,24 12.5,24 C9.5,24 6.5,21 6.5,16.5 C6.5,12 9.5,9 12.5,9 Z" fill="rgba(255,255,255,0.06)" />
            </pattern>
            <pattern id="geometricPattern4" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <polygon points="10,3 17,10 10,17 3,10" fill="rgba(255,255,255,0.1)" />
              <circle cx="10" cy="10" r="4" fill="rgba(255,255,255,0.05)" />
              <polygon points="10,6 13,9 10,12 7,9" fill="rgba(255,255,255,0.08)" />
            </pattern>
            <pattern id="abstractPattern4" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
              <path d="M9,2 L16,9 L9,16 L2,9 Z" fill="rgba(255,255,255,0.08)" />
              <circle cx="9" cy="9" r="3" fill="rgba(255,255,255,0.04)" />
              <path d="M9,5 L12,8 L9,11 L6,8 Z" fill="rgba(255,255,255,0.06)" />
            </pattern>
          </defs>
          
          <!-- Main corner structure -->
          <path d="M300,300 L0,300 L0,240 L240,240 L240,0 L300,0 Z" fill="url(#infinityPattern4)" />
          <path d="M300,300 L60,300 L60,240 L240,240 L240,60 L300,60 Z" fill="url(#geometricPattern4)" />
          <path d="M300,300 L120,300 L120,240 L240,240 L240,120 L300,120 Z" fill="url(#abstractPattern4)" />
          
          <!-- Large infinity symbols -->
          <g transform="translate(240,240)">
            <path d="M15,8 C22,8 28,14 28,21 C28,28 22,34 15,34 C8,34 2,28 2,21 C2,14 8,8 15,8 Z" fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="2" />
            <path d="M15,11 C19,11 23,15 23,21 C23,27 19,31 15,31 C11,31 7,27 7,21 C7,15 11,11 15,11 Z" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1" />
            <circle cx="15" cy="21" r="3" fill="rgba(255,255,255,0.1)" />
          </g>
          
          <!-- Geometric shapes cluster -->
          <g transform="translate(190,250)">
            <polygon points="15,8 25,18 15,28 5,18" fill="rgba(255,255,255,0.2)" />
            <circle cx="15" cy="18" r="6" fill="rgba(255,255,255,0.1)" />
            <polygon points="15,12 18,15 15,18 12,15" fill="rgba(255,255,255,0.15)" />
          </g>
          
          <g transform="translate(250,190)">
            <rect x="8" y="8" width="24" height="24" fill="rgba(255,255,255,0.15)" />
            <circle cx="20" cy="20" r="8" fill="rgba(255,255,255,0.08)" />
            <rect x="14" y="14" width="12" height="12" fill="rgba(255,255,255,0.1)" />
          </g>
          
          <!-- Abstract symbols -->
          <g transform="translate(150,210)">
            <path d="M10,5 L20,15 L10,25 L0,15 Z" fill="rgba(255,255,255,0.12)" />
            <circle cx="10" cy="15" r="4" fill="rgba(255,255,255,0.06)" />
            <path d="M10,9 L13,12 L10,15 L7,12 Z" fill="rgba(255,255,255,0.08)" />
          </g>
          
          <g transform="translate(210,150)">
            <polygon points="12,6 18,12 12,18 6,12" fill="rgba(255,255,255,0.1)" />
            <circle cx="12" cy="12" r="5" fill="rgba(255,255,255,0.05)" />
            <polygon points="12,8 15,11 12,14 9,11" fill="rgba(255,255,255,0.07)" />
          </g>
        </svg>
      </div>

      <!-- Border Frame -->
      <div class="border-frame">
        <div class="border-top"></div>
        <div class="border-right"></div>
        <div class="border-bottom"></div>
        <div class="border-left"></div>
      </div>

      <div class="mandala-container">
        <!-- Spinning Mandala SVG -->
        <svg 
          class="mandala-svg" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1000 1000"
          aria-hidden="true"
        >
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <radialGradient id="saffronGradient">
              <stop offset="0%" stop-color="#FF9933" />
              <stop offset="100%" stop-color="#FB6A4B" />
            </radialGradient>
            <radialGradient id="greenGradient">
              <stop offset="0%" stop-color="#138808" />
              <stop offset="100%" stop-color="#1E6A52" />
            </radialGradient>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#FFD700" />
              <stop offset="100%" stop-color="#FFA500" />
            </linearGradient>
            <radialGradient id="blueGradient">
              <stop offset="0%" stop-color="#61C5F6" />
              <stop offset="100%" stop-color="#000080" />
            </radialGradient>
            <radialGradient id="centerGem">
              <stop offset="0%" stop-color="white" />
              <stop offset="50%" stop-color="lightblue" />
              <stop offset="100%" stop-color="#000080" />
            </radialGradient>
            <linearGradient id="silverGradient">
              <stop offset="0%" stop-color="#FFFFFF" />
              <stop offset="100%" stop-color="#D3D3D3" />
            </linearGradient>
          </defs>
          
          <g transform="translate(500, 500)" style="filter: url(#glow)">
            <!-- Layer 0: Outer starfield -->
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 0 0"
                to="360 0 0"
                dur="320s"
                repeatCount="indefinite"
              />
              <circle v-for="i in 150" :key="i" 
                :cx="490 * Math.sin((Math.PI * 2 / 150) * i)" 
                :cy="-490 * Math.cos((Math.PI * 2 / 150) * i)" 
                r="1" 
                fill="rgba(148, 163, 184, 0.7)"
              />
            </g>

            <!-- Layer 1: Outer SDG-inspired petals (17) -->
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 0 0"
                to="-360 0 0"
                dur="240s"
                repeatCount="indefinite"
              />
              <path v-for="i in 17" :key="i"
                d="M 0 -480 Q 50 -440, 0 -380 Q -50 -440, 0 -480 Z"
                :fill="sdgColors[i % sdgColors.length]"
                :transform="`rotate(${(360 / 17) * i})`"
                stroke="rgba(255, 255, 255, 0.2)"
                stroke-width="0.5"
              />
            </g>

            <!-- Layer 2: Dashed Ring -->
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 0 0"
                to="360 0 0"
                dur="160s"
                repeatCount="indefinite"
              />
              <circle cx="0" cy="0" r="370" 
                stroke="rgba(45, 212, 191, 0.5)"
                fill="none"
                stroke-width="1"
                stroke-dasharray="5, 15"
              />
            </g>

            <!-- Layer 3: Fine Dot Ring -->
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 0 0"
                to="-360 0 0"
                dur="280s"
                repeatCount="indefinite"
              />
              <circle v-for="i in 120" :key="i"
                :cx="360 * Math.sin((Math.PI * 2 / 120) * i)" 
                :cy="-360 * Math.cos((Math.PI * 2 / 120) * i)" 
                r="0.75" 
                fill="rgba(255, 255, 255, 0.6)"
              />
            </g>

            <!-- Layer 4: Interwoven Web -->
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 0 0"
                to="360 0 0"
                dur="200s"
                repeatCount="indefinite"
              />
              <path v-for="i in 68" :key="i"
                d="M 0 -350 C 10 -345, 10 -335, 0 -330"
                stroke="url(#silverGradient)"
                stroke-width="0.5"
                :transform="`rotate(${(360 / 68) * i})`"
              />
            </g>

            <!-- Layer 5: Saffron flares -->
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 0 0"
                to="-360 0 0"
                dur="120s"
                repeatCount="indefinite"
              />
              <path v-for="i in 34" :key="i"
                d="M 0 -320 L 15 -290 L 0 -300 L -15 -290 Z"
                fill="url(#saffronGradient)"
                :transform="`rotate(${(360 / 34) * i})`"
              />
            </g>

            <!-- Layer 6: Triangle Ring -->
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 0 0"
                to="360 0 0"
                dur="160s"
                repeatCount="indefinite"
              />
              <path v-for="i in 51" :key="i"
                d="M 0 -288 L 4 -282 L -4 -282 Z"
                fill="rgba(252, 211, 77, 0.7)"
                :transform="`rotate(${(360 / 51) * i})`"
              />
            </g>

            <!-- Layer 7: Green paisley shapes -->
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 0 0"
                to="-360 0 0"
                dur="120s"
                repeatCount="indefinite"
              />
              <path v-for="i in 17" :key="i"
                d="M 0 -280 C 40 -240, 40 -190, 0 -140 C -40 -190, -40 -240, 0 -280 Z"
                fill="url(#greenGradient)"
                opacity="0.8"
                :transform="`rotate(${(360 / 17) * i})`"
              />
            </g>

            <!-- Layer 8: Starburst -->
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 0 0"
                to="360 0 0"
                dur="80s"
                repeatCount="indefinite"
              />
              <line v-for="i in 72" :key="i"
                x1="0" y1="-200"
                x2="0" y2="-160"
                stroke="rgba(255, 255, 255, 0.7)"
                stroke-width="0.5"
                :transform="`rotate(${(360 / 72) * i})`"
              />
            </g>

            <!-- Layer 9: Golden Filigree -->
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 0 0"
                to="-360 0 0"
                dur="120s"
                repeatCount="indefinite"
              />
              <path v-for="i in 34" :key="i"
                d="M 0 -135 C 15 -115, 15 -85, 0 -65 C -15 -85, -15 -115, 0 -135 Z"
                fill="none"
                stroke="url(#goldGradient)"
                stroke-width="2"
                :transform="`rotate(${(360 / 34) * i})`"
              />
            </g>

            <!-- Layer 10: Pulsing dots -->
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 0 0"
                to="360 0 0"
                dur="80s"
                repeatCount="indefinite"
              />
              <circle v-for="i in 17" :key="i"
                :cx="140 * Math.sin((Math.PI * 2 / 17) * i)" 
                :cy="-140 * Math.cos((Math.PI * 2 / 17) * i)" 
                r="4" 
                fill="#f1f5f9"
              >
                <animate
                  attributeName="r"
                  values="4;6;4"
                  dur="5s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>

            <!-- Layer 11: Ashoka Chakra (24 spokes) -->
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 0 0"
                to="-360 0 0"
                dur="80s"
                repeatCount="indefinite"
              />
              <g stroke="url(#blueGradient)" fill="none" stroke-width="3">
                <circle cx="0" cy="0" r="100" stroke-width="1" opacity="0.5" />
                <line v-for="i in 24" :key="i"
                  x1="0" y1="25"
                  x2="0" y2="100"
                  :transform="`rotate(${(360 / 24) * i})`"
                />
                <circle cx="0" cy="0" r="25" fill="url(#blueGradient)" stroke="none" />
              </g>
            </g>

            <!-- Layer 12: Inner Spokes -->
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 0 0"
                to="360 0 0"
                dur="120s"
                repeatCount="indefinite"
              />
              <line v-for="i in 48" :key="i"
                x1="0" y1="-62"
                x2="0" y2="-58"
                stroke="rgba(165, 243, 252, 0.9)"
                stroke-width="1"
                :transform="`rotate(${(360 / 48) * i})`"
              />
            </g>

            <!-- Layer 13: Inner Leaves -->
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 0 0"
                to="-360 0 0"
                dur="160s"
                repeatCount="indefinite"
              />
              <path v-for="i in 24" :key="i"
                d="M 0 -55 Q 6 -50, 0 -45 Q -6 -50, 0 -55 Z"
                fill="rgba(103, 232, 249, 0.8)"
                :transform="`rotate(${(360 / 24) * i})`"
              />
            </g>

            <!-- Layer 14: Center pulsing gem -->
            <g>
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 0 0"
                to="360 0 0"
                dur="40s"
                repeatCount="indefinite"
              />
              <circle cx="0" cy="0" r="15" fill="url(#centerGem)">
                <animate
                  attributeName="r"
                  values="15;20;15"
                  dur="7s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </g>
        </svg>
      </div>
    </div>

    <!-- Right Side - Login Form -->
    <div class="login-section">
      <!-- Floating Background Elements -->
      <div class="floating-shapes">
        <div class="shape shape-1"></div>
        <div class="shape shape-2"></div>
        <div class="shape shape-3"></div>
        <div class="shape shape-4"></div>
        <div class="shape shape-5"></div>
      </div>
      <!-- Logo Section -->
      <div class="logo-container">
          <div class="logo-icon">
            <img src="@/assets/logo.png" alt="Logo" class="logo-image" />
          </div>
        <div class="ministry-text">
          <p class="ministry-label">MINISTRY OF DEVELOPMENT OF</p>
          <p class="ministry-title">
            <span class="north">NORTH</span> <span class="eastern">EASTERN</span> REGION
          </p>
        </div>
      </div>

      <!-- Login Form -->
      <div class="form-container">
        <div class="form-header">
          <h2 class="login-title">Log in</h2>
          <p class="login-subtitle">Enter your credential to proceed</p>
        </div>
        
        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <form class="login-form" @submit.prevent="signin" novalidate>
          <div class="input-group">
            <span class="input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
            <input
              type="email"
              v-model="email"
              @input="clearError"
              placeholder="Email"
              class="form-input"
              required
              aria-label="Email"
              autocomplete="username"
            />
          </div>

          <div class="input-group">
            <span class="input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </span>
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              @input="clearError"
              placeholder="Password"
              class="form-input password-input"
              required
              aria-label="Password"
              autocomplete="current-password"
            />
            <button
              type="button"
              @click="togglePassword"
              class="password-toggle"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
            >
              <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a9.97 9.97 0 01-1.563 3.029m-2.135 2.135L3 3z" />
              </svg>
            </button>
          </div>

          <div class="forgot-password">
            <a href="#" class="forgot-link">Forgot Password?</a>
          </div>

          <button type="submit" class="login-button">
            Log In
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'

export default {
  name: 'Signin',
  data () {
    return {
      email: '',
      password: '',
      error: '',
      ENCRYPTION_KEY: 'f1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6',
      showPassword: false,
      sdgColors: [
        '#E5243B', '#DDA63A', '#4C9F38', '#C5192D', '#FF3A21', '#26BDE2', '#FCC30B', '#A21942',
        '#FD6925', '#DD1367', '#FD9D24', '#BF8B2E', '#3F7E44', '#0A97D9', '#56C02B', '#00689D', '#19486A'
      ]
    }
  },
  created: function () {
    this.checkSignedin()
  },
  updated () {
    this.checkSignedin()
  },
  methods: {
    clearError () {
      this.error = ''
    },
    checkSignedin: function () {
      const token = localStorage.getItem('jwt_access')
      if (token && this.isTokenValid(token)) {
        this.$router.replace('/')
      }
    },
    isTokenValid(token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        const currentTime = Math.floor(Date.now() / 1000)
        
        if (payload.exp && payload.exp < currentTime + 300) {
          localStorage.removeItem('jwt_access')
          return false
        }
        
        return true
      } catch (error) {
        console.error('Invalid token format:', error)
        localStorage.removeItem('jwt_access')
        return false
      }
    },
    signin () {
      this.$http.plain.post('/signin', {
        email: this.email,
        password: this.password
      })
        .then((response) => {
          this.signinSuccessful(response)
        })
        .catch(error => {
          console.error('Login failed:', error)
          this.signinFailed(error)
        })
    },
    signinSuccessful (response) {
      if (!response || !response.data || !response.data.access) {
        this.signinFailed(response)
        return
      }
      
      localStorage.setItem('jwt_access', response.data.access)
      
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user))
      } else {
        localStorage.setItem('user', JSON.stringify({
          email: this.email,
          id: null
        }))
      }
      
      this.error = ''
      this.$router.replace('/dashboard')
    },
    signinFailed: function (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || ''
      this.password = ''
      localStorage.removeItem('jwt_access')
    },
    togglePassword() {
      this.showPassword = !this.showPassword
    }
  }
}
</script>

<style>
/* Global styles to remove scrollbars */
html, body {
  overflow: hidden !important;
  margin: 0 !important;
  padding: 0 !important;
  height: 100vh !important;
  width: 100vw !important;
  box-sizing: border-box !important;
}
</style>

<style scoped>
.login-page {
  height: 100vh;
  width: 100vw;
  display: flex;
  font-family: system-ui, -apple-system, sans-serif;
  overflow: hidden;
  box-sizing: border-box;
}

/* Left Side - Mandala with Enhanced Corner Designs */
.mandala-section {
  width: 50%;
  background: linear-gradient(-45deg, #0a0a0a, #111827, #1f2937, #374151, #1e1b4b, #312e81, #1e3a8a, #1e40af);
  background-size: 400% 400%;
  animation: gradientShiftLeft 8s ease infinite;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.mandala-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 15% 25%, rgba(255, 255, 255, 0.12) 1.5px, transparent 1.5px),
    radial-gradient(circle at 85% 75%, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    radial-gradient(circle at 35% 65%, rgba(255, 255, 255, 0.11) 2px, transparent 2px),
    radial-gradient(circle at 65% 35%, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
    radial-gradient(circle at 25% 75%, rgba(255, 255, 255, 0.09) 1.5px, transparent 1.5px),
    radial-gradient(circle at 75% 15%, rgba(255, 255, 255, 0.07) 1px, transparent 1px),
    radial-gradient(circle at 45% 85%, rgba(255, 255, 255, 0.08) 1.5px, transparent 1.5px),
    radial-gradient(circle at 5% 45%, rgba(255, 255, 255, 0.06) 1px, transparent 1px);
  background-size: 60px 60px, 100px 100px, 80px 80px, 120px 120px, 70px 70px, 90px 90px, 110px 110px, 85px 85px;
  animation: floatLeft 18s ease-in-out infinite;
  pointer-events: none;
}

.mandala-section::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(ellipse at 20% 30%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 70%, rgba(255, 255, 255, 0.06) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.04) 0%, transparent 70%);
  animation: waveLeft 20s ease-in-out infinite;
  pointer-events: none;
}

/* Enhanced Corner Designs */
.corner-design {
  position: absolute;
  z-index: 10;
}

.corner-design.top-left {
  top: 15px;
  left: 15px;
}

.corner-design.top-right {
  top: 15px;
  right: 15px;
}

.corner-design.bottom-left {
  bottom: 15px;
  left: 15px;
}

.corner-design.bottom-right {
  bottom: 15px;
  right: 15px;
}

.corner-svg {
  width: 100px;
  height: 100px;
  opacity: 0.9;
}

/* Border Frame */
.border-frame {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
  pointer-events: none;
}

.border-top,
.border-right,
.border-bottom,
.border-left {
  position: absolute;
  background: linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.3), rgba(255,255,255,0.1));
}

.border-top {
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
}

.border-right {
  top: 0;
  right: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, rgba(255,255,255,0.1), rgba(255,255,255,0.3), rgba(255,255,255,0.1));
}

.border-bottom {
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
}

.border-left {
  top: 0;
  left: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, rgba(255,255,255,0.1), rgba(255,255,255,0.3), rgba(255,255,255,0.1));
}

.mandala-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.mandala-svg {
  width: 80%;
  height: 80%;
  max-width: 600px;
  max-height: 600px;
}

/* Right Side - Login Form */
.login-section {
  width: 50%;
  background: linear-gradient(-45deg, #F97B22, #FF8C42, #FFB366, #FFD93D);
  background-size: 400% 400%;
  animation: gradientShift 8s ease infinite;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1.5rem;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  max-height: 100vh;
}

.login-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.25) 3px, transparent 3px),
    radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.2) 2px, transparent 2px),
    radial-gradient(circle at 40% 60%, rgba(255, 255, 255, 0.22) 2.5px, transparent 2.5px),
    radial-gradient(circle at 60% 30%, rgba(255, 255, 255, 0.18) 2px, transparent 2px),
    radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.2) 2px, transparent 2px);
  background-size: 50px 50px, 80px 80px, 70px 70px, 100px 100px, 75px 75px;
  animation: float 20s ease-in-out infinite;
  pointer-events: none;
}

.login-section::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(ellipse at 10% 20%, rgba(255, 255, 255, 0.12) 0%, transparent 50%),
    radial-gradient(ellipse at 90% 80%, rgba(255, 255, 255, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.06) 0%, transparent 70%);
  animation: wave 25s ease-in-out infinite;
  pointer-events: none;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-15px) rotate(2deg); }
  66% { transform: translateY(8px) rotate(-1deg); }
}

@keyframes floatLeft {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-12px) rotate(1deg); }
  50% { transform: translateY(6px) rotate(-1deg); }
  75% { transform: translateY(-8px) rotate(0.5deg); }
}

@keyframes waveLeft {
  0%, 100% { 
    transform: scale(1) rotate(0deg);
    opacity: 0.3;
  }
  25% { 
    transform: scale(1.1) rotate(1deg);
    opacity: 0.5;
  }
  50% { 
    transform: scale(0.9) rotate(-1deg);
    opacity: 0.4;
  }
  75% { 
    transform: scale(1.05) rotate(0.5deg);
    opacity: 0.6;
  }
}

@keyframes wave {
  0%, 100% { 
    transform: translateX(0px) translateY(0px) scale(1);
    opacity: 0.3;
  }
  25% { 
    transform: translateX(-20px) translateY(-10px) scale(1.1);
    opacity: 0.5;
  }
  50% { 
    transform: translateX(10px) translateY(-5px) scale(0.9);
    opacity: 0.4;
  }
  75% { 
    transform: translateX(-5px) translateY(5px) scale(1.05);
    opacity: 0.6;
  }
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes gradientShiftLeft {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Floating Background Shapes */
.floating-shapes {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
}

.shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(3px);
  animation: floatShape 20s ease-in-out infinite;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
}

.shape-1 {
  width: 80px;
  height: 80px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
  animation-duration: 25s;
}

.shape-2 {
  width: 60px;
  height: 60px;
  top: 60%;
  right: 15%;
  animation-delay: -5s;
  animation-duration: 30s;
}

.shape-3 {
  width: 100px;
  height: 100px;
  top: 40%;
  left: 80%;
  animation-delay: -10s;
  animation-duration: 35s;
}

.shape-4 {
  width: 50px;
  height: 50px;
  top: 80%;
  left: 20%;
  animation-delay: -15s;
  animation-duration: 20s;
}

.shape-5 {
  width: 70px;
  height: 70px;
  top: 10%;
  right: 30%;
  animation-delay: -8s;
  animation-duration: 28s;
}

@keyframes floatShape {
  0%, 100% {
    transform: translateY(0px) translateX(0px) rotate(0deg);
    opacity: 0.5;
  }
  25% {
    transform: translateY(-30px) translateX(20px) rotate(90deg);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-10px) translateX(-15px) rotate(180deg);
    opacity: 0.6;
  }
  75% {
    transform: translateY(-25px) translateX(10px) rotate(270deg);
    opacity: 0.9;
  }
}

/* Floating Background Shapes for Left Side */
.floating-shapes-left {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
}

.shape-left {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(3px);
  animation: floatShapeLeft 15s ease-in-out infinite;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.08);
}

.shape-left-1 {
  width: 60px;
  height: 60px;
  top: 15%;
  left: 15%;
  animation-delay: 0s;
  animation-duration: 20s;
}

.shape-left-2 {
  width: 40px;
  height: 40px;
  top: 70%;
  right: 20%;
  animation-delay: -6s;
  animation-duration: 25s;
}

.shape-left-3 {
  width: 80px;
  height: 80px;
  top: 45%;
  left: 75%;
  animation-delay: -12s;
  animation-duration: 22s;
}

.shape-left-4 {
  width: 35px;
  height: 35px;
  top: 25%;
  right: 10%;
  animation-delay: -3s;
  animation-duration: 18s;
}

.shape-left-5 {
  width: 50px;
  height: 50px;
  top: 60%;
  left: 10%;
  animation-delay: -8s;
  animation-duration: 24s;
}

.shape-left-6 {
  width: 45px;
  height: 45px;
  top: 35%;
  right: 40%;
  animation-delay: -15s;
  animation-duration: 20s;
}

.shape-left-7 {
  width: 70px;
  height: 70px;
  top: 80%;
  left: 50%;
  animation-delay: -10s;
  animation-duration: 26s;
}

.shape-left-8 {
  width: 30px;
  height: 30px;
  top: 10%;
  left: 40%;
  animation-delay: -5s;
  animation-duration: 16s;
}

@keyframes floatShapeLeft {
  0%, 100% {
    transform: translateY(0px) translateX(0px) rotate(0deg) scale(1);
    opacity: 0.4;
  }
  12.5% {
    transform: translateY(-25px) translateX(20px) rotate(45deg) scale(1.1);
    opacity: 0.7;
  }
  25% {
    transform: translateY(-15px) translateX(10px) rotate(90deg) scale(0.9);
    opacity: 0.5;
  }
  37.5% {
    transform: translateY(-30px) translateX(-15px) rotate(135deg) scale(1.2);
    opacity: 0.8;
  }
  50% {
    transform: translateY(-10px) translateX(-20px) rotate(180deg) scale(0.8);
    opacity: 0.6;
  }
  62.5% {
    transform: translateY(-20px) translateX(-5px) rotate(225deg) scale(1.1);
    opacity: 0.7;
  }
  75% {
    transform: translateY(-25px) translateX(12px) rotate(270deg) scale(0.9);
    opacity: 0.5;
  }
  87.5% {
    transform: translateY(-5px) translateX(18px) rotate(315deg) scale(1.3);
    opacity: 0.9;
  }
}

.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  margin-top: -3rem;
  animation: logoEntrance 1s ease-out 0.3s both;
  position: relative;
  z-index: 2;
}

@keyframes logoEntrance {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.logo-icon {
  width: 6rem;
  height: 6rem;
  background-color: transparent;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.logo-image {
  width: 5rem;
  height: 5rem;
  object-fit: contain;
  background-color: transparent;
  border-radius: 0.5rem;
  padding: 0.25rem;
}

.ministry-text {
  text-align: center;
  color: white;
}

.ministry-label {
  font-size: 1.125rem; /* Increased from 0.875rem */
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  opacity: 0.9;
  font-weight: 600; /* Added weight */
}

.ministry-title {
  font-size: 2rem; /* Increased from 1.5rem */
  font-weight: 700;
  line-height: 1.2;
}

.north {
  color: #3B82F6; /* Blue color for NORTH */
}

.eastern {
  color: #10B981; /* Green color for EASTERN */
}

.form-container {
  width: 100%;
  max-width: 28rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 1.5rem 1.5rem 2rem 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: slideInFromRight 0.8s ease-out;
  box-sizing: border-box;
  max-height: 70vh;
  overflow: hidden;
  position: relative;
  z-index: 2;
}

@keyframes slideInFromRight {
  0% {
    transform: translateX(100px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.form-header {
  text-align: center;
  margin-bottom: 0.75rem;
  margin-top: 0rem;
}

.login-title {
  font-size: 2.5rem; /* Increased from 1.875rem */
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
}

.login-subtitle {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem; /* Increased from 0.875rem */
}

.error-message {
  background-color: #fee2e2;
  color: #b91c1c;
  padding: 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  text-align: center;
  margin-bottom: 1.5rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  width: 100%;
}

.input-group {
  position: relative;
  margin-bottom: 0.375rem;
}

.input-group.focused .floating-label {
  transform: translateY(-1.5rem) scale(0.85);
  color: #10B981;
}

.floating-label {
  position: absolute;
  left: 2.5rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  pointer-events: none;
  transition: all 0.3s ease;
  background: transparent;
  padding: 0 0.25rem;
  z-index: 1;
}

.input-icon {
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
  pointer-events: none;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
  filter: brightness(0) invert(1);
  display: block;
}

.form-input {
  width: 100%;
  padding: 0.875rem 2.5rem 0.875rem 2.5rem;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 0.75rem;
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
  backdrop-filter: blur(5px);
  min-height: 3rem;
}

.form-input:focus {
  outline: none;
  background-color: rgba(255, 255, 255, 0.15);
  border-color: rgba(16, 185, 129, 0.5);
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2), 0 0 20px rgba(16, 185, 129, 0.1);
  transform: translateY(-2px);
}

/* Password input with icon on the right */
.password-input {
  padding: 0.875rem 2.5rem 0.875rem 2.5rem;
  text-indent: 0;
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

.form-input:hover {
  background-color: rgba(255, 255, 255, 0.25);
}

.form-input:focus {
  outline: none;
  background-color: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
}

.password-toggle {
  position: absolute;
  right: 0.125rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  padding: 0.25rem;
  transition: all 0.3s ease;
}

.password-toggle:hover {
  color: rgba(255, 255, 255, 1);
  transform: translateY(-50%) scale(1.1);
}

.password-toggle .icon {
  transition: transform 0.3s ease;
}

.password-toggle:active .icon {
  transform: rotate(180deg);
}

.forgot-password {
  text-align: right;
}

.forgot-link {
  color: white;
  font-size: 0.875rem;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
}

.forgot-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 1px;
  bottom: -2px;
  left: 0;
  background-color: white;
  transition: width 0.3s ease;
}

.forgot-link:hover::after {
  width: 100%;
}

.forgot-link:hover {
  opacity: 0.9;
}

.login-button {
  width: 100%;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #065F46, #047857);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 1.125rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(6, 95, 70, 0.3);
  min-height: 3.5rem;
  margin-top: 0.75rem;
  position: relative;
  overflow: hidden;
}

.login-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.login-button:hover::before {
  left: 100%;
}

.login-button:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 25px rgba(6, 95, 70, 0.4);
}

.login-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.5);
}

/* Responsive Design */
@media (max-width: 768px) {
  .login-page {
    flex-direction: column;
  }
  
  .mandala-section {
    width: 100%;
    min-height: 40vh;
  }
  
  .login-section {
    width: 100%;
    min-height: 60vh;
    padding: 1.5rem;
  }
  
  .mandala-svg {
    width: 100%;
    height: 100%;
  }
  
  .corner-design {
    display: none; /* Hide corner designs on mobile */
  }
  
  .ministry-label {
    font-size: 1rem;
  }
  
  .ministry-title {
    font-size: 1.75rem;
  }
  
  .login-title {
    font-size: 2rem;
  }
}
</style>