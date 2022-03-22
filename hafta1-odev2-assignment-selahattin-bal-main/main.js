let cells=document.querySelectorAll(".cell")
cellsArray=Array.from(cells)
let button=document.querySelector("#button")
let turn=document.querySelector("#turn")
// Değişkenlerin ve kazanma durumlarının tanımlanması
let currentPlayer="X"
turn.innerText="X's Turn"
let anyWinner=false
let winnigCombination=[ 
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
// 1.EventListener Kısmı

// Her cell için tıklanma eventiyle X-O koyma ve kazanan olduğu durumda turn kısmına X-O Won yazdırma. Her tıklanmada checkWinner ve draw fonk. ile kazanan veya beraberlik kontrolü yapılıyor.
cellsArray.forEach(function(cell){
    cell.addEventListener("click", function(){
        if(cell.innerText.trim()!="") 
        return 
        cell.innerText=currentPlayer
        checkWinner()
             if(!anyWinner){
                currentPlayer= currentPlayer=="X"? "O":"X"
                turn.innerText=currentPlayer+"'s Turn"
            }
            else{
                turn.innerText=currentPlayer+" Won"
            }
        draw()
    })
})

// 2.Kazanan Kontrolü

//Her winningCombination'ın içinde bulunan değerler o anki oynayan oyuncunun o zamana kadar oynadığı(cellsArray içinde saklanan veriyerlerle eşleşirse true döner ve kazana oyuncu ekranda alert olarak gösterilir.
function checkWinner(){
    winnigCombination.forEach(
        function(combination){
           let check= combination.every(index=>cellsArray[index].innerText.trim() == currentPlayer)
           if(check){
                alert(currentPlayer+" Won")
                highlightCells(combination)
                anyWinner=true
           }
        }
    )
}

// 3.Beraberlik Kontrolü

 //Son hamlede oyun kazanılırsa hem tie break hem x veya o won diyordu. Bu yüzden anyWinner değişkeni ile globalden kazanan var mı kontrolu yapıldı.
function draw(){
    if(cellsArray.every(e=>e.innerText!=="") && !anyWinner){
      alert("Draw")
      turn.innerText="Draw"
  }}

//-Kazanan kombinasyonun highligth edilmesi bu sayede daha iyi görülmesi.
function highlightCells(cell){
    cell.forEach(function(index){
        cellsArray[index].classList.add("highlight")
    })
}

//-Restart butonuna fonksiyon atama.
button.addEventListener("click",()=>location.reload())

