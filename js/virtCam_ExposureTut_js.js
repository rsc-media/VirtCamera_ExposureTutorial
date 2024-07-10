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

        /*imgs:["200_4.0_1.250_18.jpg", "200_4.0_1.2000_18.jpg"]*/
        imgs:
        [
            "100_1.4_1.125_+1.1.JPG",
            "100_1.4_1.250_+0.2.JPG",
            "100_1.4_1.500_-0.1.JPG",
            "100_1.4_1.1000_-1.1.JPG",
            "100_1.4_1.2000_-2.1.JPG",
            "100_1.4_1.4000_-3+.JPG",
            "100_3.5_1.125_-1.0.JPG",
            "100_3.5_1.250_-2.0.JPG",
            "100_3.5_1.500_-3.0.JPG",
            "100_3.5_1.1000_-3.0+.JPG",
            "100_3.5_1.2000_-3.0+.JPG",
            "100_3.5_1.4000_-3.0+.JPG",
            "100_4.0_1.125_-1.1.JPG",
            "100_4.0_1.250_-2.1.JPG",
            "100_4.0_1.500_-3.0+.JPG",
            "100_4.0_1.1000_-3.0+.JPG",
            "100_4.0_1.2000_-3.0+.JPG",
            "100_4.0_1.4000_-3.0+.JPG",
            "100_4.5_1.125_-1.2.JPG",
            "100_4.5_1.250_-2.2.JPG",
            "100_4.5_1.500_-3.0+.JPG",
            "100_4.5_1.1000_-3.0+.JPG",
            "100_4.5_1.2000_-3.0+.JPG",
            "100_4.5_1.4000_-3.0+.JPG",
            "100_5.0_1.125_-2.0.JPG",
            "100_5.0_1.250_-3.0.JPG",
            "100_5.0_1.500_-3.0+.JPG",
            "100_5.0_1.1000_-3.0+.JPG",
            "100_5.0_1.2000_-3.0+.JPG",
            "100_5.0_1.4000_-3.0+.JPG",
            "100_5.6_1.125_-2.1.JPG",
            "100_5.6_1.250_-3.0+.JPG",
            "100_5.6_1.500_-3.0+.JPG",
            "100_5.6_1.1000_-3.0+.JPG",
            "100_5.6_1.2000_-3.0+.JPG",
            "100_5.6_1.4000_-3.0+.JPG",
            "100_6.3_1.125_-2.2.JPG",
            "100_6.3_1.250_-3.0+.JPG",
            "100_6.3_1.500_-3.0+.JPG",
            "100_6.3_1.1000_-3.0+.JPG",
            "100_6.3_1.2000_-3.0+.JPG",
            "100_6.3_1.4000_-3.0+.JPG",
            "100_7.1_1.125_-3.0.JPG",
            "100_7.1_1.250_-3.0+.JPG",
            "100_7.1_1.500_-3.0+.JPG",
            "100_7.1_1.1000_-3.0+.JPG",
            "100_7.1_1.2000_-3.0+.JPG",
            "100_7.1_1.4000_-3.0+.JPG",
            "100_8.0_1.125_-3.0+.JPG",
            "100_8.0_1.250_-3.0+.JPG",
            "100_8.0_1.500_-3.0+.JPG",
            "100_8.0_1.1000_-3.0+.JPG",
            "100_8.0_1.2000_-3.0+.JPG",
            "100_8.0_1.4000_-3.0+.JPG",
            "200_3.5_1.125_+0.1.JPG",
            "200_3.5_1.250_-1.0.JPG",
            "200_3.5_1.500_-2.0.JPG",
            "200_3.5_1.1000_-3.0.JPG",
            "200_3.5_1.2000_-3.0+.JPG",
            "200_3.5_1.4000_-3.0+.JPG",
            "200_4.0_1.125_-0.1.JPG",
            "200_4.0_1.250_-1.1.JPG",
            "200_4.0_1.500_-2.1.JPG",
            "200_4.0_1.1000_-3.0+.JPG",
            "200_4.0_1.2000_-3.0+.JPG",
            "200_4.0_1.4000_-3.0+.JPG",
            "200_4.5_1.125_-0.2.JPG",
            "200_4.5_1.250_-1.2.JPG",
            "200_4.5_1.500_-2.2.JPG",
            "200_4.5_1.1000_-3.0+.JPG",
            "200_4.5_1.2000_-3.0+.JPG",
            "200_4.5_1.4000_-3.0+.JPG",
            "200_5.0_1.125_-1.0.JPG",
            "200_5.0_1.250_-2.0.JPG",
            "200_5.0_1.500_-3.0.JPG",
            "200_5.0_1.1000_-3.0+.JPG",
            "200_5.0_1.2000_-3.0+.JPG",
            "200_5.0_1.4000_-3.0+.JPG",
            "200_5.6_1.125_-1.1.JPG",
            "200_5.6_1.250_-2.1.JPG",
            "200_5.6_1.500_-3.0+.JPG",
            "200_5.6_1.1000_-3.0+.JPG",
            "200_5.6_1.2000_-3.0+.JPG",
            "200_5.6_1.4000_-3.0+.JPG",
            "200_6.3_1.125_-1.2.JPG",
            "200_6.3_1.250_-2.2.JPG",
            "200_6.3_1.500_-3.0+.JPG",
            "200_6.3_1.1000_-3.0+.JPG",
            "200_6.3_1.2000_-3.0+.JPG",
            "200_6.3_1.4000_-3.0+.JPG",
            "200_7.1_1.125_-2.0.JPG",
            "200_7.1_1.250_-3.0.JPG",
            "200_7.1_1.500_-3.0+.JPG",
            "200_7.1_1.1000_-3.0+.JPG",
            "200_7.1_1.2000_-3.0+.JPG",
            "200_7.1_1.4000_-3.0+.JPG",
            "200_8.0_1.125_-2.1.JPG",
            "200_8.0_1.250_-3.0+.JPG",
            "200_8.0_1.500_-3.0+.JPG",
            "200_8.0_1.1000_-3.0+.JPG",
            "200_8.0_1.2000_-3.0+.JPG",
            "200_8.0_1.4000_-3.0+.JPG",
            "400_3.5_1.125_+1.0.JPG",
            "400_3.5_1.250_0.0.JPG",
            "400_3.5_1.500_-1.0.JPG",
            "400_3.5_1.1000_-2.0.JPG",
            "400_3.5_1.2000_-3.0.JPG",
            "400_3.5_1.4000_-3.0+.JPG"
        ]
    }

    const responseStatements = {

        exp_0to0_2: "This exposure brings enough light to the subject.",
    }
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
                //TEMPORARY LIMIT, if ISO is 400, limit aperture settings to 3.5
                if(photoSettings.ISO === "400"){
                    apertureGrp.querySelector("option[value='4.0']").setAttribute("disabled", "true");
                    apertureGrp.querySelector("option[value='4.5']").setAttribute("disabled", "true");
                    apertureGrp.querySelector("option[value='5.0']").setAttribute("disabled", "true");
                    apertureGrp.querySelector("option[value='5.6']").setAttribute("disabled", "true");
                    apertureGrp.querySelector("option[value='6.3']").setAttribute("disabled", "true");
                    apertureGrp.querySelector("option[value='7.1']").setAttribute("disabled", "true");
                    apertureGrp.querySelector("option[value='8.0']").setAttribute("disabled", "true");
                }
                else if(photoSettings.ISO === "200" || photoSettings.ISO === "100"){
                    apertureGrp.querySelector("option[value='4.0']").removeAttribute("disabled");
                    apertureGrp.querySelector("option[value='4.5']").removeAttribute("disabled");
                    apertureGrp.querySelector("option[value='5.0']").removeAttribute("disabled");
                    apertureGrp.querySelector("option[value='5.6']").removeAttribute("disabled");
                    apertureGrp.querySelector("option[value='6.3']").removeAttribute("disabled");
                    apertureGrp.querySelector("option[value='7.1']").removeAttribute("disabled");
                    apertureGrp.querySelector("option[value='8.0']").removeAttribute("disabled");
                }
                //END TEMPORARY LIMIT

                const match1 = getMatched(photoSettings);
                console.log("match1: ", match1);
                //peel off exposure and set that in display and style the exposure section
                if(match1){

                    setExposureSetting(match1);
                }
			}
		});

        //gather the aperture setting
		apertureGrp.addEventListener("click", (evt) => {
			if (evt.target.tagName === "OPTION" && evt.target.hasAttribute("disabled") === false){
				photoSettings.aperture = evt.target.value;

				console.log("aperture: ", photoSettings.aperture);
                const match2 = getMatched(photoSettings);
                console.log("match2: ", match2);
                if(match2){
    
                    setExposureSetting(match2);
                }
			}
		});

		//gather the shutter speed setting
		shutterSpeedGrp.addEventListener("click", (evt) => {
			if (evt.target.type === "radio" && evt.target.hasAttribute("disabled") === false){
				photoSettings.shutterSpeed = evt.target.value;
				console.log("shutterSpeed: ", photoSettings.shutterSpeed);
                const match3 = getMatched(photoSettings);
                console.log("match3: ", match3);
                if(match3){
    
                    setExposureSetting(match3);
                }
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
     * desc: This function will take the photo settings and compare them to the image files in the imgs folder.
     * If a match is found, the image will be displayed in a modal with an explainer text.
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

        //send to getMatch function
        const matchedImg = getMatched(photoSettings);
        console.log("matchedImg: ", matchedImg);

        if(matchedImg){
            //activate cover
            tutorialContentCover.style.display = "block";
            tutorialContentCover.removeAttribute('aria-hidden');

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
            const resultExplainer = document.createElement("div");
            resultExplainer.setAttribute("id", "resultExplainer");
            const explainerText = document.createElement("p");
            //sample explainer - create an object of explainer texts 

            //compare values here to the statement object and display the appropriate statement in the explainer section.
            if(photoSettings.exposure === "0" || photoSettings.exposure === "+0.1" || photoSettings.exposure === "+0.2"){

                explainerText.innerText = responseStatements.exp_0to0_2;
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
           //use testObjOfFiles for now...
        const returnedResult = testObjOfFiles.imgs.find((img) => {
            const imgEdited = img.replace('.jpg', '').replace('.JPG', '');
            const imgArr = imgEdited.split("_");

            //compare the photo settings to the image settings
            //if they match, return the image
            //if they don't match, return null or a message div
            imgArr[2] = imgArr[2].replace(".", "/");
            console.log("imgArr: ", imgArr);

            console.log('getMatched: DETECTED SETTINGS:');
            console.log(imgArr[0], _photoSettings.ISO);
            console.log(imgArr[1], _photoSettings.aperture);
            console.log(imgArr[2], _photoSettings.shutterSpeed);
            console.log(imgArr[3], _photoSettings.exposure);

            let returnItem = null;
            if (imgArr[0] === _photoSettings.ISO && imgArr[1] === _photoSettings.aperture  && imgArr[2] === _photoSettings.shutterSpeed /*&& imgArr[3] === _photoSettings.exposure*/) {
                console.log("matched image: ", img);
                returnItem = img;
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
