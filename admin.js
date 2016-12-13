!function(e){"use strict";var t=function(e){return e},n=function(t){return e.isArray(t)},i=function(e){return!n(e)&&e instanceof Object},r=function(t,n){return e.inArray(n,t)},a=function(e,t){return-1!==r(e,t)},c=function(e,t){for(var n in e)e.hasOwnProperty(n)&&t(e[n],n,e)},o=function(e){return e[e.length-1]},u=function(e){return Array.prototype.slice.call(e)},d=function(){var e={};return c(u(arguments),function(t){c(t,function(t,n){e[n]=t})}),e},s=function(e,t){var n=[];return c(e,function(e,i,r){n.push(t(e,i,r))}),n},l=function(e,t,n){var i={};return c(e,function(e,r,a){r=n?n(r,e):r,i[r]=t(e,r,a)}),i},p=function(e,t,i){return n(e)?s(e,t):l(e,t,i)},f=function(e,t){return p(e,function(e){return e[t]})},h=function(e,t,n){return p(e,function(e,i){return e[t].apply(e,n||[])})},v=function(e){e=e||{};var t={};return e.publish=function(e,n){c(t[e],function(e){e(n)})},e.subscribe=function(e,n){t[e]=t[e]||[],t[e].push(n)},e.unsubscribe=function(e){c(t,function(t){var n=r(t,e);-1!==n&&t.splice(n,1)})},e};!function(e){var t=function(e,t){var n=v(),i=e.$;return n.getType=function(){throw'implement me (return type. "text", "radio", etc.)'},n.$=function(e){return e?i.find(e):i},n.disable=function(){n.$().prop("disabled",!0),n.publish("isEnabled",!1)},n.enable=function(){n.$().prop("disabled",!1),n.publish("isEnabled",!0)},t.equalTo=function(e,t){return e===t},t.publishChange=function(){var e;return function(i,r){var a=n.get();t.equalTo(a,e)||n.publish("change",{e:i,domElement:r}),e=a}}(),n},u=function(e,n){var i=t(e,n);return i.get=function(){return i.$().val()},i.set=function(e){i.$().val(e)},i.clear=function(){i.set("")},n.buildSetter=function(e){return function(t){e.call(i,t)}},i},d=function(e,t){e=n(e)?e:[e],t=n(t)?t:[t];var i=!0;return e.length!==t.length?i=!1:c(e,function(e){a(t,e)||(i=!1)}),i},s=function(e){var t={},n=u(e,t);return n.getType=function(){return"button"},n.$().on("change",function(e){t.publishChange(e,this)}),n},l=function(t){var i={},r=u(t,i);return r.getType=function(){return"checkbox"},r.get=function(){var t=[];return r.$().filter(":checked").each(function(){t.push(e(this).val())}),t},r.set=function(t){t=n(t)?t:[t],r.$().each(function(){e(this).prop("checked",!1)}),c(t,function(e){r.$().filter('[value="'+e+'"]').prop("checked",!0)})},i.equalTo=d,r.$().change(function(e){i.publishChange(e,this)}),r},p=function(e){var t={},n=C(e,t);return n.getType=function(){return"email"},n},f=function(n){var i={},r=t(n,i);return r.getType=function(){return"file"},r.get=function(){return o(r.$().val().split("\\"))},r.clear=function(){this.$().each(function(){e(this).wrap("<form>").closest("form").get(0).reset(),e(this).unwrap()})},r.$().change(function(e){i.publishChange(e,this)}),r},m=function(e){var t={},n=u(e,t);return n.getType=function(){return"hidden"},n.$().change(function(e){t.publishChange(e,this)}),n},g=function(n){var i={},r=t(n,i);return r.getType=function(){return"file[multiple]"},r.get=function(){var e,t=r.$().get(0).files||[],n=[];for(e=0;e<(t.length||0);e+=1)n.push(t[e].name);return n},r.clear=function(){this.$().each(function(){e(this).wrap("<form>").closest("form").get(0).reset(),e(this).unwrap()})},r.$().change(function(e){i.publishChange(e,this)}),r},y=function(e){var t={},i=u(e,t);return i.getType=function(){return"select[multiple]"},i.get=function(){return i.$().val()||[]},i.set=function(e){i.$().val(""===e?[]:n(e)?e:[e])},t.equalTo=d,i.$().change(function(e){t.publishChange(e,this)}),i},w=function(e){var t={},n=C(e,t);return n.getType=function(){return"password"},n},b=function(t){var n={},i=u(t,n);return i.getType=function(){return"radio"},i.get=function(){return i.$().filter(":checked").val()||null},i.set=function(t){t?i.$().filter('[value="'+t+'"]').prop("checked",!0):i.$().each(function(){e(this).prop("checked",!1)})},i.$().change(function(e){n.publishChange(e,this)}),i},k=function(e){var t={},n=u(e,t);return n.getType=function(){return"range"},n.$().change(function(e){t.publishChange(e,this)}),n},$=function(e){var t={},n=u(e,t);return n.getType=function(){return"select"},n.$().change(function(e){t.publishChange(e,this)}),n},C=function(e){var t={},n=u(e,t);return n.getType=function(){return"text"},n.$().on("change keyup keydown",function(e){t.publishChange(e,this)}),n},x=function(e){var t={},n=u(e,t);return n.getType=function(){return"textarea"},n.$().on("change keyup keydown",function(e){t.publishChange(e,this)}),n},T=function(e){var t={},n=C(e,t);return n.getType=function(){return"url"},n},_=function(t){var n={},a=t.$,o=t.constructorOverride||{button:s,text:C,url:T,email:p,password:w,range:k,textarea:x,select:$,"select[multiple]":y,radio:b,checkbox:l,file:f,"file[multiple]":g,hidden:m},u=function(t,r){var c=i(r)?r:a.find(r);c.each(function(){var i=e(this).attr("name");n[i]=o[t]({$:e(this)})})},d=function(t,u){var d=[],s=i(u)?u:a.find(u);i(u)?n[s.attr("name")]=o[t]({$:s}):(s.each(function(){-1===r(d,e(this).attr("name"))&&d.push(e(this).attr("name"))}),c(d,function(e){n[e]=o[t]({$:a.find('input[name="'+e+'"]')})}))};return a.is("input, select, textarea")?a.is('input[type="button"], button, input[type="submit"]')?u("button",a):a.is("textarea")?u("textarea",a):a.is('input[type="text"]')||a.is("input")&&!a.attr("type")?u("text",a):a.is('input[type="password"]')?u("password",a):a.is('input[type="email"]')?u("email",a):a.is('input[type="url"]')?u("url",a):a.is('input[type="range"]')?u("range",a):a.is("select")?a.is("[multiple]")?u("select[multiple]",a):u("select",a):a.is('input[type="file"]')?a.is("[multiple]")?u("file[multiple]",a):u("file",a):a.is('input[type="hidden"]')?u("hidden",a):a.is('input[type="radio"]')?d("radio",a):a.is('input[type="checkbox"]')?d("checkbox",a):u("text",a):(u("button",'input[type="button"], button, input[type="submit"]'),u("text",'input[type="text"]'),u("password",'input[type="password"]'),u("email",'input[type="email"]'),u("url",'input[type="url"]'),u("range",'input[type="range"]'),u("textarea","textarea"),u("select","select:not([multiple])"),u("select[multiple]","select[multiple]"),u("file",'input[type="file"]:not([multiple])'),u("file[multiple]",'input[type="file"][multiple]'),u("hidden",'input[type="hidden"]'),d("radio",'input[type="radio"]'),d("checkbox",'input[type="checkbox"]')),n};e.fn.inputVal=function(t){var n=e(this),i=_({$:n});return n.is("input, textarea, select")?"undefined"==typeof t?i[n.attr("name")].get():(i[n.attr("name")].set(t),n):"undefined"==typeof t?h(i,"get"):(c(t,function(e,t){i[t].set(e)}),n)},e.fn.inputOnChange=function(t){var n=e(this),i=_({$:n});return c(i,function(e){e.subscribe("change",function(e){t.call(e.domElement,e.e)})}),n},e.fn.inputDisable=function(){var t=e(this);return h(_({$:t}),"disable"),t},e.fn.inputEnable=function(){var t=e(this);return h(_({$:t}),"enable"),t},e.fn.inputClear=function(){var t=e(this);return h(_({$:t}),"clear"),t}}(jQuery),e.fn.repeaterVal=function(){var t=function(e){var t=[];return c(e,function(e,n){var i=[];"undefined"!==n&&(i.push(n.match(/^[^\[]*/)[0]),i=i.concat(p(n.match(/\[[^\]]*\]/g),function(e){return e.replace(/[\[\]]/g,"")})),t.push({val:e,key:i}))}),t},n=function(e){if(1===e.length&&(0===e[0].key.length||1===e[0].key.length&&!e[0].key[0]))return e[0].val;c(e,function(e){e.head=e.key.shift()});var t,i=function(){var t={};return c(e,function(e){t[e.head]||(t[e.head]=[]),t[e.head].push(e)}),t}();return/^[0-9]+$/.test(e[0].head)?(t=[],c(i,function(e){t.push(n(e))})):(t={},c(i,function(e,i){t[i]=n(e)})),t};return n(t(e(this).inputVal()))},e.fn.repeater=function(n){return n=n||{},e(this).each(function(){var i=e(this),r=n.show||function(){e(this).show()},a=n.hide||function(e){e()},u=i.find("[data-repeater-list]").first(),s=function(t,n){return t.filter(function(){return!n||0===e(this).closest(f(n,"selector").join(",")).length})},l=function(){return s(u.find("[data-repeater-item]"),n.repeaters)},h=u.find("[data-repeater-item]").first().clone().hide(),v=e(this).find("[data-repeater-item]").first().find("[data-repeater-delete]");n.isFirstItemUndeletable&&v&&v.remove();var m=function(){var e=u.data("repeater-list");return n.$parent?n.$parent.data("item-name")+"["+e+"]":e},g=function(t){n.repeaters&&t.each(function(){var t=e(this);c(n.repeaters,function(e){t.find(e.selector).repeater(d(e,{$parent:t}))})})},y=function(e,t,n){e&&c(e,function(e){n.call(t.find(e.selector)[0],e)})},w=function(t,n,i){t.each(function(t){var r=e(this);r.data("item-name",n+"["+t+"]"),s(r.find("[name]"),i).each(function(){var a=e(this),c=a.attr("name").match(/\[[^\]]+\]/g),u=c?o(c).replace(/\[|\]/g,""):a.attr("name"),d=n+"["+t+"]["+u+"]"+(a.is(":checkbox")||a.attr("multiple")?"[]":"");a.attr("name",d),y(i,r,function(i){var r=e(this);w(s(r.find("[data-repeater-item]"),i.repeaters||[]),n+"["+t+"]["+r.find("[data-repeater-list]").first().data("repeater-list")+"]",i.repeaters)})})}),u.find("input[name][checked]").removeAttr("checked").prop("checked",!0)};w(l(),m(),n.repeaters),g(l()),n.ready&&n.ready(function(){w(l(),m(),n.repeaters)});var b=function(){var i=function(n,r,a){if(r){var c={};s(n.find("[name]"),a).each(function(){var t=e(this).attr("name").match(/\[([^\]]*)(\]|\]\[\])$/)[1];c[t]=e(this).attr("name")}),n.inputVal(p(r,t,function(e){return c[e]}))}y(a,n,function(t){var n=e(this);s(n.find("[data-repeater-item]"),t.repeaters).each(function(){i(e(this),t.defaultValues,t.repeaters||[])})})};return function(t){u.append(t),w(l(),m(),n.repeaters),t.find("[name]").each(function(){e(this).inputClear()}),i(t,n.defaultValues,n.repeaters)}}(),k=function(){var e=h.clone();b(e),n.repeaters&&g(e),r.call(e.get(0))};i.children().each(function(){e(this).is("[data-repeater-list]")||0!==e(this).find("[data-repeater-list]").length||(e(this).is("[data-repeater-create]")?e(this).click(k):0!==e(this).find("[data-repeater-create]").length&&e(this).find("[data-repeater-create]").click(k))}),u.on("click","[data-repeater-delete]",function(){var t=e(this).closest("[data-repeater-item]").get(0);a.call(t,function(){e(t).remove(),w(l(),m(),n.repeaters)})})}),this}}(jQuery),function(e){function t(){var t=/value="(#(?:[0-9a-f]{3}){1,2})"/i;e(".edd-repeater .edd-color-picker").length&&e(".edd-repeater").each(function(n,i){e(i).find(".edd-repeater-item.opened").each(function(n,i){e(i).find(".edd-color-picker").each(function(n,i){var r=t.exec(e(i)[0].outerHTML)[1];e(i).val(r).attr("value",r).wpColorPicker()})})})}function n(){e(".edd-repeater .edd-chosen").length&&e(".edd-repeater").each(function(t,n){e(n).find(".edd-repeater-item.opened").each(function(t,n){e(n).find(".edd-chosen").chosen()})})}var i=e("[data-edd-repeater]");if(i.length){t(),n();var r=function(){e(this).find(".repeater-header h2 span.title").html(e(this).find(".repeater-header h2").data("repeater-collapsable-default")),e(this).find("select").each(function(t,n){var i=e(n).find("option[selected]").val();e(n).val(i)}),e(this).find('input[type="checkbox"].default-checked').each(function(t,n){e(n).prop("checked",!0)});var i=e(this).closest("[data-edd-repeater]"),r=e(this).find(".nested-repeater");e(r).each(function(t,n){var r=e(n).find(".edd-repeater-item").get().reverse();return 1==r.length||void e(r).each(function(t,n){return t!=r.length-1&&(e(n).stop().slideUp(300,function(){e(this).remove()}),void e(i).trigger("edd-nested-repeater-cleanup",[e(n)]))})}),e(this).addClass("opened").removeClass("closed").stop().slideDown(),t(),n(),e(i).trigger("edd-repeater-add",[e(this)])},a=function(){var t=e(this).closest("[data-edd-repeater]");e(this).stop().slideUp(300,function(){e(this).remove()}),e(t).trigger("edd-repeater-remove",[e(this)])};i.each(function(){var i=e(this),c=i.find("[data-repeater-dummy]");i.repeater({repeaters:[{selector:".nested-repeater",show:r,hide:a}],show:r,hide:a,ready:function(e){i.find("tbody").on("sortupdate",e)}}),c.length&&c.remove(),"undefined"!=typeof i.attr("data-repeater-sortable")&&i.find(".edd-repeater-list").sortable({axis:"y",handle:"[data-repeater-item-handle]",forcePlaceholderSize:!0,update:function(e,n){t()}}),"undefined"!=typeof i.attr("data-repeater-collapsable")&&i.find(".edd-repeater-content").hide(),e(document).on("click touchend",".edd-repeater[data-repeater-collapsable] [data-repeater-collapsable-handle]",function(){var t=e(this).closest(".edd-repeater-item"),i=t.find(".edd-repeater-content").first(),r=t.hasClass("opened")?"closing":"opening";"opening"==r?(i.stop().slideDown(),t.addClass("opened"),t.removeClass("closed"),n()):(i.stop().slideUp(),t.addClass("closed"),t.removeClass("opened"))}),e(document).on("keyup change",'.edd-repeater .edd-repeater-content td:first-of-type *[type!="hidden"]',function(){if(""!==e(this).val())e(this).closest(".edd-repeater-item").find(".repeater-header h2 span.title").html(e(this).val());else{var t=e(this).closest(".edd-repeater-item").find(".repeater-header h2").data("repeater-collapsable-default");e(this).closest(".edd-repeater-item").find(".repeater-header h2 span.title").html(t)}})})}}(jQuery),function(e){"use strict";var t=function(t,n){"edd-repeater-add"==t.type&&(t=n,n=0);var i=e(t).closest(".edd-repeater-item");0==n?(e(i).find("select").each(function(t,n){e(n).val(0),e(n).hasClass("edd-chosen")&&e(n).trigger("chosen:updated")}),e(i).find(".edd-slack-conditional").closest("td").addClass("hidden"),e(i).find(".edd-slack-replacement-instruction").closest("td").addClass("hidden")):(e(i).find(".edd-slack-conditional."+n).closest("td.hidden").removeClass("hidden"),e(i).find(".edd-slack-conditional").not("."+n).closest("td").addClass("hidden"),e(i).find(".edd-slack-replacement-instruction."+n).removeClass("hidden"),e(i).find(".edd-slack-replacement-instruction").not("."+n).addClass("hidden"))},n=function(t,n){var i=n.find('input[name$="[slack_post_id]"]').val(),r=e('input[type="hidden"][name^="edd_slack_deleted_"]'),a=r.val();i&&(a=a?a+","+i:i,r.val(a))},i=function(){var i=e("[data-edd-repeater]");void 0!==typeof EDD_Slack_Admin,i.length&&(i.on("edd-repeater-add",t),i.on("repeater-show",t),i.on("edd-repeater-remove",n))};i(),e(document).ready(function(){e(".edd-slack-trigger").each(function(n,i){t(i,e(i).val())}),e(document).on("change",".edd-slack-trigger",function(){t(e(this),e(this).val())})})}(jQuery),function(e){e.EDDSlackOauthPopup=function(e){e.windowName=e.windowName||"ConnectWithOAuth",e.windowOptions=e.windowOptions||"location=0,status=0,width=800,height=400",e.callback=e.callback||function(){window.location.reload()},e.redirectURI=e.redirectURI||!1;var t=this;t._oauthWindow=window.open(e.path,e.windowName,e.windowOptions),t._oauthInterval=setInterval(function(){try{t._oauthWindow.location.href.indexOf(e.redirectURI)!==-1&&t._oauthWindow.location.href.indexOf("&error=access_denied")==-1&&(clearInterval(t._oauthInterval),e.redirectURI=t._oauthWindow.location.href.replace("&state=","&state=saving"),e.callback(e.redirectURI),t._oauthWindow.close())}catch(n){}},100)},e(document).ready(function(){e(".edd-slack-app-auth").length>0&&e(".edd-slack-app-auth").on("click",function(t){t.preventDefault();for(var n,i=e(this).attr("href"),r=/[?&]([^=#]+)=([^&#]*)/g,a="";null!==(n=r.exec(i));)"redirect_uri"===n[1]&&(a=decodeURIComponent(n[2]));var c=void 0!=window.screenLeft?window.screenLeft:screen.left,o=void 0!=window.screenTop?window.screenTop:screen.top,u=700,d=650,s=window.innerWidth?window.innerWidth:document.documentElement.clientWidth?document.documentElement.clientWidth:screen.width,l=window.innerHeight?window.innerHeight:document.documentElement.clientHeight?document.documentElement.clientHeight:screen.height,p=s/2-u/2+c,f=l/2-d/2+o;e.EDDSlackOauthPopup({path:i,redirectURI:a,windowOptions:"location=0,status=0,width="+u+",height="+d+",top="+f+",left="+p,callback:function(e){window.location=e}})})})}(jQuery);
//# sourceMappingURL=admin.js.map
