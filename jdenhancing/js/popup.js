/*var notification = webkitNotifications.createNotification(
  'l.png',  // icon url - can be relative
  'Hello!',  // notification title
  'Lorem ipsum...'  // notification body text
);*/
var notification = webkitNotifications.createHTMLNotification(
	'notify/notify.html'  // html url - can be relative
);
notification.show();
chrome.tabs.captureVisibleTab(null,function(img){
	document.write("img");
});