import { motion } from "motion/react";

const imgTest = "https://raw.githubusercontent.com/kuailexianyumeifannao-svg/zaojingji-jutiyemian/main/src/imports/11-1/16ae268f1acf15909276a0f20d16e115bfba0771.png";
const img19 = "https://raw.githubusercontent.com/kuailexianyumeifannao-svg/zaojingji-jutiyemian/main/src/imports/11-1/b00c2849d46c4460cb83c445835327503ede8956.png";
const img33 = "https://i.ibb.co/cHDz5xv/3-3.png";
const img25 = "https://raw.githubusercontent.com/kuailexianyumeifannao-svg/zaojingji-jutiyemian/main/src/imports/11-1/cd440b1d0b40e276d26957163973fc0ca0d2895c.png";

const serifBold = "'Source Han Serif CN', 'Noto Serif SC', serif";
const sansRegular = "'MiSans', 'PingFang SC', 'Microsoft YaHei', sans-serif";
const gold = "#eedab3";

export function Page11() {
  return (
    <div className="bg-black relative overflow-hidden" style={{ width: "1920px", height: "1080px" }}>

      {/* Shadow + main caisson — both float together */}
      <motion.div
        className="absolute pointer-events-none"
        style={{ left: 0, top: 0, width: "100%", height: "100%" }}
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
      >
        <div className="absolute" style={{ height: "1834px", left: "805px", opacity: 0.48, top: "-374px", width: "1416px" }}>
          <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={imgTest} />
        </div>
        <div className="absolute" style={{ height: "1126px", left: "1033px", top: "-44px", width: "869px" }}>
          <img alt="" className="absolute inset-0 max-w-none object-cover size-full" src={imgTest} />
        </div>
      </motion.div>

      {/* Title */}
      <div className="absolute content-stretch flex flex-col items-start justify-center left-[67px] top-[95px] w-[500px]" style={{ height: "80px" }}>
        <p className="[word-break:break-word] leading-[normal] not-italic relative shrink-0 w-full"
          style={{ fontFamily: serifBold, fontWeight: 700, color: gold, fontSize: "60px" }}>
          三兔飛天藻井
        </p>
      </div>

      {/* Decorative line */}
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
        莫高窟 四0七窟 隋
      </p>

      {/* Era background section title */}
      <div className="absolute content-stretch flex flex-col items-start justify-center left-[67px] top-[290px] w-[200px]" style={{ height: "50px" }}>
        <p className="[word-break:break-word] leading-[normal] not-italic relative shrink-0 w-full"
          style={{ fontFamily: serifBold, fontWeight: 700, color: gold, fontSize: "32px" }}>
          时代背景
        </p>
      </div>

      {/* Era background body text */}
      <div className="[word-break:break-word] absolute leading-[1.6] not-italic whitespace-pre-wrap"
        style={{ fontFamily: sansRegular, fontWeight: 400, fontSize: "18px", color: "rgba(238,218,179,0.85)", left: "68px", top: "355px", width: "721px" }}>
        <p className="mb-4">隋代是敦煌艺术承前启后的鼎盛准备期。</p>
        <p className="mb-4">在此期间隋朝结束了数百年分裂，南北文化、中西文化得以空前融合；佛教也极为兴盛，隋文帝、炀帝都大力崇佛，敦煌作为丝路枢纽，石窟开凿数量激增；藻井图案也从早期疏朗的几何结构，开始走向繁密华丽、动感十足的设计。</p>
        <p className="">{`"三兔共耳"的造型可能源于中亚或更西的图案，在隋代被完美融入敦煌藻井，象征着生生不息、因果循环，这种充满巧思与动感的设计，正是隋代进取、创新的时代精神写照。`}</p>
      </div>

      {/* Core pattern section title */}
      <div className="absolute content-stretch flex flex-col items-start justify-center left-[67px] top-[660px] w-[200px]" style={{ height: "50px" }}>
        <p className="[word-break:break-word] leading-[normal] not-italic relative shrink-0 w-full"
          style={{ fontFamily: serifBold, fontWeight: 700, color: gold, fontSize: "32px" }}>
          核心图案
        </p>
      </div>

      {/* Innovation & value title */}
      <p className="[word-break:break-word] absolute leading-[normal] not-italic"
        style={{ fontFamily: serifBold, fontWeight: 700, color: gold, fontSize: "32px", height: "50px", left: "67px", top: "850px", width: "457px" }}>
        创新与价值
      </p>

      {/* Innovation & value bullet list */}
      <div className="[word-break:break-word] absolute leading-[1.6] not-italic"
        style={{ fontFamily: sansRegular, fontWeight: 400, fontSize: "20px", color: "rgba(238,218,179,0.84)", left: "52px", top: "910px", width: "1628px" }}>
        <ul className="list-disc space-y-2">
          <li className="ms-[30px]"><span className="leading-[normal]">结构创新：莲花采用侧视角度绘制，打破了以往正面绽放的常规。</span></li>
          <li className="ms-[30px]"><span className="leading-[normal]">艺术价值："三兔共耳"图案是敦煌最著名的符号之一，是丝绸之路文明互鉴的生动见证。</span></li>
        </ul>
      </div>

      {/* img19 */}
      <div className="absolute" style={{ height: "99px", left: "65px", top: "740px", width: "93px" }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-lg border border-[#AF8443]/20">
          <img alt="" className="absolute max-w-none"
            style={{ height: "1099.97%", left: "-360.4%", top: "-484.58%", width: "829.52%" }}
            src={img19} />
        </div>
      </div>

      {/* img25 */}
      <div className="absolute" style={{ height: "99px", left: "179px", top: "740px", width: "89px" }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-lg border border-[#AF8443]/20">
          <img alt="" className="absolute max-w-none"
            style={{ height: "381.6%", left: "-101.5%", top: "-133.57%", width: "302.26%" }}
            src={img25} />
        </div>
      </div>

      {/* img33 */}
      <div className="absolute" style={{ height: "99px", left: "290px", top: "740px", width: "114px" }}>
        <div className="absolute inset-0 overflow-hidden rounded-lg border border-[#AF8443]/20 pointer-events-none">
          <img alt="" className="absolute inset-0 object-cover size-full" src={img33} />
        </div>
      </div>
    </div>
  );
}
