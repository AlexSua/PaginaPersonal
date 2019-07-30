window.onload = () => {
  fijarElementos();
  aparicionElementos();
  Array.from(elementos_trabajo).forEach(elemento => {
    elemento.onclick = function() {
      if (
        elemento.querySelector(".cronograma-fecha").style.marginTop != "10vh"
      ) {
        document.body.style.overflow = "hidden";

        let top = elemento.getBoundingClientRect().top + window.scrollY;

        cancel_button.classList.add("show");
        window.scroll({ top: top, left: 0, behavior: "smooth" });

        cancel_button.onclick = () => {
          document.body.style.overflow = "hidden";
          let top = elemento.getBoundingClientRect().top + window.scrollY;
          window.scroll({ top: top, left: 0, behavior: "smooth" });

          cronograma_seccion_trabajo.style.width = "50%";
          elemento.querySelector(".cronograma-fecha").style.marginTop = "45vh";
          elemento.querySelector(".title").style.marginTop = "45vh";
          cronograma_seccion_trabajo_element.style.width = "50%";
          cronograma_seccion_trabajo_element.style.left = "50%";
          elemento
            .querySelector(".cronograma-contenido-background")
            .classList.remove("open");
          elemento.querySelector(".vermas").classList.remove("close");

          cancel_button.classList.remove("show");
        };

        cronograma_seccion_trabajo.style.width = "30%";
        elemento.querySelector(".cronograma-fecha").style.marginTop = "10vh";
        elemento.querySelector(".title").style.marginTop = "10vh";
        cronograma_seccion_trabajo_element.style.width = "70%";
        cronograma_seccion_trabajo_element.style.left = "30%";
        elemento.querySelector(".vermas").classList.add("close");

        elemento.querySelector(".title").addEventListener(
          "transitionend",
          () => {
            let top = "";
            if (cronograma_seccion_trabajo.style.width != "50%") {
              Array.from(elementos_trabajo).forEach(el => {
                if (el != elemento) {
                  el.style.display = "none";
                }
              });
              elemento.querySelector(".cronograma-contenido").style.display =
                "flex";
              elemento
                .querySelector(".cronograma-contenido-background")
                .classList.add("open");
            } else {
              elemento.querySelector(".cronograma-contenido").style.display =
                "none";
              Array.from(elementos_trabajo).forEach(el => {
                if (el != elemento) {
                  el.style.display = "";
                }
              });
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
  // document.addEventListener('scroll', function () {
  //     if (window.innerWidth > 1024) {
  //         // fijarElementos();
  //         // aparicionElementos();
  //     }
  // }, { passive: true });
  // $(window).on('resize', function () {
  //     if (window.innerWidth > 1024) {
  //         fijarElementos();
  //         aparicionElementos();
  //     }
  // });
});

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

  /*
        if (coords.bottom <= (window.innerHeight + 2 * window.innerHeight / 3)) {
            $(element).children(".seccion-trabajo").addClass('abierta')
        } else {
            $(element).children(".seccion-trabajo").removeClass('abierta')
        }
    */
  // var coordsPrimerElementoTrabajo = cronograma_seccion_trabajo_element.getBoundingClientRect();

  // //    if (coordsPrimerElementoTrabajo.top < window.innerHeight / 2 - 100) {
  // if (coordsPrimerElementoTrabajo.top < window.innerHeight / 2 - 200) {
  //     //$($(".estudios>.cronograma-elemento").get(0)).css({ "padding-top": 0 })
  //     cronograma_seccion_trabajo.addClass('abierta')
  //     cronograma_estudio.css({ top: "-100vh" });
  //     cronograma_trabajo.css({ top: "-0vh" });

  //     /* elementos_estudios.each((index, element) => {
  //         $(element).css({ top: "-100vh" });
  //     })
  //     elementos_trabajo.each((index, element) => {
  //         $(element).css({ top: "" });
  //     }) */
  //     seccion_trabajo_abierta = 1;
  // } else if (seccion_trabajo_abierta != 0) {

  //     //$($(".estudios>.cronograma-elemento").get(0)).css({ "padding-top": "20vh" })
  //     cronograma_seccion_trabajo.removeClass('abierta')
  //     cronograma_estudio.css({ top: "" });
  //     cronograma_trabajo.css({ top: "" });
  //     /*  elementos_estudios.each((index, element) => {
  //          $(element).css({ top: "" });
  //      })
  //      elementos_trabajo.each((index, element) => {
  //          $(element).css({ top: "100vh" });
  //      }) */

  //     document.addEventListener("transitionend", aparicionElementos, false);
  // }
}

function aparicionElementos() {
  // elementos_estudios.each((index, element) => {
  //     $(element).css({ top: "-100vh" });
  // })

  if (
    cronograma[0].getBoundingClientRect().top + window.outerHeight / 3 <
    window.innerHeight
  ) {
    $(cronograma_estudio[0]).css({ top: "0" });
  } else {
    $(cronograma_estudio[0]).css({ top: cornograma_estudio_height + "px" });
  }

  // Array.from(cronograma_secciones).forEach((elemento, index) => {
  //     var coords = elemento.getBoundingClientRect();

  //     if (coords.bottom < window.innerHeight) {
  //         $(elemento).addClass('visible');
  //     } else {
  //         //  $(elemento).removeClass('visible');
  //     }
  //     // console.log(coords.bottom)
  // })
}

function navegacion() {
  const elementosNavegacion = [{nombre:"Sobre mi",clase:".info"},{nombre:"Estudios",clase:".estudios"},{nombre:"Trabajo",clase:".trabajo"},{nombre:"Habilidades",clase:".habilidades"},{nombre:"Contacto",clase:".contacto"}]
  document.querySelectorAll(".secciones-navegacion").forEach(navegacion=>{
    let ul = document.createElement("ul");
    elementosNavegacion.forEach(elemento=>{
      let li = document.createElement("li");
      let span = document.createElement("span");
      let text = document.createTextNode(elemento.nombre);
      span.appendChild(text);
      li.appendChild(span);
      li.onclick=()=>{
        navegarA(elemento.clase)
      }
      ul.appendChild(li)
    })
    navegacion.appendChild(ul);
  })



  // var elementos = document.querySelectorAll(".secciones-navegacion span");
  // elementos.forEach((elemento, index) => {
  //   switch (index % 4) {
  //     case 0:
  //           elemento.onclick = () => {
  //               navegarA(".info");
  //             };
  //       break;
  //     case 1:
  //           elemento.onclick = () => {
  //               navegarA(".estudios");
  //             };
  //       break;
  //     case 2:
  //           elemento.onclick = () => {
  //               navegarA(".trabajo");
  //             };
  //       break;
  //     case 3:
  //           elemento.onclick = () => {
  //               navegarA(".contacto");
  //             };
  //       break;
  //   }
  // });
    // elementos[0].onclick = () => {
    //   navegarA(".info");
    // };
    // elementos[1].onclick = () => {
    //   navegarA(".estudios");
    // };
    // elementos[2].onclick = () => {
    //   navegarA(".trabajo");
    // };
    // elementos[3].onclick = () => {
    //   navegarA(".contacto");
    // };
}

function navegarA(elemento) {
  $("html,body").animate(
    {
      scrollTop: $(elemento).offset().top
    },
    "slow"
  );
}
