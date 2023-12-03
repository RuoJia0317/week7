// let data = [
//   {
//     "id": 0,
//     "name": "肥宅心碎賞櫻3日",
//     "imgUrl": "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
//     "area": "高雄",
//     "description": "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
//     "group": 87,
//     "price": 1400,
//     "rate": 10
//   },
//   {
//     "id": 1,
//     "name": "貓空纜車雙程票",
//     "imgUrl": "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
//     "area": "台北",
//     "description": "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
//     "group": 99,
//     "price": 240,
//     "rate": 2
//   },
//   {
//     "id": 2,
//     "name": "台中谷關溫泉會1日",
//     "imgUrl": "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
//     "area": "台中",
//     "description": "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
//     "group": 20,
//     "price": 1765,
//     "rate": 7
//   }
// ];

let data = []

axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json')
.then((res) => {
  data = res.data.data;
  renderCard(data)
})
.catch((e) => {
  console.log(e)
})


//add area
const ticketName = document.querySelector('#ticketName')
const ticketImgUrl = document.querySelector('#ticketImgUrl')
const ticketRegion = document.querySelector('#ticketRegion')
const ticketPrice = document.querySelector('#ticketPrice')
const ticketNum = document.querySelector('#ticketNum')
const ticketRate = document.querySelector('#ticketRate')
const ticketDescription = document.querySelector('#ticketDescription')
const btnAdd = document.querySelector('#btnAdd')

//validate message
const ticketNameMessage = document.querySelector('#ticketName-message i')
const ticketImgUrlMessage = document.querySelector('#ticketImgUrl-message i')
const ticketRegionMessage = document.querySelector('#ticketRegion-message i')
const ticketPriceMessage = document.querySelector('#ticketPrice-message i')
const ticketNumMessage = document.querySelector('#ticketNum-message i')
const ticketRateMessage = document.querySelector('#ticketRate-message i')
const ticketDescriptionMessage = document.querySelector('#ticketDescription-message i')


//search area
const cantFindArea = document.querySelector('#cantFindArea')
const ticketCardArea = document.querySelector('#ticketCard-area')
const searchArea = document.querySelector('#searchArea')
const searchResultText = document.querySelector('#searchResult-text')

let validateFlag = true;

function renderCard(arr){
  ticketCardArea.innerHTML = ""
  searchResultText.textContent = `本次搜尋共 ${arr.length} 筆資料`
  if(arr.length === 0){
    cantFindArea.classList.remove('hide')
  }else{
    cantFindArea.classList.add('hide')
    arr.forEach(data => {
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
      `
    });

  }
}



searchArea.addEventListener('change',()=>{
  filterArea()
})

function filterArea(){
  let value = searchArea.value;
  if(value === "all" || value === "地區搜尋"){
    renderCard(data)
  }else{
    let arr = selectedAreaData(value)
    renderCard(arr)
  }
}

function selectedAreaData(area){
  let arr = data.filter((item) => {
    if(item.area === area){
      return item
    }
  })
  return arr
}

btnAdd.addEventListener('click',(e)=>{
  e.preventDefault()
  let obj = {}
  let objId = data.length + 1

  obj.id = objId;
  obj.name = ticketName.value;
  obj.imgUrl = ticketImgUrl.value;
  obj.area = ticketRegion.value;
  obj.description = ticketDescription.value;
  obj.group = ticketNum.value;
  obj.price = ticketPrice.value;
  obj.rate = ticketRate.value;
  
  checkInput()
  if(validateFlag) {
    data.push(obj)
    cleanInput()
    filterArea()
  }
})

function cleanInput(){
  ticketName.value = ""
  ticketImgUrl.value = ""
  ticketRegion.value = ""
  ticketDescription.value = ""
  ticketNum.value = ""
  ticketPrice.value = ""
  ticketRate.value = ""
}

function checkInput(){
  let inputArr = [
    {input:ticketName, message:ticketNameMessage},
    {input:ticketImgUrl, message:ticketImgUrlMessage},
    {input:ticketRegion, message:ticketRegionMessage},
    {input:ticketPrice, message:ticketPriceMessage},
    {input:ticketNum, message:ticketNumMessage},
    {input:ticketRate, message:ticketRateMessage},
    {input:ticketDescription, message:ticketDescriptionMessage},
  ]

  for(let i = 0; i < inputArr.length; i ++) {
    let emptyNum = 0
    if(inputArr[i].input.value === ""){
      inputArr[i].message.classList.remove('hide')
      emptyNum ++
    }else{
      inputArr[i].message.classList.add('hide')
    }
    if(emptyNum  != 0){
      validateFlag = false
    }else{
      validateFlag = true
    }
  }
}