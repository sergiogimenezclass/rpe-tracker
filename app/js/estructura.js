fetch("header.html")
  .then(response => {
    return response.text()
  })
  .then(data => {
    document.querySelector(".top-navbar").innerHTML = data;
  });