/**
 *
 * @title Rio Salado/MCCCD - Virtual Camera Exposure Triangle Tutorial
 * @version 1.0.0;
 * */

function tutorialSetUp() {
    console.log('running tutorialSetUp');
	//interface settings vars

    //use this object to search for now but replace later with a dynamic fetch of a precreated json file in the imgs folder that contains all the folder image file names
    //how did jason create the json file in the css dist folder that i fetched in the m_ca_themeSwitcher.js file?
	const testObjOfFiles = {

        imgs:["200_4.0_1.250_18.jpg", "200_4.0_1.2000_18.jpg"]
    }

    const responseStatements = {

        sp_2000_or_faster: "Shutter speed captures the movement with detail.  If you want a motion effect on the wings, try decreasing the shutter speed.",
    }
	const photoSettings = {
		ISO: '0',
		aperture: '0',
        shutterSpeed: '0',
		focusLength: '0',
	};

    //vars
	const snapBtn = document.getElementById("snapButton");
	const isoGrp = document.getElementById("isoRadioButtons");
	const apertureGrp = document.getElementById("apertureSelect");
    const shutterSpeedGrp = document.getElementById("shutterSpeedRadioButtons");
    const focalLengthGrp = document.getElementById("focalLengthsRadioButtons");//will change the range of aperture choices
    const tutorialWrapperDiv = document.getElementById("expTutWrapper");
    const tutorialContentCover = document.getElementById("expTutCover");

	(function getInitSettings() {
		//set the default settings for the camera
		//ISO
		const isoNameGrp = document.querySelectorAll('[name="iso"]');
		for (let i = 0; i < isoNameGrp.length; i++) {
			if (isoNameGrp[i].checked) {
				photoSettings.ISO = isoNameGrp[i].value;
			}
		}

		//shutter speed
		const shutterNameGrp = document.querySelectorAll('[name="ss"]');
		for (let j = 0; j < shutterNameGrp.length; j++) {
			if (shutterNameGrp[j].checked) {
				photoSettings.shutterSpeed = shutterNameGrp[j].value;
			}
		}

		//aperture
		const apertureNameGrp = document.querySelectorAll("#apertureSelect option");
		for (let k = 0; k < apertureNameGrp.length; k++) {
			if (apertureNameGrp[k].selected) {
				photoSettings.aperture = apertureNameGrp[k].value;
			}
		}

		//focal length
		const focalNameGrp = document.querySelectorAll('[name="focal"]');
		for (let f = 0; f < focalNameGrp.length; f++) {
			if (focalNameGrp[f].checked) {
				photoSettings.focusLength = focalNameGrp[f].value;
			}
		}
	}());

    console.log('INITIAL SETTINGS of Photo Settings:');
	console.log("photoSettings: ", photoSettings);

	(function setListeners() {
		//gather the ISO setting
		isoGrp.addEventListener("click", (evt) => {
			if (evt.target.type === "radio") {
				photoSettings.ISO = evt.target.value;
				console.log("ISO: ", photoSettings.ISO);
			}
		});

        //gather the aperture setting
		apertureGrp.addEventListener("click", (evt) => {
			if (evt.target.tagName === "OPTION") {
				photoSettings.aperture = evt.target.value;

				console.log("aperture: ", photoSettings.aperture);
			}
		});

		//gather the shutter speed setting
		shutterSpeedGrp.addEventListener("click", (evt) => {
			if (evt.target.type === "radio") {
				photoSettings.shutterSpeed = evt.target.value;
				console.log("shutterSpeed: ", photoSettings.shutterSpeed);
			}
		});

		//gather the focus length setting
		focalLengthGrp.addEventListener("click", (evt) => {
			if (evt.target.type === "radio") {
				photoSettings.focusLength = evt.target.value;
				console.log("focusLength: ", photoSettings.focusLength);
			}
		});

        addSnapButtonListeners();
	}());

    /**
     * name: takeAndShowPicture
     * 
     */
    
	function takeAndShowPicture() {
		console.log("takePicture");
		console.log("photoSettings: ", photoSettings);
        //activate cover
        tutorialContentCover.style.display = "block";
        tutorialContentCover.removeAttribute('aria-hidden');

        //remove eventlisters from the snap button
        snapBtn.removeEventListener("click", takeAndShowPicture);
        snapBtn.removeEventListener("keyup", (evt) => {
            if (evt.key === "Enter") {
                snapBtn.click();
            }
	    });

        //send to getMatch function
        const matchedImg = getMatched(photoSettings);
        console.log("matchedImg: ", matchedImg);

        if(matchedImg){
        //create results modal wrapper
        const resultModal = document.createElement("div");
        resultModal.setAttribute("id", "resultModalWrapper");

        //create header and heading
        const header = document.createElement("header");
        const heading= document.createElement("h2");
        heading.innerText = "Image Feedback";

        //create dismiss button
        const dismissBtn = document.createElement("button");
        dismissBtn.setAttribute("id", "dismissModalButton");
        dismissBtn.innerText = "X";

        dismissBtn.addEventListener("click", () => {

            resultModal.remove();
            addSnapButtonListeners();
            tutorialContentCover.style.display = "none";
            tutorialContentCover.setAttribute('aria-hidden', 'true');
        });
        header.appendChild(heading);
        header.appendChild(dismissBtn);

        //create result image
        const resultImg = document.createElement("img");
        resultImg.setAttribute("src", `imgs/${matchedImg}`);
        resultImg.setAttribute("alt", "matched image");
        resultImg.setAttribute("id", "resultImg");

        //create settings display div
        const resultSettings = document.createElement("div");
        resultSettings.setAttribute("id", "resultSettings");
        const settingsText = document.createElement("p");
        const isoSpan = document.createElement("span");
        isoSpan.innerHTML = `ISO: ${photoSettings.ISO}&nbsp;&nbsp;`;
        const apertureSpan = document.createElement("span");
        apertureSpan.innerHTML = `Aperture: ${photoSettings.aperture}&nbsp;&nbsp;`;
        const shutterSpan = document.createElement("span");
        shutterSpan.innerHTML = `Shutter speed: ${photoSettings.shutterSpeed}s&nbsp;&nbsp;`;
        const focalSpan = document.createElement("span");
        focalSpan.innerHTML = `Focal Length: ${photoSettings.focusLength}mm&nbsp;&nbsp;`;
        //append the spans to the p element for settings
        settingsText.appendChild(isoSpan);
        settingsText.appendChild(apertureSpan);
        settingsText.appendChild(shutterSpan);
        settingsText.appendChild(focalSpan);
        resultSettings.appendChild(settingsText);

        //create explainer text div
        const resultExplainer = document.createElement("div");
        resultExplainer.setAttribute("id", "resultExplainer");
        const explainerText = document.createElement("p");
        //sample explainer - create an object of explainer texts 

        //compare values here to the statement object and display the appropriate statement in the explainer section.
        if(photoSettings.shutterSpeed === "1/2000" || photoSettings.shutterSpeed === 1/2000){

            explainerText.innerText = responseStatements.sp_2000_or_faster;
        }
        else{

            explainerText.innerText = "This image has enough light to capture the subject. The wings are blurry; to capture a freeze frame of the wings, try increasing your shutter speed.";
        }

        resultExplainer.appendChild(explainerText);
        resultModal.appendChild(header);
        resultModal.appendChild(resultImg);
        resultModal.appendChild(resultSettings);
        resultModal.appendChild(resultExplainer);

        //get computed height of the expTutorialWrapperDiv
        const wrapperHeight = tutorialWrapperDiv.clientHeight;
        //console.log("wrapperHeight: ", wrapperHeight);
        // get 80% of the wrapper height
        const eightyPercent = wrapperHeight * .8;

        //append the result modal to the body for now
        resultModal.style.top = `${-eightyPercent}px`;
        tutorialWrapperDiv.appendChild(resultModal);
        //animate in the modal later with GS
        }
        else{
            alert("No image found for the settings you entered. Please try again.");
        }
	}

    function getMatched(_photoSettings){

        //get names of all image files in the imgs folder:
        //fetch the json file that contains the image file names
        //parse the json file
        //get the image file names
        //return the image file names

        const returnedResult = testObjOfFiles.imgs.find((img) => {
            const imgEdited = img.replace('.jpg', '');
            const imgArr = imgEdited.split("_");

            //compare the photo settings to the image settings
            //if they match, return the image
            //if they don't match, return null or a message div
            imgArr[2] = imgArr[2].replace(".", "/");
            console.log("imgArr: ", imgArr);

            console.log('DETECTED SETTINGS:');
            console.log(imgArr[0], _photoSettings.ISO);
            console.log(imgArr[1], _photoSettings.aperture);
            console.log(imgArr[2], _photoSettings.shutterSpeed);
            console.log(imgArr[3], _photoSettings.focusLength);

            let returnItem = null;
            if (imgArr[0] === _photoSettings.ISO && imgArr[1] === _photoSettings.aperture  && imgArr[2] === _photoSettings.shutterSpeed && imgArr[3] === _photoSettings.focusLength) {
                console.log("matched image: ", img);
                returnItem = img;
            }

            return returnItem;
        });

        return returnedResult;
    }

    function addSnapButtonListeners(){

        //evt listeners
	    snapBtn.addEventListener("click", takeAndShowPicture);
	    snapBtn.addEventListener("keyup", (evt) => {
            if (evt.key === "Enter") {
                snapBtn.click();
            }
	    });
    }
}

//check for page load
if (document.readyState === "complete") {
	console.log("complete");
	tutorialSetUp();
} else {
	console.log("wait for dom content loaded");
	document.addEventListener("DOMContentLoaded", tutorialSetUp);
}
