# animation
```css
#tv1{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #1be1f6;
    animation:slashStar 2s ease-in-out .3s infinite;
}

@keyframes slashStar {
     0% {
         opacity:1
     }
     to {
         opacity:0
     }
}
```
# px2pw
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>calc</title>
		<style>
			.lost{
				color: #FFF;
				position: absolute; 
				top: 38.165vw; 
				left: 24.597vw;
			}
			.lost i{
				margin-right:7.906vw;
				color: #03801e;
				font-size:1.025vw;
			}
		</style>
	</head>
	<body style="background:#d5d5d5;">
		<div style="width: 61.8vw;margin:4.392vw auto;height: 38.1924vw;background: #000;">
			<div style="padding: 4.026vw;">
				<div style="color:#b1b1b1;margin-bottom:2.196vw;font-size:1.025vw;">
					Setting: 100vw = 
					<input id="ininVal" value="1920" style="height:1.464vw;width:7.321vw;border:solid 0.0734vw #828282;font-size:1.025vw;background: #000;color:#24a44a;">
					px
				</div>
				<div>
					<input id="inp" style="height:2.196vw;width:17.377vw;border:solid 0.073vw #24a44a;background: #000;color:#FFF;font-size:1.318vw;">
				</div>

				<div style="margin:2.196vw auto;color: #b1b1b1;font-size: 1.171vw;">
					Result:
					<b>
						<i id="val" style="color:#24a44a;font-size:1.537vw;">NaNaa</i>
					</b>
				</div>
				<button id="copy-btn" style="color: #000;background:#ececec;height: 2.196vw;font-size: 1.025vw;width: 7.392vw;border: none;">COPY</button>
				<div style="margin:2.196vw auto;color: #FFF;">
						<i id="result-i" style="display:none;color:#24a44a;font-size:1.171vw;">copy success</i>
				</div>
			</div>
			<div class="lost">
				<i>4</i>
				<i>8</i>
				<i>15</i>
				<i>16</i>
				<i>23</i>
				<i>42</i>
			</div>
		</div>
	</body>
	<script>
		document.getElementById('inp').focus();
		document.onkeydown = function(e){
			if(e.keyCode == 13){
				calcVal();
				copyText();
			}
		}
		document.getElementById('copy-btn').addEventListener('click', function(){
			calcVal();
			copyText();	
		}, false);   


		document.getElementById('inp').addEventListener('focus', function(){
			document.getElementById("inp").value = "";
			setTimeout(function(){ 
				document.getElementById("result-i").style.display = 'none';
			}, 2333);
		}, false);   

		function calcVal(){
			let initVal = document.getElementById("ininVal").value;
			let inpV = document.getElementById("inp").value;
			let res = inpV * 100 / initVal;
			let m =	Math.round(res*1000)/1000;
			document.getElementById("val").innerText = m + 'vw';
		}
		function copyText(){
			let text = document.getElementById("val").innerText.trim();
			const input = document.createElement('input');
			document.body.appendChild(input);
			input.setAttribute('value', text);
			input.select();
			if (document.execCommand('copy')) {
				document.execCommand('copy');
				document.getElementById("result-i").style.display = 'inline';
				document.getElementById('inp').focus()
			}
			document.body.removeChild(input);
		}
	</script>
</html>
```
# selectors
#### .c1.c2{}
-- class同时是 c1 和 c2

#### .c1 .c2{}
-- 类名是 c2
-- 存在类名是 c1 的父元素

#### .c1,.c2{}
-- 类名是 c1 或 c2

#### .c1 > .c2{}
-- 类名是c2 
-- 直接父元素类名是 c1

#### .c1 + .c2{}
-- 类名是 c2
-- 上一个同级元素类名是 c1

#### .c1 ~ .c2{}
-- 类名是 c2
-- 元素前存在一个类名是 c1 的同级元素





# clear

### 定义和用法

clear 属性规定元素的哪一侧不允许其他浮动元素。
### 说明

clear 属性定义了元素的哪边上不允许出现浮动元素。在 CSS1 和 CSS2 中，这是通过自动为清除元素（即设置了 clear 属性的元素）增加上外边距实现的。在 CSS2.1 中，会在元素上外边距之上增加清除空间，而外边距本身并不改变。不论哪一种改变，最终结果都一样，如果声明为左边或右边清除，会使元素的上外边框边界刚好在该边上浮动元素的下外边距边界之下。

| 默认值     | none                        |
| ---------- | --------------------------- |
| 继承性     | no                          |
| 版本       | CSS1                        |
| JavaScript | object.style.clear="left"   |

### 可能的值

| 值      | 描述                                |
| ------- | ----------------------------------- |
| left    | 在左侧不允许浮动元素                |
| right   | 在右侧不允许浮动元素                |
| both    | 在左右两侧均不允许浮动元素          |
| none    | 默认值  允许浮动元素出现在两侧      |
| inherit | 规定应该从父元素继承 clear 属性的值 |


