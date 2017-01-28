var lignes=[];

var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://localhost/JS/AJAX/sendList.php');

xhr.addEventListener('readystatechange', function() {

if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      responseText=xhr.responseText;

     // cuts file content into lines
     // assuming the following:
     //  - the first one contains column titles
     //  - there are no non-wished 'CR', 'LF' or 'CR'+'LF' INSIDE a line
     // choose the separator character below
     // ###################################################################
     // returns a JSON string (array of objects) from the initial content #
     // ###################################################################

  var i=0;
  var j=0;
  var ligne="";
  var separator=',';

  while(responseText.charAt(i)!="") {
    if (/\r/g.test(responseText.charAt(i))) { // Mac EOL
      i++;
      if(/\n/g.test(responseText.charAt(i))) { // Windows EOL
        i++;
        ligne = responseText.substring(j,i-2);
      }
      else ligne = responseText.substring(j,i-1);
      lignes.push(ligne.split(separator));
      j=i;
    }
    else if ((/\n/g.test(responseText.charAt(i)))) { // Linux EOL
      i++;
      ligne = responseText.substring(j,i-1);
      lignes.push(ligne.split(separator));
      j=i;
    }
    else i++;
  }

  function Ligne (nomsChamps, valeursChamps) {
    var l = nomsChamps.length;
    for(var i=0;i<l;i++) {
      this[nomsChamps[i]]=valeursChamps[i].trim();
    }
    return this;
  }

  nomsChamps=lignes.shift();
  var l=lignes.length;
  var tabLignes=[];
  for (k=0;k<l;k++) {
    tabLignes[k]=new Ligne(nomsChamps, lignes[k]);
  }
  console.log(JSON.stringify(tabLignes)); // you can get the formatted content here
 }

});
xhr.send(null);

/*
function ltrim(chaine) {
  var i=0;
  while(/\s/g.test(chaine.charAt(i))) {
    i++;
  }
  return chaine.substring(i);
}

function rtrim(chaine) {
  var j=0;
  while(/\s/g.test(chaine.charAt(chaine.length-1-j))) {
    j++;
  }
  return chaine.substring(0,chaine.length-j);
}*/
