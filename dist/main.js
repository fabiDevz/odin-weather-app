(()=>{"use strict";const e={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function t(e){return(t={})=>{const n=t.width?String(t.width):e.defaultWidth;return e.formats[n]||e.formats[e.defaultWidth]}}const n={date:t({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:t({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:t({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},a={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function r(e){return(t,n)=>{let a;if("formatting"===(n?.context?String(n.context):"standalone")&&e.formattingValues){const t=e.defaultFormattingWidth||e.defaultWidth,r=n?.width?String(n.width):t;a=e.formattingValues[r]||e.formattingValues[t]}else{const t=e.defaultWidth,r=n?.width?String(n.width):e.defaultWidth;a=e.values[r]||e.values[t]}return a[e.argumentCallback?e.argumentCallback(t):t]}}function o(e){return(t,n={})=>{const a=n.width,r=a&&e.matchPatterns[a]||e.matchPatterns[e.defaultMatchWidth],o=t.match(r);if(!o)return null;const i=o[0],s=a&&e.parsePatterns[a]||e.parsePatterns[e.defaultParseWidth],d=Array.isArray(s)?function(e,t){for(let t=0;t<e.length;t++)if(e[t].test(i))return t}(s):function(e,t){for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t)&&e[t].test(i))return t}(s);let u;return u=e.valueCallback?e.valueCallback(d):d,u=n.valueCallback?n.valueCallback(u):u,{value:u,rest:t.slice(i.length)}}}function i(e){return(t,n={})=>{const a=t.match(e.matchPattern);if(!a)return null;const r=a[0],o=t.match(e.parsePattern);if(!o)return null;let i=e.valueCallback?e.valueCallback(o[0]):o[0];return i=n.valueCallback?n.valueCallback(i):i,{value:i,rest:t.slice(r.length)}}}const s={code:"en-US",formatDistance:(t,n,a)=>{let r;const o=e[t];return r="string"==typeof o?o:1===n?o.one:o.other.replace("{{count}}",n.toString()),a?.addSuffix?a.comparison&&a.comparison>0?"in "+r:r+" ago":r},formatLong:n,formatRelative:(e,t,n,r)=>a[e],localize:{ordinalNumber:(e,t)=>{const n=Number(e),a=n%100;if(a>20||a<10)switch(a%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:r({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:r({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:e=>e-1}),month:r({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:r({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:r({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:i({matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:e=>parseInt(e,10)}),era:o({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:o({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:e=>e+1}),month:o({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:o({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:o({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};let d={};function u(){return d}Math.pow(10,8);const c=6048e5,l=864e5;function m(e){const t=Object.prototype.toString.call(e);return e instanceof Date||"object"==typeof e&&"[object Date]"===t?new e.constructor(+e):"number"==typeof e||"[object Number]"===t||"string"==typeof e||"[object String]"===t?new Date(e):new Date(NaN)}function h(e){const t=m(e);return t.setHours(0,0,0,0),t}function g(e){const t=m(e),n=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()));return n.setUTCFullYear(t.getFullYear()),+e-+n}function f(e,t){return e instanceof Date?new e.constructor(t):new Date(t)}function w(e){const t=m(e);return function(e,t){const n=h(e),a=h(t),r=+n-g(n),o=+a-g(a);return Math.round((r-o)/l)}(t,function(e){const t=m(e),n=f(e,0);return n.setFullYear(t.getFullYear(),0,1),n.setHours(0,0,0,0),n}(t))+1}function y(e,t){const n=u(),a=t?.weekStartsOn??t?.locale?.options?.weekStartsOn??n.weekStartsOn??n.locale?.options?.weekStartsOn??0,r=m(e),o=r.getDay(),i=(o<a?7:0)+o-a;return r.setDate(r.getDate()-i),r.setHours(0,0,0,0),r}function b(e){return y(e,{weekStartsOn:1})}function v(e){const t=m(e),n=t.getFullYear(),a=f(e,0);a.setFullYear(n+1,0,4),a.setHours(0,0,0,0);const r=b(a),o=f(e,0);o.setFullYear(n,0,4),o.setHours(0,0,0,0);const i=b(o);return t.getTime()>=r.getTime()?n+1:t.getTime()>=i.getTime()?n:n-1}function p(e){const t=m(e),n=+b(t)-+function(e){const t=v(e),n=f(e,0);return n.setFullYear(t,0,4),n.setHours(0,0,0,0),b(n)}(t);return Math.round(n/c)+1}function M(e,t){const n=m(e),a=n.getFullYear(),r=u(),o=t?.firstWeekContainsDate??t?.locale?.options?.firstWeekContainsDate??r.firstWeekContainsDate??r.locale?.options?.firstWeekContainsDate??1,i=f(e,0);i.setFullYear(a+1,0,o),i.setHours(0,0,0,0);const s=y(i,t),d=f(e,0);d.setFullYear(a,0,o),d.setHours(0,0,0,0);const c=y(d,t);return n.getTime()>=s.getTime()?a+1:n.getTime()>=c.getTime()?a:a-1}function P(e,t){const n=m(e),a=+y(n,t)-+function(e,t){const n=u(),a=t?.firstWeekContainsDate??t?.locale?.options?.firstWeekContainsDate??n.firstWeekContainsDate??n.locale?.options?.firstWeekContainsDate??1,r=M(e,t),o=f(e,0);return o.setFullYear(r,0,a),o.setHours(0,0,0,0),y(o,t)}(n,t);return Math.round(a/c)+1}function k(e,t){return(e<0?"-":"")+Math.abs(e).toString().padStart(t,"0")}const x={y(e,t){const n=e.getFullYear(),a=n>0?n:1-n;return k("yy"===t?a%100:a,t.length)},M(e,t){const n=e.getMonth();return"M"===t?String(n+1):k(n+1,2)},d:(e,t)=>k(e.getDate(),t.length),a(e,t){const n=e.getHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":return n.toUpperCase();case"aaa":return n;case"aaaaa":return n[0];default:return"am"===n?"a.m.":"p.m."}},h:(e,t)=>k(e.getHours()%12||12,t.length),H:(e,t)=>k(e.getHours(),t.length),m:(e,t)=>k(e.getMinutes(),t.length),s:(e,t)=>k(e.getSeconds(),t.length),S(e,t){const n=t.length,a=e.getMilliseconds();return k(Math.trunc(a*Math.pow(10,n-3)),t.length)}},W={G:function(e,t,n){const a=e.getFullYear()>0?1:0;switch(t){case"G":case"GG":case"GGG":return n.era(a,{width:"abbreviated"});case"GGGGG":return n.era(a,{width:"narrow"});default:return n.era(a,{width:"wide"})}},y:function(e,t,n){if("yo"===t){const t=e.getFullYear(),a=t>0?t:1-t;return n.ordinalNumber(a,{unit:"year"})}return x.y(e,t)},Y:function(e,t,n,a){const r=M(e,a),o=r>0?r:1-r;return"YY"===t?k(o%100,2):"Yo"===t?n.ordinalNumber(o,{unit:"year"}):k(o,t.length)},R:function(e,t){return k(v(e),t.length)},u:function(e,t){return k(e.getFullYear(),t.length)},Q:function(e,t,n){const a=Math.ceil((e.getMonth()+1)/3);switch(t){case"Q":return String(a);case"QQ":return k(a,2);case"Qo":return n.ordinalNumber(a,{unit:"quarter"});case"QQQ":return n.quarter(a,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(a,{width:"narrow",context:"formatting"});default:return n.quarter(a,{width:"wide",context:"formatting"})}},q:function(e,t,n){const a=Math.ceil((e.getMonth()+1)/3);switch(t){case"q":return String(a);case"qq":return k(a,2);case"qo":return n.ordinalNumber(a,{unit:"quarter"});case"qqq":return n.quarter(a,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(a,{width:"narrow",context:"standalone"});default:return n.quarter(a,{width:"wide",context:"standalone"})}},M:function(e,t,n){const a=e.getMonth();switch(t){case"M":case"MM":return x.M(e,t);case"Mo":return n.ordinalNumber(a+1,{unit:"month"});case"MMM":return n.month(a,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(a,{width:"narrow",context:"formatting"});default:return n.month(a,{width:"wide",context:"formatting"})}},L:function(e,t,n){const a=e.getMonth();switch(t){case"L":return String(a+1);case"LL":return k(a+1,2);case"Lo":return n.ordinalNumber(a+1,{unit:"month"});case"LLL":return n.month(a,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(a,{width:"narrow",context:"standalone"});default:return n.month(a,{width:"wide",context:"standalone"})}},w:function(e,t,n,a){const r=P(e,a);return"wo"===t?n.ordinalNumber(r,{unit:"week"}):k(r,t.length)},I:function(e,t,n){const a=p(e);return"Io"===t?n.ordinalNumber(a,{unit:"week"}):k(a,t.length)},d:function(e,t,n){return"do"===t?n.ordinalNumber(e.getDate(),{unit:"date"}):x.d(e,t)},D:function(e,t,n){const a=w(e);return"Do"===t?n.ordinalNumber(a,{unit:"dayOfYear"}):k(a,t.length)},E:function(e,t,n){const a=e.getDay();switch(t){case"E":case"EE":case"EEE":return n.day(a,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(a,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},e:function(e,t,n,a){const r=e.getDay(),o=(r-a.weekStartsOn+8)%7||7;switch(t){case"e":return String(o);case"ee":return k(o,2);case"eo":return n.ordinalNumber(o,{unit:"day"});case"eee":return n.day(r,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(r,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(r,{width:"short",context:"formatting"});default:return n.day(r,{width:"wide",context:"formatting"})}},c:function(e,t,n,a){const r=e.getDay(),o=(r-a.weekStartsOn+8)%7||7;switch(t){case"c":return String(o);case"cc":return k(o,t.length);case"co":return n.ordinalNumber(o,{unit:"day"});case"ccc":return n.day(r,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(r,{width:"narrow",context:"standalone"});case"cccccc":return n.day(r,{width:"short",context:"standalone"});default:return n.day(r,{width:"wide",context:"standalone"})}},i:function(e,t,n){const a=e.getDay(),r=0===a?7:a;switch(t){case"i":return String(r);case"ii":return k(r,t.length);case"io":return n.ordinalNumber(r,{unit:"day"});case"iii":return n.day(a,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(a,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(a,{width:"short",context:"formatting"});default:return n.day(a,{width:"wide",context:"formatting"})}},a:function(e,t,n){const a=e.getHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(a,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(a,{width:"narrow",context:"formatting"});default:return n.dayPeriod(a,{width:"wide",context:"formatting"})}},b:function(e,t,n){const a=e.getHours();let r;switch(r=12===a?"noon":0===a?"midnight":a/12>=1?"pm":"am",t){case"b":case"bb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(e,t,n){const a=e.getHours();let r;switch(r=a>=17?"evening":a>=12?"afternoon":a>=4?"morning":"night",t){case"B":case"BB":case"BBB":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(r,{width:"narrow",context:"formatting"});default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(e,t,n){if("ho"===t){let t=e.getHours()%12;return 0===t&&(t=12),n.ordinalNumber(t,{unit:"hour"})}return x.h(e,t)},H:function(e,t,n){return"Ho"===t?n.ordinalNumber(e.getHours(),{unit:"hour"}):x.H(e,t)},K:function(e,t,n){const a=e.getHours()%12;return"Ko"===t?n.ordinalNumber(a,{unit:"hour"}):k(a,t.length)},k:function(e,t,n){let a=e.getHours();return 0===a&&(a=24),"ko"===t?n.ordinalNumber(a,{unit:"hour"}):k(a,t.length)},m:function(e,t,n){return"mo"===t?n.ordinalNumber(e.getMinutes(),{unit:"minute"}):x.m(e,t)},s:function(e,t,n){return"so"===t?n.ordinalNumber(e.getSeconds(),{unit:"second"}):x.s(e,t)},S:function(e,t){return x.S(e,t)},X:function(e,t,n){const a=e.getTimezoneOffset();if(0===a)return"Z";switch(t){case"X":return S(a);case"XXXX":case"XX":return z(a);default:return z(a,":")}},x:function(e,t,n){const a=e.getTimezoneOffset();switch(t){case"x":return S(a);case"xxxx":case"xx":return z(a);default:return z(a,":")}},O:function(e,t,n){const a=e.getTimezoneOffset();switch(t){case"O":case"OO":case"OOO":return"GMT"+L(a,":");default:return"GMT"+z(a,":")}},z:function(e,t,n){const a=e.getTimezoneOffset();switch(t){case"z":case"zz":case"zzz":return"GMT"+L(a,":");default:return"GMT"+z(a,":")}},t:function(e,t,n){return k(Math.trunc(e.getTime()/1e3),t.length)},T:function(e,t,n){return k(e.getTime(),t.length)}};function L(e,t=""){const n=e>0?"-":"+",a=Math.abs(e),r=Math.trunc(a/60),o=a%60;return 0===o?n+String(r):n+String(r)+t+k(o,2)}function S(e,t){return e%60==0?(e>0?"-":"+")+k(Math.abs(e)/60,2):z(e,t)}function z(e,t=""){const n=e>0?"-":"+",a=Math.abs(e);return n+k(Math.trunc(a/60),2)+t+k(a%60,2)}const C=(e,t)=>{switch(e){case"P":return t.date({width:"short"});case"PP":return t.date({width:"medium"});case"PPP":return t.date({width:"long"});default:return t.date({width:"full"})}},D=(e,t)=>{switch(e){case"p":return t.time({width:"short"});case"pp":return t.time({width:"medium"});case"ppp":return t.time({width:"long"});default:return t.time({width:"full"})}},N={p:D,P:(e,t)=>{const n=e.match(/(P+)(p+)?/)||[],a=n[1],r=n[2];if(!r)return C(e,t);let o;switch(a){case"P":o=t.dateTime({width:"short"});break;case"PP":o=t.dateTime({width:"medium"});break;case"PPP":o=t.dateTime({width:"long"});break;default:o=t.dateTime({width:"full"})}return o.replace("{{date}}",C(a,t)).replace("{{time}}",D(r,t))}},T=/^D+$/,j=/^Y+$/,E=["D","DD","YY","YYYY"];function H(e){if(!(t=e,t instanceof Date||"object"==typeof t&&"[object Date]"===Object.prototype.toString.call(t)||"number"==typeof e))return!1;var t;const n=m(e);return!isNaN(Number(n))}const Y=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,q=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,B=/^'([^]*?)'?$/,O=/''/g,F=/[a-zA-Z]/;function A(e){const t=e.match(B);return t?t[1].replace(O,"'"):e}const I={lessThanXSeconds:{one:"menos de un segundo",other:"menos de {{count}} segundos"},xSeconds:{one:"1 segundo",other:"{{count}} segundos"},halfAMinute:"medio minuto",lessThanXMinutes:{one:"menos de un minuto",other:"menos de {{count}} minutos"},xMinutes:{one:"1 minuto",other:"{{count}} minutos"},aboutXHours:{one:"alrededor de 1 hora",other:"alrededor de {{count}} horas"},xHours:{one:"1 hora",other:"{{count}} horas"},xDays:{one:"1 día",other:"{{count}} días"},aboutXWeeks:{one:"alrededor de 1 semana",other:"alrededor de {{count}} semanas"},xWeeks:{one:"1 semana",other:"{{count}} semanas"},aboutXMonths:{one:"alrededor de 1 mes",other:"alrededor de {{count}} meses"},xMonths:{one:"1 mes",other:"{{count}} meses"},aboutXYears:{one:"alrededor de 1 año",other:"alrededor de {{count}} años"},xYears:{one:"1 año",other:"{{count}} años"},overXYears:{one:"más de 1 año",other:"más de {{count}} años"},almostXYears:{one:"casi 1 año",other:"casi {{count}} años"}},X={date:t({formats:{full:"EEEE, d 'de' MMMM 'de' y",long:"d 'de' MMMM 'de' y",medium:"d MMM y",short:"dd/MM/y"},defaultWidth:"full"}),time:t({formats:{full:"HH:mm:ss zzzz",long:"HH:mm:ss z",medium:"HH:mm:ss",short:"HH:mm"},defaultWidth:"full"}),dateTime:t({formats:{full:"{{date}} 'a las' {{time}}",long:"{{date}} 'a las' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},G={lastWeek:"'el' eeee 'pasado a la' p",yesterday:"'ayer a la' p",today:"'hoy a la' p",tomorrow:"'mañana a la' p",nextWeek:"eeee 'a la' p",other:"P"},Q={lastWeek:"'el' eeee 'pasado a las' p",yesterday:"'ayer a las' p",today:"'hoy a las' p",tomorrow:"'mañana a las' p",nextWeek:"eeee 'a las' p",other:"P"},$={code:"es",formatDistance:(e,t,n)=>{let a;const r=I[e];return a="string"==typeof r?r:1===t?r.one:r.other.replace("{{count}}",t.toString()),n?.addSuffix?n.comparison&&n.comparison>0?"en "+a:"hace "+a:a},formatLong:X,formatRelative:(e,t,n,a)=>1!==t.getHours()?Q[e]:G[e],localize:{ordinalNumber:(e,t)=>Number(e)+"º",era:r({values:{narrow:["AC","DC"],abbreviated:["AC","DC"],wide:["antes de cristo","después de cristo"]},defaultWidth:"wide"}),quarter:r({values:{narrow:["1","2","3","4"],abbreviated:["T1","T2","T3","T4"],wide:["1º trimestre","2º trimestre","3º trimestre","4º trimestre"]},defaultWidth:"wide",argumentCallback:e=>Number(e)-1}),month:r({values:{narrow:["e","f","m","a","m","j","j","a","s","o","n","d"],abbreviated:["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"],wide:["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"]},defaultWidth:"wide"}),day:r({values:{narrow:["d","l","m","m","j","v","s"],short:["do","lu","ma","mi","ju","vi","sá"],abbreviated:["dom","lun","mar","mié","jue","vie","sáb"],wide:["domingo","lunes","martes","miércoles","jueves","viernes","sábado"]},defaultWidth:"wide"}),dayPeriod:r({values:{narrow:{am:"a",pm:"p",midnight:"mn",noon:"md",morning:"mañana",afternoon:"tarde",evening:"tarde",night:"noche"},abbreviated:{am:"AM",pm:"PM",midnight:"medianoche",noon:"mediodia",morning:"mañana",afternoon:"tarde",evening:"tarde",night:"noche"},wide:{am:"a.m.",pm:"p.m.",midnight:"medianoche",noon:"mediodia",morning:"mañana",afternoon:"tarde",evening:"tarde",night:"noche"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mn",noon:"md",morning:"de la mañana",afternoon:"de la tarde",evening:"de la tarde",night:"de la noche"},abbreviated:{am:"AM",pm:"PM",midnight:"medianoche",noon:"mediodia",morning:"de la mañana",afternoon:"de la tarde",evening:"de la tarde",night:"de la noche"},wide:{am:"a.m.",pm:"p.m.",midnight:"medianoche",noon:"mediodia",morning:"de la mañana",afternoon:"de la tarde",evening:"de la tarde",night:"de la noche"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:i({matchPattern:/^(\d+)(º)?/i,parsePattern:/\d+/i,valueCallback:function(e){return parseInt(e,10)}}),era:o({matchPatterns:{narrow:/^(ac|dc|a|d)/i,abbreviated:/^(a\.?\s?c\.?|a\.?\s?e\.?\s?c\.?|d\.?\s?c\.?|e\.?\s?c\.?)/i,wide:/^(antes de cristo|antes de la era com[uú]n|despu[eé]s de cristo|era com[uú]n)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^ac/i,/^dc/i],wide:[/^(antes de cristo|antes de la era com[uú]n)/i,/^(despu[eé]s de cristo|era com[uú]n)/i]},defaultParseWidth:"any"}),quarter:o({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^T[1234]/i,wide:/^[1234](º)? trimestre/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:e=>e+1}),month:o({matchPatterns:{narrow:/^[efmajsond]/i,abbreviated:/^(ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)/i,wide:/^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^e/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^en/i,/^feb/i,/^mar/i,/^abr/i,/^may/i,/^jun/i,/^jul/i,/^ago/i,/^sep/i,/^oct/i,/^nov/i,/^dic/i]},defaultParseWidth:"any"}),day:o({matchPatterns:{narrow:/^[dlmjvs]/i,short:/^(do|lu|ma|mi|ju|vi|s[áa])/i,abbreviated:/^(dom|lun|mar|mi[ée]|jue|vie|s[áa]b)/i,wide:/^(domingo|lunes|martes|mi[ée]rcoles|jueves|viernes|s[áa]bado)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^d/i,/^l/i,/^m/i,/^m/i,/^j/i,/^v/i,/^s/i],any:[/^do/i,/^lu/i,/^ma/i,/^mi/i,/^ju/i,/^vi/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:o({matchPatterns:{narrow:/^(a|p|mn|md|(de la|a las) (mañana|tarde|noche))/i,any:/^([ap]\.?\s?m\.?|medianoche|mediodia|(de la|a las) (mañana|tarde|noche))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mn/i,noon:/^md/i,morning:/mañana/i,afternoon:/tarde/i,evening:/tarde/i,night:/noche/i}},defaultParseWidth:"any"})},options:{weekStartsOn:1,firstWeekContainsDate:1}},J=document.getElementById("btnBusqueda");let R=document.getElementById("search-bar").value;async function V(e){const t=`https://api.weatherapi.com/v1/current.json?key=8c8a90f7de104e87ab4194550241103&q=${e}`;try{const n=await fetch(t),a=await n.json(),r=await async function(e){const t=`https://restcountries.com/v3.1/name/${e}`,n=await fetch(t);return await n.json()}(a.location.country);console.log("clima"),console.log(a),function(e,t,n,a,r,o,i,s,d){const u=document.getElementById("error-content"),c=document.getElementById("logo-country"),l=document.getElementById("location"),m=document.getElementById("condition"),h=document.getElementById("weather-icon"),g=document.getElementById("degrees"),f=document.getElementById("local-time"),w=document.getElementById("wind"),y=document.getElementById("humidity");u.style.display="none",c.src=e,c.title=t,l.textContent=n,m.textContent=function(e){return{Clear:"Despejado",Sunny:"Soleado","Partly cloudy":"Parcialmente nublado",Cloudy:"Nublado",Overcast:"Cubierto",Mist:"Neblina",Fog:"Niebla",Haze:"Neblina",Smoke:"Humo",Dust:"Polvo",Sand:"Arena",Ash:"Ceniza",Squalls:"Chubascos",Tornado:"Tornado","Light rain showers":"Lluvias ligeras","Moderate rain showers":"Lluvias moderadas","Heavy rain showers":"Lluvias intensas","Light snow showers":"Nevadas ligeras","Moderate snow showers":"Nevadas moderadas","Heavy snow showers":"Nevadas intensas","Patchy rain possible":"Lluvia intermitente posible","Patchy snow possible":"Nevadas intermitentes posibles","Patchy sleet possible":"Aguanieve intermitente posible","Patchy freezing drizzle possible":"Llovizna helada intermitente posible","Thundery outbreaks possible":"Posibles tormentas eléctricas","Blowing snow":"Nevadas con viento",Blizzard:"Ventisca","Freezing fog":"Niebla helada","Patchy light drizzle":"Llovizna ligera intermitente","Light drizzle":"Llovizna ligera","Freezing drizzle":"Llovizna helada","Heavy freezing drizzle":"Llovizna helada intensa","Light rain":"Lluvia ligera","Moderate rain":"Lluvia moderada","Heavy rain":"Lluvia intensa","Light freezing rain":"Lluvia helada ligera","Moderate or heavy freezing rain":"Lluvia helada moderada o intensa","Light sleet":"Aguanieve ligera","Moderate or heavy sleet":"Aguanieve moderada o intensa","Patchy light rain with thunder":"Lluvias ligeras intermitentes con truenos","Moderate or heavy rain with thunder":"Lluvias moderadas o intensas con truenos","Patchy light snow with thunder":"Nevadas ligeras intermitentes con truenos","Moderate or heavy snow with thunder":"Nevadas moderadas o intensas con truenos","Torrential rain shower":"Lluvia torrencial","Torrential rain":"Lluvia torrencial","Light drizzle":"Llovizna ligera","Ice pellets":"Granizo","Light rain shower":"Lluvia ligera","Moderate or heavy rain shower":"Lluvia moderada o intensa","Moderate or heavy snow showers":"Nevadas moderadas o intensas","Light showers of ice pellets":"Lluvias ligeras de granizo","Moderate or heavy showers of ice pellets":"Lluvias moderadas o intensas de granizo","Patchy light snow":"Nevadas ligeras intermitentes","Patchy moderate snow":"Nevadas moderadas intermitentes","Patchy heavy snow":"Nevadas intensas intermitentes","Light snow":"Nevadas ligeras","Patchy moderate snow":"Nevadas moderadas intermitentes","Moderate snow":"Nevadas moderadas","Blowing snow":"Nevadas con viento","Patchy light rain":"Lluvias ligeras intermitentes","Light rain":"Lluvias ligeras","Moderate rain":"Lluvias moderadas","Patchy light sleet":"Aguanieve ligera intermitente","Light sleet":"Aguanieve ligera","Ice pellets":"Granizo","Moderate or heavy rain":"Lluvia moderada o intensa","Patchy light rain with thunder":"Lluvias ligeras intermitentes con truenos","Moderate or heavy rain with thunder":"Lluvias moderadas o intensas con truenos","Patchy light snow with thunder":"Nevadas ligeras intermitentes con truenos","Moderate or heavy snow with thunder":"Nevadas moderadas o intensas con truenos"}[e]}(a),h.src=r,g.textContent=o+"°c",f.textContent=""+i.split(" ")[1],w.textContent=s+" kph",y.textContent="% "+d}(r[0].flags.png,a.location.country,a.location.name,a.current.condition.text,a.current.condition.icon,a.current.temp_c,a.location.localtime,a.current.wind_kph,a.current.humidity),async function(e){const t=`https://api.weatherapi.com/v1/forecast.json?key=8c8a90f7de104e87ab4194550241103&q=${e}&days=3&aqi=no&alerts=no`,n=await fetch(t),a=await n.json();console.log("pronostico"),console.log(a),console.log("fechas y weas"),console.log(a.forecast.forecastday[1].date);let r=a.forecast.forecastday[2].date,o=a.forecast.forecastday[2].day.condition.icon,i=a.forecast.forecastday[2].day.mintemp_c,d=a.forecast.forecastday[2].day.maxtemp_c,c=a.forecast.forecastday[2].day.avghumidity;const l=new Date(r);console.log(l);const h=function(e,t,n){const a=u(),r=n?.locale??a.locale??s,o=n?.firstWeekContainsDate??n?.locale?.options?.firstWeekContainsDate??a.firstWeekContainsDate??a.locale?.options?.firstWeekContainsDate??1,i=n?.weekStartsOn??n?.locale?.options?.weekStartsOn??a.weekStartsOn??a.locale?.options?.weekStartsOn??0,d=m(e);if(!H(d))throw new RangeError("Invalid time value");let c=t.match(q).map((e=>{const t=e[0];return"p"===t||"P"===t?(0,N[t])(e,r.formatLong):e})).join("").match(Y).map((e=>{if("''"===e)return{isToken:!1,value:"'"};const t=e[0];if("'"===t)return{isToken:!1,value:A(e)};if(W[t])return{isToken:!0,value:e};if(t.match(F))throw new RangeError("Format string contains an unescaped latin alphabet character `"+t+"`");return{isToken:!1,value:e}}));r.localize.preprocessor&&(c=r.localize.preprocessor(d,c));const l={firstWeekContainsDate:o,weekStartsOn:i,locale:r};return c.map((a=>{if(!a.isToken)return a.value;const o=a.value;return(!n?.useAdditionalWeekYearTokens&&function(e){return j.test(e)}(o)||!n?.useAdditionalDayOfYearTokens&&function(e){return T.test(e)}(o))&&function(e,t,n){const a=function(e,t,n){const a="Y"===e[0]?"years":"days of the month";return`Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${a} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`}(e,t,n);if(console.warn(a),E.includes(e))throw new RangeError(a)}(o,t,String(e)),(0,W[o[0]])(d,o,r.localize,l)})).join("")}(new Date(r),"EEE dd-MM",{timeZone:"America/Santiago",locale:$});console.log("aca va el date de la wea"),console.log(h),function(e,t,n,a,r,o){const i=document.getElementById("forecast-date-1"),s=document.getElementById("forecast-img-1"),d=document.getElementById("forecast-min-c-1"),u=document.getElementById("forecast-max-c-1"),c=document.getElementById("forecast-humidity-1");i.textContent=e,s.src=t,d.textContent=n+"°c",u.textContent=a+"°c",c.textContent=r}(h,o,i,d,c)}(e)}catch(e){console.error("Error al obtener los datos del clima:",e)}}document.addEventListener("DOMContentLoaded",(e=>{console.log("La estructura básica de la página ha sido cargada."),V("Chile")})),J.addEventListener("click",(()=>{R=document.getElementById("search-bar").value,""===R.trim()&&(R="Chile"),V(R)}))})();