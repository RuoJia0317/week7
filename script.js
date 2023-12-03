let data = [];

axios
  .get(
    "https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json"
  )
  .then((res) => {
    data = res.data.data;
    renderCard(data);
    renderChart();
  })
  .catch((e) => {
    console.log(e);
  });

//add area
const ticketName = document.querySelector("#ticketName");
const ticketImgUrl = document.querySelector("#ticketImgUrl");
const ticketRegion = document.querySelector("#ticketRegion");
const ticketPrice = document.querySelector("#ticketPrice");
const ticketNum = document.querySelector("#ticketNum");
const ticketRate = document.querySelector("#ticketRate");
const ticketDescription = document.querySelector("#ticketDescription");
const btnAdd = document.querySelector("#btnAdd");

//validate message
const ticketNameMessage = document.querySelector("#ticketName-message i");
const ticketImgUrlMessage = document.querySelector("#ticketImgUrl-message i");
const ticketRegionMessage = document.querySelector("#ticketRegion-message i");
const ticketPriceMessage = document.querySelector("#ticketPrice-message i");
const ticketNumMessage = document.querySelector("#ticketNum-message i");
const ticketRateMessage = document.querySelector("#ticketRate-message i");
const ticketDescriptionMessage = document.querySelector(
  "#ticketDescription-message i"
);

//search area
const cantFindArea = document.querySelector("#cantFindArea");
const ticketCardArea = document.querySelector("#ticketCard-area");
const searchArea = document.querySelector("#searchArea");
const searchResultText = document.querySelector("#searchResult-text");

let validateFlag = true;

function renderCard(arr) {
  ticketCardArea.innerHTML = "";
  searchResultText.textContent = `本次搜尋共 ${arr.length} 筆資料`;
  if (arr.length === 0) {
    cantFindArea.classList.remove("hide");
  } else {
    cantFindArea.classList.add("hide");
    arr.forEach((data) => {
      ticketCardArea.innerHTML += `
      <li class="ticketCard">
      <div class="ticketCard-img">
        <a href="#">
          <img src="${data.imgUrl}" alt="">
        </a>
        <div class="ticketCard-region">${data.area}</div>
        <div class="ticketCard-rank">${data.rate}</div>
      </div>
      <div class="ticketCard-content">
        <div>
          <h3>
            <a href="#" class="ticketCard-name">${data.name}</a>
          </h3>
          <p class="ticketCard-description">
            ${data.description}
          </p>
        </div>
        <div class="ticketCard-info">
          <p class="ticketCard-num">
            <span><i class="fas fa-exclamation-circle"></i></span>
            剩下最後 <span id="ticketCard-num"> ${data.group} </span> 組
          </p>
          <p class="ticketCard-price">
            TWD <span id="ticketCard-price">$${data.price}</span>
          </p>
        </div>
      </div>
    </li>
      `;
    });
  }
}

searchArea.addEventListener("change", () => {
  filterArea();
});

function filterArea() {
  let value = searchArea.value;
  if (value === "all" || value === "地區搜尋") {
    renderCard(data);
  } else {
    let arr = selectedAreaData(value);
    renderCard(arr);
  }
  
}

function selectedAreaData(area) {
  let arr = data.filter((item) => {
    if (item.area === area) {
      return item;
    }
  });
  return arr;
}

btnAdd.addEventListener("click", (e) => {
  e.preventDefault();
  let obj = {};
  let objId = data.length + 1;

  obj.id = objId;
  obj.name = ticketName.value;
  obj.imgUrl = ticketImgUrl.value;
  obj.area = ticketRegion.value;
  obj.description = ticketDescription.value;
  obj.group = ticketNum.value;
  obj.price = ticketPrice.value;
  obj.rate = ticketRate.value;

  checkInput();
  if (validateFlag) {
    data.push(obj);
    cleanInput();
    filterArea();
    renderChart()
  }
});

function cleanInput() {
  ticketName.value = "";
  ticketImgUrl.value = "";
  ticketRegion.value = "";
  ticketDescription.value = "";
  ticketNum.value = "";
  ticketPrice.value = "";
  ticketRate.value = "";
}

function checkInput() {
  let inputArr = [
    { input: ticketName, message: ticketNameMessage },
    { input: ticketImgUrl, message: ticketImgUrlMessage },
    { input: ticketRegion, message: ticketRegionMessage },
    { input: ticketPrice, message: ticketPriceMessage },
    { input: ticketNum, message: ticketNumMessage },
    { input: ticketRate, message: ticketRateMessage },
    { input: ticketDescription, message: ticketDescriptionMessage },
  ];

  for (let i = 0; i < inputArr.length; i++) {
    let emptyNum = 0;
    if (inputArr[i].input.value === "") {
      inputArr[i].message.classList.remove("hide");
      emptyNum++;
    } else {
      inputArr[i].message.classList.add("hide");
    }
    if (emptyNum != 0) {
      validateFlag = false;
    } else {
      validateFlag = true;
    }
  }
}

function renderChart() {
  let obj = {};
  data.forEach((item) => {
    let { area } = item;
    if (obj[area] === undefined) {
      obj[area] = 1;
    } else {
      obj[area] += 1;
    }
  });

  let chartData = [];
  let area = Object.keys(obj);
  area.forEach((item) => {
    let arr = [];
    arr.push(item);
    arr.push(obj[item]);
    chartData.push(arr);
  });

  let chart = c3.generate({
    bindto: "#chart",
    size: {
      width: 180,
      height: 180
    },

    color: {
      pattern: ['#E68619','#26BFC7','#5151D3', ]
    },
    data: {
      columns: chartData,
      type: "donut",
      
      onclick: function (d, i) { console.log("onclick", d, i); },
      onmouseover: function (d, i) { console.log("onmouseover", d, i); },
      onmouseout: function (d, i) { console.log("onmouseout", d, i); }
    },
    donut: {
      width: 10,
      label: {
        show: false
      },
      title: "套票地區比重",
    }

    
  });
}


