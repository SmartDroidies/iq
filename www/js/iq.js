var C_URL = 'http://smartdroidies.com/reasoning/?json=y';

var testDevice = '9ff99ad5ec042ed6';
var analyticsId = 'UA-45773318-4';

// select the right Ad Id according to platform 
var admobid = {};
if( /(android)/i.test(navigator.userAgent) ) { // for android & amazon-fireos 
  platform = 'Android';
  admobid = {
    banner: 'ca-app-pub-4636161670373902/7764116272', 
    interstitial: 'ca-app-pub-4636161670373902/9240849473'
  };
}

//Device Ready Event
document.addEventListener("deviceready", onDeviceReadyAction, false);
function onDeviceReadyAction() {

	window.analytics.startTrackerWithId(analyticsId);

	// Manage Ad
	initializeAd();

	//Initialize for Google Cloud Messaging
	//initializeGCM();
}


/* Ad initialization & display */

function initializeAd() {
  createBanner();
  prepareInter();
}

function createBanner() {
  var testFlag = isTestDevice();

  if(AdMob) AdMob.createBanner( {
    adId: admobid.banner, 
    position: AdMob.AD_POSITION.BOTTOM_CENTER, 
    autoShow: true, 
    isTesting: testFlag  
  } );
}

function prepareInter() {
  var testFlag = isTestDevice();
  if(AdMob) AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:false, isTesting: testFlag} );
}

function isTestDevice() {
    var flgTestDevice = false;
    var deviceUUID = device.uuid;
    if(deviceUUID == testDevice) {
      //console.log("Test Device : " + device.uuid);
      flgTestDevice = true;
    }
    return flgTestDevice;
}

//Load AdMob Interstitial Ad
function showInterstitial() {
  if(interDisplayed > 2) {
    if(AdMob) {
      AdMob.showInterstitial();
      interDisplayed = 0;
    } 
  } else {
    interDisplayed = interDisplayed + 1;
    //console.log("Interstitial Displayed : " + interDisplayed);
  }    
}


function onInterstitialReceive (message) {
    //alert(message.type + " ,you can show it now");
    //admob.showInterstitial();//show it when received
    //setTimeout(showInterstitial, 10 * 1000);
}

function onReceiveFail (message) {
  var msg=admob.Error[message.data];
    if(msg==undefined){
       msg=message.data;
    }
    //console.log("load fail: " + message.type + "  " + msg);
} 
