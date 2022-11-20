var homeData = new Array();

document.body.onload = () => {
    route('shimmer');
    loadData();
}

document.querySelectorAll('.playPauseBtn').forEach((btn) => {
    btn.addEventListener('click', function () {
        togglePPIcon(this.querySelector("Img").id);
    });
});

document.querySelectorAll('.navItem, .navItem2').forEach((btn) => {
    btn.addEventListener('click', function () {
        var current = document.getElementsByClassName("sideBarActive");
        current[0].className = current[0].className.replace(" sideBarActive", "");
        this.className += " sideBarActive";
        route(this.id);
    });
});

document.getElementById("SvgMenu").onclick = () => {
    var x = document.getElementById("navMenuLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}



function random_bg_color() {
    let red = Math.floor(Math.random() * 176) + 10
    let green = Math.floor(Math.random() * 176) + 10;
    let blue = Math.floor(Math.random() * 176) + 10;
    let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
    return bgColor;
}

function togglePPIcon(id) {
    var img = document.getElementById(id).src;
    if (img.indexOf('assets/ic_play.svg') != -1)
        document.getElementById(id).src = 'assets/ic_pause.svg';
    else
        document.getElementById(id).src = 'assets/ic_play.svg';

}

function route(id) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("content").innerHTML = this.responseText;
        }
    };
    xhttp.onload = function () {
        if (id == 'search') {
            document.querySelectorAll('.catCard').forEach((card) => {
                card.style.backgroundColor = random_bg_color();
            });
        }

        if (id == 'library') {
            document.querySelectorAll(".musiclistbutton")[0].addEventListener('click', () => {
                document.querySelector(".availListCtnr").style = "display: block;";
                document.querySelector(".noListCtnr").style = "display: none;";
            });
        }
        if (id == 'home') {
            var cards = document.querySelectorAll(".spotify-playlist > .list .item");
            homeData.forEach((item, idx) => {
                console.log(idx);
                cards[idx].querySelector("h4").textContent = item.title;
                cards[idx].querySelector("p").textContent = item.subtitle;
                cards[idx].querySelector("img").src = item.img;
                cards[idx].addEventListener("click", () => {
                    route('playlist');
                });
            });
        }
        if (id == 'playlist'){
            //document.querySelector('.nav').style = 'background-color: transparent;';
        }
    }
    xhttp.open("GET", "pages/" + id + ".txt", true);
    xhttp.send();
}


function loadData() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://musify.42web.io/Api's/getPlaylistForHome.php?id=18", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(this.responseText);
            obj.forEach(element => {
                console.log(element.ptitle);
                console.log(element.pimg_path);
                console.log(element.psubtitle);
                let imgp = element.pimg_path.replace(".", "");
                homeData.push({ title: element.ptitle, subtitle: element.psubtitle, img: "https://musify.42web.io" + imgp });
            });
        }
    };
    xhttp.onload = function () {
        //setTimeout("route('home')", 2000);
        route('home');
    }

}





/* let audio = new Audio("http://21273.live.streamtheworld.com/LOS40_DANCE.mp3");

let volume = document.querySelector("#volume");
volume.addEventListener("change", function(e) {
audio.volume = e.currentTarget.value / 100;
}) */