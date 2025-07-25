// let dataObj = {};
// let lightMode = true;
// const btnToggle = document.querySelector(".toggle");
// const getCurrentPosition = () => {
//     return new Promise((resolve, reject) => {
//         navigator.geolocation.getCurrentPosition((data) => {
//             resolve(data);
//         }, (error) => {
//             reject(error);
//         });
//     });

// }

// btnToggle.addEventListener('click', () => {
//     const detailSection = document.querySelector(".details");
//     lightMode = !lightMode;
//     lightMode ? detailSection.classList.remove("dark") : detailSection.classList.add("dark");
//     lightMode ? btnToggle.classList.add("btn-dark") : btnToggle.classList.remove("btn-dark");
//     btnToggle.innerHTML = lightMode ? "Dark" : "Light";
// });

// const reset = () => {
//     let details = document.querySelector(".details");
//     btnToggle.classList.remove("hide");
//     btnToggle.classList.add("show");
//     btnToggle.classList.add("btn-dark");
//     if (details) {
//         details.remove();
//     }
//     btnToggle.innerHTML = "Dark";
// }

// const renderLocationDetails = (data) => {
//     const { city, state, postal, country, flag, networkType } = data;
//     let htmlStr = `<div class="details">
//         <div class="item">City:<span class="pl-10">${city}</span></div>
//         <div class="item">State:<span class="pl-10">${state}</span></div>
//         <div class="item">Postal:<span class="pl-10">${postal}</span></div>
//         <div class="item">Country:<span class="pl-10">${country}</span></div>
//         <div class="item">Network:<span class="pl-10">${networkType}</span></div>
//         <div class="item"><img src="${flag}" alt="Flag" /></div>
//     </div>`;
//     reset();
//     document.querySelector(".container").insertAdjacentHTML("beforeend", htmlStr);
// };


// const getLocationDetails = async (lat, long) => {
//     let url = `https://geocode.xyz/${lat},${long}?geoit=json&auth=555450720174271642134x34694`;
//     const resp = await fetch(url);
//     return resp.json();
// }

// const getCountryData = async (country) => {
//     try {
//         const encoded = encodeURIComponent(country.trim());
//         const url = `https://restcountries.com/v3.1/name/${encoded}?fullText=true`; // exact match
//         const resp = await fetch(url);
//         if (!resp.ok) throw new Error("Country not found");
//         return resp.json();
//     } catch (error) {
//         console.error("Error fetching country data:", error);
//         return null;
//     }
// };

// const btn = document.querySelector(".btn");
// btn.addEventListener('click', () => {
//     getCurrentPosition()
//         .then((data) => {
//             const { latitude: lat, longitude: long } = data.coords;
//             return getLocationDetails(lat, long);
//         })
//         .then((data) => {
//             const { city, country, state, postal } = data;
//             dataObj = { city, country, state, postal };
//             console.log(dataObj);
//             return getCountryData(country);
//         }, (error) => {
//         })
//         .then((data) => {
//             const { flags } = data[0];
//             console.log(flags);
//             Object.assign(dataObj, { flag: flags.png });
//             renderLocationDetails(dataObj);
//             console.log(dataObj);
//         }, (error) => {

//         })
//         .catch((error) => {

//         });
// });
let dataObj = {};
let lightMode = true;

const btnToggle = document.querySelector(".toggle");

const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((data) => {
            resolve(data);
        }, (error) => {
            reject(error);
        });
    });
};

btnToggle.addEventListener('click', () => {
    const detailSection = document.querySelector(".details");
    lightMode = !lightMode;
    lightMode ? detailSection.classList.remove("dark") : detailSection.classList.add("dark");
    lightMode ? btnToggle.classList.add("btn-dark") : btnToggle.classList.remove("btn-dark");
    btnToggle.innerHTML = lightMode ? "Dark" : "Light";
});

const reset = () => {
    let details = document.querySelector(".details");
    btnToggle.classList.remove("hide");
    btnToggle.classList.add("show");
    btnToggle.classList.add("btn-dark");
    if (details) {
        details.remove();
    }
    btnToggle.innerHTML = "Dark";
};

const renderLocationDetails = (data) => {
    const { city, state, postal, country, flag, networkType } = data;
    let htmlStr = `<div class="details">
        <div class="item">City:<span class="pl-10">${city}</span></div>
        <div class="item">State:<span class="pl-10">${state}</span></div>
        <div class="item">Postal:<span class="pl-10">${postal}</span></div>
        <div class="item">Country:<span class="pl-10">${country}</span></div>
        <div class="item">Network:<span class="pl-10">${networkType}</span></div>
        <div class="item"><img src="${flag}" alt="Flag" /></div>
    </div>`;
    reset();
    document.querySelector(".container").insertAdjacentHTML("beforeend", htmlStr);
};

const getLocationDetails = async (lat, long) => {
    let url = `https://geocode.xyz/${lat},${long}?geoit=json&auth=555450720174271642134x34694`;
    const resp = await fetch(url);
    return resp.json();
};

const getCountryData = async (country) => {
    try {
        const encoded = encodeURIComponent(country.trim());
        const url = `https://restcountries.com/v3.1/name/${encoded}?fullText=true`; // exact match
        const resp = await fetch(url);
        if (!resp.ok) throw new Error("Country not found");
        return resp.json();
    } catch (error) {
        console.error("Error fetching country data:", error);
        return null;
    }
};

const btn = document.querySelector(".btn");

btn.addEventListener('click', () => {
    getCurrentPosition()
        .then((data) => {
            const { latitude: lat, longitude: long } = data.coords;
            return getLocationDetails(lat, long);
        })
        .then((data) => {
            const { city, country, state, postal } = data;
            dataObj = { city, country, state, postal };
            console.log(dataObj);
            return getCountryData(country);
        }, (error) => {
            console.error("Error getting location details:", error);
        })
        .then((data) => {
            if (!data || !Array.isArray(data) || !data[0]) {
                dataObj.flag = "https://upload.wikimedia.org/wikipedia/commons/e/e3/No_flag.svg";
            } else {
                const { flags } = data[0];
                console.log(flags);
                dataObj.flag = flags?.png || "https://upload.wikimedia.org/wikipedia/commons/e/e3/No_flag.svg";
            }

            // ✅ Add Network Information API support
            const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
            dataObj.networkType = connection?.effectiveType || "Unknown";

            renderLocationDetails(dataObj);
            console.log(dataObj);
        }, (error) => {
            console.error("Error getting country data:", error);
        })
        .catch((error) => {
            console.error("Something went wrong:", error);
            alert("Failed to retrieve your location or country data.");
        });
});
