EXT = window.EXT || {_initfunc: []};
EXT._initfunc.push(function(){
	var addon = EXT.button = {__proto__: null};
	var injectedStyles = [
		'.notification .csetting { padding: 4px; margin: 4px; background: #ddf; border: 1px solid #f84; }',
		'.notification .csetting:after { content: "USE"; font-size: 10px; line-height: 16px; color: #44a; float: right; }',
		'.notification .connection.csettgl { padding: 4px; margin: 4px; }',
		'.notification .connection.csettgl:after { line-height: 16px; }'
	];
	var Note = function(note, octave) {
		this.note = note;
		this.octave = octave || 0;
	};
	var n = function(a, b) { return {note: new Note(a, b), held: false}; };
	var keyLayouts = {
		Default: {
			65: n("gs"),
			90: n("a"),
			83: n("as"),
			88: n("b"),
			67: n("c", 1),
			70: n("cs", 1),
			86: n("d", 1),
			71: n("ds", 1),
			66: n("e", 1),
			78: n("f", 1),
			74: n("fs", 1),
			77: n("g", 1),
			75: n("gs", 1),
			188: n("a", 1),
			76: n("as", 1),
			190: n("b", 1),
			191: n("c", 2),
			222: n("cs", 2),

			49: n("gs", 1),
			81: n("a", 1),
			50: n("as", 1),
			87: n("b", 1),
			69: n("c", 2),
			52: n("cs", 2),
			82: n("d", 2),
			53: n("ds", 2),
			84: n("e", 2),
			89: n("f", 2),
			55: n("fs", 2),
			85: n("g", 2),
			56: n("gs", 2),
			73: n("a", 2),
			57: n("as", 2),
			79: n("b", 2),
			80: n("c", 3),
			189: n("cs", 3),
			219: n("d", 3),
			187: n("ds", 3),
			221: n("e", 3)
		},
		Swedish: {
			90: n("c", 1),
			83: n("cs", 1),
			88: n("d", 1),
			68: n("ds", 1),
			67: n("e", 1),
			86: n("f", 1),
			71: n("fs", 1),
			66: n("g", 1),
			72: n("gs", 1),
			78: n("a", 1),
			74: n("as", 1),
			77: n("b", 1),
			188: n("c", 2),
			76: n("cs", 2),
			190: n("d", 2),
			192: n("ds", 2),
			189: n("e", 2),

			81: n("c", 2),
			50: n("cs", 2),
			87: n("d", 2),
			51: n("ds", 2),
			69: n("e", 2),
			82: n("f", 2),
			53: n("fs", 2),
			84: n("g", 2),
			54: n("gs", 2),
			89: n("a", 2),
			55: n("as", 2),
			85: n("b", 2),
			73: n("c", 3),
			57: n("cs", 3),
			79: n("d", 3),
			48: n("ds", 3),
			80: n("e", 3),
			221: n("f", 3),
			219: n("fs", 3),
			186: n("g", 3)
		}
	};

	function injectCSS(injectedStyles){
		for(index in injectedStyles){
			var style = document.createElement('style');
			style.type = 'text/css';
			style.innerHTML = injectedStyles[index];
			document.getElementsByTagName('head')[0].appendChild(style);
		}
	}
	injectCSS(injectedStyles);

	addon.makeButton = function(name, id, row, column, func){
		var midiDiv = document.getElementById("midi-btn");
		var btncln = midiDiv.cloneNode(true);
		btncln.textContent = name;
		btncln.id = id;
		btncln.onclick = func;
		var style = document.createElement('style');
		style.type = 'text/css';
		var rowpx = 300 + 120 * row;
		var colpx = 4 + 28 * column;
		style.innerHTML = '#' + id + ' { position: absolute; left: ' + rowpx + 'px; top: ' + colpx + 'px; }';
		document.getElementsByTagName('head')[0].appendChild(style);
		document.getElementById("bottom").children[0].appendChild(btncln);
	}
	
	// {section: {title: "Section Title", command: {func: (e) => {return "Function"}, name: "Button name", class: "csetting"}}}
	addon.createList = function(listobj, title, id, target, duration) {
		var div = document.createElement("div");
		var keyLayoutTitle = document.createElement("span");
		keyLayoutTitle.innerHTML = "Keyboard Layout:";
		div.appendChild(keyLayoutTitle);
		var keyLayout = document.createElement("select");
		for (i in keyLayouts) {
			var option = document.createElement("option");
			option.innerHTML = i;
			keyLayout.appendChild(option);
		}
		keyLayout.onchange = function() {
			MPP.piano.key_binding = keyLayouts[this.value];
		};
		div.appendChild(keyLayout);
		for(h1 in listobj){
			var th1 = document.createElement("h1");
			th1.textContent = listobj[h1]['title'];
			var list_ul = document.createElement("ul");
			for(li in listobj[h1]){
				if(typeof listobj[h1][li] !== "object")
					continue;
				var tli = document.createElement("li");
				tli.textContent = listobj[h1][li]['name'];
				if(typeof listobj[h1][li]['class'] === "object")
					for(cls in listobj[h1][li]['class']) tli.classList.add(listobj[h1][li]['class'][cls]);
				else	tli.classList.add(listobj[h1][li]['class']);
				tli.onclick = listobj[h1][li]['func'];
				list_ul.appendChild(tli);
			}
			div.appendChild(th1);
			div.appendChild(list_ul);
		}
		return {"id":id, "title":title,"duration":''+duration,"html":div,"target":target}
	}
	
	
	var settings = {
		piano: {
			title: "Piano",
			perf: {
				func: (cmd) => {
					if(!cmd.srcElement.classList.contains("enabled")){
						MPP.piano.audio.lramp = 0.004;
						MPP.piano.audio.sstop = 0;
						cmd.srcElement.classList.add("enabled");
					} else {
						MPP.piano.audio.lramp = 0.2;
						MPP.piano.audio.sstop = 0.21;
						cmd.srcElement.classList.remove("enabled");
					}
				},
				name: "Performance mode (thx electra)",
				class: ["connection", "csettgl"]
			}
		},
		draw: {
			title: "Drawing",
			enabled: {
				func: (cmd) => {
					if(!cmd.srcElement.classList.contains("enabled")){
                                                MPP.addons.draw.enabled = true;
           					cmd.srcElement.classList.add("enabled");
                                        } else {
                                                MPP.addons.draw.enabled = false;
                                                MPP.addons.draw.ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
                                                cmd.srcElement.classList.remove("enabled");
                                        }
				},
				name: "Drawing enabled",
				class: ["connection", "csettgl", "enabled"]
			},
			clear: {
				func: (cmd) => {
					MPP.addons.draw.lines = [[0,0,0,0,0,0,"#0"]];
				},
				name: "Clear lines",
				class: "csetting"
			}
		}
	};
	var buttonJSON = addon.createList(settings, "Client settings", "clset", "#clset-btn", -1);
	addon.makeButton("Client settings", "clset-btn", 3, 1, ()=>{
		var div = document.getElementById("Notification-clset");
		if(div === null)
			MPP.client.emit("notification", buttonJSON);
		else
			div.children[1].click(); /* closes the notification */
	});
});
