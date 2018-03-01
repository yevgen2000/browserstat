const site = location.hostname; 

const xmlhttp = new XMLHttpRequest();
xmlhttp.open("PUT", "http://localhost/api/v1/sites");
xmlhttp.setRequestHeader("Content-Type", "application/json");
xmlhttp.send(JSON.stringify({
  site: site,
}));
