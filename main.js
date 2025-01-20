let turnX = true;
      let btn = document.querySelectorAll(".image-button"); 
      let rtbtn = document.querySelector("#rstbt");
      let resultBoard = document.querySelector(".result-board");
      let resultaxe =document.querySelector("#resultaxe");
      let resultgun =document.querySelector("#resultgun");
      let soundb = document.getElementById("audiob");
      let pushwon = document.getElementById("pushaudio");
      let sekhwon =document.getElementById("sekhaudio");
      let tiewon =document.getElementById("tieaudio");
      let Btn = document.querySelector(".Btn");
      let welpage =document.querySelector(".welpage");
      let captcha = document.querySelector("#captcha");
      let welaud = document.querySelector("#welaud");
      let mainbg = document.querySelector("#Mainbgm");
      const contrbgm = document.createElement("img");
      contrbgm.id = "contrbgm";
      contrbgm.src = "/src/Assets/RR-Mute.svg"; 
      contrbgm.style.width = "25px";
      contrbgm.style.position = "absolute";
      contrbgm.style.zIndex = 2;
      contrbgm.style.top = "3%";
      contrbgm.style.right = "3%";
      
      document.body.appendChild(contrbgm); 
      
      contrbgm.addEventListener("click", () => {
        if (mainbg.paused) {
          mainbg.play();
          mainbg.volume = 0.02;
          contrbgm.src = "/src/Assets/RR-Mute.svg";
         
        } else {
          mainbg.pause();
          contrbgm.src = "/src/Assets/RR-Unmute.svg";
          mainbg.volume = 0.01;
        }
      });
      
      Btn.addEventListener("click",()=>{
        let dabba = document.getElementById("dabba").value;
        if(dabba.trim() === captcha.innerHTML.trim() ){
          welpage.style.transform = "translateY(-100vh)"; 
          welpage.style.transition = " ease 1s";

        }
        else{
          welaud.currentTime=0;
          welaud.play();
        }
        welaud.currentTime=0;
        
      })


      const winningPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      // Add event listeners to all buttons
      btn.forEach((box, index) => {
        box.addEventListener("click", function () {
          soundb.play();
          const img = document.createElement("img");
          img.id = "imgg";
          img.src = turnX ? "/src/Assets/RR-Axe.svg" : "/src/Assets/RR-Gun.svg"; 
          console.log("Image source:", img.src);
          img.style.width = "50px";
          img.style.position = "absolute";
          img.style.top = "50%";
          img.style.left = "50%";
          img.style.transform = "translate(-50%, -50%)";
          box.style.position = "relative";
          box.appendChild(img);
          box.disabled = true; 
          turnX = !turnX; 
          checkPatterns(); 
        });
      });

  
      const checkPatterns = () => {
        for (let pattern of winningPatterns) {
          const [a, b, c] = pattern;
          const imgA = btn[a].querySelector("#imgg");
          const imgB = btn[b].querySelector("#imgg");
          const imgC = btn[c].querySelector("#imgg");
    
          if (imgA && imgB && imgC && imgA.src === imgB.src && imgB.src === imgC.src) {
           
            const winnerIm = document.createElement("img");
            winnerIm.id="wonImgs"
    
            if (imgA.src.includes("Axe")) {
              winnerIm.src = "/src/Assets/PUSHPA WON THE MATCH.svg";
              resultaxe.style.visibility ="visible"; 
              pushwon.currentTime = 0;
              pushwon.play();
           
            } else {
              winnerIm.src = "/src/Assets/SHEKHAWAT WON THE MATCH.svg";
              resultgun.style.visibility ="visible"; 
              sekhwon.currentTime = 0;
              sekhwon.play();
            }
    
            announceWinner(winnerIm); 
            btn.forEach((box) => (box.disabled = true)); 
            return;
          }
        }
    
     
        if ([...btn].every((box) => box.querySelector("#imgg") !== null)) {
          const tieImage = document.createElement("img");
          tieImage.id="tieIm";
          tieImage.src = "/src/Assets/RR_Tie.svg";
          resultaxe.style.visibility="visible";
          resultgun.style.visibility="visible";
          tieImage.style.width ="50px";
          tiewon.currentTime =0;
          tiewon.play();
          announceWinner(tieImage);
        }
      };
    
        const announceWinner = (winnerImage) => {
       
        winnerImage.style.width = "auto";
        winnerImage.style.position = "absolute";
        winnerImage.style.top = "22%";
        winnerImage.style.left = "50%";
        winnerImage.style.transform = "translate(-50%, -50%)";
        resultBoard.appendChild(winnerImage); 
      };
    

      rtbtn.addEventListener("click", () => {
        btn.forEach((box) => {
          const images = box.querySelectorAll("#imgg");
          images.forEach((image) => image.remove()); 
          box.disabled = false; 
        });
    
        turnX = true; 
        soundb.play();
        resultaxe.style.visibility="hidden";
        resultgun.style.visibility="hidden";
        let wonimgs = resultBoard.querySelector("#wonImgs");
        let tieimgs = resultBoard.querySelector("#tieIm")
        if (wonimgs) wonimgs.remove();
        if (tieimgs) tieimgs.remove();
pushwon.pause();
pushwon.currentTime = 0;

sekhwon.pause();
sekhwon.currentTime = 0;

tiewon.pause();
tiewon.currentTime =0;

      });
