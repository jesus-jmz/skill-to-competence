var verbs = [];
const conocimiento = ['', 'Bosquejo', 'Cito', 'Cuento', 'Copio', 'Defino', 'Dibujo', 'Ejemplifico', 'Encuentro', 'Enlisto', 'Enumero', 'Escojo', 'Expreso', 'Identifico', 'Ilustro', 'Indico', 'Integro', 'Menciono', 'Muestro', 'Nombro', 'Ordeno', 'Organizo', 'Recito', 'Reconozco', 'Recopilo', 'Recuerdo', 'Registro', 'Reproduzco', 'Selecciono'];
const comprension = ['', 'Actúo', 'Aprecio', 'Analizo', 'Argumento', 'Asocio', 'Asumo', 'Clasifico', 'Comparo', 'Comprendo', 'Contrasto', 'Debato', 'Describo', 'Determino', 'Diferencio', 'Discuto', 'Distingo', 'Esquematizo', 'Estimo', 'Evalúo', 'Expongo', 'Extiendo', 'Ilustro', 'Informo', 'Interpreto', 'Ordeno', 'Parafraseo', 'Predigo', 'Reafirmo', 'Relaciono', 'Resumo', 'Reviso', 'Serio', 'Sustento', 'Traduzco', 'Valoro'];
const uso = ['', 'Aplico', 'Calculo', 'Configuro', 'Construyo', 'Convierto', 'Creo', 'Decido', 'Desarrollo', 'Detecto', 'Dirijo', 'Diseño', 'Ejecuto', 'Ejerzo', 'Elaboro', 'Elijo', 'Empleo', 'Establezco', 'Examino', 'Gestiono', 'Implemento', 'Indago', 'Integro', 'Intervengo', 'Investigo', 'Manejo', 'Manipulo', 'Modelo', 'Opero', 'Practico', 'Produzco', 'Programo', 'Propongo', 'Realizo', 'Refuerzo', 'Resuelvo', 'Soluciono', 'Uso', 'Utilizo'];
const transferencia = ['', 'Adiestro', 'Apoyo', 'Ayudo', 'Capacito', 'Colaboro', 'Comparto', 'Comunico', 'Contribuyo', 'Convierto', 'Corrijo', 'Demuestro', 'Descubro', 'Detallo', 'Enseño', 'Experimento', 'Explico', 'Formo', 'Inculco', 'Instruyo', 'Muestro', 'Oriento', 'Preparo', 'Proveo', 'Sustento', 'Transfiero', 'Transformo', 'Transmito', 'Traslado'];
const frecuencia = ['Nunca', 'Pocas veces', 'ocasionalmente', 'Con frecuencia', 'siempre'];
var levels = [];

verbs.push(conocimiento, comprension, uso, transferencia);

function updateVerbs(){
  let selectTax = document.getElementById("nivel-tax");
  let selectVerb = document.getElementById("verbs");
  let nivelTax = selectTax.value;
  let list = 0;
  switch (nivelTax) {
    case 'conocimiento':
      list = 0;
      break;
    case 'comprension':
      list = 1;
      break;
    case 'uso':
      list = 2;
      break;
    case 'transferencia':
      list = 3;
      break;
    default:
      list = 0;
  }

  removeAll(selectVerb);

  for(let i=0; i<verbs[list].length; i++){
    let newOption = new Option(verbs[list][i],verbs[list][i]);
    selectVerb.add(newOption, undefined);
  }
}

function removeAll(selectBox) {
    while (selectBox.options.length > 0) {
        selectBox.remove(0);
    }
}

function updateResult(){
  let verb = document.getElementById("verbs").value;
  let tema = document.getElementById("tema").value;
  let utilidad = document.getElementById("utilidad").value;
  let lugar = document.getElementById("lugar").value;
  let resultado = document.getElementById("resultado");



  let cat = verb + " " + tema + " " +  utilidad + " " + lugar;
  cat = addPeriod(cat);
  resultado.value = cat;
  updateLevels(verb, tema, lugar);
}

function updateLevels(action, skill, context){
  levels = [];
  for(var i=0; i<5; i++){
    levels.push(document.getElementById("lvl" + (i+1)));
  }

  for(var i=0; i<5; i++){
    let cat = [action, skill, context];
    if(i === 0 || i === 1 || i === 3){
      cat[0] = cat[0].toLowerCase();
      cat.unshift(frecuencia[i])
    } else {
      cat.splice(1, 0, frecuencia[i].toLowerCase());
    }
    levels[i].value = addPeriod(cat.join(" "));
  }
}

function addPeriod(text){
  text = text.split('');
  while(text[text.length - 1] === ' '){
    text.pop();
  }
  if (text[text.length - 1] !== '.'){
    text.push('.');
  }
  text = text.join('');
  return text;
}

function copyToClipboard() {
  /* Get the text field */
  var copyText = document.getElementById("resultado");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

   /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText.value);

  /* Alert the copied text */
  alert("Texto copiado: " + copyText.value);
}

function copyManyToClipboard() {
  var lvls = [];
  for(var i=0; i<5; i++){
    lvls.push(document.getElementById("lvl" + (i+1)));
  }

  let copy = '';
  for(var i=0; i<5; i++){
    /*lvls[i].select();
    lvls[i].setSelectionRange(0, 99999);  /* For mobile devices */
    copy += lvls[i].value + "\n";
  }
  navigator.clipboard.writeText(copy);
  /* Alert the copied text */
  alert("Texto copiado: " + copy);
}

updateVerbs();
