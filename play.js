window.addEventListener('load', async function () {
    let params = (new URL(document.location)).searchParams;
    this.document.querySelector('#help').href = `reportissue.html/?type=gamebroken?game=${params.get('game')}`
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
    } else if (game.credit) {
        this.document.querySelector('#desc p').innerText = `All credit goes to ${game.credit} for ${params.get('game')}. We do not intend to copy or claim ${params.get('game')} as our own. We are just rehosting the game so more people could play!`
        if (game.website) {
            this.document.querySelector('#desc p').innerText += ` You can play ${params.get('game')} on the original website: ${game.website}`
        }
    } else {
        this.document.querySelector('#desc').remove();
    }
    gameText = params.get('game').replaceAll(' ', '')
    gameframe.src = game.url || `assets/games/${gameText}/index.html`

    fullscreenBtn = this.document.querySelector('#fullscreen')
    document.body.addEventListener('click', function(e) {
        if (fullscreenBtn.matches(':hover')) {
            gameframe.requestFullscreen();
            gameframe.contentWindow.focus();
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