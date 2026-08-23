import{d as S,j as e,H as O,ai as R,B as I,aj as Y,ak as D}from"./index-BLNQdxmR.js";import{u as P,c as z,b as p}from"./vendor-DFXNMGXD.js";import{c as v}from"./confetti.module-ONDKWxYZ.js";const A=()=>{var y,k;const{t:o}=S(),g=P(),n=z(),[x,i]=p.useState(!1),m=new URLSearchParams(g.search),f=m.get("memberNumber"),T=m.get("canceled")==="true",a=m.get("success")==="true",t=((y=g.state)==null?void 0:y.memberNumber)||(f?Number(f):void 0),c=((k=g.state)==null?void 0:k.canceled)||T,d=a||!c&&!!t,l=t??(a?147:void 0),b=`${window.location.origin}/founding-member`,h=p.useCallback(()=>{const N=Date.now()+5e3,j={startVelocity:30,spread:360,ticks:60,zIndex:0},C=(s,u)=>Math.random()*(u-s)+s,F=setInterval(function(){const s=N-Date.now();if(s<=0)return clearInterval(F);const u=50*(s/5e3);v({...j,particleCount:u,origin:{x:C(.1,.3),y:Math.random()-.2}}),v({...j,particleCount:u,origin:{x:C(.7,.9),y:Math.random()-.2}})},250)},[]);if(p.useEffect(()=>{!t&&!c&&!a?n("/founding-member",{replace:!0}):d&&h()},[t,c,a,n,d,h]),!t&&!c&&!a)return null;const w=async()=>{try{await navigator.clipboard.writeText(b),i(!0),setTimeout(()=>i(!1),2e3)}catch{}},M=async()=>{const r=`I joined the Founding 500 — Founding Member #${l}`;try{navigator.share?await navigator.share({title:r,text:r,url:b}):await navigator.clipboard.writeText(b),i(!0),setTimeout(()=>i(!1),2e3)}catch{}};return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        @keyframes reveal {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        /* Shimmer 3s + Pause 2s = 5s total duration */
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          60% { background-position: 200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-reveal { animation: reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .success-card {
          background: white;
          border-radius: 24px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.1);
          padding: 3rem 2rem;
          position: relative;
          overflow: hidden;
        }
        .member-badge {
          background: linear-gradient(90deg, #1e3a8a 0%, #2563eb 25%, #ffffff 50%, #2563eb 75%, #1e3a8a 100%);
          background-size: 200% auto;
          color: white;
          padding: 0.5rem 1.5rem;
          border-radius: 99px;
          display: inline-block;
          font-weight: 800;
          letter-spacing: 1px;
          animation: shimmer 5s linear infinite;
          box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
        }
        .main-img { animation: float 4s ease-in-out infinite; }
      `}),e.jsx(O,{children:e.jsx("title",{children:d?o("founding.successPageTitle")||"Success — Founding Member":o("founding.canceledPageTitle")||"Canceled — Founding Member"})}),e.jsx("section",{className:"about",children:e.jsx("div",{className:"container","data-aos":"fade-up",children:e.jsx("div",{className:"text-center py-16",children:d?e.jsxs(e.Fragment,{children:[e.jsx("img",{src:"/images/Founding.png",alt:"Success",className:"mx-auto mb-10 w-24 h-24"}),e.jsx("h1",{className:"text-3xl font-bold mt-4 mb-4",children:l!==void 0?o("founding.successTitle",{newMemberNumber:l})||`You're Founding Member #${l}`:o("founding.successTitle")||"Success — Founding Member"}),e.jsx("p",{className:"text-lg text-gray-600 mb-8",children:o("founding.successBody")||"Lifetime Pro unlocked — check your profile."}),e.jsxs("div",{className:"flex gap-4 justify-center mb-8",children:[e.jsxs("button",{onClick:M,style:{backgroundColor:"#2563eb",color:"white",padding:"12px 24px",borderRadius:"8px",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:"0.5rem"},onMouseOver:r=>r.currentTarget.style.backgroundColor="#1d4ed8",onMouseOut:r=>r.currentTarget.style.backgroundColor="#2563eb",children:[e.jsx(R,{}),o("founding.share")||"Share"]}),e.jsxs("button",{onClick:w,style:{backgroundColor:"#e5e7eb",color:"#1f2937",padding:"12px 24px",borderRadius:"8px",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:"0.5rem"},onMouseOver:r=>r.currentTarget.style.backgroundColor="#d1d5db",onMouseOut:r=>r.currentTarget.style.backgroundColor="#e5e7eb",children:[x?e.jsx(I,{}):e.jsx(Y,{}),x?o("founding.copied")||"Copied":o("founding.copyLink")||"Copy link"]})]}),e.jsx("div",{className:"flex gap-4 justify-center mb-8 mt-2",children:e.jsx("button",{onClick:()=>n("/profile"),style:{backgroundColor:"#059669",color:"white",padding:"16px 32px",borderRadius:"8px",border:"none",cursor:"pointer",fontSize:"18px"},onMouseOver:r=>r.currentTarget.style.backgroundColor="#047857",onMouseOut:r=>r.currentTarget.style.backgroundColor="#059669",children:o("founding.goToDashboard")||"Go to Dashboard"})})]}):e.jsxs(e.Fragment,{children:[e.jsx(D,{style:{color:"#dc2626",fontSize:"3rem",display:"block",margin:"0 auto 1.5rem"}}),e.jsx("h1",{className:"text-3xl font-bold mb-4",children:o("founding.canceledTitle")||"Purchase Canceled"}),e.jsx("p",{className:"text-lg text-gray-600 mb-8",children:o("founding.canceledBody")||"Your purchase was canceled. You can try again anytime."}),e.jsxs("div",{className:"flex gap-4 justify-center mb-8",children:[e.jsx("button",{onClick:()=>n("/founding-member"),style:{backgroundColor:"#2563eb",color:"white",padding:"12px 24px",borderRadius:"8px",border:"none",cursor:"pointer"},onMouseOver:r=>r.currentTarget.style.backgroundColor="#1d4ed8",onMouseOut:r=>r.currentTarget.style.backgroundColor="#2563eb",children:o("founding.tryAgain")||"Try Again"}),e.jsx("button",{onClick:()=>n("/profile"),style:{backgroundColor:"#e5e7eb",color:"#1f2937",padding:"12px 24px",borderRadius:"8px",border:"none",cursor:"pointer"},onMouseOver:r=>r.currentTarget.style.backgroundColor="#d1d5db",onMouseOut:r=>r.currentTarget.style.backgroundColor="#e5e7eb",children:o("founding.goToDashboard")||"Go to Dashboard"})]})]})})})})]})};export{A as default};
