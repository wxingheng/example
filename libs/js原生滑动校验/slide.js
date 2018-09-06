var box = document.getElementById('verify_box');
var xbox = document.getElementById('verify_xbox');
var element = document.getElementById('btn');
var b = box.offsetWidth;
var o = element.offsetWidth;
var reset = document.getElementById('reset');
element.ondragstart = function () {
    return false;
};
element.onselectstart = function () {
    return false;
};
console.log('document.onmousemove------->', document.onmousemove);
element.onmousedown = function (e) {
    var disX = e.clientX - element.offsetLeft;
    document.onmousemove = function (e) {
        var l = e.clientX - disX + o;
        if (l < o) {
            l = o
        }
        if (l > b) {
            l = b
        }
        xbox.style.width = l + 'px';
    };
    document.onmouseup = function (e) {
        var l = e.clientX - disX + o;
        if (l < b) {
            l = o
        } else {
            l = b;
            xbox.innerHTML = '验证通过<div id="btn"><img style="margin-top:8px" src="kkk.png"/></div>';
        }
        xbox.style.width = l + 'px';
        document.onmousemove = null;
        document.onmouseup = null;
    };

}
reset.onclick = function () {
    
    document.getElementById('verify_xbox').innerHTML = `<div id="btn">
    <img src="kkk.png" />
    </div>`;
    document.getElementById('verify_xbox').style.width = '54px'

    let box = document.getElementById('verify_box');
    let xbox = document.getElementById('verify_xbox');
    let element = document.getElementById('btn');
    let b = box.offsetWidth;
    let o = element.offsetWidth;


    element.ondragstart = function () {
        return false;
    };
    element.onselectstart = function () {
        return false;
    };
    element.onmousedown = function (e) {
        var disX = e.clientX - element.offsetLeft;
        document.onmousemove = function (e) {
            var l = e.clientX - disX + o;
            if (l < o) {
                l = o
            }
            if (l > b) {
                l = b
            }
            xbox.style.width = l + 'px';
        };
        document.onmouseup = function (e) {
            var l = e.clientX - disX + o;
            if (l < b) {
                l = o
            } else {
                l = b;
                xbox.innerHTML = '验证通过<div id="btn"><img style="margin-top:8px" src="kkk.png"/></div>';
            }
            xbox.style.width = l + 'px';
            document.onmousemove = null;
            document.onmouseup = null;
        };
    
    }

}