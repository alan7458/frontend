if(window.location.hostname.indexOf("cursors.me") != -1 || window.location.hostname.indexOf("yourworldofpixels.com") != -1)
        window.location.href = "http://www.ourworldofpixels.com/piano";

EXT = window.EXT || {_initfunc: []};
window.onload = function(){
	MPP = MPP || {};
	MPP.addons = EXT;
	for(var x = EXT._initfunc.length; x--;)
		EXT._initfunc[x]();
	EXT.__proto__ = null;
};
