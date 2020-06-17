/* Variales globales */
var koderObject = {};

/* Obteniendo los datos del formulario */

const getKoderForm = () => {
  let date = new Date();
  console.log(date);
  let koder = $("#koder-form");
  let koderArr = koder.serializeArray().forEach((datakoder) => {
    koderObject[datakoder.name] = datakoder.value;
    koderObject["newDate"] = date;
  });
  console.log(koderObject);

  saveKoder(koderObject);
  $("#saveModal").modal("hide");
};

/* Eventos */

$("#save-koder").click(getKoderForm);

/* Request */
const saveKoder = (koderObject) => {
  //$("#saveModal").modal("hide");
  $.ajax({
    url: "https://ajaxclass-1ca34.firebaseio.com/Equipo2/koders/.json",
    method: "POSt",
    data: JSON.stringify(koderObject),
    success: (response) => {
      let responseVal = response.name;
      console.log(responseVal);
      $("#successModal")
        .find(".modal-body")
        .append(`Su clave de registro es: ${responseVal}`);
      $("#successModal").modal("show");
      console.log(response);
    },
  });
};
