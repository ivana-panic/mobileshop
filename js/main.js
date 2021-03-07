$(document).ready(function () {
  //add to BE
  const navLinks = [
    { url: "index.html", text: "Home" },
    { url: "about.html", text: "About" },
    { url: "contact.html", text: "contact" },
  ];

  const generateLinks = () => {
    //Get parent element
    const ul = document.querySelector(".menu-links");
    //Create children elements

    for (let item of navLinks) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      const text = document.createTextNode(item.text);
      a.setAttribute("href", item.url);
      a.appendChild(text);
      li.appendChild(a);
      ul.appendChild(li);
    }
  };

  function fetchData(url, method, callback) {
    $.ajax({
      url: url,
      method: method,
      dataType: "json",
      success: function (results) {
        callback(results);
      },
      error: function (err) {
        console.log(err);
      },
    });
  }

  function generateMobilePhonesContent(AllJsonData) {
    /*       const categories = AllJsonData.filter((item)=> {
          return item.mark === clickedText
      }) */
    let html = "";
    for (let item of AllJsonData) {
      html += `<div class="grid_1_of_4 images_1_of_4 products-info">
        <img src="${item.image.link}" alt="${item.image.alt}"/>
        <h2>${item.mark} ${item.model}</h2>
        <h3>${item.price}</h3>
      </div>`;
    }
    if (!AllJsonData.length) {
      html = "No phones available";
    }
    document.querySelector("#content").innerHTML = html;
  }

  //Sort start
  //$("#sort").change(filterChange);

  function sort(data) {
    const sortType = document.getElementById("sort").value;
    if (sortType == "asc") {
      return data.sort((a, b) => (a.price > b.price ? 1 : -1));
    }
    return data.sort((a, b) => (a.price < b.price ? 1 : -1));
  }

  //Initialise page
  generateLinks();
  fetchData(
    "https://polar-thicket-29502.herokuapp.com/mobile",
    "GET",
    generateMobilePhonesContent
  );
});
