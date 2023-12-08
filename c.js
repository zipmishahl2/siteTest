	;(function(main) {
		var args = {};
		main(args);
	})(function(args) {

		'use strict';

		var c = document.getElementById('c');
		var ctx = c.getContext('2d');
		var WIDTH = c.width = window.innerWidth;
		var HEIGHT = c.height = window.innerHeight;

		var Rect = function(x, y, w, h) {
			this.x = x;
			this.y = y;
			this.w = w;
			this.h = h;
			this.color = 0;
			this.a = Math.random() * Math.PI * 2;
			this.s = Math.random() * 10;
			this.opacity = 1;
		};

		Rect.prototype = {
			constructor: Rect,
			update: function() {
				this.x += Math.cos(this.a) * this.s;
				this.y += Math.sin(this.a) * this.s;
				this.opacity -= 0.01;
				this.color += 0.5;
				if(this.x < 0 || this.x > WIDTH || this.y < 0 || this.y > HEIGHT || this.opacity <= 0) {
					this.x = WIDTH / 2;
					this.y = HEIGHT / 2;
					this.a = Math.random() * Math.PI * 2;
					this.s = Math.random() * 10;
					this.opacity = 1;
				}
			},
			render: function(ctx) {
				ctx.save();
				ctx.fillStyle = 'hsla(' + this.color + ', 100%, 50%, '+ this.opacity + ')';
				ctx.transform(
					Math.cos(this.a), 
					Math.sin(this.a), 
					-Math.sin(this.a), 
					Math.cos(this.a), 
					this.x, this.y);
				ctx.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
				ctx.restore();
			}
		};

		var rect = null;
		var rectList = [];
		var initCount = 100;
		var maxCount = 500;

		for(var i = 0; i < initCount; i++) {
			rect = new Rect(WIDTH / 2, HEIGHT / 2, 50 + Math.random() * 50, Math.random() * 2);
			rectList.push(rect);
		}

		ctx.globalAlpha = 0.1;
		requestAnimationFrame(function loop() {
			requestAnimationFrame(loop);
			ctx.globalCompositeOperation = 'source-over';
			ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
			ctx.fillRect(0, 0, WIDTH, HEIGHT);
			ctx.globalCompositeOperation = 'lighter';
			for(var i = 0; i < rectList.length; i++) {
				rect = rectList[i];
				rect.update();
				rect.render(ctx);
			}
			if(rectList.length < maxCount) {
				rect = new Rect(WIDTH / 2, HEIGHT / 2, 50 + Math.random() * 50, 2 + Math.random() * 2);
				rectList.push(rect);
			}
		});


	});
