const matrix =() =>{

  let arr = [
    [5, 3, ' ',6, ' ', ' ',' ', 9, 8],
    [6, ' ', ' ', 1, 9, 5, ' ', ' ', ' '],
    [' ', 9, 8, ' ', ' ', ' ', ' ', 6, ' '],
    [8, ' ', ' ', ' ', 6, ' ', ' ', ' ', 3],
    [4, ' ', ' ', 8, ' ', 3, ' ', ' ', 1],
    [7, ' ',' ', ' ', 2, ' ', ' ', ' ', 6],
    [' ', 6, ' ', ' ', ' ', ' ', 2, 8, ' '],
    [' ', ' ',' ', 4, 1,9, ' ', ' ', 5],
    [' ', ' ', ' ', ' ', 8, ' ', ' ', 7, 9]
  ];

  let $rowList = document.getElementsByClassName('row');
  let mainEle = document.getElementsByTagName('main')[0];

  const initializeMatrix = function(){
    arr.map((singleArr, index)=>{
      let row = $rowList[index];
      if((index + 1) % 3 == 0){
        row.style['border-bottom'] = '2px solid';
      }
      singleArr.map((val, nIndex)=>{
        let cell = document.createElement('div');
        if((nIndex + 1) % 3 == 0 && nIndex != 8){
          cell.style['border-right'] = '2px solid';
        }
        cell.classList.add('cell');
        if(val == " "){
          let inpt = document.createElement('input');
          inpt.type = 'number';
          inpt.setAttribute('row-index', index);
          inpt.setAttribute('column-index', nIndex);
          cell.appendChild(inpt);
        }else{
          cell.textContent = val;
        }
        row.append(cell);
      })
    });
  }



  const init = function(){
    initializeMatrix();
    mainEle.addEventListener('keyup', (e)=>{
      let ele = e.target;
      let value = Number(e.target.value);
      if(value < 1 || value > 9 ){
        e.target.value = '';
        alert('not valid input');
        return;
      }
      let rowIndex = Number(ele.getAttribute('row-index'));
      if(arr[rowIndex].includes(value)){
         e.target.value = '';
        alert('row validation failed');
        return;
      }

      let columnIndex = Number(ele.getAttribute('column-index'));
      for(let ii = 0, n = arr.length; ii < n; ii++){
        let singleArr = arr[ii];
        if(singleArr[columnIndex] == value){
          e.target.value = '';
          alert('column validation failed');
          return;
        }
      }
      let rowMod = rowIndex % 3;
      let columnMod = columnIndex % 3;

      let rowArr = [], columnArr = [];
      if(rowMod == 0){
        rowArr = [rowIndex, rowIndex + 1, rowIndex + 2];
      }else if (rowMod == 1) {
        rowArr = [rowIndex - 1, rowIndex, rowIndex + 1];
      }else if (rowMod == 2) {
        rowArr = [rowIndex - 2, rowIndex - 1, rowIndex];
      }
      if(columnMod == 0){
        columnArr = [columnIndex, columnIndex + 1, columnIndex + 2];
      }else if (columnMod == 1) {
        columnArr = [columnIndex - 1, columnIndex, columnIndex + 1];
      }else if (columnMod == 2) {
        columnArr = [columnIndex - 2, columnIndex - 1, columnIndex];
      }

      for(let ii = 0; ii < 3; ii++){
        let row = arr[rowArr[ii]];
        for (let jj = 0; jj < 3; jj++){
          if(row[columnArr[jj]] === value){
            e.target.value = '';
            alert('box validation failed');
            return;
          }
        }
      }


    }, false)
  }

  init();
};

document.addEventListener('DOMContentLoaded', matrix, false);
