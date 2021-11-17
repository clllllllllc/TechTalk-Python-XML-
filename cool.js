var KEY = { w: 87, a: 65, s: 83, d: 68, j: 74 };
var moveSpeed = 50;

console.log("CDATA disables XML parsing: <svg>")
const smiley = document.getElementById("smiley")
const eyes = document.querySelectorAll("ellipse")
const mouth = document.querySelector("#mouth")
const hello = document.querySelector("text")
const values = document.querySelectorAll(".move")

const projectile = document.querySelector(".projectile")

let shooting = false
let ints = 0

const ml = [-20, 20, 25, 25, 0, 0, 0, 20, 20]

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}


const setRadius = (r, fill, l, tc) => e => {
    eyes.forEach(x => x.setAttribute("ry", r))
    eyes.forEach(x => x.setAttribute("fill", fill))
    ml[3] = l
    mouth.setAttribute('d', `M${ml[0]} ${ml[1]} A${ml[2]} ${ml[3]} ${ml[4]} ${ml[5]} ${ml[6]} ${ml[7]} ${ml[8]}`)
    hello.textContent = tc
}

function sR(r, fill, l, tc) {
    eyes.forEach(x => x.setAttribute("ry", r))
    eyes.forEach(x => x.setAttribute("fill", fill))
    ml[3] = l
    mouth.setAttribute('d', `M${ml[0]} ${ml[1]} A${ml[2]} ${ml[3]} ${ml[4]} ${ml[5]} ${ml[6]} ${ml[7]} ${ml[8]}`)
    hello.textContent = tc
}



document.documentElement.addEventListener('keydown', function (evt) {
    switch (evt.keyCode) {
        case KEY.w:
            values.forEach(x => {
                cy = parseInt(x.getAttribute("cy"))
                x.setAttribute('cy', cy -= moveSpeed)
            })

            ml[1] -= moveSpeed
            ml[8] -= moveSpeed
            mouth.setAttribute('d', `M${ml[0]} ${ml[1]} A${ml[2]} ${ml[3]} ${ml[4]} ${ml[5]} ${ml[6]} ${ml[7]} ${ml[8]}`)

            tcy = parseInt(hello.getAttribute("y"))
            hello.setAttribute('y', tcy -= moveSpeed)

            if (!shooting) {
                let y_pos = parseInt(projectile.getAttribute("cy"))
                y_pos -= moveSpeed
                projectile.setAttribute("cy", y_pos)
            }
            break;
        case KEY.s:
            values.forEach(x => {
                cy = parseInt(x.getAttribute("cy"))
                x.setAttribute('cy', cy += moveSpeed)
            })

            ml[1] += moveSpeed
            ml[8] += moveSpeed
            mouth.setAttribute('d', `M${ml[0]} ${ml[1]} A${ml[2]} ${ml[3]} ${ml[4]} ${ml[5]} ${ml[6]} ${ml[7]} ${ml[8]}`)

            tcy = parseInt(hello.getAttribute("y"))
            hello.setAttribute('y', tcy += moveSpeed)

            if (!shooting) {
                let y_pos = parseInt(projectile.getAttribute("cy"))
                y_pos += moveSpeed
                projectile.setAttribute("cy", y_pos)
            }
            break;
        case KEY.a:
            values.forEach(x => {
                cx = parseInt(x.getAttribute("cx"))
                x.setAttribute('cx', cx -= moveSpeed)
            })

            ml[0] -= moveSpeed
            ml[7] -= moveSpeed
            mouth.setAttribute('d', `M${ml[0]} ${ml[1]} A${ml[2]} ${ml[3]} ${ml[4]} ${ml[5]} ${ml[6]} ${ml[7]} ${ml[8]}`)


            tcx = parseInt(hello.getAttribute("x"))
            hello.setAttribute('x', tcx -= moveSpeed)

            if (!shooting) {
                let x_pos = parseInt(projectile.getAttribute("cx"))
                x_pos -= moveSpeed
                projectile.setAttribute("cx", x_pos)
            }
            break;
        case KEY.d:
            values.forEach(x => {
                cx = parseInt(x.getAttribute("cx"))
                x.setAttribute('cx', cx += moveSpeed)
            })

            ml[0] += moveSpeed
            ml[7] += moveSpeed
            mouth.setAttribute('d', `M${ml[0]} ${ml[1]} A${ml[2]} ${ml[3]} ${ml[4]} ${ml[5]} ${ml[6]} ${ml[7]} ${ml[8]}`)

            tcx = parseInt(hello.getAttribute("x"))
            hello.setAttribute('x', tcx += moveSpeed)

            if (!shooting) {
                let x_pos = parseInt(projectile.getAttribute("cx"))
                x_pos += moveSpeed
                projectile.setAttribute("cx", x_pos)
            }
            break;

        case KEY.j:
            projectile.setAttribute("fill-opacity", 1)
            sR(100, "red", 250, "AAAAAAAAAAAAAAA")
            if (!shooting) {
                projectile.setAttribute("r", 10)
                shooting = true
                projectile.setAttribute("cx", (ml[0] + ml[7]) / 2)
                projectile.setAttribute("cy", ml[8])
                let x_pos = parseInt(projectile.getAttribute("cx"))
                let ballSize = parseInt(projectile.getAttribute("r"))
                ints += 1
                setInterval(function () {
                    let x_pos = parseInt(projectile.getAttribute("cx"))
                    let ballSize = parseInt(projectile.getAttribute("r"))
                    if (shooting) {
                        ballSize += 25 / ints
                        projectile.setAttribute("r", ballSize)
                        x_pos += 300 / ints
                        projectile.setAttribute("cx", x_pos)
                        if (x_pos > 3000) {
                            shooting = false
                            sR(8, "black", 25, "Hello, I'm Human")
                            clearInterval()
                        }
                    }
                }, 100)
            }
            break;
    }
}, false);

smiley.addEventListener("mouseenter", setRadius(100, "red", 250, "AAAAAAAAAAAAAAA"))
smiley.addEventListener("mouseleave", setRadius(8, "black", 25, "Hello, I'm Human"))
