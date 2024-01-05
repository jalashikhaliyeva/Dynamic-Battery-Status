// BATTERY

initBattery();

function initBattery() {
  const batteryLiquid = document.querySelector(".battery-liquid");
  const batteryStatus = document.querySelector(".battery-status");
  const batteryPercentage = document.querySelector(".battery-percentage");

  navigator.getBattery().then((batt) => {
    updateBattery = () => {
      //update the level
      let level = Math.floor(batt.level * 100);
      batteryPercentage.innerHTML = level + "%";

      //update the background level
      batteryLiquid.style.height = `${parseInt(batt.level * 100)}%`;

      //validate full , low battery. and if it's charging or not

      if (level == 100) {
        batteryStatus.innerHTML = `Full battery <i class="ri-battery-2-fill"></i>`;
        batteryLiquid.style.height = "103%"; //to hide the ellipse
      } else if ((level <= 20) & !batt.charging) {
        batteryStatus.innerHTML = `Low battery <i class="ri-plug-line animated-red"></i>`;
      } else if (batt.charging) {
        batteryStatus.innerHTML = `Charging... <i class="ri-flashlight-line animated-green"></i>`;
      } else {
        batteryStatus.innerHTML = "";
      }

      if (level <= 20) {
        batteryLiquid.classList.add("gradient-color-red");
        batteryLiquid.classList.remove(
          "gradient-color-green",
          "gradient-color-orange",
          "gradient-color-yellow"
        );
      } else if (level <= 40) {
        batteryLiquid.classList.add("gradient-color-orange");
        batteryLiquid.classList.remove(
          "gradient-color-green",
          "gradient-color-red",
          "gradient-color-yellow"
        );
      } else if (level <= 80) {
        batteryLiquid.classList.add("gradient-color-yellow");
        batteryLiquid.classList.remove(
          "gradient-color-green",
          "gradient-color-red",
          "gradient-color-orange"
        );
      }else{    
        batteryLiquid.classList.add("gradient-color-green");
        batteryLiquid.classList.remove(
          "gradient-color-orange",
          "gradient-color-red",
          "gradient-color-yellow"
        ); 
      }
    };
    updateBattery();

    batt.addEventListener('chargingchange' , () => {updateBattery()})
    batt.addEventListener('levelchange' , () => {updateBattery()})
  });
}
