function createTag(name, attrs) {
  const el = document.createElement(name);
  if (typeof attrs === 'object') {
      for (const [key, value] of Object.entries(attrs)) {
          el.setAttribute(key, value);
      }
  }
  return el;
}

let copyButton;
const selection = {
  items: {},
  count: 0,
};

function addToSelection(sku, product) {
  if (!selection.items[sku]) {
    selection.items[sku] = product;
    selection.count += 1;
  }

  if (selection.count > 0) {
    copyButton.classList.remove('hidden');
  }
}

function removeFromSelection(sku) {
  if (selection.items[sku]) {
    delete selection.items[sku];
    selection.count -= 1;
  }

  if (selection.count < 1) {
    copyButton.classList.add('hidden');
  }
}

function handleAddValue(event) {
  var sku = event.detail.value;

  // TODO find data
  const name = 'Product Name goes here';
  const imgSrc = 'http://mystage1-amspro120.amscommerce.cloud/media/catalog/product/cache/8735dd21982cf027014173d1affcf80c/v/d/vd09-pe_main_4.jpg';

  addToSelection(sku, {
    name,
    imgSrc
  });

  var products = document.querySelector('#products');
  products.style.display = 'block';

  var tableBody = products.querySelector('table tbody');
  var row = createTag('tr', { id: 'p-' + sku, class: 'spectrum-Table-row' });
  var cellSku = createTag('td', {class: 'spectrum-Table-cell'});
  cellSku.innerHTML = sku;
  var cellName = createTag('td',  { class: 'spectrum-Table-cell' });
  cellName.innerHTML = name;
  var cellImage = createTag('td',  { class: 'spectrum-Table-cell' });
  var img = createTag('img', { src: imgSrc, class: 'image-preview' });
  cellImage.appendChild(img);
  row.appendChild(cellSku);
  row.appendChild(cellName);
  row.appendChild(cellImage);
  tableBody.appendChild(row);
}

function handleRemoveValue(event) {
  var sku = event.detail.value;

  removeFromSelection(sku);

  var products = document.querySelector('#products');
  var productRow = products.querySelector('table tbody #p-' + sku);
  productRow.remove();
}


// document.querySelector('#products').addEventListener('cif:update-value', () => {
//     console.log('Product - change')
// });

export function init() {
  document.querySelector('#products').addEventListener('cif:add-value', handleAddValue);
  document.querySelector('#products').addEventListener('cif:remove-value', handleRemoveValue);
  copyButton = document.querySelector('#copy');
}