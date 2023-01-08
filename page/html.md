# Refresh

```html
<meta http-equiv="Refresh" content="3;url=/thermos"/>
```

# Worker
```html
<!DOCTYPE html>
<html lang="zh">
    <meta charset="utf-8" />
    <title> Test </title>
    <body> 
        <main>
            <p>Count numbers: <output id="result"></output></p>
            <button onclick="startWorker()">Start Worker</button> 
            <button onclick="stopWorker()">Stop Worker</button>
        </main>
    </body> 
    <script>
        let init = 1;
var blob = new Blob(['var i=0; function timedCount(){i=i+1;postMessage(i);setTimeout(() => { timedCount() },500)};timedCount();']);
var url = URL.createObjectURL(blob);
var w;
function startWorker() {
    if(typeof(Worker) !== "undefined") {
        if(typeof(w) == "undefined") {
            w = new Worker(url);
        }
        w.onmessage = function(event) {
            document.getElementById("result").innerHTML = event.data;
        };
    } else {
        document.getElementById("result").innerHTML = "No Web Worker support.";
    }
}

function stopWorker() { 
    w.terminate();
    w = undefined;
}
    </script>
</html>

```
