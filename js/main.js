window.onload = () => {
  fijarElementos();
  aparicionElementos();
  animacionTrabajo();
};

$(document).ready(function() {
  cronograma_trabajo = $(".trabajo>div");
  cronograma_estudio = $(".estudios>div");
  cornograma_estudio_height = $(cronograma_estudio).height();
  elementos_trabajo = $(".trabajo .cronograma-elemento");
  cancel_button = $(".cancel")[0];
  elementos_estudios = $(".estudios .cronograma-seccion");
  cronograma_secciones = $(".cronograma-seccion");
  cronograma = $(".cronograma");
  cronograma_seccion_izquierda = $(cronograma).children(".seccion-izquierda");
  secciones = $(".seccion");

  cronograma_seccion_trabajo = $(cronograma).children(".seccion-trabajo")[0];
  cronograma_seccion_trabajo_element = $(".trabajo").get(0);

  seccion_trabajo_abierta = 0;

  if (window.innerWidth > 1024) {
    fijarElementos();
    document.addEventListener("transitionend", aparicionElementos, false);
  }
  navegacion();
  animationFrame();
});

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
          (event) => {
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
            } else {
              cronograma_contenido.style.display = "none";
              Array.from(elementos_trabajo).forEach(el => {
                if (el != elemento) {
                  el.style.display = "";
                }
              });
              cronograma_fecha_div.style.width = "";
            }

            top = elemento.getBoundingClientRect().top + window.scrollY;

            window.scroll({ top: top, left: 0 });

            document.body.style.overflow = "auto";
          },
          false
        );
      }
    };
  });
}

function animationFrame() {
  if (window.innerWidth > 1024) {
    fijarElementos();
    aparicionElementos();
  }

  window.requestAnimationFrame(animationFrame);
}

function fijarElemento(element, containerCoords) {
  let container = $(element);
  if (
    containerCoords.top <= 0 &&
    containerCoords.bottom >= window.innerHeight
  ) {
    container.addClass("sticky").css({ top: 0 });
  } else if (containerCoords.top > 0) {
    if ($(container).hasClass("sticky")) container.removeClass("sticky");
    container.css({ top: 0 });
  } else {
    if ($(container).hasClass("sticky")) container.removeClass("sticky");
    container.css({ top: containerCoords.height - window.innerHeight });
  }
}

function fijarElementos() {
  Array.from(secciones).forEach((element, index) => {
    var coords = element.getBoundingClientRect();
    if (index == 0) {
      if (coords.top < 0 && !videoIntro.paused) {
        videoIntro.pause();
        // videoIntro.style.display = "none";
      } else if (videoIntro.paused && coords.top >= 0) {
        videoIntro.play();
        // videoIntro.style.display = "";
      }
    }
    fijarElemento(element.children[0], coords);
  });
  fijarElemento(
    cancel_button,
    cronograma_seccion_trabajo_element.getBoundingClientRect()
  );
}

function aparicionElementos() {
  if (
    cronograma[0].getBoundingClientRect().top + window.outerHeight / 3 <
    window.innerHeight
  ) {
    $(cronograma_estudio[0]).css({ top: "0" });
  } else {
    $(cronograma_estudio[0]).css({ top: cornograma_estudio_height + "px" });
  }
}

function navegacion() {
  const elementosNavegacion = [
    { nombre: "Sobre mi", clase: ".info" },
    { nombre: "Estudios", clase: ".estudios" },
    { nombre: "Trabajo", clase: ".trabajo" },
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
  $("html,body").animate(
    {
      scrollTop: $(elemento).offset().top
    },
    "slow"
  );
}
