window.addEventListener("DOMContentLoaded", async () => {
    const upvote = document.getElementById("upvote-button");
    const downvote = document.getElementById("downvote-button");
    const scoreDiv = document.getElementById("totalScore");

    let score = scoreDiv.innerText;
    const questionTitleDiv = document.querySelector('.questiontitle');
    const questionId = questionTitleDiv.id;
    const voteDiv = document.getElementById("voting-div");
    let counter = 1;
    voteDiv.addEventListener('click', async (event) => {
        if (event.target.id === "upvote-button") {

            const body = { score: 1 };
            const response = await fetch(`${questionId}/vote`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(body)
            });
            const { totalScore } = await response.json();
            //console.log(totalScore)
            scoreDiv.innerText = totalScore;
            counter++;
            if (counter % 2 !== 1) {
                upvote.innerText = "▲";
                downvote.setAttribute("class", "hidden");
                upvote.setAttribute("class", "voting-button");
            } else {
                upvote.innerText = "△";
                downvote.removeAttribute("class", "hidden");
                downvote.setAttribute("class", "voting-button");
            }
        }
        if (event.target.id === "downvote-button") {

            const body = { score: -1 };
            const response = await fetch(`${questionId}/vote`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify(body)
            });
            const { totalScore } = await response.json();
            //console.log(totalScore)
            scoreDiv.innerText = totalScore;
            counter++;
            if (counter % 2 !== 1) {
                downvote.innerText = "▼";
                upvote.setAttribute("class", "hidden");
                downvote.setAttribute("class", "voting-button");

            } else {
                downvote.innerText = "▽";
                upvote.removeAttribute("class", "hidden");
                upvote.setAttribute("class", "voting-button");
            }
        }

    });




    const upvoteRes = document.querySelectorAll(".upvote-resbutton");
    const downvoteRes = document.querySelectorAll(".downvote-resbutton");
    const scoreDivRes = document.querySelectorAll(".totalRespScore");
    //const responseTextDiv = document.querySelector('.response-text');
    // const responseTextDiv = document.querySelector('.response-text');
    // let responseId = responseTextDiv.id;

    const voteDivRes = document.querySelectorAll(".response-voting");
    let counterRes = 1;

    
    voteDivRes.forEach(voteDiv => {
        voteDiv.addEventListener('click', async (event) => {
            if (event.target.id.includes("upvote")) {
                let temp = event.target.id.split('W')[1];
                let responseId = Number(temp);
                const body = { scoreRes: 1, responseId };
                const res = await fetch(`${questionId}/vote`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": 'application/json',
                    },
                    body: await JSON.stringify(body)
                });
                const { totalResScore } = await res.json();
                //console.log(totalResScore)
                let resScore = document.getElementById(`totalRespScore${responseId}`)
                resScore.innerText = await totalResScore;
                counterRes++;
                //console.log(counterRes)
                let upRes = document.getElementById(`${event.target.id}`);
                let downRes = document.getElementById(`${event.target.id}`);
                if (counterRes % 2 !== 1) {
                    upRes.innerText = "▲";
                    downRes.setAttribute("class", "hidden");
                    upRes.setAttribute("class", "voting-response-button");
                } else {
                    upRes.innerText = "△";
                    downRes.removeAttribute("class", "hidden");
                    downRes.setAttribute("class", "voting-response-button");
                }
            }
            if (event.target.id.includes("downvote")) {
                let temp = await event.target.id.split('W')[1];
                let responseId = Number(temp);
                const body = { scoreRes: -1, responseId };
                const response = await fetch(`${questionId}/vote`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": 'application/json',
                    },
                    body: await JSON.stringify(body)
                });
                const { totalResScore } = await response.json();
                let resScore = document.getElementById(`totalRespScore${responseId}`)
                resScore.innerText = await totalResScore;
                counterRes++;
                let upRes = document.getElementById(`${event.target.id}`);
                let downRes = document.getElementById(`${event.target.id}`);
                if (counterRes % 2 !== 1) {
                    downRes.innerText = "▼";
                    upRes.setAttribute("class", "hidden");
                    downRes.setAttribute("class", "voting-response-button");

                } else {
                    downRes.innerText = "▽";
                    upRes.removeAttribute("class", "hidden");
                    upRes.setAttribute("class", "voting-response-button");
                }
            }

        });
    })
});