const apiURL = "https://api.msigma.in/btech/v2/branches/";
 
// Function to generate a random light color with half transparency
function getRandomLightColorWithTransparency() {
  const letters = "89ABCDEF"; // Use lighter color letters
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 8)]; // Use the first 8 letters for lighter colors
  }
  return color + "80"; // Add 80 (hex for 50% transparency) to the color
}
 
// Function to generate a random dark text color
function getRandomDarkTextColor() {
  const letters = "0123456789ABCDEF"; // Use all letters for darker colors
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
 
fetch(apiURL)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Failed to fetch data from the API");
    }
  })
  .then((data) => {
    if (data.status === "success") {
      const branches = data.branches;
      branches.slice(0, 10).forEach((branch) => {
        var container = document.querySelector(".container");
        const branchId = branch.id;
        const branchName = branch.name;
        const branchShort = branch.short;
        var divItem = document.createElement("div");
        var bN = document.createElement("p");
        var fees = document.createElement("p");
        divItem.id = "div-item";
        var p = document.createElement("a");
        p.innerHTML = '<button id="btn">Apply now</button>';
        bN.textContent = branchName;
        fees.textContent = "Fee starting at ₹799 per subject";
        divItem.className = "item";
        divItem.textContent = branchShort;
        divItem.appendChild(bN);
        divItem.appendChild(p);
        divItem.appendChild(fees);
        container.appendChild(divItem);
 
        // Change the button color to a random light color with transparency
        const button = divItem.querySelector("button");
        const randomButtonColor = getRandomLightColorWithTransparency();
        button.style.background = `linear-gradient(to bottom, ${randomButtonColor}, ${randomButtonColor})`;
 
        // Change the text color for branchShort to a random dark color
        divItem.style.color = getRandomDarkTextColor();
      });
    } else {
      console.error("API returned an error status.");
    }
  })
  .catch((error) => {
    console.error(error.message);
  });