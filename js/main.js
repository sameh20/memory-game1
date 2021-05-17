document.querySelector(".control-buttons span").onclick=function(){
    let yourName = prompt("What is your name ?")
    if(yourName==null || yourName==""){
        document.querySelector(".name span").innerHTML= "Unknown"
    }else{
        document.querySelector(".name span").innerHTML= yourName

    }
    document.querySelector(".control-buttons").remove()
    document.querySelector("#intro").play();
    blocks.forEach(block=>{
        block.classList.add('isflipped')
        setTimeout(() => {
        block.classList.remove('isflipped')
            
        }, 3000);
    })
}
// important variables
let duration = 1000;
let blockscontainers = document.querySelector('.memory-game-blocks');
let blocks=Array.from(blockscontainers.children);

//let orderRange =[...Array(blocks.length).keys()]
let orderRange = Array.from(Array(blocks.length).keys());
shuffle(orderRange)

// make randome range
blocks.forEach((block,index)=>{
    block.style.order=orderRange[index]
    // add eventlistner
    block.addEventListener('click',function(){
        flipBlock(block)
    })
})
// function flipblock
function flipBlock(selectedBlock){
selectedBlock.classList.add('isflipped')
//creat all flibed cards
let allflibedblocks = blocks.filter(flipedBlock => flipedBlock.classList.contains("isflipped"))
if(allflibedblocks.length===2){
stopclicking()
checkMatchedBlocks(allflibedblocks[0],allflibedblocks[1])
}
}
// stop clicking function
function stopclicking(){
    blockscontainers.classList.add("noclicking");
    setTimeout(() => {
    blockscontainers.classList.remove("noclicking");
        
    }, duration);
}
// function matched blocks
function checkMatchedBlocks(firstblock,secondblock){
    let elementtries = document.querySelector(".tries span");
    if(firstblock.dataset.animal===secondblock.dataset.animal){
        firstblock.classList.remove('isflipped')
        secondblock.classList.remove('isflipped')

        firstblock.classList.add('ismatch')
        secondblock.classList.add('ismatch')
        document.getElementById('success').play()

    }else{
        elementtries.innerHTML=parseInt(elementtries.innerHTML)+1
        setTimeout(() => {
            firstblock.classList.remove("isflipped");
            secondblock.classList.remove("isflipped");
      
        }, duration);
        document.getElementById('fail').play()

    }

}
// shuffle function 
 function shuffle(array){
     // seting vars 
     let current = array.length,temp,random;
     while(current>0){
         random = Math.floor(Math.random()*current)
         current--
         // save current element
         temp=array[current]
         array[current]=array[random];
         array[random]=temp;
     }
     return array

 }