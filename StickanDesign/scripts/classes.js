import { updateToolData, returnTool } from "./tools.js";

class ToolUISmall {
  constructor(id, image, title, description, placement, borrowed, reservedTo){

    this.tool = document.createElement('article');
    this.tool.classList.add('productContainer_Small', `tool-${id}`);

    this.imgSection = document.createElement('section');
    this.imgSection.classList.add('productContainer_pictureSection');

    this.img = document.createElement('img');
    this.img.src = image;
    this.imgSection.append(this.img);

    this.textSection = document.createElement('section');
    this.textSection.classList.add('productContainer_textInfo');

    this.title = document.createElement('h4');
    this.title.textContent = title[0].toUpperCase() + title.slice(1);

    this.description = document.createElement('p');
    this.description.textContent = description;
    this.description.classList.add('product_text');

    this.placement = document.createElement('p');
    this.placement.innerHTML = 'Plats: <b>' + placement + '</b>';
    this.placement.classList.add('product_place');

    this.status = document.createElement('p');
    borrowed ? this.status.innerHTML = 'Status: <span class="redText"><b>Utlånad</b></span>' : this.status.innerHTML = 'Status: <span class="greenText"><b>Ledig</b></span>';
    this.status.classList.add('product_status');

    this.reserveBtn = document.createElement('button');
    this.reserveBtn.textContent = `Reservera`;
    borrowed ? this.reserveBtn.classList.add('product_reserveBtn', 'smallBtn', 'orangeBtn') : this.reserveBtn.classList.add('product_reserveBtn', 'smallBtn', 'greenBtn');

    this.reserveBtn.addEventListener('click', () => {
      const main = document.querySelector('.main');
      main.textContent = '';
      main.style.gridArea = '5 / 1 / auto / 9';
      const searchField = document.querySelector('.searchContainer');
      searchField.style.display = 'none';
      
      const returnBtn = document.querySelector('.returnBtnSearchPage');
      returnBtn.setAttribute('onclick', "window.location.href = 'SearchToolsPage.html'")
      const tool = new ToolUILarge(id, image, title, placement, borrowed, reservedTo);
      main.append(tool.tool);
    });
    
    this.textSection.append(
      this.title,
      this.description,
      this.placement,
      this.status,
      this.reserveBtn
    );

    this.tool.append(
      this.imgSection,
      this.textSection
    );
  }
}

class ToolUILarge {
  constructor(id, image, title, placement, borrowed, reservedTo){
    this.id = id;
    console.log(this.id);
    console.log(reservedTo);

    this.tool = document.createElement('article');
    this.tool.classList.add('productContainer_Large', `tool-${id}`);

    this.imgSection = document.createElement('section');
    this.imgSection.classList.add('productContainer_pictureSection');

    this.img = document.createElement('img');
    this.img.src = image;
    this.imgSection.append(this.img);

    this.textSection = document.createElement('section');
    this.textSection.classList.add('productContainer_textInfo');

    this.title = document.createElement('h3');
    this.title.textContent = title[0].toUpperCase() + title.slice(1);

    this.placement = document.createElement('p');
    this.placement.innerHTML = 'Plats: <b>' + placement + '</b>';
    this.placement.classList.add('product_place');

    this.status = document.createElement('p');
    borrowed ? this.status.innerHTML = 'Status: <span class="redText"><b>Utlånad</b></span>' : this.status.innerHTML = 'Status: <span class="greenText"><b>Ledig</b></span>';
    this.status.classList.add('product_status');

    this.freeFrom = document.createElement('p');
    reservedTo ? this.freeFrom.innerHTML = 'Ledig fr.o.m. <b>' + reservedTo + '</b>' : this.freeFrom.innerHTML = 'Ledig fr.o.m. <b>idag</b>';
    this.freeFrom.classList.add('product_returnText');

    this.reserveFromLabel = document.createElement('label');
    this.reserveFromLabel.htmlFor = 'reserveFrom' 
    this.reserveFromLabel.textContent = 'Reservera fr.o.m' 
    this.reserveFromInput = document.createElement('input');
    this.reserveFromInput.type = 'date';
    this.reserveFromInput.id = 'reserveFrom';
    this.reserveFromInput.value = reservedTo;
    this.reserveFromInput.classList.add('dateInputFields');
    this.reserveFromInput.required = true;

    this.reserveToLabel = document.createElement('label');
    this.reserveToLabel.htmlFor = 'reserveTo' 
    this.reserveToLabel.textContent = 'Reservera t.o.m' 
    this.reserveToInput = document.createElement('input');
    this.reserveToInput.type = 'date';
    this.reserveToInput.id = 'reserveTo';
    this.reserveToInput.classList.add('dateInputFields');
    this.reserveToInput.required = true;

    this.reserveBtnLarge = document.createElement('button');
    this.reserveBtnLarge.textContent = `Reservera`;
    if(borrowed){
      this.reserveBtnLarge.classList.add('product_reserveBtn', 'midBtn', 'orangeBtn');
      this.reserveBtnLarge.disabled = true;
      this.reserveBtnLarge.style.opacity = '0.5';
    } else {
      this.reserveBtnLarge.classList.add('product_reserveBtn', 'midBtn', 'greenBtn');
      this.reserveBtnLarge.setAttribute('onclick', "window.location.href = 'OverviewBorrowPage.html'");
    }

    this.reserveBtnLarge.addEventListener('click', () => {
      let reserveFromDate = this.reserveFromInput.value;
      let reserveToDate = this.reserveToInput.value;
      if(!this.reserveFromInput.value || !this.reserveToInput.value) {
        return;
      } else {
        if(!borrowed){
          updateToolData(id, reserveFromDate, reserveToDate, borrowed);
      } else { 
          reserveFromDate = reservedTo;
          updateToolData(id, reserveFromDate, reserveToDate);
        }
      }
    });
    
    this.textSection.append(
      this.title,
      this.placement,
      this.status,
      this.freeFrom,
      this.reserveFromLabel,
      this.reserveFromInput,
      this.reserveToLabel,
      this.reserveToInput,
      this.reserveBtnLarge
    );

    this.tool.append(
      this.imgSection,
      this.textSection
    );
  }
}

class ToolUILendBorrow {
  constructor(id, image, title, placement, reservedTo) {
    this.tool = document.createElement('article');
    this.tool.classList.add('productContainer_Small', `tool-${id}`);

    this.imgSection = document.createElement('section');
    this.imgSection.classList.add('productContainer_pictureSection');

    this.img = document.createElement('img');
    this.img.src = image;
    this.imgSection.append(this.img);

    this.textSection = document.createElement('section');
    this.textSection.classList.add('productContainer_textInfo');

    this.title = document.createElement('h4');
    this.title.textContent = title[0].toUpperCase() + title.slice(1);

    this.placement = document.createElement('p');
    this.placement.innerHTML = 'Återlämningsplats: <b>' + placement + '</b>';
    this.placement.classList.add('product_place');

    this.reservedTo = document.createElement('p');
    this.reservedTo.innerHTML = 'Återlämnas senast: <b>' + reservedTo + '</b>';
    this.reservedTo.classList.add('product_status');

    this.receiptContainer = document.createElement('article');
    this.receiptContainer.classList.add('receiptContainer');

    this.receipt = document.createElement('a');
    this.receipt.href = '#';

    this.receiptImg = document.createElement('img');
    this.receiptImg.src = "../assets/icons/list.svg";
    this.receiptImg.alt = 'Receipt';

    this.receiptText = document.createElement('p');
    this.receiptText.textContent = 'Kvitto';
    
    this.receipt.append(this.receiptImg, this.receiptText);
    this.receiptContainer.append(this.receipt);
    
    this.textSection.append(
      this.title,
      this.placement,
      this.reservedTo
    );

    this.tool.append(
      this.imgSection,
      this.textSection,
      this.receiptContainer 
    );
  }
}

class ToolUIBorrow extends ToolUILendBorrow {
  constructor(id, image, title, placement, reservedTo) {
    super(id, image, title, placement, reservedTo);

    this.returnToolBtn = document.createElement('button');
    this.returnToolBtn.textContent = `Återlämna`;
    this.returnToolBtn.classList.add('product_returnBtn', 'smallBtn', 'redBtn');

    this.returnToolBtn.addEventListener('click', () => {
      returnTool(id);
    });

    this.textSection.appendChild(this.returnToolBtn);
  }
}

class ToolUILend extends ToolUILendBorrow {
  constructor(id, image, title, placement, reservedTo) {
    super(id, image, title, placement, reservedTo);
  }
}

export { ToolUISmall, ToolUILarge, ToolUIBorrow, ToolUILend };

