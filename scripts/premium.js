let cards = [
    {
        img: "https://www.myfitnesspal.com/_next/static/media/check-mark.a58300ae.svg",
        img2: "https://www.myfitnesspal.com/_next/static/media/check-mark.a58300ae.svg",
        h4: "Nutrition Tracking",
        p: "Log your food from our extensive database."
    },
    {
        img: "https://www.myfitnesspal.com/_next/static/media/check-mark.a58300ae.svg",
        img2: "",
        h4: "Customizable Carbs, Protein & Fat Goals",
        p: "Track your macros by gram or percentage."
    },
    {
        img: "https://www.myfitnesspal.com/_next/static/media/check-mark.a58300ae.svg",
        img2: "",
        h4: "Guided Fitness & Nutrition Plans",
        p: "Get coaching and content to achieve your goals."
    },
    {
        img: "https://www.myfitnesspal.com/_next/static/media/check-mark.a58300ae.svg",
        img2: "",
        h4: "Custom Home Screen Dashboard",
        p: "Reach goals faster by seeing what’s important to you."
    },
    {
        img: "https://www.myfitnesspal.com/_next/static/media/check-mark.a58300ae.svg",
        img2: "",
        h4: "Food Analysis & Insights",
        p: "Follow your progress through your data."
    },
    {
        img: "https://www.myfitnesspal.com/_next/static/media/check-mark.a58300ae.svg",
        img2: "",
        h4: "Meals & Recipes",
        p: "Learn how to eat with your goals in mind."
    },
    {
        img: "https://www.myfitnesspal.com/_next/static/media/check-mark.a58300ae.svg",
        img2: "",
        h4: "Ad-Free Experience",
        p: "Focus on your fitness and nutrition without ads."
    },
    {
        img: "https://www.myfitnesspal.com/_next/static/media/check-mark.a58300ae.svg",
        img2: "",
        h4: "Subtract Exercise Calories",
        p: "Adjust your day’s calorie goal automatically."
    },
    {
        img: "https://www.myfitnesspal.com/_next/static/media/check-mark.a58300ae.svg",
        img2: "",
        h4: "Quick-Add Carbs, Fat & Protein",
        p: "Log your meals quickly and easily.."
    },
    {
        img: "https://www.myfitnesspal.com/_next/static/media/check-mark.a58300ae.svg",
        img2: "",
        h4: "File Export",
        p: "Download CSV files of all your progress."
    },

];

cards.forEach(function (el) {

    let cardsData = document.createElement("div");
    let cardsText = document.createElement("div")
    let cardsImg = document.createElement("div")

    //creating img tag
    let Img = document.createElement("img");
    Img.src = el.img
    let Img2 = document.createElement("img");
    Img2.src = el.img2

    //creating h4
    let h4 = document.createElement("h4");
    h4.innerText = el.h4

    //creating p
    let p = document.createElement("p");
    p.innerText = el.p

    //appending to tags to divs
    cardsText.append(h4, p)
    cardsImg.append(Img, Img2)
    cardsData.append(cardsText, cardsImg)

    document.querySelector("#premiumAdv").append(cardsData);

});

