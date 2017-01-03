(function(e){"use strict";e.subformRepeatable=function(t,n){this.$container=e(t);if(this.$container.data("subformRepeatable"))return r;this.$container.data("subformRepeatable",r),this.options=e.extend({},e.subformRepeatable.defaults,n),this.template="",this.prepareTemplate(),this.$containerRows=this.options.rowsContainer?this.$container.find(this.options.rowsContainer):this.$container,this.lastRowNum=this.$containerRows.find(this.options.repeatableElement).length;var r=this;this.$container.on("click",this.options.btAdd,function(t){t.preventDefault();var n=e(this).parents(r.options.repeatableElement);n.length||(n=null),r.addRow(n)}),this.$container.on("click",this.options.btRemove,function(t){t.preventDefault();var n=e(this).parents(r.options.repeatableElement);r.removeRow(n)}),this.options.btMove&&this.$containerRows.sortable({items:this.options.repeatableElement,handle:this.options.btMove,tolerance:"pointer"}),this.$container.trigger("subform-ready")},e.subformRepeatable.prototype.prepareTemplate=function(){if(this.options.rowTemplateSelector){var t=this.$container.find(this.options.rowTemplateSelector)[0]||{};this.template=e.trim(t.text||t.textContent)}else{var n=this.$container.find(this.options.repeatableElement).get(0),r=e(n).clone();try{this.clearScripts(r)}catch(i){window.console&&console.log(i)}this.template=r.prop("outerHTML")}},e.subformRepeatable.prototype.addRow=function(t){var n=this.$containerRows.find(this.options.repeatableElement).length;if(n>=this.options.maximum)return null;var r=e.parseHTML(this.template);t?e(t).after(r):this.$containerRows.append(r);var i=e(r);i.attr("data-new","true"),this.fixUniqueAttributes(i,n);try{this.fixScripts(i)}catch(s){window.console&&console.log(s)}return this.$container.trigger("subform-row-add",i),i},e.subformRepeatable.prototype.removeRow=function(e){var t=this.$containerRows.find(this.options.repeatableElement).length;if(t<=this.options.minimum)return;this.$container.trigger("subform-row-remove",e),e.remove()},e.subformRepeatable.prototype.fixUniqueAttributes=function(t,n){this.lastRowNum++;var r=t.attr("data-group"),i=t.attr("data-base-name"),n=n||0,s=Math.max(this.lastRowNum,n+1),o=i+s;this.lastRowNum=s,t.attr("data-group",o);var u=t.find("*[name]"),a={};for(var f=0,l=u.length;f<l;f++){var c=e(u[f]),h=c.attr("name"),p=h.replace(/(\]|\[\]$)/g,"").replace(/\[/g,"_"),d=h.replace("["+r+"][","["+o+"]["),v=p.replace(r,o),m=p;if(c.prop("type")==="checkbox"){if(h.match(/\[\]$/)){var g=t.find('label[for="'+p+'"]');g.length&&(g.attr("for",v),c.parents("fieldset.checkboxes").attr("id",v));var n=a[p]?a[p].length:0;m+=n,v+=n}}else if(c.prop("type")==="radio"){var n=a[p]?a[p].length:0;m+=n,v+=n}a[p]?a[p].push(!0):a[p]=[!0],c.attr("name",d),c.attr("id",v),t.find('label[for="'+m+'"]').attr("for",v)}},e.subformRepeatable.prototype.clearScripts=function(t){e.fn.chosen&&t.find("select.chzn-done").each(function(){var t=e(this);t.next(".chzn-container").remove(),t.show().addClass("fix-chosen")}),e.fn.minicolors&&(t.find(".minicolors input").each(function(){e(this).minicolors('destroy', e(this));}))},e.subformRepeatable.prototype.fixScripts=function(t){e.fn.chosen&&t.find("select.advancedSelect").chosen(),t.find(".minicolors").each(function(){var t=e(this);t.minicolors({control:t.attr("data-control")||"hue",position:t.attr("data-position")||"right",theme:"bootstrap"})}),t.find('a[onclick*="jInsertFieldValue"]').each(function(){var t=e(this),n=t.siblings('input[type="text"]').attr("id"),r=t.prev(),i=r.attr("href");t.attr("onclick","jInsertFieldValue('', '"+n+"');return false;"),r.attr("href",i.replace(/&fieldid=(.+)&/,"&fieldid="+n+"&"))}),e.fn.fieldMedia&&t.find(".field-media-wrapper").fieldMedia(),e.fn.tooltip&&t.find(".hasTooltip").tooltip({html:!0,container:"body"}),e.fn.fieldUser&&t.find(".field-user-wrapper").fieldUser(),window.SqueezeBox&&window.SqueezeBox.assign&&SqueezeBox.assign(t.find("a.modal").get(),{parse:"rel"})},e.subformRepeatable.defaults={btAdd:".group-add",btRemove:".group-remove",btMove:".group-move",minimum:0,maximum:10,repeatableElement:".subform-repeatable-group",rowTemplateSelector:"script.subform-repeatable-template-section",rowsContainer:null},e.fn.subformRepeatable=function(t){return this.each(function(){var t=t||{},n=e(this).data();if(n.subformRepeatable)return;for(var r in n)n.hasOwnProperty(r)&&(t[r]=n[r]);var i=new e.subformRepeatable(this,t);e(this).data("subformRepeatable",i)})},e(window).on("load",function(){e("div.subform-repeatable").subformRepeatable()})})(jQuery);