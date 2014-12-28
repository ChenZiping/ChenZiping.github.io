// JavaScript Document
JSWK.scrollAd={/*滚动效果广告*/
		imgchgInterval:'',
		curIndex:0,/*当前索引值*/
		IsScroll:false,/*是否正在滚动，默认未滚动*/
		dirType:"left",/*滚动模式（left or top）左右或上下滚动*/
		scrollChange:function(mode,toIndex){/*mode(对象id,效果切换时间),toIndex为要切换的索引值*/
			var tt=50;/*效果切换时间*/
			var k=mode.split(":");if(parseInt(k[1])>=0){tt=parseInt(k[1]);}
			if(typeof toIndex=="number"){
				var x=toIndex;/*toIndex不为空时 定义要切换的索引值 x=toIndex*/
			}
			else if(parseInt(toIndex)>=0){
				var x=parseInt(toIndex);/*toIndex不为空时 定义要切换的索引值 x=toIndex*/
			}
			else{var x=JSWK.scrollAd.curIndex+1;}/*否则要切换的索引值 x=当前索引(curIndex)+1*/
			var lists=JSWK.childNode(Jid(k[0]));/*获取幻灯片象集*/
			var dirType=JSWK.scrollAd.dirType;
			var itemWidth=dirType=="left" ? Jid(k[0]).clientWidth : Jid(k[0]).clientHeight;/*获取幻灯片的可见宽度或宽度*/
			var stepNum=itemWidth/10;/*定义每步滚动数值*/
			var slv=0;/*定义已滚动数值(对于判断是否滚动完成)*/
			var focusId=Jid(k[0]).getAttribute("focusId");/*获取焦点小图片集所在的对象的id*/
			var focusImgs=JSWK.childNode(Jid(focusId));/*获取焦点小图片集*/
			var nextX=x>=lists.length?0:x;/*定义nextX 如果x>最后一个索引值，则等于索引值0,否则等于索引值x*/
			if(dirType=="left"){
				if(x>=JSWK.scrollAd.curIndex){/*如果x>curIndex（向前切换）*/
					lists[nextX].style.left=itemWidth+"px";/*向前切换时初始化要切换图片的left位置为正值*/	
				}
				else{
					lists[nextX].style.left=(-itemWidth)+"px";/*否则向后切换时初始化要切换图片的left位置为负值*/
				}
				lists[JSWK.scrollAd.curIndex].style.left="0px";
			}
			else{
				if(x>=JSWK.scrollAd.curIndex){/*如果x>curIndex（向前切换）*/
					lists[nextX].style.top=(-itemWidth)+"px";/*向前切换时初始化要切换图片的top位置为负值。注意与left模式正好相反*/	
				}
				else{
					lists[nextX].style.top=itemWidth+"px";/*否则向后切换时初始化要切换图片的top位置为正值*/
				}
				lists[JSWK.scrollAd.curIndex].style.top="0px";
			}
			lists[JSWK.scrollAd.curIndex].style.zIndex="5";
			focusImgs[JSWK.scrollAd.curIndex].className="";/*设置当前小图样式为空*/
			
			lists[nextX].style.zIndex="6";
			lists[nextX].style.display="block";
			focusImgs[nextX].className=focusImgs[nextX].getAttribute("cla");/*设置要切换的小图样式*/
			JSWK.scrollAd.IsScroll=true;/*赋值说明已开始滚动中*/
			
			function scrollIt(){
				if(slv<itemWidth){/*如果没滚动完成*/
					slv+=stepNum;/*滚动值+步值*/
					if(dirType=="left"){
						if(x>=JSWK.scrollAd.curIndex){/*如果x>curIndex（向前切换）*/
							lists[JSWK.scrollAd.curIndex].style.left=(parseInt(lists[JSWK.scrollAd.curIndex].style.left)-stepNum)+"px";
							lists[nextX].style.left=(parseInt(lists[nextX].style.left)-stepNum)+"px";
						}
						else{/*向后滚动*/
							lists[JSWK.scrollAd.curIndex].style.left=(parseInt(lists[JSWK.scrollAd.curIndex].style.left)+stepNum)+"px";
							lists[nextX].style.left=(parseInt(lists[nextX].style.left)+stepNum)+"px";
							
						}
					}
					else{
						if(x>=JSWK.scrollAd.curIndex){/*如果x>curIndex（向前切换） 注意算法与left模式刚好相反*/
							lists[JSWK.scrollAd.curIndex].style.top=(parseInt(lists[JSWK.scrollAd.curIndex].style.top)+stepNum)+"px";
							lists[nextX].style.top=(parseInt(lists[nextX].style.top)+stepNum)+"px";
						}
						else{/*向后滚动*/
							lists[JSWK.scrollAd.curIndex].style.top=(parseInt(lists[JSWK.scrollAd.curIndex].style.top)-stepNum)+"px";
							lists[nextX].style.top=(parseInt(lists[nextX].style.top)-stepNum)+"px";
							
						}
					}
					setTimeout(scrollIt,tt);
				}
				else{
					JSWK.scrollAd.IsScroll=false;/*滚动完成时，把IsScroll设为未滚动*/
					lists[JSWK.scrollAd.curIndex].style.display="none";
					JSWK.scrollAd.curIndex=nextX;/*滚动完成时，之前要切换的索引nextX变成当前索引curIndex*/
				}
			}
			scrollIt();
		},
		setFocus:function(mode,toIndex){/*手动点击图片调用函数,mode值为对象id，效果切换速度时间，延时时间(如100:5000),toIndex为要切换的索引值*/
			if(toIndex!=JSWK.scrollAd.curIndex && !JSWK.scrollAd.IsScroll){/*要切换的对象不为当前对象，且当前处于未滚动状态*/
				var tt=5000;/*延时时间*/
				var k=mode.split(":");if(parseInt(k[2])>=0){tt=parseInt(k[2]);}
				clearInterval(JSWK.scrollAd.imgchgInterval);
				JSWK.scrollAd.scrollChange(mode,toIndex);
				JSWK.scrollAd.imgchgInterval=setInterval(function(){JSWK.scrollAd.scrollChange(mode)},tt);
			}
		},
		startPlay:function(mode,dir){/*开始播放 mode值为对象id，效果切换速度时间，延时时间(如100:5000),dir滚动模式：left or top*/
			var tt=5000;/*延时时间*/
			var k=mode.split(":");if(parseInt(k[2])>=0){tt=parseInt(k[2]);}
			if(dir=="top"){JSWK.scrollAd.dirType=dir;}/*确定是否为自上而下滚动模式，否则为从右至左滚动模式*/
			var focusId=Jid(k[0]).getAttribute("focusId");/*获取焦点小图片集所在的对象的id*/
			var focusImgs=JSWK.childNode(Jid(focusId));/*获取焦点小图片集*/
			focusImgs.each(function(x){/*x为对象编号,由each方法传入所得*/
									var that=this;
									that.onclick=function(){JSWK.scrollAd.setFocus(mode,x);};/*给小图集对象加上onclick事件函数*/
							});
			JSWK.scrollAd.imgchgInterval=setInterval(function(){JSWK.scrollAd.scrollChange(mode)},tt);
		}
};
JSWK.filterAd={/*渐变效果广告*/
		imgchgInterval:'',
		curIndex:0,/*当前索引值*/
		IsFilter:false,/*是否正在变化，默认未变化*/
		filterChange:function(mode,toIndex){/*mode(对象id,效果切换时间),toIndex为要切换的索引值*/
			var tt=50;/*效果切换时间*/
			var k=mode.split(":");if(parseInt(k[1])>=0){tt=parseInt(k[1]);}
			
			if(typeof toIndex=="number"){
				var x=toIndex;/*toIndex不为空时 定义要切换的索引值 x=toIndex*/
			}
			else if(parseInt(toIndex)>=0){
				var x=parseInt(toIndex);/*toIndex不为空时 定义要切换的索引值 x=toIndex*/
			}
			else{var x=JSWK.filterAd.curIndex+1;}/*否则要切换的索引值 x=当前索引(curIndex)+1*/
			var lists=JSWK.childNode(Jid(k[0]));/*获取幻灯片象集*/
			var curFV=10;
			var nextFV=0;/*定义透明度变化初始值为0(对于判断是否渐变完成)*/
			var focusId=Jid(k[0]).getAttribute("focusId");/*获取焦点小图片集所在的对象的id*/
			var focusImgs=JSWK.childNode(Jid(focusId));/*获取焦点小图片集*/
			var nextX=x>=lists.length?0:x;/*定义nextX 如果x>最后一个索引值，则等于索引值0,否则等于索引值x*/

			lists[JSWK.filterAd.curIndex].style.zIndex="5";
			JSWK.opacity(lists[JSWK.filterAd.curIndex],curFV);/*初始当前对象透明度为10*/
			focusImgs[JSWK.filterAd.curIndex].className="";/*设置当前小图样式为空*/
			
			lists[nextX].style.zIndex="4";
			JSWK.opacity(lists[nextX],nextFV);/*初始要切换对象透明度为0*/
			lists[nextX].style.display="block";
			focusImgs[nextX].className=focusImgs[nextX].getAttribute("cla");/*设置要切换的小图样式*/
			JSWK.filterAd.IsFilter=true;/*赋值说明已开始渐变中*/
			
			function filterIt(){
				if(nextFV<10){/*如果没渐变完成*/
					curFV-=1;
					nextFV+=1;
					JSWK.opacity(lists[JSWK.filterAd.curIndex],curFV);
					JSWK.opacity(lists[nextX],nextFV);
					setTimeout(filterIt,tt);
				}
				else{
					JSWK.filterAd.IsFilter=false;/*变化完成时，把IsFilter设为未变化*/
					lists[JSWK.filterAd.curIndex].style.display="none";
					lists[nextX].style.zIndex="5";
					JSWK.filterAd.curIndex=nextX;/*变化完成时，之前要切换的索引nextX变成当前索引curIndex*/
				}
			}
			filterIt();
		},
		setFocus:function(mode,toIndex){/*手动点击图片调用函数,mode值为对象id，效果切换速度时间，延时时间(如100:5000),toIndex为要切换的索引值*/
			if(toIndex!=JSWK.filterAd.curIndex && !JSWK.filterAd.IsFilter){/*要切换的对象不为当前对象，且当前处于未变化状态*/
				var tt=5000;/*延时时间*/
				var k=mode.split(":");if(parseInt(k[2])>=0){tt=parseInt(k[2]);}
				clearInterval(JSWK.filterAd.imgchgInterval);
				JSWK.filterAd.filterChange(mode,toIndex);
				JSWK.filterAd.imgchgInterval=setInterval(function(){JSWK.filterAd.filterChange(mode)},tt);
			}
		},
		startPlay:function(mode){/*开始播放 mode值为对象id，效果切换速度时间，延时时间(如100:5000)*/
			var tt=5000;/*延时时间*/
			var k=mode.split(":");if(parseInt(k[2])>=0){tt=parseInt(k[2]);}
			var focusId=Jid(k[0]).getAttribute("focusId");/*获取焦点小图片集所在的对象的id*/
			var focusImgs=JSWK.childNode(Jid(focusId));/*获取焦点小图片集*/
			focusImgs.each(function(x){/*x为对象编号,由each方法传入所得*/
									var that=this;
									that.onclick=function(){JSWK.filterAd.setFocus(mode,x);};/*给小图集对象加上onclick事件函数*/
							});
			JSWK.filterAd.imgchgInterval=setInterval(function(){JSWK.filterAd.filterChange(mode)},tt);
		}
};