document.getElementById('sib').onclick = profHandler;
document.getElementById('testform').addEventListener("submit", function(event) {
    event.preventDefault();
    profHandler();
});
var profs = professors[0];

function profHandler() {
    document.getElementById("info").style.display = "block";
    document.getElementById("info").innerHTML = "<br>Working...";
    var name = document.getElementById("profname").value;
    var params = new FormData();
    params.append("profname", name);
    var tempName = toTitleCase(name);
    if (tempName in profs) {
        localParse(profs[tempName])
    } else {

        var url = "https://students.washington.edu/joshj004/php/handler.php";
        var ajax = new XMLHttpRequest();
        ajax.open("POST", url, true);
        ajax.send(params);
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4) {
                formatter(ajax.responseText);
            } else {
                document.getElementById("info").innerHTML = "Professor Not Found";
            }
        }
    }
}

function localParse(text) {
    var name = "<h3>" + text["name"] + "</h3>";
    var grade = "<p>Rating: " + text["rating"] + "</p>";
    console.log(text);
    var url = "<a target=\"_blank\" href=" + "https://www.ratemyprofessors.com" + text["link"] + ">RateMyProfessor Link</a>";
    document.getElementById("info").innerHTML = name + grade + url;
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function formatter(text) {
    var text = JSON.parse(text);
    console.log(text);
    var name = "<h3>" + text["formatted_name"] + "</h3>";
    var grade = "<p>Rating: " + text["overall_grade"] + "</p>";
    var url = "<a target=\"_blank\" href=" + text["url"] + ">RateMyProfessor Link</a>";
    document.getElementById("info").innerHTML = name + grade + url;

}
