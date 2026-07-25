//==================================================
// ATP DAILY START OF WORK
// شركة الراشد للتقنية والطاقة
//==================================================


//--------------------------------------
// المتغيرات
//--------------------------------------

let selectedVehicle = null;
let actualDriverName = "";
let workStatus = "";
let reason = "";
let faultDescription = "";


//--------------------------------------
// عرض اسم الشركة واسم المشروع
//--------------------------------------

document.getElementById("companyName").innerText = companyName;
document.getElementById("projectName").innerText = projectName;


//--------------------------------------
// عرض التاريخ واسم اليوم
//--------------------------------------

const today = new Date();

const days = [
    "الأحد",
    "الإثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت"
];

const dayName = days[today.getDay()];

const dateString = today.toLocaleDateString("en-GB");

document.getElementById("todayDate").innerText =
`اليوم : ${dayName} - ${dateString}`;


//--------------------------------------
// تعبئة أنواع المركبات
//--------------------------------------

const vehicleType = document.getElementById("vehicleType");

for (let type in vehicles) {

    let option = document.createElement("option");

    option.value = type;
    option.text = type;

    vehicleType.appendChild(option);

}


//--------------------------------------
// اختيار نوع المركبة
//--------------------------------------

vehicleType.addEventListener("change", function () {

    const selectedType = this.value;

    const vehicleNumber =
    document.getElementById("vehicleNumber");

    vehicleNumber.innerHTML =
    '<option value="">اختر رقم المركبة</option>';

    document
    .getElementById("vehicleNumberCard")
    .classList.remove("hidden");


    vehicles[selectedType].forEach(vehicle => {

        let option = document.createElement("option");

        option.value = vehicle.number;
        option.text = vehicle.number;

        vehicleNumber.appendChild(option);

    });

});


//--------------------------------------
// اختيار رقم المركبة
//--------------------------------------

document
.getElementById("vehicleNumber")
.addEventListener("change", function () {

    const selectedType =
    document.getElementById("vehicleType").value;


    selectedVehicle =
    vehicles[selectedType].find(
        item => item.number === this.value
    );


    document
    .getElementById("welcomeCard")
    .classList.remove("hidden");


    document
    .getElementById("welcomeMessage")
    .innerText =
    `أهلاً بك / ${selectedVehicle.driver}`;


    document
    .getElementById("driverConfirmCard")
    .classList.remove("hidden");

});


//--------------------------------------
// نعم - أنا السائق المسجل
//--------------------------------------

document
.getElementById("yesDriver")
.addEventListener("click", function () {

    actualDriverName =
    selectedVehicle.driver;

    document
    .getElementById("workStatusCard")
    .classList.remove("hidden");

});


//--------------------------------------
// لست أنا
//--------------------------------------

document
.getElementById("noDriver")
.addEventListener("click", function () {

    document
    .getElementById("newDriverCard")
    .classList.remove("hidden");

    document
    .getElementById("workStatusCard")
    .classList.remove("hidden");

});


//--------------------------------------
// حالة العمل
//--------------------------------------

const statusButtons =
document.getElementsByName("workStatus");


statusButtons.forEach(item => {

    item.addEventListener("change", function () {

        workStatus = this.value;


        if (workStatus === "بدأت العمل") {

            document
            .getElementById("reasonCard")
            .classList.add("hidden");


            document
            .getElementById("faultCard")
            .classList.add("hidden");


            document
            .getElementById("sendCard")
            .classList.remove("hidden");

        }

        else {

            document
            .getElementById("reasonCard")
            .classList.remove("hidden");

        }

    });

});


//--------------------------------------
// أسباب عدم بدء العمل
//--------------------------------------

const reasons =
document.getElementsByName("reason");


reasons.forEach(item => {

    item.addEventListener("change", function () {

        reason = this.value;


        if (reason === "يوجد عطل بالمركبة") {

            document
            .getElementById("faultCard")
            .classList.remove("hidden");

        }

        else {

            document
            .getElementById("faultCard")
            .classList.add("hidden");

        }


        document
        .getElementById("sendCard")
        .classList.remove("hidden");

    });

});


//--------------------------------------
// زر الإرسال
//--------------------------------------

document
.getElementById("sendButton")
.addEventListener("click", function () {


    //----------------------------------
    // السائق البديل
    //----------------------------------

    if (actualDriverName === "") {

        const newDriver =
        document.getElementById("newDriverName").value.trim();

        if (newDriver === "") {

            alert("يرجى كتابة اسم السائق.");

            return;

        }

        actualDriverName = newDriver;

    }


    //----------------------------------
    // وصف العطل
    //----------------------------------

    faultDescription =
    document.getElementById("faultDescription").value.trim();


    //----------------------------------
    // الوقت
    //----------------------------------

    const timeNow =
    today.toLocaleTimeString("en-GB");


    //----------------------------------
    // إنشاء الرسالة
    //----------------------------------

    let message =

`تأكيد بدء العمل

----------------------

اسم الشركة :
${companyName}

----------------------

التاريخ :
${dayName} - ${dateString}

الوقت :
${timeNow}

----------------------

نوع المركبة :
${document.getElementById("vehicleType").value}

رقم المركبة :
${selectedVehicle.number}

----------------------

اسم السائق المسجل :
${selectedVehicle.driver}

اسم السائق الفعلي :
${actualDriverName}

----------------------

حالة العمل :
${workStatus}

سبب عدم بدء العمل :
${reason}

----------------------

وصف العطل :
${faultDescription}

----------------------`;


    //----------------------------------
    // ترميز الرسالة
    //----------------------------------

    let encodedMessage =
    encodeURIComponent(message);


    //----------------------------------
    // فتح واتساب
    //----------------------------------

    let whatsappURL =

`https://wa.me/${supervisorNumber}?text=${encodedMessage}`;


    window.open(whatsappURL, "_blank");


});


//==================================================
// نهاية الملف
//==================================================
