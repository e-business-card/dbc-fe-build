import{e as E,d as L,j as e,H as P,ax as q,z as A,ay as U,az as $}from"./index-CGRrmX6o.js";import{u as B,c as G,b as t}from"./vendor-DFXNMGXD.js";import{c as h}from"./confetti.module-ONDKWxYZ.js";const H=L.create({baseURL:"https://api.digitalqrcard.com"}),Q=()=>{var v,T,N;const{t:n}=E(),d=B(),a=G(),[y,k]=t.useState(!1),[S,R]=t.useState(void 0),s=t.useRef(null),u=t.useRef(!1);t.useEffect(()=>(u.current=!1,()=>{u.current=!0,s.current&&clearTimeout(s.current)}),[]);const C=()=>{u.current||(k(!0),s.current&&clearTimeout(s.current),s.current=setTimeout(()=>k(!1),2e3))},f=new URLSearchParams(d.search),p=f.get("memberNumber"),O=f.get("canceled")==="true",I=f.get("success")==="true",z=p!==null&&Number.isFinite(Number(p))?Number(p):void 0,l=((v=d.state)==null?void 0:v.memberNumber)??z,m=((T=d.state)==null?void 0:T.canceled)||O,o=I||((N=d.state)==null?void 0:N.success)||!1||!m&&!!l;t.useEffect(()=>{o&&l===void 0&&H.get("/stripe/founding-member-count",{timeout:5e3}).then(r=>{var g;!u.current&&typeof((g=r.data)==null?void 0:g.claimed)=="number"&&R(r.data.claimed)}).catch(()=>{})},[o,l===void 0]);const i=l??S,x=`${window.location.origin}/founding-member`,j=t.useCallback(()=>{const g=Date.now()+5e3,w={startVelocity:30,spread:360,ticks:60,zIndex:0},M=(c,b)=>Math.random()*(b-c)+c,F=setInterval(function(){const c=g-Date.now();if(c<=0)return clearInterval(F);const b=50*(c/5e3);h({...w,particleCount:b,origin:{x:M(.1,.3),y:Math.random()-.2}}),h({...w,particleCount:b,origin:{x:M(.7,.9),y:Math.random()-.2}})},250);return()=>{clearInterval(F),h.reset()}},[]);if(t.useEffect(()=>{if(!o&&!m)a("/founding-member",{replace:!0});else if(o)return j()},[m,a,o,j]),!o&&!m)return null;const Y=async()=>{try{await navigator.clipboard.writeText(x),C()}catch{}},D=async()=>{const r=i!==void 0?`I joined as Founding Member #${i}`:"I joined as a Founding Member";try{navigator.share?await navigator.share({title:r,text:r,url:x}):await navigator.clipboard.writeText(x),C()}catch{}};return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
      `}),e.jsx(P,{children:e.jsx("title",{children:o?n("founding.successPageTitle")||"Success — Founding Member":n("founding.canceledPageTitle")||"Canceled — Founding Member"})}),e.jsx("section",{className:"about",children:e.jsx("div",{className:"container","data-aos":"fade-up",children:e.jsx("div",{className:"text-center py-16",children:o?e.jsxs(e.Fragment,{children:[e.jsx("img",{src:"/images/Founding.png",alt:"Success",className:"mx-auto mb-10 w-24 h-24"}),e.jsx("h1",{className:"text-3xl font-bold mt-4 mb-4",children:i!==void 0?n("founding.successTitle",{newMemberNumber:i})||`You're Founding Member #${i}`:n("founding.successTitleNoNumber")||"Welcome aboard, Founding Member"}),e.jsx("p",{className:"text-lg text-gray-600 mb-8",children:n("founding.successBody")||"Lifetime Pro unlocked — check your profile."}),e.jsxs("div",{className:"flex gap-4 justify-center mb-8",children:[e.jsxs("button",{onClick:D,style:{backgroundColor:"#2563eb",color:"white",padding:"12px 24px",borderRadius:"8px",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:"0.5rem"},onMouseOver:r=>r.currentTarget.style.backgroundColor="#1d4ed8",onMouseOut:r=>r.currentTarget.style.backgroundColor="#2563eb",children:[e.jsx(q,{}),n("founding.share")||"Share"]}),e.jsxs("button",{onClick:Y,style:{backgroundColor:"#e5e7eb",color:"#1f2937",padding:"12px 24px",borderRadius:"8px",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:"0.5rem"},onMouseOver:r=>r.currentTarget.style.backgroundColor="#d1d5db",onMouseOut:r=>r.currentTarget.style.backgroundColor="#e5e7eb",children:[y?e.jsx(A,{}):e.jsx(U,{}),y?n("founding.copied")||"Copied":n("founding.copyLink")||"Copy link"]})]}),e.jsx("div",{className:"flex gap-4 justify-center mb-8 mt-2",children:e.jsx("button",{onClick:()=>a("/profile"),style:{backgroundColor:"#059669",color:"white",padding:"16px 32px",borderRadius:"8px",border:"none",cursor:"pointer",fontSize:"18px"},onMouseOver:r=>r.currentTarget.style.backgroundColor="#047857",onMouseOut:r=>r.currentTarget.style.backgroundColor="#059669",children:n("founding.goToDashboard")||"Go to Dashboard"})})]}):e.jsxs(e.Fragment,{children:[e.jsx($,{style:{color:"#dc2626",fontSize:"3rem",display:"block",margin:"0 auto 1.5rem"}}),e.jsx("h1",{className:"text-3xl font-bold mb-4",children:n("founding.canceledTitle")||"Purchase Canceled"}),e.jsx("p",{className:"text-lg text-gray-600 mb-8",children:n("founding.canceledBody")||"Your purchase was canceled. You can try again anytime."}),e.jsxs("div",{className:"flex gap-4 justify-center mb-8",children:[e.jsx("button",{onClick:()=>a("/founding-member"),style:{backgroundColor:"#2563eb",color:"white",padding:"12px 24px",borderRadius:"8px",border:"none",cursor:"pointer"},onMouseOver:r=>r.currentTarget.style.backgroundColor="#1d4ed8",onMouseOut:r=>r.currentTarget.style.backgroundColor="#2563eb",children:n("founding.tryAgain")||"Try Again"}),e.jsx("button",{onClick:()=>a("/profile"),style:{backgroundColor:"#e5e7eb",color:"#1f2937",padding:"12px 24px",borderRadius:"8px",border:"none",cursor:"pointer"},onMouseOver:r=>r.currentTarget.style.backgroundColor="#d1d5db",onMouseOut:r=>r.currentTarget.style.backgroundColor="#e5e7eb",children:n("founding.goToDashboard")||"Go to Dashboard"})]})]})})})})]})};export{Q as default};
