// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

"use strict";
// const googleAuth = require("google-oauth-jwt");

// function generateAccessToken() {
// 	return new Promise((resolve) => {
// 		googleAuth.authenticate(
// 			{
// 				email: "weikaixu@festive-planet-281310.iam.gserviceaccount.com",
// 				key:
// 					"-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCo86qzh6PZQWrn\nnuNRoEqlKyhheXwWBTL4PdRJ2YKJJv88j1eUycvH9VcxBLwUnLdRKWgMszcgXHqd\ni19Cg4r3L5Lg+TGF3PpycTpj/vdlUTlk9EHiSdnXFT8y8AO5ZCshmb/5hRz9cTe1\nWOOS7INIsDlOwFNHHnCqd6Z/pq5pmL5Pt0t7WEunzpD5lVQRGieHBYmVxGVn9N+3\nI+U1wy8LrnE1LWetLoCNzjxz4nhLfAKGHO8hgPz4J/DyCDRpFOWotN0G8jKierTI\n+yPxrakvPAk6JWbr4hozZ4WvASNHej8bi5pyEZfp+1j2qrPbmfFS0bCEQ1ZsCM5F\n9jhrT3qFAgMBAAECggEAD/to2O3KVpllGv8BQu32UbSI79uVnOGmBiyXIdtFCWNa\nfqiSoN0L/WDcfCMWBZ8jijZwBM+JNfL5mGCgRML7yNFDxCtef2q9eEj0vJPYZEmw\nM7gVaWoSBNIaNd/VglqS5+1K5zgr21+z5OBBOttLufsNmMEBv7cF8mI6KlYippNo\niEfbax803iBcjmZbBG4GNE/9XlOQ0Tq6RdxtUK6u58bOW9rys7mJuRpR3+3NXmsd\nziyCXoiXx6LHVIv4OPEuhBorsjIJjYvZ4ATw0iaJ5jbxL8ARRl6ZWTptpn7JF5P+\nQCNMIrZHocRmhWaFy86DJcgbt7dZLTVvlplleRdbSwKBgQDRjzKMWA0ezdi6bcnk\nmLgAA+eznLNyPnNAeItgnCms9Lxd6wX6W4nHSH/nnycL6+PgdyzPoQEMyZ3qUJO2\nzQTCAL3A2tGpSmddtH7Qptj60TqGPvgLn+dD67VJj0rjC4x8goiXLasyQyAa4maT\nOWDz/GDA0Cv7gJrctzfYLe+wlwKBgQDOZLToTvooUOWvSSE0rUytFU8HnY/sAZLS\nHVib2APbOUB8hRaJGjerWVTl4qQJ8N2u1kpuNLTyQfclUa8YjAuJaZ/yjcwvF+N2\nojvUzltbumgxQMmsNt0Dlhn4Mu/Ph1kcLcpzJuYvzYwXX+TFtkybIRRF/mrF05kv\nuUbZNcM1QwKBgHEgf6Y5xmNxtmT17b6FHxeLBCL3Hfw3cFpGeN9fjjP7LlD5FhIQ\nJnG5VqsARMDvx+WeEEfJ39o6YRBkDUnqpX3hjo400mg0bVatoKQc3heQqapdBeSo\nnt0Qup4KR+AHlQCGKxyJn9iTWhqJS9yAZjFwdf7Aom20AGXUVsZSDgnjAoGADi8t\nn6mN16d3oYxNE+m1E1AbllJlybpx9K6/oDZATZipreUXn2SF3ujMxN/GlkhPc+yW\nQOyuYtfVvGLYvb8iK9dufqTwG2xw3X5Yzk9ASBWPg5MISSWcGtr9/ejCQmjy3tTm\nzPMnbrGZpyGX/15/9UlYs1bAz8ezB2ycSeFAATECgYACzE5j8yYVjV5XBX6r96OC\nv0+mhC1ochy06xZxdUcQTZqGAp7EQ1u5yNYLVpzCuUsFBZJunm/JrSHp/ctiPbAq\nWC4T7uidqAupQQSXqUGvNUgJs59n2q1CMTnTIMtlOmouXmdjGhY/LVzLV93Oadng\nQvAU/ppZkDxehjT2zYEyag==\n-----END PRIVATE KEY-----\n",
// 				scopes: "https://www.googleapis.com/auth/cloud-platform",
// 			},
// 			(err, token) => {
// 				resolve(token);
// 			}
// 		);
// 	});
// }

// var accessToken = generateAccessToken();

var accessToken = "";
function getToken() {
	chrome.identity.getAuthToken({ interactive: true }, function(token) {
		accessToken = token;
	});
}
getToken();
var baseUrl =
	"https://dialogflow.googleapis.com/v2/projects/festive-planet-281310/agent/sessions/hhhh:detectIntent";

function click(e) {
	if (e.key == "Enter" || e.type == "click") {
		var value = $("#input").val();
		if (value != "") {
			$("#chat").append(
				$(
					"<div id = 'blue'>" +
						value +
						"</div>" +
						"<div class='clear' height = 0px></div>"
				)
			);

			$.ajax({
				type: "POST",
				url: baseUrl,
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				headers: {
					Authorization: "Bearer " + accessToken,
				},
				data: JSON.stringify({
					query_input: {
						text: {
							text: value,
							language_code: "en-US",
						},
					},
				}),

				success: function(data) {
					$("#chat").append(
						$(
							"<div id = 'red'>" +
								data["queryResult"]["fulfillmentText"] +
								"</div>" +
								"<div class='clear' height = 0px ></div>"
						)
					);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					$("#chat").append(
						$(
							"<div id = 'red'>" +
								"error" +
								"accessToken" +
								accessToken +
								XMLHttpRequest.readyState +
								XMLHttpRequest.status +
								XMLHttpRequest.responseText +
								"</div>" +
								"<div class='clear' height = 0px ></div>"
						)
					);
				},
			});
			$("#input").val("");
		}
	}
}

document.addEventListener("DOMContentLoaded", function() {
	var divs = document.querySelectorAll("button");
	var divs1 = document.querySelectorAll("input");
	divs1[0].addEventListener("keypress", click);
	divs[0].addEventListener("click", click);
});
