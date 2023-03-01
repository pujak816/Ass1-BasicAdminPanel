const getUsers = () => {
  axios
    .get(
      "http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D"
    )
    .then(function (response) {
      // handle success
      var mydatas = response.data;
      console.log(mydatas);

      //-----------------search Table function---------------->

      $("#search-box").on("keyup", function () {
        let value = $(this).val();
        // console.log(value);
        var data1 = searchTable(value, mydatas);
        // console.log(data1);
        buildTAbledata(data1);
      });

      function searchTable(value, mydatas) {
        var filtereddata = [];

        for (let i = 0; i < mydatas.length; i++) {
          value = value.toLowerCase();

          var name = mydatas[i].firstName.toLowerCase();

          if (name.includes(value)) {
            filtereddata.push(mydatas[i]);
          }
        }

        return filtereddata;
      }

      //----------------- rendering Table data function---------------->

      function buildTAbledata(data1) {
        let mytablesdata = "";

        // let i = 0;

        var temp = "";
        data1.forEach((items) => {
          temp += "<tr >";
          temp += "<td>" + items.id + "</td>";
          temp += "<td>" + items.firstName + "</td>";
          temp += "<td>" + items.lastName + "</td>";
          temp += "<td>" + items.email + "</td>";
          temp += "<td>" + items.phone + "</td></tr>";
        });
        document.getElementById("mytabledata").innerHTML = temp;
      }
      buildTAbledata(mydatas);

      //-------------------details section function---------------------------------->

      // getting dataRow by tag name
      var tables = document.getElementsByTagName("tr");

      // Looping over tables  to show details in detail box
      for (var i = 0; i < tables.length; i++) {
        // Get the ith table
        var table = tables[i];

        // Set the id dynamically
        table.setAttribute("id", i + -1);
      }

      var string = "";
      $("#mytabledata tr").click(function () {
        var serviceID = $(this).attr("id");
        // alert("serviceID :: " + serviceID);
        console.log(serviceID);
        console.log(mydatas[serviceID]);

        let mydetails = string;

        let myselectedarray = [];

        myselectedarray.push(mydatas[serviceID]);

        console.log(myselectedarray);

        let mytabedetails = document.querySelector("#info-content");

        mytabedetails.style.display = "block";

        // User Name
        let userslected = document.querySelector("#userslected");

        userslected.innerHTML = myselectedarray[0].firstName;

        console.log(myselectedarray[0].firstName);

        // description
        let description1 = document.querySelector("#description");

        description1.innerHTML = myselectedarray[0].description;

        console.log(myselectedarray[0].description);

        // Address
        let Address1 = document.querySelector("#Address");

        Address1.innerHTML = myselectedarray[0].address.streetAddress;

        console.log(myselectedarray[0].Address);

        // city
        let city1 = document.querySelector("#city");

        city1.innerHTML = myselectedarray[0].address.city;

        console.log(myselectedarray[0].address.city);

        // city
        let State1 = document.querySelector("#State");

        State1.innerHTML = myselectedarray[0].address.state;

        console.log(myselectedarray[0].address.state);

        //  zip
        let zip1 = document.querySelector("#zip");

        zip1.innerHTML = myselectedarray[0].address.zip;

        console.log(myselectedarray[0].address.zip);

        var rowId = event.target.parentNode.parentNode.id;

        console.log(rowId);

        mytabedetails.append(mydetails);

        // Getting the table element
      });
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      // always executed
    });
};

getUsers();

// function show() {
//   var rowId = event.target.parentNode.parentNode.id;
//   //this gives id of tr whose button was clicked
// }
