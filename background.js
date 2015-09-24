/**
 * Created by Chopin on 9/15/2015.
 */
// React when a browser action's icon is clicked.
chrome.browserAction.onClicked.addListener(function(tab) {
    console.log("CY: onClicked called");
    var viewTabUrl = chrome.extension.getURL('image.html');
    var imageUrl = "CookieDough.png"/* an image's URL */;
    var imageUrl2 = "CookieDough2.png";

    // Look through all the pages in this extension to find one we can use.
    var views = chrome.extension.getViews();
    for (var i = 0; i < views.length; i++) {
        var view = views[i];

        // If this view has the right URL and hasn't been used yet...
        if (view.location.href == viewTabUrl )
        {
            if (view.imageAlreadySet == true) {
                // ...call one of its functions and set a property.
                view.setImageUrl(imageUrl2);
                view.imageAlreadySet = false;
            } else{ // reset it
                view.setImageUrl(imageUrl);
                view.imageAlreadySet = true;
            }
            break;
        }
    }
});

chrome.runtime.onMessage.addListener(function(message, rawSender, sendResponse)
{
    console.log("CY: runtime onMessage called");
})

chrome.runtime.onConnect.addListener(function()
{
    console.log("CY: runtime onConnect called");
});

function setImageUrl(url) {
    document.getElementById('target').src = url;
}

chrome.webRequest.onBeforeRequest.addListener(onBeforeRequest,
    // filters
    {
        /*
        urls: [
            "https://i.chzbgr.com/*",
            "https://www.google.com/*",
            "http://www.google.com/*",
            "http://www.excitingland.com/*"
        ]
        */
        urls: ["http://*/*", "https://*/*"]
    },
    // extraInfoSpec
    ["blocking"]);

function onBeforeRequest(info)
{
    console.log("CY: chrome.webRequest.onBeforeRequest intercepted: ", info.url);
    /*

    if (isFrameWhitelisted(page, frame))
        return true;

    var docDomain = extractHostFromFrame(frame);
    var key = getKey(page, frame);
    var filter = defaultMatcher.matchesAny(
        stringifyURL(url),
        RegExpFilter.typeMap[type], docDomain,
        isThirdParty(url, docDomain),
        key
    );

    setTimeout(onBeforeRequestAsync, 0, url, type, page, filter);

    return !(filter instanceof BlockingFilter);
    */
}