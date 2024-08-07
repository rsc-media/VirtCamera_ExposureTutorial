/**
 *
 * @title Rio Salado/MCCCD - Virtual Camera Exposure Triangle Tutorial
 * @version 1.0.0;
 * */

function tutorialSetUp() {
    console.log('running tutorialSetUp');
	
    //Fetch the images json file
    const jsonFilePath = 'https://rsc-media.github.io/VirtCamera_ExposureTutorial/images.json';
    let imagesData;

    //Fetch the JSON file
    fetch(jsonFilePath)
        .then(response => response.json())
        .then(data => {
            
            imagesData = data;
        })
        .catch(error => {
            console.error('Error fetching VirtCamera_ExposureTutorial images JSON file:', error);
        });


    /*const responseStatements = {

        exp_0to0_2: "This exposure brings enough light to the subject.",
    }*/

	const photoSettings = {
		ISO: '0',
		aperture: '0',
        shutterSpeed: '0',
		/*focusLength: '0',*/
        exposure: '0',
	};

    //vars
	const snapBtn = document.getElementById("snapButton");
	const isoGrp = document.getElementById("isoRadioButtons");
	const apertureGrp = document.getElementById("apertureSelect");
    const shutterSpeedGrp = document.getElementById("shutterSpeedRadioButtons");
    //const focalLengthGrp = document.getElementById("focalLengthsRadioButtons");//will change the range of aperture choices
    const tutorialWrapperDiv = document.getElementById("expTutWrapper");
    const tutorialContentCover = document.getElementById("expTutCover");
    const exposureCharDisplay = document.getElementById("currentExposure");//display the exposure setting
    const expMeterSections = document.getElementById("exposureMeterSections");//exposure meter sections
    const neg3plus = document.getElementById("exp_arrowleft");
    const neg3 = document.getElementById("exp_-3.0");
    const neg2_2 = document.getElementById("exp_-2.2");
    const neg2_1 = document.getElementById("exp_-2.1");
    const neg2 = document.getElementById("exp_-2.0");
    const neg1_2 = document.getElementById("exp_-1.2");
    const neg1_1 = document.getElementById("exp_-1.1");
    const neg1 = document.getElementById("exp_-1.0");
    const neg0_2 = document.getElementById("exp_-0.2");
    const neg0_1 = document.getElementById("exp_-0.1");
    const zero = document.getElementById("exp_0");
    const pos0_1 = document.getElementById("exp_+0.1");
    const pos0_2 = document.getElementById("exp_+0.2");
    const pos1 = document.getElementById("exp_+1.0");
    const pos1_1 = document.getElementById("exp_+1.1");
    const pos1_2 = document.getElementById("exp_+1.2");
    const pos2 = document.getElementById("exp_+2.0");
    const pos2_1 = document.getElementById("exp_+2.1");
    const pos2_2 = document.getElementById("exp_+2.2");
    const pos3 = document.getElementById("exp_+3.0");
    const pos3plus = document.getElementById("exp_arrowright");

    let currentMatch;


    //getInitSettings
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
		const apertureNameGrp = document.querySelector("#apertureSelect option[selected]");
        photoSettings.aperture = apertureNameGrp.value;

        //exposure setting
        const exposureIDFragment = document.querySelector(".exp_sectionSetting").id.split("_")[1];
        console.log(exposureIDFragment);
        photoSettings.exposure = exposureIDFragment;

		//focal length
		/*const focalNameGrp = document.querySelectorAll('[name="focal"]');
		for (let f = 0; f < focalNameGrp.length; f++) {
			if (focalNameGrp[f].checked) {
				photoSettings.focusLength = focalNameGrp[f].value;
			}
		}*/
	}());

    console.log('INITIAL SETTINGS of Photo Settings:');
	console.log("photoSettings: ", photoSettings);
    console.log('-------------------');

    //setListeners
	(function setListeners() {
		//gather the ISO setting
		isoGrp.addEventListener("click", (evt) => {
			if (evt.target.type === "radio" && evt.target.hasAttribute("disabled") === false) {
				photoSettings.ISO = evt.target.value;
				console.log("ISO: ", photoSettings.ISO);
               
                currentMatch = getMatched(photoSettings);
                console.log("isoGroup Clicked, currentMatch is: ", currentMatch);
                //peel off exposure and set that in display and style the exposure section
                /*if(match1){

                    setExposureSetting(match1);
                }*/
			}
		});

        //gather the aperture setting
		apertureGrp.addEventListener("click", (evt) => {
			if (evt.target.tagName === "OPTION" && evt.target.hasAttribute("disabled") === false){
				photoSettings.aperture = evt.target.value;

				console.log("aperture: ", photoSettings.aperture);
                currentMatch = getMatched(photoSettings);
                console.log("aperture Clicked, currentMatch is: ", currentMatch);
                /*if(match2){
    
                    setExposureSetting(match2);
                }*/
			}
		});

		//gather the shutter speed setting
		shutterSpeedGrp.addEventListener("click", (evt) => {
			if (evt.target.type === "radio" && evt.target.hasAttribute("disabled") === false){
				photoSettings.shutterSpeed = evt.target.value;
				console.log("shutterSpeed: ", photoSettings.shutterSpeed);
                currentMatch = getMatched(photoSettings);
                console.log("shutterSpeed Clicked, currentMatch is: ", currentMatch);
                /*if(match3){
    
                    setExposureSetting(match3);
                }*/
			}
		});

		//gather the focus length setting
		/*focalLengthGrp.addEventListener("click", (evt) => {
			if (evt.target.type === "radio") {
				photoSettings.focusLength = evt.target.value;
				console.log("focusLength: ", photoSettings.focusLength);
			}
		});*/

        addSnapButtonListeners();
	}());
    //end setListeners

    /**
     * name: takeAndShowPicture
     * desc: This function will take the photo settings and compare them image information in the imgs object.
     * If a match is found, the image will be displayed in a modal with the settings.
     * If no match is found, an alert will be displayed.
     */
	function takeAndShowPicture() {
		console.log("takePicture");
		console.log("photoSettings: ", photoSettings);

        //remove eventlisters from the snap button
        snapBtn.removeEventListener("click", takeAndShowPicture);
        snapBtn.removeEventListener("keyup", (evt) => {
            if (evt.key === "Enter") {
                snapBtn.click();
            }
	    });

        //send to getMatch function if needed (no clicks, initial settings)
        if(!currentMatch){
            currentMatch = getMatched(photoSettings);
        }

        if(currentMatch){
            //activate cover
            tutorialContentCover.style.display = "block";
            tutorialContentCover.removeAttribute('aria-hidden');

            //create results modal wrapper
            const resultModal = document.createElement("div");
            resultModal.setAttribute("id", "resultModalWrapper");

            //create header and heading
            const header = document.createElement("header");
            const heading= document.createElement("h2");
            heading.innerText = "Snapped Image Result";

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

            //create PDF request button
            const pdfBtn = document.createElement("button");
            pdfBtn.setAttribute("id", "pdfRequestButton");
            pdfBtn.innerText = "Create PDF";

            pdfBtn.addEventListener("click", function getPDF() {

                //remove event listener
                pdfBtn.removeEventListener("click", getPDF);

                //call function to create PDF

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
            /*const focalSpan = document.createElement("span");
            focalSpan.innerHTML = `Focal Length: ${photoSettings.focusLength}mm&nbsp;&nbsp;`;*/
            //append the spans to the p element for settings
            const exposureSettings = document.createElement("span");
            exposureSettings.innerHTML = `Exposure: ${photoSettings.exposure}&nbsp;&nbsp;`;

            settingsText.appendChild(isoSpan);
            settingsText.appendChild(apertureSpan);
            settingsText.appendChild(shutterSpan);
            //settingsText.appendChild(focalSpan);
            settingsText.appendChild(exposureSettings);
            resultSettings.appendChild(settingsText);

            //create explainer text div
            /*const resultExplainer = document.createElement("div");
            resultExplainer.setAttribute("id", "resultExplainer");
            const explainerText = document.createElement("p");*/
            //sample explainer - create an object of explainer texts 

            //compare values here to the statement object and display the appropriate statement in the explainer section.
            /*if(photoSettings.exposure === "0" || photoSettings.exposure === "+0.1" || photoSettings.exposure === "+0.2"){

                explainerText.innerText = responseStatements.exp_0to0_2;
            }
            else{

                explainerText.innerText = "This image has enough light to capture the subject. The wings are blurry; to capture a freeze frame of the wings, try increasing your shutter speed.";
            }*/

            /*resultExplainer.appendChild(explainerText);*/
            resultModal.appendChild(header);
            resultModal.appendChild(resultImg);
            resultModal.appendChild(resultSettings);
            resultModal.appendChild(pdfBtn);
            //resultModal.appendChild(resultExplainer);

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

        const returnedResult = imagesData.imgs.find((img) => {
            const imgEdited = img.replace('.jpg', '').replace('.JPG', '');
            const imgArray = imgEdited.split("_");

            //compare the photo settings to the image settings
            //if they match, return the image
            //if they don't match, return null or a message div
            console.log("imgArray: ", imgArray);
            imgArray[2] = imgArray[2].replace(".", "/");
            console.log("imgArray[2]: ", imgArray[2]);

            console.log('getMatched: DETECTED SETTINGS:');
            console.log(imgArray[0], _photoSettings.ISO);
            console.log(imgArray[1], _photoSettings.aperture);
            console.log(imgArray[2], _photoSettings.shutterSpeed);
            console.log(imgArray[3], _photoSettings.exposure);

            let returnItem = null;
            if (imgArray[0] === _photoSettings.ISO && imgArray[1] === _photoSettings.aperture  && imgArray[2] === _photoSettings.shutterSpeed /*&& imgArray[3] === _photoSettings.exposure*/) {
                console.log("matched image: ", img);
                returnItem = img;
                setExposureSetting(returnItem);
            }

            return returnItem;
        });

        return returnedResult;
    }

    //add snap button listeners
    function addSnapButtonListeners(){

        //evt listeners
	    snapBtn.addEventListener("click", takeAndShowPicture);
	    snapBtn.addEventListener("keyup", (evt) => {
            if (evt.key === "Enter") {
                snapBtn.click();
            }
	    });
    }

    //find and display Exposure setting
    function setExposureSetting(_match){

        const exposureVal = _match.split("_")[3].replace(".jpg", "").replace(".JPG", "");
        console.log("exposureVal: ", exposureVal);
        //update object
        photoSettings.exposure = exposureVal;
        //display the exposure setting
        exposureCharDisplay.innerText = exposureVal;
        console.log('exposureVal: ', exposureVal);
        //switch case for exposure meter sections styling
        const allExpSections = expMeterSections.querySelectorAll("DIV");
        // biome-ignore lint/complexity/noForEach: <explanation>
        allExpSections.forEach((section) => {

            section.classList.remove("exp_section_active");
            section.classList.remove("exp_sectionSetting");
        });
        //reset exposure styling based off of new exposure setting
        switch(exposureVal){
            case "-3.0+":
                //include the left arrow
                zero.classList.add("exp_section_active");
                neg0_1.classList.add("exp_section_active");
                neg0_2.classList.add("exp_section_active");
                neg1.classList.add("exp_section_active");
                neg1_1.classList.add("exp_section_active");
                neg1_2.classList.add("exp_section_active");
                neg2.classList.add("exp_section_active");
                neg2_1.classList.add("exp_section_active");
                neg2_2.classList.add("exp_section_active");
                neg3.classList.add("exp_section_active");
                neg3plus.classList.add("exp_sectionSetting");
                break;
            case "-3.0":
                zero.classList.add("exp_section_active");
                neg0_1.classList.add("exp_section_active");
                neg0_2.classList.add("exp_section_active");
                neg1.classList.add("exp_section_active");
                neg1_1.classList.add("exp_section_active");
                neg1_2.classList.add("exp_section_active");
                neg2.classList.add("exp_section_active");
                neg2_1.classList.add("exp_section_active");
                neg2_2.classList.add("exp_section_active");
                neg3.classList.add("exp_sectionSetting");
                break;
            case "-2.2":
                zero.classList.add("exp_section_active");
                neg0_1.classList.add("exp_section_active");
                neg0_2.classList.add("exp_section_active");
                neg1.classList.add("exp_section_active");
                neg1_1.classList.add("exp_section_active");
                neg1_2.classList.add("exp_section_active");
                neg2.classList.add("exp_section_active");
                neg2_1.classList.add("exp_section_active");
                neg2_2.classList.add("exp_sectionSetting");
                break;
            case "-2.1":
                zero.classList.add("exp_section_active");
                neg0_1.classList.add("exp_section_active");
                neg0_2.classList.add("exp_section_active");
                neg1.classList.add("exp_section_active");
                neg1_1.classList.add("exp_section_active");
                neg1_2.classList.add("exp_section_active");
                neg2.classList.add("exp_section_active");
                neg2_1.classList.add("exp_sectionSetting");
                break;
            case "-2.0":
                zero.classList.add("exp_section_active");
                neg0_1.classList.add("exp_section_active");
                neg0_2.classList.add("exp_section_active");
                neg1.classList.add("exp_section_active");
                neg1_1.classList.add("exp_section_active");
                neg1_2.classList.add("exp_section_active");
                neg2.classList.add("exp_sectionSetting");
                break;
            case "-1.2":
                zero.classList.add("exp_section_active");
                neg0_1.classList.add("exp_section_active");
                neg0_2.classList.add("exp_section_active");
                neg1.classList.add("exp_section_active");
                neg1_1.classList.add("exp_section_active");
                neg1_2.classList.add("exp_sectionSetting");
                break;
            case "-1.1":
                zero.classList.add("exp_section_active");
                neg0_1.classList.add("exp_section_active");
                neg0_2.classList.add("exp_section_active");
                neg1.classList.add("exp_section_active");
                neg1_1.classList.add("exp_sectionSetting");
                break;
            case "-1.0":
                zero.classList.add("exp_section_active");
                neg0_1.classList.add("exp_section_active");
                neg0_2.classList.add("exp_section_active");
                neg1.classList.add("exp_sectionSetting");
                break;
            case "-0.2":
                zero.classList.add("exp_section_active");
                neg0_1.classList.add("exp_section_active");
                neg0_2.classList.add("exp_sectionSetting");
                break;
            case "-0.1":
                zero.classList.add("exp_section_active");
                neg0_1.classList.add("exp_sectionSetting");
                break;
            case "0.0":
            case "0":
                zero.classList.add("exp_sectionSetting");
                break;
            case "+0.1":
            case "0.1":
                zero.classList.add("exp_section_active");
                pos0_1.classList.add("exp_sectionSetting");
                break;
            case "+0.2":
            case "0.2":
                zero.classList.add("exp_section_active");
                pos0_1.classList.add("exp_section_active");
                pos0_2.classList.add("exp_sectionSetting");
                break;
            case "+1.0":
            case "1.0":
                zero.classList.add("exp_section_active");
                pos0_1.classList.add("exp_section_active");
                pos0_2.classList.add("exp_section_active");
                pos1.classList.add("exp_sectionSetting");
                break;
            case "+1.1":
            case "1.1":
                zero.classList.add("exp_section_active");
                pos0_1.classList.add("exp_section_active");
                pos0_2.classList.add("exp_section_active");
                pos1.classList.add("exp_section_active");
                pos1_1.classList.add("exp_sectionSetting");

                break;
            case "+1.2":
            case "1.2":
                zero.classList.add("exp_section_active");
                pos0_1.classList.add("exp_section_active");
                pos0_2.classList.add("exp_section_active");
                pos1.classList.add("exp_section_active");
                pos1_1.classList.add("exp_section_active");
                pos1_2.classList.add("exp_sectionSetting");
                break;
            case "+2.0":
            case "2.0":
                zero.classList.add("exp_section_active");
                pos0_1.classList.add("exp_section_active");
                pos0_2.classList.add("exp_section_active");
                pos1.classList.add("exp_section_active");
                pos1_1.classList.add("exp_section_active");
                pos1_2.classList.add("exp_section_active");
                pos2.classList.add("exp_sectionSetting");
                break;
            case "+2.1":
            case "2.1":
                zero.classList.add("exp_section_active");
                pos0_1.classList.add("exp_section_active");
                pos0_2.classList.add("exp_section_active");
                pos1.classList.add("exp_section_active");
                pos1_1.classList.add("exp_section_active");
                pos1_2.classList.add("exp_section_active");
                pos2.classList.add("exp_section_active");
                pos2_1.classList.add("exp_sectionSetting");
                break;
            case "+2.2":
            case "2.2":
                zero.classList.add("exp_section_active");
                pos0_1.classList.add("exp_section_active");
                pos0_2.classList.add("exp_section_active");
                pos1.classList.add("exp_section_active");
                pos1_1.classList.add("exp_section_active");
                pos1_2.classList.add("exp_section_active");
                pos2.classList.add("exp_section_active");
                pos2_1.classList.add("exp_section_active");
                pos2_2.classList.add("exp_sectionSetting");
                break;
            case "+3.0":
            case "3.0":
                zero.classList.add("exp_section_active");
                pos0_1.classList.add("exp_section_active");
                pos0_2.classList.add("exp_section_active");
                pos1.classList.add("exp_section_active");
                pos1_1.classList.add("exp_section_active");
                pos1_2.classList.add("exp_section_active");
                pos2.classList.add("exp_section_active");
                pos2_1.classList.add("exp_section_active");
                pos2_2.classList.add("exp_section_active");
                pos3.classList.add("exp_sectionSetting");

                break;
            case "+3.0+":
            case "3.0+":
                zero.classList.add("exp_section_active");
                pos0_1.classList.add("exp_section_active");
                pos0_2.classList.add("exp_section_active");
                pos1.classList.add("exp_section_active");
                pos1_1.classList.add("exp_section_active");
                pos1_2.classList.add("exp_section_active");
                pos2.classList.add("exp_section_active");
                pos2_1.classList.add("exp_section_active");
                pos2_2.classList.add("exp_section_active");
                pos3.classList.add("exp_section_active");
                pos3plus.classList.add("exp_sectionSetting");
                break;
            default:
                alert("Problem: Unable to read the exposure setting.");
        }
    }
}

//check for page load
if (document.readyState === "complete") {
	console.log("complete");
	tutorialSetUp();
} else {
	console.log("wait for dom content load...");
	document.addEventListener("DOMContentLoaded", tutorialSetUp);
}



