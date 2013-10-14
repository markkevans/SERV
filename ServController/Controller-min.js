function initialize(){var e={center:new google.maps.LatLng(51.501974479325135,-.13295898437502274),zoom:10,mapTypeId:google.maps.MapTypeId.ROADMAP};map=new google.maps.Map(document.getElementById("map_canvas"),e);trafficLayer=new google.maps.TrafficLayer;trafficLayer.setMap(map);weatherLayer=new google.maps.weather.WeatherLayer({temperatureUnits:google.maps.weather.TemperatureUnit.CELSIUS})}function showHideTraffic(){if(trafficVisible){trafficLayer.setMap(null)}else{trafficLayer.setMap(map)}trafficVisible=!trafficVisible}function showHideWeather(){if(weatherVisible){weatherLayer.setMap(null)}else{weatherLayer.setMap(map)}weatherVisible=!weatherVisible}function showLoadRouteFile(){$("#routeDialog").dialog("open")}function loadRouteFile(){wayPointMarkers=new Array;wayPoints=new Array;var e=$("#txtRoute").val();var t=e.split("\n");for(var n=0;n<t.length;n++){var r=t[n].trim();if(r!=""){var i=r.split("|");if(i.length>1){var s="00000000"+i[1];var o="00000000"+i[0];s=s.replace("-","");o=o.replace("-","");s=s.substring(0,s.length-5)+"."+s.substring(s.length-5);o=o.substring(0,o.length-5)+"."+o.substring(o.length-5);if(i[1].substring(0,1)=="-"){s="-"+s}if(i[0].substring(0,1)=="-"){o="-"+o}var u=new google.maps.LatLng(s,o);var a=new google.maps.Marker({position:u,icon:pinIcon,draggable:false,title:i[2],map:map,animation:google.maps.Animation.DROP});wayPoints[wayPoints.length]=u;wayPointMarkers[wayPointMarkers.length]=a}}}var e=new google.maps.Polyline({path:wayPoints,strokeColor:"#FF0000",strokeOpacity:1,strokeWeight:2});e.setMap(map);$("#routeDialog").dialog("close")}function showHideLog(){if(logVisible){$("#Calls").slideUp()}else{$("#Calls").slideDown()}logVisible=!logVisible}function showHelp(){$("#helpDialog").dialog("open")}function addPOIs(){addHospital(new google.maps.LatLng(51.3191188,-.7417103000000225),"Frimley Park");addHospital(new google.maps.LatLng(51.24102,-.6074419999999918),"Royal Surrey");addHospital(new google.maps.LatLng(51.4278088,-.17581829999994625),"NBS Tooting");addHospital(new google.maps.LatLng(51.37906839999999,-.5287485000000061),"St Peter's");addHospital(new google.maps.LatLng(51.49790789999999,-.11967070000002877),"St Thomas's");addHospital(new google.maps.LatLng(51.50356,-.08719389999998839),"Guy's");addHospital(new google.maps.LatLng(51.2196498,-.16349900000000162),"East Surrey");addHospital(new google.maps.LatLng(51.2161202,-.1428381000000627),"KSAA Redhill");addHospital(new google.maps.LatLng(51.32623253970275,-.2731786925903634),"Epsom");addHospital(new google.maps.LatLng(51.380739,-.18434300000001258),"St Helier");addPOI(new google.maps.LatLng(51.29405320883721,-.15355908459468992),"Hooley Handover");addPOI(new google.maps.LatLng(51.3834925498744,.22220046298218676),"Farningham Handover");addPOI(new google.maps.LatLng(51.32293052945197,-.7621635074096957),"Camberly Handover")}function addPOI(e,t){var n=new google.maps.Marker({position:e,draggable:false,title:t,map:map,icon:poiIcon,animation:google.maps.Animation.DROP});pois[pois.length]=n}function addHospital(e,t){var n=new google.maps.Marker({position:e,draggable:false,title:t,map:map,icon:hospIcon,animation:google.maps.Animation.DROP});pois[pois.length]=n}function showHideNotes(){if(notesVisible){$("#Notes").slideUp()}else{$("#Notes").slideDown()}notesVisible=!notesVisible}function showAddRider(){$("#addRiderDialog").dialog("open")}function selectRider(e){selectedRider=null;for(var t=0;t<riders.length;t++){if(riders[t].rider==e){selectedRider=riders[t];$("#menRider").text(selectedRider.rider+"\r\n"+selectedRider.notes+" ("+selectedRider.jobs+" runs)")}}}function markRiderOut(){if(selectedRider==null){alert(selectMessage);return}selectedRider.home=false;selectedRider.jobs++;selectedRider.setIcon(bikeIcon);note(selectedRider.rider+": dispatched")}function markRiderHome(){if(selectedRider==null){alert(selectMessage);return}selectedRider.home=true;selectedRider.setIcon(homeIcon);note(selectedRider.rider+": home")}function addRider(e,t,n){geocoder.geocode({address:t},function(r,i){if(i==google.maps.GeocoderStatus.OK){var s=new google.maps.Marker({position:r[0].geometry.location,rider:e,draggable:true,home:true,homeLocation:t,title:e,notes:n,jobs:0,map:map,icon:homeIcon,animation:google.maps.Animation.DROP});google.maps.event.addListener(s,"click",function(){selectRider(s.title)});google.maps.event.addListener(s,"dragend",function(){selectRider(s.title);note(selectedRider.rider+": location set to: "+selectedRider.position);if(selectedRider.home){markRiderOut()}});$("#txtNewRiderName").val("");$("#txtNewRiderLoc").val("");$("#txtNewRiderNotes").val("");$("#addRiderDialog").dialog("close");riders[riders.length]=s;selectRider(s.title);note("Rider added: "+s.title+" @ "+s.homeLocation+" - "+s.notes)}else{alert("Google maps could not find a match for the location "+t+". Try again using non SERV specific terms.");return null}})}function showUpdateRiderLocation(e){if(selectedRider==null){alert(selectMessage);return}$("#locationDialog").dialog("open")}function showLogCall(){$("#logCallDialog").dialog("open")}function Call(){this.index=0;this.CallDate="";this.CallTime="";this.Destination="";this.FinalDestination="";this.CollectFrom="";this.Consignment="";this.Rider="";this.Controller="";this.PickupTime="";this.DropOffTime="";this.TransportMethod="";this.UrgencyClass=0;this.Notes="";this.log=function(){var e=new Date;$("#call_"+this.index+"_txtDate").val(this.CallDate);$("#call_"+this.index+"_txtTime").val(this.CallTime);$("#call_"+this.index+"_txtDest").val(this.Destination);$("#call_"+this.index+"_txtCon").val(this.Consignment);$("#call_"+this.index+"_txtFrom").val(this.CollectFrom);$("#call_"+this.index+"_txtUrgency").val(this.UrgencyClass);$("#call_"+this.index+"_txtController").val(this.Controller);var t=this.FinalDestination!=""?"For "+this.FinalDestination+". "+this.Notes:this.Notes;$("#call_"+this.index+"_txtNotes").val(t)}}function logCall(){var e=new Date;var t=new Call;t.index=callIndex;t.CallDate=e.format("dd/mm/yyyy");t.CallTime=e.format("HH:MM");t.CollectFrom=$("#txtCallColFrom").val();t.Destination=$("#txtCallDestination").val();t.Consignment=$("#txtCallConsign").val();t.Controller=$("#txtCallController").val();t.Notes=$("#txtCallNotes").val();t.FinalDestination=$("#txtCallFinalDest").val();t.UrgencyClass=$("#txtCallUrgency").val();t.log();calls[callIndex]=t;callIndex++;note("Call from "+$("#txtCallDestination").val()+" needing "+$("#txtCallConsign").val()+" from "+$("#txtCallColFrom").val()+". Deliver to "+$("#txtCallDestination").val()+" - "+$("#txtCallNotes").val());$("#txtCallColFrom").val("");$("#txtCallConsign").val("");$("#txtCallDestination").val("");$("#txtCallNotes").val("");$("#logCallDialog").dialog("close");$("#Calls").slideUp();$("#call_"+(callIndex-1)).slideDown();$("#Calls").animate({height:"show",opacity:.8},300);logVisible=true}function updateRiderLocation(e,t){if(selectedRider==null){alert(selectMessage);return}geocoder.geocode({address:e},function(n,r){if(r==google.maps.GeocoderStatus.OK){$("#info").text(n[0].geometry.location);selectedRider.setPosition(n[0].geometry.location);note(selectedRider.rider+": location set to: "+e+"\r\n"+n[0].geometry.location);if(selectedRider.home&&!t){markRiderOut()}if(t){markRiderHome()}}else{alert("Google maps could not find a match for the location "+e+". Try again using non SERV specific terms.")}});$("#txtRiderLoc").val("");$("#locationDialog").dialog("close")}function sendRiderHome(){if(selectedRider==null){alert(selectMessage);return}updateRiderLocation(selectedRider.homeLocation,true)}function removeRider(){if(selectedRider==null){alert(selectMessage);return}note(selectedRider.name+": off duty");selectedRider.setMap(null);selectedRider=null;$("#menRider").text("Rider")}function note(e){var t=new Date;$("#txtNotes").val($("#txtNotes").val()+"\r\n\r\n"+t.format("dd/mm/yyyy - HH:MM:ss")+":\r\n"+e)}var map;var trafficLayer;var weatherLayer;var bikeIcon="atv.png";var homeIcon="home-2.png";var hospIcon="hospital-building.png";var pinIcon="pin.png";var poiIcon="group-2.png";var selectMessage="Please select a Rider / Driver first";var selectedRider;var geocoder=new google.maps.Geocoder;var notesVisible=false;var trafficVisible=true;var weatherVisible=false;var logVisible=false;var riders=new Array;var pois=new Array;var wayPointMarkers=new Array;var wayPoints=new Array;var calls=new Array;var callIndex=0;var locations=["NBS Tooting","Kent","Sussex","St Peter's","Frimley Park","St Thomas's","RSCH","Royal Surrey","Hooley Handover","Tooting","Holy Cross, Haslemere","Maidstone","William Harvey","Colindale","Kings","Medway","Haywards Heath","Kent & Canterbury","Farningham","New Malden","Darent Valley","Guys","Princess Royal","Worthing","St George's","Penbury","QEQM","ESH","East Surrey","Redhill Aerodrome","KSAA"];var consignments=["1 x Blood","2 x Blood","3 x Blood","4 x Blood","1 x Platelets","2 x Platelets","3 x Platelets","4 x Platelets","1 x Sample","1 x Other","2 x Sample","2 x Other","1 x Blood, 1 x Platelets","1 x FPP","2 x FPP","3 x FPP","4 x FPP"];$(function(){$(".menu").menu();$(".menu").menu("collapse");$(".button").button();$("#addRiderDialog").dialog({show:{effect:"clip",duration:200},hide:{effect:"slide",duration:200},autoOpen:false});$("#locationDialog").dialog({show:{effect:"clip",duration:200},hide:{effect:"slide",duration:200},autoOpen:false});$("#logCallDialog").dialog({show:{effect:"clip",duration:200},hide:{effect:"slide",duration:200},autoOpen:false});$("#helpDialog").dialog({width:550,show:{effect:"clip",duration:200},hide:{effect:"slide",duration:200},autoOpen:false});$("#routeDialog").dialog({width:550,show:{effect:"clip",duration:200},hide:{effect:"slide",duration:200},autoOpen:false});$(".locationAC").autocomplete({source:locations});$(".consigmentAC").autocomplete({source:consignments});initialize();addPOIs();window.onbeforeunload=function(){return"You will lose all rider positions and logging"};window.setTimeout('$("#menuDiv").slideDown();',2e3);window.setTimeout("showHelp()",3e3);window.setTimeout("showHideNotes()",4e3)});var dateFormat=function(){var e=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,t=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,n=/[^-+\dA-Z]/g,r=function(e,t){e=String(e);t=t||2;while(e.length<t)e="0"+e;return e};return function(i,s,o){var u=dateFormat;if(arguments.length==1&&Object.prototype.toString.call(i)=="[object String]"&&!/\d/.test(i)){s=i;i=undefined}i=i?new Date(i):new Date;if(isNaN(i))throw SyntaxError("invalid date");s=String(u.masks[s]||s||u.masks["default"]);if(s.slice(0,4)=="UTC:"){s=s.slice(4);o=true}var a=o?"getUTC":"get",f=i[a+"Date"](),l=i[a+"Day"](),c=i[a+"Month"](),h=i[a+"FullYear"](),p=i[a+"Hours"](),d=i[a+"Minutes"](),v=i[a+"Seconds"](),m=i[a+"Milliseconds"](),g=o?0:i.getTimezoneOffset(),y={d:f,dd:r(f),ddd:u.i18n.dayNames[l],dddd:u.i18n.dayNames[l+7],m:c+1,mm:r(c+1),mmm:u.i18n.monthNames[c],mmmm:u.i18n.monthNames[c+12],yy:String(h).slice(2),yyyy:h,h:p%12||12,hh:r(p%12||12),H:p,HH:r(p),M:d,MM:r(d),s:v,ss:r(v),l:r(m,3),L:r(m>99?Math.round(m/10):m),t:p<12?"a":"p",tt:p<12?"am":"pm",T:p<12?"A":"P",TT:p<12?"AM":"PM",Z:o?"UTC":(String(i).match(t)||[""]).pop().replace(n,""),o:(g>0?"-":"+")+r(Math.floor(Math.abs(g)/60)*100+Math.abs(g)%60,4),S:["th","st","nd","rd"][f%10>3?0:(f%100-f%10!=10)*f%10]};return s.replace(e,function(e){return e in y?y[e]:e.slice(1,e.length-1)})}}();dateFormat.masks={"default":"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:ss",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"};dateFormat.i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"]};Date.prototype.format=function(e,t){return dateFormat(this,e,t)}
