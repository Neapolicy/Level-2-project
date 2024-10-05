const imagePaths = {
    crab: "Sea Animals/crab.jpg",
    dolphin: "Sea Animals/dolphin.jpg",
    eel: "Sea Animals/eel.jpg",
    orca: "Sea Animals/orca.jpg",
    pufferfish: "Sea Animals/pufferfish.jpg",
    seaTurtle: "Sea Animals/sea turtle.jpg",
    shark: "Sea Animals/shark.jpg",
    swordfish: "Sea Animals/swordfish.jpg"
};

const occurrences = {};

let cardsRevealed = 0;
let cardsCorrect = 0;
let buttonPrevious;
let tempImagePaths = {};
let score = 0;
let scoreButton;
let winText;


function reset(){
    scoreButton = document.getElementById("score");
    winText = document.getElementById("winText");

    winText.innerHTML = "";
    score = 0;
    updateScore();

    Object.keys(occurrences).forEach(key => delete occurrences[key]); //wipes occurences clean

    tempImagePaths = imagePaths; //resets images
}
function assignFunctions() {
    reset();

    const centerButtons = document.querySelectorAll('.center button');
    centerButtons.forEach((button) => {
        assignImage(button);
        button.onclick = function () {
            reveal(this); // Passes itself
        };
        button.style.backgroundImage = "";
    });
}

function assignImage(button) {
    const keys = Object.keys(tempImagePaths); // Get keys of the imagePaths dictionary
    let randomIndex;

    // Try to assign an image that has not been used more than twice
    let validImageFound = false;
    while (!validImageFound && keys.length > 0) {
        randomIndex = Math.floor(Math.random() * keys.length);
        const randomImageKey = keys[randomIndex]; // Get a random key (animal name)
        const randomImage = tempImagePaths[randomImageKey]; // Get the corresponding image path

        // Check occurrences and assign if less than 2
        if (!occurrences[randomImage] || occurrences[randomImage] < 2) {
            trackOccurrence(randomImage); // Track the occurrence of this image
            // Set the button's ID to the random image key with the updated occurrence count
            button.id = randomImageKey; // Append occurrence count to ID
            validImageFound = true; // A valid image was found
        }

        // Remove the key if it has already been assigned twice
        if (occurrences[randomImage] === 2) {
            keys.splice(randomIndex, 1); // Remove the used key
        }
    }
}

function reveal(button) {
    button.style.backgroundImage = `url('${tempImagePaths[button.id]}')`;
    if (button !== buttonPrevious){
         score ++;
         cardsRevealed ++; //only compares if two unique cards have been revealed
         console.log("score added!");
      }
    updateScore();
    twoCards(button);
}

function twoCards(button){
    if (cardsRevealed % 2 == 0){
            if (checkForCorrectness(button, buttonPrevious)){
                button.onclick = ""; //make the two buttons unclickable
                buttonPrevious.onclick = "";
                cardsCorrect += 1; //number of cards correct
                console.log("you got it right");
                if (cardsCorrect == 8){
                    winDisplay()
                }
            }
            else{
                setTimeout(() => {
                    button.style.backgroundImage = ""; //clear images
                    buttonPrevious.style.backgroundImage = ""; 
                }, 500); // delay
            }
            cardsRevealed = 0; 
        }
        else{
            buttonPrevious = button;
        }
}

function trackOccurrence(image) {
    if (occurrences[image]) {
        occurrences[image]++; // Increment if already present
    } else {
        occurrences[image] = 1; // Initialize to 1 if not present
    }
}

function checkForCorrectness(buttonOne, buttonTwo){
    if (buttonOne.id === buttonTwo.id && buttonOne !== buttonTwo){ //checks for same image and if they are not the same buttons
        return true;
    }
    return false;
}

function winDisplay(){
    if (score === 16){
        winText.innerHTML = "Impressive! You should buy a lottery ticket, or maybe compete in a game show";
    }
    else if(score <= 24){
        winText.innerHTML = "Pretty Great, safe to say that you're quite skilled at this yeah?";
    }
    else if(score <= 32){
        winText.innerHTML = "Not bad, but not great either, oh well.";
    }
    else{
        winText.innerHTML = "You have a hidden talent for these matching games eh? Keep it hidden.";
    }
}

function updateScore(){
    scoreButton.innerHTML = "Your Score: " + score;
}