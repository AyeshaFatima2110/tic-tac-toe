
  const resetButton = document.querySelector('.js-reset-btn');
  const gridItems = document.querySelectorAll('.grid-item');
  let playerTurn = document.querySelector('.js-player-turn');



  //using to add properties(key value pair ) in the DOM element 
  //keys are the Dom elements and  values are the keys(or dom elements) events
  const eventHandlers = new WeakMap();

  

  let playerA : string = 'X';
  let playerB : string = 'O';
  let turn = playerA;

  let myArr :string[][] = [
    [
    '0','1','2'
    ],
    [
    '3','4','5'
    ],
    [
    '6','7','8'
    ]
  ];


  addEvents();

  //Event Listeners

  resetButton?.addEventListener('click',()=>{
    gridItems.forEach(el =>{ 
      el.innerHTML = '';
    });
    turn = playerA;
    myArr = [
      [
      '0','1','2'
      ],
      [
      '3','4','5'
      ],
      [
      '6','7','8'
      ]
    ];
    updateTurn(turn);
    addEvents();
    

  });





  function addEvents(){
    gridItems.forEach((box , index) =>{
        
      const boundEventHandle = handleEvent.bind(null,box,index);
      //setting a key value pair for box
      eventHandlers.set(box,boundEventHandle);
      box.addEventListener('click',boundEventHandle);
    });

  }

  
   

  //functions

  function handleEvent(box : any ,index:number){
    if(box.innerHTML === ''){
      if(turn === playerA){ 
        console.log(turn);
        box.classList.remove('playerB');
        box.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
        turn = playerB;
        updateTurn(turn)
        getIndex(index,playerA);
        }
        else{
          console.log(turn);
          box.innerHTML = `<i class="fa-solid fa-circle"></i>`;
          box.classList.add('playerB');
          turn = playerA;
          updateTurn(turn)
          getIndex(index,playerB);
        }
      
      }
  }

  //Updating array values with X or O
  function getIndex(index:number , playerOption:string){

    for(let i=0;i<myArr.length ;i++){
      for(let j=0 ;j<myArr[i].length ;j++){
        if(Number(myArr[i][j])===index){
          myArr[i][j] = playerOption;
          gameLogic();
        }
       }
      }
  }


  //Game logic
  
  function gameLogic(){

    for(let i=0;i<myArr.length;i++){
      for(let j=0;j<myArr[i].length;j++){
        try{
          if((myArr[i][j] === myArr[i][j+1])
            &&(myArr[i][j+1] === myArr[i][j+2]) 
          ||(myArr[i][j]===myArr[i+1][j])
            &&(myArr[i+1][j]===myArr[i+2][j])
            ||(myArr[i][j]===myArr[i+1][j+1])
            &&(myArr[i+1][j+1]===myArr[i+2][j+2])){
              getResult(myArr[i][j]);
              break;
          }

        }
        catch{
          //console.log('in catch');
          continue;

        }
      }
    }
  }


  function updateTurn(turn :string){
   
    playerTurn !=null
      ?playerTurn.innerHTML = `${turn} &nbsp; Turn `
      :'';
   
}


function getResult(turn :string){

  playerTurn !=null
      ?playerTurn.innerHTML = `${turn} &nbsp; WON`
      :'';

  gridItems.forEach((box)=>{
    
    //key method takes key as arguments
    const boundEventHandle = eventHandlers.get(box);

    //removing the event listerner of click from the box
    if(boundEventHandle){
      box.removeEventListener('click',boundEventHandle);
    }
    
  });
    
  
}