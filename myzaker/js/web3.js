var fix_video_size = function(vid,width,height){
		var qqvideoWidth = document.body.clientWidth - 34;
		var qqvideoHeight = qqvideoWidth * height / width ;
		var ele1 = document.getElementById(vid);
		var ele2 = document.getElementById('IFRAME_'+vid);
		// ele1.style.width = qqvideoWidth + 'px';
		// ele1.style.height = qqvideoHeight + 'px';
		// console.log(qqvideoWidth+"x"+qqvideoHeight);
		// ele2.style.width = qqvideoWidth + 'px';
		// ele2.style.height = qqvideoHeight + 'px';
		var url = ele2.src;
		if(url.match(/yuntv\.letv\.com/g)){
			var reg_width    = /width=[\d]*/g;
			var reg_height   = /height=[\d]*[\.\d]*/g;
			var reg_auto_play = /auto_play=1/g;
			var parse_width  = 'width='+qqvideoWidth;
			var parse_height = 'height='+qqvideoHeight;
			var parse_auto_play = 'auto_play=0';

			if(url.match(reg_width)){
				url = url.replace(reg_width,parse_width)
			}else{
				url = url + '&' + parse_width;
			}
			if(url.match(reg_height)){
				url = url.replace(reg_height,parse_height)
			}else{
				url = url + '&' + parse_height;
			}
			if(url.match(reg_auto_play)){
				url = url.replace(reg_auto_play,parse_auto_play)
			}else{
				url = url + '&' + parse_auto_play;
			}

			ele2.src = url;
		}
		// ele1.style.paddingBottom = '0px';
		ele1.style.backgroundColor = '#fff';
    }