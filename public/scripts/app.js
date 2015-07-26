// Main variable, contains all the web events and actions
var App = {
	//Initialize the App
	initialize: function(config){
		this.dataUrl = config.dataUrl;
		this.navItems = [];
		this.loadNavigation();
	},


	// Load the desktop navigation
	loadNavigation: function(){
		loadJSON(this.showNavigation, this.dataUrl, this);
	},

	// Load desktop events
	loadEvents: function(){
		var elements = document.getElementsByClassName("nav-item");
		for(var i = 0, l = elements.length; i < l; i++){
			var elem = elements[i];
			elem.onmouseover = this.showSubMenu.bind(this);
		}
	},

	// Load mobile events
	loadMobileEvents: function(){
		var menuIcon = document.getElementById('toggleMobile');
		menuIcon.onclick = this.showMenuMobile.bind(this);

		var chevrons = document.getElementsByClassName('chevron');
		var parent = document.getElementById('menu');
		for(var i= 0, l = chevrons.length; i < l; i++){
			var index = chevrons[i].getAttribute('data-id');
			var list = document.createElement('ul');
			list.className = 'items-list';
			var elements = this.navItems[index].items;
			for(var j = 0, m = elements.length; j < m; j++){
				var item = document.createElement('li');
				var link = document.createElement('a');
				link.href = elements[j].url;
				link.innerHTML = elements[j].label;
				item.appendChild(link);
				list.appendChild(item);
			}
			parent.insertBefore(list, chevrons[i].parentElement.nextSibling);
			chevrons[i].onclick = this.showSubmenuMobile;
		}
	},

	// Creates and injects the desktop navigation
	// <strong>@param: data</strong> Contains the nav.json information
	showNavigation: function(data){
		this.navItems = data.items;
		for(var i = 0, l = this.navItems.length; i < l; i++){
			var elem = this.navItems[i];
			var template = document.createElement('a');
			template.href = elem.url;
			template.className = "nav-item";
			template.innerHTML = elem.label;
			template.setAttribute('data-id', i);
			if(elem.items.length > 0){
				var chevron = document.createElement('a');
				chevron.setAttribute('data-id', i);
				chevron.className = "chevron";
				template.appendChild(chevron);
			}
			var container = document.getElementById('menu');
			container.appendChild(template);
		}
		if(!isMobile()){this.loadEvents();}else{this.loadMobileEvents()};
	},

	// Creates and injects the accordion sub menu
	// <strong>@param: evt</strong> contains the event information
	showSubMenu: function(evt){
		this.removeSubMenu();
		var navItem = evt.srcElement;
		navItem.className = navItem.className + ' hover';
		var index = navItem.getAttribute('data-id');
		var subItems = this.navItems[index].items;
		if(subItems.length > 0){
			var container = document.createElement('div');
			var menu = document.getElementsByClassName('nav-item');
			var positionX = menu[index].offsetLeft;
			container.className = 'submenu';
			container.id = 'submenu';
			container.setAttribute("style", 'left:' + positionX + 'px');
			for(var i = 0, l = subItems.length; i < l; i++){
				var template = document.createElement('a');
				template.href = subItems[i].url;
				template.className = "nav-subitem";
				template.innerHTML = subItems[i].label;
				container.appendChild(template);
			}
			var header = document.getElementById('header');
			header.appendChild(container);
			container.onmouseleave = this.removeSubMenu.bind(this);
			document.getElementById('shadow').className = 'shadow';
		}else{
			navItem.onmouseleave = this.removeSubMenu.bind(this);
		}
		
	},

	// Remove the accordion sub menu from the screen on mouse leave
	// <strong>@param: evt</strong> contains the event information
	removeSubMenu: function(evt){
		var parent = document.getElementById('header');
		var menu = document.getElementById('submenu');
		var hover = document.getElementsByClassName('hover');
		if(hover[0]){hover[0].className = hover[0].className.substr(0, hover[0].className.indexOf(' hover'));}
		if(menu){parent.removeChild(menu);};
		document.getElementById('shadow').className = 'hide shadow';
	},

	// show mobile menu when user clicks the toggle button
	// <strong>@param: evt</strong> contains the event information
	showMenuMobile: function(evt){
		var menu = document.getElementById('menu');
		if(menu.className.indexOf('closed') == -1){
			var toggle = evt.srcElement;
			menu.style.margin = "20px 0 0 0";
			menu.className = menu.className + ' closed';
			toggle.className = toggle.className + ' close';	
			document.getElementById('shadow').className = 'shadow';
		}else{
			this.hideMenuMobile();
		}
		
	},

	// hide mobile menu when user clicks the close button
	// <strong>@param: evt</strong> contains the event information
	hideMenuMobile: function(){
		var menu = document.getElementById('menu');
		menu.style.margin = "20px 0 0 -80%";
		menu.className = menu.className.substr(0, menu.className.indexOf(' closed'));

		var toggle = document.getElementById('toggleMobile');
		toggle.className = toggle.className.substr(0, toggle.className.indexOf(' close'));	

		document.getElementById('shadow').className = 'hide shadow';
	},

	// show/hide accordion sub menu when user clicks the chevron
	// <strong>@param: evt</strong> contains the event information
	showSubmenuMobile: function(evt){
		var list = evt.srcElement.parentElement.nextSibling;
		var show = document.getElementsByClassName('show');
		if(show.length > 0){show[0].className = show[0].className.substr(0, show[0].className.indexOf(' show'));}

		var chevron = evt.srcElement;
		if(chevron.className.indexOf('rotate') == -1){
			var temp = document.getElementsByClassName('rotate');
			if(temp.length > 0){ temp[0].className = temp[0].className.substr(0, temp[0].className.indexOf(' rotate'))};
			chevron.className = chevron.className + ' rotate';
			list.className = list.className + ' show';
		}else{
			chevron.className = chevron.className.substr(0, chevron.className.indexOf(' rotate'));
		}
	}
};