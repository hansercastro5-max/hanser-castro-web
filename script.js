import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.164.1/build/three.module.js";

const config = window.SITE_CONFIG || {};
const $ = (s, p=document) => p.querySelector(s);
const $$ = (s, p=document) => [...p.querySelectorAll(s)];

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

const projects = [
  ["Restaurante","Experiencia gastronómica","Restaurant"],
  ["Barbería","Marca & reservas","Barber Studio"],
  ["Gimnasio","Fitness & membresías","Performance"],
  ["Tienda de ropa","E-commerce","Fashion Store"],
  ["Inmobiliaria","Propiedades premium","Real Estate"],
  ["Marca personal","Portfolio & servicios","Personal Brand"]
];
const accents = ["#8a5cff","#37d6ff","#65e69c","#ff7bb8","#f6c85f","#8a5cff"];
$("#projectGrid").innerHTML = projects.map(([name,desc,label],i) => `
  <article class="project-card reveal">
    <div class="project-bg" style="--c:${accents[i]}"></div>
    <div class="project-mock"><div class="mock-bar"><i class="mock-dot"></i><i class="mock-dot"></i><i class="mock-dot"></i></div><div class="mock-lines"><i></i><i></i><i></i></div></div>
    <div class="project-info"><span>${label}</span><h3>${name}</h3></div>
  </article>`).join("");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add("visible"); observer.unobserve(entry.target); }});
},{threshold:.12});
$$(".reveal").forEach(el => observer.observe(el));

const navbar = $("#navbar");
addEventListener("scroll",()=>navbar.classList.toggle("scrolled",scrollY>25),{passive:true});

const menuToggle = $("#menuToggle"), mobileMenu = $("#mobileMenu");
menuToggle.addEventListener("click",()=>{
  const open = mobileMenu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
$$(".mobile-menu a").forEach(a=>a.addEventListener("click",()=>mobileMenu.classList.remove("open")));

const glow = $(".cursor-glow");
addEventListener("pointermove",e=>{ if(glow){glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px";} },{passive:true});

$$(".magnetic").forEach(el=>{
  el.addEventListener("pointermove",e=>{
    const r=el.getBoundingClientRect(), x=e.clientX-r.left-r.width/2, y=e.clientY-r.top-r.height/2;
    el.style.transform=`translate(${x*.12}px,${y*.12}px)`;
  });
  el.addEventListener("pointerleave",()=>el.style.transform="");
});

function setupWhatsApp(){
  const link=$("#whatsappLink");
  if(!link) return;
  if(config.whatsappNumber){
    const msg=encodeURIComponent(config.whatsappMessage || "Hola Hanser, quiero información sobre tus servicios.");
    link.href=`https://wa.me/${config.whatsappNumber}?text=${msg}`;
    link.style.display="flex";
  }else{
    link.href="#contacto";
    link.title="Configura tu número en config.js";
    link.addEventListener("click",e=>{
      e.preventDefault();
      $("#formStatus").textContent="Añade tu número de WhatsApp en config.js para activar este botón.";
      $("#formStatus").className="form-status error";
      $("#contacto").scrollIntoView({behavior:"smooth"});
    });
  }
}
setupWhatsApp();

const form=$("#contactForm"), status=$("#formStatus"), submit=form.querySelector(".submit-btn");
form.addEventListener("submit",async e=>{
  e.preventDefault();
  status.textContent=""; status.className="form-status";
  const data=new FormData(form);
  const name=String(data.get("name")||"").trim();
  const email=String(data.get("email")||"").trim();
  const project=String(data.get("project")||"").trim();
  const message=String(data.get("message")||"").trim();
  if(name.length<2){return showError("Escribe tu nombre.");}
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){return showError("Introduce un correo electrónico válido.");}
  if(!project){return showError("Selecciona el tipo de proyecto.");}
  if(message.length<10){return showError("Cuéntame un poco más sobre tu proyecto.");}

  submit.disabled=true; submit.querySelector("span").textContent="Preparando...";
  // Este formulario funciona sin backend: abre el cliente de correo con los datos.
  // Para recepción automática, conecta Formspree/Resend/Supabase en esta función.
  const subject=encodeURIComponent(`Nuevo proyecto web — ${name}`);
  const body=encodeURIComponent(
`Hola Hanser,

Quiero información sobre un proyecto.

Nombre: ${name}
Correo: ${email}
Teléfono/WhatsApp: ${data.get("phone")||"No indicado"}
Proyecto: ${project}
Presupuesto: ${data.get("budget")||"No indicado"}

Mensaje:
${message}`
  );
  await new Promise(r=>setTimeout(r,500));
  window.location.href=`mailto:${config.email||"hansercastro5@gmail.com"}?subject=${subject}&body=${body}`;
  status.textContent="Se abrió tu correo con la solicitud preparada. Solo falta enviarla.";
  status.className="form-status success";
  submit.disabled=false; submit.querySelector("span").textContent="Enviar proyecto";
});
function showError(msg){status.textContent=msg;status.className="form-status error";}

function init3D(){
  const container=$("#hero3d");
  if(!container || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  try{
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(45,container.clientWidth/container.clientHeight,.1,100);
    camera.position.set(0,0,5.2);
    const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:"high-performance"});
    renderer.setPixelRatio(Math.min(devicePixelRatio,1.7));
    renderer.setSize(container.clientWidth,container.clientHeight);
    renderer.outputColorSpace=THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const group=new THREE.Group(); scene.add(group);
    const geo=new THREE.IcosahedronGeometry(1.35,5);
    const mat=new THREE.MeshPhysicalMaterial({color:0x8a5cff,metalness:.7,roughness:.18,transmission:.08,clearcoat:.8,clearcoatRoughness:.15,wireframe:false});
    const mesh=new THREE.Mesh(geo,mat); group.add(mesh);
    const wire=new THREE.Mesh(new THREE.IcosahedronGeometry(1.42,2),new THREE.MeshBasicMaterial({color:0x62dcff,wireframe:true,transparent:true,opacity:.11}));
    group.add(wire);
    const ring1=new THREE.Mesh(new THREE.TorusGeometry(1.85,.008,8,160),new THREE.MeshBasicMaterial({color:0x8a5cff,transparent:true,opacity:.55}));
    ring1.rotation.x=Math.PI/2.5; group.add(ring1);
    const ring2=new THREE.Mesh(new THREE.TorusGeometry(2.15,.006,8,160),new THREE.MeshBasicMaterial({color:0x37d6ff,transparent:true,opacity:.35}));
    ring2.rotation.y=Math.PI/3; ring2.rotation.x=.4; group.add(ring2);

    const starsGeo=new THREE.BufferGeometry(), count=450, pos=new Float32Array(count*3);
    for(let i=0;i<count*3;i++) pos[i]=(Math.random()-.5)*9;
    starsGeo.setAttribute("position",new THREE.BufferAttribute(pos,3));
    const stars=new THREE.Points(starsGeo,new THREE.PointsMaterial({color:0xffffff,size:.012,transparent:true,opacity:.6}));
    scene.add(stars);

    scene.add(new THREE.AmbientLight(0x8a5cff,.8));
    const key=new THREE.PointLight(0x8a5cff,10,10); key.position.set(3,2,4); scene.add(key);
    const fill=new THREE.PointLight(0x37d6ff,7,10); fill.position.set(-3,-2,2); scene.add(fill);

    let mx=0,my=0;
    addEventListener("pointermove",e=>{mx=(e.clientX/innerWidth-.5)*.45;my=(e.clientY/innerHeight-.5)*.35},{passive:true});
    const clock=new THREE.Clock();
    function animate(){
      const t=clock.getElapsedTime();
      group.rotation.y += .0028; group.rotation.x=Math.sin(t*.28)*.08;
      ring1.rotation.z=t*.18; ring2.rotation.z=-t*.12;
      stars.rotation.y=t*.008;
      group.position.x+=(mx-group.position.x)*.025;
      group.position.y+=(-my-group.position.y)*.025;
      renderer.render(scene,camera); requestAnimationFrame(animate);
    }
    animate();
    addEventListener("resize",()=>{
      camera.aspect=container.clientWidth/container.clientHeight;camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth,container.clientHeight);
    });
  }catch(err){
    console.warn("3D no disponible:",err);
  }
}
init3D();
