/**
 * @name DisableMatchFoundSound
 * @author menfie
 * @description Disables sounds "sfx-readycheck-ringmagic-accepted-loop" and "sfx-readycheck-sr-portal"
 * @version 0.0.7
 * @link https://github.com/personinblack/Pengu-Disable-Match-Found-Loop-Sound
 */

export async function load() {
    const audioPlugin = await rcp.whenReady("rcp-fe-audio");

    // Hooking all channels' playSound just in case.
    const channelNames = [
        "sfx",
        "sfx-notifications",
        "sfx-ui",
        "sfx-champions",
    ];
    
    const blockedUrls = ["sfx-readycheck-ringmagic-accepted-loop", "sfx-readycheck-sr-portal"];
    
    channelNames.forEach(channelName => {
        const channel = audioPlugin.getChannel(channelName);
        if (channel && channel.playSound) {
            const originalPlaySound = channel.playSound.bind(channel);
            
            channel.playSound = function(url, options, playOptions) {
                if (url && blockedUrls.some(blocked => url.includes(blocked))) {
                    console.log("BLOCKED AUDIO: ", url);
                    return Promise.resolve(null);
                }
                
                return originalPlaySound(url, options, playOptions);
            };
        }
    });
};
