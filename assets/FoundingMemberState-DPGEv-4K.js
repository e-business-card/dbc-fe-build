import{e as I,j as e,H as Y,at as z,z as D,au as P,av as E}from"./index-CRv9zYDs.js";import{u as L,c as q,b as o}from"./vendor-DFXNMGXD.js";import{c as x}from"./confetti.module-ONDKWxYZ.js";const G=()=>{var v,T;const{t:n}=I(),g=L(),t=q(),[h,y]=o.useState(!1),a=o.useRef(null),b=o.useRef(!1);o.useEffect(()=>(b.current=!1,()=>{b.current=!0,a.current&&clearTimeout(a.current)}),[]);const k=()=>{b.current||(y(!0),a.current&&clearTimeout(a.current),a.current=setTimeout(()=>y(!1),2e3))},p=new URLSearchParams(g.search),C=p.get("memberNumber"),F=p.get("canceled")==="true",s=p.get("success")==="true",i=((v=g.state)==null?void 0:v.memberNumber)||(C?Number(C):void 0),d=((T=g.state)==null?void 0:T.canceled)||F,l=s||!d&&!!i,u=i??(s?147:void 0),f=`${window.location.origin}/founding-member`,j=o.useCallback(()=>{const R=Date.now()+5e3,w={startVelocity:30,spread:360,ticks:60,zIndex:0},M=(c,m)=>Math.random()*(m-c)+c,N=setInterval(function(){const c=R-Date.now();if(c<=0)return clearInterval(N);const m=50*(c/5e3);x({...w,particleCount:m,origin:{x:M(.1,.3),y:Math.random()-.2}}),x({...w,particleCount:m,origin:{x:M(.7,.9),y:Math.random()-.2}})},250);return()=>{clearInterval(N),x.reset()}},[]);if(o.useEffect(()=>{if(!i&&!d&&!s)t("/founding-member",{replace:!0});else if(l)return j()},[i,d,s,t,l,j]),!i&&!d&&!s)return null;const S=async()=>{try{await navigator.clipboard.writeText(f),k()}catch{}},O=async()=>{const r=`I joined as Founding Member #${u}`;try{navigator.share?await navigator.share({title:r,text:r,url:f}):await navigator.clipboard.writeText(f),k()}catch{}};return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
      `}),e.jsx(Y,{children:e.jsx("title",{children:l?n("founding.successPageTitle")||"Success — Founding Member":n("founding.canceledPageTitle")||"Canceled — Founding Member"})}),e.jsx("section",{className:"about",children:e.jsx("div",{className:"container","data-aos":"fade-up",children:e.jsx("div",{className:"text-center py-16",children:l?e.jsxs(e.Fragment,{children:[e.jsx("img",{src:"/images/Founding.png",alt:"Success",className:"mx-auto mb-10 w-24 h-24"}),e.jsx("h1",{className:"text-3xl font-bold mt-4 mb-4",children:u!==void 0?n("founding.successTitle",{newMemberNumber:u})||`You're Founding Member #${u}`:n("founding.successTitle")||"Success — Founding Member"}),e.jsx("p",{className:"text-lg text-gray-600 mb-8",children:n("founding.successBody")||"Lifetime Pro unlocked — check your profile."}),e.jsxs("div",{className:"flex gap-4 justify-center mb-8",children:[e.jsxs("button",{onClick:O,style:{backgroundColor:"#2563eb",color:"white",padding:"12px 24px",borderRadius:"8px",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:"0.5rem"},onMouseOver:r=>r.currentTarget.style.backgroundColor="#1d4ed8",onMouseOut:r=>r.currentTarget.style.backgroundColor="#2563eb",children:[e.jsx(z,{}),n("founding.share")||"Share"]}),e.jsxs("button",{onClick:S,style:{backgroundColor:"#e5e7eb",color:"#1f2937",padding:"12px 24px",borderRadius:"8px",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:"0.5rem"},onMouseOver:r=>r.currentTarget.style.backgroundColor="#d1d5db",onMouseOut:r=>r.currentTarget.style.backgroundColor="#e5e7eb",children:[h?e.jsx(D,{}):e.jsx(P,{}),h?n("founding.copied")||"Copied":n("founding.copyLink")||"Copy link"]})]}),e.jsx("div",{className:"flex gap-4 justify-center mb-8 mt-2",children:e.jsx("button",{onClick:()=>t("/profile"),style:{backgroundColor:"#059669",color:"white",padding:"16px 32px",borderRadius:"8px",border:"none",cursor:"pointer",fontSize:"18px"},onMouseOver:r=>r.currentTarget.style.backgroundColor="#047857",onMouseOut:r=>r.currentTarget.style.backgroundColor="#059669",children:n("founding.goToDashboard")||"Go to Dashboard"})})]}):e.jsxs(e.Fragment,{children:[e.jsx(E,{style:{color:"#dc2626",fontSize:"3rem",display:"block",margin:"0 auto 1.5rem"}}),e.jsx("h1",{className:"text-3xl font-bold mb-4",children:n("founding.canceledTitle")||"Purchase Canceled"}),e.jsx("p",{className:"text-lg text-gray-600 mb-8",children:n("founding.canceledBody")||"Your purchase was canceled. You can try again anytime."}),e.jsxs("div",{className:"flex gap-4 justify-center mb-8",children:[e.jsx("button",{onClick:()=>t("/founding-member"),style:{backgroundColor:"#2563eb",color:"white",padding:"12px 24px",borderRadius:"8px",border:"none",cursor:"pointer"},onMouseOver:r=>r.currentTarget.style.backgroundColor="#1d4ed8",onMouseOut:r=>r.currentTarget.style.backgroundColor="#2563eb",children:n("founding.tryAgain")||"Try Again"}),e.jsx("button",{onClick:()=>t("/profile"),style:{backgroundColor:"#e5e7eb",color:"#1f2937",padding:"12px 24px",borderRadius:"8px",border:"none",cursor:"pointer"},onMouseOver:r=>r.currentTarget.style.backgroundColor="#d1d5db",onMouseOut:r=>r.currentTarget.style.backgroundColor="#e5e7eb",children:n("founding.goToDashboard")||"Go to Dashboard"})]})]})})})})]})};export{G as default};
