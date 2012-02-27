<?php

$visualizationType = $_GET["v"];

$response = "";
$jsonfile = "";
switch($visualizationType) {
        case "tagcumulus":
                $jsonfile = "./careers/json/tagsCumulusJSON_mini.json";
                break;
        case "tagcloud":
                $jsonfile = "./careers/json/tagsCloudJSON_mini.json";
                break;
        default:
        case "remotevslocal":
                $jsonfile = "./careers/json/remoteVSlocal.json";
        break;
        case "tagsgraph":
                $jsonfile = "./careers/json/tagsGraph.json";
        default:
        break;
}

$response = file_get_contents($jsonfile);

print htmlspecialchars($response, ENT_NOQUOTES)
?>