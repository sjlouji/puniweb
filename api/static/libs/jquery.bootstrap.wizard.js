/*!
 * jQuery twitter bootstrap wizard plugin
 * Examples and documentation at: http://github.com/VinceG/twitter-bootstrap-wizard
 * version 1.0
 * Requires jQuery v1.3.2 or later
 * Supports Bootstrap 2.2.x, 2.3.x, 3.0
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Authors: Vadim Vincent Gabriel (http://vadimg.com), Jason Gill (www.gilluminate.com)
 */

(function(e) {
	var n=function(d, k) {
		d=e(d);
		var a=this, g=[], c=e.extend( {}, e.fn.bootstrapWizard.defaults, k), f=null, b=null;
		this.rebindClick=function(h, a) {
			h.unbind("click", a).bind("click", a)
		}
		;
		this.fixNavigationButtons=function() {
			f.length||(b.find("a:first").tab("show"), f=b.find('li:has([data-toggle="tab"]):first'));
			e(c.previousSelector, d).toggleClass("disabled", a.firstIndex()>=a.currentIndex());
			e(c.nextSelector, d).toggleClass("disabled", a.currentIndex()>=a.navigationLength());
			e(c.backSelector, d).toggleClass("disabled", 0==g.length);
			a.rebindClick(e(c.nextSelector, d), a.next);
			a.rebindClick(e(c.previousSelector, d), a.previous);
			a.rebindClick(e(c.lastSelector, d), a.last);
			a.rebindClick(e(c.firstSelector, d), a.first);
			a.rebindClick(e(c.backSelector, d), a.back);
			if(c.onTabShow&&"function"===typeof c.onTabShow&&!1===c.onTabShow(f, b, a.currentIndex()))return!1
		}
		;
		this.next=function(h) {
			if(d.hasClass("last")||c.onNext&&"function"===typeof c.onNext&&!1===c.onNext(f, b, a.nextIndex()))return!1;
			h=a.currentIndex();
			$index=a.nextIndex();
			$index> a.navigationLength()||(g.push(h), b.find('li:has([data-toggle="tab"]):eq('+$index+") a").tab("show"))
		}
		;
		this.previous=function(h) {
			if(d.hasClass("first")||c.onPrevious&&"function"===typeof c.onPrevious&&!1===c.onPrevious(f, b, a.previousIndex()))return!1;
			h=a.currentIndex();
			$index=a.previousIndex();
			0>$index||(g.push(h), b.find('li:has([data-toggle="tab"]):eq('+$index+") a").tab("show"))
		}
		;
		this.first=function(h) {
			if(c.onFirst&&"function"===typeof c.onFirst&&!1===c.onFirst(f, b, a.firstIndex())||d.hasClass("disabled"))return!1;
			g.push(a.currentIndex());
			b.find('li:has([data-toggle="tab"]):eq(0) a').tab("show")
		}
		;
		this.last=function(h) {
			if(c.onLast&&"function"===typeof c.onLast&&!1===c.onLast(f, b, a.lastIndex())||d.hasClass("disabled"))return!1;
			g.push(a.currentIndex());
			b.find('li:has([data-toggle="tab"]):eq('+a.navigationLength()+") a").tab("show")
		}
		;
		this.back=function() {
			if(0==g.length)return null;
			var a=g.pop();
			if(c.onBack&&"function"===typeof c.onBack&&!1===c.onBack(f, b, a))return g.push(a), !1;
			d.find('li:has([data-toggle="tab"]):eq('+ a+") a").tab("show")
		}
		;
		this.currentIndex=function() {
			return b.find('li:has([data-toggle="tab"])').index(f)
		}
		;
		this.firstIndex=function() {
			return 0
		}
		;
		this.lastIndex=function() {
			return a.navigationLength()
		}
		;
		this.getIndex=function(a) {
			return b.find('li:has([data-toggle="tab"])').index(a)
		}
		;
		this.nextIndex=function() {
			return b.find('li:has([data-toggle="tab"])').index(f)+1
		}
		;
		this.previousIndex=function() {
			return b.find('li:has([data-toggle="tab"])').index(f)-1
		}
		;
		this.navigationLength=function() {
			return b.find('li:has([data-toggle="tab"])').length- 1
		}
		;
		this.activeTab=function() {
			return f
		}
		;
		this.nextTab=function() {
			return b.find('li:has([data-toggle="tab"]):eq('+(a.currentIndex()+1)+")").length?b.find('li:has([data-toggle="tab"]):eq('+(a.currentIndex()+1)+")"): null
		}
		;
		this.previousTab=function() {
			return 0>=a.currentIndex()?null: b.find('li:has([data-toggle="tab"]):eq('+parseInt(a.currentIndex()-1)+")")
		}
		;
		this.show=function(b) {
			b=isNaN(b)?d.find('li:has([data-toggle="tab"]) a[href=#'+b+"]"): d.find('li:has([data-toggle="tab"]):eq('+b+") a");
			0<b.length&& (g.push(a.currentIndex()), b.tab("show"))
		}
		;
		this.disable=function(a) {
			b.find('li:has([data-toggle="tab"]):eq('+a+")").addClass("disabled")
		}
		;
		this.enable=function(a) {
			b.find('li:has([data-toggle="tab"]):eq('+a+")").removeClass("disabled")
		}
		;
		this.hide=function(a) {
			b.find('li:has([data-toggle="tab"]):eq('+a+")").hide()
		}
		;
		this.display=function(a) {
			b.find('li:has([data-toggle="tab"]):eq('+a+")").show()
		}
		;
		this.remove=function(a) {
			var c="undefined"!=typeof a[1]?a[1]: !1;
			a=b.find('li:has([data-toggle="tab"]):eq('+a[0]+")");
			c&&(c=a.find("a").attr("href"), e(c).remove());
			a.remove()
		}
		;
		var l=function(d) {
			var g=b.find('li:has([data-toggle="tab"])');
			d=g.index(e(d.currentTarget).parent('li:has([data-toggle="tab"])'));
			g=e(g[d]);
			if(c.onTabClick&&"function"===typeof c.onTabClick&&!1===c.onTabClick(f, b, a.currentIndex(), d, g))return!1
		}
		,
		m=function(d) {
			$element=e(d.target).parent();
			d=b.find('li:has([data-toggle="tab"])').index($element);
			if($element.hasClass("disabled")||c.onTabChange&&"function"===typeof c.onTabChange&&!1===c.onTabChange(f, b, a.currentIndex(), d))return!1;
			f=$element;
			a.fixNavigationButtons()
		}
		;
		this.resetWizard=function() {
			e('a[data-toggle="tab"]', b).off("click", l);
			e('a[data-toggle="tab"]', b).off("shown shown.bs.tab", m);
			b=d.find("ul:first", d);
			f=b.find('li:has([data-toggle="tab"]).active', d);
			e('a[data-toggle="tab"]', b).on("click", l);
			e('a[data-toggle="tab"]', b).on("shown shown.bs.tab", m);
			a.fixNavigationButtons()
		}
		;
		b=d.find("ul:first",
		d);
		f=b.find('li:has([data-toggle="tab"]).active',
		d);
		b.hasClass(c.tabClass)||b.addClass(c.tabClass);
		if(c.onInit&&"function"===typeof c.onInit)c.onInit(f,
		b,
		0);
		if(c.onShow&&"function"===typeof c.onShow)c.onShow(f,
		b,
		a.nextIndex());
		e('a[data-toggle="tab"]',
		b).on("click",
		l);
		e('a[data-toggle="tab"]',
		b).on("shown shown.bs.tab",
		m)
	}
	;
	e.fn.bootstrapWizard=function(d) {
		if("string"==typeof d) {
			var k=Array.prototype.slice.call(arguments, 1);
			1===k.length&&k.toString();
			return this.data("bootstrapWizard")[d](k)
		}
		return this.each(function(a) {
			a=e(this);
			if(!a.data("bootstrapWizard")) {
				var g=new n(a, d);
				a.data("bootstrapWizard", g);
				g.fixNavigationButtons()
			}
		}
		)
	}
	;
	e.fn.bootstrapWizard.defaults= {
		tabClass: "nav nav-pills", nextSelector: ".wizard li.next", previousSelector: ".wizard li.previous", firstSelector: ".wizard li.first", lastSelector: ".wizard li.last", backSelector: ".wizard li.back", onShow: null, onInit: null, onNext: null, onPrevious: null, onLast: null, onFirst: null, onBack: null, onTabChange: null, onTabClick: null, onTabShow: null
	}
}
)(jQuery);