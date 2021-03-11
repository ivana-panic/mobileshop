window.onload = () => {
  //add to BE
  const navLinks = [
    { url: "index.html", text: "Home" },
    { url: "author.html", text: "Author" },
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
    { text: "Motorola" },
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
      a.classList.add(item.text);
      li.classList.add("list-mark-pointer");
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
  //DYNAMIC PRINT TOP 3 PHONE
  const generateTop3content = () => {
    //get parent element
    const top3div = document.querySelector(".grid_1_of_3");
    //create children element

    for (let item of top3Text) {
      const div = document.createElement("div");
      const img = document.createElement("img");
      const p = document.createElement("p");
      const text = document.createTextNode(item.text);

      div.classList.add("top-1-of-3");
      p.appendChild(text);
      img.setAttribute("src", item.url);
      div.appendChild(img);
      div.appendChild(p);
      top3div.appendChild(div);
    }
  };

  //CALL AJAX

  function fetchData(url, method, callback) {
    $.ajax({
      url: url,
      method: method,
      dataType: "json",
      success: function (results) {
        callback(results);
        localStorage.setItem("mobile", JSON.stringify(results));
      },
      error: function (err) {
        console.log(err);
      },
    });
  }

  //CLICK ON MARK AND SHOW PHONE

  function clickMark(event) {
    console.log(event);
    if (event.target.tagName === "A") {
      const text = event.target.classList.value;
      const mobilePhones = JSON.parse(localStorage.mobile);

      const filteredMobilePhones = mobilePhones.filter((item) => {
        return item.mark === text;
      });

      generateMobilePhonesContent(filteredMobilePhones);
    }
  }

  const markList = document.querySelector("#category");

  if (markList) {
    markList.addEventListener("click", (event) => {
      clickMark(event);
    });
  }

  //DYNAMIC PHONE PRINT

  function generateMobilePhonesContent(AllJsonData) {
    let html = "";
    for (let item of AllJsonData) {
      html += `<div class="grid_1_of_4 images_1_of_4 products-info">
        <img src="${item.image.link}" alt="${item.image.alt}"/>
        <h2 class="saletitle">${item.mark} ${item.model}</h2>
        <h3 id="pricetitle">${item.price}</h3>
        <h2 class="saletitle">${item.sale}</h2>
        <a class="aa-ad-card-btn" type="button" id="clickCart">
            <span class="fa fa-shopping-cart">
              
            </span>
            Add to cart
            </a>
      </div>`;
    }
    if (!AllJsonData.length) {
      html = "No phones available";
    }
    document.querySelector("#content").innerHTML = html;
  }

  //SORT PRICE

  function sort() {
    const sortType = document.getElementById("sort").value;
    const mobilePhones = JSON.parse(localStorage.mobile);

    if (sortType == "asc") {
      return mobilePhones.sort((a, b) => (a.price > b.price ? 1 : -1));
    }
    if (sortType == "desc") {
      return mobilePhones.sort((a, b) => (a.price < b.price ? 1 : -1));
    }
    return mobilePhones;
  }

  document.getElementById("sort").addEventListener("change", () => {
    generateMobilePhonesContent(sort());
  });

  //INPU AND SEARCH PHONE

  const apiSearchBaseUrl = (searchTerm) => {
    return `https://polar-thicket-29502.herokuapp.com/search?name=${searchTerm}`;
  };

  const getSearchResults = async (searchTerm) => {
    const results = await fetch(apiSearchBaseUrl(searchTerm), {
      method: "GET",
    });
    return results.json();
  };

  const getPhone = (input) => {
    if (input.length > 1) {
      getSearchResults(input).then((data) => {
        generateMobilePhonesContent(data);
      });
    }
  };

  const search = document.querySelector("#searchinput");
  const searchButton = document.querySelector("#buttonSearch");

  if (searchButton) {
    searchButton.addEventListener("click", () => {
      getPhone(search.value);
    });
  }

  //INITIALISE PAGE
  generateLinks();
  generateMarkMenu();
  generateTop3content();
  fetchData(
    "https://polar-thicket-29502.herokuapp.com/mobile",
    "GET",
    generateMobilePhonesContent
  );

  //SLIDER
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

  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    document.body.scrollTop = 0; // safari
    document.documentElement.scrollTop = 0; // mozilla abd chrome
  });

  //ADD TO CART

  document
    .querySelector("#content")
    .addEventListener("click", function cart(event) {
      if (event.target.id === "clickCart") {
        if (typeof Storage !== "undefined") {
          if (sessionStorage.clickcount) {
            sessionStorage.clickcount = Number(sessionStorage.clickcount) + 1;
          } else {
            sessionStorage.clickcount = 1;
          }
          document.getElementById("result").innerHTML =
            "U korpi imate: " + sessionStorage.clickcount + " proizvod/a";
        } else {
          document.getElementById("result").innerHTML =
            "Ovaj pregledač nema local storage";
        }
      }
    });

  //FOOTER REGEX
  document.addEventListener("DOMContentLoaded", () => {
    document
      .getElementById("go-button")
      .addEventListener("click", function formfooter() {
        var fooNews = document.getElementById("#footer-regex");
        var fooNewsInput = document.getElementById("#footer-regex").value;

        var regexNews = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        if (!regexNews.test(fooNews)) {
          fooNewsInput.classList.remove("Correct");
          fooNewsInput.classList.add("Incorrect");
          errors.push(
            "Please write a correct mail! Example of a correctly written mail address: mariaelias@hotmail.com"
          );
        } else {
          inputEmail.classList.remove("Incorrect");
          inputEmail.classList.add("Correct");
        }
      });

    errorHtml = errors.map((error) => {
      return $(`<div>${error}</div>`);
    });
    $("#errors").empty();
    $.each(errorHtml, function (i, val) {
      $("#errors").append(val);
    });
  });

  if (localStorage) {
    $("#go-button").click(function () {
      var mail = $("#footer-regex").val();
      localStorage.setItem("mail-korisnik", mail);
      alert("The entered mail was saved on Local Storage! Expect a message!");
    });
  } else {
    alert("Error! ");
  }

  //SHOPPING CART

  document
    .querySelector("#cart-icon")
    .addEventListener("click", function clictShopCart() {
      alert("Thanks for shopping, see you!");
    });
};
