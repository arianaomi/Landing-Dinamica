/* Variales globales */
var koderObject = {};

/* Hacer html dinamico */
const loadContent = (contentUrl) => {
  $("#container-wrapper").load(contentUrl);
};
//$("#kodersCard").on("click",loadContent("../cards.html"));

/* Hacer html dinamico */

/* Obteniendo los datos del formulario */
const getKoderForm = () => {
  let date = new Date();
  console.log(date);
  let koder = $("#koder-form");
  let koderArr = koder.serializeArray().forEach((datakoder) => {
    koderObject[datakoder.name] = datakoder.value;
    koderObject["newDate"] = date;
  });
  saveKoder(koderObject);
  $("#saveModal").modal("hide");
};

/* Eventos */

$("#save-koder").click(getKoderForm);

/* Request */
const saveKoder = (koderObject) => {
  $.ajax({
    url: "https://ajaxclass-1ca34.firebaseio.com/Equipo2/koders/.json",
    method: "POST",
    data: JSON.stringify(koderObject),
    success: (response) => {
      let responseVal = response.name;
      $("#successModal")
        .find(".modal-body")
        .append(`Su clave de registro es: ${responseVal}`);
      $("#successModal").modal("show");
      console.log(response);
    },
  });
};

const printCard = (koderObject) => {
  let { name, lastName, age, biography, photo } = koderObject;
  $("#cardWrapper").append(`<div class="col-12 col-md-4 my-3">
      <div class="card">
      <img id="imageKoderCard" class="card-img-top" src="${photo}" alt="Card image cap object-fit=cover" >
      <div class="card-body">
        <h5 class="userName">${name} ${lastName}</h5>
        <h6>${age}</h4>
        <p class="card-text">${biography}</p>
      </div>
    </div>
  </div>`);
};

const getKodersDb = () => {
  $.get(
    "https://ajaxclass-1ca34.firebaseio.com/Equipo2/koders/.json",
    function (response) {
      console.log(response);
      $.each(response, (key, value) => {
        console.log(value);
        printCard(value);
      });
      //printCard(response);
    }
  );
};

$("#kodersCard").click(getKodersDb);
//getKodersDb();
