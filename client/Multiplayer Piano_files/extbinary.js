/* Binary note data extension, by ming */

EXT = window.EXT || {_initfunc: []};
EXT._initfunc.push(function(){
	var addon = EXT.binnote = {__proto__: null};
	addon.keysarr = Object.keys(MPP.piano.keys);
	addon.nbuf = [];
	addon.nbuft = 0;
	addon.debug = false;
	MPP.client.on("connect", function(){
		MPP.client.ws.binaryType = "arraybuffer";
		clearInterval(MPP.client.noteFlushInterval);
		MPP.client.ws.addEventListener("message", function(a){
			a = a.data;
			if(typeof a === 'string') return;
			var dv = new DataView(a);
			switch(dv.getUint8(0)){
				case 1:
					var msg = {m: 'n', n: []};
					/* number-only ids = easier */
					msg.p = ''+(dv.getUint32(5, true) * Math.pow(2, 32) + dv.getUint32(1, true));
					msg.t = dv.getInt32(13, true) * Math.pow(2, 32) + dv.getInt32(9, true);
					for(var o = 17; o < dv.byteLength; o += 3){
						var n = addon.keysarr[dv.getUint8(o)];
						var v = +(dv.getUint8(o + 1) / 255).toFixed(3);
						var d = dv.getUint8(o + 2);
						if(n){
							if(!v) msg.n.push({n: n, s: 1, d: d});
							else msg.n.push({n: n, v: v, d: d});
						}
					}
					if(msg.n.length)
						MPP.client.emit('n', msg); /* don't break scripts ;-; */
					break;
			}
		});
	});
	addon.flush = function(){
		if(addon.nbuft && addon.nbuf.length){
			var abuf = new ArrayBuffer(addon.nbuf.length * 3 + 9),
			      dv = new DataView(abuf),
			    offs = addon.nbuft + MPP.client.serverTimeOffset,
			      t1 = offs >> 0,
			      t2 = Math.round((offs * Math.pow(2, -32)));
			dv.setUint8(0, 1); /* Message type */
			dv.setInt32(1, t1, true); /* Time, split in two (no setUint64) */
			dv.setInt32(5, t2, true);
			for(var x = addon.nbuf.length; x--;){
				dv.setUint8(x * 3 + 9, addon.nbuf[x].n);
				dv.setUint8(x * 3 + 9 + 1, addon.nbuf[x].v);
				dv.setUint8(x * 3 + 9 + 2, addon.nbuf[x].d);
			}
			addon.nbuf = [];
			addon.nbuft = 0;
			if(addon.debug)
				console.log("Sent " + dv.byteLength + " bytes.");
			MPP.client.ws.send(abuf);
		}
	};
	addon.flushloop = setInterval(addon.flush, 200);
	MPP.client.startNote = function(n, v){
		v = v !== undefined ? (v > 1 ? 1 : v < 0 ? 0 : v) : 0.5;
		n = addon.keysarr.indexOf(n);
		if(MPP.client.isConnected() && n != -1){
			if(!addon.nbuft){
				addon.nbuft = Date.now();
				addon.nbuf.push({n: n, v: ~~(v * 255), d: 0});
			} else {
				var d = Date.now() - addon.nbuft;
				if(d > 255){
					addon.flush();
					addon.nbuft = Date.now();
					d = 0;
					clearInterval(addon.flushloop);
					addon.flushloop = setInterval(addon.flush, 200);
					console.log("Delay too high, flushed notebuffer!");
				}
				addon.nbuf.push({n: n, v: ~~(v * 255), d: d});
			}
		}
	};
	MPP.client.stopNote = function(n){
		n = addon.keysarr.indexOf(n);
		if(MPP.client.isConnected() && n != -1){
			if(!addon.nbuft){
				addon.nbuft = Date.now();
				addon.nbuf.push({n: n, v: 0, d: 0});
			} else {
				var d = Date.now() - addon.nbuft;
				if(d > 255){
					addon.flush();
					addon.nbuft = Date.now();
					d = 0;
					clearInterval(addon.flushloop);
					addon.flushloop = setInterval(addon.flush, 200);
					console.log("Delay too high, flushed notebuffer!");
				}
				addon.nbuf.push({n: n, v: 0, d: d});
			}
		}
	};
});
