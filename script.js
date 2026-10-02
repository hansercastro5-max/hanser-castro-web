const config = window.SITE_CONFIG || {};
const $ = (s, p=document) => p.querySelector(s);
const $$ = (s, p=document) => [...p.querySelectorAll(s)];
const canHover = matchMedia("(hover:hover)").matches;

window.addEventListener("load", () => setTimeout(() => $("#preloader")?.classList.add("done"), 650));
$("#year").textContent = new Date().getFullYear();

const services = [
  ["✦","01","Diseño Web","Páginas web modernas, rápidas y adaptadas a cualquier dispositivo."],
  ["◈","02","Landing Pages","Experiencias diseñadas para presentar productos, servicios y captar clientes."],
  ["▣","03","E-Commerce","Tiendas online modernas preparadas para vender productos y servicios."],
  ["⌁","04","Automatizaciones","Automatiza tareas repetitivas y ahorra tiempo en tu negocio."],
  ["◎","05","Redes Sociales","Conecta tus redes sociales con procesos y herramientas digitales."],
  ["◇","06","Experiencias 3D","Agrega interacción, profundidad y movimiento a tu página web."]
];
$("#serviceGrid").innerHTML = services.map(([icon,n,title,desc]) => `
  <article class="service-card reveal">
    <div class="service-icon">${icon}</div><span class="service-number">${n}</span>
    <h3>${title}</h3><p>${desc}</p>
  </article>`).join("");

const src = f => (window.IMG && window.IMG[f]) || `assets/projects/${f}`;
const P = [
 {file:"restaurante.jpg",label:"Restaurante",name:"Restaurante",brand:"Olivo",url:"olivo-restaurante.com",tag:"Cocina de autor en un ambiente cálido",text:"Reserva tu mesa en segundos y descubre el menú de la casa.",cta:"Reservar mesa",accent:"#d9a35b",fg:"#1a1206",nav:["Menú","Nosotros","Reservas"],
  stats:[["12","años de cocina"],["4.8★","en reseñas"],["+300","reservas al mes"]],aboutT:"Una mesa pensada para quedarse",about:"En Olivo cocinamos con productos locales y de temporada. Un lugar para celebrar, conversar y disfrutar sin prisa.",
  itemsT:"Nuestro menú",items:[["Ceviche del chef","Pescado del día, limón, ají y cebolla encurtida","$9.50"],["Lomo fino","Con puré rústico y reducción de vino tinto","$16.00"],["Risotto de hongos","Arroz cremoso, hongos salteados y parmesano","$13.00"],["Tres leches","Con frutos rojos y crema ligera","$5.00"]],
  reviews:[["Ambiente increíble y atención de primera.","Daniela M."],["El mejor ceviche que he probado en años.","Carlos R."],["Reservé desde el celular y todo fue facilísimo.","Andrea V."]],
  hours:["Mar – Dom","12:00 – 23:00"],closing:"Tu próxima mesa te está esperando"},
 {file:"barberia.jpg",label:"Barbería",name:"Barbería",brand:"Barber Studio",url:"barberstudio.com",tag:"Corte clásico, estilo moderno",text:"Elige tu barbero, tu horario y llega sin esperar.",cta:"Agendar cita",accent:"#e23b3b",fg:"#fff",nav:["Servicios","Nosotros","Citas"],
  stats:[["8","años de experiencia"],["+5.000","cortes realizados"],["4.9★","calificación"]],aboutT:"Tradición con estilo propio",about:"Somos un equipo apasionado por el detalle. Cortes precisos, buen trato y un ambiente donde te sientes en casa.",
  itemsT:"Servicios y precios",items:[["Corte clásico","Tijera o máquina, con acabado a navaja","$8.00"],["Corte + barba","El combo más pedido de la casa","$12.00"],["Afeitado con toalla caliente","Ritual tradicional de relajación","$7.00"],["Diseño y cejas","Líneas, degradados y perfilado","$4.00"]],
  reviews:[["Salgo siempre como nuevo. 100% recomendado.","Luis P."],["Puntuales y muy profesionales.","Jorge T."],["Agendar en línea me ahorra mucho tiempo.","Mateo S."]],
  hours:["Lun – Sáb","09:00 – 20:00"],closing:"Tu mejor corte empieza aquí"},
 {file:"gimnasio.jpg",label:"Gimnasio",name:"Gimnasio",brand:"Performance",url:"performancegym.com",tag:"Entrena sin límites",text:"Máquinas de primera, horarios amplios y un ambiente que te motiva.",cta:"Prueba gratis",accent:"#8a5cff",fg:"#fff",nav:["Planes","Nosotros","Horarios"],
  stats:[["+40","máquinas y equipos"],["18","clases semanales"],["+600","socios activos"]],aboutT:"Un espacio hecho para tu progreso",about:"Equipos modernos, entrenadores certificados y un ambiente que te empuja a dar más. Para principiantes y avanzados.",
  itemsT:"Planes y membresías",items:[["Plan mensual","Acceso libre a todas las áreas","$25.00"],["Plan trimestral","Ahorra con tres meses de acceso","$65.00"],["Plan anual","El mejor precio, con evaluación física","$210.00"],["Clase suelta","Funcional, spinning o box","$4.00"]],
  reviews:[["Los entrenadores te guían de verdad.","Camila G."],["Equipos nuevos y siempre limpio.","Esteban L."],["Bajé de peso y gané constancia aquí.","Paola N."]],
  hours:["Lun – Vie","05:30 – 22:00"],closing:"Tu primer día es gratis"},
 {file:"tienda.jpg",label:"Fashion Store",name:"Tienda de ropa",brand:"Infinity",url:"infinitystreetwear.com",tag:"Nueva colección ya disponible",text:"Streetwear con actitud. Mira las novedades y compra desde tu celular.",cta:"Comprar ahora",accent:"#e8e8e8",fg:"#111",nav:["Colección","Nosotros","Envíos"],
  stats:[["+120","diseños únicos"],["48 h","envío a todo el país"],["4.9★","opiniones"]],aboutT:"Ropa con identidad",about:"Diseñamos prendas cómodas y con carácter para quienes quieren destacar. Ediciones limitadas, calidad real.",
  itemsT:"Lo más vendido",items:[["Camiseta oversize","Algodón premium, varios colores","$22.00"],["Hoodie básico","Interior afelpado, corte relajado","$38.00"],["Pantalón cargo","Bolsillos amplios, ajuste cómodo","$35.00"],["Gorra clásica","Bordado frontal, talla única","$15.00"]],
  reviews:[["La calidad de las prendas es excelente.","Sofía A."],["Llegó rapidísimo y quedó perfecto.","Diego F."],["Me encanta el estilo, siempre compro aquí.","Valeria C."]],
  hours:["Lun – Sáb","10:00 – 19:00"],closing:"Estrena tu estilo hoy"},
 {file:"inmobiliaria.jpg",label:"Real Estate",name:"Inmobiliaria",brand:"Prime Real Estate",url:"primerealestate.com",tag:"Departamentos que se sienten hogar",text:"Explora propiedades, compara opciones y agenda tu visita.",cta:"Agendar visita",accent:"#f6c85f",fg:"#1a1206",nav:["Propiedades","Nosotros","Contacto"],
  stats:[["+150","propiedades vendidas"],["10","años en el mercado"],["98%","clientes satisfechos"]],aboutT:"Te acompañamos hasta las llaves",about:"Buscamos la propiedad que encaja con tu vida y tu presupuesto, con asesoría clara en cada paso.",
  itemsT:"Propiedades destacadas",items:[["Departamento 2 habitaciones","85 m², balcón y parqueadero","$78.000"],["Departamento 3 habitaciones","120 m², vista abierta, 2 baños","$105.000"],["Penthouse","200 m², terraza privada","$160.000"],["Local comercial","Planta baja, excelente ubicación","$120.000"]],
  reviews:[["Nos asesoraron con total transparencia.","Familia Mora"],["Encontramos justo lo que buscábamos.","Ricardo y Ana"],["Proceso rápido y sin complicaciones.","Pablo D."]],
  hours:["Lun – Sáb","09:00 – 18:00"],closing:"Encuentra el lugar que buscabas"},
 {file:"marca.jpg",label:"Marca personal",name:"Marca personal",brand:"King of Talk",url:"kingoftalk.com",tag:"Voz, ideas y conversación",text:"Tu marca, tu contenido y tus colaboraciones en un solo lugar.",cta:"Escuchar episodios",accent:"#d01a1a",fg:"#fff",nav:["Episodios","Sobre mí","Contacto"],
  stats:[["+80","episodios"],["25K","oyentes al mes"],["12","marcas aliadas"]],aboutT:"Conversaciones que valen la pena",about:"Un espacio para hablar de ideas, negocios y personas reales. Aquí cuentas tu historia con tu propia voz.",
  itemsT:"Últimos episodios",items:[["Ep. 01 · Empezar de cero","Cómo arrancar un proyecto sin recursos","42 min"],["Ep. 02 · Marca personal","Construir una imagen que genere confianza","38 min"],["Ep. 03 · Vender sin presionar","Estrategias honestas para tus clientes","51 min"],["Ep. 04 · Constancia","Hábitos para crear contenido cada semana","35 min"]],
  reviews:[["Mi podcast favorito para inspirarme.","Julián B."],["Cada episodio me deja una idea nueva.","Marcela O."],["Colaborar con ellos fue una gran experiencia.","Marca aliada"]],
  hours:["Nuevo episodio","Todos los jueves"],closing:"Hablemos de tu próxima idea"}
];
$("#projectGrid").innerHTML = P.map((t,i) => `
  <article class="project-card reveal" role="button" tabindex="0" data-i="${i}" aria-label="Ver plantilla de ${t.name}">
    <img class="project-photo" src="${src(t.file)}" alt="Ejemplo de ${t.name}" loading="lazy">
    <div class="project-info"><span>${t.label}</span><h3>${t.name}</h3><span class="project-open">Ver plantilla ↗</span></div>
  </article>`).join("");

// Visor de plantillas: cada una es una mini página web completa
const modal = document.createElement("div");
modal.className = "tpl"; modal.hidden = true;
modal.setAttribute("role","dialog"); modal.setAttribute("aria-modal","true"); modal.setAttribute("aria-label","Vista previa de plantilla");
document.body.appendChild(modal);
let lastCard = null;
const crops = [["20% 30%",1.6],["80% 55%",1.8],["50% 90%",1.5]];
function openTpl(i, card){
  const t = P[i]; lastCard = card; const img = src(t.file);
  modal.style.setProperty("--a", t.accent); modal.style.setProperty("--fg", t.fg);
  modal.innerHTML = `
    <div class="tpl-bar"><button class="tpl-close" type="button">← Volver</button><span class="tpl-url">🔒 ${t.url}</span><a class="tpl-get" href="#contacto">Quiero una así ↗</a></div>
    <div class="tpl-page">
      <div class="tpl-nav"><b>${t.brand}</b><span>${t.nav.map((n,k)=>`<em data-go="${["t-items","t-about","t-info"][k]}">${n}</em>`).join("")}</span><i class="tpl-btn" data-go="t-info">${t.cta}</i></div>
      <header class="tpl-hero"><img src="${img}" alt=""><div><small>${t.label}</small><h2>${t.tag}</h2><p>${t.text}</p><i class="tpl-btn" data-go="t-info">${t.cta}</i></div></header>
      <section class="tpl-stats">${t.stats.map(([n,l])=>`<div><b>${n}</b><span>${l}</span></div>`).join("")}</section>
      <section class="tpl-about tpl-sec" id="t-about"><div class="tpl-crop"><img src="${img}" alt="" style="object-position:70% 40%;transform:scale(1.35)"></div><div><small>${t.nav[1]}</small><h3>${t.aboutT}</h3><p>${t.about}</p><i class="tpl-btn" data-go="t-info">${t.cta}</i></div></section>
      <section class="tpl-items tpl-sec" id="t-items"><h3>${t.itemsT}</h3>${t.items.map(([a,b,c])=>`<div class="tpl-row"><div><strong>${a}</strong><p>${b}</p></div><b>${c}</b></div>`).join("")}</section>
      <section class="tpl-gallery"><h3>Galería</h3><div>${crops.map(([p,z])=>`<figure><img src="${img}" alt="" style="object-position:${p};transform:scale(${z})"></figure>`).join("")}</div></section>
      <section class="tpl-reviews"><h3>Lo que dicen nuestros clientes</h3><div>${t.reviews.map(([q,n])=>`<article><span class="tpl-stars">★★★★★</span><p>“${q}”</p><small>${n}</small></article>`).join("")}</div></section>
      <section class="tpl-info tpl-sec" id="t-info"><div><h3>${t.nav[2]}</h3><p><b>${t.hours[0]}</b><br>${t.hours[1]}</p><p>📍 Av. Principal 123, Ecuador<br>📞 +593 99 000 0000<br>✉ hola@${t.url}</p></div><div class="tpl-fakeform"><span>Nombre</span><span>Teléfono</span><span>Mensaje</span><i class="tpl-btn">${t.cta}</i></div></section>
      <section class="tpl-cta"><h3>${t.closing}</h3><i class="tpl-btn" data-go="t-info">${t.cta}</i></section>
      <footer><b>${t.brand}</b><span>© ${t.brand} · Plantilla de ejemplo: tu negocio llevará tu propia marca, fotos y textos</span></footer>
    </div>`;
  animateTpl();
  modal.hidden = false; modal.scrollTop = 0; document.body.classList.add("tpl-open");
  $(".tpl-close", modal).focus();
  $$("[data-go]", modal).forEach(el => el.addEventListener("click", () => document.getElementById(el.dataset.go)?.scrollIntoView({behavior:"smooth"})));
  $(".tpl-get", modal).addEventListener("click", () => {
    closeTpl();
    const msg = $('#contactForm textarea[name="message"]');
    if(msg && !msg.value) msg.value = `Me interesa una página como la plantilla de ${t.name}.`;
  });
  $(".tpl-close", modal).addEventListener("click", closeTpl);
}

let tplObs = null;
function countUp(el){
  const txt = el.textContent, m = txt.match(/^([^\d]*)([\d.,]+)(.*)$/); if(!m) return;
  const raw = m[2], thousands = /^\d{1,3}(\.\d{3})+$/.test(raw);
  const val = thousands ? +raw.replace(/\./g,"") : +raw.replace(",","."), dec = thousands ? 0 : (raw.split(".")[1]||"").length;
  if(matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const t0 = performance.now();
  (function step(now){
    const p = Math.min((now-t0)/1200,1), v = val*(1-Math.pow(1-p,3));
    el.textContent = m[1] + (thousands ? Math.round(v).toLocaleString("de-DE") : v.toFixed(dec)) + m[3];
    if(p<1) requestAnimationFrame(step);
  })(t0);
}
function animateTpl(){
  tplObs?.disconnect();
  tplObs = new IntersectionObserver(es => es.forEach(e => {
    if(!e.isIntersecting) return;
    e.target.classList.add("tpl-in"); tplObs.unobserve(e.target);
    if(e.target.matches(".tpl-stats>div")) countUp($("b", e.target));
  }), {root: modal, threshold: .15});
  const groups = [".tpl-stats>div",".tpl-about>*",".tpl-items>*",".tpl-row",".tpl-gallery h3",".tpl-gallery figure",".tpl-reviews h3",".tpl-reviews article",".tpl-info>*",".tpl-cta>*"];
  groups.forEach(sel => $$(sel, modal).forEach((el,i) => { el.classList.add("tpl-rv"); el.style.setProperty("--d", i % 4); tplObs.observe(el); }));
}
// Inclinación 3D suave en las tarjetas de plantillas (solo con mouse)
if(canHover) $("#projectGrid").addEventListener("pointermove", e => {
  const c = e.target.closest(".project-card"); if(!c) return;
  const r = c.getBoundingClientRect();
  c.style.setProperty("--ry", ((e.clientX-r.left)/r.width-.5)*10 + "deg");
  c.style.setProperty("--rx", (.5-(e.clientY-r.top)/r.height)*10 + "deg");
});
$("#projectGrid").addEventListener("pointerout", e => { const c = e.target.closest(".project-card"); if(c){ c.style.removeProperty("--rx"); c.style.removeProperty("--ry"); } });
function closeTpl(){ modal.hidden = true; document.body.classList.remove("tpl-open"); lastCard?.focus(); }
addEventListener("keydown", e => { if(e.key === "Escape" && !modal.hidden) closeTpl(); });
$("#projectGrid").addEventListener("click", e => { const c = e.target.closest(".project-card"); if(c) openTpl(+c.dataset.i, c); });
$("#projectGrid").addEventListener("keydown", e => {
  const c = e.target.closest(".project-card");
  if(c && (e.key === "Enter" || e.key === " ")){ e.preventDefault(); openTpl(+c.dataset.i, c); }
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add("visible"); observer.unobserve(e.target); }});
},{threshold:.12});
$$(".reveal").forEach(el => observer.observe(el));

// Navbar + enlace activo según la sección visible
const navbar = $("#navbar");
addEventListener("scroll",()=>navbar.classList.toggle("scrolled",scrollY>25),{passive:true});
const navLinks = $$(".desktop-nav a");
const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting){
    navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#"+e.target.id));
  }});
},{rootMargin:"-45% 0px -50% 0px"});
$$("main section[id]").forEach(s => sectionObs.observe(s));

// Menú móvil
const menuToggle = $("#menuToggle"), mobileMenu = $("#mobileMenu");
function setMenu(open){
  mobileMenu.classList.toggle("open", open);
  document.body.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
}
menuToggle.addEventListener("click",()=>setMenu(!mobileMenu.classList.contains("open")));
$$(".mobile-menu a").forEach(a=>a.addEventListener("click",()=>setMenu(false)));
addEventListener("keydown",e=>{ if(e.key==="Escape") setMenu(false); });
addEventListener("resize",()=>{ if(innerWidth>900) setMenu(false); });

// Efectos de puntero solo en dispositivos con mouse
if(canHover){
  const glow = $(".cursor-glow");
  addEventListener("pointermove",e=>{ if(glow){glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px";} },{passive:true});
  $$(".magnetic").forEach(el=>{
    el.addEventListener("pointermove",e=>{
      const r=el.getBoundingClientRect(), x=e.clientX-r.left-r.width/2, y=e.clientY-r.top-r.height/2;
      el.style.transform=`translate(${x*.12}px,${y*.12}px)`;
    });
    el.addEventListener("pointerleave",()=>el.style.transform="");
  });
}

// Formulario
const form=$("#contactForm"), status=$("#formStatus"), submit=form.querySelector(".submit-btn");
const label=submit.querySelector("span");
const setStatus=(msg,type)=>{ status.textContent=msg; status.className="form-status "+(type||""); };
form.addEventListener("submit",async e=>{
  e.preventDefault(); setStatus("");
  const data=new FormData(form);
  if(data.get("website")) return; // honeypot anti-spam
  const name=String(data.get("name")||"").trim();
  const email=String(data.get("email")||"").trim();
  const project=String(data.get("project")||"").trim();
  const message=String(data.get("message")||"").trim();
  if(name.length<2) return setStatus("Escribe tu nombre.","error");
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setStatus("Introduce un correo electrónico válido.","error");
  if(!project) return setStatus("Selecciona el tipo de proyecto.","error");
  if(message.length<10) return setStatus("Cuéntame un poco más sobre tu proyecto.","error");

  submit.disabled=true; label.textContent="Enviando...";
  try{
    if(config.formEndpoint){
      const res=await fetch(config.formEndpoint,{method:"POST",headers:{Accept:"application/json"},body:data});
      if(!res.ok) throw new Error("HTTP "+res.status);
      form.reset();
      setStatus("¡Mensaje enviado! Te responderé pronto.","success");
    }else{
      const subject=encodeURIComponent(`Nuevo proyecto web — ${name}`);
      const body=encodeURIComponent(`Hola Hanser,\n\nQuiero información sobre un proyecto.\n\nNombre: ${name}\nCorreo: ${email}\nTeléfono/WhatsApp: ${data.get("phone")||"No indicado"}\nProyecto: ${project}\nPresupuesto: ${data.get("budget")||"No indicado"}\n\nMensaje:\n${message}`);
      location.href=`mailto:${config.email||"hansercastro5@gmail.com"}?subject=${subject}&body=${body}`;
      setStatus("Se abrió tu correo con la solicitud lista. Solo falta enviarla.","success");
    }
  }catch(err){
    setStatus("No se pudo enviar. Escríbeme directo a "+(config.email||"hansercastro5@gmail.com"),"error");
  }finally{
    submit.disabled=false; label.textContent="Enviar proyecto";
  }
});

// Escena 3D: carga diferida, se pausa fuera de pantalla o con la pestaña oculta
async function init3D(){
  const container=$("#hero3d");
  if(!container || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  try{
    const THREE = await import("https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js");
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(45,container.clientWidth/container.clientHeight,.1,100);
    camera.position.set(0,0,5.2);
    const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:"high-performance"});
    renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));
    renderer.setSize(container.clientWidth,container.clientHeight);
    renderer.outputColorSpace=THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const group=new THREE.Group(); scene.add(group);
    const mesh=new THREE.Mesh(new THREE.IcosahedronGeometry(1.35,5),new THREE.MeshPhysicalMaterial({color:0x8a5cff,metalness:.7,roughness:.18,transmission:.08,clearcoat:.8,clearcoatRoughness:.15}));
    group.add(mesh);
    group.add(new THREE.Mesh(new THREE.IcosahedronGeometry(1.42,2),new THREE.MeshBasicMaterial({color:0x62dcff,wireframe:true,transparent:true,opacity:.11})));
    const ring1=new THREE.Mesh(new THREE.TorusGeometry(1.85,.008,8,160),new THREE.MeshBasicMaterial({color:0x8a5cff,transparent:true,opacity:.55}));
    ring1.rotation.x=Math.PI/2.5; group.add(ring1);
    const ring2=new THREE.Mesh(new THREE.TorusGeometry(2.15,.006,8,160),new THREE.MeshBasicMaterial({color:0x37d6ff,transparent:true,opacity:.35}));
    ring2.rotation.y=Math.PI/3; ring2.rotation.x=.4; group.add(ring2);

    const count=innerWidth<700?220:450, pos=new Float32Array(count*3);
    for(let i=0;i<count*3;i++) pos[i]=(Math.random()-.5)*9;
    const starsGeo=new THREE.BufferGeometry(); starsGeo.setAttribute("position",new THREE.BufferAttribute(pos,3));
    const stars=new THREE.Points(starsGeo,new THREE.PointsMaterial({color:0xffffff,size:.012,transparent:true,opacity:.6}));
    scene.add(stars);
    scene.add(new THREE.AmbientLight(0x8a5cff,.8));
    const key=new THREE.PointLight(0x8a5cff,10,10); key.position.set(3,2,4); scene.add(key);
    const fill=new THREE.PointLight(0x37d6ff,7,10); fill.position.set(-3,-2,2); scene.add(fill);

    let mx=0,my=0,visible=true,raf=0;
    addEventListener("pointermove",e=>{mx=(e.clientX/innerWidth-.5)*.45;my=(e.clientY/innerHeight-.5)*.35},{passive:true});
    const clock=new THREE.Clock();
    function animate(){
      raf=0; if(!visible||document.hidden) return;
      const t=clock.getElapsedTime();
      group.rotation.y+=.0028; group.rotation.x=Math.sin(t*.28)*.08;
      ring1.rotation.z=t*.18; ring2.rotation.z=-t*.12; stars.rotation.y=t*.008;
      group.position.x+=(mx-group.position.x)*.025;
      group.position.y+=(-my-group.position.y)*.025;
      renderer.render(scene,camera); raf=requestAnimationFrame(animate);
    }
    const resume=()=>{ if(!raf) raf=requestAnimationFrame(animate); };
    new IntersectionObserver(([en])=>{ visible=en.isIntersecting; resume(); }).observe(container);
    document.addEventListener("visibilitychange",resume);
    let rt; addEventListener("resize",()=>{ clearTimeout(rt); rt=setTimeout(()=>{
      camera.aspect=container.clientWidth/container.clientHeight; camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth,container.clientHeight);
    },120); });
    resume();
  }catch(err){ console.warn("3D no disponible:",err); }
}
init3D();
