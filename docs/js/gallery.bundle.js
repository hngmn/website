/*! For license information please see gallery.bundle.js.LICENSE.txt */
(()=>{var e,t={7839:(e,t,r)=>{"use strict";var n=r(7294),o=r(3935),u=r(5697),i=r.n(u);class a extends n.Component{constructor(e){super(e),this.state={liked:!1}}render(){return this.state.liked?(console.log(this.props.photoDir),`You liked this. this.props.photoDir is ${this.props.photoDir}`):n.createElement("button",{onClick:()=>this.setState({liked:!0})},"Like")}}a.propTypes={photoDir:i().string};const c=document.querySelector("#gallery_container");console.log(c.firstChild.data),o.render(n.createElement(a,{photoDir:c.firstChild.data}),c)},2703:(e,t,r)=>{"use strict";var n=r(414);function o(){}function u(){}u.resetWarningCache=o,e.exports=function(){function e(e,t,r,o,u,i){if(i!==n){var a=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw a.name="Invariant Violation",a}}function t(){return e}e.isRequired=e;var r={array:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:u,resetWarningCache:o};return r.PropTypes=r,r}},5697:(e,t,r)=>{e.exports=r(2703)()},414:e=>{"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},3935:(e,t,r)=>{"use strict";!function e(){if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(e){console.error(e)}}(),e.exports=r(4448)},2408:(e,t,r)=>{"use strict";var n=r(7418),o=60103,u=60106;t.Fragment=60107,t.StrictMode=60108,t.Profiler=60114;var i=60109,a=60110,c=60112;t.Suspense=60113;var s=60115,f=60116;if("function"==typeof Symbol&&Symbol.for){var l=Symbol.for;o=l("react.element"),u=l("react.portal"),t.Fragment=l("react.fragment"),t.StrictMode=l("react.strict_mode"),t.Profiler=l("react.profiler"),i=l("react.provider"),a=l("react.context"),c=l("react.forward_ref"),t.Suspense=l("react.suspense"),s=l("react.memo"),f=l("react.lazy")}var p="function"==typeof Symbol&&Symbol.iterator;function y(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var d={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},h={};function _(e,t,r){this.props=e,this.context=t,this.refs=h,this.updater=r||d}function v(){}function m(e,t,r){this.props=e,this.context=t,this.refs=h,this.updater=r||d}_.prototype.isReactComponent={},_.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error(y(85));this.updater.enqueueSetState(this,e,t,"setState")},_.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},v.prototype=_.prototype;var O=m.prototype=new v;O.constructor=m,n(O,_.prototype),O.isPureReactComponent=!0;var b={current:null},g=Object.prototype.hasOwnProperty,k={key:!0,ref:!0,__self:!0,__source:!0};function C(e,t,r){var n,u={},i=null,a=null;if(null!=t)for(n in void 0!==t.ref&&(a=t.ref),void 0!==t.key&&(i=""+t.key),t)g.call(t,n)&&!k.hasOwnProperty(n)&&(u[n]=t[n]);var c=arguments.length-2;if(1===c)u.children=r;else if(1<c){for(var s=Array(c),f=0;f<c;f++)s[f]=arguments[f+2];u.children=s}if(e&&e.defaultProps)for(n in c=e.defaultProps)void 0===u[n]&&(u[n]=c[n]);return{$$typeof:o,type:e,key:i,ref:a,props:u,_owner:b.current}}function E(e){return"object"==typeof e&&null!==e&&e.$$typeof===o}var S=/\/+/g;function w(e,t){return"object"==typeof e&&null!==e&&null!=e.key?function(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,(function(e){return t[e]}))}(""+e.key):t.toString(36)}function R(e,t,r,n,i){var a=typeof e;"undefined"!==a&&"boolean"!==a||(e=null);var c=!1;if(null===e)c=!0;else switch(a){case"string":case"number":c=!0;break;case"object":switch(e.$$typeof){case o:case u:c=!0}}if(c)return i=i(c=e),e=""===n?"."+w(c,0):n,Array.isArray(i)?(r="",null!=e&&(r=e.replace(S,"$&/")+"/"),R(i,t,r,"",(function(e){return e}))):null!=i&&(E(i)&&(i=function(e,t){return{$$typeof:o,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}(i,r+(!i.key||c&&c.key===i.key?"":(""+i.key).replace(S,"$&/")+"/")+e)),t.push(i)),1;if(c=0,n=""===n?".":n+":",Array.isArray(e))for(var s=0;s<e.length;s++){var f=n+w(a=e[s],s);c+=R(a,t,r,f,i)}else if(f=function(e){return null===e||"object"!=typeof e?null:"function"==typeof(e=p&&e[p]||e["@@iterator"])?e:null}(e),"function"==typeof f)for(e=f.call(e),s=0;!(a=e.next()).done;)c+=R(a=a.value,t,r,f=n+w(a,s++),i);else if("object"===a)throw t=""+e,Error(y(31,"[object Object]"===t?"object with keys {"+Object.keys(e).join(", ")+"}":t));return c}function $(e,t,r){if(null==e)return e;var n=[],o=0;return R(e,n,"","",(function(e){return t.call(r,e,o++)})),n}function P(e){if(-1===e._status){var t=e._result;t=t(),e._status=0,e._result=t,t.then((function(t){0===e._status&&(t=t.default,e._status=1,e._result=t)}),(function(t){0===e._status&&(e._status=2,e._result=t)}))}if(1===e._status)return e._result;throw e._result}var T={current:null};function j(){var e=T.current;if(null===e)throw Error(y(321));return e}var x={ReactCurrentDispatcher:T,ReactCurrentBatchConfig:{transition:0},ReactCurrentOwner:b,IsSomeRendererActing:{current:!1},assign:n};t.Children={map:$,forEach:function(e,t,r){$(e,(function(){t.apply(this,arguments)}),r)},count:function(e){var t=0;return $(e,(function(){t++})),t},toArray:function(e){return $(e,(function(e){return e}))||[]},only:function(e){if(!E(e))throw Error(y(143));return e}},t.Component=_,t.PureComponent=m,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=x,t.cloneElement=function(e,t,r){if(null==e)throw Error(y(267,e));var u=n({},e.props),i=e.key,a=e.ref,c=e._owner;if(null!=t){if(void 0!==t.ref&&(a=t.ref,c=b.current),void 0!==t.key&&(i=""+t.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(f in t)g.call(t,f)&&!k.hasOwnProperty(f)&&(u[f]=void 0===t[f]&&void 0!==s?s[f]:t[f])}var f=arguments.length-2;if(1===f)u.children=r;else if(1<f){s=Array(f);for(var l=0;l<f;l++)s[l]=arguments[l+2];u.children=s}return{$$typeof:o,type:e.type,key:i,ref:a,props:u,_owner:c}},t.createContext=function(e,t){return void 0===t&&(t=null),(e={$$typeof:a,_calculateChangedBits:t,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null}).Provider={$$typeof:i,_context:e},e.Consumer=e},t.createElement=C,t.createFactory=function(e){var t=C.bind(null,e);return t.type=e,t},t.createRef=function(){return{current:null}},t.forwardRef=function(e){return{$$typeof:c,render:e}},t.isValidElement=E,t.lazy=function(e){return{$$typeof:f,_payload:{_status:-1,_result:e},_init:P}},t.memo=function(e,t){return{$$typeof:s,type:e,compare:void 0===t?null:t}},t.useCallback=function(e,t){return j().useCallback(e,t)},t.useContext=function(e,t){return j().useContext(e,t)},t.useDebugValue=function(){},t.useEffect=function(e,t){return j().useEffect(e,t)},t.useImperativeHandle=function(e,t,r){return j().useImperativeHandle(e,t,r)},t.useLayoutEffect=function(e,t){return j().useLayoutEffect(e,t)},t.useMemo=function(e,t){return j().useMemo(e,t)},t.useReducer=function(e,t,r){return j().useReducer(e,t,r)},t.useRef=function(e){return j().useRef(e)},t.useState=function(e){return j().useState(e)},t.version="17.0.2"},7294:(e,t,r)=>{"use strict";e.exports=r(2408)}},r={};function n(e){var o=r[e];if(void 0!==o)return o.exports;var u=r[e]={exports:{}};return t[e](u,u.exports,n),u.exports}n.m=t,e=[],n.O=(t,r,o,u)=>{if(!r){var i=1/0;for(f=0;f<e.length;f++){for(var[r,o,u]=e[f],a=!0,c=0;c<r.length;c++)(!1&u||i>=u)&&Object.keys(n.O).every((e=>n.O[e](r[c])))?r.splice(c--,1):(a=!1,u<i&&(i=u));if(a){e.splice(f--,1);var s=o();void 0!==s&&(t=s)}}return t}u=u||0;for(var f=e.length;f>0&&e[f-1][2]>u;f--)e[f]=e[f-1];e[f]=[r,o,u]},n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={121:0};n.O.j=t=>0===e[t];var t=(t,r)=>{var o,u,[i,a,c]=r,s=0;if(i.some((t=>0!==e[t]))){for(o in a)n.o(a,o)&&(n.m[o]=a[o]);if(c)var f=c(n)}for(t&&t(r);s<i.length;s++)u=i[s],n.o(e,u)&&e[u]&&e[u][0](),e[u]=0;return n.O(f)},r=self.webpackChunkhngmn_github_io=self.webpackChunkhngmn_github_io||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var o=n.O(void 0,[448],(()=>n(7839)));o=n.O(o)})();