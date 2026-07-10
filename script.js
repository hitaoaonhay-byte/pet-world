// =======================
// PET WORLD VERSION 2.0
// PHẦN 1
// =======================

// Dữ liệu người chơi
let playerName = "";
let coin = 0;

let gem = 0;

let level = 1;

let xp = 0;
let food = 100;
// Thời gian
let eggSecond = 7200;   // 2 giờ
let feedSecond = 0;     // Có thể cho ăn ngay
let petType="none";
// Bắt đầu game
function startGame(){

    playerName = document.getElementById("name").value.trim();

    if(playerName==""){

        alert("Vui lòng nhập tên!");

        return;

    }

    document.getElementById("login").style.display="none";

    document.getElementById("game").style.display="block";

    document.getElementById("playerName").innerHTML="👋 Xin chào "+playerName;

  updateScreen();

updateTimer();

}

// Cập nhật giao diện
function updateScreen(){

    document.getElementById("coin").innerHTML=coin;

    document.getElementById("gem").innerHTML=gem;

    document.getElementById("level").innerHTML=level;

    document.getElementById("xp").innerHTML=xp;

    document.getElementById("xpBar").style.width=xp+"%";
document.getElementById("foodBar").style.width=food+"%";

document.getElementById("foodText").innerHTML=food;
}
function feed(){

    if(feedSecond>0){

        alert("⏰ Chưa đến giờ cho ăn!");

        return;

    }

 if(petType=="normal"){

    coin+=1;

}

if(petType=="rare"){

    coin+=3;

}

if(petType=="epic"){

    coin+=8;

}

    xp+=10;

    if(xp>=100){

        xp=0;

        level++;

        alert("🎉 Thú cưng đã lên Level "+level);

    }

    feedSecond=900;
food=100;
    updateScreen();

    saveGame();

    alert("🐾 Thú cưng đã được cho ăn!");

}



// Đồng hồ game
setInterval(function(){

// Đồng hồ cho ăn
if(feedSecond>0){

    feedSecond--;

}

// Chỉ phát triển khi thú không đói
if(feedSecond>0 && eggSecond>0){

    eggSecond--;

}

updateTimer();
if(food>0){

food-=1/60;

}
saveGame();

},1000);
// Cập nhật thời gian
function updateTimer(){

    // Trứng
    let h=Math.floor(eggSecond/3600);

    let m=Math.floor((eggSecond%3600)/60);

    let s=eggSecond%60;

    document.getElementById("eggTime").innerHTML=

    String(h).padStart(2,"0")+":"+

    String(m).padStart(2,"0")+":"+

    String(s).padStart(2,"0");

    // Cho ăn
    let fm=Math.floor(feedSecond/60);

    let fs=feedSecond%60;

    document.getElementById("feedTime").innerHTML=

    String(fm).padStart(2,"0")+":"+

    String(fs).padStart(2,"0");

    // Khóa nút
    document.getElementById("feedBtn").disabled=(feedSecond>0);

    // Nở trứng
if(eggSecond<=0){

if(petType=="normal"){

document.getElementById("pet").innerHTML="🐶";

}

if(petType=="rare"){

document.getElementById("pet").innerHTML="🐱";

}

if(petType=="epic"){

document.getElementById("pet").innerHTML="🐰";

}

document.getElementById("sellBtn").style.display="block";
    
}

}
// =======================
// LƯU GAME
// =======================

function saveGame(){

localStorage.setItem("playerName",playerName);

localStorage.setItem("coin",coin);

localStorage.setItem("gem",gem);

localStorage.setItem("eggSecond",eggSecond);

localStorage.setItem("feedSecond",feedSecond);
localStorage.setItem("petType",petType);
localStorage.setItem("level",level);

localStorage.setItem("xp",xp);
}
// =======================
// TẢI GAME
// =======================

function loadGame(){

if(localStorage.getItem("playerName")==null){

return;

}

playerName=localStorage.getItem("playerName");

coin=parseInt(localStorage.getItem("coin"));

gem=parseInt(localStorage.getItem("gem"));
level=parseInt(localStorage.getItem("level"))||1;

xp=parseInt(localStorage.getItem("xp"))||0;
eggSecond=parseInt(localStorage.getItem("eggSecond"));

feedSecond=parseInt(localStorage.getItem("feedSecond"));
petType=localStorage.getItem("petType")||"normal";
document.getElementById("login").style.display="none";

document.getElementById("game").style.display="block";

document.getElementById("playerName").innerHTML="👋 Xin chào "+playerName;
if(eggSecond>0){

    if(petType=="normal"){

        document.getElementById("pet").innerHTML="🥚";

    }

    if(petType=="rare"){

        document.getElementById("pet").innerHTML="🟢";

    }

    if(petType=="epic"){

        document.getElementById("pet").innerHTML="🔵";

    }

}
updateScreen();

updateTimer();
saveGame();
}
loadGame();
function openShop(){

document.getElementById("shop").style.display="block";

}

function closeShop(){

document.getElementById("shop").style.display="none";

}
function buyEgg(){

if(coin<100){

alert("❌ Không đủ xu!");

return;

}
if(petType!="none"){

alert("❌ Chuồng vẫn còn thú!");

return;

}
coin-=100;

petType="normal";

eggSecond=7200;

document.getElementById("pet").innerHTML="🥚";

updateScreen();

updateTimer();

saveGame();

alert("🥚 Mua trứng thành công!");

closeShop();

}
function buyRareEgg(){

if(coin<500){

alert("❌ Không đủ xu!");

return;

}
if(petType!="none"){

alert("❌ Chuồng vẫn còn thú!");

return;

}
coin-=500;

petType="rare";

eggSecond=7200;

document.getElementById("pet").innerHTML="🟢";

updateScreen();

updateTimer();

saveGame();

alert("🟢 Mua trứng hiếm thành công!");

closeShop();

}
function buyEpicEgg(){

if(coin<2000){

alert("❌ Không đủ xu!");

return;

}
if(petType!="none"){

alert("❌ Chuồng vẫn còn thú!");

return;

}
coin-=2000;

petType="epic";

eggSecond=7200;

document.getElementById("pet").innerHTML="🔵";

updateScreen();

updateTimer();

saveGame();

alert("🔵 Mua trứng sử thi thành công!");

closeShop();

}
function sellPet(){

if(eggSecond>0){

alert("🥚 Trứng chưa nở!");

return;

}

let money=0;

if(petType=="normal"){

money=150;

}

if(petType=="rare"){

money=500;

}

if(petType=="epic"){

money=2000;

}

coin+=money;

// Chuồng trống
petType="none";

eggSecond=0;

document.getElementById("pet").innerHTML="📦";

document.getElementById("sellBtn").style.display="none";

updateScreen();

saveGame();

alert("💰 Bạn đã bán thú và nhận "+money+" xu!");

}
function openMore(){

document.getElementById("moreMenu").style.display="block";

}

function closeMore(){

document.getElementById("moreMenu").style.display="none";

}
function openMiniGame(){

alert("🎮 Mini Game đang phát triển!");

}

function openCode(){

document.getElementById("codePanel").style.display="block";

}
function openAdminLogin(){

document.getElementById("adminLogin").style.display="block";

}

function closeAdminLogin(){

document.getElementById("adminLogin").style.display="none";

}
function loginAdmin(){

let key=document.getElementById("adminKey").value;

if(key=="HUNG_ADMIN_2010_ABC123"){

closeAdminLogin();

openAdmin();

}else{

alert("❌ code!");

}

}
function openAdmin(){

document.getElementById("adminPanel").style.display="block";

}

function closeAdmin(){

document.getElementById("adminPanel").style.display="none";

}
function openGiftCode(){

document.getElementById("giftCodePanel").style.display="block";

}

function openWithdrawAdmin(){

let name=localStorage.getItem("withdrawName");

let zalo=localStorage.getItem("withdrawZalo");

let money=localStorage.getItem("withdrawMoney");

if(name==null){

alert("📭 Chưa có yêu cầu rút tiền!");

return;

}

document.getElementById("withdrawAdminName").innerHTML=name;

document.getElementById("withdrawAdminZalo").innerHTML=zalo;

document.getElementById("withdrawAdminMoney").innerHTML=money;

document.getElementById("withdrawAdminPanel").style.display="block";

}
function closeGiftCode(){

document.getElementById("giftCodePanel").style.display="none";

}
setInterval(function(){

let moneyInput=document.getElementById("giftMoney");
let amountInput=document.getElementById("giftAmount");
let each=document.getElementById("giftEach");

if(!moneyInput || !amountInput || !each){

return;

}

let money=parseInt(moneyInput.value)||0;

let amount=parseInt(amountInput.value)||1;

each.innerHTML=Math.floor(money/amount);

},300);
function createGiftCode(){

let code=document.getElementById("giftCode").value.trim();

let money=parseInt(document.getElementById("giftMoney").value)||0;

let amount=parseInt(document.getElementById("giftAmount").value)||0;

if(code==""){

alert("❌ Chưa nhập mã Code!");

return;

}

if(money<=0){

alert("❌ Chưa nhập tổng tiền!");

return;

}

if(amount<=0){

alert("❌ Chưa nhập số lượng!");

return;

}

let each=Math.floor(money/amount);

// Lưu Code
localStorage.setItem("giftCode",code);

// Tổng tiền
localStorage.setItem("giftMoney",money);

// Số lượng ban đầu
localStorage.setItem("giftAmount",amount);

// Số lượt còn lại
localStorage.setItem("giftLeft",amount);

// Tiền mỗi người nhận
localStorage.setItem("giftEach",each);

alert("✅ Đã tạo Gift Code thành công!");

closeGiftCode();

}
function closeCode(){

document.getElementById("codePanel").style.display="none";

}
function useGiftCode(){

let code=document.getElementById("giftInput").value.trim();

if(code==""){

alert("❌ Vui lòng nhập mã!");

return;

}

let giftCode=localStorage.getItem("giftCode");

let giftLeft=parseInt(localStorage.getItem("giftLeft"))||0;

let giftEach=parseInt(localStorage.getItem("giftEach"))||0;
let usedCode=localStorage.getItem("usedCode");
if(code!=giftCode){

alert("❌ Mã Code không đúng!");
if(usedCode==giftCode){

alert("❌ Bạn đã sử dụng Gift Code này rồi!");

return;

}
return;

}

if(giftLeft<=0){

alert("❌ Gift Code đã hết lượt!");

return;

}

coin+=giftEach;

giftLeft--;

localStorage.setItem("giftLeft",giftLeft);
localStorage.setItem("usedCode",giftCode);
updateScreen();

saveGame();

alert("🎉 Nhận thành công "+giftEach+" xu!");

closeCode();

}
function openWithdraw(){

document.getElementById("withdrawPanel").style.display="block";

}

function closeWithdraw(){

document.getElementById("withdrawPanel").style.display="none";

}
function sendWithdraw(){

let name=document.getElementById("withdrawName").value.trim();

let zalo=document.getElementById("withdrawZalo").value.trim();

let money=parseInt(document.getElementById("withdrawCoin").value)||0;

if(name==""){

alert("❌ Nhập họ tên!");

return;

}

if(zalo==""){

alert("❌ Nhập số ZaloPay!");

return;

}

if(money<2000){

alert("❌ Rút tối thiểu 2000 xu!");

return;

}

if(coin<money){

alert("❌ Không đủ xu!");

return;

}

coin-=money;

updateScreen();

saveGame();

localStorage.setItem("withdrawName",name);

localStorage.setItem("withdrawZalo",zalo);

localStorage.setItem("withdrawMoney",money);

alert("✅ Đã gửi yêu cầu rút tiền!");

closeWithdraw();

}
function closeWithdrawAdmin(){

document.getElementById("withdrawAdminPanel").style.display="none";

}

function finishWithdraw(){

localStorage.removeItem("withdrawName");

localStorage.removeItem("withdrawZalo");

localStorage.removeItem("withdrawMoney");

alert("✅ Đã đánh dấu chuyển tiền!");

closeWithdrawAdmin();

}
function openInvite(){

document.getElementById("invitePanel").style.display="block";

let code=localStorage.getItem("inviteCode");

if(code==null){

code=playerName+Math.floor(Math.random()*9000+1000);

localStorage.setItem("inviteCode",code);

}

document.getElementById("myInviteCode").value=code;

}

function closeInvite(){

document.getElementById("invitePanel").style.display="none";

}
function copyInviteCode(){

let code=document.getElementById("myInviteCode");

code.select();

document.execCommand("copy");

alert("📋 Đã sao chép mã giới thiệu!");

}
function watchAd(){

document.getElementById("adPanel").style.display="block";

}
function closeAdPanel(){

document.getElementById("adPanel").style.display="none";

}

function finishAd(){

closeAdPanel();

feed();

}
