/* =========================================================
   LCA SYSTEM - COMPLETE JAVASCRIPT
   Life Cycle Assessment Frontend Project
   ========================================================= */


/* =========================================================
   1. ENVIRONMENTAL IMPACT FACTORS
   ========================================================= */

// Estimated material impact factors
const materialFactors = {
    plastic: 3.0,
    aluminium: 8.5,
    steel: 2.0,
    glass: 1.2,
    paper: 1.0,
    wood: 0.5
};


// Estimated energy impact factors
const energyFactors = {
    grid: 0.7,
    solar: 0.05,
    wind: 0.03,
    hydro: 0.04
};


// Estimated transportation factors
const transportFactors = {
    road: 0.00012,
    rail: 0.00004,
    ship: 0.00003,
    air: 0.00060
};


// Estimated waste treatment factors
const wasteFactors = {
    recycle: 0.2,
    reuse: 0.1,
    landfill: 1.5,
    incineration: 1.2
};


/* =========================================================
   2. CALCULATE LCA
   ========================================================= */

function calculateLCA(data) {

    // Material impact
    const materialImpact =
        data.materialAmount *
        materialFactors[data.material];


    // Energy impact
    const energyImpact =
        data.energy *
        energyFactors[data.energySource];


    // Transportation impact
    const transportImpact =
        data.distance *
        transportFactors[data.transport];


    // Water impact
    const waterImpact =
        data.water * 0.0005;


    // Waste impact
    const wasteImpact =
        data.waste *
        wasteFactors[data.wasteTreatment];


    // Total environmental impact
    const totalImpact =
        materialImpact +
        energyImpact +
        transportImpact +
        waterImpact +
        wasteImpact;


    // Environmental score
    // Higher impact = lower score
    let environmentalScore =
        100 - (totalImpact * 2);


    // Keep score between 0 and 100
    environmentalScore =
        Math.max(0, Math.min(100, environmentalScore));


    // Determine impact category
    let category;

    if (totalImpact < 10) {

        category = "Low Impact";

    } else if (totalImpact < 25) {

        category = "Moderate Impact";

    } else if (totalImpact < 50) {

        category = "High Impact";

    } else {

        category = "Very High Impact";
    }


    return {

        productName: data.productName,

        quantity: data.quantity,

        material: data.material,

        materialAmount: data.materialAmount,

        energy: data.energy,

        energySource: data.energySource,

        distance: data.distance,

        transport: data.transport,

        water: data.water,

        waste: data.waste,

        wasteTreatment: data.wasteTreatment,

        materialImpact: materialImpact,

        energyImpact: energyImpact,

        transportImpact: transportImpact,

        waterImpact: waterImpact,

        wasteImpact: wasteImpact,

        totalImpact: totalImpact,

        environmentalScore: environmentalScore,

        category: category,

        date: new Date().toLocaleString()

    };
}


/* =========================================================
   3. ROUND NUMBERS
   ========================================================= */

function roundNumber(number, decimals = 2) {

    return Number(number).toFixed(decimals);

}


/* =========================================================
   4. GET DATA FROM CALCULATOR FORM
   ========================================================= */

function getFormData() {

    return {

        productName:
            document.getElementById("productName").value.trim(),

        quantity:
            Number(document.getElementById("quantity").value),

        material:
            document.getElementById("material").value,

        materialAmount:
            Number(document.getElementById("materialAmount").value),

        energy:
            Number(document.getElementById("energy").value),

        energySource:
            document.getElementById("energySource").value,

        distance:
            Number(document.getElementById("distance").value),

        transport:
            document.getElementById("transport").value,

        water:
            Number(document.getElementById("water").value),

        waste:
            Number(document.getElementById("waste").value),

        wasteTreatment:
            document.getElementById("wasteTreatment").value

    };
}


/* =========================================================
   5. VALIDATE FORM DATA
   ========================================================= */

function validateData(data) {

    if (!data.productName) {

        alert("Please enter the product name.");

        return false;
    }


    if (!data.quantity || data.quantity <= 0) {

        alert("Please enter a valid quantity.");

        return false;
    }


    if (!data.material) {

        alert("Please select a material.");

        return false;
    }


    if (!data.materialAmount || data.materialAmount < 0) {

        alert("Please enter the material amount.");

        return false;
    }


    if (data.energy < 0) {

        alert("Please enter a valid energy value.");

        return false;
    }


    if (!data.energySource) {

        alert("Please select an energy source.");

        return false;
    }


    if (data.distance < 0) {

        alert("Please enter a valid transportation distance.");

        return false;
    }


    if (!data.transport) {

        alert("Please select a transportation method.");

        return false;
    }


    if (data.water < 0) {

        alert("Please enter a valid water value.");

        return false;
    }


    if (data.waste < 0) {

        alert("Please enter a valid waste value.");

        return false;
    }


    if (!data.wasteTreatment) {

        alert("Please select a waste treatment method.");

        return false;
    }


    return true;
}


/* =========================================================
   6. SAVE RESULT
   ========================================================= */

function saveResult(result) {

    // Save latest result
    localStorage.setItem(
        "lcaLatestResult",
        JSON.stringify(result)
    );


    // Get existing history
    let history = JSON.parse(
        localStorage.getItem("lcaHistory")
    ) || [];


    // Add new result
    history.push(result);


    // Save updated history
    localStorage.setItem(
        "lcaHistory",
        JSON.stringify(history)
    );

}


/* =========================================================
   7. CALCULATOR FORM
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const lcaForm =
        document.getElementById("lcaForm");


    /* -----------------------------------------
       CALCULATE BUTTON
       ----------------------------------------- */

    if (lcaForm) {

        lcaForm.addEventListener("submit", function (event) {

            // Prevent normal form submission
            event.preventDefault();


            try {

                // Get form data
                const data = getFormData();


                // Validate
                if (!validateData(data)) {

                    return;
                }


                // Calculate LCA
                const result =
                    calculateLCA(data);


                // Save result
                saveResult(result);


                // Show success message
                alert(
                    "🌱 LCA calculation completed successfully!"
                );


                // Open results page
                window.location.href =
                    "results.html";


            } catch (error) {

                console.error(
                    "LCA Calculation Error:",
                    error
                );


                alert(
                    "Something went wrong while calculating the LCA. Please check the form."
                );

            }

        });


        /* -----------------------------------------
           RESET BUTTON
           ----------------------------------------- */

        const resetButton =
            document.getElementById("resetBtn");


        if (resetButton) {

            resetButton.addEventListener(
                "click",
                function () {

                    lcaForm.reset();

                }
            );

        }

    }

});


/* =========================================================
   8. GET LATEST RESULT
   ========================================================= */

function getLatestResult() {

    const result =
        localStorage.getItem("lcaLatestResult");


    if (!result) {

        return null;

    }


    try {

        return JSON.parse(result);

    } catch (error) {

        console.error(
            "Unable to read latest result:",
            error
        );

        return null;

    }

}


/* =========================================================
   9. GET ALL HISTORY
   ========================================================= */

function getLCAHistory() {

    const history =
        localStorage.getItem("lcaHistory");


    if (!history) {

        return [];

    }


    try {

        return JSON.parse(history);

    } catch (error) {

        console.error(
            "Unable to read LCA history:",
            error
        );

        return [];

    }

}


/* =========================================================
   10. DELETE ONE RESULT
   ========================================================= */

function deleteLCAResult(index) {

    let history =
        getLCAHistory();


    if (
        index >= 0 &&
        index < history.length
    ) {

        history.splice(index, 1);


        localStorage.setItem(
            "lcaHistory",
            JSON.stringify(history)
        );


        // Update latest result
        if (history.length > 0) {

            localStorage.setItem(
                "lcaLatestResult",
                JSON.stringify(
                    history[history.length - 1]
                )
            );

        } else {

            localStorage.removeItem(
                "lcaLatestResult"
            );

        }

    }

}


/* =========================================================
   11. CLEAR ALL HISTORY
   ========================================================= */

function clearLCAHistory() {

    localStorage.removeItem("lcaHistory");

    localStorage.removeItem("lcaLatestResult");

}


/* =========================================================
   12. FORMAT MATERIAL NAME
   ========================================================= */

function formatMaterial(material) {

    const names = {

        plastic: "Plastic",

        aluminium: "Aluminium",

        steel: "Steel",

        glass: "Glass",

        paper: "Paper",

        wood: "Wood"

    };


    return names[material] || material || "-";

}


/* =========================================================
   13. FORMAT ENERGY SOURCE
   ========================================================= */

function formatEnergySource(source) {

    const names = {

        grid: "Electric Grid",

        solar: "Solar Energy",

        wind: "Wind Energy",

        hydro: "Hydropower"

    };


    return names[source] || source || "-";

}


/* =========================================================
   14. FORMAT TRANSPORT
   ========================================================= */

function formatTransport(transport) {

    const names = {

        road: "Road",

        rail: "Rail",

        ship: "Ship",

        air: "Air"

    };


    return names[transport] || transport || "-";

}


/* =========================================================
   15. FORMAT WASTE TREATMENT
   ========================================================= */

function formatWasteTreatment(treatment) {

    const names = {

        recycle: "Recycling",

        reuse: "Reuse",

        landfill: "Landfill",

        incineration: "Incineration"

    };


    return names[treatment] || treatment || "-";

}


/* =========================================================
   16. EXPORT LCA DATA
   ========================================================= */

function exportLCAData() {

    const result =
        getLatestResult();


    if (!result) {

        alert(
            "No LCA result available to export."
        );

        return;

    }


    const data =
        JSON.stringify(
            result,
            null,
            2
        );


    const blob =
        new Blob(
            [data],
            {
                type: "application/json"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        "LCA-Result.json";


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);


    URL.revokeObjectURL(url);

}


/* =========================================================
   17. JAVASCRIPT LOADED MESSAGE
   ========================================================= */

console.log(
    "🌱 LCA System JavaScript loaded successfully."
);