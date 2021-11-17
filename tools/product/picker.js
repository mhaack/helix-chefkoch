function createTag(name, attrs) {
  const el = document.createElement(name);
  if (typeof attrs === 'object') {
      for (const [key, value] of Object.entries(attrs)) {
          el.setAttribute(key, value);
      }
  }
  return el;
}

function handleAddValue(event) {
  var value = event.detail.value;

  var products = document.querySelector("#products");
  products.style.display = "block";

  var tableBody = products.querySelector("table tbody");
  var row = createTag("tr", { id: "p-" + value, class: "spectrum-Table-row" });
  var cellSku = createTag("td", {class: "spectrum-Table-cell"});
  cellSku.innerHTML = value;
  var cellName = createTag("td",  { class: "spectrum-Table-cell" });
  cellName.innerHTML = "Product Name goes here"
  var cellImage = createTag("td",  { class: "spectrum-Table-cell" });
  cellImage.innerHTML = "Product Asset goes here"
  row.appendChild(cellSku);
  row.appendChild(cellName);
  row.appendChild(cellImage);
  tableBody.appendChild(row);
}

function handleRemoveValue(event) {
  var value = event.detail.value;
  var products = document.querySelector("#products");
  var productRow = products.querySelector("table tbody #p-" + value);
  productRow.remove();
}


// document.querySelector("#products").addEventListener('cif:update-value', () => {
//     console.log("Product - change")
// });

export function init() {
  document.querySelector("#products").addEventListener('cif:add-value', handleAddValue);
  document.querySelector("#products").addEventListener('cif:remove-value', handleRemoveValue);
}