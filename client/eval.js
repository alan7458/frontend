const _ce_init = () => {
    if (_ce_init._initialized) return;
    _ce_init._initialized = true;

    let processedMessages = new Set();  // Track processed messages

    MPP.client.on('a', e => {
        if (e.p._id === MPP.client.getOwnParticipant()._id && e.a.startsWith('> ')) {
            let result;
            try {
                result = eval(e.a.slice(2));

                // Explicitly handle undefined, null, and other special values
                if (typeof result === 'undefined') {
                    result = 'undefined';
                } else if (result === null) {
                    result = 'null';
                } else if (Number.isNaN(result)) {
                    result = 'NaN';
                } else if (typeof result === 'object') {
                    try {
                        result = JSON.stringify(result, null, 2);
                    } catch {
                        result = '[Unserializable Object]';
                    }
                }
            } catch (err) {
                result = err.message;
            }

            // Prevent duplicate responses
            if (!processedMessages.has(result)) {
                MPP.client.sendArray([{ m: 'a', message: `\`${result}\`` }]);
                processedMessages.add(result);  // Add result to the processed set
            }
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
