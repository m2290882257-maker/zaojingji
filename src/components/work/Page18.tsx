import { motion } from "motion/react";

const svgPaths = {
  p2c5fbd00: "M1 0.5V0H0V0.5H0.5H1ZM0.5 190.5H0V191H0.5V190.5ZM87.8333 190.5C87.8333 191.973 89.0272 193.167 90.5 193.167C91.9728 193.167 93.1667 191.973 93.1667 190.5C93.1667 189.027 91.9728 187.833 90.5 187.833C89.0272 187.833 87.8333 189.027 87.8333 190.5ZM0.5 0.5H0V190.5H0.5H1V0.5H0.5ZM0.5 190.5V191H90.5V190.5V190H0.5V190.5Z",
  p55bd3e0: "M1 0.5V0H0V0.5H0.5H1ZM0.5 258.5H0V259H0.5V258.5ZM55.8333 258.5C55.8333 259.973 57.0272 261.167 58.5 261.167C59.9728 261.167 61.1667 259.973 61.1667 258.5C61.1667 257.027 59.9728 255.833 58.5 255.833C57.0272 255.833 55.8333 257.027 55.8333 258.5ZM0.5 0.5H0V258.5H0.5H1V0.5H0.5ZM0.5 258.5V259H58.5V258.5V258H0.5V258.5Z",
  pcc7d00: "M1 0.5V0H0V0.5H0.5H1ZM0.5 110.5H0V111H0.5V110.5ZM83.8333 110.5C83.8333 111.973 85.0272 113.167 86.5 113.167C87.9728 113.167 89.1667 111.973 89.1667 110.5C89.1667 109.027 87.9728 107.833 86.5 107.833C85.0272 107.833 83.8333 109.027 83.8333 110.5ZM0.5 0.5H0V110.5H0.5H1V0.5H0.5ZM0.5 110.5V111H86.5V110.5V110H0.5V110.5Z",
};

const imgTest = "https://raw.githubusercontent.com/kuailexianyumeifannao-svg/zaojingji-jutiyemian/main/src/imports/18-2/aab7f42d4ceec0558a0fd56754e08e8c2eca1a0a.png";
const imgTest1 = "https://raw.githubusercontent.com/kuailexianyumeifannao-svg/zaojingji-jutiyemian/main/src/imports/18-2/0d81e51ff42d49cef7240645ef4f6f584e8fd73f.png";
const imgTest2 = "https://raw.githubusercontent.com/kuailexianyumeifannao-svg/zaojingji-jutiyemian/main/src/imports/18-2/52c008d7ec5a29dc1ebc6e7b8d677b4767eb3fc0.png";
const imgTest3 = "https://raw.githubusercontent.com/kuailexianyumeifannao-svg/zaojingji-jutiyemian/main/src/imports/18-2/68943952b4ba6b85acf36515a97e53443733567a.png";
const imgTest4 = "https://raw.githubusercontent.com/kuailexianyumeifannao-svg/zaojingji-jutiyemian/main/src/imports/18-2/4800a60d83639dabc0db67d55fb2d319a5b13d96.png";
const imgTest5 = "https://raw.githubusercontent.com/kuailexianyumeifannao-svg/zaojingji-jutiyemian/main/src/imports/18-2/ed5f05eae586e06fb73cc3da5ff6b54456770a94.png";

const LAYER_STAGE_GRID = 0.28;
const LAYER_DURATION = 0.75;
const SLIDE_OFFSET = 100;
const UI_BASE_DELAY = (5 + 1) * LAYER_STAGE_GRID + LAYER_DURATION - 0.2;

const serifBold = "'Source Han Serif CN', 'Noto Serif SC', serif";
const sansRegular = "'MiSans', 'PingFang SC', 'Microsoft YaHei', sans-serif";
const gold = "#eedab3";

function layerVariants(index: number) {
  return {
    hidden: { x: SLIDE_OFFSET, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        delay: index * LAYER_STAGE_GRID,
        duration: LAYER_DURATION,
        ease: [0.25, 0.46, 0.45, 0.94] as any,
      },
    },
  };
}

function uiVariants(delay: number) {
  return {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.5, ease: "easeOut" },
    },
  };
}

const VP = { once: true, amount: 0.15 } as const;

type CardData = { delay: number; left: string; top: string; w: string; h: string; text: string };

const CARDS: CardData[] = [
  { delay: UI_BASE_DELAY + 0 * 0.15, left: "135px", top: "745px", w: "240px", h: "170px", text: "三兔相互追逐旋转，通过共用耳部打破时空局限，属佛教“共生同构”符号。" },
  { delay: UI_BASE_DELAY + 1 * 0.15, left: "415px", top: "774px", w: "240px", h: "170px", text: "双层叠加复合花，瓣尖内卷如钩，属于“宝装莲花”变体。" },
  { delay: UI_BASE_DELAY + 2 * 0.15, left: "695px", top: "835px", w: "240px", h: "170px", text: "飞天、童子、比丘环绕飞行，天雨香花，彩云呈祥。" },
  { delay: UI_BASE_DELAY + 3 * 0.15, left: "975px", top: "860px", w: "240px", h: "170px", text: "双层菱形网格及忍冬纹构成，菱格交叉点嵌入四瓣小花珠饰。" },
  { delay: UI_BASE_DELAY + 4 * 0.15, left: "1285px", top: "860px", w: "240px", h: "170px", text: "外层垂幔边缘渐隐于虚空，破除藻井作为建筑构件的物理边界。" },
];

export function Page18() {
  return (
    <div className="relative overflow-hidden" style={{ width: "1920px", height: "1080px" }}>

      {/* Image layers */}
      
      {/* BACK — outermost shadow (left=1070), animates last */}
      <motion.div className="absolute pointer-events-none"
        style={{ height: "882px", left: "1070px", top: "99px", width: "804px" }}
        variants={{ hidden: { x: SLIDE_OFFSET, opacity: 0 }, visible: { x: 0, opacity: 0.52, transition: { delay: 5 * LAYER_STAGE_GRID, duration: LAYER_DURATION, ease: [0.25, 0.46, 0.45, 0.94] as any } } }}
        initial="hidden" whileInView="visible" viewport={VP}
      >
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute max-w-none"
            style={{ height: "189.1%", left: "-31.66%", top: "-40.95%", width: "153.63%" }} src={imgTest} />
        </div>
      </motion.div>

      {/* left=844, animates 4th */}
      <motion.div className="absolute pointer-events-none"
        style={{ height: "720.409px", left: "844px", top: "203.9px", width: "564.742px" }}
        variants={layerVariants(4)} initial="hidden" whileInView="visible" viewport={VP}
      >
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute max-w-none"
            style={{ height: "133.41%", left: "-38.55%", top: "-17.8%", width: "167.53%" }} src={imgTest1} />
        </div>
      </motion.div>

      {/* left=686, animates 3rd */}
      <motion.div className="absolute pointer-events-none"
        style={{ height: "472.17px", left: "686px", top: "349px", width: "407.008px" }}
        variants={layerVariants(3)} initial="hidden" whileInView="visible" viewport={VP}
      >
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute max-w-none"
            style={{ height: "156.37%", left: "-43.66%", top: "-32.05%", width: "207.26%" }} src={imgTest2} />
        </div>
      </motion.div>

      {/* left=615, animates 2nd */}
      <motion.div className="absolute pointer-events-none"
        style={{ height: "386.669px", left: "615px", top: "377px", width: "275.227px" }}
        variants={layerVariants(2)} initial="hidden" whileInView="visible" viewport={VP}
      >
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute max-w-none"
            style={{ height: "144.25%", left: "-38.87%", top: "-22.91%", width: "179.46%" }} src={imgTest3} />
        </div>
      </motion.div>

      {/* left=370, animates 1st */}
      <motion.div className="absolute pointer-events-none"
        style={{ height: "253.927px", left: "370px", top: "481px", width: "405.973px" }}
        variants={layerVariants(1)} initial="hidden" whileInView="visible" viewport={VP}
      >
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute max-w-none"
            style={{ height: "532.85%", left: "-68.93%", top: "-206.31%", width: "247.17%" }} src={imgTest4} />
        </div>
      </motion.div>

      {/* FRONT — innermost (left=350), animates first */}
      <motion.div className="absolute pointer-events-none"
        style={{ height: "170.147px", left: "350px", top: "557px", width: "163.424px" }}
        variants={layerVariants(0)} initial="hidden" whileInView="visible" viewport={VP}
      >
        <div className="absolute inset-0 overflow-hidden">
          <img alt="" className="absolute max-w-none"
            style={{ height: "178.42%", left: "-31.01%", top: "-41.64%", width: "165.19%" }} src={imgTest5} />
        </div>
      </motion.div>

      {/* Title & decorative line */}
      <motion.p className="[word-break:break-word] absolute leading-none not-italic"
        style={{ fontFamily: serifBold, fontWeight: 700, color: gold, fontSize: "60px", left: "67px", top: "73px", width: "600px" }}
        variants={uiVariants(0.1)} initial="hidden" whileInView="visible" viewport={VP}
      >
        核心纹样形态
      </motion.p>

      <motion.div className="absolute h-[7px] left-[67px] top-[193px] w-[450px]"
        variants={uiVariants(0.2)} initial="hidden" whileInView="visible" viewport={VP}
      >
        <div className="absolute inset-[-21.43%_0_-10.71%_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 450 9.25">
            <path d="M0 1.50H450" stroke="#AF8443" strokeWidth="3" />
            <path d="M0 8.50H244" stroke="#AF8443" strokeWidth="1.5" />
          </svg>
        </div>
      </motion.div>



      {/* Label pills + connectors */}
      {[
        {
          delay: UI_BASE_DELAY + 0 * 0.15,
          pill: { left: "155px", top: "485px", width: "250px", text: "三兔飛天藻井" },
          arrow: { h: "110px", left: "282px", top: "540px", w: "86px", inset: "-0.45%_-3.1%_-2.42%_-0.58%", vb: "0 0 89.1667 113.167", path: svgPaths.pcc7d00 },
        },
        {
          delay: UI_BASE_DELAY + 1 * 0.15,
          pill: { left: "424px", top: "375px", width: "169px", text: "中央主莲" },
          arrow: { h: "190px", left: "484px", top: "430px", w: "90px", inset: "-0.26%_-2.96%_-1.4%_-0.56%", vb: "0 0 93.1667 193.167", path: svgPaths.p2c5fbd00 },
        },
        {
          delay: UI_BASE_DELAY + 2 * 0.15,
          pill: { left: "653px", top: "276px", width: "169px", text: "飞天队列" },
          arrow: { h: "258px", left: "705px", top: "331px", w: "58px", inset: "-0.19%_-4.6%_-1.03%_-0.86%", vb: "0 0 61.1667 261.167", path: svgPaths.p55bd3e0 },
        },
        {
          delay: UI_BASE_DELAY + 3 * 0.15,
          pill: { left: "905px", top: "174px", width: "206px", text: "菱格连珠纹" },
          arrow: { h: "258px", left: "934px", top: "229px", w: "58px", inset: "-0.19%_-4.6%_-1.03%_-0.86%", vb: "0 0 61.1667 261.167", path: svgPaths.p55bd3e0 },
        },
        {
          delay: UI_BASE_DELAY + 4 * 0.15,
          pill: { left: "1189px", top: "134px", width: "206px", text: "卷草蔓延纹" },
          arrow: { h: "258px", left: "1222px", top: "189px", w: "58px", inset: "-0.19%_-4.6%_-1.03%_-0.86%", vb: "0 0 61.1667 261.167", path: svgPaths.p55bd3e0 },
        },
      ].map(({ delay, pill, arrow }) => (
        <motion.div key={pill.left} variants={uiVariants(delay)} initial="hidden" whileInView="visible" viewport={VP}>
          <div className="absolute bg-[rgba(255,255,255,0.12)] backdrop-blur-sm h-[55px] rounded-[16px] flex items-center justify-center shadow-md shadow-black/20"
            style={{ left: pill.left, top: pill.top, width: pill.width }}
          >
            <span className="leading-[normal] not-italic whitespace-nowrap text-center"
              style={{ fontFamily: serifBold, color: gold, fontSize: "24px" }}>
              {pill.text}
            </span>
          </div>

          <div className="absolute opacity-80" style={{ height: arrow.h, left: arrow.left, top: arrow.top, width: arrow.w }}>
            <div className="absolute" style={{ inset: arrow.inset }}>
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox={arrow.vb}>
                <path d={arrow.path} fill="#D0B585" />
              </svg>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Annotation cards */}
      {CARDS.map(({ delay, left, top, w, h, text }) => (
        <motion.div key={left + top}
          className="absolute bg-[rgba(255,255,255,0.12)] backdrop-blur-sm flex items-center justify-center p-5 rounded-lg shadow-md shadow-black/20"
          style={{ left, top, width: w, height: h }}
          variants={uiVariants(delay)} initial="hidden" whileInView="visible" viewport={VP}
        >
          <p className="[word-break:break-word] leading-[1.6] not-italic text-center"
            style={{ fontFamily: sansRegular, color: gold, fontSize: "18px" }}>
            {text}
          </p>
        </motion.div>
      ))}

      {/* Empty vector placeholder */}
      <div className="absolute" style={{ height: "100px", left: "247.5px", top: "548.5px", width: "96px" }}>
        <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32"><g /></svg>
      </div>
    </div>
  );
}
