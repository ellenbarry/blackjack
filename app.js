let shuffledCards = []
let orderedCards = []
let hand = []
let dealersHand = []
let sum =0
let dSum= 0

document.getElementById("another").addEventListener("click", () =>{
    sum=0;
    giveCard(shuffledCards)
    showHand(hand)
    checkContinue(hand)
})

document.getElementById("start").addEventListener("click", () =>{
    document.getElementById("start").disabled=true;
    console.log(populateOrderedCards(orderedCards));
    shuffleCards(orderedCards,shuffledCards)
    giveCard(shuffledCards,hand)
    // hand.push([1,"Spades"])
    giveCard(shuffledCards,hand)
    showHand(hand)
    // displayCards(hand)
    checkContinue(hand)
})
document.getElementById("reset").addEventListener("click", () =>{
    // document.getElementById("bottom").innerHTML = "";
    // document.getElementById("dealersCards").innerHTML = "";
    // document.getElementById("middle").innerHTML = "";
    
    // document.getElementById("middle").appendChild(document.getElementById("start"));
    // document.getElementById("middle").appendChild(document.getElementById("another"));
    // document.getElementById("middle").appendChild(document.getElementById("stand"));
    // shuffledCards = []
    // orderedCards = []
    // hand = []
    // dealersHand = []
    // sum =0
    // dSum= 0
    // document.getElementById("start").disabled=false;
    window.location.reload(false); 
})

document.getElementById("stand").addEventListener("click", () =>{
    giveDealerCard(shuffledCards,dealersHand)
    console.log(dealersHand[0], dealersHand[1])
    dSum = checkDealerSum(dealersHand)
    repeat(dealersHand,dSum,shuffledCards)
})
function giveDealerCard(shuffledCards,dealersHand){
    dealersHand.push(shuffledCards.pop())
    displayDealersCards(dealersHand)
}

function repeat(dealersHand,dSum,shuffledCards){
    let again=checkAnother(dSum)
    console.log(again)
    if(again==true){
        giveDealerCard(shuffledCards,dealersHand)
        dSum = checkDealerSum(dealersHand)
        repeat(dealersHand,dSum,shuffledCards)
    }else{
        if(dSum>21){
            dSum="bust"
        }
        checkWhoWon(dSum,sum)
    }
}

function checkWhoWon(dSum,sum){
    console.log(`dealer  ${dSum} and you ${sum}`)
    if((sum=="bust")&&(dSum=="bust")){
        document.getElementById("middle").innerHTML = "You and the Dealer both went Bust";
    }else if(sum=="bust"){
        document.getElementById("middle").innerHTML = "Dealer Wins, You went Bust";
    }else if(dSum=="bust"){
        document.getElementById("middle").innerHTML = "Dealer went Bust, You Win";
    }else if(dSum>sum){
        document.getElementById("middle").innerHTML = `Dealer got ${dSum} and You got ${sum}, so Dealer Won`;
    }else if(dSum<sum){
        document.getElementById("middle").innerHTML =`Dealer got ${dSum} and You got ${sum}, so You Won`;
    }else{
        document.getElementById("middle").innerHTML = `Dealer got ${dSum} and You got ${sum}, so it's a Tie`;
    }
}
function checkDealerSum(dealersHand){
    dSum=0
    for (let i=0;i<dealersHand.length;i++){
        console.log(`hand digit is ${dealersHand[i][0]}`)
        if(dealersHand[i][0]>10){
            dSum+=10
        }else if(dealersHand[i][0]==1){
            dSum +=11
        }else{
            dSum +=dealersHand[i][0]
        }
    }
    dSum = checkChangeDealerAce(dealersHand,dSum)
    return dSum
}

function checkChangeDealerAce(dealersHand,dSum){
    for (let i=0;i<dealersHand.length;i++){
        console.log(`in change dealer ace dSum is ${dSum} and current card is ${dealersHand[i][0]}`)
        if((dSum>21)&&(dealersHand[i][0]==1)){
            dSum-=10
        }
    }return dSum;
}

function checkAnother(dSum){
    console.log(dSum)
    if(dSum>21){
        return false;
    }else if(dSum>=17){
        return false;
    }else{
        return true;
    }
}

function showHand(hand){
    console.log("hand:")
    for(let i=0;i<hand.length;i++){
        console.log(hand[i])
    }
    console.log(hand.length)
}

function won(){
    console.log("you got a blackjack your cards added to 21")
    document.getElementById("stand").click();
}
function bust(){
    console.log("you went bust your cards added to more than 21")
    sum="bust"
    document.getElementById("stand").click();
}

function checkContinue(hand){
    console.log(`the sum here is ${sum}`)
    sum = checkSum(hand)
    console.log(sum)
    if(sum==21){
        won()
    }else if(sum>21){
        bust()
    }
}
function checkSum(hand){
    for (let i=0;i<hand.length;i++){
        if(hand[i][0]>10){
            sum+=10
        }else if(hand[i][0]==1){
            sum+=11
        }else{
            sum +=hand[i][0]
        }
    }
    sum =checkChangeAce(hand,sum)
    return sum
}

function checkChangeAce(hand,sum){
    console.log(`checking to change ace sum is ${sum}`)
    for (let i=0;i<hand.length;i++){
        if((sum>21)&&(hand[i][0]==1)){
            sum-=10
        }
    }return sum
}

function giveCard(shuffledCards){
    hand.push(shuffledCards.pop()) 
    displayCards(hand)
}

function shuffleCards(orderedCards,shuffledCards){
    for(let i=0;i<52;i++){
        num = Math.floor(Math.random()*orderedCards.length)
        shuffledCards[i]=orderedCards[num]
        orderedCards.splice(num,1)
    }
}


function populateOrderedCards(orderedCards){
    for(let i=0;i<13;i++){
        orderedCards[i]=[i+1,"Spades"]
        orderedCards[i+13]=[i+1,"Diamonds"]
        orderedCards[i+26]=[i+1,"Clubs"]
        orderedCards[i+39]=[i+1,"Hearts"]
    }
    return orderedCards;
}


function displayCards(h){
    console.log(`h.length is ${h.length}`)
    if(h[h.length-1][1]=="Spades"){
        if(h[h.length-1][0]==1){
            document.getElementById("bottom").innerHTML += "<img src='spades/Aspades.png'>"
        }else if(h[h.length-1][0]==2){
            document.getElementById("bottom").innerHTML += "<img src='spades/2spades.png'>"
        }else if(h[h.length-1][0]==3){
            document.getElementById("bottom").innerHTML += "<img src='spades/3spades.png'>"
        }else if(h[h.length-1][0]==4){
            document.getElementById("bottom").innerHTML += "<img src='spades/4spades.png'>"
        }else if(h[h.length-1][0]==5){
            document.getElementById("bottom").innerHTML += "<img src='spades/5spades.png'>"
        }else if(h[h.length-1][0]==6){
            document.getElementById("bottom").innerHTML += "<img src='spades/6spades.png'>"
        }else if(h[h.length-1][0]==7){
            document.getElementById("bottom").innerHTML += "<img src='spades/7spades.png'>"
        }else if(h[h.length-1][0]==8){
            document.getElementById("bottom").innerHTML += "<img src='spades/8spades.png'>"
        }else if(h[h.length-1][0]==9){
            document.getElementById("bottom").innerHTML += "<img src='spades/9spades.png'>"
        }else if(h[h.length-1][0]==10){
            document.getElementById("bottom").innerHTML += "<img src='spades/10spades.png'>"
        }else if(h[h.length-1][0]==11){
            document.getElementById("bottom").innerHTML += "<img src='spades/Jspades.jpg'>"
        }else if(h[h.length-1][0]==12){
            document.getElementById("bottom").innerHTML += "<img src='spades/Qspades.jpg'>"
        }else if(h[h.length-1][0]==13){
            document.getElementById("bottom").innerHTML += "<img src='spades/Kspades.png'>"
        }  
    }else if(h[h.length-1][1]=="Hearts"){
        if(h[h.length-1][0]==1){
            document.getElementById("bottom").innerHTML += "<img src='hearts/Ahearts.png'>"
        }else if(h[h.length-1][0]==2){
            document.getElementById("bottom").innerHTML += "<img src='hearts/2hearts.png'>"
        }else if(h[h.length-1][0]==3){
            document.getElementById("bottom").innerHTML += "<img src='hearts/3hearts.png'>"
        }else if(h[h.length-1][0]==4){
            document.getElementById("bottom").innerHTML += "<img src='hearts/4hearts.jpg'>"
        }else if(h[h.length-1][0]==5){
            document.getElementById("bottom").innerHTML += "<img src='hearts/5hearts.png'>"
        }else if(h[h.length-1][0]==6){
            document.getElementById("bottom").innerHTML += "<img src='hearts/6hearts.png'>"
        }else if(h[h.length-1][0]==7){
            document.getElementById("bottom").innerHTML += "<img src='hearts/7hearts.jpg'>"
        }else if(h[h.length-1][0]==8){
            document.getElementById("bottom").innerHTML += "<img src='hearts/8hearts.png'>"
        }else if(h[h.length-1][0]==9){
            document.getElementById("bottom").innerHTML += "<img src='hearts/9hearts.jpg'>"
        }else if(h[h.length-1][0]==10){
            document.getElementById("bottom").innerHTML += "<img src='hearts/10hearts.png'>"
        }else if(h[h.length-1][0]==11){
            document.getElementById("bottom").innerHTML += "<img src='hearts/Jhearts.jpg'>"
        }else if(h[h.length-1][0]==12){
            document.getElementById("bottom").innerHTML += "<img src='hearts/Qhearts.png'>"
        }else if(h[h.length-1][0]==13){
            document.getElementById("bottom").innerHTML += "<img src='hearts/Khearts.jpg'>"
        }
    }else if(h[h.length-1][1]=="Diamonds"){
        if(h[h.length-1][0]==1){
            document.getElementById("bottom").innerHTML += "<img src='diamonds/Adiamonds.png'>"
        }else if(h[h.length-1][0]==2){
            document.getElementById("bottom").innerHTML += "<img src='diamonds/2diamonds.png'>"
        }else if(h[h.length-1][0]==3){
            document.getElementById("bottom").innerHTML += "<img src='diamonds/3diamonds.png'>"
        }else if(h[h.length-1][0]==4){
            document.getElementById("bottom").innerHTML += "<img src='diamonds/4diamonds.png'>"
        }else if(h[h.length-1][0]==5){
            document.getElementById("bottom").innerHTML += "<img src='diamonds/5diamonds.png'>"
        }else if(h[h.length-1][0]==6){
            document.getElementById("bottom").innerHTML += "<img src='diamonds/6diamonds.png'>"
        }else if(h[h.length-1][0]==7){
            document.getElementById("bottom").innerHTML += "<img src='diamonds/7diamonds.jpg'>"
        }else if(h[h.length-1][0]==8){
            document.getElementById("bottom").innerHTML += "<img src='diamonds/8diamonds.png'>"
        }else if(h[h.length-1][0]==9){
            document.getElementById("bottom").innerHTML += "<img src='diamonds/9diamonds.png'>"
        }else if(h[h.length-1][0]==10){
            document.getElementById("bottom").innerHTML += "<img src='diamonds/10diamonds.png'>"
        }else if(h[h.length-1][0]==11){
            document.getElementById("bottom").innerHTML += "<img src='diamonds/Jdiamonds.jpg'>"
        }else if(h[h.length-1][0]==12){
            document.getElementById("bottom").innerHTML += "<img src='diamonds/Qdiamonds.jpg'>"
        }else if(h[h.length-1][0]==13){
            document.getElementById("bottom").innerHTML += "<img src='diamonds/Kdiamonds.jpg'>"
        }
    }else{
        if(h[h.length-1][0]==1){
            document.getElementById("bottom").innerHTML += "<img src='clubs/Aclubs.jpg'>"
        }else if(h[h.length-1][0]==2){
            document.getElementById("bottom").innerHTML += "<img src='clubs/2clubs.png'>"
        }else if(h[h.length-1][0]==3){
            document.getElementById("bottom").innerHTML += "<img src='clubs/3clubs.png'>"
        }else if(h[h.length-1][0]==4){
            document.getElementById("bottom").innerHTML += "<img src='clubs/4clubs.png'>"
        }else if(h[h.length-1][0]==5){
            document.getElementById("bottom").innerHTML += "<img src='clubs/5clubs.png'>"
        }else if(h[h.length-1][0]==6){
            document.getElementById("bottom").innerHTML += "<img src='clubs/6clubs.png'>"
        }else if(h[h.length-1][0]==7){
            document.getElementById("bottom").innerHTML += "<img src='clubs/7clubs.png'>"
        }else if(h[h.length-1][0]==8){
            document.getElementById("bottom").innerHTML += "<img src='clubs/8clubs.png'>"
        }else if(h[h.length-1][0]==9){
            document.getElementById("bottom").innerHTML += "<img src='clubs/9clubs.png'>"
        }else if(h[h.length-1][0]==10){
            document.getElementById("bottom").innerHTML += "<img src='clubs/10clubs.png'>"
        }else if(h[h.length-1][0]==11){
            document.getElementById("bottom").innerHTML += "<img src='clubs/Jclubs.jpg'>"
        }else if(h[h.length-1][0]==12){
            document.getElementById("bottom").innerHTML += "<img src='clubs/Qclubs.jpg'>"
        }else if(h[h.length-1][0]==13){
            document.getElementById("bottom").innerHTML += "<img src='clubs/Kclubs.png'>"
        }
    }
    
}

function displayDealersCards(h){
    console.log(`h.length is ${h.length}`)
    if(h[h.length-1][1]=="Spades"){
        if(h[h.length-1][0]==1){
            document.getElementById("dealersCards").innerHTML += "<img src='spades/Aspades.png'>"
        }else if(h[h.length-1][0]==2){
            document.getElementById("dealersCards").innerHTML += "<img src='spades/2spades.png'>"
        }else if(h[h.length-1][0]==3){
            document.getElementById("dealersCards").innerHTML += "<img src='spades/3spades.png'>"
        }else if(h[h.length-1][0]==4){
            document.getElementById("dealersCards").innerHTML += "<img src='spades/4spades.png'>"
        }else if(h[h.length-1][0]==5){
            document.getElementById("dealersCards").innerHTML += "<img src='spades/5spades.png'>"
        }else if(h[h.length-1][0]==6){
            document.getElementById("dealersCards").innerHTML += "<img src='spades/6spades.png'>"
        }else if(h[h.length-1][0]==7){
            document.getElementById("dealersCards").innerHTML += "<img src='spades/7spades.png'>"
        }else if(h[h.length-1][0]==8){
            document.getElementById("dealersCards").innerHTML += "<img src='spades/8spades.png'>"
        }else if(h[h.length-1][0]==9){
            document.getElementById("dealersCards").innerHTML += "<img src='spades/9spades.png'>"
        }else if(h[h.length-1][0]==10){
            document.getElementById("dealersCards").innerHTML += "<img src='spades/10spades.png'>"
        }else if(h[h.length-1][0]==11){
            document.getElementById("dealersCards").innerHTML += "<img src='spades/Jspades.jpg'>"
        }else if(h[h.length-1][0]==12){
            document.getElementById("dealersCards").innerHTML += "<img src='spades/Qspades.jpg'>"
        }else if(h[h.length-1][0]==13){
            document.getElementById("dealersCards").innerHTML += "<img src='spades/Kspades.png'>"
        }  
    }else if(h[h.length-1][1]=="Hearts"){
        if(h[h.length-1][0]==1){
            document.getElementById("dealersCards").innerHTML += "<img src='hearts/Ahearts.png'>"
        }else if(h[h.length-1][0]==2){
            document.getElementById("dealersCards").innerHTML += "<img src='hearts/2hearts.png'>"
        }else if(h[h.length-1][0]==3){
            document.getElementById("dealersCards").innerHTML += "<img src='hearts/3hearts.png'>"
        }else if(h[h.length-1][0]==4){
            document.getElementById("dealersCards").innerHTML += "<img src='hearts/4hearts.jpg'>"
        }else if(h[h.length-1][0]==5){
            document.getElementById("dealersCards").innerHTML += "<img src='hearts/5hearts.png'>"
        }else if(h[h.length-1][0]==6){
            document.getElementById("dealersCards").innerHTML += "<img src='hearts/6hearts.png'>"
        }else if(h[h.length-1][0]==7){
            document.getElementById("dealersCards").innerHTML += "<img src='hearts/7hearts.jpg'>"
        }else if(h[h.length-1][0]==8){
            document.getElementById("dealersCards").innerHTML += "<img src='hearts/8hearts.png'>"
        }else if(h[h.length-1][0]==9){
            document.getElementById("dealersCards").innerHTML += "<img src='hearts/9hearts.jpg'>"
        }else if(h[h.length-1][0]==10){
            document.getElementById("dealersCards").innerHTML += "<img src='hearts/10hearts.png'>"
        }else if(h[h.length-1][0]==11){
            document.getElementById("dealersCards").innerHTML += "<img src='hearts/Jhearts.jpg'>"
        }else if(h[h.length-1][0]==12){
            document.getElementById("dealersCards").innerHTML += "<img src='hearts/Qhearts.png'>"
        }else if(h[h.length-1][0]==13){
            document.getElementById("dealersCards").innerHTML += "<img src='hearts/Khearts.jpg'>"
        }
    }else if(h[h.length-1][1]=="Diamonds"){
        if(h[h.length-1][0]==1){
            document.getElementById("dealersCards").innerHTML += "<img src='diamonds/Adiamonds.png'>"
        }else if(h[h.length-1][0]==2){
            document.getElementById("dealersCards").innerHTML += "<img src='diamonds/2diamonds.png'>"
        }else if(h[h.length-1][0]==3){
            document.getElementById("dealersCards").innerHTML += "<img src='diamonds/3diamonds.png'>"
        }else if(h[h.length-1][0]==4){
            document.getElementById("dealersCards").innerHTML += "<img src='diamonds/4diamonds.png'>"
        }else if(h[h.length-1][0]==5){
            document.getElementById("dealersCards").innerHTML += "<img src='diamonds/5diamonds.png'>"
        }else if(h[h.length-1][0]==6){
            document.getElementById("dealersCards").innerHTML += "<img src='diamonds/6diamonds.png'>"
        }else if(h[h.length-1][0]==7){
            document.getElementById("dealersCards").innerHTML += "<img src='diamonds/7diamonds.jpg'>"
        }else if(h[h.length-1][0]==8){
            document.getElementById("dealersCards").innerHTML += "<img src='diamonds/8diamonds.png'>"
        }else if(h[h.length-1][0]==9){
            document.getElementById("dealersCards").innerHTML += "<img src='diamonds/9diamonds.png'>"
        }else if(h[h.length-1][0]==10){
            document.getElementById("dealersCards").innerHTML += "<img src='diamonds/10diamonds.png'>"
        }else if(h[h.length-1][0]==11){
            document.getElementById("dealersCards").innerHTML += "<img src='diamonds/Jdiamonds.jpg'>"
        }else if(h[h.length-1][0]==12){
            document.getElementById("dealersCards").innerHTML += "<img src='diamonds/Qdiamonds.jpg'>"
        }else if(h[h.length-1][0]==13){
            document.getElementById("dealersCards").innerHTML += "<img src='diamonds/Kdiamonds.jpg'>"
        }
    }else{
        if(h[h.length-1][0]==1){
            document.getElementById("dealersCards").innerHTML += "<img src='clubs/Aclubs.jpg'>"
        }else if(h[h.length-1][0]==2){
            document.getElementById("dealersCards").innerHTML += "<img src='clubs/2clubs.png'>"
        }else if(h[h.length-1][0]==3){
            document.getElementById("dealersCards").innerHTML += "<img src='clubs/3clubs.png'>"
        }else if(h[h.length-1][0]==4){
            document.getElementById("dealersCards").innerHTML += "<img src='clubs/4clubs.png'>"
        }else if(h[h.length-1][0]==5){
            document.getElementById("dealersCards").innerHTML += "<img src='clubs/5clubs.png'>"
        }else if(h[h.length-1][0]==6){
            document.getElementById("dealersCards").innerHTML += "<img src='clubs/6clubs.png'>"
        }else if(h[h.length-1][0]==7){
            document.getElementById("dealersCards").innerHTML += "<img src='clubs/7clubs.png'>"
        }else if(h[h.length-1][0]==8){
            document.getElementById("dealersCards").innerHTML += "<img src='clubs/8clubs.png'>"
        }else if(h[h.length-1][0]==9){
            document.getElementById("dealersCards").innerHTML += "<img src='clubs/9clubs.png'>"
        }else if(h[h.length-1][0]==10){
            document.getElementById("dealersCards").innerHTML += "<img src='clubs/10clubs.png'>"
        }else if(h[h.length-1][0]==11){
            document.getElementById("dealersCards").innerHTML += "<img src='clubs/Jclubs.jpg'>"
        }else if(h[h.length-1][0]==12){
            document.getElementById("dealersCards").innerHTML += "<img src='clubs/Qclubs.jpg'>"
        }else if(h[h.length-1][0]==13){
            document.getElementById("dealersCards").innerHTML += "<img src='clubs/Kclubs.png'>"
        }
    }
    
}