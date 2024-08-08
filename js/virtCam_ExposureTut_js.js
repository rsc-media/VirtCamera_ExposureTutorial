/**
 *
 * @title Rio Salado/MCCCD - Virtual Camera Exposure Triangle Tutorial
 * @version 1.0.0;
 * */

function tutorialSetUp() {

    //Fetch the images json file
    const jsonFilePath = 'https://rsc-media.github.io/VirtCamera_ExposureTutorial/images.json';
    let imagesData;

    fetch(jsonFilePath)
    .then(response => response.json())
    .then(data => {

        imagesData = data;
       
        const photoSettings = {
            ISO: '0',
            Aperture: '0',
            Shutter_Speed: '0',
            Recorded_Exposure: '0',
        };

        //vars
        const snapBtn = document.getElementById("snapButton");
        const isoGrp = document.getElementById("isoRadioButtons");
        const apertureGrp = document.getElementById("apertureSelect");
        const shutterSpeedGrp = document.getElementById("shutterSpeedSelect");
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
        let userNameFirst;
        let userNameLast;

        //courseArc vars for student name
        if (typeof CA_LMS_USER_NAME_FIRST ==='undefined' || CA_LMS_USER_NAME_FIRST ===''){

            userNameFirst='STUDENT';
        }
        else{

            userNameFirst = CA_LMS_USER_NAME_FIRST;
        }

        if (typeof CA_LMS_USER_NAME_LAST ==='undefined' || CA_LMS_USER_NAME_LAST ===''){

            userNameLast='NAME';
        }
        else{

            userNameLast = CA_LMS_USER_NAME_LAST;
        }

        console.log('userNameFirst: ', userNameFirst);

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
            const shutterNameGrp = document.querySelector("#shutterSpeedSelect option[selected]");
            photoSettings.Shutter_Speed = shutterNameGrp.value;

            //aperture
            const apertureNameGrp = document.querySelector("#apertureSelect option[selected]");
            photoSettings.Aperture = apertureNameGrp.value;

            getMatched(photoSettings);//get and apply recorded exposure setting of this initial image
        }());

        //setListeners
        (function setListeners() {
            //gather the ISO setting
            isoGrp.addEventListener("click", (evt) => {
                if (evt.target.type === "radio" && evt.target.hasAttribute("disabled") === false) {
                    photoSettings.ISO = evt.target.value;
                    currentMatch = getMatched(photoSettings);
                }
            });

            //gather the aperture setting
            apertureGrp.addEventListener("click", (evt) => {
                if (evt.target.tagName === "OPTION" && evt.target.hasAttribute("disabled") === false){
                    photoSettings.Aperture = evt.target.value;
                    currentMatch = getMatched(photoSettings);
                }
            });

            //gather the shutter speed setting
            shutterSpeedGrp.addEventListener("click", (evt) => {
                if (evt.target.tagName === "OPTION" && evt.target.hasAttribute("disabled") === false){
                    photoSettings.Shutter_Speed = evt.target.value;
                    currentMatch = getMatched(photoSettings);
                }
            });

            addSnapButtonListeners();
        }());
        //end setListeners


        /**
         * name: takeAndShowPicture
         * desc: This function will take the photo settings and compare them to the image information in the imgs object.
         * If a match is found, the image will be displayed in a modal with the settings.
         * If no match is found, an alert will be displayed.
         */
        function takeAndShowPicture() {
           
            //remove event listeners from the snap button
            snapBtn.removeEventListener("click", takeAndShowPicture);
            snapBtn.removeEventListener("keyup", (evt) => {
                if (evt.key === "Enter") {
                    snapBtn.click();
                }
            });

            //send to getMatch function if undefined (first snap without a change in settings);
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
                    createPDF(photoSettings, currentMatch);
                });

                const pdfBtnWrapper = document.createElement("div");
                pdfBtnWrapper.setAttribute("id", "pdfBtnWrapper");
                pdfBtnWrapper.appendChild(pdfBtn);

                header.appendChild(heading);
                header.appendChild(dismissBtn);

                //create result image
                const resultImg = document.createElement("img");
                resultImg.setAttribute("src", `https://rsc-media.github.io/VirtCamera_ExposureTutorial/imgs/${currentMatch}`);
                resultImg.setAttribute("alt", "matched image");
                resultImg.setAttribute("id", "resultImg");

                //create settings display div
                const resultSettings = document.createElement("div");
                resultSettings.setAttribute("id", "resultSettings");

                const isoDiv = document.createElement("div");
                const isoSpan = document.createElement("span");
                isoSpan.innerHTML = `ISO: ${photoSettings.ISO}&nbsp;&nbsp;`;
                isoDiv.appendChild(isoSpan);

                const apertureDiv = document.createElement("div");
                const apertureSpan = document.createElement("span");
                apertureSpan.innerHTML = `Aperture: ${photoSettings.Aperture}&nbsp;&nbsp;`;
                apertureDiv.appendChild(apertureSpan);

                const shutterDiv = document.createElement("div");
                const shutterSpan = document.createElement("span");
                const convertedVal = photoSettings.Shutter_Speed.replace(".", "/");
                shutterSpan.innerHTML = `Shutter speed: ${convertedVal}&nbsp;&nbsp;`;
                shutterDiv.appendChild(shutterSpan);

                const exposureDiv = document.createElement("div");
                const exposureSettings = document.createElement("span");
                exposureSettings.innerHTML = `Exposure: ${photoSettings.Recorded_Exposure}&nbsp;&nbsp;`;
                exposureDiv.appendChild(exposureSettings);

                resultSettings.appendChild(isoDiv);
                resultSettings.appendChild(apertureDiv);
                resultSettings.appendChild(shutterDiv);
                resultSettings.appendChild(exposureDiv);

                resultModal.appendChild(header);
                resultModal.appendChild(resultImg);
                resultModal.appendChild(resultSettings);
                resultModal.appendChild(pdfBtnWrapper);

                //get computed height of the expTutorialWrapperDiv
                const wrapperHeight = tutorialWrapperDiv.clientHeight;

                // get percentage of the wrapper height to determine placement of modal from the top
                const percentFromHt = wrapperHeight * .7;

                resultModal.style.top = `${-percentFromHt}px`;

                //place focus on the dismiss button
                dismissBtn.focus();

                tutorialWrapperDiv.appendChild(resultModal);
                //TODO: animate in the modal later with GS
            }
            else{
                alert("No image found for the settings you entered. Please try again.");
            }
        }


        function getMatched(_photoSettings){

            const returnedResult = imagesData.imgs.find((img) => {
                const imgEdited = img.replace('.jpg', '').replace('.JPG', '');
                const imgArray = imgEdited.split("_");

                let returnItem = null;
                //TODO: better way to compare settings?
                if (imgArray[0] === _photoSettings.ISO && imgArray[1] === _photoSettings.Aperture  && imgArray[2] === _photoSettings.Shutter_Speed) {

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


        //retrieve exposure setting from the currentMatch img name and display it
        function setExposureSetting(_match){

            const exposureVal = _match.split("_")[3].replace(".jpg", "").replace(".JPG", "");
            
            //update object
            photoSettings.Recorded_Exposure = exposureVal;
            //display the exposure setting
            exposureCharDisplay.innerText = exposureVal;
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


        function createPDF(_photoSettings, _currentMatch){

            //create PDF
            const doc = new jsPDF({
                orientation: "p",
                unit: "px",
                hotfixes: ['px_scaling'],
                format: [11.7, 16.5]
            });

            //not sure why, but need this adjustment
            doc.deletePage(1)

            const marginL = 10;//left
            const titleT = 95;//top
            const imgT = 140;//top

            doc.addPage('a3', 'p');

            //HEADER: timestamp, date, student name, and title
            const td = getDateInfo();
            const tstmp = Math.round(new Date().getTime()/1000);
            doc.setFontSize(10);
            doc.setFontType("italic");
            doc.text(`Date: ${td}  Timestamp (in seconds): ${tstmp}`, marginL, 30);

            doc.text(`Name: ${userNameFirst} ${userNameLast}`, marginL, 60);

            doc.setFontSize(14);
            doc.setFontType("normal");

            doc.text("Virtual Camera Exposure Assessment", marginL, titleT);

            //IMAGE
            const matchedImg = _currentMatch;
            const image = new Image();
            image.src = `https://rsc-media.github.io/VirtCamera_ExposureTutorial/imgs/${matchedImg}`;

            image.onload = ()=> {

                const imgH = image.height;//533
                //const imgW = image.width;//800

                doc.addImage(image, 'JPEG', marginL, imgT);
                doc.setFontSize(12);
                const keys = Object.keys(_photoSettings);
                const keyAmt = keys.length;
                const values = Object.values(_photoSettings);

                for(let ixx=0; ixx<keyAmt; ixx++){

                    if(ixx===0){

                        doc.text(`${keys[ixx]}: ${values[ixx]}`, marginL+15, imgT+imgH+30);
                    }
                    else{

                        doc.text(`${keys[ixx]}: ${values[ixx]}`, marginL+15, imgT+imgH+(ixx*30) + 30);
                    }
                }

                doc.save(`Virtual Camera Exposure Assessment_${userNameFirst}_${userNameLast}.pdf`);
            }
        }

        //from stack overflow
        //https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
        function getDateInfo(){

            let today = new Date();
            const dd = String(today.getDate()).padStart(2, "0");
            const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
            const yyyy = today.getFullYear();
            today = `${mm}-${dd}-${yyyy}`;
            return today;
        }

        //end tutorialSetUp
    })
    .catch(error => {
        console.error('Error fetching VirtCamera_ExposureTutorial images JSON file:', error);
    });

}

//check for page load
if (document.readyState === "complete") {
	
	tutorialSetUp();
} else {
	
	document.addEventListener("DOMContentLoaded", tutorialSetUp);
}



