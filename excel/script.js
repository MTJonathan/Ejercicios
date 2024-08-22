const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

const ROWS = 10;
const COLUMNS = 6;
const FIRST_CHAR_CODE = 65;

const range = (length) => Array.from({ length }, (_, i) => i);
const getColumn = col => String.fromCharCode(FIRST_CHAR_CODE + col);

let STATE = range(COLUMNS)
  .map(col => range(ROWS).map(()=> ({computedValue: 0, value: ''})));

 console.log(STATE); 
const renderSpreadSheet = () => {
  const $table = $("table");
  const $head = $("thead");
  const $body = $("tbody");

  const headerHTML = `<tr>
        <th></th>
        ${range(COLUMNS).map(col => `<th>${getColumn(col)}</th>`).join("")}
    </tr>`;

  $head.innerHTML = headerHTML;

  const bodyHTML = range(ROWS).map(row => {
    return `<tr>
        <td>${row + 1}</td>
        ${range(COLUMNS).map(col => `
        <td data-x="${col}" data-y="${row}">
            <span></span>
            <input type="text" value="" />
        </td>`).join("")}
    </tr>`;
  }).join("");
  $body.innerHTML = bodyHTML;
};

renderSpreadSheet();
