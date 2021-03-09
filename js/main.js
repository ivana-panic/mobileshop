window.onload = () => {
  //add to BE
  const navLinks = [
    { url: "index.html", text: "Home" },
    { url: "about.html", text: "Author" },
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

  const markTextLink = [
    { text: "Samsung" },
    { text: "Iphone" },
    { text: "Huawei" },
    { text: "Xiaomi" },
    { text: "Nokia" },
    { text: "Motorola Moto" },
    { text: "Alcatel" },
  ];

  const generateMarkMenu = () => {
    //get parent element
    const ul = document.querySelector(".mark-list");
    //create children element

    for (let item of markTextLink) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      const text = document.createTextNode(item.text);
      a.setAttribute("href", item.url);
      a.appendChild(text);
      li.appendChild(a);
      ul.appendChild(li);
    }
  };

  const top3Text = [
    {
      url: "images/grid-img1.jpg",
      text:
        "BlackBerry, earlier called Research in Motion, is a Canadian smartphone-maker that made a name selling QWERTY devices, ",
    },
    {
      url: "images/grid-img2.jpg",
      text:
        "Nokia used to be one of the world's biggest mobile phone manufacturers but it fell behind with the advent of iPhone",
    },
    {
      url: "images/grid-img3.jpg",
      text:
        "Founded back in 1969 as Samsung Electric Industries, Suwon, South Korea-headquartered Samsung Electronics",
    },
  ];

  const generateTop3content = () => {
    //get parent element
    const top3div = document.querySelector(".grid_1_of_3");
    //create children element

    for (let item of top3Text) {
      const img = document.createElement("img");
      const p = document.createElement("p");
      const text = document.createTextNode(item.text);

      p.appendChild(text);
      img.setAttribute("src", item.url);
      top3div.appendChild(img);
      top3div.appendChild(p);
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

  function clickMark(allData) {
    const categories = allData.filter((item) => {
      return item.mark === clickedText;
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
        <h2 class="saletitle">${item.mark} ${item.model}</h2>
        <h3 id="pricetitle">${item.price}</h3>
        <h2 class="saletitle">${item.sale}</h2>
      </div>`;
    }
    if (!AllJsonData.length) {
      html = "No phones available";
    }
    document.querySelector("#content").innerHTML = html;
  }

  function data() {
    const sortType = document.getElementById("sort").value;
    if (sortType == "asc") {
      return data.sort((a, b) => (a.price > b.price ? 1 : -1));
    }
    return data.sort((a, b) => (a.price < b.price ? 1 : -1));
  }

  //Initialise page
  generateLinks();
  generateMarkMenu();
  generateTop3content();
  fetchData(
    "https://polar-thicket-29502.herokuapp.com/mobile",
    "GET",
    generateMobilePhonesContent
  );

  //slider
  var slideIndex = 0;
  showSlides();

  function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 1000); // Change image every 2 seconds
  }
};
