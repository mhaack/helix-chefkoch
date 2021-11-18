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

function addToPreview(sku, product) {
  const productTable = document.querySelector('#products');
  productTable.style.display = 'block';

  const cellImage = createTag('td', { class: 'spectrum-Table-cell' });
  const img = createTag('img', { src: product.imgSrc, class: 'image-preview' });
  cellImage.appendChild(img);
  const cellSku = createTag('td', { class: 'spectrum-Table-cell' });
  cellSku.innerHTML = sku;
  const cellName = createTag('td', { class: 'spectrum-Table-cell' });
  cellName.innerHTML = product.name;

  const row = createTag('tr', { id: 'p-' + sku, class: 'spectrum-Table-row' });
  row.appendChild(cellImage);
  row.appendChild(cellSku);
  row.appendChild(cellName);
  
  const tableBody = productTable.querySelector('table tbody');
  tableBody.appendChild(row);
}

function removeFromPreview(sku) {
  const productTable = document.querySelector('#products');
  const productRow = productTable.querySelector('table tbody #p-' + sku);
  productRow.remove();
}

const IMG_EXPORT_WIDTH = 50;

function insertProductInCopyBuffer(sku, product) {
  const { name, imgSrc } = product;

  const tbody = document.querySelector('#copybuffer tbody');
        
  const row = document.createElement('tr');
  tbody.append(row);

  const imgCell = document.createElement('td');
  imgCell.style.border = '1px solid black';
  imgCell.style.textAlign = 'center';
  imgCell.style.verticalAlign = 'middle';

  row.append(imgCell);
  const img = document.createElement('img');
  img.src = imgSrc;
  img.alt = name;
  img.width = IMG_EXPORT_WIDTH;

  imgCell.append(img);

  const skuCell = document.createElement('td');
  skuCell.style.border = '1px solid black';
  skuCell.style.textAlign = 'left';
  skuCell.style.verticalAlign = 'middle';
  skuCell.innerHTML = sku;
  row.append(skuCell);
  
  const nameCell = document.createElement('td');
  nameCell.style.border = '1px solid black';
  nameCell.style.textAlign = 'left';
  nameCell.style.verticalAlign = 'middle';
  nameCell.innerHTML = name;
  row.append(nameCell);

  img.height = (IMG_EXPORT_WIDTH / img.naturalWidth) * img.naturalHeight;
}

const copyHTMLToClipboard = async (html) => {
  await navigator.clipboard.write([
    new ClipboardItem({
        'text/plain': new Blob([ html ], { type: 'text/plain' }),
        'text/html': new Blob([ html ], { type: 'text/html' }),
    }),
]);
};

const clear = () => {
  const tbody = document.querySelector('#copybuffer tbody');
  tbody.innerHTML = '';
}

const copy = async () => {

  clear();

  if (selection.count === 0) return;

  // 1 product -> card
  let blockName = 'Product Card';
  if (selection.count > 1) {
    // n products -> grid
    blockName = 'Product Grid';
  }

  document.querySelector('#copybuffer #blockName').innerHTML = blockName;

  for(let p in selection.items) {
    insertProductInCopyBuffer(p, selection.items[p]);
  }

  const div = document.getElementById('copybuffer');
  await copyHTMLToClipboard(div.innerHTML);
}

async function getProductData(sku) {
  // TODO find better solution getting data from product-field webcomponent
  const res = await fetch('https://adobeioruntime.net/api/v1/web/mbecker/default/io-proxy.http/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query productBySku($sku: String!) {
          products(pageSize: 1, filter: { sku: { eq: $sku } }) {
              items {
                  __typename
                  sku
                  name
                  thumbnail {
                      url
                  }
              }
          }
      }
      `,
      variables: {
        sku
      },
    }),
  });

  if (res.ok) {
    const json = await res.json();
    const product = json?.data?.products?.items[0];
    if (product) {
      return {
          name: product.name,
          imgSrc: product.thumbnail.url.replace(
              'http://',
              'https://'
          )
      };
    }
  } 

  return null;
}

async function handleAddValue(event) {
  var sku = event.detail.value;

  const { name, imgSrc } = await getProductData(sku);

  addToSelection(sku, {
    name,
    imgSrc
  });
  addToPreview(sku, {
    name,
    imgSrc
  });  
}

function handleRemoveValue(event) {
  var sku = event.detail.value;

  removeFromSelection(sku);
  removeFromPreview(sku);
}

export function init() {
  document.querySelector('#products').addEventListener('cif:add-value', handleAddValue);
  document.querySelector('#products').addEventListener('cif:remove-value', handleRemoveValue);
  copyButton = document.querySelector('#copy');
  copyButton.addEventListener('click', copy);
}