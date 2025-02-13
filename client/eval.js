const _ce_init = () => {
    MPP.client.on('a', e => {
        if (e.p._id === MPP.client.getOwnParticipant()._id && e.a.startsWith('> ')) {
            let result;
            try {
                result = eval(e.a.slice(2));
                if (typeof result === 'object' && result !== null) {
                    result = JSON.stringify(result, (key, value) => 
                        typeof value === 'object' && value !== null ? value : value, 2);
                }
            } catch (err) {
                result = err.message;
            }
            
            MPP.client.sendArray([{ m: 'a', message: `\`${result.toString()}\`` }]);
        }
    });
};

const _ce_mppExists = () => {
    if (typeof MPP === 'undefined') {
        requestAnimationFrame(_ce_mppExists);
    } else {
        _ce_init();
    }
};

requestAnimationFrame(_ce_mppExists);
