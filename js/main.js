function initializeJS() {
  chequearNavegador();
  fijarElementos();
  aparicionElementos();
  animacionTrabajo();
  aparicionTitulos();
}
window.onload = function() {
  navegacion();
  initializeVariables();
  initializeJS();
};

window.onresize = () => {
  if (windowWidth && window.innerWidth != windowWidth) {
    windowWidth = window.innerWidth;
    initializeJS();
  }
};

function initializeTitles(){
  Array.from(document.querySelectorAll(".seccion-izquierda h3")).map(el=>{
    el.textContent="";
  })
}

function chequearNavegador() {
  if (window.innerWidth <= 1024 && navigator.userAgent.indexOf("Firefox") > 0) {
    document.querySelector(".wrapper").style.gridTemplateRows =
      "100vh auto 100vh";
  }
}

function translateObject(x, y, element) {
  element.style.transform = "translate3d(" + x + ", " + y + ", 0)";
}

function getObjectTranslation(el) {
  var values = el.style.transform.split(/\w+\(|\);?/);
  if (!values[1] || !values[1].length) {
    return [];
  }
  return values[1].split(/,\s?/g);
}

function initializeVariables() {
  cronograma_trabajo = document.querySelectorAll(".trabajo>div");
  cronograma_estudio = document.querySelector(".estudios>div");
  cronograma_estudio_height = cronograma_estudio.offsetHeight;
  elementos_trabajo = document.querySelectorAll(
    ".trabajo .cronograma-elemento"
  );
  cancel_buttons = [];
  elementos_estudios = document.querySelectorAll(
    ".estudios .cronograma-seccion"
  );
  cronograma_elementos_trabajo = document.querySelectorAll(
    ".trabajo .cronograma-elemento"
  );

  cronograma_secciones = document.querySelectorAll(".trabajo .cronograma-seccion");
  cronograma = document.querySelectorAll(".cronograma");
  secciones = document.querySelectorAll(".seccion");
  windowWidth = window.innerWidth;
  scrollAnterior = window.scrollY;

  cronograma_seccion_trabajo = document.querySelector(".seccion-trabajo");
  cronograma_seccion_trabajo_element = document.querySelector(".trabajo");

  seccion_titulos = document.querySelectorAll(".seccion-izquierda h3");
  creador_titulo = document.querySelector(".creador");
  creador = document.querySelector(".creador");
  arriba = document.querySelector(".arriba>img");
  arriba.addEventListener("click", goTop);
  seccion_trabajo_abierta = 0;

  window.onscroll = () => {
    window.requestAnimationFrame(animationFrame);
  };
}

function goTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function animacionAparicionTextosTrabajo(cronograma_contenido) {
  let time = 0;
  let height = 0;
  cronograma_contenido
    .querySelectorAll(".texto")
    .forEach(function(elemento_texto) {
      time += 300;
      height += elemento_texto.offsetHeight;
      setTimeout(() => elemento_texto.classList.add("open"), time);
    });

  cronograma_contenido.style.minHeight = height + "px";
}

function eliminarAparicionTextosTrabajo(cronograma_contenido) {
  cronograma_contenido.style.minHeight = "";
  cronograma_contenido
    .querySelectorAll(".texto")
    .forEach(function(elemento_texto) {
      elemento_texto.classList.remove("open");
    });
}

function transitionEnd(element, callback) {
  element.addEventListener("transitionend", function transition(event) {
    element.removeEventListener("transitionend", transition, false);
    return callback();
  });
}

function createCancelButton(elemento) {
  let cancel_button = document.createElement("div");
  cancel_button.className = "cancel";
  elemento.appendChild(cancel_button);
  cancel_buttons.push({ element: cancel_button, section: elemento });
  seccion_trabajo_abierta = elemento;
  fijarElementos();
  return cancel_button;
}

function deleteCancelButton(cancel_button){
  cancel_buttons = cancel_buttons.filter(el=>{
    return el.element!==cancel_button
  })
}

function closeAllExcept(cancel_button){
   cancel_buttons.forEach(el=>{
    if(el.element!==cancel_button && el.element.onclick)
      el.element.onclick(event)
  })
}

function calculateDistanceToScroll(element){ 
  let height = 0;
  let i = 0;
  cronograma_secciones.forEach((seccion,index)=>{
    if(seccion.offsetHeight>height){
      height=seccion.offsetHeight;
    }
    if(element.children[1]===seccion){
      i=index;
    }
  })
  let trabajo_coords = cronograma_seccion_trabajo_element.getBoundingClientRect();
  window.scrollTo({top:(window.scrollY+trabajo_coords.top)+(i*height),behavior:"smooth"})
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
        if (getObjectTranslation(cronograma_fecha)[1] != margin_fecha_open) {
          // document.body.style.overflow = "hidden";
          let cancel_button =createCancelButton(elemento)
          closeAllExcept(cancel_button)
          cancel_button.classList.add("show");
          // window.scroll({ top: top, left: 0, behavior: "smooth" });
          // elemento.scrollIntoView({ behavior: "smooth" })
          calculateDistanceToScroll(elemento);

          cancel_button.onclick = event => {
            event.stopPropagation();
            // elemento.scrollIntoView({ behavior: "smooth" })
            deleteCancelButton(cancel_button)
            transitionEnd(cronograma_contenido, () => {
              cronograma_fecha_div.style.width = "";
              seccion_trabajo_abierta = 0;
              elemento.removeChild(cancel_button);
            });
            cronograma_seccion_trabajo_element.style.width = "";
            cronograma_fecha.style.transform = "";
            cronograma_title.style.transform = "";
            cronograma_vermas.classList.remove("close");
            cronograma_contenido_background.classList.remove("open");

            if(cancel_buttons.length<=0)
              cronograma_seccion_trabajo.style.width = "";

            eliminarAparicionTextosTrabajo(cronograma_contenido);

            cronograma_contenido.classList.remove("open");

            Array.from(elementos_trabajo).forEach(el => {
              if (el != elemento) {
                el.style.display = "";
              }
            });
            cancel_button.classList.remove("show");
          };

          cronograma_seccion_trabajo.style.width = width_titulo_seccion_trabajo_abierta;
          translateObject(0, margin_fecha_open, cronograma_fecha);
          translateObject(0, margin_fecha_open, cronograma_title);

          cronograma_fecha_div.style.width = "120px";
          cronograma_vermas.classList.add("close");
          cronograma_contenido.classList.add("open");
          cronograma_contenido_background.classList.add("open");
          animacionAparicionTextosTrabajo(cronograma_contenido);
        }
      };
    } else {
      elemento.onclick = () => {};
      elemento.onclick = function() {
        if (!cronograma_title.classList.contains("open")) {
          elemento.scrollIntoView({
            behavior: "smooth"
          });
          document.body.style.overflow = "hidden";
          let cancel_button =createCancelButton(elemento)

          cronograma_contenido.style.display = "flex";

          cronograma_contenido_background.classList.add("open");
          cronograma_title.classList.add("open");
          cronograma_vermas.style.width = 0;
          cancel_button.classList.add("show");

          animacionAparicionTextosTrabajo(cronograma_contenido);

          cancel_button.onclick = (event) => {
            event.stopPropagation();
            deleteCancelButton(cancel_button)
            document.body.style.overflow = "hidden";
            elemento.scrollIntoView({
              behavior: "smooth"
            });
            cronograma_vermas.style = "";

            cronograma_title.classList.remove("open");
            cronograma_contenido_background.classList.remove("open");
            cronograma_vermas.classList.remove("close");
            cancel_button.classList.remove("show");
          };

          cronograma_title.addEventListener(
            "transitionend",
            function transition(event) {
              if (
                cronograma_title !== event.target ||
                event.propertyName !== "height"
              )
                return;
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
                eliminarAparicionTextosTrabajo(cronograma_contenido);
                cronograma_contenido.style.display = "";
              }
              document.body.style.overflow = "";
              elemento.scrollIntoView({ })

            },
            false
          );
        }
      };
    }
    if (cronograma_contenido_background.classList.contains("open"))
      cancel_buttons.forEach(cancel_button=>{
        cancel_button.element.onclick ? cancel_button.element.onclick(event) : null;
      });
  });
}

function animationFrame() {
  if (window.scrollY != scrollAnterior) {
    scrollAnterior = window.scrollY;
    aparicionElementos();
    if (window.innerWidth > 1024) {
      // aparicionTitulos();
    } else {
      smartphoneAnimation();
    }
    aparicionTitulos();
    fijarElementos();
    footerAnimation();
  }
}

function fijarElemento(element, container) {
  let containerCoords = container.getBoundingClientRect();
  if (
    containerCoords.top <= 0 &&
    containerCoords.bottom >= window.innerHeight
  ) {
    element.classList.add("sticky");
    element.style.top = "";
  } else if (containerCoords.top > 0) {
    element.classList.remove("sticky");
    element.style.top = 0 + "px";
  } else {
    element.classList.remove("sticky");
    element.style.top = containerCoords.height - window.innerHeight + "px";
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
        translateObject(0, -window.scrollY / 3 + "px", videoIntro);
        if (videoIntro.paused) videoIntro.play();
        // videoIntro.style.display = "";
      }
      if (window.scrollY + window.innerHeight >= document.body.offsetHeight) {
        translateObject(0, "0", arriba);
      } else {
        arriba.style.transform = "";
      }
    }
    if (window.innerWidth > 1024) {
      // fijarElemento(element.children[0], coords);
    } else {
      let container = element.children[0];
      if (container.classList.contains("sticky"))
        container.classList.remove("sticky");
      container.style.top = "";
      if (seccion_trabajo_abierta)
      cancel_buttons.forEach(cancel => {
        fijarElemento(cancel.element, cancel.section);
      });
    }
  });
 
}

function aparicionElementos() {
  // if (window.innerWidth > 1024) {
  //   if (
  //     cronograma[0].getBoundingClientRect().top + window.outerHeight / 3 <
  //     window.innerHeight
  //   ) {
  //     cronograma_estudio.style.top = "";
  //   } else {
  //     cronograma_estudio.style.top = cronograma_estudio_height + "px";
  //   }
  // } else {
  //   cronograma_estudio.style.top = "";
  // }
  var ce = cronograma[0];
  var bcr = ce.getBoundingClientRect();
  if (bcr.top < window.innerHeight && bcr.bottom > 0) {
    ce.querySelectorAll(".cronograma-elemento").forEach(element => {
      let elbcr = element.getBoundingClientRect();
      if (elbcr.top + window.outerHeight / 10 < window.innerHeight) {
        translateObject(0, 0, element.children[0]);
        element.children[0].style.opacity = "1";
      }
    });
  } else if (bcr.top > window.innerHeight) {
    ce.querySelectorAll(".cronograma-elemento").forEach(element => {
      if (
        element.children[0].style.transform &&
        element.children[0].style.transform != ""
      ) {
        element.children[0].style.transform = "";
        element.children[0].style.opacity = "0";
      }
    });
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
  let nav = document.querySelector(".secciones-navegacion>ul");
  document
    .querySelectorAll(".secciones-navegacion")
    .forEach((navegacion, index) => {
      if (index != 0) navegacion.appendChild(nav.cloneNode(true));
      Array.from(navegacion.children[0].children).forEach(
        (navElement, index) => {
          navElement.onclick = () => {
            navegarA(elementosNavegacion[index].clase);
          };
        }
      );
    });
}

function aparicionTitulos() {
  [...seccion_titulos].forEach(titulo => {
    if (titulo.getBoundingClientRect().top - window.innerHeight < 0) {
      if (!titulo.classList.contains("ok")) {
        titulo.classList.add("ok");
        writingAnimation(titulo, titulo.textContent);
      }
    }
  });
}

function writingAnimation(elemento, texto) {
  elemento.style.width = elemento.offsetWidth + "px";
  elemento.textContent = "";
  let nextLetter = 0;
  let nextText = "";
  let maxTicks = 6;

  let cursorBlink = () => {
    setTimeout(() => {
      elemento.textContent.substr(-1) == "|"
        ? (elemento.textContent = elemento.textContent.slice(0, -1))
        : (elemento.textContent += "|");
      maxTicks--;
      if (
        maxTicks > 0 ||
        (maxTicks <= 0 && elemento.textContent.substr(-1) == "|")
      )
        cursorBlink();
      else {
        // elemento.style.width=""
      }
    }, 700);
  };
  cursorBlink();
  let textArray = [...texto];
  textArray.forEach((c, index) => {
    setTimeout(() => {
      nextText = nextText + c;

      elemento.textContent = nextText + "|";
      // if (index >= textArray.length - 1)
    }, nextLetter);
    nextLetter += 120;
  });
}

function navegarA(elemento) {
  document.querySelector(elemento).scrollIntoView({ behavior: "smooth" })
}

function footerAnimation() {
  let scrollYBottom = window.scrollY + window.innerHeight;
  let maxHeight = document.body.scrollHeight;
  if (scrollYBottom > maxHeight - window.innerHeight) {
    let x = scrollYBottom - maxHeight;
    translateObject(0, x / 2 + "px", creador);
    creador.style.opacity = 1 - -x / 500;
  }
}

function smartphoneAnimation() {
  Array.from(cronograma_elementos_trabajo).forEach(element => {
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
