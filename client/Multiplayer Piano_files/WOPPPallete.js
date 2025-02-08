let ru = navigator.language.substr(0, 2).toLowerCase() == "ru";
var WOPPPallete = [];
var PObj = function(clr){
	return "<button style='background-color:"+clr+"' onclick='MPP.addons.draw.customColor=`"+clr+"`'><p style='opacity:0'>#</p> <button onclick='removePObject(`"+clr+"`)'>X</button>";
};
var addPObj = function(clr){
	WOPPPallete[PObj(clr)]="clr";
};
var removePObj = function(clr){
	delete WOPPPallete[PObj(clr)];
};
var addPObject = function(clr){
	addPObj(clr);
	document.getElementById('WOPP-Pallete').innerHTML = Object.keys(WOPPPallete);
};
var removePObject = function(clr){
	removePObj(clr);
	document.getElementById('WOPP-Pallete').innerHTML = Object.keys(WOPPPallete);
};

// $("body #bottom .relative").append(`<div id="WOPPPallete" class="ugly-button 2_btn" style="position: fixed;bottom: 8px;right: 220px;width: 110px;">${ru ? "ÐŸÐ°Ð»Ð¸Ñ‚Ñ€Ð°" : "Pallete"}</div>`);
$("body #bottom .relative").append(`<div id="WOPPPallete" class="ugly-button 2_btn" style="position: fixed;bottom: 8px;left: 420px;width: 100px;">${ru ? "ÐŸÐ°Ð»Ð¸Ñ‚Ñ€Ð°" : "Palette"}</div>`);

$("#WOPPPallete").click(function(){
	// MPP.client.emit("notification", {
	// 	title: ru ? "ÐŸÐ°Ð»Ð¸Ñ‚Ñ€Ð°" : "Pallete",
	// 	html:`${ru ? "Ð£ÐºÐ°Ð¶Ð¸Ñ‚Ðµ Ñ†Ð²ÐµÑ‚" : "Choose color"}: <input type='color' id='WOPPdrawclr'> <button id='theclrbtn' onclick='addPObject(document.getElementById(\`WOPPdrawclr\`).value), MPP.addons.draw.customColor=document.getElementById(\`WOPPdrawclr\`).value'>${ru ? "Ð”Ð¾Ð±Ð°Ð²Ð¸Ñ‚ÑŒ Ñ†Ð²ÐµÑ‚" : "Add Color"}</button></br></input> <p id='WOPP-Pallete'></p>`,
	// 	duration:-1,
	// 	target:"#WOPPPallete"
	// }); 
	if (!$('.notification .notification-body .title:contains("Palette")').length) {
		MPP.client.emit("notification", {
			title: ru ? "ÐŸÐ°Ð»Ð¸Ñ‚Ñ€Ð°" : "Palette",
			html:`${ru ? "Ð£ÐºÐ°Ð¶Ð¸Ñ‚Ðµ Ñ†Ð²ÐµÑ‚" : "Choose color"}: <input type='color' id='WOPPdrawclr'> <button id='theclrbtn' onclick='addPObject(document.getElementById(\`WOPPdrawclr\`).value), MPP.addons.draw.customColor=document.getElementById(\`WOPPdrawclr\`).value'>${ru ? "Ð”Ð¾Ð±Ð°Ð²Ð¸Ñ‚ÑŒ Ñ†Ð²ÐµÑ‚" : "Add Color"}</button></br></input> <p id='WOPP-Pallete'></p>`,
			duration:-1,
			target:"#WOPPPallete"
		});
		document.getElementById('WOPP-Pallete').innerHTML = Object.keys(WOPPPallete);
	} else {
		$('.notification > .notification-body .title:contains("Palette")').parent().parent().fadeOut(500, () => {$('.notification > .notification-body .title:contains("Palette")').remove()});
	}
});