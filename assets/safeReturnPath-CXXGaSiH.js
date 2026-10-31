const o=/[\u0000-\u001f\u007f\\]/,f=(t,s="/dashboard")=>typeof t=="string"&&/^\/(?!\/)/.test(t)&&!o.test(t)?t:s;export{f as s};
