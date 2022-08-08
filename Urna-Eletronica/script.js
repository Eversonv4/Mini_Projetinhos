var seuVotoPara = document.querySelector('.divisor-1-1 span');
var cargo = document.querySelector('.divisor-1-2 span');
var descricao = document.querySelector('.divisor-1-4');
var aviso = document.querySelector('.divisor-2');
var lateral = document.querySelector('.divisor-1-right');
var numeros = document.querySelector('.divisor-1-3');

var etapaAtual = 0;
var numero = "";
var votoBranco = false;
var votos = [];

function comecarEtapa() {
  var etapa = etapas[etapaAtual];
  var numeroHtml = "";
  numero = "";
  votoBranco = false;

  for(let i = 0 ; i < etapa.numeros ; i++ ) {
    if(i === 0) {
      numeroHtml += '<div class="numero pisca"></div>';
    } else {
      numeroHtml += '<div class="numero"></div>';
    }
  }

  seuVotoPara.style.display = "none";
  cargo.innerHTML = etapa.titulo;
  descricao.innerHTML = "";
  aviso.style.display = "none";
  lateral.innerHTML = "";
  numeros.innerHTML = numeroHtml;
}

function atualizaInterface() {
  var etapa = etapas[etapaAtual];
  var candidato = etapa.candidatos.filter((item)=>{
    if(item.numero === numero) {
      return true;
    } else {
      return false;
    }
  });
  if(candidato.length > 0) {
    candidato = candidato[0];
    seuVotoPara.style.display = "block";
    aviso.style.display = 'block';
    descricao.innerHTML = `Nome: ${candidato.nome} <br /> Partido: ${candidato.partido}`;

    var fotosHtml = '';
    for(let i in candidato.fotos) {
      fotosHtml += `<div class="divisor-1-image"><img src="images/${candidato.fotos[i].url}" alt="" />${candidato.fotos[i].legenda}</div>`;
    }

    lateral.innerHTML = fotosHtml;

  } else {
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
  }
  
}

function clicou(n) {
  let elementoNumero = document.querySelector('.pisca');
  if(elementoNumero !== null) {
    elementoNumero.innerHTML = n;
    numero = `${numero}${n}`;

    elementoNumero.classList.remove('pisca');
    if(elementoNumero.nextElementSibling !== null) {
      elementoNumero.nextElementSibling.classList.add('pisca');
    } else {
      atualizaInterface();
    }
  }
}

function branco() {
  numero = "";
  votoBranco = true;
  lateral.innerHTML = "";

  seuVotoPara.style.display = 'block';
  aviso.style.display = 'block';
  numeros.innerHTML = "";
  descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
}

function corrigir() {
  comecarEtapa();
}

function confirmar() {
  var etapa = etapas[etapaAtual];

  var votoConfirmado = false;

  if(votoBranco === true) {
    votoConfirmado = true;
    votos.push({
      etapa: etapas[etapaAtual].titulo,
      voto: 'branco'
    });
  } else if(numero.length === etapa.numeros) {
    votoConfirmado = true;
    votos.push({
      etapa: etapas[etapaAtual].titulo,
      voto: numero
    });
  }

  if(votoConfirmado) {
    etapaAtual++;
    if(etapas[etapaAtual] !== undefined) {
      comecarEtapa();
    } else {
      document.querySelector(".tela").innerHTML = '<div class="aviso--gigante pisca">FIM</div>';
      console.log(votos);
    }
  }
}

comecarEtapa();