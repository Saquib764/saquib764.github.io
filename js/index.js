
function $(el){
	return document.querySelector(el);
}

class App{
	
	init() {
		console.log("Init")
		this.attachListeners()
		this.state = {
			lightbox: false
		}
	}

	attachListeners(){
		document.onscroll = this.onScroll.bind(this)
		document.onkeyup = this.onKey.bind(this)
		$("div#photography>div.thumb").onclick = this.showlightbox.bind(this)
		$("div#photography>div.lightbox").onclick = this.hidelightbox.bind(this)
	}
	hidelightbox(e){
		this.state.lightbox = false
		$("div#photography>div.lightbox img").src = ""
		$("div#photography>div.lightbox").style.display = "none"
	}
	showlightbox(e){
		this.state.lightbox = true
		$("div#photography>div.lightbox img").src = e.target.src
		$("div#photography>div.lightbox").style.display = "block"
	}

	onKey(e){
		if(this.state.lightbox){
			switch(e.code){
				case "Escape":
				case "Space": this.hidelightbox()
			}
			e.preventDefault();
			return false
		}
		
	}

	onScroll(e){
		let currScroll = window.pageYOffset;
		if($("div#photography").offsetTop - 100 > currScroll && currScroll > $("div#about").offsetTop){
			$('div.menu').classList.add("shadow-black")
		}else{
			$('div.menu').classList.remove("shadow-black")
		}
	}
	sigmoid(t){
		let c = 10
		return 1.0/(1 + Math.exp(-c*(t-0.5)))
	}
	goto(id){
		let startScroll = window.pageYOffset;
		let target = $(id).offsetTop || 0;
		let L = target - startScroll;
		let x = 0;
		var dt = 0.01;

		var animator = setInterval(()=>{
			let currScroll = window.pageYOffset;
			if(x > 1.0){
				return clearInterval(animator)
			}
			x += dt;
			window.scrollTo(0, startScroll + this.sigmoid(x)*L)
		}, dt*1000)
	}
}

var app = new App()

app.init()