window.addEventListener('load', async function () {
    let params = (new URL(document.location)).searchParams;
    let data = await fetch("assets/games/games.json")
        .then((res) => {
        return res.json();
    })
    let game = data[params.get('game')];
    console.log(game);

    if (game.note) {
        this.document.querySelector('#note').innerText = game.note
    } else {
        this.document.querySelector('#note').remove()
    }

    gameframe = document.querySelector('#game-frame')

    this.document.querySelector('#play').innerText = `play ${params.get('game')}`
    if (game.desc) {
        this.document.querySelector('#desc p').innerText = game.desc
    } else {
        this.document.querySelector('#desc p').remove()
    }
    gameframe.src = game.url || `assets/games/${params.get('game').replaceAll(' ', '')}/index.html`

    fullscreenBtn = this.document.querySelector('#fullscreen')
    document.body.addEventListener('click', function(e) {
        if (fullscreenBtn.matches(':hover')) {
            gameframe.requestFullscreen();
        }
    }, true); 

    window.addEventListener('resize', function(e) {
        if(screen.width === window.innerWidth && screen.height === window.innerHeight) {
            e.preventDefault()
            gameframe.requestFullscreen();
        }
    })

    this.document.addEventListener('keydown', function (e) {
        if (e.key == "F2") {
            console.log('test')
        }
    });
})