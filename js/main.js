function initializeJS() {
  fijarElementos();
  aparicionElementos();
  animacionTrabajo();
}
window.onload = () => {
  initializeVariables();
  initializeJS();
  navegacion();
};

window.onresize = () => {
  if (windowWidth && window.innerWidth != windowWidth) {
    windowWidth = window.innerWidth;
    initializeJS();
  }
};

function initializeVariables() {
  cronograma_trabajo = document.querySelectorAll(".trabajo>div");
  cronograma_estudio = document.querySelector(".estudios>div");
  cronograma_estudio_height = cronograma_estudio.offsetHeight;
  elementos_trabajo = document.querySelectorAll(
    ".trabajo .cronograma-elemento"
  );
  cancel_button = document.querySelectorAll(".cancel")[0];
  elementos_estudios = document.querySelectorAll(
    ".estudios .cronograma-seccion"
  );
  cronograma_secciones = document.querySelectorAll(".cronograma-seccion");
  cronograma = document.querySelectorAll(".cronograma");
  secciones = document.querySelectorAll(".seccion");
  windowWidth = window.innerWidth;
  scrollAnterior = window.scrollY;

  cronograma_seccion_trabajo = document.querySelector(".seccion-trabajo");
  cronograma_seccion_trabajo_element = document.querySelector(".trabajo");
  seccion_trabajo_abierta = 0;

  window.onscroll = () => {
    window.requestAnimationFrame(animationFrame);
  };
}

function animacionTrabajo() {
  Array.from(elementos_trabajo).forEach(elemento => {
    let cronograma_fecha = elemento.querySelector(".cronograma-fecha");
    let cronograma_title = elemento.querySelector(".title");
    let cronograma_vermas = elemento.querySelector(".vermas");
    let cronograma_contenido = elemento.querySelector(".cronograma-contenido");
    let cronograma_contenido_background = elemento.querySelector(
      ".cronograma-contenido-background"
    );
    let cronograma_fecha_div = elemento.querySelector(".cronograma-fecha div");
    let margin_fecha_open = "10vh";
    let width_titulo_seccion_trabajo_abierta = "30%";

    if (window.innerWidth > 1024) {
      elemento.onclick = () => {};
      elemento.onclick = function() {
        if (cronograma_fecha.style.marginTop != margin_fecha_open) {
          document.body.style.overflow = "hidden";

          let top = elemento.getBoundingClientRect().top + window.scrollY;

          cancel_button.classList.add("show");
          window.scroll({ top: top, left: 0, behavior: "smooth" });

          cancel_button.onclick = () => {
            document.body.style.overflow = "hidden";
            let top = elemento.getBoundingClientRect().top + window.scrollY;
            window.scroll({ top: top, left: 0, behavior: "smooth" });

            cronograma_seccion_trabajo.style.width = "";
            cronograma_fecha.style.marginTop = "";
            cronograma_title.style.marginTop = "";
            cronograma_seccion_trabajo_element.style.width = "";
            cronograma_seccion_trabajo_element.style.left = "";
            cronograma_contenido_background.classList.remove("open");
            cronograma_vermas.classList.remove("close");
            cancel_button.classList.remove("show");
          };

          cronograma_seccion_trabajo.style.width = width_titulo_seccion_trabajo_abierta;
          cronograma_fecha.style.marginTop = margin_fecha_open;
          cronograma_title.style.marginTop = margin_fecha_open;
          cronograma_fecha_div.style.width = "120px";
          cronograma_seccion_trabajo_element.style.width = "70%";
          cronograma_seccion_trabajo_element.style.left = width_titulo_seccion_trabajo_abierta;
          cronograma_vermas.classList.add("close");

          cronograma_title.addEventListener(
            "transitionend",
            function transition(event) {
              if (cronograma_title !== event.target) return;
              let top = "";
              if (cronograma_seccion_trabajo.style.width) {
                Array.from(elementos_trabajo).forEach(el => {
                  if (el != elemento) {
                    el.style.display = "none";
                  }
                });
                cronograma_contenido.style.display = "flex";
                cronograma_contenido_background.classList.add("open");

                let time = 0

                cronograma_contenido.querySelectorAll(".texto").forEach(elemento_texto=>{
                  time+=300
                  setTimeout(()=>elemento_texto.classList.add("open"),time)
                  
                })
                cronograma_contenido_background.addEventListener("transitionend",function transitionText(){
                  cronograma_contenido_background.removeEventListener(
                    "transitionend",
                    transitionText,
                    false
                  );
                })
              } else {
                cronograma_title.removeEventListener(
                  "transitionend",
                  transition,
                  false
                );
                
                cronograma_contenido.querySelectorAll(".texto").forEach(elemento_texto=>{
                    elemento_texto.classList.remove("open")
                })

                cronograma_contenido.style.display = "none";
                Array.from(elementos_trabajo).forEach(el => {
                  if (el != elemento) {
                    el.style.display = "";
                  }
                });
                cronograma_fecha_div.style.width = "";
              }
              document.body.style.overflow = "auto";
              top = elemento.getBoundingClientRect().top + window.scrollY;
              window.requestAnimationFrame(animationFrame);

              window.scrollTo({ top: top, left: 0 });
            },
            false
          );
        }
      };
    } else {
      elemento.onclick = () => {};
      elemento.onclick = function() {
        if (!cronograma_title.classList.contains("open")) {
          let top = elemento.getBoundingClientRect().top + window.scrollY;
          window.scroll({ top: top, left: 0, behavior: "smooth" });
          document.body.style.overflow = "hidden";

          cronograma_contenido.style.display = "flex";

          cronograma_contenido_background.classList.add("open");
          cronograma_title.classList.add("open");
          // cronograma_vermas.style.display="none";
          cronograma_vermas.style.width = 0;
          cancel_button.classList.add("show");

          cancel_button.onclick = () => {
            document.body.style.overflow = "hidden";
            let top = elemento.getBoundingClientRect().top + window.scrollY;
            window.scroll({ top: top, left: 0, behavior: "smooth" });
            cronograma_vermas.style.width = "";

            cronograma_title.classList.remove("open");
            cronograma_contenido_background.classList.remove("open");
            cronograma_vermas.classList.remove("close");
            cancel_button.classList.remove("show");
          };

          cronograma_title.addEventListener(
            "transitionend",
            function transition(event) {
              if (cronograma_title !== event.target) return;

              let top = "";

              if (cronograma_title.classList.contains("open")) {
                Array.from(elementos_trabajo).forEach(el => {
                  if (el != elemento) {
                    el.style.display = "none";
                  }
                });
              } else {
                cronograma_title.removeEventListener(
                  "transitionend",
                  transition,
                  false
                );

                Array.from(elementos_trabajo).forEach(el => {
                  if (el != elemento) {
                    el.style.display = "";
                  }
                });
                cronograma_contenido.style.display = "none";
              }
              document.body.style.overflow = "auto";

              top = elemento.getBoundingClientRect().top + window.scrollY;

              window.scroll({ top: top, left: 0 });
            },
            false
          );
        }
      };
    }
    if (cronograma_contenido_background.classList.contains("open"))
      cancel_button.onclick ? cancel_button.onclick() : null;
  });
}

function animationFrame() {
  if (window.scrollY != scrollAnterior) {
    scrollAnterior = window.scrollY;
    if (window.innerWidth > 1024) {
      aparicionElementos();
    } else {
      smartphoneAnimation();
    }
    fijarElementos();
  }
}

function fijarElemento(container, containerCoords) {
  if (
    containerCoords.top <= 0 &&
    containerCoords.bottom >= window.innerHeight
  ) {
    container.classList.add("sticky");
    container.style.top = "";
  } else if (containerCoords.top > 0) {
    container.classList.remove("sticky");
    container.style.top = "";
  } else {
    container.classList.remove("sticky");
    container.style.top = containerCoords.height - window.innerHeight + "px";
  }
}

function fijarElementos() {
  Array.from(secciones).forEach((element, index) => {
    var coords = element.getBoundingClientRect();
    if (index == 0) {
      if (coords.top < 0) {
        if (!videoIntro.paused) videoIntro.pause();
        // videoIntro.style.display = "none";
      } else if (coords.top >= 0) {
        if (videoIntro.paused) videoIntro.play();
        // videoIntro.style.display = "";
      }
    }
    if (window.innerWidth > 1024) {
      fijarElemento(element.children[0], coords);
    } else {
      let container = element.children[0];
      if (container.classList.contains("sticky"))
        container.classList.remove("sticky");
      container.style.top = "unset";
    }
  });
  fijarElemento(
    cancel_button,
    cronograma_seccion_trabajo_element.getBoundingClientRect()
  );
}

function aparicionElementos() {
  if (window.innerWidth > 1024) {
    if (
      cronograma[0].getBoundingClientRect().top + window.outerHeight / 3 <
      window.innerHeight
    ) {
      cronograma_estudio.style.top = "";
    } else {
      cronograma_estudio.style.top = cronograma_estudio_height + "px";
    }
  } else {
    cronograma_estudio.style.top = "";
  }
}

function navegacion() {
  const elementosNavegacion = [
    { nombre: "Sobre mi", clase: ".info" },
    { nombre: "Estudios", clase: ".seccion-estudios" },
    { nombre: "Trabajo", clase: ".seccion-trabajo" },
    { nombre: "Habilidades", clase: ".habilidades" },
    { nombre: "Contacto", clase: ".contacto" }
  ];
  document.querySelectorAll(".secciones-navegacion").forEach(navegacion => {
    let ul = document.createElement("ul");
    elementosNavegacion.forEach(elemento => {
      let li = document.createElement("li");
      let span = document.createElement("span");
      let text = document.createTextNode(elemento.nombre);
      span.appendChild(text);
      li.appendChild(span);
      li.onclick = () => {
        navegarA(elemento.clase);
      };
      ul.appendChild(li);
    });
    navegacion.appendChild(ul);
  });
}

function navegarA(elemento) {

  window.scrollTo({ top: document.querySelector(elemento).getBoundingClientRect().top+ window.scrollY, behavior: 'smooth' });
}

function smartphoneAnimation() {
  var elements = document.querySelectorAll(".trabajo .cronograma-elemento");
  Array.from(elements).forEach(element => {
    let top = element.getBoundingClientRect().top;
    let vermas = element.querySelector(".vermas");
    let background = element.querySelector(".cronograma-contenido-background");
    if (
      element.getBoundingClientRect().top <= window.innerHeight / 2 &&
      top >= -(window.innerHeight / 2 + 100)
    ) {
      vermas.classList.add("hover");
      background.classList.add("hover");
    } else {
      vermas.classList.remove("hover");
      background.classList.remove("hover");
    }
  });
}
