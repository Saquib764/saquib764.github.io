
function $(el){
	return document.querySelector(el);
}

class App{
	
	init() {
		console.log("Init")
		this.attachListeners()
	}

	attachListeners(){
		document.onscroll = this.onScroll.bind(this)
	}

	onScroll(e){
		let currScroll = window.pageYOffset;
		if(currScroll > $("div#about").offsetTop){
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