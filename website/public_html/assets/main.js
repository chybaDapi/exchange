Account=function(){var t=function(){$("form").on("submit",function(){var t=$(this),e=t.find("button"),n=e.text();return t.find("button").text("Wait..."),$.ajax({url:t.attr("action"),type:t.attr("method"),data:t.serialize()}).done(function(e){var a=JSON.parse(e);Toasters.create(a.message),t.find("button").text(n)}),!1})},e=function(){t()};return{init:e}}(),Activation=function(){var t=function(){$("#activationForm").on("submit",function(){var t=$(this),e=t.find("button"),n=e.text();return t.find("button").text("Wait..."),$.ajax({url:t.attr("action"),type:t.attr("method"),data:t.serialize()}).done(function(e){var a=JSON.parse(e);"undefined"!=typeof a.message&&a.message.length>0&&Toasters.create(a.message),t.find("button").text(n),a.success===!0&&(location.href="/")}),!1})},e=function(){t()};return{init:e}}(),Dashboard=function(){var t={currencies:ko.observableArray([]),lastUpdateTime:ko.observable(),modalBoxTitle:ko.observable()},e=function(t){return t<10?"0"+t:t},n=function(){var n=new WebSocket("ws://webtask.future-processing.com:8068/ws/currencies");n.onmessage=function(n){var a=JSON.parse(n.data),o=new Date(a.PublicationDate),i=[];a.Items.forEach(function(t){t.SellPrice=parseFloat(t.SellPrice).toFixed(2),t.UnitPrice=parseFloat(t.PurchasePrice).toFixed(2),t.PurchasePrice=parseFloat(t.PurchasePrice*t.Unit).toFixed(2),t.AvailableInWallet=$("body").find("[data-currency="+t.Code.toLowerCase()+"]").text(),i.push(t)}),t.currencies(i),t.lastUpdateTime(e(o.getHours())+":"+e(o.getMinutes())+":"+e(o.getSeconds())),$('[data-toggle="tooltip"]').tooltip()},ko.applyBindings(t,document.getElementsByClassName("dashboard")[0])},a=function(){$("body").on("click",'[data-openModalBox="modalBox"]',function(){ModalBox.open($(this))})},o=function(){$("#modalBox").on("submit","form",function(){var t=$("#currency").val(),e=$("#amount").val(),n=$("#total").val();if(!confirm("Are you sure you want to buy "+e+" "+t+" and pay "+n+" PLN?"))return!1;var a=$(this),o=a.find("button[type=submit]"),i=o.text();return o.text("Wait..."),$.ajax({url:a.attr("action"),type:a.attr("method"),data:a.serialize()}).done(function(t){var e=JSON.parse(t);"undefined"!=typeof e.message&&e.message.length>0&&(Toasters.create(e.message),ModalBox.close()),o.text(i),e.success===!0&&location.reload()}),!1})},i=function(){n(),a(),o()};return{init:i}}(),Homepage=function(){var t=function(){$("#registryForm").on("submit",function(){var t=$(this),e=t.find("button"),n=e.text();return t.find("button").text("Wait..."),$.ajax({url:t.attr("action"),type:t.attr("method"),data:t.serialize()}).done(function(e){var a=JSON.parse(e);Toasters.create(a.message),t.find("button").text(n),a.success===!0&&(t.find("input:not(:checkbox)").val(""),t.find(":checkbox").prop("checked",!1))}),!1})},e=function(){$("#loginForm").on("submit",function(){var t=$(this),e=t.find("button"),n=e.text();return t.find("button").text("Wait..."),$.ajax({url:t.attr("action"),type:t.attr("method"),data:t.serialize()}).done(function(e){var a=JSON.parse(e);"undefined"!=typeof a.message&&a.message.length>0&&Toasters.create(a.message),t.find("button").text(n),a.success===!0&&(location.href="/dashboard")}),!1})},n=function(){t(),e()};return{init:n}}(),$(function(){"/"===document.location.pathname&&Homepage.init(),"/account/edit"===document.location.pathname&&Account.init(),"/dashboard"===document.location.pathname&&Dashboard.init(),0===document.location.pathname.lastIndexOf("/register/activation",0)&&Activation.init()}),ModalBox=function(){var t=$("#modalBox"),e=$(".dashboard"),n=function(n){var a=n.attr("data-modalBoxUrl"),o=n.attr("data-modalBoxUrlParam");$.ajax({url:a+(o?o:"")}).done(function(n){t.modal("show"),e.css({filter:"blur(5px)"}),t.find(".modal-content").html(n)}),t.on("hidden.bs.modal",function(){e.css({filter:"blur(0)"})})},a=function(){t.modal("hide")};return{open:n,close:a}}(),Toasters=function(){var t,e=$("body"),n=function(n){a(),e.append('<div class="toaster">'+n+"</div>"),e.find(".toaster").animate({top:"25px"},250),t=setTimeout(function(){a()},7e3)},a=function(){"undefined"!=typeof t&&clearTimeout(t),e.find(".toaster").animate({top:"-250px"},250,function(){$(this).remove()})};return{create:n}}();