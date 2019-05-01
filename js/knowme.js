
var defaultTopic = '#highlights'


function $(selector, parent){
	if(!parent) {parent = document}
	return parent.querySelector(selector)
}
function toDOM(str){
	return document.createRange().createContextualFragment(str);
}

function showMenu(){
	$("#menu").classList.add('active')
}
function hideMenu(){
	$("#menu").classList.remove('active')
}

function toggle(){
	console.log("sd")
	showMenu()
}

var pageTemplate = '<div id="{{id}}" class="page">{{items}}</div>'
var itemTemplate = '<div class="box"><div class="top"><img src="{{image}}" /></div><a href="{{url}}" target="_blank">{{text}}</a></div>'

function render(){
	// Rennder menu


	let menu = $("#menu div.link")
	let content = $("#content");

	var pages = ""
	data.forEach((page) => {

		var a = document.createElement('a')
		a.href = page.id
		a.innerHTML = page.text
		menu.appendChild(a)


		if(page.id[0] != '#')
			return 0

		let pageNode = pageTemplate.replace("{{id}}", page.id.substring(1))
		// pageNode = toDOM(pageNode)

		// Render all items
		var items = ""
		if(!page.items || !page.items.length){
			page.items = []
			pages += pageNode.replace("{{items}}", "Under construction")
		}
		page.items.forEach((item) => {
			let itemNode = itemTemplate.replace("{{image}}", item.image)
			itemNode = itemNode.replace("{{url}}", item.url)
			itemNode = itemNode.replace("{{text}}", item.text)
			// itemNode = toDOM(itemNode)
			// pageNode.appendChild(itemNode)
			items += itemNode
		})
		pageNode = pageNode.replace("{{items}}", items)

		pages += pageNode
		// content.appendChild(pageNode)
	})
	content.innerHTML = pages
}
render()

function $$(selector, parent){
	if(!parent) {parent = document}
	return parent.querySelectorAll(selector)
}

var currentTopic = defaultTopic
function loadHash() {
	// Load
	currentTopic = (location.hash || currentTopic)

	hideMenu()

	var menu_node = $('#menu div.link a[href="'+currentTopic+'"]')
	$("#top-menu span").innerHTML = menu_node.innerHTML
	if(!menu_node)
		return 0

	if($('#menu a.active'))
		$('#menu a.active').classList.remove('active');
	if($('#content>div.active')){
		$('#content>div.active').classList.remove('show');
		$('#content>div.active').classList.remove('active');
	}

	menu_node.classList.add("active")
	$('#content>'+currentTopic).classList.add("show")
	setInterval(()=>{

		$('#content>'+currentTopic).classList.add("active")
	}, 40)
}
loadHash()
window.onhashchange = loadHash;