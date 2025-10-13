/**
 * @name DisableMatchFoundSound
 * @author menfie
 * @description Disables sounds "sfx-readycheck-ringmagic-accepted-loop" and "sfx-readycheck-sr-portal"
 * @version 0.0.7
 * @link https://github.com/personinblack/Pengu-Disable-Match-Found-Loop-Sound
 */

document.addEventListener("DOMContentLoaded", function () {
    console.log("[Pengu Loader] DisableMatchFoundSound loaded");
    const OriginalXHR = window.XMLHttpRequest;
    window.XMLHttpRequest = function() {
        const xhr = new OriginalXHR();
        const originalOpen = xhr.open;

        xhr.open = function(method, url, ...args) {
            if (url && (url.includes('sfx-readycheck-ringmagic-accepted-loop') || url.includes('sfx-readycheck-sr-portal'))) {
                console.log('BLOCKED AUDIO:', url);

                this.response = null;
                this.status = 0;

                this.send = function() {
                    setTimeout(() => {
                        if (this.onerror) this.onerror({ loaded: 0, total: 0 });
                    }, 0);
                };

                return;
            }

            return originalOpen.apply(this, [method, url, ...args]);
        };

        return xhr;
    };
});
