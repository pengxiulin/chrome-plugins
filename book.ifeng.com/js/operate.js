chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.create({url: "http://v.book.ifeng.com"});
});