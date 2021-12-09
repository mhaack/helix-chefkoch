function createTag(name, attrs) {
  const el = document.createElement(name);
  if (typeof attrs === 'object') {
      for (const [key, value] of Object.entries(attrs)) {
          el.setAttribute(key, value);
      }
  }
  return el;
}

let copyTeaserButton;
const selection = {
  items: {},
  count: 0,
};

function refreshButtons() {
  if (selection.count > 0) {
    copyTeaserButton.classList.remove('hidden');
  } else {
    copyTeaserButton.classList.add('hidden');
  }
}

function addToSelection(urlPath, category) {
  if (!selection.items[urlPath]) {
      selection.items[urlPath] = category;
      selection.count += 1;
  }
  refreshButtons();

}

function removeFromSelection(urlPath) {
    if (selection.items[urlPath]) {
        delete selection.items[urlPath];
        selection.count -= 1;
    }

    refreshButtons();
}

function addToPreview(urlPath, category) {
    const categoriesTable = document.querySelector('#categories');
    categoriesTable.style.display = 'block';

    const cellImage = createTag('td', { class: 'spectrum-Table-cell' });
    const img = createTag('img', {
        src: category.imgSrc,
        class: 'image-preview'
    });
    cellImage.appendChild(img);
    const cellUrlPath = createTag('td', { class: 'spectrum-Table-cell' });
    cellUrlPath.innerHTML = urlPath;
    const cellName = createTag('td', { class: 'spectrum-Table-cell' });
    cellName.innerHTML = category.name;

    const row = createTag('tr', {
        id: 'c-' + urlPath,
        class: 'spectrum-Table-row'
    });
    row.appendChild(cellName);
    row.appendChild(cellImage);
    row.appendChild(cellUrlPath);

    const tableBody = categoriesTable.querySelector('table tbody');
    tableBody.appendChild(row);
}

function removeFromPreview(urlPath) {
    const categoriesTable = document.querySelector('#categories');
    const categoryRow = categoriesTable.querySelector('table tbody #c-' + urlPath);
    categoryRow.remove();
}

const IMG_EXPORT_WIDTH = 100;

function insertProductInCopyBuffer(urlPath, product) {
  const { name, imgSrc } = product;

  const tbody = document.querySelector('#copybuffer tbody');
        
  const row = document.createElement('tr');
  tbody.append(row);

  const nameCell = document.createElement('td');
  nameCell.style.border = '1px solid black';
  nameCell.style.textAlign = 'left';
  nameCell.style.verticalAlign = 'middle';
  nameCell.innerHTML = name;
  row.append(nameCell);

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
  img.height = (IMG_EXPORT_WIDTH / img.naturalWidth) * img.naturalHeight;

  const callToActionCell = document.createElement('td');
  callToActionCell.style.border = '1px solid black';
  callToActionCell.style.textAlign = 'left';
  callToActionCell.style.verticalAlign = 'middle';
  callToActionCell.innerHTML = '--> Add call to action text here';
  row.append(callToActionCell);

  const urlPathCell = document.createElement('td');
  urlPathCell.style.border = '1px solid black';
  urlPathCell.style.textAlign = 'left';
  urlPathCell.style.verticalAlign = 'middle';
  urlPathCell.innerHTML = urlPath;
  row.append(urlPathCell);
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

const copy = async (blockName) => {

  clear();

  if (selection.count === 0) return;

  document.querySelector('#copybuffer #blockName').innerHTML = blockName;

  for(let p in selection.items) {
    insertProductInCopyBuffer(p, selection.items[p]);
  }

  const div = document.getElementById('copybuffer');
  await copyHTMLToClipboard(div.innerHTML);
}

async function getCategoryData(urlPath) {
  // TODO find better solution getting data from product-field webcomponent
  const res = await fetch('https://adobeioruntime.net/api/v1/web/mbecker/default/io-proxy.http/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query categoryByUrlPath($urlPath: String!) {
          categoryList(filters: { url_key: { eq: $urlPath } }) {
            name
            image
          }
      }
      `,
      variables: {
        urlPath
      },
    }),
  });

  if (res.ok) {
    const json = await res.json();
    const category = json?.data?.categoryList[0];
    if (category) {
        return {
            name: category.name,
            imgSrc: category.image.replace('http://', 'https://')
        };
    }
  } 

  return null;
}

async function handleAddValue(event) {
  var urlPath = event.detail.value;

  const { name, imgSrc } = await getCategoryData(urlPath);

  addToSelection(urlPath, {
      name,
      imgSrc
  });
  addToPreview(urlPath, {
      name,
      imgSrc
  });  
}

function handleRemoveValue(event) {
  var urlPath = event.detail.value;

  removeFromSelection(urlPath);
  removeFromPreview(urlPath);
}

export function init() {
  document.querySelector('#categories').addEventListener('cif:add-value', handleAddValue);
  document.querySelector('#categories').addEventListener('cif:remove-value', handleRemoveValue);
  copyTeaserButton = document.querySelector('#copyTeaser');
  copyTeaserButton.addEventListener('click', () => { copy('Featured Categories'); });
}