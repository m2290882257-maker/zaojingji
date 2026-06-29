import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Upload, Download, RefreshCw, Palette, Sliders, Sparkles, Copy, Check } from "lucide-react";

const serifBold = "'Source Han Serif CN', 'Noto Serif SC', serif";
const sansRegular = "'MiSans', 'PingFang SC', 'Microsoft YaHei', sans-serif";
const gold = "#eedab3";

const VP = { once: true, amount: 0.15 } as const;

function uiVariants(delay: number) {
  return {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.6, ease: "easeOut" },
    },
  };
}

// Default colors from the Sui Dynasty "Three Hares Caisson" (三兔飛天藻井)
const DEFAULT_PALETTE = [
  "#F2D337", // Ochre/Gold Yellow
  "#BA1928", // Vermilion Red
  "#EEC07E", // Warm Clay/Beige
  "#00297E", // Ultramarine Blue
  "#F88D57", // Peach/Terracotta Orange
  "#22665E", // Malachite/Teal Green
  "#F9C34D", // Earthy Mustard
  "#153945", // Deep Cobalt Slate
];

const DEFAULT_IMAGE = "https://i.ibb.co/mQP03Hq/6-2.png";

// Helper to determine if text on background should be light or dark
function getContrastColor(hexColor: string): string {
  const hex = hexColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#1c1917" : "#f5f5f4";
}

export function PageArtGenerator() {
  const [imageSrc, setImageSrc] = useState<string>(DEFAULT_IMAGE);
  const [palette, setPalette] = useState<string[]>(DEFAULT_PALETTE);
  const [artMode, setArtMode] = useState<string>("tiled-grid");
  const [elementCount, setElementCount] = useState<number>(2000);
  const [maxSize, setMaxSize] = useState<number>(200);
  const [lineWidth, setLineWidth] = useState<number>(15);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [seed, setSeed] = useState<number>(1);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Extract colors from loaded image using lightweight client-side Canvas sampling
  const extractColors = (imgUrl: string) => {
    setIsExtracting(true);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const tempCanvas = document.createElement("canvas");
        const ctx = tempCanvas.getContext("2d");
        if (!ctx) {
          setPalette(DEFAULT_PALETTE);
          setIsExtracting(false);
          return;
        }

        // Downscale to process quickly and smooth out high frequency noise
        tempCanvas.width = 64;
        tempCanvas.height = 64;
        ctx.drawImage(img, 0, 0, 64, 64);
        const imgData = ctx.getImageData(0, 0, 64, 64).data;

        const sampledColors: { r: number; g: number; b: number; count: number }[] = [];

        // Sample pixels with a step
        for (let i = 0; i < imgData.length; i += 16) {
          const r = imgData[i];
          const g = imgData[i + 1];
          const b = imgData[i + 2];
          const a = imgData[i + 3];
          if (a < 150) continue; // Skip semi-transparent pixels

          let found = false;
          // Cluster colors based on Euclidean distance in RGB space
          for (const item of sampledColors) {
            const dist = Math.sqrt(
              Math.pow(item.r - r, 2) +
              Math.pow(item.g - g, 2) +
              Math.pow(item.b - b, 2)
            );
            if (dist < 35) {
              item.r = Math.round((item.r * item.count + r) / (item.count + 1));
              item.g = Math.round((item.g * item.count + g) / (item.count + 1));
              item.b = Math.round((item.b * item.count + b) / (item.count + 1));
              item.count++;
              found = true;
              break;
            }
          }
          if (!found) {
            sampledColors.push({ r, g, b, count: 1 });
          }
        }

        // Sort by frequency
        sampledColors.sort((a, b) => b.count - a.count);

        const hexPalette: string[] = [];
        const toHex = (num: number) => {
          const h = num.toString(16).toUpperCase();
          return h.length === 1 ? "0" + h : h;
        };

        // Pick distinct colors
        for (const c of sampledColors) {
          if (hexPalette.length >= 8) break;
          const hex = `#${toHex(c.r)}${toHex(c.g)}${toHex(c.b)}`;
          
          // Ensure they are sufficiently different from already selected ones
          let tooSimilar = false;
          for (const selected of hexPalette) {
            const rSel = parseInt(selected.substring(1, 3), 16);
            const gSel = parseInt(selected.substring(3, 5), 16);
            const bSel = parseInt(selected.substring(5, 7), 16);
            const dist = Math.sqrt(
              Math.pow(rSel - c.r, 2) +
              Math.pow(gSel - c.g, 2) +
              Math.pow(bSel - c.b, 2)
            );
            if (dist < 45) {
              tooSimilar = true;
              break;
            }
          }

          if (!tooSimilar) {
            hexPalette.push(hex);
          }
        }

        // Pad if not enough colors
        while (hexPalette.length < 8 && sampledColors.length > hexPalette.length) {
          const c = sampledColors[hexPalette.length];
          const hex = `#${toHex(c.r)}${toHex(c.g)}${toHex(c.b)}`;
          if (!hexPalette.includes(hex)) {
            hexPalette.push(hex);
          }
        }

        // Fill remaining with defaults
        while (hexPalette.length < 8) {
          hexPalette.push(DEFAULT_PALETTE[hexPalette.length % DEFAULT_PALETTE.length]);
        }

        setPalette(hexPalette);
      } catch (err) {
        console.error("Error extracting colors", err);
      } finally {
        setIsExtracting(false);
      }
    };
    img.onerror = () => {
      setIsExtracting(false);
    };
    img.src = imgUrl;
  };

  // Run initial color extraction
  useEffect(() => {
    extractColors(DEFAULT_IMAGE);
  }, []);

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const localUrl = URL.createObjectURL(file);
      setImageSrc(localUrl);
      extractColors(localUrl);
    }
  };

  // Redraw Canvas Art when parameters, palette, or seed changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Use high DPI canvas drawing
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;

    // Clear background
    ctx.fillStyle = "#0c0a09"; // rich obsidian black
    ctx.fillRect(0, 0, width, height);

    // Seeded random helper to make regeneration reproducible
    let localSeed = seed;
    const random = () => {
      const x = Math.sin(localSeed++) * 10000;
      return x - Math.floor(x);
    };

    const getRandomColor = () => {
      if (palette.length === 0) return "#eedab3";
      return palette[Math.floor(random() * palette.length)];
    };

    if (artMode === "tiled-grid") {
      // 1. GRID LAYER
      const cols = 14;
      const rows = 8;
      const cellW = width / cols;
      const cellH = height / rows;

      // Draw background grid cells
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * cellW;
          const y = r * cellH;

          // Fill cell background
          ctx.fillStyle = getRandomColor();
          ctx.fillRect(x, y, cellW, cellH);

          // Random decorative sub-shape
          const choice = random();
          ctx.strokeStyle = getRandomColor();
          ctx.lineWidth = Math.max(1, lineWidth / 4);

          if (choice < 0.22) {
            // Draw a diagonal split triangle
            ctx.fillStyle = getRandomColor();
            ctx.beginPath();
            if (random() > 0.5) {
              ctx.moveTo(x, y);
              ctx.lineTo(x + cellW, y);
              ctx.lineTo(x, y + cellH);
            } else {
              ctx.moveTo(x + cellW, y);
              ctx.lineTo(x + cellW, y + cellH);
              ctx.lineTo(x, y + cellH);
            }
            ctx.closePath();
            ctx.fill();
          } else if (choice < 0.44) {
            // Draw centered intersecting cross
            ctx.beginPath();
            ctx.moveTo(x + cellW / 2, y);
            ctx.lineTo(x + cellW / 2, y + cellH);
            ctx.moveTo(x, y + cellH / 2);
            ctx.lineTo(x + cellW, y + cellH / 2);
            ctx.stroke();
          } else if (choice < 0.66) {
            // Draw nested inner outline square
            const offset = Math.min(cellW, cellH) * 0.2;
            ctx.strokeRect(x + offset, y + offset, cellW - offset * 2, cellH - offset * 2);
          } else if (choice < 0.85) {
            // Draw solid inner square
            ctx.fillStyle = getRandomColor();
            const offset = Math.min(cellW, cellH) * 0.25;
            ctx.fillRect(x + offset, y + offset, cellW - offset * 2, cellH - offset * 2);
          }
        }
      }

      // 2. SCATTERED OVERLAYS (representing Element Count)
      // We will place up to (elementCount / 20) larger elements for accent, and others smaller to maintain elegance.
      const overlayCount = Math.min(elementCount, 400); // capped to preserve rendering performance and keep it clean
      for (let i = 0; i < overlayCount; i++) {
        const size = random() * maxSize;
        const cx = random() * width;
        const cy = random() * height;
        const color = getRandomColor();
        const type = random();

        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = random() * lineWidth;

        ctx.globalAlpha = 0.4 + random() * 0.5; // beautiful blending opacity

        if (type < 0.3) {
          // Decorative thin lines
          ctx.beginPath();
          ctx.moveTo(cx - size / 2, cy - size / 2);
          ctx.lineTo(cx + size / 2, cy + size / 2);
          ctx.stroke();
        } else if (type < 0.6) {
          // Hollow squares
          ctx.strokeRect(cx - size / 2, cy - size / 2, size, size);
        } else if (type < 0.8) {
          // Diagonal corner blocks
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + size / 3, cy);
          ctx.lineTo(cx, cy + size / 3);
          ctx.closePath();
          ctx.fill();
        }
      }

      // Restore alpha
      ctx.globalAlpha = 1.0;
    }
  }, [palette, artMode, elementCount, maxSize, lineWidth, seed]);

  // Copy HEX code to clipboard
  const handleCopyColor = (color: string, index: number) => {
    navigator.clipboard.writeText(color);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  // Download artwork as PNG
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `Dunhuang-Caisson-Art-${Date.now()}.png`;
    link.href = url;
    link.click();
  };

  // Manually update color palette items
  const handleColorChange = (index: number, newColor: string) => {
    const updated = [...palette];
    updated[index] = newColor;
    setPalette(updated);
  };

  return (
    <div className="bg-black relative overflow-hidden" style={{ width: "1920px", height: "1080px" }}>
      
      {/* Title block */}
      <div className="absolute content-stretch flex flex-col items-start justify-center left-[67px] top-[95px] w-[600px]" style={{ height: "80px" }}>
        <p className="[word-break:break-word] leading-[normal] not-italic relative shrink-0 w-full"
          style={{ fontFamily: serifBold, fontWeight: 700, color: gold, fontSize: "60px" }}>
          三兔飛天藻井
        </p>
      </div>

      {/* Decorative dividing line */}
      <div className="absolute h-[6px] left-[71px] top-[195px] w-[495px]">
        <div className="absolute inset-[-25%_0_-12.5%_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 495 8.25">
            <path d="M0 1.50H495" stroke="#AF8443" strokeWidth="3" />
            <path d="M0 7.50H244" stroke="#AF8443" strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      {/* Location subtitle */}
      <p className="[word-break:break-word] absolute leading-[normal] not-italic whitespace-nowrap"
        style={{ fontFamily: sansRegular, fontWeight: 400, color: gold, fontSize: "24px", left: "71px", top: "215px" }}>
        莫高窟 四〇七窟 隋
      </p>

      {/* Left Column - Image Upload & Color Extraction */}
      <motion.div 
        className="absolute flex flex-col gap-6"
        style={{ left: "67px", top: "270px", width: "400px" }}
        variants={uiVariants(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={VP}
      >
        {/* Clickable Image Box */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="relative w-[400px] h-[400px] border border-[#AF8443]/30 rounded-xl overflow-hidden group cursor-pointer shadow-xl bg-zinc-950 transition-all duration-300 hover:border-[#AF8443]/80 hover:shadow-[#AF8443]/10"
        >
          <img 
            src={imageSrc} 
            alt="Source Caisson Pattern" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Upload Hover Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-3 transition-opacity duration-300">
            <div className="p-3 bg-stone-900/80 rounded-full border border-[#AF8443]/50">
              <Upload className="w-6 h-6 text-[#eedab3]" />
            </div>
            <p className="text-[#eedab3] text-sm font-medium tracking-wider" style={{ fontFamily: sansRegular }}>
              点击上传图片提取色谱
            </p>
            <p className="text-[#eedab3]/60 text-xs" style={{ fontFamily: sansRegular }}>
              支持 JPG, PNG, WEBP
            </p>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleImageChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>

        {/* Color Palette Display */}
        <div className="flex flex-col gap-4 mt-2">
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-[#eedab3]" />
            <span className="text-[#eedab3] font-medium tracking-wide text-2xl" style={{ fontFamily: serifBold }}>
              色卡取用
            </span>
            {isExtracting && (
              <span className="text-xs text-[#eedab3]/50 animate-pulse font-mono ml-auto">
                EXTRACTING...
              </span>
            )}
          </div>

          {/* Grid of 8 colors */}
          <div className="grid grid-cols-2 gap-3">
            {palette.map((color, index) => (
              <div 
                key={index}
                style={{ backgroundColor: color }}
                className="h-[48px] rounded-lg relative overflow-hidden group flex items-center justify-between px-3 shadow-md border border-white/5 transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer"
                onClick={() => handleCopyColor(color, index)}
              >
                <span 
                  className="font-mono text-sm font-semibold select-all" 
                  style={{ color: getContrastColor(color) }}
                >
                  {color}
                </span>

                {/* Color Input Overlay Button */}
                <input 
                  type="color"
                  value={color}
                  onChange={(e) => handleColorChange(index, e.target.value)}
                  onClick={(e) => e.stopPropagation()} // stop parent copy triggers
                  className="opacity-0 absolute right-1 bottom-1 w-6 h-6 cursor-pointer"
                />

                <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  {copiedIndex === index ? (
                    <Check className="w-4 h-4" style={{ color: getContrastColor(color) }} />
                  ) : (
                    <Copy className="w-3.5 h-3.5" style={{ color: getContrastColor(color) }} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Middle Column - Style & Sliders Controls */}
      <motion.div
        className="absolute flex flex-col gap-6"
        style={{ left: "510px", top: "270px", width: "360px" }}
        variants={uiVariants(0.2)}
        initial="hidden"
        whileInView="visible"
        viewport={VP}
      >
        {/* Style selection */}
        <div className="border border-[#AF8443]/40 rounded-xl p-5 bg-stone-950/60 backdrop-blur-md flex flex-col gap-3 shadow-lg">
          <div className="flex items-center gap-2 text-[#eedab3]">
            <Sparkles className="w-5 h-5" />
            <span className="text-xl font-medium tracking-wide" style={{ fontFamily: serifBold }}>
              艺术风格
            </span>
          </div>
          <div className="relative">
            <select
              value={artMode}
              onChange={(e) => setArtMode(e.target.value)}
              className="w-full bg-stone-900 border border-[#AF8443]/40 text-[#eedab3] py-2.5 px-4 rounded-lg focus:outline-none focus:border-[#AF8443] transition-colors appearance-none cursor-pointer pr-10 text-base"
              style={{ fontFamily: sansRegular }}
            >
              <option value="tiled-grid">网格艺术</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#eedab3]">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Sliders Box */}
        <div className="border border-[#AF8443]/40 rounded-xl p-6 bg-stone-950/60 backdrop-blur-md flex flex-col gap-6 shadow-lg">
          <div className="flex items-center gap-2 text-[#eedab3]">
            <Sliders className="w-5 h-5" />
            <span className="text-xl font-medium tracking-wide" style={{ fontFamily: serifBold }}>
              参数
            </span>
          </div>

          {/* Slider 1: Element Count */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-base" style={{ fontFamily: sansRegular }}>
              <span className="text-[#eedab3]/80">元素数量:</span>
              <span className="text-[#eedab3] font-medium">{elementCount}</span>
            </div>
            <input 
              type="range"
              min="100"
              max="4000"
              step="50"
              value={elementCount}
              onChange={(e) => setElementCount(Number(e.target.value))}
              className="w-full accent-[#AF8443] cursor-pointer"
            />
          </div>

          {/* Slider 2: Max Size */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-base" style={{ fontFamily: sansRegular }}>
              <span className="text-[#eedab3]/80">最大尺寸:</span>
              <span className="text-[#eedab3] font-medium">{maxSize}px</span>
            </div>
            <input 
              type="range"
              min="20"
              max="400"
              step="5"
              value={maxSize}
              onChange={(e) => setMaxSize(Number(e.target.value))}
              className="w-full accent-[#AF8443] cursor-pointer"
            />
          </div>

          {/* Slider 3: Line Width */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-base" style={{ fontFamily: sansRegular }}>
              <span className="text-[#eedab3]/80">线条宽度:</span>
              <span className="text-[#eedab3] font-medium">{lineWidth}px</span>
            </div>
            <input 
              type="range"
              min="1"
              max="40"
              step="1"
              value={lineWidth}
              onChange={(e) => setLineWidth(Number(e.target.value))}
              className="w-full accent-[#AF8443] cursor-pointer"
            />
          </div>

          {/* Action buttons inside the parameters box */}
          <div className="flex flex-col gap-3 mt-4">
            <button
              onClick={() => setSeed(prev => prev + 1)}
              className="w-full py-3 px-4 bg-[#AF8443]/20 border border-[#AF8443]/80 text-[#eedab3] rounded-lg font-medium tracking-wider text-base flex items-center justify-center gap-2 hover:bg-[#AF8443]/40 transition-all active:scale-[0.98]"
              style={{ fontFamily: sansRegular }}
            >
              <RefreshCw className="w-4 h-4" />
              重新生成 Art
            </button>
            <button
              onClick={handleDownload}
              className="w-full py-3 px-4 bg-[#AF8443] text-stone-950 rounded-lg font-bold tracking-wider text-base flex items-center justify-center gap-2 hover:bg-[#eedab3] transition-all active:scale-[0.98] shadow-lg shadow-[#AF8443]/20"
              style={{ fontFamily: sansRegular }}
            >
              <Download className="w-4 h-4 text-stone-950" />
              下载作品 (.PNG)
            </button>
          </div>
        </div>
      </motion.div>

      {/* Right Column - Beautiful generative Canvas */}
      <motion.div
        className="absolute"
        style={{ left: "910px", top: "270px", width: "943px", height: "670px" }}
        variants={uiVariants(0.3)}
        initial="hidden"
        whileInView="visible"
        viewport={VP}
      >
        <div className="w-full h-full border border-[#AF8443]/40 rounded-xl overflow-hidden shadow-2xl relative bg-zinc-950">
          <canvas 
            ref={canvasRef} 
            className="w-full h-full block cursor-crosshair"
          />
        </div>
      </motion.div>

    </div>
  );
}
