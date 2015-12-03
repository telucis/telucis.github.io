window.onload=function(){
			var addclass=document.getElementById('addclass');
			var addtask=document.getElementById('addtask');
			var clearclass=document.getElementById('clearclass');
			var popup=document.getElementsByClassName('popup');
			var exit=document.getElementsByClassName('exit');
			var afirm=document.getElementsByClassName('afirm');
			var cancel=document.getElementsByClassName('cancel');
			var newclass=document.getElementById('newclass');
			var newtask=document.getElementById('newtask');
			//动态CSS
			subStyle();
			//验证分类唯一性
			function unique(arr){
				var temp=[];
				for(var i=0;i<arr.length;i++){
					var flag=true;
					for(var j=0;j<temp.length;j++){
						if(temp[j]==arr[i]){
							flag=false;
							continue;
						}
					}
					arr[i] && flag==true && temp.push(arr[i]);
				}
				return temp;
			}
			//本地存储保存分类
			if(localStorage.newclass){
				var storage=unique(localStorage.newclass.split(/\|/));
				for(var i=0;i<storage.length;i++){
					var storageLi=document.createElement('li');
					storageLi.innerHTML=storage[i]+'<span class="del">×</span>';
					document.getElementsByTagName('ul')[0].appendChild(storageLi);
					storageLi.getElementsByTagName('span')[0].addEventListener('click',mydel,false);
				}
			}else{localStorage.newclass='';}
			
			//弹出层效果
			addclass.onclick=function(){
				popup[0].style.display="block";
				newclass.focus();
			}
			addtask.onclick=function(){
				popup[1].style.display="block";
			}
			clearclass.addEventListener('click',add_class,false)

			function add_class(){
				if(confirm("删除全部分类？")){
					for(var i=mylist.length-1;i>0;i--){
						mylist[i].remove();
					}
					localStorage.newclass='';	
				}
			}
			
			for(var i=0;i<exit.length;i++){
				exit[i].index=i;
				exit[i].onclick=function(){
					popup[this.index].style.display='none';
				}
			}
			for(var i=0;i<cancel.length;i++){
				cancel[i].index=i;
				cancel[i].onclick=function(){
					popup[this.index].style.display='none';
				}
			}
			//添加分类
			afirm[0].onclick=function(){				
				for(var i=0;i<mylist.length;i++){
					if(newclass.value==mylist[i].innerHTML){
						alert('这个分类已存在，换一个吧！');
						newclass.value='';
						return false;
					}
				}
				var oli=document.createElement('li');
				oli.innerHTML=newclass.value+'<span class="del">×</span>';
				document.getElementsByTagName('ul')[0].appendChild(oli);
				popup[0].style.display='none';
				localStorage.newclass=localStorage.newclass+newclass.value+'|';
				mylist=document.getElementsByClassName('manage')[0].getElementsByTagName('li');
				oli.addEventListener('click',mylistFouce,false);
				oli.getElementsByTagName('span')[0].addEventListener('click',mydel,false);
				//添加任务栏
				var oul=document.createElement('ul');
				oul.setAttribute('id',newclass.value);
				document.getElementsByClassName('main')[0].getElementsByTagName('div')[0].appendChild(oul);

				newclass.value='';
			}

			//管理栏效果
			var mylist=document.getElementsByClassName('manage')[0].getElementsByTagName('li');
			function mydel(){
				var mydel_string=this.parentNode.innerHTML.replace(/\<span class\=\"del\"\>×\<\/span\>/,'');
				this.parentNode.remove();
				localStorage.newclass=localStorage.newclass.replace(eval('/'+mydel_string+'\|/g'),'');
				console.log(localStorage.newclass);
				console.log(mydel_string);
				document.getElementById(mydel_string).remove();
			}
			function mylistFouce(){
				for(var j in mylist){mylist[j].className=''}
				this.className='active';
				
			}
			for(var i=0;i<mylist.length;i++){
				mylist[i].addEventListener('click',mylistFouce,false);				
			}
			 
			//添加任务
			afirm[1].addEventListener('click',add_task,false);
			function add_task(){
				var date_task=new Date();
				var oli=document.createElement('li');
				oli.innerHTML=newtask.value;
				document.getElementsByClassName('main')[0].getElementsByTagName('ul')[0].appendChild(oli);

			}
		}