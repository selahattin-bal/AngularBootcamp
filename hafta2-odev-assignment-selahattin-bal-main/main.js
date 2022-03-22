let stock={lettuce:5,
    pickle:5,
    packetSauce:5,
    onion:5,
    tomato:51,
    bread:5,
    potato:5,
    cola:5,
    chicken:5,
    burger:5}
let info=document.getElementById("info")
let cook=0

//let ingredients=prompt("İstediğiniz ürünleri tuşlayın\n1.Marul\n2.Turşu\n3.Soğan\n4.Domates") gibi sipariş alınabilirdi ancak ekmek hepsinden önce kesin biteceği için bu durumda yapmadım ama eklenmesi güzel olur.

// Et seçimi kısmı
function meatSelection(){
    let meat=prompt("1.Tavuk 2.Köfte")
    if(meat==1){
    stock.chicken--
    info.innerText="Tavuk seçildi. Hazırlanıyor"
    }

    else if(meat==2){
    stock.burger--
    info.innerText="Köfte seçildi. Hazırlanıyor"
    cook=prompt("Hangi Ayarda Pişsin. \n 1.Az Pişmiş\n 2.Orta Pişmiş\n3.Çok Pişmiş")
    }
    else if(meat!==2 && meat!==1){
    info.innerText="Hatalı bir veri girdiniz."
    }
}

//cook=0 refereans değer alındı yani 1-2-3 girilmediyse tavuk seçilmiş oluyor.
// Promise'lede aynı işlem yapılabilirdi.Ancak daha güzel göründüğü ve aynı işi yaptığı için bu yazım seçildi. Burda await konularak sonraki aşamaya geçmesi engellendi. Eğer yazılmazsa direk en alttaki await resolve kabul ediyor ve if'lerdeki timeoutları beklemeden atlama yapıyor.

async function cooking(){
   if(cook==0){
   await  order(()=>{console.log("Tavuk pişti.")},3000)
   }
   else if(cook==1){
    await order(()=>console.log("Az pişmiş hazır."),2000)
   }
   else if(cook==2){
    await order(()=>console.log("Orta pişmiş hazır."),3000)
   }
   else if(cook==3){
    await order(()=>console.log("Çok pişmiş hazır."),4000)
   }
}

// async await promise istediği için temel timeout promise'i olarak bu kullanıldı. Sadece console'a belli sürelerde belli şey yazdırmak için kullanıldı.
let order=(work,time)=>{
    return new Promise((resolve)=>{
       return setTimeout(()=>{
         resolve(work())
        },time)
    }
    )
}
let stockCheck=()=>{
    return new Promise((resolve,reject)=>{
        if(Object.values(stock).every((element) => element > 0)){
            setTimeout(()=>{
                resolve(console.log("2.stok kontrolü yapıldı."))
            },3000)
        }
        else{
            reject(info.innerText="Stokta yeterli ürün yok")
        }
    })	
}


// Sıra await ile sağlandı. Aynı anda çalışması gerekmeyenelerin başına await konmadı bu sayede aynı anda başlamış oldular. Eklendikce malzemeler stock' dan silindi.
async function tasks(){
    await order(()=>{console.log("1.sipariş alındı.")},1000)
    await stockCheck() 
    await order(meatSelection,1000)
    order(()=>{stock.potato--,console.log("4.patatesler hazır.")},5000)
    order(()=>{stock.cola--,console.log("5.içecekler hazır.")},2000)
    await cooking()
    await order(()=>{stock.bread--, console.log("3.1 hamburger hazır.")},2000)
    await order(()=>{stock.packetSauce--, console.log("6.soslar ve ürünler servis tepsisine koyuldu.")},1000)
    order(()=>{console.log("7.müşteriye servis edildi.")},1000)
}
tasks()