const _ce_init = () => {
    MPP.client.on('a', e => {
        if (e.p._id === MPP.client.getOwnParticipant()._id && e.a.indexOf("> ") === 0) {
            let thing;
            try {
                thing = eval(e.a.substr(2));
            } catch(err) { thing = err.message.toString() }

            MPP.client.sendArray([{m: "a", message: thing.toString()}]);
        }
    });
}

const _ce_mppExists = time => {
    if (window.MPP === undefined) requestAnimationFrame(_ce_mppExists); else _ce_init();
}

requestAnimationFrame(_ce_mppExists);